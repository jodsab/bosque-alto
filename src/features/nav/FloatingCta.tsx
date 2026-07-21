"use client";

import content from "@/shared/constants/content.json";

interface Props {
  whatsappHref: string;
  phoneHref: string;
}

export default function FloatingCta({ whatsappHref, phoneHref }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex md:hidden">
      <a
        href={phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-brand-dark py-3 text-sm font-semibold text-text-on-dark"
      >
        {content.floatingCta.call}
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-brand-green py-3 text-sm font-semibold text-text-on-dark shadow-floating-cta"
      >
        {content.floatingCta.whatsapp}
      </a>
    </div>
  );
}
