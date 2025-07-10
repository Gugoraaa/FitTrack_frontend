// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D9488",
        secondary: "#F97316",
        background: "#F8FAFC",
        text: "#1E293B",
        success: "#10B981",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
