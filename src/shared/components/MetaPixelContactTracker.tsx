"use client";

import { useEffect } from "react";
import { MetaEventParams, trackMetaEvent } from "@/shared/lib/metaPixel";

/**
 * Lee los atributos data-track del enlace: data-track="hero" pasa a origen: "hero" y
 * cada data-track-xxx="valor" pasa a xxx: "valor".
 */
function readTrackParams(link: HTMLElement): MetaEventParams {
  const params: MetaEventParams = {};
  for (const [key, value] of Object.entries(link.dataset)) {
    if (!key.startsWith("track") || value === undefined) continue;
    const name = key === "track" ? "origen" : key.charAt(5).toLowerCase() + key.slice(6);
    params[name] = value;
  }
  return params;
}

/**
 * Registra en el Meta Pixel los clics en enlaces de contacto: Contact para WhatsApp y
 * llamadas, FindLocation para "cómo llegar". El origen sale del atributo data-track.
 */
export default function MetaPixelContactTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = readTrackParams(link);

      if (href.includes("wa.me/")) trackMetaEvent("Contact", { ...params, metodo: "whatsapp" });
      else if (href.startsWith("tel:")) trackMetaEvent("Contact", { ...params, metodo: "llamada" });
      else if (params.origen === "como_llegar") trackMetaEvent("FindLocation", params);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
