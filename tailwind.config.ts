import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: {
          50: "#F0F7F4",
          100: "#D6EDE3",
          200: "#AEDCC6",
          300: "#72C2A0",
          400: "#3D9E72",
          500: "#2E7D57",
          600: "#1B4332",
          700: "#14332A",
          800: "#102820",
          900: "#0F1A15",
        },
        terra: {
          50: "#FDF5F0",
          100: "#FAE5D8",
          200: "#F4C4A8",
          300: "#EB9E78",
          400: "#DC7A4A",
          500: "#C4622D",
          600: "#A0481C",
          700: "#8A3C18",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E8E8E8",
          300: "#D1D1D1",
          400: "#9E9E9E",
          500: "#6B6B6B",
          700: "#2E2E2E",
          900: "#111111",
        },
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--brand-green)",
        background: "var(--background)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--btn-primary-bg)",
          foreground: "var(--btn-primary-text)",
        },
        secondary: {
          DEFAULT: "var(--brand-green-light)",
          foreground: "var(--brand-green-deep)",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "var(--brand-green)",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--brand-terra-light)",
          foreground: "var(--brand-terra)",
        },
        popover: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5rem" }],
        sm: ["0.875rem", { lineHeight: "1.625rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: ["1.125rem", { lineHeight: "1.875rem" }],
        xl: ["1.25rem", { lineHeight: "2rem" }],
        "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.25rem", { lineHeight: "3rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },
      spacing: {
        "4.5": "1.125rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        card: "var(--radius-lg)",
        "card-lg": "var(--radius-xl)",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        premium:
          "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        elegant: "0 20px 60px -15px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(1rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        parallax: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        parallax: "parallax 20s ease-in-out infinite alternate",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
