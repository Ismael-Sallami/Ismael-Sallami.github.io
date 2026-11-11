import { Github, Linkedin } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { profile } from '../data/profile.js'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative z-10 border-t border-white/5 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-cool md:flex-row">
        <p>
          {/* Read from the clock so it does not need touching every January. */}
          © {new Date().getFullYear()} <span className="text-ivory">Ismael Sallami Moreno</span>. {t('footer.rights')}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
          {profile.xerj && (
            <a
              href={profile.xerj}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="XERJ Corpus Hub"
              title="XERJ Corpus Hub Contributor"
              className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-purple-300 transition-colors hover:border-purple-400 hover:text-purple-200"
            >
              XERJ·HUB
            </a>
          )}
        </div>

        <ul className="flex gap-5">
          <li>
            <a
              href="https://www.termsfeed.com/live/83259c50-7f6f-4565-b0d8-b43deaf7e92c"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory"
            >
              {t('footer.terms')}
            </a>
          </li>
          <li>
            <a
              href="https://www.freeprivacypolicy.com/live/b5f07469-9f8f-4e3e-be2e-9d2f9977cad4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory"
            >
              {t('footer.privacy')}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
