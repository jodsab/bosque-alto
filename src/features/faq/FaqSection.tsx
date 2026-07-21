import content from "@/shared/constants/content.json";
import { contact } from "@/shared/constants/theme.constants";
import FaqAccordion from "./FaqAccordion";

export default function FaqSection() {
  const { faq } = content;

  return (
    <section id="preguntas" className="bg-cream-bg py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">{faq.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{faq.title}</h2>
        <p className="mt-3 text-sm text-text-muted">{faq.description}</p>

        <FaqAccordion />

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-pill bg-brand-green px-5 py-2.5 text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover"
        >
          {faq.ctaWhatsapp}
        </a>
      </div>
    </section>
  );
}
