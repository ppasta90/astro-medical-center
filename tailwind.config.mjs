/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      primary: "#2e9370",
      primaryLight: "#bce5d7",
      secondary: "#000c64",
      secondaryLight: "#cccee0",
      tertiary: "#fc8421",
      secondaryLighter: "#8d8c9b",
      darkBlue: "#1b1937",
      lightGrey: " #f2f2f3",
      grey: "#d1d1d7",
      ...colors,
    },
    fontFamily: {
      serif: ["Bebas Neue", ...defaultTheme.fontFamily.serif],
      sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      ...defaultTheme.fontSize,
      customClamp: "clamp(1.8rem, 7vw, 5rem)",
    },
  },
  plugins: [],
};
