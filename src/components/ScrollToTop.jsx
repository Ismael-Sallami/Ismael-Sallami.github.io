import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Puts every new route at the top.
//
// It never mattered while all four pages were short, but going from halfway down the
// project grid into a project page used to drop the reader into the middle of a README.
//
// Lenis keeps its own scroll position and animates towards it, so window.scrollTo alone
// gets overwritten on the next frame. main.jsx hangs the instance on window when it
// creates one; with prefers-reduced-motion there is none and the plain call is right.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
