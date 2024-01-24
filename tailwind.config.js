/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff405c",
        primary_dark: "#e20059",
        secondary: "#dada3b",
        secondary_dark: "#9dbc29",
        accent: "#ffdd54",
        accent_dark: "#ffb454"
      }
    },
  },
  plugins: [require("daisyui")],
};
