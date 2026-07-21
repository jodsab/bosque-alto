import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

export default function SiteFooter() {
  const { footer } = content;

  return (
    <footer className="bg-brand-dark-alt pb-20 pt-10 sm:pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <ImageWithFallback
            src={images.logoProyecta}
            alt={footer.logoAlt}
            width={160}
            height={48}
            className="h-10 w-auto"
          />

          <nav className="flex flex-wrap gap-4 text-sm text-text-on-dark-muted">
            {footer.socials.map((s) => (
              <a
                key={s.network}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition hover:text-text-on-dark"
              >
                {s.network}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>{footer.legalLine1}</p>
            <p>{footer.legalLine2}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href={footer.complaintsBook.href} className="underline">
              {footer.complaintsBook.label}
              <span className="ml-1 text-text-on-dark-muted/70">({footer.complaintsBook.detail})</span>
            </a>
            {footer.links.map((l) => (
              <a key={l.href} href={l.href} className="underline">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-text-on-dark-muted/70">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
