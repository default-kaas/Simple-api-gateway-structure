/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors");
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "custom-vue-green": "#42b883",
      "custom-vue-gray": "#35495e",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      green: colors.green,
      blue: colors.blue,
      orange: colors.orange,
      red: colors.red,
      purple: colors.purple,
    },
  },
  plugins: [],
};
