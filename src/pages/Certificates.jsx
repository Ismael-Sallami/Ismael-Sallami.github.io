import { FileText, Download } from 'lucide-react'
import PageWrap from '../components/PageWrap.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { certificates, localizeDocument } from '../data/documents.js'

export default function Certificates() {
  const { t, lang } = useI18n()
  // Whatever is in docs/certificates/. Dropping a file in there adds a card.
  const docs = certificates.map((d) => localizeDocument(d, lang))

  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <PageHeader
          kicker={t('certificatesPage.kicker')}
          title={t('certificatesPage.title')}
          intro={t('certificatesPage.intro')}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl">
          {docs.map((d) => (
            <div key={d.file} className="glass-text flex flex-col overflow-hidden rounded-2xl">
              <div className="flex items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
                <h3 className="flex items-start gap-2 font-display text-lg">
                  <FileText size={18} className="mt-1 shrink-0 text-accent" /> {d.title}
                </h3>
                <a
                  href={d.url}
                  download={d.file}
                  aria-label={`${t('certificatesPage.download')}: ${d.title}`}
                  className="mt-1 shrink-0 text-cool transition-colors hover:text-accent"
                >
                  <Download size={18} />
                </a>
              </div>

              {/* A PDF previews in an iframe; an image is just an image. */}
              {d.kind === 'image' ? (
                <img
                  src={d.url}
                  alt={d.title}
                  loading="lazy"
                  className="h-[28rem] w-full bg-white/5 object-contain p-4"
                />
              ) : (
                <iframe
                  src={`${d.url}#toolbar=0&view=FitH`}
                  title={d.title}
                  className="h-[28rem] w-full bg-white/5"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}
