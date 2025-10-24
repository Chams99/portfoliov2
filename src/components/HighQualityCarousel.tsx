"use client";

import { Carousel } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface HighQualityCarouselProps {
  images: string[];
  title: string;
  aspectRatio?: string;
  sizes?: string;
}

/**
 * High-quality carousel wrapper for project images
 * Ensures images load at 90% quality using unoptimized mode for better clarity
 */
export const HighQualityCarousel: React.FC<HighQualityCarouselProps> = ({
  images,
  title,
  aspectRatio = "16 / 9",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px",
}) => {
  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        sizes={sizes}
        aspectRatio={aspectRatio}
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
    </div>
  );
};
