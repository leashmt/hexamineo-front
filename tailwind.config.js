/ @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src//*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-custom": "#5F6C96",
        "white-background": "#F4F6FA",
        "yellow-highlight": "#FFD166"
      }
    },
  },
  plugins: [],
}