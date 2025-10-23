"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@once-ui-system/core";
import "./PageThemeTransition.module.scss";

export const PageThemeTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      }, 600);
    }
    
    setPreviousTheme(currentTheme);
  }, [theme, previousTheme]);

  // Apply page transition effects directly to the body element
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.classList.add('page-theme-transition');
      if (isTransitioning) {
        body.classList.add('theme-transitioning');
      } else {
        body.classList.remove('theme-transitioning');
      }
    }
    
    return () => {
      if (body) {
        body.classList.remove('page-theme-transition', 'theme-transitioning');
      }
    };
  }, [isTransitioning]);

  // Create overlay elements dynamically
  useEffect(() => {
    if (isTransitioning) {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-50 pointer-events-none';
      overlay.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div class="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-orange-500/10 to-red-500/10 animate-bounce"></div>
        <div class="absolute inset-0 bg-gradient-to-bl from-green-400/10 via-teal-500/10 to-blue-500/10 animate-ping"></div>
      `;
      document.body.appendChild(overlay);
      
      return () => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      };
    }
  }, [isTransitioning]);

  return <>{children}</>;
};
