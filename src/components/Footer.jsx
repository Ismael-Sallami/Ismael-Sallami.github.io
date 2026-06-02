import { Github, Linkedin } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative z-10 border-t border-white/5 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-cool md:flex-row">
        <p>
          © 2025 <span className="text-ivory">Ismael Sallami Moreno</span>. {t('footer.rights')}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Ismael-Sallami"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href="https://es.linkedin.com/in/ismael-sallami-moreno-2257072b9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
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
