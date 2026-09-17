// Regenerates src/data/projects.generated.json and src/data/readmes/*.html from the
// GitHub API.
//
// Run by .github/workflows/projects.yml on a schedule, or by hand with
// `npm run sync:projects`. Two things come out of here: the metadata behind every
// project card, and the README of each repository already turned into HTML.
//
// The markdown is rendered by GitHub's own /markdown endpoint rather than by a library
// in the browser. That buys three things at once: the HTML is byte for byte what
// github.com shows, it arrives sanitised (a <script> comes back escaped and an onclick
// is dropped), and the site ships no markdown or syntax-highlighting dependency at all.
//
// What the endpoint does not do is rewrite relative paths or put ids on headings, so
// both happen here. Without the first, every image in a README that lives in the
// repository is broken; without the second, every internal anchor points nowhere.

import { writeFile, readFile, mkdir, readdir, unlink } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const OWNER = 'Ismael-Sallami'

// A repository carrying this topic shows up on the site on its own. It is opt-in on
// purpose: every repository would mean publishing drafts and throwaways too.
const TOPIC = 'portfolio'

const PROJECTS = new URL('../src/data/projects.js', import.meta.url)
const EXCLUDE = new URL('../src/data/projects.exclude.json', import.meta.url)
const OUTPUT = new URL('../src/data/projects.generated.json', import.meta.url)
const READMES = new URL('../src/data/readmes/', import.meta.url)

// The endpoint takes the markdown in the request body and rejects what is too big. No
// README here is anywhere near this, so hitting it means something is wrong.
const MAX_MARKDOWN = 100_000

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim()
  } catch {
    console.error('No GITHUB_TOKEN and `gh auth token` failed. Set one or log in with gh.')
    process.exit(1)
  }
}

const TOKEN = token()

const headers = {
  accept: 'application/vnd.github+json',
  authorization: `Bearer ${TOKEN}`,
  'x-github-api-version': '2022-11-28',
}

