const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      container: {
        "padding": '2rem',
      },
      colors:{
        "main-color":"#11a97f",
        "secondary-color":"#d5efe9",
        "dark":"#1E1E1E"
      },
      screens: {
        mobile: { min: "320px", max: "639px" },
        tablet: { min: "640px", max: "1024px" },

        'laptop': '1536px',

        'desktop': '1540px',
      },
      fontFamily: {
        samim: ["samim"],
      },
    },
  },
  plugins: [
    flowbite.content(),
  ],
}