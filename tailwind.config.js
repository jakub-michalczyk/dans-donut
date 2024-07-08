/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "app-gray-300": "#eeeeee",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    keyframes: {
      "up-rotate": {
        "0%": {
          animationTimingFunction: "cubic-bezier(0.16, -0.88, 0.97, 0.53)",
          transform: "translateY(0px)",
        },
        "30%": {
          transformOrigin: "center",
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: "translateY(-10px)",
        },
        "100%": {
          transformOrigin: "center",
          transform: "translateY(-10px) rotate(45deg) scale(0.9)",
        },
      },
      "down-rotate": {
        "0%": {
          animationTimingFunction: "cubic-bezier(0.16, -0.88, 0.97, 0.53)",
          transform: "translateY(0px)",
        },
        "30%": {
          transformOrigin: "center",
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: "translateY(10px)",
        },
        "100%": {
          transformOrigin: "center",
          transform: "translateY(10px) rotate(-45deg) scale(0.9)",
        },
      },
      hide: {
        "29%": {
          opacity: "1",
        },
        "30%": {
          opacity: "0",
        },
        "100%": {
          opacity: "0",
        },
      },
    },
    animation: {
      "up-rotate": "up-rotate 0.6s ease-out both",
      "down-rotate": "down-rotate 0.6s ease-out both",
      hide: "hide 0.6s ease-out forwards",
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
