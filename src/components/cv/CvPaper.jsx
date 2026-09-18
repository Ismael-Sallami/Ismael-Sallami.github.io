import { useI18n } from '../../i18n/LanguageContext.jsx'

// The document. It only reads the model, so everything about what goes in lives in
// cv-model.js and everything about how it looks lives in cv-paper.css.
export default function CvPaper({ model, paper, innerRef }) {
  const { t } = useI18n()
  const { header, sections } = model

  return (
    <article
      ref={innerRef}
      className={`cv-paper ${paper === 'letter' ? 'is-letter' : ''}`}
      lang={undefined}
    >
      <header className="cv-head">
        <h1>{header.name}</h1>
        <ul>
          {header.links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.text}</a>
            </li>
          ))}
        </ul>
      </header>

      {sections.length === 0 && <p>{t('cv.empty')}</p>}

      {sections.map((s) => (
        <section key={s.id} className="cv-section">
          <h2>{t(`cv.sections.${s.id}`)}</h2>

          {s.lines && (
            <ul className="cv-skills">
              {s.lines.map((l) => (
                <li key={l.label}>
                  <b>{l.label}</b>: {l.value}
                </li>
              ))}
            </ul>
          )}

          {s.entries?.map((e, i) => (
            <div key={`${e.left}-${i}`} className="cv-entry">
              <div className="cv-row">
                <span className="cv-row__left">
                  {e.left}
                  {e.leftNote && <span className="cv-note">{e.leftNote}</span>}
                </span>
                {e.right && <span className="cv-row__right">{e.right}</span>}
              </div>

              {(e.sub || e.subRight) && (
                <div className="cv-row cv-row--sub">
                  <span className="cv-row__left">{e.sub}</span>
                  {e.subRight && <span className="cv-row__right">{e.subRight}</span>}
                </div>
              )}

              {e.bullets?.length > 0 && (
                <ul>
                  {e.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </article>
  )
}
