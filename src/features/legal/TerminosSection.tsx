import Link from "next/link";
import content from "@/shared/constants/content.json";

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TerminosSection() {
  const { terminos } = content;

  return (
    <section className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-3xl px-5">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted transition hover:text-brand-dark"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {terminos.backCta}
          </Link>
        </div>

        <p className="eyebrow mt-6">{terminos.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{terminos.title}</h1>

        <div className="mt-4 rounded-lg border border-border-soft bg-cream-card p-4 text-sm text-text-muted">
          <p className="font-semibold text-text-dark">{terminos.holder}</p>
          <p className="mt-1">{terminos.address}</p>
        </div>

        <div className="mt-10 space-y-8">
          {terminos.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg text-brand-dark">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}