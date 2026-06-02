import PageWrap from '../components/PageWrap.jsx'
import SkillBar from '../components/SkillBar.jsx'
import { skills } from '../data/skills.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Skills() {
  const { t } = useI18n()
  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-accent" /> {t('skillsPage.kicker')}
        </p>
        <h1 className="font-display text-5xl tracking-tightest md:text-6xl">{t('skillsPage.title')}</h1>
        <p className="mt-5 max-w-2xl text-lg text-cool">{t('skillsPage.intro')}</p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} />
          ))}
        </div>
      </section>
    </PageWrap>
  )
}
