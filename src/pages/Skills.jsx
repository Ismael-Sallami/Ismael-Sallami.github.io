import PageWrap from '../components/PageWrap.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SkillGroups from '../components/SkillGroups.jsx'
import { skills } from '../data/skills.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Skills() {
  const { t } = useI18n()
  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        {/* Header and groups share one panel: the group labels are bare text too, and
            over the blob they measured 1.59:1 on their own. */}
        <PageHeader kicker={t('skillsPage.kicker')} title={t('skillsPage.title')} intro={t('skillsPage.intro')}>
          {/* Counted from the data, so the copy cannot claim a number the list does not have. */}
          <p className="mt-3 max-w-2xl text-sm text-cool">
            {t('skillsPage.note').replace('{n}', skills.length)}
          </p>
          <div className="mt-12">
            <SkillGroups />
          </div>
        </PageHeader>
      </section>
    </PageWrap>
  )
}
