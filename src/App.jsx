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

// Its own chunk too: it brings the paper stylesheet and the document, and nobody who is
// just reading the site needs any of it.
const CvBuilder = lazy(() => import('./pages/CvBuilder.jsx'))

export default function App() {
  const location = useLocation()
  // The CV page is a working surface, not a showcase. The blob sits fixed behind
  // everything and washes out a sheet of white paper, and it keeps the GPU busy while
  // someone ticks boxes. It also cannot be hidden by a print rule: Scene.jsx styles its
  // wrapper inline, with no class to select.
  const bare = location.pathname === '/cv'

  return (
    <>
      <div className="mesh-bg" />
      {!bare && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </SceneBoundary>
      )}
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
              <Route path="/cv" element={<CvBuilder />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
