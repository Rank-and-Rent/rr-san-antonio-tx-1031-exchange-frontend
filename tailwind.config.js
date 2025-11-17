/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { xl: "1rem", "2xl": "1.25rem" }
    }
  },
  plugins: []
};