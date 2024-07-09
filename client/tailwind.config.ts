import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "focus-in-contract":
          "focus-in-contract 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "fade-in":
          "fade-in 2.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      },
      keyframes: {
        "focus-in-contract": {
          "0%": {
            "letter-spacing": "1em",
            filter: "blur(12px)",
            opacity: "0",
          },
          to: {
            filter: "blur(0)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
