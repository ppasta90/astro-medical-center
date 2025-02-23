/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
      lightViolet: "#f5f5ff",
      ...colors,
    },
    fontFamily: {
      serif: ["Bebas Neue", ...defaultTheme.fontFamily.serif],
      sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
    },
    screens: {
      ...defaultTheme.screens,
      smm: "320px",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
