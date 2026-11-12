import { useState, useEffect, useCallback } from 'react'
import { Award, Download, Maximize2, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import PageWrap from '../components/PageWrap.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { certificates, localizeDocument } from '../data/documents.js'

export default function Certificates() {
  const { t, lang } = useI18n()
  const docs = certificates.map((d) => localizeDocument(d, lang))
  const [selectedIdx, setSelectedIdx] = useState(null)

  const activeDoc = selectedIdx !== null ? docs[selectedIdx] : null

  const handleClose = useCallback(() => {
    setSelectedIdx(null)
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) => (prev === null ? null : (prev - 1 + docs.length) % docs.length))
  }, [docs.length])

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) => (prev === null ? null : (prev + 1) % docs.length))
  }, [docs.length])

  useEffect(() => {
    if (selectedIdx === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedIdx, handleClose, handlePrev, handleNext])

  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <PageHeader
          kicker={t('certificatesPage.kicker')}
          title={t('certificatesPage.title')}
          intro={t('certificatesPage.intro')}
        />

        {/* Masonry column layout: certificates naturally hug their exact aspect ratio without dead vertical space */}
        <div className="mt-12 columns-1 gap-6 md:columns-2 [column-fill:_balance]">
          {docs.map((d, idx) => (
            <article
              key={d.file}
              className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Award size={15} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-sm font-medium text-ivory sm:text-base">
                      {d.title}
                    </h3>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {d.year && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-cool font-mono">
                      {d.year}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={`${t('certificatesPage.viewFull')}: ${d.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-cool transition-colors hover:border-white/20 hover:text-ivory"
                  >
                    <Maximize2 size={15} />
                  </button>
                  <a
                    href={d.url}
                    download={d.file}
                    aria-label={`${t('certificatesPage.download')}: ${d.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-cool transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Download size={15} />
                  </a>
                </div>
              </div>

              {/* Card Preview: image fits edge-to-edge with no dead borders or awkward letterboxing */}
              <div
                onClick={() => setSelectedIdx(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedIdx(idx)
                  }
                }}
                className="group/img relative block w-full cursor-pointer overflow-hidden bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {d.previewUrl ? (
                  <img
                    src={d.previewUrl}
                    alt={d.title}
                    loading="lazy"
                    className="block w-full h-auto select-none transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                ) : d.kind === 'image' ? (
                  <img
                    src={d.url}
                    alt={d.title}
                    loading="lazy"
                    className="block w-full h-auto select-none transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                ) : (
                  <iframe
                    src={`${d.url}#toolbar=0&view=FitH`}
                    title={d.title}
                    className="aspect-[1.33/1] w-full bg-white/5"
                    loading="lazy"
                  />
                )}

                {/* Subtle hover overlay badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover/img:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 text-xs font-medium text-ivory shadow-xl backdrop-blur-md">
                    <Maximize2 size={13} className="text-accent" />
                    {t('certificatesPage.viewFull')}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Fullscreen Modal Lightbox */}
        {activeDoc && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={activeDoc.title}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-cool-950/95 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Award size={18} className="shrink-0 text-accent" />
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-base font-medium text-ivory">
                      {activeDoc.title}
                    </h2>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-cool transition-colors hover:border-white/20 hover:text-ivory"
                  >
                    <ExternalLink size={13} />
                    <span className="hidden sm:inline">{t('certificatesPage.openPdf')}</span>
                  </a>
                  <a
                    href={activeDoc.url}
                    download={activeDoc.file}
                    className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/25"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">{t('certificatesPage.download')}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={t('certificatesPage.close')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-cool transition-colors hover:border-white/20 hover:text-ivory"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-auto bg-black/60 p-3 sm:p-6">
                <img
                  src={activeDoc.previewUrl || activeDoc.url}
                  alt={activeDoc.title}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />

                {/* Left/Right Navigation */}
                {docs.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-ivory shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 sm:left-5"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-ivory shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 sm:right-5"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs text-cool font-mono">
                <span>
                  {selectedIdx + 1} / {docs.length}
                </span>
                <span>{activeDoc.file}</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageWrap>
  )
}
