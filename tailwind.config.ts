import type { Config } from "tailwindcss";
import { colors, radii, shadows } from "./src/shared/constants/theme.constants";

// Este archivo NO define valores propios: todo viene de
// src/shared/constants/theme.constants.ts, que es el único lugar
// que debes editar para cambiar la apariencia del sitio.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": colors.brandDark,
        "brand-dark-alt": colors.brandDarkAlt,
        "brand-green": colors.brandGreen,
        "brand-green-hover": colors.brandGreenHover,
        "accent-gold": colors.accentGold,
        "accent-gold-soft": colors.accentGoldSoft,
        "cream-bg": colors.creamBg,
        "cream-card": colors.creamCard,
        "text-dark": colors.textDark,
        "text-muted": colors.textMuted,
        "text-on-dark": colors.textOnDark,
        "text-on-dark-muted": colors.textOnDarkMuted,
        "border-soft": colors.border,
        "warning-bg": colors.warningBg,
        "warning-text": colors.warningText,
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
        pill: radii.pill,
      },
      boxShadow: {
        card: shadows.card,
        "card-hover": shadows.cardHover,
        "floating-cta": shadows.floatingCta,
      },
    },
  },
  plugins: [],
};

export default config;
