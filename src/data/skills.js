const icon = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

// Ordered by how much of my work sits behind each one, because the front page shows
// only the first six as a preview. Levels are self-assessed and deliberately
// conservative: a declared 100 says more about judgement than about skill.
export const skills = [
  { name: 'C++', level: 90, icon: icon('cplusplus') },
  { name: 'Python', level: 85, icon: icon('python') },
  { name: 'React', level: 80, icon: icon('react') },
  // Oracle rather than MySQL: the database work in DDSI is Oracle.
  { name: 'SQL', level: 80, icon: icon('oracle') },
  { name: 'Git', level: 85, icon: icon('git') },
  { name: 'Docker', level: 70, icon: icon('docker') },

  { name: 'JavaScript', level: 70, icon: icon('javascript') },
  { name: 'Tailwind', level: 80, icon: icon('tailwindcss') },
  { name: 'HTML', level: 85, icon: icon('html5') },
  { name: 'CSS', level: 70, icon: icon('css3') },
  { name: 'PostgreSQL', level: 75, icon: icon('postgresql') },
  { name: 'FastAPI', level: 70, icon: icon('fastapi') },
  { name: 'Bash', level: 80, icon: icon('bash') },
  { name: 'Kubernetes', level: 60, icon: icon('kubernetes') },
  { name: 'scikit-learn', level: 70, icon: icon('scikitlearn') },
  { name: 'Java', level: 70, icon: icon('java') },
  { name: 'Ruby', level: 60, icon: icon('ruby') },
  { name: 'LaTeX', level: 90, icon: icon('latex') },
  { name: 'Markdown', level: 90, icon: icon('markdown') },
  { name: 'YAML', level: 80, icon: icon('yaml') },
  { name: 'Grafana', level: 70, icon: icon('grafana') },
  { name: 'Prometheus', level: 65, icon: icon('prometheus') },
  {
    name: 'Inglés',
    nameEn: 'English',
    level: 85,
    display: 'C1',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1ec-1f1e7.svg',
  },
]

// Skill display name for the active language (only "Inglés" differs).
export function skillName(skill, lang) {
  return lang === 'en' && skill.nameEn ? skill.nameEn : skill.name
}
