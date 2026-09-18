import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-strong": "rgb(var(--color-accent-strong) / <alpha-value>)",
        "accent-text": "rgb(var(--color-accent-text) / <alpha-value>)",
        "accent-bright": "rgb(var(--color-accent-bright) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        btn: "11px",
        card: "15px",
      },
      boxShadow: {
        lift: "0 6px 18px rgba(32, 37, 41, 0.10)",
        pop: "0 10px 26px rgba(32, 37, 41, 0.14)",
      },
      transitionTimingFunction: {
        out: "ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
