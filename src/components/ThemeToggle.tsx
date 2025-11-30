"use client";

import { useTheme } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
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

    // Add a small delay to show the animation
    setTimeout(() => {
      setTheme(nextTheme);
      setIsAnimating(false);
    }, 150);
  };

  if (!mounted) {
    return (
      <div className={styles.button}>
        <div className={styles.iconContainer}>
          <div className={styles.sunIcon} />
        </div>
      </div>
    );
  }

  const isDark = currentTheme === "dark";

  return (
    <button
      className={`${styles.button} ${isAnimating ? styles.animating : ""}`}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className={styles.iconContainer}>
        <div className={`${styles.sunIcon} ${isDark ? styles.hidden : ""}`} />
        <div className={`${styles.moonIcon} ${!isDark ? styles.hidden : ""}`} />
      </div>
      <div className={styles.ripple} />
    </button>
  );
};
