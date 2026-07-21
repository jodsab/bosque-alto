import { images, ImageKey } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import content from "@/shared/constants/content.json";

interface LoteCardProps {
  item: (typeof content.lotes.items)[number];
  imageKey?: ImageKey;
}

export default function LoteCard({ item, imageKey }: LoteCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-cream-card shadow-card transition hover:shadow-card-hover">
      {imageKey && (
        <div className="relative h-44 w-full">
          <ImageWithFallback
            src={images[imageKey]}
            alt={item.imageAlt ?? ""}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
            {content.lotes.renderCaption}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">{item.size}</p>
        {item.price ? (
          <>
            <p className="font-display text-3xl text-brand-dark">{item.price}</p>
            <p className="text-xs text-text-muted">{content.lotes.priceCaption}</p>
          </>
        ) : (
          <p className="mt-1 text-sm text-warning-text">{item.note}</p>
        )}

        <div className="mt-3 flex items-baseline gap-2 border-t border-border-soft pt-3 text-sm">
          <span className="font-semibold text-text-dark">{item.dimensions}</span>
          <span className="text-text-muted">{item.pricePerM2}</span>
        </div>

        {item.note && item.price && (
          <p className="mt-2 text-xs text-warning-text">{item.note}</p>
        )}

        {item.badge && (
          <p className="mt-2 inline-block w-fit rounded-pill bg-warning-bg px-3 py-1 text-xs font-medium text-warning-text">
            {item.badge}
          </p>
        )}

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-pill bg-brand-green px-4 py-2 text-center text-sm font-semibold text-text-on-dark transition hover:bg-brand-green-hover"
        >
          {item.cta}
        </a>
      </div>
    </article>
  );
}
