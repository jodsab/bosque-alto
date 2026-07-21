import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

const GALLERY_KEYS = [
  "amenidadPiscina",
  "amenidadJuegos",
  "amenidadParrillas",
  "porticoIngreso",
  "huertoFresas",
  "huertoMandarinas",
  "huertoPapayas",
] as const;

export default function AmenidadesSection() {
  const { amenidades } = content;

  return (
    <section className="bg-brand-dark py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl text-text-on-dark sm:text-4xl">{amenidades.title}</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenidades.featured.map((f) => (
            <div key={f.title} className="rounded-md border border-white/10 p-5">
              <p className="font-display text-lg text-accent-gold">{f.title}</p>
              <p className="mt-1 text-sm text-text-on-dark-muted">{f.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-text-on-dark">{amenidades.extraTitle}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-on-dark-muted">
            {amenidades.extra.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-text-on-dark-muted">{amenidades.footnote}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {amenidades.gallery.map((g, i) => (
            <figure key={g.imageAlt} className="overflow-hidden rounded-md">
              <div className="relative aspect-square">
                <ImageWithFallback
                  src={images[GALLERY_KEYS[i]]}
                  alt={g.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-1 text-center text-xs text-text-on-dark-muted">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
            {amenidades.orchard.eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl text-text-on-dark">{amenidades.orchard.title}</h3>
          <p className="mt-3 text-sm text-text-on-dark-muted">{amenidades.orchard.description}</p>
        </div>
      </div>
    </section>
  );
}
