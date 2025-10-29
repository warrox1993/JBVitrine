/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/shared/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-strong": "var(--color-primary-strong)",
        "primary-contrast": "var(--color-primary-contrast)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "accent-1": "var(--color-accent-1)",
        "accent-2": "var(--color-accent-2)",
        "accent-3": "var(--color-accent-3)",
        danger: "var(--color-danger)",
        bg: "var(--color-bg)",
        "bg-alt": "var(--color-bg-alt)",
        surface: "var(--color-surface)",
        "surface-glass": "var(--color-surface-glass)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        base: "var(--font-base)",
        display: "var(--font-display)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
      transitionDuration: {
        DEFAULT: "var(--transition-base)",
        fast: "var(--transition-fast)",
      },
      zIndex: {
        base: "var(--z-base)",
        header: "var(--z-header)",
        sidebar: "var(--z-sidebar)",
        overlay: "var(--z-overlay)",
        progress: "var(--z-progress)",
        modal: "var(--z-modal)",
      },
      screens: {
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1440px",
      },
      container: {
        center: true,
        padding: "var(--container-padding)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
