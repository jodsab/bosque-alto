import content from "@/shared/constants/content.json";
import { ImageKey } from "@/shared/constants/images.constants";
import LoteCard from "./LoteCard";

const IMAGE_BY_ID: Record<string, ImageKey> = {
  "lote-200": "lote200",
  "lote-250": "lote250",
  "lote-500": "lote500",
  "lote-1000": "lote1000",
};

export default function LotesSection() {
  const { lotes } = content;

  return (
    <section id="lotes" className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{lotes.eyebrow}</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl text-brand-dark sm:text-4xl">{lotes.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{lotes.description}</p>

        <div className="mt-10 grid gap-16 sm:grid-cols-2 lg:grid-cols-2">
          {lotes.items.map((item) => (
            <LoteCard key={item.id} item={item} imageKey={IMAGE_BY_ID[item.id]} />
          ))}
        </div>

        {/*         <div className="mt-14">
          <Comparator />
        </div> */}
      </div>
    </section>
  );
}
