export type MetaEventParams = Record<string, string | number>;

type StandardEvent = "Lead" | "Contact" | "FindLocation";
type CustomEvent = "SimuladorCredito";

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom", event: string, params?: MetaEventParams) => void;
  }
}

/** Envía un evento estándar al Meta Pixel. No hace nada si el pixel no está cargado (sin ID o bloqueado). */
export function trackMetaEvent(event: StandardEvent, params?: MetaEventParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}

/** Envía un evento personalizado (sirve para públicos y conversiones personalizadas en Meta). */
export function trackMetaCustomEvent(event: CustomEvent, params?: MetaEventParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, params);
}
