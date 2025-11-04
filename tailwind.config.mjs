module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700", // gold
        secondary: "#00FFFF", // neon blue
        background: "#000000",
        card: "#0B0B0B",
        border: "#1F1F1F",
        foreground: "#FFFFFF",
        "muted-foreground": "#9CA3AF",
      },
      fontFamily: {
        montserrat: ["Montserrat", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        neon: "0 6px 20px rgba(0,255,255,0.06), 0 2px 8px rgba(255,215,0,0.06)",
      },
    },
  },
  plugins: [],
};