/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/assets/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#36a662',
        'secondary': '#4472c4',
        'silverbg': '#ecf0ef',
        'dark': '#010808'
      },
      fontFamily: {
        poppins: ["Poppins"]
      },
    },
  },
  plugins: [],
}
