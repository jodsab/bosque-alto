"use client";

import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-soft/40 bg-brand-dark/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#hero" className="flex items-center gap-2">
          <ImageWithFallback
            src={images.isotipo}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <span className="font-display text-lg text-text-on-dark">
            {content.brand.name} <strong className="text-accent-gold">{content.brand.suffix}</strong>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-on-dark-muted transition hover:text-text-on-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-pill bg-brand-green px-4 py-2 text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover sm:inline-block"
        >
          {content.nav.ctaWhatsapp}
        </a>
      </div>
    </header>
  );
}
