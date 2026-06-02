import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SceneBoundary from './components/SceneBoundary.jsx'

const Scene = lazy(() => import('./three/Scene.jsx'))
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Letters from './pages/Letters.jsx'

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

      <Nav />

      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/letters" element={<Letters />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
