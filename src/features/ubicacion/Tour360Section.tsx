import content from "@/shared/constants/content.json";
import Tour360Card from "./Tour360Card";

export default function Tour360Section() {
  const { tour360 } = content.ubicacion;

  return (
    <section id="recorrido-360" className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{tour360.eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl text-brand-dark sm:text-3xl">{tour360.title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{tour360.description}</p>
        <p className="mt-1 text-xs italic text-text-muted">{tour360.disclaimer}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {tour360.items.map((item) => (
            <Tour360Card
              key={item.imageAlt}
              imageAlt={item.imageAlt}
              embedUrl={item.embedUrl}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-text-muted">{tour360.footnote}</p>
      </div>
    </section>
  );
}