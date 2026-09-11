import { motion } from 'framer-motion'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { skillName, skillDisplay } from '../data/skills.js'

// One skill. No bar and no number: see the note at the top of data/skills.js.
//
// The entrance is the same fade-and-rise the project cards and the timeline use, so the
// section still assembles itself as you reach it, which is what the filling bar was
// doing. A typing effect was the other candidate and is the wrong tool here: the thirty
// names are 190 characters, which is about ten seconds before the list can be read.
export default function SkillChip({ skill, index }) {
  const { lang } = useI18n()
  const badge = skillDisplay(skill, lang)

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      // No negative margin here, unlike the cards. Dropping the bars made this page
      // short enough to fit one screen, and a row sitting 50px off the bottom edge
      // never cleared a -40px trigger, so the last tier stayed at opacity 0 for good.
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.35, delay: (index % 10) * 0.04 }}
      className="glass-text flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4"
    >
      <img src={skill.icon} alt="" width={20} height={20} loading="lazy" className="shrink-0" />
      <span className="text-sm font-medium text-ivory">{skillName(skill, lang)}</span>
      {badge && (
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
          {badge}
        </span>
      )}
    </motion.li>
  )
}
