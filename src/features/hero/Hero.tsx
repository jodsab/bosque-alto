import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import LeadForm from "@/features/cotizacion/LeadForm";

export default function Hero() {
  const { hero } = content;

  return (
    <section id="hero" className="relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={images.heroBackground}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pb-24 lg:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-text-on-dark sm:text-5xl lg:text-6xl">
            {hero.titlePrefix}
            <em className="text-accent-gold not-italic">{hero.titleEmphasis}</em>
            {hero.titleSuffix}
          </h1>
          <p className="mt-5 max-w-xl text-base text-text-on-dark-muted sm:text-lg">
            {hero.description}
          </p>

          <ul className="mt-6 space-y-2">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-sm text-text-on-dark sm:text-base">
                <span className="text-accent-gold">✓</span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-brand-green px-6 py-3 text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#lotes"
              className="rounded-pill border border-white/25 px-6 py-3 text-sm font-semibold text-text-on-dark transition hover:bg-white/10"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-4 text-xs text-text-on-dark-muted">
            {hero.phoneDisplay} · {hero.schedule}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl text-accent-gold">
                  {stat.value}
                  {stat.unit && <span className="ml-1 text-sm text-text-on-dark-muted">{stat.unit}</span>}
                </dt>
                <dd className="mt-1 text-xs text-text-on-dark-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:sticky lg:top-24">
          <LeadForm
            source="hero"
            title={hero.form.title}
            subtitle={hero.form.subtitle}
            nameLabel={hero.form.fields.name}
            phoneLabel={hero.form.fields.phone}
            lotLabel={hero.form.fields.lotSelect}
            lotPlaceholder={hero.form.fields.lotPlaceholder}
            consentText={hero.form.consent}
            submitLabel={hero.form.submit}
            disclaimer={hero.form.disclaimer}
            variant="onDark"
          />
        </div>
      </div>
    </section>
  );
}
