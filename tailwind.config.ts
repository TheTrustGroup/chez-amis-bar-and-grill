import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        // Premium Restaurant Color Palette
        burgundy: {
          50: "#FDF2F4",
          100: "#FCE7EA",
          200: "#F9D0D7",
          300: "#F5A8B8",
          400: "#EE7793",
          500: "#E54D6F", // Base burgundy
          600: "#8B1538", // Primary deep burgundy
          700: "#A0153E", // Rich burgundy
          800: "#7A0F2E",
          900: "#5C0B23",
        },
        gold: {
          50: "#FDF9F0",
          100: "#FAF2E0",
          200: "#F5E4C1",
          300: "#EFD5A2",
          400: "#E9C683",
          500: "#D4AF37", // Classic gold
          600: "#C9A55A", // Warm gold
          700: "#B8944F",
          800: "#A78344",
          900: "#967239",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FAF7F2", // Primary cream
          200: "#F5F1E8", // Secondary cream
          300: "#F0EBDE",
          400: "#EBE5D4",
          500: "#E6DFCA",
        },
        charcoal: {
          50: "#F5F4F3",
          100: "#E8E6E4",
          200: "#D1CFCC",
          300: "#BAB8B4",
          400: "#A3A19C",
          500: "#8C8A84",
          600: "#75736C",
          700: "#5E5C54",
          800: "#47453C",
          900: "#292524", // Rich charcoal
          950: "#1C1917", // Deep charcoal
        },
        sage: {
          50: "#F4F6F5",
          100: "#E8ECE9",
          200: "#D1D9D3",
          300: "#BAC6BD",
          400: "#A3B3A7",
          500: "#7C8A7A", // Primary sage
          600: "#6B7769",
          700: "#5A6458",
          800: "#495147",
          900: "#383E36",
        },
        // Design System Colors (using CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Playfair Display", "serif"],
        heading: ["var(--font-heading)", "Montserrat", "Raleway", "sans-serif"],
        body: ["var(--font-body)", "Lora", "Crimson Text", "serif"],
        script: ["var(--font-script)", "Italiana", "Great Vibes", "cursive"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.625rem" }], // 14px
        base: ["1rem", { lineHeight: "1.75rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.875rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "2rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2.25rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.5rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "3rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1.1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1.1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
      },
      spacing: {
        "4.5": "1.125rem", // 18px
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "16px",
        "card-lg": "24px",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "premium": "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "elegant": "0 20px 60px -15px rgba(0, 0, 0, 0.15)",
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
        "parallax": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "parallax": "parallax 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

