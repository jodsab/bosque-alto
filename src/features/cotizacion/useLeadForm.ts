"use client";

import { FormEvent, useState } from "react";
import { trackMetaEvent } from "@/shared/lib/metaPixel";

export type LeadFormStatus = "idle" | "submitting" | "success" | "error";

export interface LeadFormState {
  name: string;
  phone: string;
  lot: string;
  message?: string;
}

/** Nombre legible de cada formulario para los eventos del Meta Pixel. */
const ORIGIN_LABELS: Record<string, string> = {
  hero: "portada",
  "cotizacion-final": "cotización final",
};

interface UseLeadFormOptions {
  source: string;
}

export function useLeadForm({ source }: UseLeadFormOptions) {
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(state: LeadFormState) {
    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, source }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { general: "No pudimos enviar tu solicitud. Intenta de nuevo." });
        setStatus("error");
        return;
      }

      setStatus("success");
      const origen = `Formulario de ${ORIGIN_LABELS[source] ?? source}`;
      trackMetaEvent("Lead", { medio: "Formulario", origen, lote: state.lot });
      if (data.whatsappUrl) {
        trackMetaEvent("WhatsAppDespuesDeCotizar", { origen, lote: state.lot });
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      setErrors({ general: "No pudimos conectar con el servidor. Intenta de nuevo." });
      setStatus("error");
    }
  }

  function handleSubmit(
    e: FormEvent<HTMLFormElement>,
    getState: () => LeadFormState
  ) {
    e.preventDefault();
    submit(getState());
  }

  return { status, errors, handleSubmit };
}
