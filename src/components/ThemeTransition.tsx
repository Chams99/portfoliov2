"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@once-ui-system/core";
import styles from "./ThemeTransition.module.scss";

export const ThemeTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<string | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    
    if (previousTheme && previousTheme !== currentTheme) {
      setIsTransitioning(true);
      
      // Add a smooth transition effect
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
    
    setPreviousTheme(currentTheme);
  }, [theme, previousTheme]);

  // Apply theme transition class to the body element directly
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.classList.add(styles.themeTransition);
      if (isTransitioning) {
        body.classList.add(styles.transitioning);
      } else {
        body.classList.remove(styles.transitioning);
      }
    }
    
    return () => {
      if (body) {
        body.classList.remove(styles.themeTransition, styles.transitioning);
      }
    };
  }, [isTransitioning]);

  return <>{children}</>;
};
