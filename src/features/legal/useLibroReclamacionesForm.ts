"use client";

import { FormEvent, useState } from "react";
import { ComplaintFormState, validateComplaintForm } from "./complaintValidation";

export type ComplaintFormStatus = "idle" | "submitting" | "success" | "error";

export function useLibroReclamacionesForm() {
  const [status, setStatus] = useState<ComplaintFormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(state: ComplaintFormState) {
    const clientErrors = validateComplaintForm(state);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      return clientErrors;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/libro-reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        const serverErrors = data.errors ?? { general: "No pudimos enviar tu reclamo. Intenta de nuevo." };
        setErrors(serverErrors);
        setStatus("error");
        return serverErrors;
      }

      setStatus("success");
      return {};
    } catch {
      const err = { general: "No pudimos conectar con el servidor. Intenta de nuevo." };
      setErrors(err);
      setStatus("error");
      return err;
    }
  }

  /** Revalida en vivo mientras el usuario escribe, para que los errores desaparezcan apenas se corrigen. */
  function revalidateLive(state: ComplaintFormState) {
    if (status !== "error") return;
    setErrors((prev) => {
      const fresh = validateComplaintForm(state);
      return prev.general ? { ...fresh, general: prev.general } : fresh;
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>, getState: () => ComplaintFormState) {
    e.preventDefault();
    return submit(getState());
  }

  return { status, errors, handleSubmit, revalidateLive };
}