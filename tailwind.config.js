/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}", "./views/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
