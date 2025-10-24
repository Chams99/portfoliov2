"use client";

import { useTheme } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./AnimatedThemeToggler.module.scss";

export const AnimatedThemeToggler: React.FC<{
  className?: string;
  duration?: number;
}> = ({ className = "", duration = 800 }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, [theme]);

  const handleThemeToggle = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    // Add animation delay
    setTimeout(() => {
      setTheme(nextTheme);
      setIsAnimating(false);
    }, duration / 2);
  };

  if (!mounted) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.toggle}>
          <div className={styles.track}>
            <div className={styles.thumb} />
          </div>
        </div>
      </div>
    );
  }

  const isDark = currentTheme === "dark";

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        className={`${styles.toggle} ${isAnimating ? styles.animating : ""} ${isDark ? styles.dark : styles.light}`}
        onClick={handleThemeToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
        data-duration={duration}
      >
        <div className={styles.track}>
          <div className={styles.thumb}>
            <div className={styles.iconContainer}>
              <div className={`${styles.sunIcon} ${isDark ? styles.hidden : ""}`}>
                <div className={styles.sunCenter} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
                <div className={styles.sunRay} />
              </div>
              <div className={`${styles.moonIcon} ${!isDark ? styles.hidden : ""}`}>
                <div className={styles.moonBody} />
                <div className={styles.moonCrater} />
                <div className={styles.moonCrater} />
                <div className={styles.moonCrater} />
              </div>
            </div>
          </div>
        </div>

        {/* Background particles */}
        <div className={styles.particles}>
          <div className={styles.particle} />
          <div className={styles.particle} />
          <div className={styles.particle} />
          <div className={styles.particle} />
          <div className={styles.particle} />
        </div>

        {/* Ripple effect */}
        <div className={styles.ripple} />
      </button>
    </div>
  );
};

export const AnimatedThemeTogglerDemo: React.FC = () => {
  return (
    <div className={styles.demo}>
      <h3>Animated Theme Toggler</h3>
      <p>Click to switch between light and dark themes</p>
      <AnimatedThemeToggler />
    </div>
  );
};
