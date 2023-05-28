/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        msm: "500px",
        sm: "640px",
        md: "768px",
        lg: "1150px",
        xl: "1280px",
        "2xl": "1360px",
        "3xl": "1536px",
      },
      boxShadow: {
        md: "0 0px 6px rgba(0, 0, 0, 0.125)",
      },
    },
  },
  plugins: [],
};
