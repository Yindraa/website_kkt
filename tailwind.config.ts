// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // biarkan hanya jika kamu pakai folder src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-poppins)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          DEFAULT: "#3669A3", // biru kalem (primary)
          50: "#F2F6FB",
          100: "#E6EEF7",
          200: "#C6DAEE",
          300: "#A4C4E3",
          400: "#7EAAD6",
          500: "#5B8FC7",
          600: "#3669A3",
          700: "#2E5A8C",
          800: "#254A73",
          900: "#1C3857",
        },
      },
      boxShadow: {
        soft: "0 2px 10px rgba(20, 40, 80, 0.06)",
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
