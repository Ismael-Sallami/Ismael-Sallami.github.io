// Checks the files under docs/ against the `labels` map in src/data/documents.js.
//
// The glob in documents.js already makes a new file appear on the site, so this is not
// what adds it. What it catches is the file appearing with a title guessed from its name
// ("Gsoc 2026 Mifos Initiative") without anyone noticing, and a label left pointing at a
// file that was renamed or deleted.
//
// `node scripts/check-documents.mjs --fix` writes the missing entries into the map with
// the guessed title, ready to be corrected by hand.

import { readdir, readFile, writeFile } from 'node:fs/promises'

const DOCUMENTS = new URL('../src/data/documents.js', import.meta.url)
const FOLDERS = [
  new URL('../docs/CVs/', import.meta.url),
  new URL('../docs/certificates/', import.meta.url),
]

const fix = process.argv.includes('--fix')

function titleFromFileName(file) {
  return file
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const source = await readFile(DOCUMENTS, 'utf8')
const labelsBlock = source.match(/export const labels = \{[\s\S]*?\n\}/)
if (!labelsBlock) {
  console.error('Could not find `export const labels = {` in src/data/documents.js.')
  process.exit(1)
}
const labelled = new Set([...labelsBlock[0].matchAll(/^ {2}'([^']+)':/gm)].map((m) => m[1]))

const onDisk = []
for (const folder of FOLDERS) {
  const files = await readdir(folder)
  for (const file of files) {
    if (file.startsWith('.')) continue
    onDisk.push({ file, folder: folder.pathname.split('/').filter(Boolean).slice(-1)[0] })
  }
}

const problems = []

// A name with a space, an accent or a "Copia de" prefix survives every tool until it
// reaches a URL, where it turns into %20 and %C3%B3. The GSoC certificate arrived as
// "Copia de completion_certificate_2026_contributor.pdf".
for (const { file, folder } of onDisk) {
  if (/[^\w.-]/.test(file)) {
    problems.push(`docs/${folder}/${file} — the name needs letters, digits, dot, dash and underscore only`)
  }
  if (/^copia de/i.test(file)) {
    problems.push(`docs/${folder}/${file} — drop the "Copia de" prefix`)
  }
}

// Not a problem any more. A file with no entry is titled from its own name, which is the
// ordinary way to add one: copy it in and it shows up. An entry in `labels` is for when
// the derived title is not good enough, which is mostly acronyms.
const missing = onDisk.filter(({ file }) => !labelled.has(file))

const diskNames = new Set(onDisk.map((d) => d.file))
for (const file of labelled) {
  if (!diskNames.has(file)) {
    problems.push(`labels has '${file}' but no such file exists under docs/`)
  }
}

if (problems.length === 0) {
  console.log(`${onDisk.length} documents, all safely named.`)
  for (const { file, folder } of missing) {
    console.log(`  docs/${folder}/${file} → "${titleFromFileName(file)}"  (derived; write a title if that reads badly)`)
  }
  process.exit(0)
}

if (fix && missing.length) {
  const additions = missing
    .map(({ file }) => {
      const title = titleFromFileName(file)
      return `  '${file}': {\n    es: '${title}',\n    en: '${title}',\n  },`
    })
    .join('\n')
  const patched = source.replace(labelsBlock[0], labelsBlock[0].replace(/\n\}$/, `\n${additions}\n}`))
  await writeFile(DOCUMENTS, patched)
  console.log(`Added ${missing.length} placeholder entries to labels. Write the real titles in:`)
  for (const { file } of missing) console.log(`  ${file}`)
  process.exit(0)
}

console.error('Problems with the documents under docs/:\n')
for (const p of problems) console.error(`  ${p}`)
console.error('\nFix the names, or write the titles in src/data/documents.js:')
console.error('  node scripts/check-documents.mjs --fix')
process.exit(1)
