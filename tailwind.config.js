/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Hugging Face Color Palette
      colors: {
        // Primary HF Colors
        hf: {
          50: "#fefdf8",
          100: "#fdfaed",
          200: "#fbf2d1",
          300: "#f9e7a8",
          400: "#f6d56e",
          500: "#ffd21e", // Primary HF Yellow
          600: "#ff9d00", // Primary HF Orange
          700: "#e88700",
          800: "#c56d00",
          900: "#a35700",
          950: "#8a4600",
        },
        // Neutral grays matching HF design
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#6b7280", // HF Gray
          600: "#475569",
          700: "#334155",
          800: "#f8fafc", // Changed from dark to light for better visibility
          900: "#0f172a",
          950: "#020617",
        },
        // Status colors inspired by HF design
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        info: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },

      // Typography following HF design patterns
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },

      // Spacing that matches HF component spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },

      // Border radius following HF design
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      // Box shadows inspired by HF components
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        hf: "0 4px 12px rgba(255, 157, 0, 0.15)", // HF orange glow
        "hf-lg": "0 8px 24px rgba(255, 157, 0, 0.2)",
      },

      // Animation and transitions
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
        "pulse-hf": "pulseHf 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        pulseHf: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 157, 0, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(255, 157, 0, 0)" },
        },
      },

      // Screen breakpoints optimized for HF-style layouts
      screens: {
        xs: "475px",
        "3xl": "1680px",
        "4xl": "2560px",
      },

      // Background patterns inspired by HF
      backgroundImage: {
        "gradient-hf": "linear-gradient(135deg, #ffd21e 0%, #ff9d00 100%)",
        "gradient-hf-subtle":
          "linear-gradient(135deg, #fefdf8 0%, #fdfaed 100%)",
        "gradient-radial-hf":
          "radial-gradient(circle, #ffd21e 0%, #ff9d00 70%)",
      },
    },
  },
  plugins: [
    // Custom plugin for HF-specific utilities
    function ({ addUtilities, addComponents, theme }) {
      addUtilities({
        // HF Button utilities
        ".btn-hf": {
          "@apply bg-gradient-hf text-white font-medium px-4 py-2 rounded-lg shadow-hf hover:shadow-hf-lg transition-all duration-200 hover:scale-105":
            {},
        },
        ".btn-hf-outline": {
          "@apply border-2 border-hf-600 text-hf-600 font-medium px-4 py-2 rounded-lg hover:bg-hf-600 hover:text-white transition-all duration-200":
            {},
        },
        ".btn-hf-ghost": {
          "@apply text-hf-600 font-medium px-4 py-2 rounded-lg hover:bg-hf-50 transition-all duration-200":
            {},
        },

        // HF Card utilities
        ".card-hf": {
          "@apply bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-xl transition-shadow duration-300":
            {},
        },
        ".card-hf-hover": {
          "@apply card-hf hover:border-hf-300 hover:shadow-hf-lg cursor-pointer":
            {},
        },

        // HF Input utilities
        ".input-hf": {
          "@apply w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-hf-500 focus:border-transparent outline-none transition-all duration-200":
            {},
        },

        // HF Badge utilities
        ".badge-hf": {
          "@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hf-100 text-hf-800":
            {},
        },
        ".badge-success": {
          "@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800":
            {},
        },
        ".badge-error": {
          "@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800":
            {},
        },
        ".badge-warning": {
          "@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800":
            {},
        },
        ".badge-info": {
          "@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-100 text-info-800":
            {},
        },

        // HF Layout utilities
        ".container-hf": {
          "@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8": {},
        },
        ".section-hf": {
          "@apply py-12 sm:py-16 lg:py-20": {},
        },

        // HF Text utilities
        ".text-hf-gradient": {
          "@apply bg-gradient-hf bg-clip-text text-transparent": {},
        },
        ".text-muted": {
          "@apply text-neutral-600": {},
        },
        ".text-emphasized": {
          "@apply text-neutral-900 font-semibold": {},
        },
      });

      addComponents({
        // HF Navigation component
        ".nav-hf": {
          "@apply bg-white border-b border-neutral-200 shadow-sm": {},
          ".nav-item": {
            "@apply px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-hf-600 hover:bg-neutral-50 transition-colors duration-200":
              {},
          },
          ".nav-item-active": {
            "@apply px-3 py-2 rounded-md text-sm font-medium bg-hf-100 text-hf-700":
              {},
          },
        },

        // HF Modal component
        ".modal-hf": {
          "@apply fixed inset-0 z-50 overflow-y-auto": {},
          ".modal-backdrop": {
            "@apply fixed inset-0 bg-black bg-opacity-50 transition-opacity":
              {},
          },
          ".modal-content": {
            "@apply relative bg-white rounded-xl shadow-2xl max-w-lg mx-auto mt-20 p-6":
              {},
          },
        },

        // HF Form components
        ".form-hf": {
          "@apply space-y-6": {},
          ".form-group": {
            "@apply space-y-2": {},
          },
          ".form-label": {
            "@apply block text-sm font-medium text-neutral-700": {},
          },
          ".form-input": {
            "@apply input-hf": {},
          },
          ".form-error": {
            "@apply text-sm text-error-600": {},
          },
          ".form-help": {
            "@apply text-sm text-neutral-500": {},
          },
        },
      });
    },
  ],
  corePlugins: {
    // Enable preflight for better HF styling, but keep disabled for Ant Design compatibility
    preflight: false,
  },
};
