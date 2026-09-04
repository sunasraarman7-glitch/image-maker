/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#0d0d0d",
        "primary": "#F5B800",
        "primary-hover": "#FFC820",
        "primary-container": "#d4af37",
        "on-primary": "#000000",
        "on-background": "#ffffff",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#a8a29e",
        "outline": "#78716c",
        "outline-variant": "#292524",
        "card-bg": "#121212",
        "card-border": "#222222",
        "background": "#050505",
        "surface-container": "#161616",
        "surface-container-lowest": "#0a0a0a",
        "surface-container-high": "#1f1f1f"
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
        full: "9999px"
      },
      spacing: {
        "unit-1": "4px",
        "unit-2": "8px",
        "unit-4": "16px",
        "unit-6": "24px",
        "unit-8": "32px",
        "unit-12": "48px",
        "unit-16": "64px",
        "unit-24": "96px",
        "container-max": "1360px",
        "base": "4px",
        "gutter": "20px",
        "margin-mobile": "16px",
        "margin-desktop": "48px",
        "margin-wide": "64px"
      },
      fontFamily: {
        "headline": ["Bebas Neue", "sans-serif"],
        "headline-lg": ["Bebas Neue", "sans-serif"],
        "headline-xl": ["Bebas Neue", "sans-serif"],
        "display-lg": ["Bebas Neue", "sans-serif"],
        "cinzel": ["Cinzel", "serif"],
        "cinzel-dec": ["Cinzel Decorative", "serif"],
        "playfair": ["Playfair Display", "serif"],
        "cormorant": ["Cormorant Garamond", "serif"],
        "sans": ["Montserrat", "sans-serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "body-md": ["Montserrat", "sans-serif"],
        "title-md": ["Montserrat", "sans-serif"],
        "label-sm": ["Montserrat", "sans-serif"],
        "cursive": ["Great Vibes", "Alex Brush", "cursive"],
        "pinyon": ["Pinyon Script", "Great Vibes", "cursive"],
        "script": ["Alex Brush", "Great Vibes", "cursive"]
      }
    },
  },
  plugins: [],
}
