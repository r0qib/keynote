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
          '"Segoe UI"',
          "Roboto",
          "Inter",
          "sans-serif",
        ],
        mono: ['"SF Mono"', "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        canvas: "#FAFAFA",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
