"use client";

import { useState } from "react";
import { images, ImageKey } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import Lightbox from "@/shared/components/Lightbox";
import content from "@/shared/constants/content.json";

interface LoteCardProps {
  item: (typeof content.lotes.items)[number];
  imageKey?: ImageKey;
}

export default function LoteCard({ item, imageKey }: LoteCardProps) {
  const [downPayment, setDownPayment] = useState(item.financingOptions[0].downPayment);
  const selectedFinancing = item.financingOptions.find((option) => option.downPayment === downPayment) ?? item.financingOptions[0];
  const formatMoney = (amount: number, decimals = 0) =>
    `S/ ${amount.toLocaleString("es-PE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  const whatsappMessage = [
    `Hola, quiero información sobre el lote de ${item.size}.`,
    `Precio al contado: ${formatMoney(item.cashPrice)}`,
    `Precio al crédito: ${formatMoney(item.creditPrice)}`,
    `Cuota inicial: ${formatMoney(selectedFinancing.downPayment)}`,
    `Saldo: ${formatMoney(selectedFinancing.balance)}`,
    ...selectedFinancing.installments.map(({ term, monthly }) => `${term} meses: ${formatMoney(monthly, 2)} al mes`),
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
            <p className="text-xs text-text-muted">{content.lotes.creditPriceCaption}</p>
            <p className="font-display text-2xl text-brand-dark">{formatMoney(item.creditPrice)}</p>
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
          <p className="mt-2 text-xs text-text-muted">
            {content.lotes.balanceCaption}: <span className="font-semibold text-text-dark">{formatMoney(selectedFinancing.balance)}</span>
          </p>
          <dl className="mt-2 grid grid-cols-3 gap-2">
            {selectedFinancing.installments.map(({ term, monthly }) => (
              <div key={term} className="rounded-md bg-cream-bg p-2 text-center">
                <dt className="text-xs text-text-muted">{term} {content.lotes.termCaption}</dt>
                <dd className="text-sm font-semibold text-brand-dark">{formatMoney(monthly, 2)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a href={whatsappUrl} data-track="Tarjeta de lote" data-track-lote={item.size} data-track-cuota_inicial={selectedFinancing.downPayment} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 px-4 py-2">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {item.cta}
        </a>
      </div>
    </article>
  );
}
