/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    letterSpacing: {
      wide: '.05em',
      widest: '.25em',
    },
    extend: {
      spacing: {
        92: '23rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        128: '32rem',
      },
    },
    fontFamily: {
      sans: ['var(--font-titillium)', ...fontFamily.sans],
    },
  },
  plugins: [],
};
