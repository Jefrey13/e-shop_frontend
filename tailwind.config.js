/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode:"jit",
  theme: {
    fontFamily:{
      Roboto: ["Roboto", "sans-serif"],
      Poppins:["Poppins", "sans-serif"],
    },
    extend: {
      screens:{
        "1000px": "1050",
        "1100px": "1110",
        "800px": "800px",
        "1300": "1300",
        "400px": "400px"
      }
    },
  },
  plugins: [],
}

