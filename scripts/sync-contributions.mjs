// Regenerates src/data/contributions.generated.json from the GitHub API.
//
// Run by .github/workflows/contributions.yml on a schedule, or by hand with
// `npm run sync:contributions`. The numbers on the site come from here so they cannot
// drift; the Spanish and English descriptions stay hand-written in contributions.js.
//
// A merged pull request is the bar. A fork with no merged work is a clone, and calling
// that a contribution would be false.

import { writeFile, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const AUTHOR = 'Ismael-Sallami'

// His own accounts. Work in these is a project, not a contribution to someone else's.
const OWN_ACCOUNTS = ['ismael-sallami', 'elblogdeismael']

const OUTPUT = new URL('../src/data/contributions.generated.json', import.meta.url)
const EXCLUDE_FILE = new URL('../src/data/contributions.exclude.json', import.meta.url)

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

async function api(path, params = {}) {
  const url = new URL(`https://api.github.com${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${TOKEN}`,
      'x-github-api-version': '2022-11-28',
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url.pathname}`)
  return res.json()
}

// The search API caps a page at 100 and the whole result set at 1000, which is far more
// than this will ever need.
async function mergedPullRequests() {
  const items = []
  for (let page = 1; ; page++) {
    const data = await api('/search/issues', {
      q: `author:${AUTHOR} is:pr is:merged`,
      per_page: 100,
      page,
    })
    items.push(...data.items)
    if (items.length >= data.total_count || data.items.length === 0) break
  }
  return items
}

// Commits authored by him on the repository's default branch, which is what the link in
// the table shows. Counted rather than taken from a field, since no field holds it.
async function commitCount(owner, repo) {
  let total = 0
  for (let page = 1; ; page++) {
    const data = await api(`/repos/${owner}/${repo}/commits`, {
      author: AUTHOR,
      per_page: 100,
      page,
    })
    total += data.length
    if (data.length < 100) break
  }
  return total
}

// The same list the site reads, so there is one place to edit it.
async function excluded() {
  const entries = JSON.parse(await readFile(EXCLUDE_FILE, 'utf8'))
  return new Map(entries.map((e) => [e.slug.toLowerCase(), e.reason]))
}

const skip = await excluded()
const prs = await mergedPullRequests()

const byRepo = new Map()
for (const pr of prs) {
  // repository_url looks like https://api.github.com/repos/openMF/mifos-gazelle
  const [owner, repo] = pr.repository_url.split('/repos/')[1].split('/')
  const slug = `${owner}/${repo}`
  if (OWN_ACCOUNTS.includes(owner.toLowerCase())) continue
  if (skip.has(slug.toLowerCase())) continue
  const entry = byRepo.get(slug) ?? { owner, repo, prs: 0 }
  entry.prs += 1
  byRepo.set(slug, entry)
}

const rows = []
for (const entry of byRepo.values()) {
  const meta = await api(`/repos/${entry.owner}/${entry.repo}`)
  rows.push({
    owner: entry.owner,
    repo: entry.repo,
    lang: meta.language ?? null,
    prs: entry.prs,
    commits: await commitCount(entry.owner, entry.repo),
  })
}

rows.sort((a, b) => b.prs - a.prs || b.commits - a.commits || a.repo.localeCompare(b.repo))

await writeFile(OUTPUT, `${JSON.stringify(rows, null, 2)}\n`)

console.log(`${rows.length} repositories written to src/data/contributions.generated.json`)
for (const r of rows) {
  console.log(`  ${r.owner}/${r.repo}  ${r.prs} PRs, ${r.commits} commits, ${r.lang}`)
}
for (const [slug, reason] of skip) console.log(`skipped ${slug}: ${reason}`)
