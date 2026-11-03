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
        party: {
          bg: "#120A2A",
          card: "#1E1242",
          yellow: "#FFD600",
          green: "#00F59B",
          red: "#FF2A54",
          blue: "#00D2FF",
          purple: "#9D4EDD",
          orange: "#FF7B00",
        },
      },
      boxShadow: {
        brutal: "6px 6px 0px 0px #000000",
        "brutal-sm": "3px 3px 0px 0px #000000",
        "brutal-lg": "10px 10px 0px 0px #000000",
        "brutal-white": "6px 6px 0px 0px #FFFFFF",
      },
      animation: {
        "pulse-fast": "pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
