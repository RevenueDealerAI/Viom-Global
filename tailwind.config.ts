import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1614",
        elev: "#0F1B18",
        card: "#131F1B",
        "card-2": "#172925",
        cream: "#FAFAF7",
        paper: "#FFFFFF",
        brand: "#0B5F4A",
        accent: "#4ADE80",
        signal: "#00FFA3",
        fg: "#F2F5F3",
        "fg-mid": "#A8B2AE",
        "fg-low": "#5C6660",
        "fg-on-light": "#0A1614",
        "line-dark": "rgba(255,255,255,0.06)",
        "line-strong": "rgba(255,255,255,0.10)",
        "line-light": "rgba(10,22,20,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
        card: "8px",
        "card-lg": "16px",
        mockup: "24px",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
