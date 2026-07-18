/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1B33",       // primary dark surfaces, footer, hero depth
        steel: "#4A6FA5",     // Zendale brand blue
        porcelain: "#F7F5F1", // light surfaces — never pure white
        mist: "#DCE6F2",      // section tints, card surfaces
        brass: "#C89B5A",     // rare premium accent
        carbon: "#16233A",    // body text on light
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [],
};
