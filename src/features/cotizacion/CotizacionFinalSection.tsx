import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import { images } from "@/shared/constants/images.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import LeadForm from "./LeadForm";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6a1 1 0 011 1v3.4a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.4a1 1 0 011 1c0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CotizacionFinalSection() {
  const { cotizacionFinal } = content;

  return (
    <section className="bg-brand-dark py-section-y">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow-on-dark">{cotizacionFinal.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-text-on-dark sm:text-4xl">
            {cotizacionFinal.title}
          </h2>
          <p className="mt-3 max-w-md text-sm text-text-on-dark-muted">
            {cotizacionFinal.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-text-on-dark-muted">
            {cotizacionFinal.contactList.map((line) => (
              <li key={line}>· {line}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-gold/40">
                <ImageWithFallback
                  src={images.luisArias}
                  alt={cotizacionFinal.salesManager.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-on-dark">{cotizacionFinal.salesManager.name}</p>
                <p className="text-xs text-text-on-dark-muted">{cotizacionFinal.salesManager.role}</p>
              </div>
            </div>
            <a
              href={`tel:+${contact.salesManagerPhone}`}
              className="btn-accent w-full gap-2 px-4 py-2.5 sm:ml-auto sm:w-auto"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {cotizacionFinal.ctaCall}
            </a>
          </div>
        </div>

        <LeadForm
          source="cotizacion-final"
          title={cotizacionFinal.form.title}
          nameLabel={cotizacionFinal.form.fields.name}
          phoneLabel={cotizacionFinal.form.fields.phone}
          lotLabel={cotizacionFinal.form.fields.lotSelect}
          lotPlaceholder={cotizacionFinal.form.fields.lotPlaceholder}
          messageLabel={cotizacionFinal.form.fields.message}
          consentText={cotizacionFinal.form.consent}
          submitLabel={cotizacionFinal.form.submit}
          variant="onDark"
        />
      </div>
    </section>
  );
}
