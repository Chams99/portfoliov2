"use client";

import { Column } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import { SkeletonBase, SkeletonBox, SkeletonLine } from "./SkeletonBase";
import styles from "./TransitionProvider.module.scss";

// Inject shimmer animation styles
if (typeof document !== "undefined" && !document.getElementById("transition-styles")) {
  const style = document.createElement("style");
  style.id = "transition-styles";
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

interface TransitionContextType {
  isTransitioning: boolean;
  setTransitioning: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      setIsTransitioning(true);

      // Use requestAnimationFrame for smoother transitions
      const timer = requestAnimationFrame(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150); // Reduced transition time for better UX
      });

      return () => cancelAnimationFrame(timer);
    }

    setPreviousPath(pathname);
  }, [pathname, previousPath]);

  const setTransitioning = (value: boolean) => {
    setIsTransitioning(value);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, setTransitioning }}>
      {isTransitioning && (
        <div
          className={styles.loadingOverlay}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--static-color-surface)",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease-out",
            overflowY: "auto",
          }}
        >
          <Column fillWidth gap="l" padding="l" horizontal="center">
            {/* Optimized skeleton for faster perceived loading */}
            <Column gap="m" maxWidth="m">
              <div
                style={{
                  width: "80%",
                  height: "2.5rem",
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200% 100%",
                  borderRadius: "0.25rem",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: "1.5rem",
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200% 100%",
                  borderRadius: "0.25rem",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200% 100%",
                  borderRadius: "0.5rem",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <Column gap="s">
                <div
                  style={{
                    width: "100%",
                    height: "1.25rem",
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    borderRadius: "0.25rem",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                <div
                  style={{
                    width: "90%",
                    height: "1.25rem",
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    borderRadius: "0.25rem",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                <div
                  style={{
                    width: "80%",
                    height: "1.25rem",
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    borderRadius: "0.25rem",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </Column>
            </Column>
          </Column>
        </div>
      )}
      <div
        style={{
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          willChange: "opacity, transform",
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
        }}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
