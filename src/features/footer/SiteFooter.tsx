import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.25 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 01-1.15 1.76c-.5.5-1.1.9-1.76 1.15-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.25-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.43 2.52c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.03.66-.31.32-.5.61-.66 1.03-.12.31-.26.78-.3 1.65C4.27 8.75 4.26 9.06 4.26 12s.01 3.25.06 4.3c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.03.32.31.61.5 1.03.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.03-.66.31-.32.5-.61.66-1.03.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.3s-.01-3.25-.06-4.3c-.04-.87-.18-1.34-.3-1.65a2.6 2.6 0 00-.66-1.03 2.6 2.6 0 00-1.03-.66c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.24a4.96 4.96 0 110 9.92 4.96 4.96 0 010-9.92zm0 1.8a3.16 3.16 0 100 6.32 3.16 3.16 0 000-6.32zm5.16-1.98a1.16 1.16 0 110 2.32 1.16 1.16 0 010-2.32z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82a4.4 4.4 0 01-1.02-2.82h-3.1v13.44a2.6 2.6 0 11-2.6-2.6c.19 0 .38.02.56.06V10.8a5.7 5.7 0 00-.56-.03 5.72 5.72 0 105.72 5.72V9.4a7.5 7.5 0 004.4 1.42V7.72a4.4 4.4 0 01-3.4-1.9z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
};

export default function SiteFooter() {
  const { footer } = content;

  return (
    <footer className="bg-brand-dark-alt pb-20 pt-10 sm:pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <ImageWithFallback
            src={images.logoProyecta}
            alt={footer.logoAlt}
            width={520}
            height={263}
            className="h-10 w-auto object-contain sm:h-12"
          />

          <nav className="flex flex-wrap gap-3">
            {footer.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.network];
              return (
                <a
                  key={s.network}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.network}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-text-on-dark transition hover:bg-accent-gold hover:text-brand-dark"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
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
