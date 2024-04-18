/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace', //name "sans" as default font
    },

    extend: {
      colors: {
        pizza: '#ae3ec9',
      },

      fontSize: {
        huge: ['8rem', { lineHeight: '1' }],
      },

      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
}
