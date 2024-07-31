const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    ...Array(12)
      .fill(0)
      .map((_, i) => `grid-cols-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `col-span-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `row-span-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `md:grid-cols-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `md:col-span-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `md:row-span-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `xl:grid-cols-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `xl:col-span-${i + 1}`),
    ...Array(12)
      .fill(0)
      .map((_, i) => `xl:row-span-${i + 1}`),
  ],
  darkMode: 'class',
  content: [
    // customerweb
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // nextui
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        screens: {
          sm: '640px',
          // => @media (min-width: 640px) { ... }

          md: '768px',
          // => @media (min-width: 768px) { ... }

          lg: '1024px',
          // => @media (min-width: 1024px) { ... }

          xl: '1280px',
          // => @media (min-width: 1280px) { ... }

          '2xl': '1680px',
          // => @media (min-width: 1536px) { ... }
        },
      },
      fontFamily: {
        sans: ['hvdtrial brandon grotesque', 'sans-serif'],
      },
      colors: {
        'aldi-blue': '#202B77',
        'aldi-bg': '#f0dfdc',
        'aldi-key': '#FF4802',
      },
      animation: {
        pop: 'pop 0.2s ease forwards',
      },
      keyframes: {
        pop: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  plugins: [
    nextui({
      layout: {},
      themes: {
        aldi: {
          extend: 'light',
          colors: {
            primary: '#FF4802',
            secondary: '#202B77',
            divider: '#202B77',
            focus: '#202B77',
            success: '#28940D',
          },
        },
      },
    }),
  ],
};
