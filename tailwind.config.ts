import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'nanum-square': ['NanumSquare', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
      },
    },
    fontSize: {
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
    },
    colors: {
      slate: {
        '900': '#0F172A',
        '800': '#1E293B',
        '500': '#64748B',
        '400': '#94A3B8',
        '300': '#CBD5E1',
        '200': '#E2E8F0',
        '100': '#F1F5F9',
      },
      violet: {
        '600': '#7C3AED',
        '100': '#EDE9FE',
      },
      rose: {
        '500': '#F43F5E',
      },
      lime: {
        '300': '#BEF264',
      },
      amber: {
        '800': '#92400E',
      },
      white: '#FFFFFF',
    },
    screens: {
      mobile: { max: '743px' },
      tablet: { min: '744px', max: '1919px' },
      desktop: '1920px',
    },
  },
  plugins: [],
};
export default config;
