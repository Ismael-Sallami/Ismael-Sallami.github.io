// Turns the site's data into the shape a CV is printed from.
//
// A pure function on purpose: no React, no DOM. The picker decides what is in, this
// decides what that looks like, and the paper only reads. If a different renderer is ever
// needed, it consumes this and nothing else has to move.
//
// Selection is stored as what is left OUT, never as what is in. The projects list grows on
// its own every morning from the GitHub sync, so a stored list of included ids would mean
// every new repository is born unticked and quietly missing from the CV. Stored as
// exclusions, new content is included by default and "everything ticked" is the empty
// object.

import { profile, education, localizeEducation, short } from './profile.js'
import { experience, localizeRole } from './experience.js'
import { mergeProjects, localizeProject } from './projects.js'
import { contributions, localizeContribution } from './contributions.js'
import { CATEGORIES, byCategory, categoryLabel, skillName, skillDisplay } from './skills.js'

export const SECTIONS = ['education', 'experience', 'projects', 'contributions', 'skills']

// Stable identity per item. The obvious choices are wrong in two places: a hand-written
// project card with no repository has `slug: null`, and skills have no id at all.
export function itemKey(section, item) {
  switch (section) {
    case 'education':
      return item.id
    case 'experience':
      return item.id
    case 'projects':
      return item.slug ?? item.url.toLowerCase()
    case 'contributions':
      return `${item.upstream}/${item.project}`
    case 'skills':
      return item.slug
    default:
      return String(item)
  }
}

// The raw items of each section, before anything is taken out.
export function sectionItems(lang) {
  return {
    education: education.map((e) => localizeEducation(e, lang)),
    experience: experience.map((r) => localizeRole(r, lang)),
    projects: mergeProjects().map((p) => localizeProject(p, lang)),
    contributions: contributions.map((c) => localizeContribution(c, lang)),
    // Skills are picked a category at a time. Thirty checkboxes is not a choice, it is a
    // chore, and a CV groups them anyway.
    skills: CATEGORIES.map((slug) => ({ slug, label: categoryLabel(slug, lang) })),
  }
}

export const isSectionOn = (excluded, section) => !excluded[section]?.off

export const isItemOn = (excluded, section, key) =>
  isSectionOn(excluded, section) && !excluded[section]?.items?.includes(key)

// A role's CV bullets when they exist, and the timeline sentence when they do not. The two
// are written for different readers: the site's description reads well under a date, a CV
// bullet leads with what changed and carries a number.
const bulletsFor = (role) => (role.cvBullets?.length > 0 ? role.cvBullets : [role.desc].filter(Boolean))

export function buildCvModel(excluded, lang) {
  const all = sectionItems(lang)
  const keep = (section) =>
    isSectionOn(excluded, section)
      ? all[section].filter((i) => isItemOn(excluded, section, itemKey(section, i)))
      : []

  const sections = []

  const edu = keep('education')
  if (edu.length > 0) {
    sections.push({
      id: 'education',
      entries: edu.map((e) => ({
        left: e.school,
        right: e.place,
        sub: e.degree,
        subRight: e.dates,
        bullets: [],
      })),
    })
  }

  const roles = keep('experience')
  if (roles.length > 0) {
    sections.push({
      id: 'experience',
      // Newest first. The site tells the story oldest first because it is a timeline;
      // a CV is read from the top and the most recent role has to be there.
      entries: [...roles].reverse().map((r) => ({
        left: r.org,
        right: r.place,
        sub: r.role,
        subRight: r.dates,
        bullets: bulletsFor(r),
      })),
    })
  }

  const projects = keep('projects')
  if (projects.length > 0) {
    sections.push({
      id: 'projects',
      entries: projects.map((p) => ({
        left: p.title,
        leftNote: p.tag,
        right: p.pushedAt ? p.pushedAt.slice(0, 4) : '',
        bullets: [p.desc].filter(Boolean),
      })),
    })
  }

  const contrib = keep('contributions')
  if (contrib.length > 0) {
    sections.push({
      id: 'contributions',
      entries: contrib.map((c) => ({
        left: c.project,
        leftNote: c.upstream,
        right: [c.prs && `${c.prs} PR`, c.commits && `${c.commits} commits`].filter(Boolean).join(' · '),
        bullets: [c.desc].filter(Boolean),
      })),
    })
  }

  const cats = keep('skills')
  if (cats.length > 0) {
    sections.push({
      id: 'skills',
      // One line per category, which is how his LaTeX CV does it and the only shape that
      // fits thirty of them on paper.
      lines: cats
        .map((c) => ({
          label: c.label,
          value: byCategory(c.slug)
            .map((s) => {
              const level = skillDisplay(s, lang)
              return level ? `${skillName(s, lang)} (${level})` : skillName(s, lang)
            })
            .join(', '),
        }))
        .filter((l) => l.value !== ''),
    })
  }

  return {
    header: {
      name: profile.name,
      links: [
        { text: profile.email, href: `mailto:${profile.email}` },
        { text: short(profile.github), href: profile.github },
        { text: short(profile.site), href: profile.site },
        { text: short(profile.linkedin), href: profile.linkedin },
      ],
    },
    sections,
  }
}
