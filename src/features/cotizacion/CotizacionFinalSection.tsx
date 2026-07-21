import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import LeadForm from "./LeadForm";

export default function CotizacionFinalSection() {
  const { cotizacionFinal } = content;

  return (
    <section className="bg-brand-dark py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
            {cotizacionFinal.eyebrow}
          </p>
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

          <a
            href={`tel:+${contact.whatsappNumber}`}
            className="mt-6 inline-block rounded-pill border border-white/25 px-5 py-2.5 text-sm font-semibold text-text-on-dark transition hover:bg-white/10"
          >
            {cotizacionFinal.ctaCall}
          </a>
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
