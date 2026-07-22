"use client";

import { useMemo, useState } from "react";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";

export default function CreditSimulator() {
  const { simulator } = content.facilidadesPago;
  const defaultLot =
    simulator.lotOptions.find((o) => "default" in o && o.default) ?? simulator.lotOptions[0];

  const [price, setPrice] = useState(defaultLot.price);
  const [term, setTerm] = useState(simulator.termOptions[1]);

  const { downPayment, balance, monthly } = useMemo(() => {
    const dp = Math.round((price * simulator.downPaymentPercent) / 100);
    const bal = price - dp;
    return { downPayment: dp, balance: bal, monthly: Math.round(bal / term) };
  }, [price, term, simulator.downPaymentPercent]);

  const fmt = (n: number) => `S/${n.toLocaleString("es-PE")}`;

  return (
    <div className="rounded-lg bg-cream-card p-6 shadow-card sm:p-8">
      <h3 className="font-display text-xl text-brand-dark">{simulator.title}</h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {simulator.lotLabel}
          </label>
          <select
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-border-soft bg-white px-3 py-2 text-sm"
          >
            {simulator.lotOptions.map((opt) => (
              <option key={opt.label} value={opt.price}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {simulator.termLabel}
          </label>
          <div className="mt-1 flex gap-2">
            {simulator.termOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`flex-1 rounded-md border px-2 py-2 text-sm font-semibold transition ${
                  term === t
                    ? "border-brand-dark bg-brand-dark text-text-on-dark"
                    : "border-border-soft bg-white text-text-dark hover:bg-cream-bg"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-text-muted">
        {simulator.downPaymentLabel} <strong className="text-text-dark">{simulator.downPaymentPercent}%</strong> ·{" "}
        {fmt(downPayment)}
      </p>

      <div className="mt-5 rounded-md bg-cream-bg p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          {simulator.monthlyLabel}
        </p>
        <p className="font-display text-4xl text-brand-dark">
          {fmt(monthly)}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          {simulator.duringLabel.replace("{months}", String(term))}{" "}
          {simulator.balanceLabel.replace("{balance}", fmt(balance))}
        </p>
      </div>

      <p className="mt-3 text-xs text-text-muted">{simulator.disclaimer}</p>

      <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full px-5 py-2.5">
        {simulator.cta}
      </a>
    </div>
  );
}
