import { useEffect, useState } from 'react'
import { ArrowUpRight, Info } from 'lucide-react'

import { useI18n } from '../i18n/LanguageContext.jsx'

// One chunk per README, fetched only when its page opens.
//
// The whole set is about 350 KB of HTML. Imported eagerly it would land in the main
// bundle and be downloaded by everyone who opens the home page; behind a glob without
// `eager` Vite emits a file per README and the browser asks for exactly one. A missing
// file shows up here as a key that is not in the map, which is a build-time mistake
// rather than a 404 in production.
const readmes = import.meta.glob('../data/readmes/*.html', {
  query: '?raw',
  import: 'default',
})

export default function ReadmeView({ slug, url, hasReadme }) {
  const { t, lang } = useI18n()
  const [state, setState] = useState({ status: 'loading', html: '' })

  useEffect(() => {
    const load = readmes[`../data/readmes/${slug}.html`]
    if (!slug || !hasReadme || !load) {
      setState({ status: 'missing', html: '' })
      return
    }

    let live = true
    setState({ status: 'loading', html: '' })
    load()
      .then((html) => live && setState({ status: 'ready', html }))
      .catch(() => live && setState({ status: 'failed', html: '' }))

    return () => {
      live = false
    }
  }, [slug, hasReadme])

  if (state.status === 'loading') {
    return (
      <div className="animate-pulse space-y-4" aria-hidden="true">
        <div className="h-7 w-2/5 rounded-lg bg-white/8" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-11/12 rounded bg-white/5" />
        <div className="h-4 w-4/5 rounded bg-white/5" />
        <div className="h-28 w-full rounded-xl bg-white/5" />
        <div className="h-4 w-10/12 rounded bg-white/5" />
        <div className="h-4 w-3/5 rounded bg-white/5" />
      </div>
    )
  }

  if (state.status !== 'ready') {
    return (
      <div className="text-cool">
        <p>{state.status === 'missing' ? t('project.readmeMissing') : t('project.readmeFailed')}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 font-medium text-accent"
        >
          {t('project.openOnGithub')}
          <ArrowUpRight size={16} />
        </a>
      </div>
    )
  }

  const notice = lang === 'es' ? t('project.readmeInEnglish') : ''

  return (
    <>
      {notice && (
        <p className="mb-8 flex items-start gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-cool">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" />
          {notice}
        </p>
      )}
      {/* The HTML comes from GitHub's own /markdown endpoint, which sanitises what it
          returns: a <script> comes back escaped and event handlers are stripped. The
          sources are this account's repositories plus the ones its cards point at, and
          a new repository only joins by being given a topic on purpose. */}
      <div className="readme" dangerouslySetInnerHTML={{ __html: state.html }} />
    </>
  )
}
