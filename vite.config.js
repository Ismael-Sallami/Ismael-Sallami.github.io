import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Files under docs/ keep their own name and path in the build. Everything else gets the
// usual content hash.
//
// Two reasons. The download attribute on a link only governs the link: the toolbar in an
// embedded PDF viewer has its own download button that ignores it, and `#toolbar=0` hides
// that toolbar in Chrome only, so in Firefox and Safari it sits on top of every
// certificate preview. Whoever clicked it got "oracle-oci-ai-foundations-2025-D_o9Q4bu.pdf".
// With no hash there is no wrong name left to get, whichever route the file is saved by,
// including right-click and Save as.
//
// And it makes the URLs worth sharing. A hash changes whenever the file does, so a CV link
// put on LinkedIn breaks on the next edit. `/docs/CVs/Ismael_Sallami_Moreno_CV_EN.pdf`
// does not, and it is the same path the dev server serves, so the two now agree.
//
// The cost is cache busting by name rather than by hash, which is the right trade for a
// document that should keep one address.
const isDoc = (info) => (info.originalFileNames ?? []).some((p) => p.startsWith('docs/'))

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (info) =>
          isDoc(info)
            ? `${info.originalFileNames[0]}`
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
})
