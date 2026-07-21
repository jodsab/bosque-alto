import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";

const DELIVERY_KEYS = ["entrega1", "entrega2", "entrega3", "entrega4", "clientesEnElCampo"] as const;

export default function TestimoniosSection() {
  const { testimonios } = content;

  return (
    <section className="bg-cream-bg py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">{testimonios.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{testimonios.title}</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80">
            <ImageWithFallback src={images.clientesEnLaDuna} alt={testimonios.hero.imageAlt} fill className="object-cover" />
            <p className="absolute bottom-3 left-3 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
              {testimonios.hero.caption}
            </p>
          </div>

          <blockquote className="rounded-lg bg-cream-card p-6 shadow-card sm:p-8">
            <p className="font-display text-lg italic text-text-dark">{testimonios.quote.text}</p>
            <footer className="mt-4 text-sm">
              <span className="font-semibold text-brand-dark">{testimonios.quote.author}</span>
              <span className="text-text-muted"> — {testimonios.quote.role}</span>
            </footer>
          </blockquote>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl text-brand-dark">
            {testimonios.deliveries.title}{" "}
            <span className="text-brand-green">{testimonios.deliveries.hashtag}</span>
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {testimonios.deliveries.gallery.map((g, i) => (
              <div key={g.imageAlt} className="relative aspect-square overflow-hidden rounded-md">
                <ImageWithFallback src={images[DELIVERY_KEYS[i]]} alt={g.imageAlt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-lg bg-brand-dark p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-xl text-text-on-dark">{testimonios.referral.title}</h3>
            <p className="mt-1 text-sm text-text-on-dark-muted">{testimonios.referral.description}</p>
          </div>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-pill bg-accent-gold px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:brightness-95"
          >
            {testimonios.referral.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
