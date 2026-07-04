import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          red: "#d71920",
          blue: "#1254a5",
          ink: "#1f2933",
          mist: "#f4f7fb",
          line: "#d9e2ec",
        },
      },
      boxShadow: {
        panel: "0 14px 40px rgba(31, 41, 51, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
