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
  'Ismael_Sallami_Moreno_CV_EN.pdf': {
    es: 'CV general',
    en: 'General CV',
    noteEs: 'Inglés · perfil completo',
    noteEn: 'English · full profile',
  },
  'Ismael_Sallami_Moreno_CV_ES.pdf': {
    es: 'CV en español',
    en: 'CV in Spanish',
    noteEs: 'Español · perfil completo',
    noteEn: 'Spanish · full profile',
  },
  'Ismael_Sallami_Moreno_CV_SWE.pdf': {
    es: 'CV técnico',
    en: 'Engineering CV',
    noteEs: 'Inglés · infraestructura y algoritmos',
    noteEn: 'English · infrastructure and algorithms',
  },
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
const cvOrder = [
  'Ismael_Sallami_Moreno_CV_EN.pdf',
  'Ismael_Sallami_Moreno_CV_ES.pdf',
  'Ismael_Sallami_Moreno_CV_SWE.pdf',
]

const certificateOrder = [
  'gsoc-2026-mifos-initiative.pdf',
  'oracle-oci-ai-foundations-2025.pdf',
  'ahrefs-marketing-platform-2026.png',
]

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']

// "gsoc-2026-mifos-initiative.pdf" -> "Gsoc 2026 Mifos Initiative". Only a stand-in
// until the file gets a real entry in `labels`.
export function titleFromFileName(file) {
  return file
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function build(modules, order) {
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
      return a.file.localeCompare(b.file)
    })
}

export const cvs = build(cvFiles, cvOrder)
export const certificates = build(certificateFiles, certificateOrder)

// Title and note for the active language, falling back to ES and then to the file name.
export function localizeDocument(doc, lang) {
  const { label } = doc
  const title = label ? (lang === 'en' ? label.en : label.es) : titleFromFileName(doc.file)
  const note = label ? (lang === 'en' ? label.noteEn : label.noteEs) : undefined
  return { ...doc, title, note, year: label?.year }
}
