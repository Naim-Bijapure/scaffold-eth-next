module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
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
