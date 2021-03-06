module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    opacity: ({ after }) => after(["disabled"]),
    cursor: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
