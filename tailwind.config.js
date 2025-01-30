/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#2d3748',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'], // النصوص
      },
    },
  },
  plugins: [],
};
