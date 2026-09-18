// The cover for a project that has no picture of its own.
//
// Order of preference, decided in projects.js: an image uploaded to the repository under
// Settings, Social preview, then this, then the plain placeholder. It is only ever drawn
// for repositories with no hand-written card, so it cannot replace a picture that was
// chosen on purpose.
//
// No text on it, and that decision is what settled the format. The card already prints
// the project's name over the bottom of its own cover, so a name in the artwork lands
// directly behind the real one and reads as a rendering fault. A textless image needs no
// typography, and with no typography a browser render buys nothing over an SVG: this is
// about a kilobyte, needs no dependency and puts no binary in the history.
//
// It is also brighter than it looks like it needs to be. The card paints it at half
// opacity over a page with a 3D blob behind it, so a subtle image turns into a window
// onto the blob instead of a cover.

// The three hues of the site's mesh background.
const HUES = [160, 190, 265]

function hash(text) {
  let h = 0
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

export function projectImage(name) {
  const h = hash(name)
  const a = HUES[h % 3]
  // Unsigned shifts throughout. With `>>` the hash of a real repository name overflows
  // into a negative number, the index comes out negative and the hue is undefined; one
  // bad value invalidates the whole gradient list and the artwork renders flat. Every
  // name tried here hit it.
  let b = HUES[(h >>> 3) % 3]
  if (b === a) b = HUES[(HUES.indexOf(a) + 1) % HUES.length]

  const x1 = 22 + (h % 36)
  const y1 = 14 + ((h >>> 5) % 30)
  const x2 = 58 + ((h >>> 7) % 30)
  const y2 = 48 + ((h >>> 11) % 34)

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${a}, 45%, 10%)"/>
      <stop offset="1" stop-color="hsl(${b}, 50%, 8%)"/>
    </linearGradient>
    <radialGradient id="a" cx="${x1}%" cy="${y1}%" r="55%">
      <stop offset="0" stop-color="hsl(${a}, 95%, 52%)" stop-opacity="0.90"/>
      <stop offset="1" stop-color="hsl(${a}, 95%, 52%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="${x2}%" cy="${y2}%" r="52%">
      <stop offset="0" stop-color="hsl(${b}, 92%, 58%)" stop-opacity="0.76"/>
      <stop offset="1" stop-color="hsl(${b}, 92%, 58%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="c" cx="50%" cy="108%" r="60%">
      <stop offset="0" stop-color="hsl(${a}, 95%, 48%)" stop-opacity="0.40"/>
      <stop offset="1" stop-color="hsl(${a}, 95%, 48%)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#base)"/>
  <rect width="800" height="600" fill="url(#a)"/>
  <rect width="800" height="600" fill="url(#b)"/>
  <rect width="800" height="600" fill="url(#c)"/>
  <g fill="none" stroke="hsl(0, 0%, 100%)" stroke-opacity="0.14" stroke-width="1.5">
    <circle cx="${x1 * 5 + 215}" cy="${y1 * 4 + 215}" r="215"/>
    <circle cx="${x2 * 4 + 320}" cy="${y2 * 3 + 320}" r="320"/>
  </g>
</svg>
`
}
