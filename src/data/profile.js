// Who he is, in one place.
//
// This existed in four places before, and they had already drifted: the degree was called
// something different in each of `strings.js` (twice), `index.html` and the LaTeX CV, and
// the LinkedIn address was written out in both `Footer.jsx` and `Home.jsx`. A CV and a
// site that someone reads side by side cannot say different things, which is the same
// reason the GSoC figure is read from the contributions file instead of typed.
//
// The header of a generated CV comes from here, and so does the badge under the name on
// the home page.
//
// Deliberately absent: the phone number. It is on the LaTeX CV, which goes to people who
// asked for it; this file feeds a public page.

export const profile = {
  name: 'Ismael Sallami Moreno',
  email: 'ismengineer23@gmail.com',
  github: 'https://github.com/Ismael-Sallami',
  linkedin: 'https://es.linkedin.com/in/ismael-sallami-moreno-2257072b9',
  site: 'https://ismael-sallami.github.io',
}

// Shown without the scheme, which is noise on paper.
export const short = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export const education = [
  {
    id: 'ugr-double-degree',
    school: 'Universidad de Granada',
    place: 'Granada',
    degree: 'Doble Grado en Ingeniería Informática y Administración de Empresas',
    dates: 'sep 2022 — jun 2027',
    // Empty means still studying, the same convention the timeline uses.
    end: null,
    en: {
      school: 'University of Granada',
      place: 'Granada, Spain',
      degree: 'Double Degree in Computer Engineering and Business Administration',
      dates: 'Sep 2022 — Jun 2027 (expected)',
    },
  },
]

// The badge under the name on the home page reads this, so it cannot disagree with the CV.
export function degreeBadge(lang) {
  const e = education[0]
  if (!e) return ''
  return lang === 'en'
    ? 'Double Degree in Computer Engineering + Business · UGR'
    : 'Doble grado Informática + ADE · UGR'
}

export function localizeEducation(e, lang) {
  if (lang !== 'en' || !e.en) return e
  return { ...e, ...e.en }
}
