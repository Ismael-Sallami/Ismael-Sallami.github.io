import { Github } from 'lucide-react'

import { useI18n } from '../i18n/LanguageContext.jsx'

// The way out of a project page and into its code. Fixed rather than inline, because a
// README runs long and the link is the one thing a reader is likely to want at any
// point in it.
export default function CodeOrbitButton({ url }) {
  const { t } = useI18n()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('project.viewCode')}
      title={t('project.viewCode')}
      className="orbit-fab fixed bottom-6 right-6 z-[45] grid h-14 w-14 place-items-center rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:bottom-8 md:right-8"
    >
      <span className="orbit-ring" aria-hidden="true" />
      <span className="orbit-track" aria-hidden="true">
        <i className="orbit-dot" />
      </span>
      <Github size={22} className="relative z-10" />
    </a>
  )
}
