import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Counts a figure up when it scrolls into view: "21 PRs" climbs from 0 to 21 and keeps
// its suffix. Only the leading number moves, so "6 meses" and "35 h" work without the
// unit flickering.
//
// A figure with no leading number is printed as it is. The point is to draw the eye to a
// quantity, and there is nothing to count when there isn't one.
const NUMBER = /^(\d[\d.,]*)(.*)$/s

// Fast at first and easing out, so the final value settles rather than snapping.
const easeOut = (t) => 1 - (1 - t) ** 3

const DURATION = 1100

export default function CountUp({ value }) {
  const match = typeof value === 'string' ? value.match(NUMBER) : null
  const target = match ? Number(match[1].replace(/[.,]/g, '')) : null

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(target)

  // Nothing is ever rendered as a half-finished number before the animation starts: the
  // first paint already shows the target, and only then does it rewind to zero and climb.
  // That way a viewer who never scrolls here, or who blocks animation, reads the figure.
  useEffect(() => {
    if (target === null || reduced || !inView) return

    let frame
    const started = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - started) / DURATION)
      setShown(Math.round(easeOut(t) * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    setShown(0)
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, target])

  if (target === null) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {shown}
      {match[2]}
    </span>
  )
}
