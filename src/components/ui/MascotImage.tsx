import React, { useState } from "react";
import clsx from "clsx";

interface MascotImageProps {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export function MascotImage({
  size = 192,
  className,
  alt = "BurgerAPI mascot",
  priority = false,
}: MascotImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src="/img/android-chrome-192x192.png"
      alt={alt}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={clsx(
        "object-contain transition-opacity duration-300",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
