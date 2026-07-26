import { ArrowUpRight } from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects, localizeProject } from '../data/projects.js'
import { contributions, localizeContribution } from '../data/contributions.js'
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

        {/* Other people's projects I contributed to. A row each instead of a card, so
            nothing in this block reads as a repository of mine. Each link opens the
            upstream commit list filtered to my commits, which is the checkable part. */}
        <div className="mt-24">
          <h2 className="font-display text-3xl tracking-tightest md:text-4xl">
            {t('contributions.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-cool">{t('contributions.intro')}</p>

          <ul className="mt-8 divide-y divide-white/8 overflow-hidden rounded-3xl border border-white/8">
            {contributions.map((raw) => {
              const c = localizeContribution(raw, lang)
              return (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-2 p-5 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="font-display text-lg text-ivory">{c.project}</span>
                    <span className="rounded-full border border-white/12 px-2.5 py-0.5 text-xs text-cool">
                      {c.upstream}
                    </span>
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                      {c.lang}
                    </span>
                    <span className="min-w-[12rem] flex-1 text-sm text-cool">{c.desc}</span>
                    <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-ivory">
                      {c.commits}{' '}
                      {c.commits === 1 ? t('contributions.commit') : t('contributions.commits')}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </PageWrap>
  )
}
