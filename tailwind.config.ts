import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  important: "#__docusaurus",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F59E0B",
          secondary: "#F97316",
          accent: "#FBBF24",
          success: "#10B981",
          danger: "#EF4444",
          info: "#3B82F6",
        },
        surface: {
          DEFAULT: "var(--ba-bg)",
          secondary: "var(--ba-bg-secondary)",
          card: "var(--ba-card)",
          border: "var(--ba-border)",
        },
        ink: {
          DEFAULT: "var(--ba-text)",
          secondary: "var(--ba-text-secondary)",
          muted: "var(--ba-text-muted)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "section": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "card-title": ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        "body": ["1.0625rem", { lineHeight: "1.65" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
        code: "18px",
        hero: "24px",
      },
      boxShadow: {
        "ba-sm": "var(--ba-shadow-sm)",
        "ba-md": "var(--ba-shadow-md)",
        "ba-lg": "var(--ba-shadow-lg)",
        "ba-glow": "0 0 24px rgba(245, 158, 11, 0.35)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      maxWidth: {
        content: "1200px",
        prose: "72rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
