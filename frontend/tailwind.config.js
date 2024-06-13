/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "nn-orange": "#F08650",
        "nn-green": "#B5E61D",
        "nn-pink": "#FFAEC9",
      },
    },
  },
  plugins: [],
};
