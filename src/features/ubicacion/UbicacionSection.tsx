import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

export default function UbicacionSection() {
  const { ubicacion } = content;

  return (
    <section id="ubicacion" className="bg-cream-bg py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">{ubicacion.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{ubicacion.title}</h2>
        <p className="mt-3 text-sm text-text-muted sm:text-base">{ubicacion.description}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-cream-card shadow-card">
            <div className="relative h-56 w-full">
              <ImageWithFallback src={images.mapaHuacho} alt={ubicacion.project.imageAlt} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-brand-dark">{ubicacion.project.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-text-muted">
                {ubicacion.project.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-cream-card shadow-card">
            <div className="relative h-56 w-full">
              <ImageWithFallback src={images.mapaLince} alt={ubicacion.salesOffice.imageAlt} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-brand-dark">{ubicacion.salesOffice.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-text-muted">
                {ubicacion.salesOffice.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-brand-green px-5 py-2.5 text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover"
          >
            {ubicacion.ctaVisit}
          </a>
          <a
            href={ubicacion.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-border-soft px-5 py-2.5 text-sm font-semibold text-text-dark transition hover:bg-white"
          >
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
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">{ubicacion.tour360.eyebrow}</p>
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
                    <button
                      type="button"
                      className="rounded-pill bg-accent-gold px-4 py-2 text-sm font-semibold text-brand-dark"
                    >
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
