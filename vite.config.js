import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User repo (Ismael-Sallami.github.io) is served at domain root → base '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
