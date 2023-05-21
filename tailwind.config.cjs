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
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
