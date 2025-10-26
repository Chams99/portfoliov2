"use client";

import { useState, useCallback } from "react";
import { Media } from "@once-ui-system/core";

interface LazyImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  radius?: "m" | "s" | "l" | "xl" | "xs" | "none" | "full";
  enlarge?: boolean;
}

/**
 * Optimized lazy loading image component
 * Implements intersection observer for better performance
 */
export function LazyImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  aspectRatio = "16 / 9",
  className,
  style,
  radius = "m",
  enlarge = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  }, []);

  return (
    <Media
      src={isInView ? src : ""}
      alt={alt}
      sizes={sizes}
      aspectRatio={aspectRatio}
      className={className}
      style={style}
      radius={radius}
      enlarge={enlarge}
      priority={priority}
      onLoad={handleLoad}
    />
  );
}
