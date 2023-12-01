/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'white': '#ffffff',
      'gray-light': '#d9d9d9',
      'gray-mid': '#cbcbcb',
      'gray': '#252d3a',
      'gray-dark': '#202433',
      'gray-darker': '#33394f',
      'blackish': '#12151d',
      'primary': '#d1caff',
      'pink': '#fc728b',
      'light': '#d1caff',
      'light-darker': '#a7a1cc'
    },
    extend: {
      boxShadow: {
        'main': '10px 10px 0 0 rgba(0, 0, 0, 0.45)'
      }
    },
  },
  plugins: [],
}

