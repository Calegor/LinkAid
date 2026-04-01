/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "480px" },
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1300px",
      },
      colors: {
        "linkaid-blue": "#2b5a9a",
        "linkaid-green": "#8bc53f",
      },
    },
  },
  plugins: [],
};
