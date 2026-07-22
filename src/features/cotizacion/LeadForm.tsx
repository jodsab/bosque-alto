"use client";

import { useRef } from "react";
import content from "@/shared/constants/content.json";
import { useLeadForm } from "./useLeadForm";

interface Props {
  source: "hero" | "cotizacion-final";
  title: string;
  subtitle?: string;
  nameLabel: string;
  phoneLabel: string;
  lotLabel: string;
  lotPlaceholder: string;
  messageLabel?: string;
  consentText: string;
  submitLabel: string;
  disclaimer?: string;
  variant?: "onDark" | "onLight";
}

export default function LeadForm({
  source,
  title,
  subtitle,
  nameLabel,
  phoneLabel,
  lotLabel,
  lotPlaceholder,
  messageLabel,
  consentText,
  submitLabel,
  disclaimer,
  variant = "onLight",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { status, errors, handleSubmit } = useLeadForm({ source });

  const isDark = variant === "onDark";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, () => {
      const form = formRef.current!;
      const data = new FormData(form);
      return {
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        lot: String(data.get("lot") ?? ""),
        message: String(data.get("message") ?? ""),
      };
    });
  };

  const labelClass = isDark ? "text-text-on-dark" : "text-text-dark";
  const fieldBase =
    "w-full rounded-md border px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-green";
  const inputClass = `${fieldBase} ${
    isDark
      ? "border-white/15 bg-white/5 text-text-on-dark placeholder:text-text-on-dark-muted"
      : "border-border-soft bg-cream-card text-text-dark placeholder:text-text-muted"
  }`;
  // Los <select> necesitan fondo sólido: en navegadores como Chrome/Edge el
  // desplegable nativo ignora fondos casi transparentes (bg-white/5) y pinta
  // blanco por defecto, dejando el texto claro ilegible.
  const selectClass = `${fieldBase} appearance-none pr-9 ${
    isDark
      ? "border-white/15 bg-brand-dark text-text-on-dark [color-scheme:dark]"
      : "border-border-soft bg-cream-card text-text-dark [color-scheme:light]"
  }`;

  return (
    <div
      className={`rounded-lg p-7 shadow-card sm:p-9 ${
        isDark ? "bg-brand-dark-alt" : "bg-cream-card"
      }`}
    >
      <h3 className={`font-display text-xl ${labelClass}`}>{title}</h3>
      {subtitle && (
        <p className={`mt-2 text-sm ${isDark ? "text-text-on-dark-muted" : "text-text-muted"}`}>
          {subtitle}
        </p>
      )}

      {status === "success" ? (
        <p className="mt-7 rounded-md bg-warning-bg px-5 py-4 text-sm text-warning-text">
          ¡Listo! Se abrió WhatsApp con tu mensaje pre-armado — solo confirma el envío.
        </p>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div>
            <label className="sr-only" htmlFor={`${source}-name`}>
              {nameLabel}
            </label>
            <input
              id={`${source}-name`}
              name="name"
              type="text"
              placeholder={nameLabel}
              autoComplete="name"
              required
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${source}-phone`}>
              {phoneLabel}
            </label>
            <input
              id={`${source}-phone`}
              name="phone"
              type="tel"
              placeholder={phoneLabel}
              autoComplete="tel"
              inputMode="numeric"
              required
              className={inputClass}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${source}-lot`}>
              {lotLabel}
            </label>
            <div className="relative">
              <select
                id={`${source}-lot`}
                name="lot"
                defaultValue=""
                required
                className={selectClass}
              >
                <option value="" disabled>
                  {lotPlaceholder}
                </option>
                {content.lotOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs ${
                  isDark ? "text-text-on-dark-muted" : "text-text-muted"
                }`}
              >
                ▾
              </span>
            </div>
            {errors.lot && <p className="mt-1 text-xs text-red-600">{errors.lot}</p>}
          </div>

          {messageLabel && (
            <div>
              <label className="sr-only" htmlFor={`${source}-message`}>
                {messageLabel}
              </label>
              <textarea
                id={`${source}-message`}
                name="message"
                placeholder={messageLabel}
                rows={3}
                className={inputClass}
              />
            </div>
          )}

          <label
            className={`flex items-start gap-2.5 text-xs leading-relaxed ${
              isDark ? "text-text-on-dark-muted" : "text-text-muted"
            }`}
          >
            <input type="checkbox" required className="mt-0.5" />
            <span>{consentText}</span>
          </label>

          {errors.general && <p className="text-xs text-red-600">{errors.general}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
          >
            {status === "submitting" ? "Enviando…" : submitLabel}
          </button>

          {disclaimer && (
            <p className={`text-center text-xs ${isDark ? "text-text-on-dark-muted" : "text-text-muted"}`}>
              {disclaimer}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
