// Regenerates src/data/skills.generated.json from a Google Sheet.
//
// Run by .github/workflows/skills.yml, or by hand with `npm run sync:skills`. Same sheet
// as the experience timeline, a different tab, and the same reasoning: adding a skill is
// a row rather than an edit to a source file.
//
// With --check it validates the committed JSON instead, without touching the network.
// deploy.yml runs it that way.

import { writeFile, readFile } from 'node:fs/promises'

import { Fail, fetchCsv, readRows } from './lib/sheet.mjs'

const SHEET_ID = process.env.SKILLS_SHEET_ID ?? process.env.EXPERIENCE_SHEET_ID ?? '1XmP8a4ymvgE0CZkxIFF9o2C3d10jqu3d8CHXoUGcajk'
// The skills tab. Addressed by gid rather than by name: see the note in lib/sheet.mjs.
const GID = process.env.SKILLS_SHEET_GID ?? '664274204'

const OUTPUT = new URL('../src/data/skills.generated.json', import.meta.url)
const CATEGORIES_OUT = new URL('../src/data/skills.categories.generated.json', import.meta.url)

const REQUIRED_HEADERS = [
  'nombre', 'nombre_en', 'categoria', 'icono', 'nivel', 'nivel_en',
  'categoria_nombre', 'categoria_nombre_en',
]

const SLUG_CATEGORY_RE = /^[a-z][a-z0-9-]*$/

