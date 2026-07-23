import content from "@/shared/constants/content.json";
import { images } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import LeadForm from "@/features/cotizacion/LeadForm";
import SalesManagerCallCard from "@/features/cotizacion/SalesManagerCallCard";

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
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-brand-green/25" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow-on-dark">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-text-on-dark sm:text-5xl lg:text-6xl">
            {hero.titlePrefix}
            <em className="text-accent-gold not-italic">{hero.titleEmphasis}</em>
            {hero.titleSuffix}
            <em className="text-accent-gold not-italic">{hero.titleSuffixEmphasis}</em>
          </h1>
          <p className="mt-5 max-w-xl whitespace-pre-line text-base text-text-on-dark-muted sm:text-lg">
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

          <SalesManagerCallCard className="mt-6" />

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              {hero.ctaPrimary}
            </a>
            <a href="#lotes" className="btn-outline-dark">
              {hero.ctaSecondary}
            </a>
          </div>
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

      <div className="relative border-t border-white/10 bg-brand-dark-alt/90 backdrop-blur">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-3">
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
    </section>
  );
}
