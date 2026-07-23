import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import FaqAccordion from "./FaqAccordion";

export default function FaqSection() {
  const { faq } = content;

  return (
    <section id="preguntas" className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow">{faq.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{faq.title}</h2>
        <p className="mt-3 text-sm text-text-muted">{faq.description}</p>

        <FaqAccordion />

        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 px-5 py-2.5">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {faq.ctaWhatsapp}
        </a>
      </div>
    </section>
  );
}
