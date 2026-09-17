// Regenerates src/data/experience.generated.json from a Google Sheet.
//
// Run by .github/workflows/experience.yml every morning, or by hand with
// `npm run sync:experience`. The roles on the home timeline come from here, so adding a
// job is a row in a spreadsheet rather than an edit to a source file.
//
// Why a spreadsheet and not Notion: Notion split databases into data sources in API
// version 2025-09-03, deprecating the query endpoint, and an integration left on the old
// version starts failing the moment a database gains a second source. It also needs a
// token. A shared sheet needs none of that. This is one unauthenticated GET of a CSV, and
// that URL shape has not moved in over a decade.
//
// With --check it validates the committed JSON instead, without touching the network.
// deploy.yml runs it that way: the site is one component deep here, and App.jsx sends
// every unknown route to Home, so a bad role object blanks the whole site rather than one
// section. A red deploy is the better failure.

import { writeFile, readFile } from 'node:fs/promises'

// Not a secret. The whole design rests on the sheet being readable by anyone with the
// link, which is what lets this run with no token; hiding the id would buy nothing and
// would mask it in the logs, turning a 404 into guesswork. Same convention as
// sync-projects.mjs, which hardcodes the owner and the topic. The override is for
// testing against a copy.
const SHEET_ID = process.env.EXPERIENCE_SHEET_ID ?? '1XmP8a4ymvgE0CZkxIFF9o2C3d10jqu3d8CHXoUGcajk'
const GID = process.env.EXPERIENCE_SHEET_GID ?? '0'

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`

const OUTPUT = new URL('../src/data/experience.generated.json', import.meta.url)
const PROJECTS = new URL('../src/data/projects.generated.json', import.meta.url)

// Fields that describe the role itself rather than its wording. They are read from the
// Spanish row only, so there is no way for the two rows to disagree about them.
const ES_ONLY = ['publicar', 'fin', 'cifra_enlace', 'cifra_fuente']

// Fields that have a version per language.
const PER_LANG = ['puesto', 'organizacion', 'lugar', 'fechas', 'etiquetas', 'descripcion', 'cifra_valor', 'cifra_texto']

const REQUIRED_HEADERS = ['id', 'idioma', ...ES_ONLY, ...PER_LANG]

// A figure can quote live numbers instead of frozen ones. Two placeholders and no more:
// a template language here would be a liability, not a feature.
const MARKERS = ['prs', 'commits']

const MAX_ROWS = 50

class Fail extends Error {}

// --- CSV --------------------------------------------------------------------------
//
// A real RFC 4180 state machine rather than split(','). It has to be: the GSoC
// description contains a comma, so Google quotes the whole cell, and splitting would
// shift every column after it.

function parseCsv(text) {
  // Only at position 0. Left in place it becomes part of the first header, which then
  // matches nothing and silently empties that column.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)

  const rows = []
  let row = []
  let field = ''
  let quoted = false
  let i = 0

  const endField = () => { row.push(field); field = '' }
  const endRow = () => { endField(); rows.push(row); row = [] }

  while (i < text.length) {
    const c = text[i]

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue }
        quoted = false; i++; continue
      }
      field += c; i++; continue
    }

    if (c === '"' && field === '') { quoted = true; i++; continue }
    if (c === ',') { endField(); i++; continue }
    // \r\n, \n and a lone \r all end a record. A naive split('\n') leaves the \r stuck to
    // the last field of every row, and it survives all the way into the DOM.
    if (c === '\r') { endRow(); if (text[i + 1] === '\n') i++; i++; continue }
    if (c === '\n') { endRow(); i++; continue }

    field += c; i++
  }

  // Whatever is pending when the text runs out is still a record, unless the file simply
  // ended with a newline.
  if (field !== '' || row.length > 0) endRow()

  return rows
}

// Written by a person, so read forgivingly: accents stripped, case and spacing ignored.
const normHeader = (h) =>
  h.normalize('NFD').replace(/\p{M}/gu, '')
    .trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

// A non-breaking space is invisible in the sheet and survives trim in some engines, which
// makes an exact comparison fail for no visible reason. Stripped from control columns
// only; in prose it may well be deliberate, as in "35 h".
const clean = (v) => (v ?? '').replace(/ /g, ' ').trim()

// --- fetching ---------------------------------------------------------------------

async function fetchCsv() {
  let res
  try {
    res = await fetch(CSV_URL, { redirect: 'follow' })
  } catch (err) {
    throw new Fail(`No se pudo contactar con Google: ${err.message}`)
  }

  if (!res.ok) {
    throw new Fail(
      `La hoja respondió ${res.status}. ¿Sigue existiendo y compartida como "cualquiera con el enlace"?\n  ${CSV_URL}`,
    )
  }

  // A sheet that is not shared does not answer 403. It redirects to the Google sign-in
  // page and serves HTML with status 200, which a CSV parser will happily turn into
  // nonsense rows. This is the check that catches it.
  const type = res.headers.get('content-type') ?? ''
  if (!type.includes('text/csv')) {
    throw new Fail(
      `La hoja devolvió ${type.split(';')[0] || 'nada'} en vez de CSV.\n` +
      `  Casi siempre significa que no está compartida. Ábrela, Compartir, Acceso general,\n` +
      `  "Cualquier persona con el enlace" con rol Lector.`,
    )
  }

  return res.text()
}

// --- the sheet, turned into records ------------------------------------------------

function readSheet(csv) {
  const raw = parseCsv(csv)
  if (raw.length === 0) throw new Fail('La hoja está vacía.')

  const header = raw[0].map(normHeader)
  const missing = REQUIRED_HEADERS.filter((h) => !header.includes(h))
  if (missing.length > 0) {
    throw new Fail(
      `Faltan columnas: ${missing.join(', ')}.\n  Encontradas: ${header.filter(Boolean).join(', ')}`,
    )
  }

  const records = []
  for (let n = 1; n < raw.length; n++) {
    const cells = raw[n]
    // Google emits an all-empty record for every formatted-but-blank row at the bottom.
    if (cells.every((c) => clean(c) === '')) continue

    // A row longer than the header is usually a note typed into a stray column, which
    // would otherwise be dropped without a word.
    if (cells.length > header.length) {
      const extra = cells.slice(header.length).map(clean).filter(Boolean)
      if (extra.length > 0) {
        throw new Fail(`Fila ${n + 1}: hay texto fuera de las columnas conocidas ("${extra[0]}").`)
      }
    }

    const row = {}
    header.forEach((h, k) => { if (h) row[h] = clean(cells[k]) })
    // A short row is fine; the missing cells are simply empty.
    for (const h of REQUIRED_HEADERS) row[h] ??= ''
    row.__line = n + 1
    records.push(row)
  }

  if (records.length > MAX_ROWS) {
    throw new Fail(`${records.length} filas de datos. ¿Es la pestaña correcta?`)
  }

  return records
}

// --- validation of the sheet itself -------------------------------------------------

const ID_RE = /^[a-z0-9-]+$/
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/
const LOCAL_DATE_RE = /^\d{1,2}\/\d{1,2}\/\d{4}$/

function checkEnd(id, value) {
  if (value === '') return null

  // Sheets turns an ISO date into a date value and exports it in the sheet's locale, so a
  // Spanish sheet hands back 24/08/2026. Guessing is not an option: 01/02/2026 is
  // ambiguous and getting it wrong moves the date by four weeks.
  if (LOCAL_DATE_RE.test(value)) {
    throw new Fail(
      `${id}: "fin" es "${value}". Sheets ha convertido la celda en fecha.\n` +
      `  Selecciona la columna "fin", Formato → Número → Texto sin formato, y vuelve a\n` +
      `  escribirla como 2026-08-24.`,
    )
  }
  if (!ISO_RE.test(value)) {
    throw new Fail(`${id}: "fin" es "${value}"; usa el formato 2026-08-24, o déjalo vacío si sigue abierto.`)
  }

  const [y, m, d] = value.split('-').map(Number)
  const parsed = new Date(Date.UTC(y, m - 1, d))
  if (parsed.getUTCFullYear() !== y || parsed.getUTCMonth() !== m - 1 || parsed.getUTCDate() !== d) {
    throw new Fail(`${id}: "fin" es "${value}", que no es una fecha real.`)
  }
  return value
}

async function validRoutes() {
  const projects = JSON.parse(await readFile(PROJECTS, 'utf8'))
  return new Set(['/', '/projects', '/skills', '/certificates', ...projects.map((p) => `/projects/${p.slug}`)])
}

function checkLink(id, value, routes) {
  if (value === '') return null

  // The href in Timeline.jsx is the one place a sheet value reaches the DOM unescaped.
  if (/^\s*(javascript|data|vbscript):/i.test(value)) {
    throw new Fail(`${id}: "cifra_enlace" usa un esquema que no se permite.`)
  }
  if (value.startsWith('https://') || value.startsWith('http://')) return { url: value }
  if (!value.startsWith('/')) {
    throw new Fail(`${id}: "cifra_enlace" es "${value}"; debe empezar por https:// o por /.`)
  }
  // Without this an internal typo renders the home page, because App.jsx routes every
  // unknown path there. The link would look broken without being broken.
  if (!routes.has(value)) {
    throw new Fail(
      `${id}: la ruta interna "${value}" no existe.\n  Válidas: /, /projects, /skills, /certificates y /projects/<slug>.`,
    )
  }
  return { to: value }
}

