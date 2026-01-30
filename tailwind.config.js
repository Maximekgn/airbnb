/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F43F5E",
        primaryDark: "#E11D48",
        primaryLight: "#FFF1F2",
        bg: "#F9FAFB",
        surface: "#FFFFFF",
        ink: "#111827",
        muted: "#6B7280",
        border: "#E5E7EB",
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};
