const icon = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

// Grouped by what each thing is, not by how good I claim to be at it.
//
// This used to carry a percentage per skill and draw a bar from it. The number was
// invented: there was no scale under it, so 80% in Python said nothing a reader could
// use, and it forced comparisons that came out wrong. LaTeX and Markdown sat at 90 and
// Kubernetes at 60, which read as "writes documents better than he deploys" right above
// a timeline about twelve weeks of Kubernetes work.
//
// Grouping by type is what my CV already does (Languages / Infrastructure / Spoken), so
// the two now match, and a reader looking for one thing knows which group to read. It
// also asks nobody to believe a self-assessment: the list only says these exist.
//
// The two levels left are the C1 and Nativo, which are CEFR and a fact. That is the test
// a level has to pass to stay: someone other than me defined it.
export const CATEGORIES = ['languages', 'infra', 'web', 'data', 'writing', 'spoken']

export const skills = [
  // --- languages
  { name: 'C++', category: 'languages', icon: icon('cplusplus') },
  { name: 'Python', category: 'languages', icon: icon('python') },
  { name: 'C', category: 'languages', icon: icon('c') },
  { name: 'Java', category: 'languages', icon: icon('java') },
  { name: 'JavaScript', category: 'languages', icon: icon('javascript') },
  { name: 'Bash', category: 'languages', icon: icon('bash') },
  { name: 'Ruby', category: 'languages', icon: icon('ruby') },

  // --- infrastructure and deployment
  { name: 'Kubernetes', category: 'infra', icon: icon('kubernetes') },
  // The GSoC chart was written from scratch because none existed upstream.
  { name: 'Helm', category: 'infra', icon: icon('helm') },
  { name: 'Docker', category: 'infra', icon: icon('docker') },
  { name: 'Ansible', category: 'infra', icon: icon('ansible') },
  { name: 'Linux', category: 'infra', icon: icon('linux') },
  { name: 'Git', category: 'infra', icon: icon('git') },
  // 24 of my repositories run a workflow. Nothing else here is used as widely.
  { name: 'GitHub Actions', category: 'infra', icon: icon('githubactions') },
  { name: 'Grafana', category: 'infra', icon: icon('grafana') },
  { name: 'Prometheus', category: 'infra', icon: icon('prometheus') },
  { name: 'YAML', category: 'infra', icon: icon('yaml') },

  // --- web
  { name: 'React', category: 'web', icon: icon('react') },
  { name: 'HTML', category: 'web', icon: icon('html5') },
  { name: 'CSS', category: 'web', icon: icon('css3') },
  { name: 'Tailwind', category: 'web', icon: icon('tailwindcss') },
  { name: 'FastAPI', category: 'web', icon: icon('fastapi') },

  // --- data and computation
  // Oracle rather than MySQL: the database coursework is Oracle. The oracle icon is a
  // wide wordmark that turns into an illegible sliver at 24px, so this uses the SQL
  // Developer one, which reads as a database at icon size.
  { name: 'Oracle SQL', category: 'data', icon: icon('sqldeveloper') },
  { name: 'PostgreSQL', category: 'data', icon: icon('postgresql') },
  { name: 'scikit-learn', category: 'data', icon: icon('scikitlearn') },
  // No devicon slug for MPI, so it borrows the C++ mark it is always written with.
  { name: 'MPI', category: 'data', icon: icon('cplusplus') },

  // --- technical writing
  { name: 'LaTeX', category: 'writing', icon: icon('latex') },
  { name: 'Markdown', category: 'writing', icon: icon('markdown') },

  // --- spoken
  {
    name: 'Español',
    nameEn: 'Spanish',
    category: 'spoken',
    display: 'Nativo',
    displayEn: 'Native',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1ea-1f1f8.svg',
  },
  {
    name: 'Inglés',
    nameEn: 'English',
    category: 'spoken',
    display: 'C1',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1ec-1f1e7.svg',
  },
]

// Skill display name for the active language.
export function skillName(skill, lang) {
  return lang === 'en' && skill.nameEn ? skill.nameEn : skill.name
}

// The badge next to a name, for the skills whose level someone else defined.
export function skillDisplay(skill, lang) {
  if (!skill.display) return null
  return lang === 'en' && skill.displayEn ? skill.displayEn : skill.display
}

// Skills of one category, in the order they are declared above.
export function byCategory(category) {
  return skills.filter((s) => s.category === category)
}
