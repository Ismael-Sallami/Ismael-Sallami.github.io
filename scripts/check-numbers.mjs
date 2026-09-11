// Checks the figures the site quotes against the repositories they come from.
//
// The site said "183 implementations, 126 extracted" for months while the catalogue in
// that repository had grown to 198 and 141. It went unnoticed because the repository's
// own GitHub description also still said 183, so checking one against the other agreed
// and both were wrong. The number lived in three places and they drifted apart.
//
// So each claim below names the repository that owns the number, and the number is read
// out of what that repository publishes rather than typed here. The site keeps the
// rounded wording ("almost 200"), which is why these are ranges: the claim stays true
// while the repository grows, and only fails when the rounding itself goes stale.
//
// Run with `npm run check:numbers`. Needs GITHUB_TOKEN in CI, or `gh auth token` locally.

import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const AUTHOR = 'Ismael-Sallami'
const PROJECTS = new URL('../src/data/projects.js', import.meta.url)

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

async function file(repo, path) {
  const data = await api(`/repos/${AUTHOR}/${repo}/contents/${path}`)
  return Buffer.from(data.content, 'base64').toString('utf8')
}

async function commitCount(owner, repo, params = {}) {
  let total = 0
  for (let page = 1; ; page++) {
    const data = await api(`/repos/${owner}/${repo}/commits`, { per_page: 100, page, ...params })
    total += data.length
    if (data.length < 100) break
  }
  return total
}

// Each claim: what the site says, where the real figure comes from, and the range the
// site's wording stays true over. `low`/`high` are inclusive.
const claims = [
  {
    what: 'algorithms-and-patterns: "almost 200 implementations"',
    // One table row per implementation, each starting with a link.
    actual: async () =>
      (await file('algorithms-and-patterns', 'CATALOG.md')).match(/^\| *\[/gm)?.length ?? 0,
    low: 190,
    high: 209,
    // Below 190 the site should say "over 180"; at 210 it should say "over 200".
    fix: 'reword the description in src/data/projects.js to match the new total',
  },
  {
    what: 'algorithms-and-patterns: "over 140 extracted"',
    actual: async () =>
      (await file('algorithms-and-patterns', 'CATALOG.md')).match(/^\| *\[.*patterns\//gm)
        ?.length ?? 0,
    low: 140,
    high: 159,
    fix: 'reword the description in src/data/projects.js to match the new count',
  },
  {
    what: 'ModelosComplejosModelosDinamicos: "29 of its 35 commits are mine"',
    // Stated exactly on purpose: the point of the sentence is that most of the work in
    // someone else's repository is mine, and a rounded version does not say that.
    actual: async () => await commitCount('Leonin04', 'ModelosComplejosModelosDinamicos'),
    low: 35,
    high: 35,
    fix: 'update both counts in src/data/projects.js',
  },
  {
    what: 'ModelosComplejosModelosDinamicos: my own commits there',
    actual: async () =>
      await commitCount('Leonin04', 'ModelosComplejosModelosDinamicos', { author: AUTHOR }),
    low: 29,
    high: 29,
    fix: 'update both counts in src/data/projects.js',
  },
  {
    what: '3-Partition: "16 pages"',
    // The repository states it in its own README, so that is the figure to trust.
    actual: async () => {
      const readme = await file('3-Partition-NP-Completeness', 'README.md')
      const m = readme.match(/(\d+)[ -]pages?/i)
      return m ? Number(m[1]) : 0
    },
    low: 16,
    high: 16,
    fix: 'update the page count in src/data/projects.js',
  },
]

// A claim is only worth checking if the site still makes it.
const projects = readFileSync(PROJECTS, 'utf8')
const stillClaimed = [
  ['Casi 200', 'almost 200 implementations'],
  ['Más de 140', 'over 140 extracted'],
  ['29 de sus 35', '29 of its 35'],
  ['16 páginas', '16 pages'],
]
for (const [needle, label] of stillClaimed) {
  if (!projects.includes(needle)) {
    console.warn(`note: the site no longer says "${needle}", so the ${label} check is stale`)
  }
}

let failed = 0
for (const c of claims) {
  let actual
  try {
    actual = await c.actual()
  } catch (err) {
    console.error(`could not read the figure for ${c.what}: ${err.message}`)
    failed++
    continue
  }
  const ok = actual >= c.low && actual <= c.high
  const range = c.low === c.high ? `${c.low}` : `${c.low}-${c.high}`
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${c.what}  (real: ${actual}, expected ${range})`)
  if (!ok) {
    console.error(`      ${c.fix}`)
    failed++
  }
}

if (failed) {
  console.error(`\n${failed} figure(s) on the site no longer match their repository.`)
  process.exit(1)
}
console.log(`\n${claims.length} figures still match the repositories they come from.`)
