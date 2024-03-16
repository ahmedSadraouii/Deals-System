import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['HvDTrial Brandon Grotesque', 'sans-serif'],
      },
      colors: {
        'aldi-text': '#f05322',
        'aldi-bg': '#f0dfdc',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
