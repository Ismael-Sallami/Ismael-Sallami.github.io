/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05060a',
        abyss: '#0a0d16',
        slate2: '#11151f',
        accent: 'hsl(160, 95%, 55%)',      // lime-cyan electric
        accent2: 'hsl(190, 95%, 60%)',     // cyan
        ivory: 'hsl(40, 30%, 94%)',
        cool: 'hsl(225, 14%, 62%)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
      },
    },
  },
  plugins: [],
}