function checkTemplates(id, source, texts) {
  const used = new Set()
  for (const t of texts) {
    for (const m of (t ?? '').matchAll(/\{(\w+)\}/g)) {
      if (!MARKERS.includes(m[1])) {
        throw new Fail(`${id}: marcador {${m[1]}} desconocido; solo {prs} y {commits}.`)
      }
      used.add(m[1])
    }
  }
  if (used.size > 0 && source === '') {
    throw new Fail(`${id}: la cifra usa {${[...used][0]}} pero "cifra_fuente" está vacía.`)
  }
  if (used.size === 0 && source !== '') {
    throw new Fail(`${id}: "cifra_fuente" indicada pero ninguna plantilla la usa.`)
  }
}

// --- sheet records into roles --------------------------------------------------------

const tagsOf = (value) => value.split(',').map((t) => t.trim()).filter(Boolean)

async function buildRoles(records) {
  const routes = await validRoutes()
  const byId = new Map()

  for (const row of records) {
    const { id, idioma } = row
    if (!ID_RE.test(id)) {
      throw new Fail(`Fila ${row.__line}: id "${id || '(vacío)'}"; solo minúsculas, números y guiones.`)
    }
    if (idioma !== 'es' && idioma !== 'en') {
      throw new Fail(`Fila ${row.__line}: idioma "${idioma}"; usa es o en.`)
    }

    const entry = byId.get(id) ?? {}
    if (entry[idioma]) {
      throw new Fail(`id duplicado "${id}": dos filas ${idioma}, en las líneas ${entry[idioma].__line} y ${row.__line}.`)
    }
    entry[idioma] = row
    byId.set(id, entry)
  }

  const roles = []
  for (const [id, pair] of byId) {
    const es = pair.es
    if (!es) throw new Fail(`"${id}" tiene fila en pero no es.`)

    // The scoped columns are read from the Spanish row. Filling them in on the English
    // row means someone expects them to be read there, and quietly ignoring that would
    // be worse than stopping.
    if (pair.en) {
      const stray = ES_ONLY.filter((f) => pair.en[f] !== '')
      if (stray.length > 0) {
        throw new Fail(
          `${id}: ${stray.map((s) => `"${s}"`).join(', ')} relleno en la fila en; ese campo solo se lee de la fila es.`,
        )
      }
    }

    if (es.publicar.toLowerCase() !== 'si' && es.publicar.toLowerCase() !== 'sí') continue

    for (const field of ['puesto', 'organizacion', 'descripcion', 'fechas']) {
      if (es[field] === '') throw new Fail(`${id}: "${field}" es obligatoria en la fila es.`)
    }

    const link = checkLink(id, es.cifra_enlace, routes)
    checkTemplates(id, es.cifra_fuente, [es.cifra_valor, es.cifra_texto, pair.en?.cifra_valor, pair.en?.cifra_texto])

    if ((es.cifra_valor === '') !== (es.cifra_texto === '')) {
      throw new Fail(`${id}: "cifra_valor" y "cifra_texto" van juntas; pon las dos o ninguna.`)
    }
    if (es.cifra_valor === '' && link) {
      throw new Fail(`${id}: hay "cifra_enlace" pero no hay cifra que enlazar.`)
    }

    const role = {
      id,
      role: es.puesto,
      org: es.organizacion,
      place: es.lugar,
      dates: es.fechas,
      end: checkEnd(id, es.fin),
      tags: tagsOf(es.etiquetas),
      desc: es.descripcion,
    }

    if (es.cifra_valor !== '') {
      role.figure = { value: es.cifra_valor, label: es.cifra_texto, ...link }
      if (es.cifra_fuente !== '') role.figure.source = es.cifra_fuente
    }

    // An empty English cell must OMIT the key, never emit an empty string. localizeRole
    // does `{ ...r, ...r.en }`, so a key that is present and empty blanks the Spanish
    // value instead of falling back to it. Most of these cells are empty in practice.
    const en = {}
    const put = (key, value) => { if (value !== undefined && value !== '') en[key] = value }
    if (pair.en) {
      const e = pair.en
      put('role', e.puesto)
      put('org', e.organizacion)
      put('place', e.lugar)
      put('dates', e.fechas)
      if (e.etiquetas !== '') en.tags = tagsOf(e.etiquetas)
      put('desc', e.descripcion)
      if (role.figure) {
        put('figureValue', e.cifra_valor)
        put('figureLabel', e.cifra_texto)
      }
    }
    if (Object.keys(en).length > 0) role.en = en

    roles.push(role)
  }

  if (roles.length === 0) {
    throw new Fail('Ninguna fila con publicar = si. No se escribe nada; se mantiene lo ya commiteado.')
  }

  // The file's own comment treats this as load-bearing: "the role still open ends the
  // list", because the hollow dot is what closes the timeline. Worth saying out loud, not
  // worth refusing to publish over.
  const openAt = roles.findIndex((r) => r.end === null)
  if (openAt !== -1 && openAt !== roles.length - 1) {
    console.warn(`WARNING  ${roles[openAt].id} sigue abierto pero no es el último; el punto hueco quedará en medio de la línea.`)
  }

  return roles
}

