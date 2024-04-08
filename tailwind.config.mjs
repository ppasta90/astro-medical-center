/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      primary: "#6BD697",
      lightGreen: "#CEF1DC",
      secondary: "#21137F",
      white: "#FFFFFF",
      black: "#000000",
      lightblue: "lightblue",
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
