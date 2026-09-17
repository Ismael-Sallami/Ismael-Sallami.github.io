import list from './skills.generated.json'
import categories from './skills.categories.generated.json'

// Most icons live in devicon, where the file name repeats the slug, so the sheet stores
// the slug and the URL is built here. That keeps the pattern in one place rather than
// baked into thirty rows of generated data. Anything already a URL, like the two flags,
// passes through.
const iconUrl = (slug) =>
  /^https:\/\//.test(slug)
    ? slug
    : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

// Grouped by what each thing is, not by how good I claim to be at it.
//
// This used to carry a percentage per skill and draw a bar from it. The number was
// invented: there was no scale under it, so 80% in Python said nothing a reader could
// use, and it forced comparisons that came out wrong. LaTeX and Markdown sat at 90 and
// Kubernetes at 60, which read as "writes documents better than he deploys" right above
// a timeline about twelve weeks of Kubernetes work.
//
// Grouping by type is what my CV already does (Languages / Infrastructure / Spoken), so
// the two now match, and a reader looking for one thing knows which group to read. It
// also asks nobody to believe a self-assessment: the list only says these exist.
//
// The two levels left are the C1 and Nativo, which are CEFR and a fact. That is the test
// a level has to pass to stay: someone other than me defined it.
//
// The list and its groupings live in a Google Sheet now; scripts/sync-skills.mjs writes
// both JSON files. Adding a category is a row, not an edit in three places.
export const CATEGORIES = categories.map((c) => c.slug)

// The heading over each group. It comes from the sheet rather than from strings.js,
// because a category invented there would otherwise render without a name.
export function categoryLabel(slug, lang) {
  const c = categories.find((x) => x.slug === slug)
  if (!c) return slug
  return lang === 'en' ? c.en : c.es
}

export const skills = list.map((s) => ({ ...s, icon: iconUrl(s.icon) }))

// Skill display name for the active language.
export function skillName(skill, lang) {
  return lang === 'en' && skill.nameEn ? skill.nameEn : skill.name
}

// The badge next to a name, for the skills whose level someone else defined.
export function skillDisplay(skill, lang) {
  if (!skill.display) return null
  return lang === 'en' && skill.displayEn ? skill.displayEn : skill.display
}

// Skills of one category, in the order they are declared above.
export function byCategory(category) {
  return skills.filter((s) => s.category === category)
}
