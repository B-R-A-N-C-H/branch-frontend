import type {Config} from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            desktop: {"max": "1920px"},
            "laptop-big": {"max": "1440px"},
            laptop: {"max": "1280px"},
            tablet: {"max": "1025px"},
            phone: {"max": "615px"},
            "laptop-min": {"min": "1280px"},
            "tablet-min": {"min": "1025px"},
            "phone-min": {"min": "615px"}
        },
        extend: {
            colors: {
                primary: "#00ca82",
                subtext: "#828282",
                secondary: "#009471",
                danger: "#ff4524",
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}
export default config
