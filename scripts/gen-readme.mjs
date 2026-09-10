// Rewrites the Projects and Contributions tables in README.md from the data files.
//
// The contribution numbers move on their own every week, so the README has to be
// regenerated with them or it starts contradicting the site. The sync workflow runs
// this straight after scripts/sync-contributions.mjs for that reason.
//
// projects.js imports images, so it cannot just be imported here under plain node.
// The fields are pulled out textually instead, which is why the table is generated
// rather than hand-kept.
import { readFileSync, writeFileSync } from 'node:fs'

const projectsSrc = readFileSync('src/data/projects.js', 'utf8')
const generated = JSON.parse(readFileSync('src/data/contributions.generated.json', 'utf8'))
const contribSrc = readFileSync('src/data/contributions.js', 'utf8')

// projects.js is a module with image imports, so pull the fields out textually.
const projects = []
for (const m of projectsSrc.matchAll(/\{\s*\n\s*title: '((?:[^'\\]|\\.)*)',\s*\n\s*desc: '((?:[^'\\]|\\.)*)',\s*\n\s*tag: '((?:[^'\\]|\\.)*)',\s*\n\s*url: '([^']*)',\s*\n\s*img: \w+,\s*\n(\s*featured: true,\s*\n)?/g)) {
  projects.push({
    title: m[1].replace(/\\'/g, "'"),
    desc: m[2].replace(/\\'/g, "'"),
    tag: m[3],
    url: m[4],
    featured: Boolean(m[5]),
  })
}

const descFor = {}
for (const m of contribSrc.matchAll(/'([^']+\/[^']+)': \{\s*\n\s*desc: '((?:[^'\\]|\\.)*)',/g)) {
  descFor[m[1]] = m[2].replace(/\\'/g, "'")
}

const featured = projects.filter((p) => p.featured)
const rest = projects.filter((p) => !p.featured)

const projectsBlock = [
  '### Featured',
  '',
  ...featured.map((p) => `- **[${p.title}](${p.url})** — ${p.tag}. ${p.desc}`),
  '',
  '### Everything else',
  '',
  ...rest.map((p) => `- **[${p.title}](${p.url})** — ${p.tag}`),
].join('\n')

const contribBlock = [
  '| Project | Upstream | Language | Merged PRs | My commits |',
  '| --- | --- | --- | ---: | ---: |',
  ...generated.map((r) => {
    const slug = `${r.owner}/${r.repo}`
    return `| [${r.repo}](https://github.com/${slug}/commits?author=Ismael-Sallami) | ${r.owner} | ${r.lang ?? '—'} | ${r.prs} | ${r.commits} |`
  }),
].join('\n')

let readme = readFileSync('README.md', 'utf8')
readme = readme.replace(
  /(## Projects\n\n)[\s\S]*?(\n## Contributions to open source)/,
  `$1${projectsBlock}$2`
)
readme = readme.replace(
  /(refreshed weekly\.\n\n)[\s\S]*?(\n## Skills)/,
  `$1${contribBlock}\n$2`
)
writeFileSync('README.md', readme)
console.log(`${projects.length} projects (${featured.length} featured), ${generated.length} contributions`)
