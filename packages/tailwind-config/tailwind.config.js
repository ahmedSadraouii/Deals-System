const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      layout: {
        radius: {
          large: '20px',
        },
      },
      themes: {
        aldi: {
          extend: 'light',
          colors: {
            primary: '#f05322',
            secondary: '#0B102F',
          },
        },
      },
    }),
  ],
}
