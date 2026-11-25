"use client";

import { useState } from "react";
import { images, ImageKey } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import Lightbox from "@/shared/components/Lightbox";
import content from "@/shared/constants/content.json";
import { getFinancingTotals } from "@/shared/lib/financing";

type Term = (typeof content.facilidadesPago.simulator.termOptions)[number];

interface LoteCardProps {
  item: (typeof content.lotes.items)[number];
  imageKey?: ImageKey;
}

export default function LoteCard({ item, imageKey }: LoteCardProps) {
  const [downPayment, setDownPayment] = useState(item.financingOptions[0].downPayment);
  const [term, setTerm] = useState<Term>(12);
  const selectedFinancing = item.financingOptions.find((option) => option.downPayment === downPayment) ?? item.financingOptions[0];
  const installment = selectedFinancing.installments.find((option) => option.term === term);
  const totals = getFinancingTotals(selectedFinancing, term);
  const formatMoney = (amount: number, decimals = 0) =>
    `S/ ${amount.toLocaleString("es-PE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  const whatsappMessage = [
    `Hola, quiero información sobre el lote de ${item.size}.`,
    `Precio al contado: ${formatMoney(item.cashPrice)}`,
    totals ? `Precio al crédito (${term} cuotas): ${formatMoney(totals.totalToPay, 2)}` : null,
    `Cuota inicial: ${formatMoney(selectedFinancing.downPayment)}`,
    installment ? `Cuota mensual: ${formatMoney(installment.monthly, 2)}` : null,
  ].join("\n");
  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article className="card group flex flex-col overflow-hidden">
      {imageKey && (
        <Lightbox
          src={images[imageKey]}
          alt={item.imageAlt ?? ""}
          className="relative block h-64 w-full overflow-hidden"
        >
          <ImageWithFallback
            src={images[imageKey]}
            alt={item.imageAlt ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <span className="absolute bottom-2 left-2 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
            {content.lotes.renderCaption}
          </span>
        </Lightbox>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">{item.size}</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-text-muted">{content.lotes.cashPriceCaption}</p>
            <p className="font-display text-2xl text-brand-dark">{formatMoney(item.cashPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted">
              {content.lotes.creditPriceCaption.replace("{term}", String(term))}
            </p>
            <p className="font-display text-2xl text-brand-dark">
              {totals ? formatMoney(totals.totalToPay, 2) : "—"}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-border-soft pt-4">
          <p className="text-xs font-semibold text-text-dark">{content.lotes.financingCaption}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.financingOptions.map((option) => (
              <button
                key={option.downPayment}
                type="button"
                aria-pressed={downPayment === option.downPayment}
                onClick={() => setDownPayment(option.downPayment)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                  downPayment === option.downPayment
                    ? "border-brand-dark bg-brand-dark text-text-on-dark"
                    : "border-border-soft text-text-dark hover:bg-cream-bg"
                }`}
              >
                {formatMoney(option.downPayment)}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold text-text-dark">{content.lotes.termSelectionLabel}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {content.facilidadesPago.simulator.termOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={term === option}
                onClick={() => setTerm(option)}
                className={`rounded-md border px-2 py-2 text-sm font-semibold transition ${
                  term === option
                    ? "border-brand-dark bg-brand-dark text-text-on-dark"
                    : "border-border-soft text-text-dark hover:bg-cream-bg"
                }`}
              >
                {option} {content.lotes.termCaption}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted">
            {content.lotes.monthlyPaymentCaption}:{" "}
            <span className="font-semibold text-text-dark">
              {installment ? formatMoney(installment.monthly, 2) : "—"}
            </span>
          </p>
        </div>

        <a href={whatsappUrl} data-track="Tarjeta de lote" data-track-lote={item.size} data-track-cuota_inicial={selectedFinancing.downPayment} data-track-plazo_meses={term} data-track-cuota_mensual={installment?.monthly} data-track-total_credito={totals?.totalToPay} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 px-4 py-2">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {item.cta}
        </a>
      </div>
    </article>
  );
}
