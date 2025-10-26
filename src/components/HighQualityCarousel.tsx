"use client";

import { Carousel } from "@once-ui-system/core";
import { useState } from "react";
import styles from "./ProjectCard.module.scss";

interface HighQualityCarouselProps {
  images: string[];
  title: string;
  aspectRatio?: string;
  sizes?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
}

/**
 * Enhanced high-quality carousel wrapper for project images
 * Features improved navigation, thumbnails, and better image quality
 */
export const HighQualityCarousel: React.FC<HighQualityCarouselProps> = ({
  images,
  title,
  aspectRatio = "16 / 9",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px",
  showThumbnails = true,
  autoPlay = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.placeholderImage}>
          <div className={styles.placeholderContent}>
            <span className={styles.placeholderIcon}>📷</span>
            <span className={styles.placeholderText}>No images available</span>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.singleImageContainer}>
          <img
            src={images[0]}
            alt={title}
            className={styles.singleImage}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        sizes={sizes}
        aspectRatio={aspectRatio}
        items={images.map((image, index) => ({
          slide: image,
          alt: `${title} - Image ${index + 1}`,
        }))}
      />
      
      {/* Enhanced Image Counter */}
      <div className={styles.imageCounter}>
        <span className={styles.counterText}>
          {currentSlide + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && (
        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <button
              key={`thumbnail-${image}`}
              type="button"
              className={`${styles.thumbnail} ${
                index === currentSlide ? styles.thumbnailActive : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
