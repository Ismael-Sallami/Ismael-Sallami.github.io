// The PDFs and images under docs/, discovered at build time.
//
// Vite resolves these globs when it compiles, so adding a CV or a certification is
// copying the file into its folder. Nothing here needs editing for it to show up.
//
// What a glob cannot work out is the human title, so that lives in `labels` below,
// keyed by file name. A file with no entry still appears, titled from its name, and
// `scripts/check-documents.mjs` fails the build listing what is missing.

const cvFiles = import.meta.glob('../../docs/CVs/*.pdf', {
  query: '?url',
  import: 'default',
  eager: true,
})

const certificateFiles = import.meta.glob('../../docs/certificates/*.{pdf,png,jpg,jpeg}', {
  query: '?url',
  import: 'default',
  eager: true,
})

// Titles and the one-line note under each CV. `note` is only used by the CV menu, and
// `year` only by the certifications section of the generated CV; both are optional.
export const labels = {
  'oracle-oci-ai-foundations-2025.pdf': {
    es: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    en: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    year: '2025',
  },
  'gsoc-2026-mifos-initiative.pdf': {
    es: 'Google Summer of Code 2026 · The Mifos Initiative',
    en: 'Google Summer of Code 2026 · The Mifos Initiative',
    year: '2026',
  },
  'ahrefs-marketing-platform-2026.png': {
    es: "Certified in Ahrefs' Marketing Platform",
    en: "Certified in Ahrefs' Marketing Platform",
    year: '2026',
  },
}

// The order the site shows them in. Anything not listed goes after, alphabetically.
// Nothing to order while docs/CVs/ is empty; a file dropped back in sorts by name.
const cvOrder = []

// Certifications sort themselves, newest first, from the year in the file name. The list
// used to be written out by hand, so a new one landed at the bottom behind three older
// ones, which is the opposite of what anybody wants to see first.
//
// A file with no year in its name goes after the dated ones rather than pretending to be
// current, and ties fall back to the name so the order never wobbles between builds.
const certificateOrder = []

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']

// "gsoc-2026-mifos-initiative.pdf" -> "Gsoc 2026 Mifos Initiative".
//
// This is the normal case, not a stand-in: dropping a file into docs/ is all it takes for
// it to appear with a readable title. An entry in `labels` is for when the derived one is
// not good enough, which is mostly acronyms — "Oci Ai" instead of "OCI AI" — and anything
// that wants an accent or a character a file name cannot carry.
export function titleFromFileName(file) {
  return file
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// A four-digit run in the file name is the year the certificate is from. Bounded so a
// version number or a resolution cannot be mistaken for one.
export function yearFromFileName(file) {
  const match = file.replace(/\.[^.]+$/, '').match(/(?:^|[_-])(19|20)(\d{2})(?:[_-]|$)/)
  return match ? `${match[1]}${match[2]}` : undefined
}

function build(modules, order, { byYear = false } = {}) {
  return Object.entries(modules)
    .map(([path, url]) => {
      const file = path.split('/').pop()
      const extension = file.split('.').pop().toLowerCase()
      return {
        file,
        url,
        kind: IMAGE_EXTENSIONS.includes(extension) ? 'image' : 'pdf',
        label: labels[file] ?? null,
      }
    })
    .sort((a, b) => {
      const ai = order.indexOf(a.file)
      const bi = order.indexOf(b.file)
      if (ai !== -1 && bi !== -1) return ai - bi
      if (ai !== -1) return -1
      if (bi !== -1) return 1
      if (byYear) {
        const ay = yearFromFileName(a.file)
        const by = yearFromFileName(b.file)
        if (ay && by && ay !== by) return by.localeCompare(ay)
        if (ay && !by) return -1
        if (!ay && by) return 1
      }
      return a.file.localeCompare(b.file)
    })
}

export const cvs = build(cvFiles, cvOrder)
export const certificates = build(certificateFiles, certificateOrder, { byYear: true })

// Title and note for the active language, falling back to ES and then to the file name.
export function localizeDocument(doc, lang) {
  const { label } = doc
  const title = label ? (lang === 'en' ? label.en : label.es) : titleFromFileName(doc.file)
  const note = label ? (lang === 'en' ? label.noteEn : label.noteEs) : undefined
  // A written year wins, and the file name answers when there is none.
  return { ...doc, title, note, year: label?.year ?? yearFromFileName(doc.file) }
}
