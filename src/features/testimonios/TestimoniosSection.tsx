import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";

const DELIVERY_KEYS = ["clienteF1", "clienteF2", "clienteF3", "clienteF4", "clienteF5", "clienteF8"] as const;

export default function TestimoniosSection() {
  const { testimonios } = content;

  return (
    <section className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{testimonios.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{testimonios.title}</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="group relative h-64 overflow-hidden rounded-lg sm:h-80">
            <ImageWithFallback
              src={images.clientesEnLaDuna}
              alt={testimonios.hero.imageAlt}
              fill
              className="object-cover object-[center_calc(50%_+_80px)] transition duration-500 group-hover:scale-105"
            />
            <p className="absolute bottom-3 left-3 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
              {testimonios.hero.caption}
            </p>
          </div>

          <blockquote className="card p-6 sm:p-8">
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
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {testimonios.deliveries.gallery.map((g, i) => (
              <div key={g.imageAlt} className="group relative aspect-square overflow-hidden rounded-md">
                <ImageWithFallback
                  src={images[DELIVERY_KEYS[i]]}
                  alt={g.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-lg bg-brand-dark p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-xl text-text-on-dark">{testimonios.referral.title}</h3>
            <p className="mt-1 text-sm text-text-on-dark-muted">{testimonios.referral.description}</p>
          </div>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-accent shrink-0 px-5 py-2.5">
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            {testimonios.referral.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
