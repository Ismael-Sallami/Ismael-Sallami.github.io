import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { experience, isOngoing, localizeRole } from '../data/experience.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

// The figure under each role: a number in the accent gradient and a plain label, the
// same pairing as the project counter in the hero. It links out when there is
// something to check, and is plain text when there is not.
function Figure({ figure }) {
  const inner = (
    <>
      <span className="font-display text-2xl accent-text">{figure.value}</span>
      <span className="text-sm text-cool">{figure.label}</span>
      {(figure.url || figure.to) && (
        <ArrowUpRight size={15} className="shrink-0 text-cool" />
      )}
    </>
  )
  const className =
    'mt-4 inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 transition-all hover:gap-x-3'

  if (figure.url) {
    return (
      <a href={figure.url} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  if (figure.to) {
    return <Link to={figure.to} className={className}>{inner}</Link>
  }
  return <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">{inner}</p>
}

export default function Timeline() {
  const { lang } = useI18n()

  return (
    <div className="relative">
      {/* The spine. An even accent tint rather than a fade: fading downwards would
          leave the role that is still open as the faintest thing on screen. */}
      <span
        aria-hidden
        className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-accent/40"
      />

      {/* An ordered list, because the order is the point. */}
      <ol className="space-y-12">
        {experience.map((raw, i) => {
          const r = localizeRole(raw, lang)
          const ongoing = isOngoing(raw)
          return (
            <motion.li
              key={raw.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-10"
            >
              {/* Hollow means the role has no end date yet. */}
              <span
                aria-hidden
                className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full ${
                  ongoing ? 'border-2 border-accent bg-void' : 'bg-accent'
                }`}
              />

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cool">
                {r.dates}
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-tightest">{r.role}</h3>
              <p className="mt-1 text-sm text-ivory">
                {r.org} <span className="text-cool">· {r.place}</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 max-w-2xl text-cool">{r.desc}</p>

              {r.figure && <Figure figure={r.figure} />}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
