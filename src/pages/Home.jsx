import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, GraduationCap, Linkedin } from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SkillBar from '../components/SkillBar.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { projects, localizeProject } from '../data/projects.js'
import { skills } from '../data/skills.js'
import { useI18n } from '../i18n/LanguageContext.jsx'
import portrait from '../../assets/images/ismael-sallami.png'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 0.85, 0.56, 1.02] } },
}

function SectionTitle({ kicker, children }) {
  return (
    <div className="mb-10">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        <span className="h-px w-8 bg-accent" /> {kicker}
      </p>
      <h2 className="max-w-3xl font-display text-4xl tracking-tightest md:text-5xl">{children}</h2>
    </div>
  )
}

// Driven by the flag rather than by array position, so reordering the data cannot
// silently change what the front page shows.
const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

export default function Home() {
  const { t, lang } = useI18n()
  const titleParts = t('hero.titleParts')

  return (
    <PageWrap>
      {/* HERO */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28 pb-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.p
              variants={rise}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-cool"
            >
              <GraduationCap size={15} className="text-accent" /> {t('hero.badge')}
            </motion.p>

            <motion.h1 variants={rise} className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
              {titleParts.map((p, i) =>
                p.a ? (
                  <span key={i} className="accent-text italic">{p.t}</span>
                ) : (
                  <span key={i}>{p.t}</span>
                )
              )}
            </motion.h1>

            <motion.p variants={rise} className="mt-6 max-w-xl text-lg text-cool">
              {t('hero.textPre')}
              <span className="text-ivory">{t('hero.name')}</span>
              {t('hero.textPost')}
            </motion.p>

            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="rounded-full bg-accent px-6 py-3 font-semibold text-void transition-transform hover:scale-105">
                {t('hero.contact')}
              </a>
              <Link to="/projects" className="flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 font-medium transition-colors hover:border-accent">
                {t('hero.viewProjects')} <ArrowUpRight size={18} />
              </Link>
              <div className="flex items-center gap-3 pl-2">
                <a href="https://github.com/Ismael-Sallami" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-cool transition-colors hover:text-accent">
                  <Github size={22} />
                </a>
                <a href="https://es.linkedin.com/in/ismael-sallami-moreno-2257072b9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cool transition-colors hover:text-accent">
                  <Linkedin size={22} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={rise} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/30 to-accent2/20 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-2">
              <img src={portrait} alt="Ismael Sallami" className="rounded-[1.5rem] object-cover" />
            </div>
            <div className="glass absolute -bottom-5 -left-5 rounded-2xl px-5 py-3">
              {/* Counted from the data so it cannot go stale: it said 10+ with fifteen listed. */}
              <p className="font-display text-3xl accent-text">{projects.length}</p>
              <p className="text-xs text-cool">{t('hero.proyectsCount')}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker={t('about.kicker')}>{t('about.title')}</SectionTitle>
        <div className="grid gap-8 text-cool md:grid-cols-2">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker={t('featured.kicker')}>{t('featured.title')}</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            // Only the first gets the wide treatment: four full-width cards stacked
            // reads worse than one hero above a row of three.
            <ProjectCard key={p.url} project={localizeProject(p, lang)} index={i} large={i === 0} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 font-medium text-accent hover:gap-3 transition-all">
            {t('featured.viewAll')} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker={t('skillsPreview.kicker')}>{t('skillsPreview.title')}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.slice(0, 6).map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/skills" className="inline-flex items-center gap-2 font-medium text-accent hover:gap-3 transition-all">
            {t('skillsPreview.viewAll')} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <div className="glass grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-12">
          <div>
            <SectionTitle kicker={t('contact.kicker')}>{t('contact.title')}</SectionTitle>
            <p className="text-cool">{t('contact.text')}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageWrap>
  )
}
