import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function UbicacionSection() {
  const { ubicacion } = content;

  return (
    <section id="ubicacion" className="bg-cream-bg py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{ubicacion.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{ubicacion.title}</h2>
        <p className="mt-3 text-sm text-text-muted sm:text-base">{ubicacion.description}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card flex flex-col overflow-hidden">
            <a
              href={ubicacion.project.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ubicacion.project.mapCta}
              className="group relative block h-56 w-full overflow-hidden"
            >
              <ImageWithFallback
                src={images.mapaHuacho}
                alt={ubicacion.project.imageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-dark/0 transition group-hover:bg-brand-dark/10" />
            </a>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg text-brand-dark">{ubicacion.project.title}</h3>
              <ul className="mb-6 mt-3 space-y-1 text-sm text-text-muted">
                {ubicacion.project.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <a
                href={ubicacion.project.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps mt-auto w-full px-4 py-2.5"
              >
                <MapPinIcon className="h-4 w-4 shrink-0" />
                {ubicacion.project.mapCta}
              </a>
            </div>
          </div>

          <div className="card flex flex-col overflow-hidden">
            <a
              href={ubicacion.salesOffice.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ubicacion.salesOffice.mapCta}
              className="group relative block h-56 w-full overflow-hidden"
            >
              <ImageWithFallback
                src={images.mapaLince}
                alt={ubicacion.salesOffice.imageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-dark/0 transition group-hover:bg-brand-dark/10" />
            </a>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg text-brand-dark">{ubicacion.salesOffice.title}</h3>
              <ul className="mb-6 mt-3 space-y-1 text-sm text-text-muted">
                {ubicacion.salesOffice.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <a
                href={ubicacion.salesOffice.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps mt-auto w-full px-4 py-2.5"
              >
                <MapPinIcon className="h-4 w-4 shrink-0" />
                {ubicacion.salesOffice.mapCta}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
            {ubicacion.ctaVisit}
          </a>
          <a href={ubicacion.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-5 py-2.5">
            {ubicacion.ctaDirections}
          </a>
        </div>

        <p className="mt-3 text-xs text-text-muted">
          {ubicacion.mapAttribution}{" "}
          <a href={ubicacion.mapAttributionUrl} target="_blank" rel="noopener noreferrer" className="underline">
            OpenStreetMap
          </a>
        </p>

        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-lg sm:h-96">
          <ImageWithFallback src={images.vistaAerea} alt={ubicacion.aerial.imageAlt} fill className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent p-5">
            <p className="text-sm text-text-on-dark">{ubicacion.aerial.caption}</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="eyebrow">{ubicacion.tour360.eyebrow}</p>
          <h3 className="mt-2 font-display text-2xl text-brand-dark">{ubicacion.tour360.title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">{ubicacion.tour360.description}</p>
          <p className="mt-1 text-xs italic text-text-muted">{ubicacion.tour360.disclaimer}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {ubicacion.tour360.items.map((item, i) => (
              <div key={item.imageAlt} className="group relative overflow-hidden rounded-lg">
                <div className="relative h-56 w-full">
                  <ImageWithFallback
                    src={i === 0 ? images.recorrido360 : images.videoRecorrido3d}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-dark/40">
                    <span className="rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
                      {item.caption}
                    </span>
                    <button type="button" className="btn-accent px-4 py-2">
                      {item.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted">{ubicacion.tour360.footnote}</p>
        </div>
      </div>
    </section>
  );
}
