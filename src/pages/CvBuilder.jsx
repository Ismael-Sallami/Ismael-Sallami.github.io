import { useEffect, useMemo, useRef, useState } from 'react'
import { Printer, Eye, ListChecks } from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CvPaper from '../components/cv/CvPaper.jsx'
import CvPicker from '../components/cv/CvPicker.jsx'
import { SECTIONS, buildCvModel, itemKey, sectionItems } from '../data/cv-model.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

import '../styles/cv-paper.css'

// Versioned, so a change to the shape ignores the old value instead of breaking on it.
const STORE = 'cv-selection:v1'

const A4_CONTENT_MM = 297 - 24
const LETTER_CONTENT_MM = 279 - 24

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) ?? '{}')
    return raw && typeof raw === 'object' ? raw : {}
  } catch {
    // Private windows and blocked site data both land here, and an empty selection means
    // everything is included, which is the right thing to fall back to.
    return {}
  }
}

const labelFor = (section, item) => {
  if (section === 'experience') return `${item.role} — ${item.org}`
  if (section === 'education') return `${item.degree} — ${item.school}`
  if (section === 'contributions') return `${item.project} (${item.upstream})`
  if (section === 'skills') return item.label
  return item.title
}

export default function CvBuilder() {
  const { t, lang } = useI18n()
  const [excluded, setExcluded] = useState(load)
  const [paper, setPaper] = useState('a4')
  const [guides, setGuides] = useState(true)
  const [mobileView, setMobileView] = useState('pick')
  const [pages, setPages] = useState(1)
  const paperRef = useRef(null)

  const items = useMemo(() => {
    const raw = sectionItems(lang)
    return Object.fromEntries(
      SECTIONS.map((s) => [
        s,
        raw[s].map((i) => ({ ...i, __key: itemKey(s, i), __label: labelFor(s, i) })),
      ]),
    )
  }, [lang])

  const model = useMemo(() => buildCvModel(excluded, lang), [excluded, lang])

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(excluded))
    } catch {
      // Not being able to remember the selection is a nuisance, not a failure.
    }
  }, [excluded])

  // The file name the browser suggests comes from the document title. Set on entering the
  // page rather than only in beforeprint, because Safari does not fire that event.
  useEffect(() => {
    const previous = document.title
    document.title = `Ismael_Sallami_Moreno_CV_${lang.toUpperCase()}`
    return () => {
      document.title = previous
    }
  }, [lang])

  // Lenis keeps its own scroll position and would move the page under the print dialog.
  useEffect(() => {
    const stop = () => window.__lenis?.stop()
    const start = () => window.__lenis?.start()
    addEventListener('beforeprint', stop)
    addEventListener('afterprint', start)
    return () => {
      removeEventListener('beforeprint', stop)
      removeEventListener('afterprint', start)
    }
  }, [])

  // Measured, not estimated: the paper is rendered at its real width, so its height in
  // millimetres is the honest answer. Still labelled "about", because avoiding a break
  // inside an entry moves blocks down and can add a page the measurement cannot see.
  useEffect(() => {
    const el = paperRef.current
    if (!el) return
    let frame
    const measure = () => {
      const mmPerPx = 25.4 / 96
      const contentMm = paper === 'letter' ? LETTER_CONTENT_MM : A4_CONTENT_MM
      setPages(Math.max(1, Math.ceil((el.scrollHeight * mmPerPx) / contentMm)))
    }
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    })
    observer.observe(el)
    document.fonts?.ready.then(measure)
    measure()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [model, paper])

  const toggleSection = (id) =>
    setExcluded((prev) => ({ ...prev, [id]: { ...prev[id], off: !prev[id]?.off, items: prev[id]?.items ?? [] } }))

  const toggleItem = (id, key) =>
    setExcluded((prev) => {
      const out = prev[id]?.items ?? []
      const next = out.includes(key) ? out.filter((k) => k !== key) : [...out, key]
      return { ...prev, [id]: { off: false, items: next } }
    })

  const setAll = (id, on) =>
    setExcluded((prev) => ({
      ...prev,
      [id]: on ? { off: false, items: [] } : { off: false, items: items[id].map((i) => i.__key) },
    }))

  return (
    <PageWrap>
      <div className="cv-print-root">
        <section className="cv-shell mx-auto max-w-7xl px-5 pt-36 pb-24">
          <div className="cv-chrome">
            <PageHeader kicker={t('cv.kicker')} title={t('cv.title')} intro={t('cv.intro')} />
          </div>

          {/* Two columns will not fit a phone, and an A4 sheet at 375px is unreadable, so
              below md it is one or the other rather than a stack. */}
          <div className="cv-chrome mt-8 flex gap-2 md:hidden">
            {[
              ['pick', ListChecks, t('cv.include')],
              ['preview', Eye, t('cv.preview')],
            ].map(([key, Icon, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMobileView(key)}
                aria-pressed={mobileView === key}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm ${
                  mobileView === key ? 'border-accent bg-accent/10 text-accent' : 'border-white/12 text-cool'
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[22rem_1fr]">
            <div className={`cv-chrome ${mobileView === 'pick' ? '' : 'hidden'} md:block`}>
              <div className="glass-text rounded-3xl p-5">
                <CvPicker
                  sections={SECTIONS}
                  items={items}
                  excluded={excluded}
                  onToggleSection={toggleSection}
                  onToggleItem={toggleItem}
                  onAll={setAll}
                />

                <div className="mt-6 space-y-4 border-t border-white/8 pt-5">
                  <label className="flex items-center justify-between text-sm text-cool">
                    {t('cv.paper')}
                    <select
                      value={paper}
                      onChange={(e) => setPaper(e.target.value)}
                      className="rounded-lg border border-white/12 bg-void px-2 py-1 text-ivory"
                    >
                      <option value="a4">A4</option>
                      <option value="letter">Letter</option>
                    </select>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-cool">
                    <input
                      type="checkbox"
                      checked={guides}
                      onChange={() => setGuides((v) => !v)}
                      className="h-4 w-4 accent-[hsl(160,95%,55%)]"
                    />
                    {t('cv.preview')} · {t('cv.pages')}
                  </label>

                  <p aria-live="polite" className="text-sm text-ivory">
                    {t('cv.approx')} {pages} {pages === 1 ? t('cv.page') : t('cv.pages')}
                  </p>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    aria-describedby="cv-print-note"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-void transition-transform hover:scale-[1.02]"
                  >
                    <Printer size={17} /> {t('cv.export')}
                  </button>

                  <p id="cv-print-note" className="text-xs text-cool">
                    {t('cv.exportNote')}
                  </p>
                </div>
              </div>
            </div>

            {/* Lenis swallows the wheel inside nested scrollers unless told not to. */}
            <div
              data-lenis-prevent
              role="region"
              aria-label={t('cv.preview')}
              tabIndex={0}
              className={`cv-preview ${mobileView === 'preview' ? '' : 'hidden'} overflow-auto md:block`}
            >
              <CvPaper model={model} paper={paper} guides={guides} innerRef={paperRef} />
            </div>
          </div>
        </section>
      </div>
    </PageWrap>
  )
}
