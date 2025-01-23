/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        't-green': '#CAF6CE',
        'p-green': '#0CCA1F',
        't-darkblue': '#E1E6EC',
        'p-darkblue': '#11253E',
        't-orange': '#F9E6BF',
        'p-orange': '#CA8A0C',
        't-blue': '#E2E6FF',
        'p-blue': '#3751DB',

        'p-white': '#f8f4f4',
        'primary': '#11253E',
        'secondary': '#8695A7'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        small: ['12px', { lineHeight: '12px' }],
        mid: ['16px', { lineHeight: '16px' }]
      },
      keyframes: {
        typing: {
          '0%': { content: '"   "' },
          '33%': { content: '".  "' },
          '66%': { content: '".. "' },
          '100%': { content: '"..."' },
        },
        lift: {
          '0%': {
            transform: 'translateY(30%)',
            opacity: '0.7'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        'typing-fast': 'typing 1s steps(3, end) infinite',
        'lift-slow': 'lift 0.2s linear',
      },
    },
  },
  plugins:[]
};
