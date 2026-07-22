import { images, ImageKey } from "@/shared/constants/images.constants";
import { contact } from "@/shared/constants/theme.constants";
import ImageWithFallback from "@/shared/components/ImageWithFallback";
import WhatsAppIcon from "@/shared/components/WhatsAppIcon";
import Lightbox from "@/shared/components/Lightbox";
import content from "@/shared/constants/content.json";

interface LoteCardProps {
  item: (typeof content.lotes.items)[number];
  imageKey?: ImageKey;
}

export default function LoteCard({ item, imageKey }: LoteCardProps) {
  return (
    <article className="card group flex flex-col overflow-hidden">
      {imageKey && (
        <Lightbox
          src={images[imageKey]}
          alt={item.imageAlt ?? ""}
          className="relative block h-64 w-full overflow-hidden"
        >
          <ImageWithFallback
            src={images[imageKey]}
            alt={item.imageAlt ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <span className="absolute bottom-2 left-2 rounded-pill bg-brand-dark/80 px-3 py-1 text-xs text-text-on-dark">
            {content.lotes.renderCaption}
          </span>
        </Lightbox>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">{item.size}</p>
        <p className="font-display text-3xl text-brand-dark">{item.price}</p>
        <p className="text-xs text-text-muted">{content.lotes.priceCaption}</p>

        {/*         <div className="mt-3 flex items-baseline gap-2 border-t border-border-soft pt-3 text-sm">
          <span className="font-semibold text-text-dark">{item.dimensions}</span>
          <span className="text-text-muted">{item.pricePerM2}</span>
        </div> */}

        {item.badge && (
          <p className="mt-2 inline-block w-fit rounded-pill bg-warning-bg px-3 py-1 text-xs font-semibold text-warning-text mb-2">
            {item.badge}
          </p>
        )}

        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-auto px-4 py-2">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          {item.cta}
        </a>
      </div>
    </article>
  );
}
