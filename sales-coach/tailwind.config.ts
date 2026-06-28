import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tonlita: {
          red: "#c92824",
          dark: "#0d1117",
          ink: "#161b22",
          line: "#d7dde5"
        }
      },
      boxShadow: {
        industrial: "0 24px 80px rgba(13, 17, 23, 0.14)"
      },
      fontFamily: {
        display: ["Impact", "Arial Black", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
