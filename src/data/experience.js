// Where I have worked. The roles themselves live in a Google Sheet, not here.
//
// scripts/sync-experience.mjs reads that sheet every morning and writes
// experience.generated.json, so adding a job is a row in a spreadsheet rather than an
// edit to this file. Order comes from the sheet: oldest first, so the role still open
// ends the list and the hollow dot closes the timeline.
//
// Same shape as projects.js: Spanish in the fields, English in `en`, one function to pick
// a language.
import roles from './experience.generated.json'
import contributions from './contributions.generated.json'

// A figure can quote live numbers instead of frozen ones. The GSoC entry does: the sheet
// stores `{prs} PRs` and the repository it comes from, never the number itself.
//
// This has to happen here, at module time, and not in the sync. The contributions file is
// rewritten by its own weekly workflow; if the daily experience sync baked the number in,
// it would freeze at whatever it was that morning and start contradicting the figure
// /projects shows from the same source.
function resolve(text, row) {
  return text.replace(/\{(\w+)\}/g, (whole, key) => (key in row ? String(row[key]) : whole))
}

// A missing row leaves the entry without a figure rather than printing "undefined PRs",
// which is what the old `gazelle && { ... }` did.
function withFigures(role) {
  if (!role.figure?.source) return role

  const row = contributions.find((c) => `${c.owner}/${c.repo}` === role.figure.source)
  if (!row) {
    const { figure, en, ...rest } = role
    if (!en) return rest
    const { figureValue, figureLabel, ...restEn } = en
    return Object.keys(restEn).length > 0 ? { ...rest, en: restEn } : rest
  }

  const figure = { ...role.figure, value: resolve(role.figure.value, row), label: resolve(role.figure.label, row) }
  delete figure.source

  if (!role.en) return { ...role, figure }
  const en = { ...role.en }
  if (en.figureValue) en.figureValue = resolve(en.figureValue, row)
  if (en.figureLabel) en.figureLabel = resolve(en.figureLabel, row)
  return { ...role, figure, en }
}

export const experience = roles.map(withFigures)

// A role with no end date is still open, which is what the hollow dot means. Derived
// from the data so it cannot disagree with the dates printed next to it.
export function isOngoing(role) {
  return role.end === null
}

// The role for the active language, falling back to the Spanish fields. `figure` is
// nested, so spreading `en` over the role would drop it; it is rebuilt by hand.
export function localizeRole(r, lang) {
  if (lang !== 'en' || !r.en) return r
  const figure =
    r.figure && {
      ...r.figure,
      value: r.en.figureValue ?? r.figure.value,
      label: r.en.figureLabel ?? r.figure.label,
    }
  return { ...r, ...r.en, figure }
}
