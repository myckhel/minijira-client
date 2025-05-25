/**
 * Hugging Face Design System - TypeScript Configuration
 * Design tokens and utilities for consistent styling across the application
 */

// Design Tokens
export const HF_COLORS = {
  // Primary HF Brand Colors
  primary: {
    yellow: "#ffd21e",
    orange: "#ff9d00",
    gray: "#6b7280",
  },

  // HF Color Scale
  hf: {
    50: "#fefdf8",
    100: "#fdfaed",
    200: "#fbf2d1",
    300: "#f9e7a8",
    400: "#f6d56e",
    500: "#ffd21e",
    600: "#ff9d00",
    700: "#e88700",
    800: "#c56d00",
    900: "#a35700",
    950: "#8a4600",
  },

  // Neutral Colors
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#6b7280",
    600: "#475569",
    700: "#334155",
    800: "#f8fafc", // Changed to light for better visibility
    900: "#0f172a",
    950: "#020617",
  },

  // Semantic Colors
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
} as const;

// Typography Scale
export const HF_TYPOGRAPHY = {
  fontFamily: {
    sans: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ],
    mono: ["JetBrains Mono", "Fira Code", "Monaco", "Consolas", "monospace"],
  },

  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

// Spacing Scale
export const HF_SPACING = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// Border Radius
export const HF_RADIUS = {
  none: "0",
  sm: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Shadows
export const HF_SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  hf: "0 4px 12px rgba(255, 157, 0, 0.15)",
  hfLg: "0 8px 24px rgba(255, 157, 0, 0.2)",
} as const;

// Breakpoints
export const HF_BREAKPOINTS = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Animation Durations
export const HF_ANIMATIONS = {
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

// Component Variants
export const HF_BUTTON_VARIANTS = {
  primary: "hf-btn hf-btn-primary",
  secondary: "hf-btn hf-btn-secondary",
  outline: "hf-btn hf-btn-outline",
  ghost: "hf-btn hf-btn-ghost",
} as const;

export const HF_BUTTON_SIZES = {
  sm: "hf-btn-sm",
  md: "",
  lg: "hf-btn-lg",
} as const;

export const HF_BADGE_VARIANTS = {
  primary: "hf-badge hf-badge-primary",
  success: "hf-badge hf-badge-success",
  error: "hf-badge hf-badge-error",
  warning: "hf-badge hf-badge-warning",
  info: "hf-badge hf-badge-info",
} as const;

// TypeScript Types
export type HFColor = keyof typeof HF_COLORS.hf;
export type HFSemanticColor = "success" | "error" | "warning" | "info";
export type HFButtonVariant = keyof typeof HF_BUTTON_VARIANTS;
export type HFButtonSize = keyof typeof HF_BUTTON_SIZES;
export type HFBadgeVariant = keyof typeof HF_BADGE_VARIANTS;

// Utility Functions
export const getHFColor = (
  _color: HFColor,
  shade: keyof typeof HF_COLORS.hf = 500
) => {
  return HF_COLORS.hf[shade];
};

export const getSemanticColor = (
  color: HFSemanticColor,
  shade: number = 500
) => {
  return HF_COLORS[color][shade as keyof (typeof HF_COLORS)[typeof color]];
};

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// HF Component Props Interfaces
export interface HFButtonProps {
  variant?: HFButtonVariant;
  size?: HFButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface HFBadgeProps {
  variant?: HFBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export interface HFCardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface HFInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

// Design System Constants
export const HF_DESIGN_SYSTEM = {
  colors: HF_COLORS,
  typography: HF_TYPOGRAPHY,
  spacing: HF_SPACING,
  radius: HF_RADIUS,
  shadows: HF_SHADOWS,
  breakpoints: HF_BREAKPOINTS,
  animations: HF_ANIMATIONS,
  buttonVariants: HF_BUTTON_VARIANTS,
  buttonSizes: HF_BUTTON_SIZES,
  badgeVariants: HF_BADGE_VARIANTS,
} as const;

export default HF_DESIGN_SYSTEM;
