"use client";

import Link from "next/link";
import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";

export default function SiteHeader() {
  const [brandFirst, ...brandRest] = content.brand.name.split(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-dark/95 shadow-[0_2px_12px_rgba(0,0,0,0.15)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <ImageWithFallback
            src={images.isotipo}
            alt=""
            width={100}
            height={100}
            className="h-10 w-10 rounded-full ring-2 ring-white/10 transition group-hover:ring-accent-gold/50"
          />
          <span className="font-display leading-tight text-text-on-dark">
            <span className="block text-sm">{brandFirst}</span>
            <span className="block text-sm">{brandRest.join(" ")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              className="relative pb-1 text-sm font-medium text-text-on-dark-muted transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-gold after:transition-transform after:duration-300 after:content-[''] hover:text-text-on-dark hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden px-4 py-2 sm:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {content.nav.ctaWhatsapp}
        </a>
      </div>
    </header>
  );
}
