"use client";

import { useRef } from "react";
import content from "@/shared/constants/content.json";
import { useLibroReclamacionesForm } from "./useLibroReclamacionesForm";

const fieldClass =
  "w-full rounded-md border border-border-soft bg-cream-card px-4 py-3 text-sm text-text-dark outline-none transition focus:ring-2 focus:ring-brand-green";
const labelClass = "text-sm font-semibold text-text-dark";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function readFormState(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") ?? ""),
    lastName: String(data.get("lastName") ?? ""),
    documentId: String(data.get("documentId") ?? ""),
    phone: String(data.get("phone") ?? ""),
    email: String(data.get("email") ?? ""),
    address: String(data.get("address") ?? ""),
    guardian: String(data.get("guardian") ?? ""),
    goodType: String(data.get("goodType") ?? ""),
    claimedAmount: String(data.get("claimedAmount") ?? ""),
    goodDescription: String(data.get("goodDescription") ?? ""),
    claimType: String(data.get("claimType") ?? ""),
    detail: String(data.get("detail") ?? ""),
    request: String(data.get("request") ?? ""),
  };
}

export default function LibroReclamacionesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { form } = content.libroReclamaciones;
  const { status, errors, handleSubmit, revalidateLive } = useLibroReclamacionesForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formEl = formRef.current!;
    const result = await handleSubmit(e, () => readFormState(formEl));

    const fieldErrors = Object.keys(result).filter((key) => key !== "general");
    if (fieldErrors.length > 0) {
      const target = formEl.querySelector<HTMLElement>(`#${fieldErrors[0]}`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus();
    } else if (result.general) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onFormChange = () => {
    revalidateLive(readFormState(formRef.current!));
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border-soft bg-cream-card p-6 text-sm text-text-dark">
        <p className="font-semibold">¡Recibimos tu reclamo!</p>
        <p className="mt-2 text-text-muted">
          Te llegará una copia a tu correo. Te responderemos ahí mismo en un plazo no mayor a quince (15) días
          hábiles.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={onFormChange} className="space-y-8" noValidate>
      <div>
        <h2 className="font-display text-lg text-brand-dark">{form.consumerTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label={form.firstName} error={errors.firstName}>
            <input id="firstName" name="firstName" type="text" required className={fieldClass} />
          </Field>
          <Field id="lastName" label={form.lastName} error={errors.lastName}>
            <input id="lastName" name="lastName" type="text" required className={fieldClass} />
          </Field>
          <Field id="documentId" label={form.documentId} error={errors.documentId}>
            <input id="documentId" name="documentId" type="text" required className={fieldClass} />
          </Field>
          <Field id="phone" label={form.phone} error={errors.phone}>
            <input id="phone" name="phone" type="tel" inputMode="numeric" required className={fieldClass} />
          </Field>
          <Field id="email" label={form.email} error={errors.email}>
            <input id="email" name="email" type="email" required className={fieldClass} />
          </Field>
          <Field id="address" label={form.address} error={errors.address}>
            <input id="address" name="address" type="text" required className={fieldClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="guardian" label={form.guardian}>
              <input id="guardian" name="guardian" type="text" className={fieldClass} />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-brand-dark">{form.goodTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="goodType" label={form.goodType} error={errors.goodType}>
            <select id="goodType" name="goodType" defaultValue="" required className={fieldClass}>
              <option value="" disabled>
                {form.goodType}
              </option>
              {form.goodTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="claimedAmount" label={form.claimedAmount}>
            <input id="claimedAmount" name="claimedAmount" type="text" inputMode="decimal" className={fieldClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="goodDescription" label={form.goodDescription} error={errors.goodDescription}>
              <textarea id="goodDescription" name="goodDescription" rows={2} required className={fieldClass} />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg text-brand-dark">{form.detailTitle}</h2>
        <div className="mt-4 space-y-4">
          <Field id="claimType" label={form.claimType} error={errors.claimType}>
            <select id="claimType" name="claimType" defaultValue="" required className={fieldClass}>
              <option value="" disabled>
                {form.claimType}
              </option>
              {form.claimTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="detail" label={form.detail} error={errors.detail}>
            <textarea id="detail" name="detail" rows={4} required className={fieldClass} />
          </Field>
          <Field id="request" label={form.request} error={errors.request}>
            <textarea id="request" name="request" rows={3} required className={fieldClass} />
          </Field>
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-text-muted">
        <input type="checkbox" required className="mt-0.5" />
        <span>{form.consent}</span>
      </label>

      {errors.general && <p className="text-xs text-red-600">{errors.general}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Enviando…" : form.submit}
      </button>
    </form>
  );
}