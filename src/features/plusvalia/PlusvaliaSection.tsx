import content from "@/shared/constants/content.json";

export default function PlusvaliaSection() {
  const { plusvalia } = content;

  return (
    <section id="plusvalia" className="bg-cream-bg py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">{plusvalia.eyebrow}</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl text-brand-dark sm:text-4xl">{plusvalia.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{plusvalia.description}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {plusvalia.facts.map((fact) => (
            <div key={fact.title} className="rounded-lg bg-cream-card p-6 shadow-card">
              <p className="font-display text-2xl text-accent-gold">
                {fact.value}
                {fact.unit && <span className="ml-1 text-sm text-text-muted">{fact.unit}</span>}
              </p>
              <h3 className="mt-2 font-semibold text-text-dark">{fact.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{fact.detail}</p>
              {"note" in fact && fact.note && (
                <p className="mt-2 text-xs text-warning-text">{fact.note}</p>
              )}
              {"sourceUrl" in fact && fact.sourceUrl && (
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

        <div className="mt-10 rounded-lg border border-warning-text/30 bg-warning-bg p-6">
          <h3 className="font-display text-xl text-warning-text">{plusvalia.caveat.title}</h3>
          <p className="mt-2 text-sm text-warning-text/90">{plusvalia.caveat.detail}</p>
          <p className="mt-3 text-sm font-semibold text-warning-text">{plusvalia.caveat.warning}</p>
          <a
            href={plusvalia.caveat.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-semibold text-warning-text underline"
          >
            {plusvalia.caveat.sourceLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
