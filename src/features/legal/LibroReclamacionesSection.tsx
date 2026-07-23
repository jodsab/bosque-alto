import Link from "next/link";
import content from "@/shared/constants/content.json";
import LibroReclamacionesForm from "./LibroReclamacionesForm";

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LibroReclamacionesSection() {
  const { libroReclamaciones } = content;

  return (
    <section className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-3xl px-5">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted transition hover:text-brand-dark"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {libroReclamaciones.backCta}
          </Link>
        </div>

        <p className="eyebrow mt-6">{libroReclamaciones.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{libroReclamaciones.title}</h1>
        <p className="mt-3 text-sm text-text-muted">{libroReclamaciones.intro}</p>

        <div className="mt-4 rounded-lg border border-border-soft bg-cream-card p-4 text-sm text-text-muted">
          <p className="font-semibold text-text-dark">{libroReclamaciones.holder}</p>
          <p className="mt-1">{libroReclamaciones.address}</p>
        </div>

        <p className="mt-4 text-xs italic text-text-muted">{libroReclamaciones.responseNote}</p>

        <div className="mt-10">
          <LibroReclamacionesForm />
        </div>
      </div>
    </section>
  );
}