/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mystic: {
          plum: "#5E3A73",
          iris: "#8A6AAE",
          gold: "#D8B36A",
          cream: "#F8F3EB",
          lilac: "#E8E0F2",
          ink: "#2D2434"
        }
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        aura: "0 20px 50px rgba(94, 58, 115, 0.16)",
        card: "0 18px 40px rgba(45, 36, 52, 0.1)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(216, 179, 106, 0.28), transparent 35%), radial-gradient(circle at top right, rgba(138, 106, 174, 0.25), transparent 30%), linear-gradient(135deg, #fffdf8 0%, #f7f0ff 55%, #fff7eb 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out both"
      }
    }
  },
  plugins: []
};
