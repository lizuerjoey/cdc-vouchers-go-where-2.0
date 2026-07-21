import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          red: "#d71920",
          blue: "#1769aa",
          sky: "#67c7f2",
          navy: "#082f49",
          ink: "#172b3a",
          mist: "#f5f8fb",
          line: "#dbe5ec",
        },
      },
      boxShadow: {
        panel: "0 20px 55px rgba(8, 47, 73, 0.12)",
        card: "0 8px 30px rgba(8, 47, 73, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
