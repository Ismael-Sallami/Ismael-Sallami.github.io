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
const skills = JSON.parse(readFileSync('src/data/skills.generated.json', 'utf8'))
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

// Skills carry a category, not a score, grouped the way the site and the CV group them.
// The headings come from the sheet along with the skills, so the README cannot end up
// calling a group something the site does not.
const categories = JSON.parse(readFileSync('src/data/skills.categories.generated.json', 'utf8'))

const skillsBlock = categories
  .map(({ slug, en: label }) => {
    const names = skills.filter((s) => s.category === slug).map((s) => s.name)
    return names.length ? `**${label}** — ${names.join(' · ')}` : null
  })
  .filter(Boolean)
  .join('\n\n')

let readme = readFileSync('README.md', 'utf8')
readme = readme.replace(
  /(## Projects\n\n)[\s\S]*?(\n## Contributions to open source)/,
  `$1${projectsBlock}\n$2`
)
readme = readme.replace(
  /(refreshed weekly\.\n\n)[\s\S]*?(\n## Skills)/,
  `$1${contribBlock}\n$2`
)
readme = readme.replace(/(## Skills\n\n)[\s\S]*?(\n## Licence)/, `$1${skillsBlock}\n$2`)

// The counts in the "Where the content lives" table used to be typed by hand, so they
// went stale the moment either list changed. The site counts them at render time; this
// makes the README agree.
readme = readme.replace(
  /(\| `src\/data\/projects\.js` \| the )\d+( projects)/,
  `$1${projects.length}$2`,
)
readme = readme.replace(
  /(\| `src\/data\/skills\.generated\.json` \| the )\d+( skills)/,
  `$1${skills.length}$2`,
)
writeFileSync('README.md', readme)
console.log(
  `${projects.length} projects (${featured.length} featured), ` +
    `${generated.length} contributions, ${skills.length} skills`
)
