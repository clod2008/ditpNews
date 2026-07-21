/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:           '#1B2E8C',
        'primary-dark':    '#0D1B55',
        secondary:         '#C1281C',
        'secondary-dark':  '#8C1C13',
        accent:            '#C49A3C',
        purple:            '#6B2D9B',
        magenta:           '#B81F6E',
        editorial:         '#1A1A18',
        cream:             '#F8F5EF',
        'photo-gray':      '#EBEBEB',
        muted:             '#0D1B55',
      },
      fontFamily: {
        sans:       ['Barlow', 'system-ui', 'sans-serif'],
        condensed:  ['Barlow Condensed', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
