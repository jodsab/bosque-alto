"use client";

import content from "@/shared/constants/content.json";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";

interface Props {
  whatsappHref: string;
  phoneHref: string;
}

export default function FloatingCta({ whatsappHref, phoneHref }: Props) {
  return (
    <>
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
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {content.floatingCta.whatsapp}
        </a>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.floatingCta.whatsapp}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-brand-green text-text-on-dark shadow-floating-cta transition hover:-translate-y-0.5 hover:bg-brand-green-hover md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
