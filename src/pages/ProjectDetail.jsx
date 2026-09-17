import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Calendar, Code2 } from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'
import ReadmeView from '../components/ReadmeView.jsx'
import CodeOrbitButton from '../components/CodeOrbitButton.jsx'
import { findProject, localizeProject } from '../data/projects.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

import '../styles/readme.css'
import '../styles/orbit.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lang } = useI18n()
  const raw = findProject(slug)

  // The catch-all route renders the home page, so an unknown slug would silently look
  // like a redirect. Better to say so and offer the way back.
  if (!raw) {
    return (
      <PageWrap>
        <section className="mx-auto max-w-3xl px-5 pt-36 pb-24">
          <div className="glass-text rounded-3xl p-8 md:p-12">
            <h1 className="font-display text-4xl tracking-tightest">404</h1>
            <p className="mt-4 text-cool">{t('project.notFound')}</p>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent"
            >
              <ArrowLeft size={16} />
              {t('project.back')}
            </Link>
          </div>
        </section>
      </PageWrap>
    )
  }

  const project = localizeProject(raw, lang)
  const date =
    project.pushedAt &&
    new Date(`${project.pushedAt}T00:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    })

  return (
    <PageWrap>
      <section className="mx-auto max-w-4xl px-5 pt-36 pb-28">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-1.5 text-sm text-cool transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          {t('project.back')}
        </Link>

        <header className="glass-text mt-6 overflow-hidden rounded-3xl">
          <div className="relative h-44 md:h-56">
            <img
              src={project.img}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/70 to-transparent" />
          </div>

          <div className="p-8 pt-0 md:p-12 md:pt-0">
            <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {project.tag}
            </span>
            <h1 className="mt-3 font-display text-4xl tracking-tightest md:text-5xl">
              {project.title}
            </h1>
            {project.desc && <p className="mt-4 max-w-2xl text-lg text-cool">{project.desc}</p>}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cool">
              {project.language && (
                <span className="inline-flex items-center gap-1.5">
                  <Code2 size={15} className="text-accent" />
                  {project.language}
                </span>
              )}
              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={15} className="text-accent" />
                  {t('project.updated')}: {date}
                </span>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ivory transition-colors hover:text-accent"
              >
                {t('project.repository')}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </header>

        <article className="glass-text mt-8 rounded-3xl p-6 md:p-12">
          <ReadmeView slug={project.slug} url={project.url} hasReadme={project.hasReadme} />
        </article>
      </section>

      <CodeOrbitButton url={project.url} />
    </PageWrap>
  )
}
