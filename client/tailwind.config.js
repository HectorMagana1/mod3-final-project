/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily:{
        'universal-font':['Roboto Condensed', 'sans-serif'],
      },
      colors:{
        'root-white':'#E2E9DF',
        'root-dark':'#3A373B',
        'root-grey':'#616567',
        'root-blue':'#48537B',
        'root-darkgrey':'#4B4948',
      }
    },
  },
  plugins: [],
}

