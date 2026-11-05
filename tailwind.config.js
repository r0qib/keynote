/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          "Inter",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: ['"SF Mono"', "ui-monospace", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      // Design px on the 1920 × 1080 stage (plan §4.3).
      fontSize: {
        display: ["200px", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" }],
        headline: ["96px", { lineHeight: "1.04", letterSpacing: "-0.02em", fontWeight: "800" }],
        sub: ["48px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["36px", { lineHeight: "1.3", fontWeight: "500" }],
        label: ["28px", { lineHeight: "1.3", fontWeight: "500" }],
        code: ["30px", { lineHeight: "1.45", fontWeight: "500" }],
        badge: ["24px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600" }],
      },
      colors: {
        canvas: "#F4F4F6",
        ink: "#111113",
        muted: "#4A4A55",
        surface: "#FFFFFF",
        line: "#E2E2E8",
        card: "#FFFFFF",
        mascot: "#F6A6A4",
        accent: {
          blue: "#1B7ED0",
          green: "#1E9E6A",
          amber: "#D97706",
          coral: "#E5484D",
          teal: "#0E7C86",
        },
        tint: {
          good: "#E5F4EC",
          bad: "#F8EEDF",
          ugly: "#FAE6E6",
          count: "#E0EFF1",
          how: "#E4EFF8",
        },
      },
      spacing: {
        "safe-x": "120px",
        "safe-y": "96px",
      },
    },
  },
  plugins: [],
};
