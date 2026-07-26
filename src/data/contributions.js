// Contributions to other people's projects, kept apart from my own repositories.
//
// A fork's README describes the upstream project, not my work in it, so these get
// a row rather than a card. Only forks with at least one commit merged upstream are
// listed: a fork with none is just a clone, and calling it a contribution would be
// false. That check dropped two of the five I had.
//
// `commits` counts commits authored by me in the upstream default branch, which is
// verifiable at the link. Re-check with:
//   gh api "repos/<upstream>/commits?author=Ismael-Sallami" --jq 'length'
export const contributions = [
  {
    project: 'mifos-gazelle',
    upstream: 'openMF',
    lang: 'Shell',
    commits: 12,
    url: 'https://github.com/openMF/mifos-gazelle/commits?author=Ismael-Sallami',
    desc: 'Despliegue de infraestructura para el paquete de banca digital de Mifos.',
    en: { desc: 'Infrastructure deployment for the Mifos digital banking package.' },
  },
  {
    project: 'mifos-x-reporting-plugin-birt',
    upstream: 'openMF',
    lang: 'Java',
    commits: 5,
    url: 'https://github.com/openMF/mifos-x-reporting-plugin-birt/commits?author=Ismael-Sallami',
    desc: 'Módulo de informes BIRT para Mifos X, sobre el backend Apache Fineract.',
    en: { desc: 'BIRT reporting module for Mifos X, on top of the Apache Fineract backend.' },
  },
  {
    project: 'cbioportal-frontend',
    upstream: 'cBioPortal',
    lang: 'TypeScript',
    commits: 1,
    url: 'https://github.com/cBioPortal/cbioportal-frontend/commits?author=Ismael-Sallami',
    desc: 'Interfaz del portal cBioPortal de genómica del cáncer.',
    en: { desc: 'Front end of the cBioPortal cancer genomics portal.' },
  },
]

// Contribution description for the active language (falls back to ES).
export function localizeContribution(c, lang) {
  if (lang === 'en' && c.en) return { ...c, desc: c.en.desc }
  return c
}
