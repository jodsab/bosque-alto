"use client";

import { useState } from "react";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";

interface FinancingRow {
  downPayment: number;
  term: number;
  total: number;
  monthly: number;
}

interface LotOption {
  id: string;
  label: string;
  price: number;
  financed: boolean;
  downPaymentOptions?: number[];
  defaultDownPayment?: number;
  financingTable?: FinancingRow[];
  unavailableMessage?: string;
}

const fmt = (n: number) => `S/ ${n.toLocaleString("es-PE")}`;
const fmtCents = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CreditSimulator() {
  const { simulator } = content.facilidadesPago;
  const lotOptions = simulator.lotOptions as LotOption[];
  const defaultLot = lotOptions.find((o) => o.financed) ?? lotOptions[0];

  const [lotId, setLotId] = useState(defaultLot.id);
  const lot = lotOptions.find((o) => o.id === lotId) ?? defaultLot;

  const downPaymentOptions = lot.downPaymentOptions ?? [];
  const [downPayment, setDownPayment] = useState(lot.defaultDownPayment ?? downPaymentOptions[0] ?? 0);
  const [term, setTerm] = useState(simulator.termOptions[1] ?? simulator.termOptions[0]);

  const handleLotChange = (id: string) => {
    const next = lotOptions.find((o) => o.id === id) ?? defaultLot;
    setLotId(id);
    if (next.financed) {
      setDownPayment(next.defaultDownPayment ?? next.downPaymentOptions?.[0] ?? 0);
    }
  };

  const row = lot.financingTable?.find((r) => r.downPayment === downPayment && r.term === term);
  const minDown = downPaymentOptions.length ? Math.min(...downPaymentOptions) : 0;
  const maxDown = downPaymentOptions.length ? Math.max(...downPaymentOptions) : 0;

  const whatsappMessage = lot.financed
    ? [
        "Hola, quiero validar esta cuota con un asesor:",
        `Lote: ${lot.label} — ${fmt(lot.price)}`,
        `Cuota inicial: ${fmt(downPayment)}`,
        `Plazo: ${term} meses`,
        row ? `Cuota mensual estimada: ${fmtCents(row.monthly)}` : null,
        row ? `Precio total financiado: ${fmt(row.total)}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : `Hola, quiero información sobre el lote de ${lot.label} (${fmt(lot.price)}).`;

  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-on-dark-muted">{simulator.title}</p>

      <div className="mt-5">
        <label htmlFor="sim-lot" className="text-sm font-semibold text-text-on-dark">
          {simulator.lotLabel}
        </label>
        <select
          id="sim-lot"
          value={lotId}
          onChange={(e) => handleLotChange(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-white/15 bg-brand-dark px-4 py-3 text-sm text-text-on-dark [color-scheme:dark]"
        >
          {lotOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label} — {fmt(opt.price)}
            </option>
          ))}
        </select>
      </div>

      {lot.financed ? (
        <>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="sim-down" className="text-sm font-semibold text-text-on-dark">
                {simulator.downPaymentLabel}
              </label>
              <span className="text-sm font-semibold text-accent-gold">{fmt(downPayment)}</span>
            </div>
            <input
              id="sim-down"
              type="range"
              min={minDown}
              max={maxDown}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="mt-3 w-full accent-accent-gold"
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-text-on-dark">{simulator.termLabel}</p>
            <div className="mt-1.5 flex gap-2">
              {simulator.termOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTerm(t)}
                  className={`flex-1 rounded-md border px-2 py-2 text-sm font-semibold transition ${
                    term === t
                      ? "border-accent-gold bg-accent-gold text-brand-dark"
                      : "border-white/15 text-text-on-dark hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-on-dark-muted">
              {simulator.monthlyLabel}
            </p>
            <p className="font-display text-4xl text-accent-gold">{row ? fmtCents(row.monthly) : "—"}</p>
            {row && (
              <p className="mt-1 text-xs text-text-on-dark-muted">
                {simulator.duringLabel.replace("{months}", String(term))}{" "}
                {simulator.balanceLabel.replace("{balance}", fmt(row.total - downPayment))}
              </p>
            )}
          </div>

          <p className="mt-3 text-xs text-text-on-dark-muted">{simulator.disclaimer}</p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-4 w-full px-5 py-2.5"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            {simulator.cta}
          </a>
        </>
      ) : (
        <>
          <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-text-on-dark-muted">
            {lot.unavailableMessage}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-4 w-full px-5 py-2.5"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            {simulator.unavailableCta}
          </a>
        </>
      )}
    </div>
  );
}