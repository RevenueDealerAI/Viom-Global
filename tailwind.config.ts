import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  future: {
    // Tailwind v3 only fires `hover:` utilities on devices that report
    // (hover: hover) when this is on. Critical for iOS — otherwise hover
    // effects "stick" on tap.
    hoverOnlyWhenSupported: true,
  },
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
      // === FLUID TYPE SCALE ============================================
      // Each value clamps between a mobile floor and a desktop ceiling and
      // scales linearly with viewport width in between. Body copy stays
      // fixed-size on purpose (readability).
      fontSize: {
        // role-named utilities — preferred for new code
        "fluid-h1": ["clamp(2.75rem, 5.5vw + 1rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "fluid-h2": ["clamp(2rem, 4vw + 0.75rem, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.022em" }],
        "fluid-h3": ["clamp(1.25rem, 1.5vw + 0.75rem, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        "fluid-h4": ["clamp(1.125rem, 0.6vw + 0.9rem, 1.375rem)", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
        "fluid-lead": ["clamp(1rem, 0.6vw + 0.85rem, 1.1875rem)", { lineHeight: "1.55" }],
        "fluid-pillar": ["clamp(2.25rem, 3.5vw + 1rem, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "fluid-stat": ["clamp(3rem, 6vw + 1rem, 6rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      // === FLUID SPACING UTILITIES =====================================
      // Use as `p-fluid-card`, `gap-fluid-stack`, etc.
      spacing: {
        "fluid-section": "clamp(4rem, 8vw, 11rem)",
        "fluid-block": "clamp(2rem, 4vw, 4rem)",
        "fluid-stack": "clamp(0.75rem, 1.5vw, 1.5rem)",
        "fluid-card": "clamp(1.5rem, 3vw, 2.5rem)",
        "fluid-gutter": "clamp(1rem, 4vw, 2rem)",
      },
    },
  },
  plugins: [containerQueries],
} satisfies Config;
