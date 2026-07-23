"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { images, ImageKey } from "@/shared/constants/images.constants";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: { imageAlt: string }[];
  slideKeys: ImageKey[];
}

/** Carrusel automático (3 slides en desktop, 1 en mobile) con puntos de navegación, swipe y autoplay cada 3s. */
export default function ImageSlider({ id, eyebrow, title, description, items, slideKeys }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 30 }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => setSnapCount(emblaApi.scrollSnapList().length);
    onInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id={id} className="bg-cream-bg py-section-y">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-brand-dark sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{description}</p>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {items.map((item, i) => (
              <div
                key={item.imageAlt}
                className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
              >
                <div className="card relative aspect-[4/3] w-full overflow-hidden">
                  <ImageWithFallback src={images[slideKeys[i]]} alt={item.imageAlt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i, true)}
              aria-label={`Ir a la foto ${i + 1}`}
              aria-current={i === selectedIndex}
              className={`h-2 rounded-pill transition-all ${
                i === selectedIndex ? "w-6 bg-brand-green" : "w-2 bg-border-soft hover:bg-brand-green/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}