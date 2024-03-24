import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
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
      },
    },
  },
  plugins: [
    nextui({
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
};
export default config;
