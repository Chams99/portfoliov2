import { useEffect, useRef } from "react";

/**
 * Hook for managing focus in accessible components
 * Provides focus trapping and restoration capabilities
 */
export function useFocusManagement() {
  const focusableElements = useRef<HTMLElement[]>([]);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    return Array.from(container.querySelectorAll(focusableSelectors));
  };

  const trapFocus = (container: HTMLElement) => {
    focusableElements.current = getFocusableElements(container);
    const firstElement = focusableElements.current[0];
    const lastElement = focusableElements.current[focusableElements.current.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  };

  const restoreFocus = () => {
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  };

  const saveActiveElement = () => {
    previousActiveElement.current = document.activeElement as HTMLElement;
  };

  return {
    trapFocus,
    restoreFocus,
    saveActiveElement,
  };
}

/**
 * Hook for managing ARIA live regions
 */
export function useAriaLive() {
  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const liveRegion = document.getElementById("aria-live-region");
    if (liveRegion) {
      liveRegion.setAttribute("aria-live", priority);
      liveRegion.textContent = message;
    }
  };

  return { announce };
}
