import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#2B211A",
        "bg-deep": "#211913",
        card: "#3D2E22",
        cal: "#F1E8D9",
        "cal-dim": "#C9BCA6",
        achiote: "#C1502E",
        "achiote-dim": "#8F3A22",
        nopal: "#6B7A4F",
        oro: "#B98B3E",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn .35s ease",
      },
    },
  },
  plugins: [],
};

export default config;
