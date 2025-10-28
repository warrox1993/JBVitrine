theme: {
    extend: {
        colors: {
            // Palette principale
            primary: "#FF6A00",
                "primary-strong": "#E45700",
                "primary-contrast": "#0F1115",
                accent: "#3A85FF",
                "accent-1": "#3A85FF",
                "accent-2": "#FFC43A",
                "accent-3": "#E45700",
                secondary: "#FFC43A",
                danger: "#E5484D",
                success: "#28a745",
                warning: "#ffc107",
                info: "#17a2b8",
                bg: "#0F1115",
                "bg-alt": "#161A22",
                "bg-1": "#0F1115",
                "bg-2": "#161A22",
                "bg-3": "#1E2430",
                surface: "#1E2430",
                "surface-glass": "rgba(30,36,48,0.6)",
                "surface-elevated": "#fff",
                border: "#2B3342",
                "border-hover": "hsla(220,20%,20%,0.25)",
                shadow: "hsla(220,20%,10%,0.1)",
                glow: "rgba(255,106,0,0.24)",
                "glow-inner": "0 0 12px rgba(255,196,58,0.12)",
                "glow-outer": "0 0 24px rgba(255,106,0,0.24)",
                text: "#F6F7F9",
                "text-1": "#F6F7F9",
                "text-2": "#C8CDD6",
                "text-3": "color-mixin oklab, var--color-text-muted, 000 30", // (à adapter si besoin)
                "text-muted": "#C8CDD6",
                white: "#fff",
                blue: "#007bff",
                red: "#dc3545",
                green: "#28a745",
                yellow: "#ffc107",
                orange: "#fd7e14",
                pink: "#e83e8c",
                indigo: "#6610f2",
                purple: "#6f42c1",
                cyan: "#17a2b8",
                dark: "#343a40",
                light: "#f8f9fa",
            // Ajoute tes autres couleurs si besoin…
        },
        fontFamily: {
            base: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
                display: ["Instrument Sans", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
                sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
        },
        spacing: {
            "1": "0.25rem",
                "2": "0.5rem",
                "3": "1rem",
                "4": "1.5rem",
                "5": "2.5rem",
                "6": "4rem",
                "7": "6.5rem",
                "8": "10rem"
        },
        borderRadius: {
            sm: "0.375rem",
                md: "0.75rem",
                lg: "1.25rem",
                xl: "2rem",
                full: "9999px"
        },
        boxShadow: {
            glow: "0 0 24px rgba(255,106,0,0.24)",
                "glow-inner": "0 0 12px rgba(255,196,58,0.12)",
                sm: "0 1px 2px rgba(6,7,9,0.15)",
                md: "0 4px 12px rgba(6,7,9,0.25)",
                lg: "0 12px 40px rgba(6,7,9,0.35)"
        },
        screens: {
            xs: "576px",
                sm: "600px",
                md: "900px",
                lg: "1200px",
                xl: "1440px"
        },
        fontSize: {
            xs: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                sm: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
                base: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
                lg: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
                xl: "clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)",
                "2xl": "clamp(1.75rem, 1.5rem + 1vw, 2.25rem)",
                "3xl": "clamp(2.25rem, 1.75rem + 2vw, 3.5rem)",
                "4xl": "clamp(3rem, 2rem + 4vw, 5rem)"
        },
        transitionTimingFunction: {
            standard: "cubic-bezier(.2,.6,.2,1)",
                btn: "cubic-bezier(.2,.8,.2,1)"
        },
        transitionDuration: {
            DEFAULT: "0.4s",
                fast: "0.25s",
                "btn-anim-t": "180ms",
                "dur-1": "120ms",
                "dur-2": "180ms",
                "dur-3": "240ms"
        },
        container: {
            center: true,
                padding: {
                DEFAULT: "clamp(1.5rem, 5vw, 6rem)"
            }
        },
        zIndex: {
            base: "0",
                header: "100",
                modal: "1000",
                overlay: "300",
                progress: "10000",
                sidebar: "200"
        }
        // Ajoute ici tous tokens mapping, keyframes, etc.
    }
}
