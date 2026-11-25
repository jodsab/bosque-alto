"use client";

import { useRef, useState } from "react";
import content from "@/shared/constants/content.json";
import { trackMetaEvent } from "@/shared/lib/metaPixel";
import { contact } from "@/shared/constants/theme.constants";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import { getFinancingTotals } from "@/shared/lib/financing";

type LotOption = (typeof content.lotes.items)[number];
type Term = (typeof content.facilidadesPago.simulator.termOptions)[number];

const fmt = (n: number) => `S/ ${n.toLocaleString("es-PE")}`;
const fmtCents = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CreditSimulator() {
  const { simulator } = content.facilidadesPago;
  const lotOptions = content.lotes.items;
  const [lotId, setLotId] = useState<LotOption["id"]>(lotOptions[0].id);
  const lot = lotOptions.find((option) => option.id === lotId) ?? lotOptions[0];
  const [downPayment, setDownPayment] = useState(lot.financingOptions[0].downPayment);
  const [term, setTerm] = useState<Term>(simulator.termOptions[0]);

  const usedRef = useRef(false);
  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackMetaEvent("SimuladorDeCredito", { origen: "Simulador de crédito" });
  };

  const handleLotChange = (id: string) => {
    markUsed();
    const next = lotOptions.find((option) => option.id === id) ?? lotOptions[0];
    setLotId(next.id);
    setDownPayment(next.financingOptions[0].downPayment);
  };

  const financing = lot.financingOptions.find((option) => option.downPayment === downPayment) ?? lot.financingOptions[0];
  const installment = financing.installments.find((option) => option.term === term);
  const totals = getFinancingTotals(financing, term);
  const whatsappMessage = [
    "Hola, quiero validar esta cuota con un asesor:",
    `Lote: ${lot.size}`,
    `Precio al contado: ${fmt(lot.cashPrice)}`,
    totals ? `Precio al crédito (${term} cuotas): ${fmtCents(totals.totalToPay)}` : null,
    `Cuota inicial: ${fmt(financing.downPayment)}`,
    `Plazo: ${term} cuotas`,
    installment ? `Cuota mensual: ${fmtCents(installment.monthly)}` : null,
    totals ? `Interés estimado: ${fmtCents(totals.interest)}` : null,
  ]
    .filter(Boolean)
    .join("\n");
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
          onChange={(event) => handleLotChange(event.target.value)}
          className="mt-1.5 w-full rounded-md border border-white/15 bg-brand-dark px-4 py-3 text-sm text-text-on-dark [color-scheme:dark]"
        >
          {lotOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.size} — {fmt(option.cashPrice)} al contado
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-text-on-dark">{simulator.downPaymentLabel}</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {lot.financingOptions.map((option) => (
            <button
              key={option.downPayment}
              type="button"
              aria-pressed={financing.downPayment === option.downPayment}
              onClick={() => {
                markUsed();
                setDownPayment(option.downPayment);
              }}
              className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                financing.downPayment === option.downPayment
                  ? "border-accent-gold bg-accent-gold text-brand-dark"
                  : "border-white/15 text-text-on-dark hover:bg-white/10"
              }`}
            >
              {fmt(option.downPayment)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-text-on-dark">{simulator.termLabel}</p>
        <div className="mt-1.5 flex gap-2">
          {simulator.termOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={term === option}
              onClick={() => {
                markUsed();
                setTerm(option);
              }}
              className={`flex-1 rounded-md border px-2 py-2 text-sm font-semibold transition ${
                term === option
                  ? "border-accent-gold bg-accent-gold text-brand-dark"
                  : "border-white/15 text-text-on-dark hover:bg-white/10"
              }`}
            >
              {option} cuotas
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-on-dark-muted">
          {simulator.creditPriceLabel.replace("{term}", String(term))}
        </p>
        <p className="font-display text-3xl text-accent-gold">
          {totals ? fmtCents(totals.totalToPay) : "—"}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-on-dark-muted">
          {simulator.monthlyLabel}
        </p>
        <p className="font-display text-4xl text-accent-gold">
          {installment ? fmtCents(installment.monthly) : "—"}
        </p>
        <p className="mt-1 text-xs text-text-on-dark-muted">{simulator.duringLabel.replace("{months}", String(term))}</p>
        {totals && (
          <p className="mt-2 text-xs text-text-on-dark-muted">
            {simulator.interestLabel}: {fmtCents(totals.interest)}
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-text-on-dark-muted">{simulator.disclaimer}</p>

      <a
        href={whatsappUrl}
        data-track="Simulador de crédito"
        data-track-lote={lot.size}
        data-track-cuota_inicial={financing.downPayment}
        data-track-plazo_meses={term}
        data-track-cuota_mensual={installment?.monthly}
        data-track-total_credito={totals?.totalToPay}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-accent mt-4 w-full px-5 py-2.5"
      >
        <WhatsAppIcon className="h-4 w-4 shrink-0" />
        {simulator.cta}
      </a>
    </div>
  );
}
