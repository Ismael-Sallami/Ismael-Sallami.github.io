import { FileText, Download } from 'lucide-react'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import letter1 from '../../docs/letter1.pdf?url'
import letter2 from '../../docs/letter2.pdf?url'
import ecert from '../../docs/eCertificate.pdf?url'

export default function Letters() {
  const { t } = useI18n()
  const docs = [
    { title: t('lettersPage.letter1'), url: letter1 },
    { title: t('lettersPage.letter2'), url: letter2 },
    // Odd one out on the second row, so it spans the full width.
    { title: t('lettersPage.ecert'), url: ecert, wide: true },
  ]

  return (
    <PageWrap>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-accent" /> {t('lettersPage.kicker')}
        </p>
        <h1 className="font-display text-5xl tracking-tightest md:text-6xl">{t('lettersPage.title')}</h1>
        <p className="mt-5 max-w-2xl text-lg text-cool">{t('lettersPage.intro')}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl">
          {docs.map((d) => (
            <div
              key={d.url}
              className={`glass flex flex-col overflow-hidden rounded-2xl ${d.wide ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <h3 className="flex items-center gap-2 font-display text-lg">
                  <FileText size={18} className="text-accent" /> {d.title}
                </h3>
                <a href={d.url} download aria-label={t('lettersPage.download')} className="text-cool transition-colors hover:text-accent">
                  <Download size={18} />
                </a>
              </div>
              <iframe
                src={`${d.url}#toolbar=0&view=FitH`}
                title={d.title}
                className="h-[28rem] w-full bg-white/5"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}
