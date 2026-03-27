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
        background: "#131313",
        foreground: "#e5e2e1",
        primary: {
          DEFAULT: "#f2ca50",
          container: "#d4af37",
        },
        onyx: {
          DEFAULT: "#131313",
          light: "#1c1b1b",
          lighter: "#2a2a2a",
        },
        gold: {
          soft: "#d0c5af",
          dark: "#4d4635",
        }
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        'gold-metallic': 'linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)',
        'onyx-gradient': 'linear-gradient(to bottom, #131313 0%, #0e0e0e 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
export default config;
