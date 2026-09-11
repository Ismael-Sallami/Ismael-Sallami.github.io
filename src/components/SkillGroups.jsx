import { CATEGORIES, byCategory } from '../data/skills.js'
import SkillChip from './SkillChip.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

// The categories, each a wrapping row of chips. `only` takes a list of category keys,
// which is how the front page shows a subset without hardcoding names.
export default function SkillGroups({ only }) {
  const { t } = useI18n()
  const groups = only ?? CATEGORIES

  return (
    <div className="space-y-10">
      {groups.map((category) => {
        const items = byCategory(category)
        if (items.length === 0) return null
        return (
          <div key={category}>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-cool">
              {t(`skillsPage.categories.${category}`)}
              <span className="h-px flex-1 bg-white/10" />
              <span className="font-body text-xs normal-case tracking-normal">{items.length}</span>
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {items.map((s, i) => (
                <SkillChip key={s.name} skill={s} index={i} />
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
