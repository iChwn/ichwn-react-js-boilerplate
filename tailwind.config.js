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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
