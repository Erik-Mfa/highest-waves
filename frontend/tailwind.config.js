/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'fade-lg': '0 -8px 30px rgba(0, 0, 0, 1), 0 8px 30px rgba(0, 0, 0, 1)', // Combined top and bottom shadow
      },
      colors: {
        darkSlate: '#0a0e12', // Add custom colors if needed
        darkerSlate: '#05080b', // Darker color for the gradient
      },
      backgroundImage: {
        'subtle-dark': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(15, 23, 42, 1))', // subtle darkness
      },
    },
  },
  plugins: [],
}
