const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      pop: ["Poppins"],
    },
    extend: {
      colors: {},
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