// Most icons come from devicon, where the file name repeats the slug, so the sheet holds
// just the slug and skills.js builds the URL. Anything already a URL is kept as it is,
// which is how the two flags work. Storing the slug rather than the finished URL keeps
// the devicon pattern in one place instead of baked into thirty rows of generated data.
const SLUG_RE = /^[a-z0-9+#.-]+$/

// The categories come out of the sheet too, so a new one is a row rather than an edit in
// three files. Their order is the order they first appear, which is the order the page
// prints the groups in.
//
// The display name is taken from the first row that gives one; later rows in the same
// category can leave it blank, the same way the English columns inherit. Two rows giving
// different names for one category is a mistake worth stopping for, not a coin toss.
function build(rows) {
  const seen = new Map()
  const skills = []
  const categories = []
  const byslug = new Map()

  for (const row of rows) {
    const { nombre, categoria, icono, nivel, nivel_en: nivelEn, nombre_en: nombreEn } = row

    if (nombre === '') throw new Fail(`Fila ${row.__line}: falta "nombre".`)
    const key = nombre.toLowerCase()
    if (seen.has(key)) {
      throw new Fail(`"${nombre}" aparece dos veces, en las filas ${seen.get(key)} y ${row.__line}.`)
    }
    seen.set(key, row.__line)

    if (categoria === '') throw new Fail(`${nombre}: falta "categoria".`)
    if (!SLUG_CATEGORY_RE.test(categoria)) {
      throw new Fail(
        `${nombre}: categoría "${categoria}"; usa minúsculas, números y guiones, empezando por letra.`,
      )
    }

    const label = row.categoria_nombre
    const labelEn = row.categoria_nombre_en
    let cat = byslug.get(categoria)
    if (!cat) {
      cat = { slug: categoria, es: '', en: '' }
      byslug.set(categoria, cat)
      categories.push(cat)
    }
    for (const [field, value] of [['es', label], ['en', labelEn]]) {
      if (value === '') continue
      if (cat[field] !== '' && cat[field] !== value) {
        throw new Fail(
          `La categoría "${categoria}" tiene dos nombres distintos: "${cat[field]}" y "${value}" (fila ${row.__line}).`,
        )
      }
      cat[field] = value
    }

    if (icono === '') throw new Fail(`${nombre}: falta "icono".`)
    if (!/^https:\/\//.test(icono) && !SLUG_RE.test(icono)) {
      throw new Fail(
        `${nombre}: icono "${icono}" no es ni un slug de devicon ni una URL https.\n` +
        `  Un slug va en minúsculas, como "cplusplus" o "python".`,
      )
    }

    // A level is only shown when someone other than him defined it, which is why there
    // are two left: a CEFR grade and a mother tongue. The English column without the
    // Spanish one would render nothing, so it is caught rather than ignored.
    if (nivel === '' && nivelEn !== '') {
      throw new Fail(`${nombre}: "nivel_en" sin "nivel"; el nivel en español es el que manda.`)
    }

    const skill = { name: nombre, category: categoria, icon: icono }
    // Omitted rather than emitted empty: skillName and skillDisplay both fall back on a
    // missing key, and an empty string would print as blank instead.
    if (nombreEn !== '') skill.nameEn = nombreEn
    if (nivel !== '') skill.display = nivel
    if (nivelEn !== '') skill.displayEn = nivelEn

    skills.push(skill)
  }

  if (skills.length === 0) {
    throw new Fail('Ninguna fila en la pestaña de skills. No se escribe nada.')
  }

  for (const c of categories) {
    if (c.es === '') {
      throw new Fail(
        `La categoría "${c.slug}" no tiene nombre.\n` +
        `  Escríbelo en "categoria_nombre" en la primera fila que la use.`,
      )
    }
    // English is optional and falls back to the Spanish name, same as everywhere else.
    if (c.en === '') c.en = c.es
  }

  // The front page asks for these two by name (Home.jsx), so losing one of them empties
  // that section without any error. Renaming the label is safe; renaming the slug is not.
  for (const slug of ['languages', 'infra']) {
    if (!byslug.has(slug)) {
      console.warn(`WARNING  la portada pide la categoría "${slug}" y ya no existe; esa sección se quedará vacía.`)
    }
  }

  return { skills, categories }
}

function validateSkills(skills, categories) {
  if (!Array.isArray(skills) || skills.length === 0) throw new Fail('No hay ninguna skill.')
  if (!Array.isArray(categories) || categories.length === 0) throw new Fail('No hay ninguna categoría.')
  const slugs = categories.map((c) => c.slug)
  for (const c of categories) {
    if (!c.slug || !c.es || !c.en) throw new Fail(`Categoría incompleta: ${JSON.stringify(c)}`)
  }
  for (const s of skills) {
    if (!s.name || !s.icon) throw new Fail(`Una skill sin nombre o sin icono: ${JSON.stringify(s)}`)
    if (!slugs.includes(s.category)) throw new Fail(`${s.name}: categoría "${s.category}" desconocida.`)
    if (!/^https:\/\//.test(s.icon) && !SLUG_RE.test(s.icon)) {
      throw new Fail(`${s.name}: icono "${s.icon}" no es ni un slug ni una URL https.`)
    }
    for (const [key, value] of Object.entries(s)) {
      if (value === '') throw new Fail(`${s.name}: "${key}" está vacío; debería omitirse.`)
    }
  }
}

const checkOnly = process.argv.includes('--check')

try {
  if (checkOnly) {
    validateSkills(
      JSON.parse(await readFile(OUTPUT, 'utf8')),
      JSON.parse(await readFile(CATEGORIES_OUT, 'utf8')),
    )
    console.log('skills.generated.json es válido.')
  } else {
    const { skills, categories } = build(
      readRows(await fetchCsv(SHEET_ID, GID), REQUIRED_HEADERS, { maxRows: 120 }),
    )
    validateSkills(skills, categories)
    await writeFile(OUTPUT, `${JSON.stringify(skills, null, 2)}\n`)
    await writeFile(CATEGORIES_OUT, `${JSON.stringify(categories, null, 2)}\n`)
    console.log(`${skills.length} skills en ${categories.length} categorías`)
    for (const c of categories) {
      console.log(`  ${c.slug} (${c.es}): ${skills.filter((s) => s.category === c.slug).length}`)
    }
  }
} catch (err) {
  if (err instanceof Fail) {
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
  throw err
}
