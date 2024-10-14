/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'fade-lg': '0 -8px 30px rgba(0, 0, 0, 1), 0 8px 30px rgba(0, 0, 0, 1)', // Combined top and bottom shadow
        'header-shadow': '0 4px 30px rgba(0, 0, 0, 0.7)', // Custom shadow for the header
        'tag': '0 2px 20px rgba(0, 0, 0, 0.7)', // Custom shadow for the header
        'audioplayer-shadow': '0 -4px 30px rgba(0, 0, 0, 0.7)', // Custom shadow for the audio player (top shadow)
        'neon-glow': '0 0 15px rgba(10, 255, 153, 0.4), 0 0 50px rgba(15, 194, 192, 0.4)',  // Neon green glow with reduced opacity
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '70%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 1s ease-out forwards',
      },
      colors: {
        'dark-teal': '#054a49',       // Dark teal
        'neon-green': '#0aff99',      // Neon green
        'neon-teal': '#08f7fe',       // Vibrant neon teal
      },
      backgroundImage: {
        'admin-gradient': 'linear-gradient(135deg, #011414, )',  // Gradient from teal to dark
      }
    },
  },
  plugins: [],
}
