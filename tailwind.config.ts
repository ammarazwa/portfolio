import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'newsprint': '#F4F0EA',
        'ink':       '#111111',
        'neon-red':  '#FF3333',
        'halftone':  '#8E8D8A',
      },
      fontFamily: {
        serif:  ['var(--font-serif)', 'Georgia', 'serif'],
        sans:   ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:   ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config