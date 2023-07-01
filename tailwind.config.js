/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "@layer utilities": {},
      backgroundImage: {},
      animation: {
        fade: "fadeIn 0.5s ease-in-out",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
      fontFamily: {
        primary: ["var(--font-inter)"],
      },
      colors: {
        primary: {
          DEFAULT: "#09112F",
        },
        secondary: {
          DEFAULT: "#00BC9C",
          100: "#3FE88C",
          200: "hsla(170, 100%, 37%, 0.16)",
          300: "#075447",
          400: "hsla(170, 92%, 10%, 1)",
          500: "#268B30",
          600: "hsla(157, 100%, 26%, 1)",
          700: "hsla(126, 57%, 35%, 1)",
        },
        dark: {
          DEFAULT: "#1E1E1E",
          100: "#323232",
          200: "#020202",
          300: "#000000",
          400: "#000000",
          500: "#000000",
        },
        blue: {
          DEFAULT: "#217BF4",
          50: "#D0E3FD",
          100: "#BCD7FC",
          200: "#96C0FA",
          300: "#6FA9F8",
          400: "#4892F6",
          500: "#217BF4",
          600: "#0A60D2",
          700: "#08479D",
          800: "#052F68",
          900: "#021732",
        },
      },
    },
  },
  plugins: [],
};
