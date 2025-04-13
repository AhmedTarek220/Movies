export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
        secondary: "#64748B"
      },
      fontFamily: {
        sans: ['"Montserrat"', "sans-serif"],
        serif: ['"Marcellus"', "serif"]
      }
    }
  },
  plugins: []
};
