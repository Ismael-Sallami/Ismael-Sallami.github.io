import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function ProjectCard({ project, index, large = false }) {
  const { t } = useI18n()
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 8, ry: px * 10 })
  }
  const reset = () => setTilt({ rx: 0, ry: 0 })

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/8 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(11,217,154,0.45)] ${
        large ? 'min-h-[26rem] md:col-span-2' : 'min-h-[20rem]'
      }`}
    >
      <img
        src={project.img}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent" />

      <div className="relative z-10 p-6">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {project.tag}
        </span>
        <h3 className={`mt-3 font-display tracking-tightest ${large ? 'text-3xl' : 'text-2xl'}`}>
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-cool">{project.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ivory">
          {t('common.viewProject')}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </motion.a>
  )
}
