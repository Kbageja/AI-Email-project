import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

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
                "base-white": "#ffffff",
                "main-50": "#cbcdff",
                "main-100": "#7579ff",
                "main-300": "#454ade",
                "main-600": "#1b1f3b",
                "main-900": "#0e0f17",
                white: "#ffffff",
                "card-50": "#f5f5ff",
                "card-100": "#dbdbff",
                "card-200": "#ebebff",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
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
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                spin78236: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                wobble1: {
                    "0%, 100%": {
                        transform: "translateY(0%) scale(1)",
                        opacity: "1",
                    },
                    "50%": {
                        transform: "translateY(-66%) scale(0.65)",
                        opacity: "0.8",
                    },
                },
                wobble2: {
                    "0%, 100%": {
                        transform: "translateY(0%) scale(1)",
                        opacity: "1",
                    },
                    "50%": {
                        transform: "translateY(66%) scale(0.65)",
                        opacity: "0.8",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "animate-fade-in": "fadeIn 0.3s ease-in-out",
                spin78236: "spin78236 2s linear infinite",
                wobble1: "wobble1 0.8s infinite ease-in-out",
                wobble2: "wobble2 0.8s infinite ease-in-out",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                revalia: ["Revalia", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
