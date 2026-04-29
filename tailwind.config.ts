import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF5',
        paper: '#F0F4EA',
        ink: '#0F2018',
        verde: { DEFAULT: '#3A6B47', vivo: '#5FA36B', claro: '#B4D4A8' },
        azul: { DEFAULT: '#5B8CAE', claro: '#A8C8DC' },
        citrico: '#D4A843',
        graphite: '#5E6B5C',
        stone: '#9BA89A',
      },
      fontFamily: { fraunces: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'] },
      fontSize: {
        display: 'clamp(42px, 9vw, 116px)',
        'h1-fluid': 'clamp(40px, 7vw, 96px)',
        'h2-fluid': 'clamp(32px, 5vw, 84px)',
        'h3-fluid': 'clamp(24px, 3.2vw, 52px)',
        'h4-fluid': 'clamp(18px, 2.4vw, 30px)',
        'lede-fluid': 'clamp(15px, 1.4vw, 17px)',
        'body-fluid': 'clamp(14px, 1.2vw, 16px)',
        'meta-fluid': 'clamp(10px, 0.85vw, 11px)',
      },
      spacing: {
        'pad-x': 'clamp(20px, 4vw, 48px)',
        'pad-y': 'clamp(56px, 10vw, 140px)',
        'pad-y-sm': 'clamp(40px, 6vw, 80px)',
        touch: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
