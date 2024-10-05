/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#fafafa',
        secondary: '#d4d4d6',
        black: '#000000'
      }
    },
  },
  plugins: [],
}

