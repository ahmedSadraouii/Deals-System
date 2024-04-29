const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    ...Array(12).fill(0).map((_, i) => `grid-cols-${i + 1}`),
    ...Array(12).fill(0).map((_, i) => `col-span-${i + 1}`),
    ...Array(12).fill(0).map((_, i) => `row-span-${i + 1}`)
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
      fontFamily: {
        sans: ['hvdtrial brandon grotesque', 'sans-serif'],
      },
      colors: {
        'aldi-text': '#f05322',
        'aldi-blue': '#0B102F',
        'aldi-bg': '#f0dfdc',
        'aldi-key': '#ffa300',
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
            primary: '#f05322',
            secondary: '#0B102F',
            divider: '#0B102F'
          },
        },
      },
    }),
  ],
}
