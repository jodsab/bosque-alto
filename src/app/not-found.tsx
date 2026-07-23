import Link from "next/link";
import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import SiteHeader from "@/features/nav/SiteHeader";
import SiteFooter from "@/features/footer/SiteFooter";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";

export default function NotFound() {
  const { notFound } = content;
  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(notFound.whatsappMessage)}`;

  return (
    <div className="flex min-h-screen flex-col bg-brand-dark">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <div className="mx-auto max-w-xl px-5 py-14 text-center">
          <p className="font-display text-7xl text-accent-gold sm:text-8xl">404</p>
          <h1 className="mt-2 font-display text-2xl text-text-on-dark sm:text-3xl">{notFound.title}</h1>
          <p className="mt-4 text-sm text-text-on-dark-muted sm:text-base">{notFound.description}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary w-full px-5 py-2.5 sm:w-auto">
              {notFound.ctaHome}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full px-5 py-2.5 sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              {notFound.ctaWhatsapp}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}