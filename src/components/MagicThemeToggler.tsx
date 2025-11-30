"use client";

import { useTheme } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";

export const MagicThemeToggler: React.FC<{
  className?: string;
  duration?: number;
}> = ({ className = "", duration = 400 }) => {
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
      <div className={`relative ${className}`}>
        <div className="w-16 h-8 bg-gray-200 rounded-full p-1">
          <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300" />
        </div>
      </div>
    );
  }

  const isDark = currentTheme === "dark";

  return (
    <div className={`relative ${className}`}>
      <button
        className={`
          relative w-16 h-8 rounded-full p-1 transition-all duration-500 ease-in-out
          ${
            isDark
              ? "bg-gradient-to-r from-gray-700 to-gray-900"
              : "bg-gradient-to-r from-yellow-400 to-orange-500"
          }
          ${isAnimating ? "scale-110 rotate-12" : "scale-100 rotate-0"}
          hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        onClick={handleThemeToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
        data-duration={duration}
      >
        {/* Track background with animated gradient */}
        <div
          className={`
          absolute inset-1 rounded-full transition-all duration-500
          ${
            isDark
              ? "bg-gradient-to-r from-gray-600 to-gray-800"
              : "bg-gradient-to-r from-yellow-300 to-orange-400"
          }
        `}
        />

        {/* Thumb with icon */}
        <div
          className={`
          relative w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 ease-in-out
          flex items-center justify-center
          ${isDark ? "translate-x-8" : "translate-x-0"}
          ${isAnimating ? "scale-125 rotate-180" : "scale-100 rotate-0"}
        `}
        >
          {/* Sun Icon */}
          <div
            className={`
            absolute transition-all duration-500 ease-in-out
            ${isDark ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"}
          `}
          >
            <div className="w-3 h-3 bg-yellow-400 rounded-full relative">
              <div className="absolute -top-1 left-1/2 w-0.5 h-1 bg-yellow-400 transform -translate-x-1/2" />
              <div className="absolute -top-0.5 -right-0.5 w-1 h-0.5 bg-yellow-400 transform rotate-45" />
              <div className="absolute -right-1 top-1/2 w-1 h-0.5 bg-yellow-400 transform -translate-y-1/2" />
              <div className="absolute -bottom-0.5 -right-0.5 w-1 h-0.5 bg-yellow-400 transform -rotate-45" />
              <div className="absolute -bottom-1 left-1/2 w-0.5 h-1 bg-yellow-400 transform -translate-x-1/2" />
              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-0.5 bg-yellow-400 transform rotate-45" />
              <div className="absolute -left-1 top-1/2 w-1 h-0.5 bg-yellow-400 transform -translate-y-1/2" />
              <div className="absolute -top-0.5 -left-0.5 w-1 h-0.5 bg-yellow-400 transform -rotate-45" />
            </div>
          </div>

          {/* Moon Icon */}
          <div
            className={`
            absolute transition-all duration-500 ease-in-out
            ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-180"}
          `}
          >
            <div className="w-3 h-3 bg-gray-600 rounded-full relative">
              <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`
            absolute w-1 h-1 bg-white rounded-full transition-all duration-1000
            ${isAnimating ? "animate-ping" : ""}
            top-[20%] left-[20%]
          `}
          />
          <div
            className={`
            absolute w-1 h-1 bg-white rounded-full transition-all duration-1000
            ${isAnimating ? "animate-ping" : ""}
            top-[30%] right-[20%] animation-delay-200
          `}
          />
          <div
            className={`
            absolute w-1 h-1 bg-white rounded-full transition-all duration-1000
            ${isAnimating ? "animate-ping" : ""}
            bottom-[30%] left-[30%] animation-delay-400
          `}
          />
        </div>

        {/* Ripple effect */}
        <div
          className={`
          absolute inset-0 rounded-full transition-all duration-500
          ${isAnimating ? "bg-white/20 scale-150 opacity-0" : "bg-transparent scale-100 opacity-0"}
        `}
        />
      </button>
    </div>
  );
};

export const MagicThemeTogglerDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Magic Theme Toggler</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click to switch between light and dark themes
      </p>
      <MagicThemeToggler />
    </div>
  );
};
