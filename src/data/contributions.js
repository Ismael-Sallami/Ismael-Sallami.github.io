// Contributions to other people's projects, kept apart from my own repositories.
//
// A fork's README describes the upstream project, not my work in it, so these get a row
// rather than a card. The bar is a merged pull request: a fork with none is a clone, and
// calling it a contribution would be false.
//
// The numbers are not written here. `scripts/sync-contributions.mjs` pulls them from the
// GitHub API into contributions.generated.json, weekly in CI, so they cannot go stale.
// What stays by hand is the description, which no API can write.
import generated from './contributions.generated.json'

// Repositories to leave out, each with its reason, live in contributions.exclude.json.
// The sync script reads the same file, so there is one place to edit it.

// Keyed by owner/repo. A repository with no entry still shows, with its numbers and no
// description, rather than disappearing.
const meta = {
  'openMF/mifos-gazelle': {
    desc: 'Trabajo de Google Summer of Code 2026: integrar OpenSPP como cuarto Digital Public Good de la herramienta de despliegue en Kubernetes de Mifos, con su Helm chart escrito de cero porque no existía.',
    en: 'Google Summer of Code 2026 work: integrating OpenSPP as a fourth Digital Public Good into Mifos’ Kubernetes deployment tool, with its Helm chart written from scratch since none existed.',
  },
  'openMF/mifos-x-reporting-plugin-birt': {
    desc: 'Módulo de informes BIRT para Mifos X, sobre el backend Apache Fineract.',
    en: 'BIRT reporting module for Mifos X, on top of the Apache Fineract backend.',
  },
  'openMF/mifos-reporting-plugin': {
    desc: 'Traducción al inglés de los informes del módulo de reporting de Mifos X.',
    en: 'English translation of the reports in the Mifos X reporting module.',
  },
  'cBioPortal/cbioportal-frontend': {
    desc: 'Interfaz del portal cBioPortal de genómica del cáncer.',
    en: 'Front end of the cBioPortal cancer genomics portal.',
  },
}

export const contributions = generated.map((row) => {
  const slug = `${row.owner}/${row.repo}`
  return {
    project: row.repo,
    upstream: row.owner,
    lang: row.lang,
    prs: row.prs,
    commits: row.commits,
    // The upstream commit list filtered to my authorship, which is the checkable part.
    url: `https://github.com/${slug}/commits?author=Ismael-Sallami`,
    ...meta[slug],
  }
})

// Contribution description for the active language (falls back to ES).
export function localizeContribution(c, lang) {
  if (lang === 'en' && c.en) return { ...c, desc: c.en }
  return c
}
