/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // ✅ This enables class-based dark mode
  theme: {
    extend: {
       animation: {
    gradient: "gradientShift 8s ease infinite",
    float: "float 6s ease-in-out infinite",
  },
  keyframes: {
    gradientShift: {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-15px)' },
    },
  },
plugins: [],
    },
  },
};



