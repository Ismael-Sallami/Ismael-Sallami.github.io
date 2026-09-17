// Lists public repositories that are not on the site, and says so in an issue.
//
// Run by .github/workflows/missing-repos.yml once a week. A repository joins the site by
// being given the `portfolio` topic, which is deliberate but also easy to forget months
// after writing the code. This does not publish anything: it nudges.
//
// The repositories it looks at are the ones that already have work in them, so a repo
// created an hour ago and still empty does not generate noise.

import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const OWNER = 'Ismael-Sallami'
const TOPIC = 'portfolio'

const PROJECTS = new URL('../src/data/projects.js', import.meta.url)
const EXCLUDE = new URL('../src/data/projects.exclude.json', import.meta.url)

// A repository with nothing in it yet is not an omission.
const MIN_SIZE_KB = 10

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

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${TOKEN}`,
      'x-github-api-version': '2022-11-28',
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}`)
  return res.json()
}

// The same flat `url: '...'` the sync reads. A URL cannot contain the quote that ends it,
// so this is the one thing that can be pulled out of that file safely.
const src = await readFile(PROJECTS, 'utf8')
const onSite = new Set(
  [...src.matchAll(/url: 'https:\/\/github\.com\/([^']+?)\/?'/g)].map((m) => m[1].toLowerCase()),
)

const skip = new Set(
  JSON.parse(await readFile(EXCLUDE, 'utf8')).map((e) => e.slug.toLowerCase()),
)

const all = []
for (let page = 1; ; page++) {
  const data = await api(`/users/${OWNER}/repos?per_page=100&page=${page}`)
  all.push(...data)
  if (data.length < 100) break
}

const missing = all.filter(
  (r) =>
    !r.fork &&
    !r.archived &&
    !r.private &&
    r.size >= MIN_SIZE_KB &&
    !(r.topics ?? []).includes(TOPIC) &&
    !onSite.has(r.full_name.toLowerCase()) &&
    !skip.has(r.full_name.toLowerCase()),
)

if (missing.length === 0) {
  console.log('Todos los repositorios con contenido están en la web o excluidos a propósito.')
  process.exit(0)
}

missing.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

const lines = [
  `${missing.length} ${missing.length === 1 ? 'repositorio público no está' : 'repositorios públicos no están'} en la web.`,
  '',
  'Para añadir uno, dale el topic `portfolio` y el sync diario lo recoge:',
  '',
  '```bash',
  ...missing.map((r) => `gh repo edit ${r.full_name} --add-topic ${TOPIC}`),
  '```',
  '',
  'Si alguno no debe salir nunca, añádelo a `src/data/projects.exclude.json` y este aviso dejará de contarlo.',
  '',
  '| Repositorio | Lenguaje | Última actividad |',
  '| --- | --- | --- |',
  ...missing.map(
    (r) => `| [${r.name}](${r.html_url}) | ${r.language ?? '—'} | ${r.pushed_at.slice(0, 10)} |`,
  ),
]

// The workflow turns this into the issue body. Printed rather than posted so the script
// stays runnable by hand without opening anything.
console.log(lines.join('\n'))
