import content from "@/shared/constants/content.json";
import CreditSimulator from "./CreditSimulator";

export default function FacilidadesPagoSection() {
  const { facilidadesPago } = content;

  return (
    <section id="pagar" className="bg-brand-dark py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
          {facilidadesPago.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl text-text-on-dark sm:text-4xl">
          {facilidadesPago.title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <ol className="space-y-6">
            {facilidadesPago.steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-gold font-display text-sm font-semibold text-brand-dark">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold text-text-on-dark">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-on-dark-muted">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <CreditSimulator />
        </div>
      </div>
    </section>
  );
}
