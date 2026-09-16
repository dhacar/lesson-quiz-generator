import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E6',
        ink: '#1C2B24',
        chalkboard: '#24413A',
        chalk: '#D9A441',
        rule: '#C9C0A8',
        fern: '#4F7942',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
