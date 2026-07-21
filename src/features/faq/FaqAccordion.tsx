"use client";

import { useState } from "react";
import content from "@/shared/constants/content.json";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 divide-y divide-border-soft rounded-lg bg-cream-card shadow-card">
      {content.faq.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-text-dark">{item.question}</span>
              <span className="shrink-0 text-lg text-brand-green">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-text-muted">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
