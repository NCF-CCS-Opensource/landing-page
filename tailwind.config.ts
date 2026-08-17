import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#04040d",
          900: "#0a0a1f",
          800: "#12122e",
        },
        accent: {
          purple: "#8b5cf6",
          mint: "#a7f3d0",
          glow: "#38bdf8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
