/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark-teal" : "#123448" ,
        "custom-teal" : "#0c628a" ,
        "custom-steelblue" : "#337aa3" ,
        "custom-red" : "#DD4C4C",
        "custom-lightred" : "#FF5C5C",
        "custom-green" : "#40a867",
        "custom-lightgreen" : "#53d384",
      }
    },
  },
  plugins: [],
}

