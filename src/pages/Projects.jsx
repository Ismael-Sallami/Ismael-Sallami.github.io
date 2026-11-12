import { ArrowUpRight, Sparkles } from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { mergeProjects, localizeProject, getRecognitions } from '../data/projects.js'
import { contributions, localizeContribution } from '../data/contributions.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

// Hand-written cards first, in the order the grid was laid out around, then any
// repository that carries the topic and has no card of its own.
const allProjects = mergeProjects()

export default function Projects() {
  const { t, lang } = useI18n()
  const recognitions = getRecognitions(lang)

  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <PageHeader
          kicker={t('projectsPage.kicker')}
          title={t('projectsPage.title')}
          intro={t('projectsPage.intro')}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {allProjects.map((p, i) => (
            <ProjectCard key={p.url} project={localizeProject(p, lang)} index={i} large={p.featured} />
          ))}
        </div>

        {/* RECOGNITION: XERJ CORPUS HUB (auto-populated from recognized projects) */}
        {recognitions.length > 0 && (
          <div className="glass-text mt-24 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-purple-500/20">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-gradient-to-br from-purple-500/15 via-accent/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                    <span className="h-px w-8 bg-accent" /> {t('xerjRecognition.kicker')}
                  </p>
                  <h2 className="font-display text-3xl tracking-tightest md:text-4xl">
                    {t('xerjRecognition.title')}
                  </h2>
                </div>
                <a
                  href={recognitions[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/15 px-5 py-2.5 text-sm font-semibold text-purple-200 transition-all hover:bg-purple-500/25 hover:border-purple-300"
                >
                  <span>{t('xerjRecognition.cta')}</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              <p className="mt-4 max-w-3xl text-cool">{t('xerjRecognition.intro')}</p>

              <div className="mt-8 space-y-5">
                {recognitions.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-purple-500/30"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-xl text-ivory">{r.project}</span>
                          <span className="rounded-full border border-white/12 px-2.5 py-0.5 text-xs text-cool">
                            {r.fullName}
                          </span>
                          {r.languages && (
                            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                              {r.languages}
                            </span>
                          )}
                          <span className="rounded-full border border-purple-400/30 bg-purple-500/15 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                            {r.role}
                          </span>
                        </div>
                        <p className="max-w-2xl text-sm text-cool">{r.desc}</p>
                      </div>

                      {r.badgeUrl && (
                        <div className="shrink-0">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-transform hover:scale-105"
                          >
                            <img
                              src={r.badgeUrl}
                              alt={`${r.source} contributor badge`}
                              className="h-6"
                              loading="lazy"
                            />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 text-xs text-cool">
                      <span>{r.stats}</span>
                      <div className="flex items-center gap-4">
                        {r.commit && r.commitUrl && (
                          <a
                            href={r.commitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-purple-300 hover:underline"
                          >
                            <span>commit {r.commit}</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        {r.commit && r.corpusUrl && <span className="text-cool/40">·</span>}
                        {r.corpusUrl && (
                          <a
                            href={r.corpusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-accent hover:underline"
                          >
                            <span>corpus {r.corpusSlug}</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other people's projects I contributed to. A row each instead of a card, so
            nothing in this block reads as a repository of mine. Each link opens the
            upstream commit list filtered to my commits, which is the checkable part. */}
        <div className="glass-text mt-16 rounded-3xl p-8 md:p-12">
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
                    {c.lang && (
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                        {c.lang}
                      </span>
                    )}
                    <span className="min-w-[12rem] flex-1 text-sm text-cool">{c.desc}</span>
                    <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-ivory">
                      {c.prs} {c.prs === 1 ? t('contributions.pr') : t('contributions.prs')}
                      <span className="text-cool">·</span>
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
