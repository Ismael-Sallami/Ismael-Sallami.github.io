import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Nav from './components/Nav.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Footer from './components/Footer.jsx'
import SceneBoundary from './components/SceneBoundary.jsx'

const Scene = lazy(() => import('./three/Scene.jsx'))
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Certificates from './pages/Certificates.jsx'

// Its own chunk: it drags in the README stylesheet and the orbit button, and nobody who
// stays on the home page needs any of it.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))

export default function App() {
  const location = useLocation()
  return (
    <>
      <div className="mesh-bg" />
      <SceneBoundary>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </SceneBoundary>
      <div className="grain" />

      <ScrollToTop />
      <Nav />

      <main className="relative">
        <AnimatePresence mode="wait">
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
