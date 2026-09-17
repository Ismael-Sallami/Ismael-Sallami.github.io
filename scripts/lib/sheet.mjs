// Reading a Google Sheet as CSV, shared by the syncs that do it.
//
// The sheet is fetched over a plain unauthenticated GET. That is the whole reason this
// approach was chosen over an API with a token: there is no version to track and nothing
// to rotate. The URL shape has not changed in over a decade.
//
// Tabs are addressed by gid and never by name. The gviz endpoint accepts a sheet name,
// but when the name does not exist it silently returns the first tab instead of failing,
// so renaming a tab would quietly point a sync at the wrong data.

export class Fail extends Error {}

export const csvUrl = (sheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`

export async function fetchCsv(sheetId, gid) {
  const url = csvUrl(sheetId, gid)
  let res
  try {
    res = await fetch(url, { redirect: 'follow' })
  } catch (err) {
    throw new Fail(`No se pudo contactar con Google: ${err.message}`)
  }

  if (!res.ok) {
    throw new Fail(
      `La hoja respondió ${res.status}. ¿Sigue existiendo y compartida como "cualquiera con el enlace"?\n  ${url}`,
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

// A real RFC 4180 state machine rather than split(','). It has to be: a description that
// contains a comma comes back as one quoted cell, and splitting would shift every column
// after it.
export function parseCsv(text) {
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

  if (field !== '' || row.length > 0) endRow()

  return rows
}

// Headers are written by a person, so read them forgivingly: accents stripped, case and
// spacing ignored.
export const normHeader = (h) =>
  h.normalize('NFD').replace(/\p{M}/gu, '')
    .trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

// A non-breaking space is invisible in the sheet and survives trim in some engines, which
// makes an exact comparison fail for no visible reason.
export const clean = (v) => (v ?? '').replace(/ /g, ' ').trim()

// Turns the grid into one object per row, keyed by header. Empty cells stay as '', so a
// caller can tell "written and blank" from "column missing" by checking the header list.
export function readRows(csv, requiredHeaders, { maxRows = 200 } = {}) {
  const raw = parseCsv(csv)
  if (raw.length === 0) throw new Fail('La hoja está vacía.')

  const header = raw[0].map(normHeader)
  const missing = requiredHeaders.filter((h) => !header.includes(h))
  if (missing.length > 0) {
    throw new Fail(
      `Faltan columnas: ${missing.join(', ')}.\n  Encontradas: ${header.filter(Boolean).join(', ')}`,
    )
  }

  const rows = []
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
    for (const h of requiredHeaders) row[h] ??= ''
    row.__line = n + 1
    rows.push(row)
  }

  if (rows.length > maxRows) {
    throw new Fail(`${rows.length} filas de datos. ¿Es la pestaña correcta?`)
  }

  return rows
}
