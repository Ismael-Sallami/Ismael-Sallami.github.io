import { motion } from 'framer-motion'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { skillName } from '../data/skills.js'

export default function SkillBar({ skill, index }) {
  const { lang } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      className="glass rounded-2xl p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-3 font-display text-lg">
          <img src={skill.icon} alt="" width={24} height={24} loading="lazy" />
          {skillName(skill, lang)}
        </h3>
        <span className="font-body text-sm font-bold accent-text">
          {skill.display ?? `${skill.level}%`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
        />
      </div>
    </motion.div>
  )
}
