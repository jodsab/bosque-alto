interface Props {
  imageAlt: string;
  embedUrl: string;
}

/** Iframe embebido (Kuula 360° / YouTube) cargado directamente, sin salir de la web. */
export default function Tour360Card({ imageAlt, embedUrl }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video w-full bg-brand-dark">
        <iframe
          src={embedUrl}
          title={imageAlt}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
          allowFullScreen
        />
      </div>
    </div>
  );
}