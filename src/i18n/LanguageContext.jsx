import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { dict } from './strings.js'

const LanguageContext = createContext(null)

function detectInitial() {
  const saved = typeof localStorage !== 'undefined' && localStorage.getItem('lang')
  if (saved === 'es' || saved === 'en') return saved
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return nav.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      /* ignore (private mode) */
    }
  }, [])

  // t('hero.badge') → resolves dotted path against the active language.
  const t = useCallback(
    (path) => {
      const parts = path.split('.')
      let node = dict[lang]
      for (const p of parts) {
        node = node?.[p]
        if (node === undefined) return path
      }
      return node
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