// Rate limiting is not a concern at this size (about 60 calls against a budget of 5000
// an hour), but a secondary limit is triggered by bursts rather than by volume, so the
// calls are spaced out and a 403 or 429 is waited out rather than retried blindly.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(path, { raw = false, text = false, method = 'GET', body } = {}) {
  const url = path.startsWith('http') ? path : `https://api.github.com${path}`
  for (let attempt = 0; ; attempt++) {
    await sleep(100)
    const res = await fetch(url, {
      method,
      headers: {
        ...headers,
        ...(raw ? { accept: 'application/vnd.github.raw+json' } : {}),
        ...(body ? { 'content-type': 'application/json' } : {}),
      },
      body,
    })
    if (res.status === 404) return null
    if ((res.status === 403 || res.status === 429) && attempt < 4) {
      const retryAfter = Number(res.headers.get('retry-after'))
      const reset = Number(res.headers.get('x-ratelimit-reset'))
      const waitMs = retryAfter
        ? retryAfter * 1000
        : reset
          ? Math.max(0, reset * 1000 - Date.now())
          : 2 ** attempt * 1000
      console.warn(`  rate limited on ${url}, waiting ${Math.round(waitMs / 1000)}s`)
      await sleep(Math.min(waitMs, 60_000))
      continue
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url}`)
    // /markdown answers with HTML, and a raw README with plain text; only the REST
    // endpoints speak JSON.
    return raw || text ? res.text() : res.json()
  }
}

// The URLs the site already links to. A flat `url: '...'` is the one thing that can be
// read out of projects.js safely: a URL never contains the quote that would end it.
// Everything else about that file stays none of this script's business.
async function manualUrls() {
  const src = await readFile(PROJECTS, 'utf8')
  return [...src.matchAll(/url: '([^']+)'/g)].map((m) => m[1])
}

function parseRepoUrl(url) {
  const m = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+?)\/?$/)
  return m ? { owner: m[1], repo: m[2] } : null
}

async function excluded() {
  const entries = JSON.parse(await readFile(EXCLUDE, 'utf8'))
  return new Map(entries.map((e) => [e.slug.toLowerCase(), e.reason]))
}

// Listing the account's repositories and filtering here, rather than asking the search
// API for the topic. Search is indexed asynchronously, so a topic added a minute ago is
// not found yet and the script would quietly return a different set depending on when
// it ran.
async function reposWithTopic() {
  const all = []
  for (let page = 1; ; page++) {
    const data = await api(`/users/${OWNER}/repos?per_page=100&page=${page}`)
    all.push(...data)
    if (data.length < 100) break
  }
  return all.filter((r) => !r.fork && !r.archived && (r.topics ?? []).includes(TOPIC))
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

// GitHub's own renderer emits no ids, so `href="#known-limitations"` inside a README
// lands nowhere. Numbering repeats keeps two sections with the same name apart.
function addHeadingIds(html) {
  const seen = new Map()
  return html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/g, (_, level, attrs, inner) => {
    const base = slugify(inner.replace(/<[^>]+>/g, '')) || 'section'
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return `<h${level}${attrs} id="${n ? `${base}-${n}` : base}">${inner}</h${level}>`
  })
}

function rewriteHtml(html, { owner, repo, branch }) {
  const raw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`
  const blob = `https://github.com/${owner}/${repo}/blob/${branch}/`

  // Relative paths come back untouched from the API. Images have to resolve against the
  // raw host or they render as broken; links go to the blob view, which is what someone
  // clicking a path in a README expects to see.
  let out = html
    .replace(/(<img\b[^>]*?\bsrc=")(?!https?:|data:|\/\/)\.?\/?([^"]+)"/g, (_, p, u) => `${p}${raw}${u}"`)
    .replace(/(<a\b[^>]*?\bhref=")(?!https?:|mailto:|#|\/\/)\.?\/?([^"]+)"/g, (_, p, u) => `${p}${blob}${u}"`)

  // A link to github.com comes back with no target, and following it inside the single
  // page app would be a full reload out of the site.
  out = out.replace(/<a\b(?![^>]*\btarget=)([^>]*\bhref="https?:)/g, '<a target="_blank" rel="noopener noreferrer"$1')

  // Badges alone run to well over a hundred images across these READMEs.
  out = out.replace(/<img\b(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')

  return out
}

// The page prints the project title itself, so the README's own first heading would be
// the same words twice. It is worth keeping as a fallback title for a repository that
// has no hand-written card.
function takeHeadline(html) {
  // Not anchored to the start: a README often opens with a centred row of badges or
  // screenshots before its title. The first h1 is the title wherever it sits.
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>\s*/)
  if (!m) return { headline: null, html }
  return {
    headline: m[1].replace(/<[^>]+>/g, '').trim(),
    html: html.slice(0, m.index) + html.slice(m.index + m[0].length),
  }
}

async function renderReadme(meta) {
  const { owner, name: repo, default_branch: branch } = meta
  const markdown = await api(`/repos/${owner.login}/${repo}/readme`, { raw: true })
  if (markdown === null) return null

  if (markdown.length > MAX_MARKDOWN) {
    throw new Error(`${owner.login}/${repo}: README is ${markdown.length}B, over the ${MAX_MARKDOWN}B limit`)
  }

  const rendered = await api('/markdown', {
    method: 'POST',
    text: true,
    body: JSON.stringify({ text: markdown, mode: 'gfm', context: `${owner.login}/${repo}` }),
  })

  const { headline, html } = takeHeadline(rendered)
  const out = rewriteHtml(addHeadingIds(html), { owner: owner.login, repo, branch })

  // If anything relative survived, a broken image or a dead link would ship. Better to
  // fail the sync and leave yesterday's README in place.
  const leftover = out.match(/(?:src|href)="(?!https?:|mailto:|#|data:)[^"]*"/g)
  if (leftover) {
    throw new Error(`${owner.login}/${repo}: ${leftover.length} paths not rewritten, e.g. ${leftover.slice(0, 3).join(', ')}`)
  }

  return { headline, html: out }
}

// --- gather ----------------------------------------------------------------------

const skip = await excluded()

// Two sources, one set. The hand-written cards are always in, whether or not they carry
// the topic, so nothing that is on the site today can fall off it. The topic only adds.
const wanted = new Map()

for (const url of await manualUrls()) {
  const parsed = parseRepoUrl(url)
  // One card points at a site rather than a repository. It has no README to sync.
  if (!parsed) continue
  wanted.set(`${parsed.owner}/${parsed.repo}`.toLowerCase(), { ...parsed, url })
}

for (const repo of await reposWithTopic()) {
  const key = repo.full_name.toLowerCase()
  if (wanted.has(key)) continue
  wanted.set(key, { owner: repo.owner.login, repo: repo.name, url: repo.html_url })
}

const records = []
const files = new Map()
const warnings = []

for (const { owner, repo, url } of wanted.values()) {
  if (skip.has(`${owner}/${repo}`.toLowerCase())) continue

  const meta = await api(`/repos/${owner}/${repo}`)
  if (!meta) {
    // A card pointing at a repository that no longer exists is worth shouting about,
    // but it should not stop the other twenty-six from being written.
    warnings.push(`${owner}/${repo}: not found, card left without a README`)
    continue
  }

  // The API follows a rename, so this is how one gets noticed. The merge keys on the URL
  // the card already holds, so nothing breaks; the route just uses the new name.
  if (meta.name.toLowerCase() !== repo.toLowerCase()) {
    warnings.push(`${owner}/${repo} was renamed to ${meta.full_name}`)
  }

  const slug = meta.name.toLowerCase()
  if (files.has(slug)) {
    throw new Error(`Two repositories map to the same file name "${slug}". Rename one or exclude it.`)
  }

  const readme = await renderReadme(meta)
  if (readme) files.set(slug, readme.html)

  records.push({
    url,
    slug,
    fullName: meta.full_name,
    name: meta.name,
    headline: readme?.headline ?? null,
    description: meta.description ?? null,
    language: meta.language ?? null,
    topics: meta.topics ?? [],
    homepage: meta.homepage || null,
    // Truncated to the day. The full timestamp moves on every push and would put noise
    // in the weekly diff for no gain: the page shows a date.
    pushedAt: meta.pushed_at.slice(0, 10),
    hasReadme: Boolean(readme),
  })

  console.log(`  ${meta.full_name}${readme ? '' : '  (no README)'}`)
}

records.sort((a, b) => a.slug.localeCompare(b.slug))

// --- write -----------------------------------------------------------------------
//
// Nothing is written until every repository has been fetched and rendered. A sync that
// died halfway through used to be able to commit a half-built set.

await mkdir(READMES, { recursive: true })

const existing = (await readdir(READMES)).filter((f) => f.endsWith('.html'))
for (const file of existing) {
  if (!files.has(file.replace(/\.html$/, ''))) await unlink(new URL(file, READMES))
}

for (const [slug, html] of files) {
  await writeFile(new URL(`${slug}.html`, READMES), `${html.trim()}\n`)
}

await writeFile(OUTPUT, `${JSON.stringify(records, null, 2)}\n`)

console.log(`\n${records.length} projects written to src/data/projects.generated.json`)
console.log(`${files.size} READMEs written to src/data/readmes/`)
for (const [slug, reason] of skip) console.log(`skipped ${slug}: ${reason}`)
for (const w of warnings) console.warn(`WARNING  ${w}`)
