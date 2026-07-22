"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

/** Envuelve una miniatura clickeable que abre la imagen en pantalla grande (cierre con X, click afuera o Escape). */
export default function Lightbox({ src, alt, children, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver imagen ampliada: ${alt}`}
        className={className}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar imagen"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-text-on-dark transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className="relative h-[70vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback src={src} alt={alt} fill className="object-contain" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
