import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#3d8b3d",
          "green-light": "#4caf50",
          "green-dark": "#2e7d32",
          "green-glow": "#4ade80",
        },
        dark: {
          900: "#0d1117",
          800: "#111827",
          700: "#161b22",
          600: "#1c2333",
          500: "#21262d",
          400: "#30363d",
          300: "#484f58",
          200: "#6e7681",
          100: "#8b949e",
        },
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "serif"],
        "arabic-naskh": ["var(--font-arabic-naskh)", "serif"],
        "arabic-amiri": ["var(--font-arabic-amiri)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-green": "pulseGreen 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(74, 222, 128, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
