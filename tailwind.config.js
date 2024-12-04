/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Note the addition of the `ts` and `tsx` extensions
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'ui-sans-serif', 'system-ui'], // Add 'Noto Sans' to the sans stack
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}