module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        breathing: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)",
          },
          "50%": {
            transform: "translate(0px, -10px) rotate(1deg)",
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)",
          },
        },
        talking: {
          "0%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "25%": {
            transform: "translate(5px, -5px) rotate(5deg)",
          },
          "50%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "75%": {
            transform: "translate(-5px, -5px) rotate(-5deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
        },
      },
      animation: {
        breathing: "breathing 5s infinite",
        talking: "talking 0.5s infinite",
      },
    },
  },
  plugins: [],
};
