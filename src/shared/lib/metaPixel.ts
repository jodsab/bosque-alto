export type MetaEventParams = Record<string, string | number>;

/**
 * Eventos estándar de Meta: son los que el equipo de marketing ya conoce y los que se
 * eligen directo al crear una campaña ("Cliente potencial", "Contacto", "Buscar ubicación").
 */
const STANDARD_EVENTS = ["Lead", "Contact", "FindLocation"] as const;
type StandardEvent = (typeof STANDARD_EVENTS)[number];

/** Eventos propios, para acciones que no tienen equivalente estándar. */
type CustomEvent = "WhatsAppDespuesDeCotizar" | "SimuladorDeCredito";

export type MetaEvent = StandardEvent | CustomEvent;

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom", event: string, params?: MetaEventParams) => void;
  }
}

/**
 * Envía un evento al Meta Pixel; todos llevan el parámetro `origen` (desde qué parte de
 * la web se hizo). No hace nada si el pixel no está cargado (sin ID o bloqueado).
 */
export function trackMetaEvent(event: MetaEvent, params?: MetaEventParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  const isStandard = (STANDARD_EVENTS as readonly string[]).includes(event);
  window.fbq(isStandard ? "track" : "trackCustom", event, params);
}
