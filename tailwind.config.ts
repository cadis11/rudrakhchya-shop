import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7A5D2A', // earthy brown/gold
          accent: '#C2A05A',  // soft gold
        }
      }
    },
  },
  plugins: [],
} satisfies Config
