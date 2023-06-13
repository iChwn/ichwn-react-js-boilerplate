/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'roboto': ['Roboto']
      },
      boxShadow: {
        'higher': '0px 2px 12px 0px rgba(30,30,30,0.16);',
      },
      colors: {
        'dark-green': '#096357',
        'soft-green': '#08AE92',
        'dark-brown': '#bb9b77'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

