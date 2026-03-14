/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              "primary": "#00AEC3",
              "secondary": "#e81f76",
              "background-light": "#f8f6f6",
              "background-dark": "#221610",
          },
          fontFamily: {
              "display": ["Public Sans", "sans-serif"]
          }
      }
  },
  plugins: [],
}
