/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    boxShadow: {
      addToCart: "0 20px 50px -20px #ff7e1b",
      cart: "0 20px 50px -20px rgba(29, 32, 38, 0.5)",
      circle: "box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.5)",
    },
    colors: {
      overlay: "rgba(0, 0, 0, 0.75)",
    },
  },
  plugins: [],
};
