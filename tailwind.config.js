/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#F8FAFC",
          dark: "#1C1B19",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F1F5F9",
          3: "#E2E8F0",
        },
        border: {
          DEFAULT: "#E2E8F0",
          hover: "#CBD5E1",
          dark: "#2E2C29",
        },
        text: {
          DEFAULT: "#1E293B",
          2: "#64748B",
          3: "#94A3B8",
        },
        accent: {
          DEFAULT: "#99582A",
          hover: "#6F3D1D",
          light: "rgba(153, 88, 42, 0.12)",
        },
        brand: {
          DEFAULT: "#BB7E53",
          dark: "#99582A",
          light: "#F8FAFC",
        },
        green: {
          DEFAULT: "#0D9488",
          bg: "#F0FDFA",
        },
        red: {
          DEFAULT: "#E11D48",
          bg: "#FFF1F2",
        },
      },
      fontFamily: {
        display: ["Karla", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "14px",
        xl: "20px",
      },
      spacing: {
        "nav-h": "56px",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
    },
  },
  plugins: [],
};
