/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'cast': '0 0 2px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}