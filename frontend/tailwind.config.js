/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

export default {
  theme: {
    fontFamily: {
      sans: ["Public Sans", "sans-serif"],
      serif: ["Public Sans", "sans-serif"],
      mono: ["Public Sans", "sans-serif"],
      display: ["Public Sans", "sans-serif"],
      body: ["Public Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["material-symbols", "tabler"]),
    }),
  ],
}
