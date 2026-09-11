// Where I have worked. Ordered oldest first, so the role still open ends the list.
//
// The three overlap, and that is not a typo: GSoC ran May to August, the Erasmus+
// placement July to September, and the research grant started in May and pauses for
// both. Each entry prints its own range so the overlap reads as deliberate.
//
// Same shape as projects.js: Spanish in the fields, English in `en`, one function to
// pick a language.
import generated from './contributions.generated.json'

// The GSoC figure is the same number /projects shows, read from the file the weekly
// workflow rewrites. Typing it here is how it would end up contradicting that page.
// A missing row leaves the entry without a figure rather than throwing.
const gazelle = generated.find((r) => `${r.owner}/${r.repo}` === 'openMF/mifos-gazelle')

export const experience = [
  {
    id: 'gsoc-2026',
    role: 'Google Summer of Code 2026 Contributor',
    org: 'The Mifos Initiative',
    place: 'Remoto',
    dates: 'may — ago 2026',
    end: '2026-08-24',
    tags: ['Kubernetes', 'Helm', 'Python'],
    desc: 'Integré OpenSPP como cuarto Digital Public Good de la herramienta de despliegue en Kubernetes de Mifos, con su Helm chart escrito de cero porque no existía ninguno. El alta pasó de un docker-compose a mano a una sola orden.',
    figure: gazelle && {
      value: `${gazelle.prs} PRs`,
      label: `mergeados upstream · ${gazelle.commits} commits`,
      url: 'https://github.com/openMF/mifos-gazelle/commits?author=Ismael-Sallami',
    },
    en: {
      place: 'Remote',
      dates: 'May — Aug 2026',
      desc: 'Integrated OpenSPP as a fourth Digital Public Good into Mifos’ Kubernetes deployment tool, writing its Helm chart from scratch since none existed. Setup went from a hand-run docker-compose to one command.',
      figureLabel: `merged upstream · ${gazelle?.commits} commits`,
    },
  },
  {
    id: 'erasmus-cork',
    role: 'Digital Marketing & E-Commerce Intern (Erasmus+)',
    org: 'Golden Moments Worldwide',
    place: 'Cork, Irlanda',
    dates: 'jul — sep 2026',
    end: '2026-09-30',
    tags: ['SEO', 'Ahrefs', 'JavaScript'],
    desc: 'Cambios de front-end en HTML, CSS y JavaScript, análisis de tráfico con Ahrefs y definición de la estrategia SEO, además de negociación con partners y atención al cliente.',
    figure: {
      value: '35 h',
      label: 'a la semana, íntegramente en inglés',
      to: '/certificates',
    },
    en: {
      place: 'Cork, Ireland',
      dates: 'Jul — Sep 2026',
      desc: 'Front-end changes in HTML, CSS and JavaScript, traffic analysis with Ahrefs and the SEO strategy, plus partner negotiation and customer support.',
      figureLabel: 'a week, entirely in English',
    },
  },
  {
    id: 'catedra-gpu',
    role: 'Becario de investigación',
    org: 'Cátedra GPU Solutions, Universidad de Granada',
    place: 'Granada',
    dates: 'may 2026 · retoma oct 2026',
    end: null,
    tags: ['Eficiencia energética', 'IA', 'HPC'],
    desc: 'Plaza financiada de seis meses sobre eficiencia energética en infraestructura de IA, en el clúster GPU-Lab-UGR. Pausada para el Google Summer of Code y retomada en octubre.',
    figure: {
      value: '6 meses',
      label: 'de beca, y la base del TFG',
    },
    en: {
      role: 'Undergraduate Research Scholar',
      org: 'Cátedra GPU Solutions, University of Granada',
      place: 'Granada, Spain',
      dates: 'May 2026 · resuming Oct 2026',
      tags: ['Energy efficiency', 'AI', 'HPC'],
      desc: 'A funded six-month placement on energy efficiency in AI infrastructure, on the GPU-Lab-UGR cluster. Paused for Google Summer of Code and picked up again in October.',
      figureValue: '6 months',
      figureLabel: 'of funding, and the basis of the undergraduate thesis',
    },
  },
]

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
