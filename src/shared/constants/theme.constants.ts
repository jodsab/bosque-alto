/**
 * theme.constants.ts
 * ------------------------------------------------------------------
 * ÚNICO archivo de estilos del proyecto.
 *
 * Todo lo que se ve en la web (colores, tipografías, espaciados,
 * bordes, sombras) se define AQUÍ y solo aquí. `tailwind.config.ts`
 * importa estos valores para generar las clases de utilidad, así
 * que para "actualizar la web" desde el punto de vista visual,
 * este es el único archivo que necesitas tocar.
 *
 * Nota: no se pudo leer la hoja de estilos original del sitio de
 * referencia (Netlify no expone el CSS vía fetch de texto), así que
 * esta paleta es una reconstrucción fiel basada en el contenido, el
 * meta "theme-color" original (#0F1A12, verde bosque oscuro) y el
 * tono visual del proyecto (condominio campestre / campo / naturaleza).
 * Ajusta libremente los valores hexadecimales si tienes la guía de
 * marca real.
 */

export const colors = {
  // Verde bosque oscuro — color de marca principal (header, footer, hero)
  brandDark: "#0F1A12",
  brandDarkAlt: "#16261A",
  // Verde principal de acciones (botones WhatsApp / CTAs)
  brandGreen: "#2F6B3C",
  brandGreenHover: "#26582F",
  // Dorado/tierra — acentos, precios, íconos destacados
  accentGold: "#C9A24B",
  accentGoldSoft: "#E4D5A7",
  // Fondo crema — secciones claras
  creamBg: "#F6F3EA",
  creamCard: "#FFFFFF",
  // Texto
  textDark: "#16221A",
  textMuted: "#5B6A5D",
  textOnDark: "#F3F0E6",
  textOnDarkMuted: "#B8C2B7",
  // Utilidad
  border: "#DEDACB",
  success: "#2F6B3C",
  warningBg: "#FCEFD8",
  warningText: "#8A5A16",
  // Azul de Google — botones "Abrir mapa" (referencia visual a Google Maps)
  googleBlue: "#4285F4",
  googleBlueHover: "#3367D6",
} as const;

export const fonts = {
  // Familia única (Plus Jakarta Sans, pesos 400/600/800) — display usa peso
  // extrabold vía globals.css, body usa regular/semibold.
  display: "var(--font-sans)",
  body: "var(--font-sans)",
} as const;

export const radii = {
  sm: "8px",
  md: "14px",
  lg: "24px",
  pill: "999px",
} as const;

export const shadows = {
  card: "0 2px 8px rgba(15, 26, 18, 0.06), 0 16px 32px -8px rgba(15, 26, 18, 0.12)",
  cardHover: "0 8px 16px rgba(15, 26, 18, 0.08), 0 24px 48px -8px rgba(15, 26, 18, 0.18)",
  floatingCta: "0 -4px 20px rgba(15, 26, 18, 0.18)",
  // Sombras de color para botones CTA — deben re-calcularse manualmente si
  // brandGreen/accentGold cambian (son rgba fijos, no derivados del hex).
  ctaPrimary: "0 10px 24px -6px rgba(47, 107, 60, 0.5)",
  ctaAccent: "0 10px 24px -6px rgba(201, 162, 75, 0.5)",
} as const;

export const spacing = {
  // Espacio vertical entre secciones (fluido: crece con el viewport en vez
  // de saltar en escalones). Antes era clamp(3.5rem, 8vw, 7rem) — se redujo
  // porque se sentía demasiado grande entre secciones.
  sectionY: "clamp(3rem, 6vw, 5rem)",
  sectionX: "clamp(1.25rem, 5vw, 2.5rem)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

/** Datos de contacto reutilizados por CTAs/formularios (no es texto editorial, ver content.json para eso) */
export const contact = {
  whatsappNumber: "51922199903", // formato internacional sin '+' para enlaces wa.me
  whatsappDisplay: "+51 922 199 903",
  whatsappHref: "https://wa.me/51922199903",
  // Línea directa del gerente de ventas, para el CTA "Llamar ahora"
  salesManagerPhone: "51982810387",
} as const;

export const theme = { colors, fonts, radii, shadows, spacing, breakpoints, contact };
export default theme;