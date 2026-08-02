import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import cvUrl from '../../docs/CV.pdf?url'
import { useI18n } from '../i18n/LanguageContext.jsx'

function LangToggle({ className = '' }) {
  const { lang, setLang } = useI18n()
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/12 bg-white/5 p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language / Idioma"
    >
      {['es', 'en'].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1 uppercase transition-colors ${
            lang === code ? 'bg-accent text-void' : 'text-cool hover:text-ivory'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export default function Nav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/certificates', label: t('nav.certificates') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-void font-display text-lg font-semibold">
            is
          </span>
          <span className="hidden font-display text-lg tracking-tightest sm:block">
            Ismael <span className="text-cool">Sallami</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-colors hover:text-ivory ${
                    isActive ? 'text-ivory' : 'text-cool'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LangToggle />
          <a
            href={cvUrl}
            download
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-105"
          >
            <Download size={16} /> {t('nav.cv')}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <button className="text-ivory" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mt-3 overflow-hidden md:hidden"
          >
            {links.map((l) => (
              <li key={l.to} className="border-b border-white/5">
                <NavLink to={l.to} className="block px-6 py-4 text-cool hover:text-ivory">
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="px-6 py-4">
              <a href={cvUrl} download className="flex w-max items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-void">
                <Download size={16} /> {t('nav.cv')}
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