// --- shape validation, shared with --check -------------------------------------------

function validateRoles(roles) {
  if (!Array.isArray(roles) || roles.length === 0) throw new Fail('No hay ningún rol.')

  for (const r of roles) {
    for (const field of ['id', 'role', 'org', 'dates', 'desc']) {
      if (typeof r[field] !== 'string' || r[field] === '') throw new Fail(`${r.id ?? '?'}: falta "${field}".`)
    }
    if (!Array.isArray(r.tags)) throw new Fail(`${r.id}: "tags" debe ser una lista.`)
    if (r.end !== null && !ISO_RE.test(r.end ?? '')) throw new Fail(`${r.id}: "end" debe ser una fecha ISO o null.`)
    if (r.figure) {
      if (!r.figure.value || !r.figure.label) throw new Fail(`${r.id}: la cifra necesita value y label.`)
      if (r.figure.url && /^\s*(javascript|data|vbscript):/i.test(r.figure.url)) {
        throw new Fail(`${r.id}: el enlace de la cifra usa un esquema que no se permite.`)
      }
    }
    // The bug this guards against is invisible until someone reads the English page.
    for (const [key, value] of Object.entries(r.en ?? {})) {
      if (value === '' || (Array.isArray(value) && value.length === 0)) {
        throw new Fail(`${r.id}: en.${key} está vacío; debería omitirse, no vaciar el campo español.`)
      }
    }
  }
}

// --- run -----------------------------------------------------------------------------

const checkOnly = process.argv.includes('--check')

try {
  if (checkOnly) {
    validateRoles(JSON.parse(await readFile(OUTPUT, 'utf8')))
    console.log('experience.generated.json es válido.')
  } else {
    const roles = await buildRoles(readSheet(await fetchCsv()))
    validateRoles(roles)
    // Nothing is written until everything has been read and checked, so a sync that dies
    // halfway cannot leave a half-built timeline behind.
    await writeFile(OUTPUT, `${JSON.stringify(roles, null, 2)}\n`)
    console.log(`${roles.length} roles escritos en src/data/experience.generated.json`)
    for (const r of roles) console.log(`  ${r.id}${r.end === null ? '  (abierto)' : ''}`)
  }
} catch (err) {
  if (err instanceof Fail) {
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
  throw err
}
