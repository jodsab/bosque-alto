import content from "@/shared/constants/content.json";
import { images, ImageKey } from "@/shared/constants/images.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import Lightbox from "@/shared/components/Lightbox";

const RENDER_KEYS: ImageKey[] = ["amenidadPiscina", "amenidadJuegos", "amenidadParrillas", "amenidadCanchas"];
const ORCHARD_KEYS: ImageKey[] = ["huertoFresas", "huertoMandarinas", "huertoPapayas"];

/** Resalta en verde el primer número del título (p. ej. "5000" en "...más de 5000 árboles..."). */
function highlightNumber(title: string) {
  const match = title.match(/[\d][\d.,]*/);
  if (!match) return title;
  const num = match[0];
  const idx = title.indexOf(num);
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-brand-green">{num}</span>
      {title.slice(idx + num.length)}
    </>
  );
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path d="M12 3s7 7.2 7 11.5a7 7 0 11-14 0C5 10.2 12 3 12 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PoolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path d="M8 6v6a2 2 0 104 0V8a2 2 0 114 0v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15c1.4-1.3 2.9-1.3 4.3 0s2.9 1.3 4.3 0 2.9-1.3 4.3 0 2.9 1.3 4.3 0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 19c1.4-1.3 2.9-1.3 4.3 0s2.9 1.3 4.3 0 2.9-1.3 4.3 0 2.9 1.3 4.3 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 001 1h11a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20v-5a1 1 0 011-1h3a1 1 0 011 1v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.2 15 10.3l-1.15 3.5H10.15L9 10.3 12 8.2z" strokeLinejoin="round" />
      <path d="M12 3.5v4.7M5.3 8l3 1.2M18.7 8l-3 1.2M7 18.5l1.6-4M17 18.5l-1.6-4M9.6 20.5l.6-3M14.4 20.5l-.6-3" strokeLinecap="round" />
    </svg>
  );
}

const FEATURED_ICONS = [DropletIcon, PoolIcon, HomeIcon, BallIcon];

export default function AmenidadesSection() {
  const { amenidades } = content;
  const renderPhotos = amenidades.gallery.slice(0, 4);
  const orchardPhotos = amenidades.gallery.slice(4);

  return (
    <section id="amenidades" className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">{amenidades.title}</h2>

            <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {amenidades.featured.map((f, i) => {
                const Icon = FEATURED_ICONS[i % FEATURED_ICONS.length];
                return (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-text-dark">{f.title}</p>
                      <p className="mt-0.5 text-sm text-text-muted">{f.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{amenidades.extraTitle}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {amenidades.extra.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-border-soft bg-cream-card px-4 py-2 text-sm text-text-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-text-muted">{amenidades.footnote}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {renderPhotos.map((g, i) => (
              <Lightbox
                key={g.imageAlt}
                src={images[RENDER_KEYS[i]]}
                alt={g.imageAlt}
                className="group relative block aspect-square overflow-hidden rounded-lg"
              >
                <ImageWithFallback
                  src={images[RENDER_KEYS[i]]}
                  alt={g.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-2 left-2 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-on-dark">
                  {g.caption}
                </span>
              </Lightbox>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border-soft pt-10">
          <div className="grid overflow-hidden rounded-2xl lg:h-[520px] lg:grid-cols-2">
            <div className="grid grid-rows-3 lg:h-full">
              {orchardPhotos.map((g, i) => (
                <Lightbox
                  key={g.imageAlt}
                  src={images[ORCHARD_KEYS[i]]}
                  alt={g.imageAlt}
                  className="group relative block aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:h-full"
                >
                  <ImageWithFallback
                    src={images[ORCHARD_KEYS[i]]}
                    alt={g.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-on-dark">
                    {g.caption}
                  </span>
                </Lightbox>
              ))}
            </div>

            <div className="flex flex-col justify-center bg-brand-dark px-7 py-10 sm:px-10 lg:px-12">
              <p className="eyebrow-on-dark">{amenidades.orchard.eyebrow}</p>
              <h3 className="mt-4 font-display text-2xl text-text-on-dark sm:text-3xl">
                {highlightNumber(amenidades.orchard.title)}
              </h3>
              <p className="mt-4 max-w-md text-sm text-text-on-dark-muted sm:text-base">
                {amenidades.orchard.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}