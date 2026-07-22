import content from "@/shared/constants/content.json";

interface PlusvaliaFact {
  value: string;
  unit: string;
  title: string;
  detail: string;
  sourceLabel?: string;
  sourceUrl?: string;
  note?: string;
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6M9 16.5h6M9 9.5h2" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlusvaliaSection() {
  const { plusvalia } = content;

  return (
    <section id="plusvalia" className="bg-cream-bg py-0 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{plusvalia.eyebrow}</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl text-brand-dark sm:text-4xl">{plusvalia.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{plusvalia.description}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {(plusvalia.facts as PlusvaliaFact[]).map((fact) => (
            <div key={fact.title} className="card p-6">
              <p className="font-display text-2xl text-accent-gold">
                {fact.value}
                {fact.unit && <span className="ml-1 text-sm text-text-muted">{fact.unit}</span>}
              </p>
              <h3 className="mt-2 font-semibold text-text-dark">{fact.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{fact.detail}</p>
              {fact.note && <p className="mt-2 text-xs text-warning-text">{fact.note}</p>}
              {fact.sourceUrl && (
                <a
                  href={fact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-semibold text-brand-green underline"
                >
                  {fact.sourceLabel}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl bg-brand-dark p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-gold/10 blur-3xl" aria-hidden />

          <div className="relative">
            <h3 className="font-display text-2xl text-text-on-dark sm:text-3xl">{plusvalia.caveat.title}</h3>
            <p className="mt-2 font-display text-lg text-brand-green sm:text-xl">{plusvalia.caveat.highlight}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
              {plusvalia.caveat.description}
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-on-dark-muted">
                {plusvalia.caveat.referencesLabel}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {plusvalia.caveat.references.map((ref) => (
                  <a
                    key={ref.label}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-5 transition hover:border-accent-gold/40 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-gold/10 text-accent-gold">
                        <DocumentIcon className="h-5 w-5" />
                      </span>
                      <span className="flex items-center gap-1 rounded-pill bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-text-on-dark-muted transition group-hover:bg-accent-gold/20 group-hover:text-accent-gold">
                        PDF
                        <ExternalLinkIcon className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-on-dark">{ref.label}</p>
                      <p className="mt-1 text-xs text-text-on-dark-muted">{ref.detail}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
