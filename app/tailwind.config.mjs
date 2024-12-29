import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                serif: ["Lora", ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
}