/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-lg': '0 8px 30px rgba(0, 0, 0, 1)', // Larger shadow if needed
      },
    },
  },
  plugins: [],
}