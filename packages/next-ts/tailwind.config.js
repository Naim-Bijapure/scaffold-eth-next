module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  important: true,

  theme: {
    extend: {},
  },
  daisyui: {
    utils: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
        },
      },
    ],
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
};
