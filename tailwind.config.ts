import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sacred-bg": "#FDFCF0",
        "sacred-green": "#2D4A3E",
        "gold-deep": "#D4AF37",
        "gold-light": "#F4E7B5",
        "gold-soft": "#d4b94a",
        "cream": "#FFF8E7",
      },
      fontFamily: {
        serif: ["var(--font-geist-mono)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;