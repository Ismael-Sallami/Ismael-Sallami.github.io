import PageWrap from '../components/PageWrap.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects, localizeProject } from '../data/projects.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Projects() {
  const { t, lang } = useI18n()
  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-accent" /> {t('projectsPage.kicker')}
        </p>
        <h1 className="font-display text-5xl tracking-tightest md:text-6xl">{t('projectsPage.title')}</h1>
        <p className="mt-5 max-w-2xl text-lg text-cool">{t('projectsPage.intro')}</p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.url} project={localizeProject(p, lang)} index={i} large={p.featured} />
          ))}
        </div>
      </section>
    </PageWrap>
  )
}
