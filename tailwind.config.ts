import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        //sans: ['var(--font-sans)'],
        //mono: ['var(--font-mono)'],
        roboto: ['var(--font-roboto)'],
        robotoMono: ['var(--font-roboto-mono)'],
        robotoSlab: ['var(--font-roboto-slab)'],
        instrumentSans: ['var(--font-instrument-sans)'],
      },
      colors: {
        gray1: '#121212',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Add this line
};

export default config;
