"use client";

import { useMemo, useState } from "react";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";

const DATA: Record<string, { price?: string; pricePerM2: string; dimensions: string }> = {
  "100 m²": { price: "S/7,500", pricePerM2: "S/ 75.00 por m²", dimensions: "10.0 × 10.0 m" },
  "180 m²": { price: "S/12,500", pricePerM2: "S/ 69.44 por m²", dimensions: "13.4 × 13.4 m" },
  "200 m²": { price: "S/14,999", pricePerM2: "S/ 75.00 por m²", dimensions: "14.1 × 14.1 m" },
  "250 m²": { price: "S/21,500", pricePerM2: "S/ 86.00 por m²", dimensions: "15.8 × 15.8 m" },
  "1,000 m²": { price: "S/75,000", pricePerM2: "S/ 75.00 por m²", dimensions: "31.6 × 31.6 m" },
};

const MAX_SIDE = 31.6;

export default function Comparator() {
  const { comparator } = content.lotes;
  const [selected, setSelected] = useState("200 m²");
  const data = DATA[selected];

  const scalePercent = useMemo(() => {
    const side = parseFloat(data.dimensions.split(" ×")[0]);
    return Math.max(6, (side / MAX_SIDE) * 100);
  }, [data]);

  return (
    <div className="grid gap-8 rounded-lg bg-cream-card p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">{comparator.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl text-brand-dark sm:text-3xl">{comparator.title}</h3>
        <p className="mt-3 text-sm text-text-muted">{comparator.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {comparator.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelected(size)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition ${
                selected === size
                  ? "bg-brand-dark text-text-on-dark"
                  : "bg-cream-bg text-text-dark hover:bg-border-soft"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-text-muted">{comparator.priceLabel}</dt>
            <dd className="font-display text-xl text-brand-dark">{data.price ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-text-muted">{comparator.priceM2Label}</dt>
            <dd className="font-semibold text-text-dark">{data.pricePerM2}</dd>
          </div>
          <div>
            <dt className="text-text-muted">{comparator.dimensionsLabel}</dt>
            <dd className="font-semibold text-text-dark">{data.dimensions}</dd>
          </div>
          <div>
            <dt className="text-text-muted">{comparator.equivalentLabel}</dt>
            <dd className="font-semibold text-text-dark">{comparator.equivalentValue}</dd>
          </div>
        </dl>

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-pill bg-brand-green px-5 py-2.5 text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover"
        >
          {comparator.ctaTemplate.replace("{size}", selected)}
        </a>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md bg-brand-dark p-6">
        <div
          className="relative border-2 border-dashed border-accent-gold/60 transition-all duration-300"
          style={{
            width: `${scalePercent}%`,
            aspectRatio: "1 / 1",
            maxWidth: "260px",
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-center text-xs font-semibold text-accent-gold">
            {selected}
          </span>
        </div>
        <p className="mt-6 text-center text-xs text-text-on-dark-muted">{comparator.gridNote}</p>
        <p className="mt-1 text-center text-xs text-text-on-dark-muted">{comparator.carScaleLabel}</p>
      </div>
    </div>
  );
}
