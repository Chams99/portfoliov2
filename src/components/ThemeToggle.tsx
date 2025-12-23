"use client";

import { useTheme } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  // Attempt to get resolvedTheme from useTheme if available, or handle system preference
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      setActiveTheme(resolvedTheme);
    } else if (theme) {
      setActiveTheme(theme);
    }
  }, [theme, resolvedTheme]);

  const handleThemeToggle = () => {
    const nextTheme = activeTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button 
        type="button"
        className={styles.toggleButton} 
        aria-label="Toggle theme"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
        </svg>
      </button>
    );
  }

  const isDark = activeTheme === "dark";

  return (
    <button
      type="button"
      className={styles.toggleButton}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className={styles.moon} id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle 
            cx="12" 
            cy="12" 
            r="6" 
            fill="black" 
            style={{ 
              transition: 'transform 0.5s cubic-bezier(0,0,0,1)',
              transform: isDark ? 'translate(5px, -2px)' : 'translate(18px, -2px)'
            }} 
          />
        </mask>
        <circle
          className={styles.sun}
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
        />
        <g 
          className={styles.sunBeams} 
          stroke="currentColor" 
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(-25deg)' : 'rotate(0deg)'
          }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};
