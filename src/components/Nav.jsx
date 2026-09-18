import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cvs, localizeDocument } from '../data/documents.js'
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

// What the CV menu offers, in one place. It used to be built twice, here and again in the
// mobile menu below, which is how the two drifted: an entry added to one was missing from
// the other.
//
// The builder goes first because it is the one that reflects whatever the site says today;
// the three files under docs/CVs/ are snapshots, better written but frozen.
function cvItems(lang, t) {
  return [
    { kind: 'route', key: 'builder', to: '/cv', title: t('cv.menuTitle'), note: t('cv.menuNote') },
    ...cvs.map((raw) => ({ kind: 'file', key: raw.file, ...localizeDocument(raw, lang) })),
  ]
}

// The CV button. With more than one entry it opens a menu to pick from; with exactly one
// it stays a plain download link, because a menu of one is a nuisance.
function CvMenu() {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const buttonRef = useRef(null)
  const items = cvItems(lang, t)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (items.length === 0) return null

  if (items.length === 1) {
    return (
      <a
        href={items[0].url}
        download={items[0].file}
        className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-105"
      >
        <Download size={16} /> {t('nav.cv')}
      </a>
    )
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-105"
      >
        <Download size={16} /> {t('nav.cv')}
        <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="menu"
            aria-label={t('nav.cvMenu')}
            className="glass-text absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl p-1.5"
          >
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cool">
              {t('nav.cvMenu')}
            </p>
            {items.map((f) => {
              const Item = f.kind === 'route' ? Link : 'a'
              const props =
                f.kind === 'route'
                  ? { to: f.to }
                  : { href: f.url, download: f.file }
              const Icon = f.kind === 'route' ? SlidersHorizontal : Download
              return (
                <Item
                  key={f.key}
                  {...props}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/8"
                >
                  <Icon size={15} className="mt-1 shrink-0 text-accent" />
                  <span>
                    <span className="block text-sm font-medium text-ivory">{f.title}</span>
                    {f.note && <span className="block text-xs text-cool">{f.note}</span>}
                  </span>
                </Item>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Nav() {
  const { t, lang } = useI18n()
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
          <CvMenu />
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
            className="glass-text mt-3 overflow-hidden md:hidden"
          >
            {links.map((l) => (
              <li key={l.to} className="border-b border-white/5">
                <NavLink to={l.to} className="block px-6 py-4 text-cool hover:text-ivory">
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="px-6 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cool">
                {t('nav.cvMenu')}
              </p>
              <ul className="space-y-2">
                {cvItems(lang, t).map((f) => {
                  const Item = f.kind === 'route' ? Link : 'a'
                  const props = f.kind === 'route' ? { to: f.to } : { href: f.url, download: f.file }
                  const Icon = f.kind === 'route' ? SlidersHorizontal : Download
                  return (
                    <li key={f.key}>
                      <Item
                        {...props}
                        className="flex items-start gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5"
                      >
                        <Icon size={15} className="mt-1 shrink-0 text-accent" />
                        <span>
                          <span className="block text-sm font-medium text-ivory">{f.title}</span>
                          {f.note && <span className="block text-xs text-cool">{f.note}</span>}
                        </span>
                      </Item>
                    </li>
                  )
                })}
              </ul>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
