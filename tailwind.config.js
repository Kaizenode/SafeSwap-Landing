/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // SafeSwap brand system (from Visual Identity guide)
        ink: {
          DEFAULT: "#101B1D", // Rich Black — reliability, trust, security
          deep: "#0A1213",
          900: "#0B1416",
          800: "#101B1D",
          700: "#16282A",
        },
        green: {
          DEFAULT: "#01A78F", // Persian Green — innovation & growth
          deep: "#02201A",
          dark: "#016B5B",
          600: "#01A78F",
        },
        mint: {
          DEFAULT: "#5FD6AC", // Turquoise — innovation & accessibility
          soft: "#9CE7CC",
          pale: "#E6FBF2",
        },
        spark: "#1446F0", // logo arrow spark accent
      },
      fontFamily: {
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-32" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 28s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
        marquee: "marquee 38s linear infinite",
        "dash-flow": "dash-flow 1.4s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": { perspective: "1000px" },
        ".perspective-1400": { perspective: "1400px" },
        ".perspective-2000": { perspective: "2000px" },
        ".preserve-3d": { transformStyle: "preserve-3d" },
        ".backface-hidden": { backfaceVisibility: "hidden" },
      });
    },
  ],
};
