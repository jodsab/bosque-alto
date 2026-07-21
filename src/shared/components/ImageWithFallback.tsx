"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { images } from "@/shared/constants/images.constants";

type Props = Omit<ImageProps, "onError" | "src"> & { src: string };

/**
 * Envoltorio sobre next/image que cae a un placeholder genérico si la
 * imagen indicada todavía no existe en /public (caso esperado: las
 * fotos reales del cliente no se han subido todavía).
 */
export default function ImageWithFallback({ src, alt, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      unoptimized
      onError={() => setImgSrc(images.fallback)}
    />
  );
}
