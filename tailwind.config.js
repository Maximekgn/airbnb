/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D4A574",
        primaryDark: "#957A44",
        primaryLight: "#F5E6D3",
        bg: "#FDFCFA",
        surface: "#FFFFFF",
        ink: "#1A1A1A",
        muted: "#8B8B8B",
        border: "#E8E8E8",
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};
