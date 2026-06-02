const icon = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

export const skills = [
  { name: 'HTML', level: 95, icon: icon('html5') },
  { name: 'CSS', level: 70, icon: icon('css3') },
  { name: 'JavaScript', level: 70, icon: icon('javascript') },
  { name: 'SQL', level: 80, icon: icon('mysql') },
  { name: 'C++', level: 100, icon: icon('cplusplus') },
  { name: 'Python', level: 85, icon: icon('python') },
  { name: 'Grafana', level: 70, icon: icon('grafana') },
  { name: 'Prometheus', level: 65, icon: icon('prometheus') },
  { name: 'YAML', level: 80, icon: icon('yaml') },
  { name: 'Markdown', level: 90, icon: icon('markdown') },
  { name: 'LaTeX', level: 90, icon: icon('latex') },
  { name: 'Ruby', level: 60, icon: icon('ruby') },
  { name: 'Java', level: 70, icon: icon('java') },
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
