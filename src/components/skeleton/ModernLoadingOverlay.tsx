"use client";

import { useEffect, useState } from "react";
import { Column, Row } from "@once-ui-system/core";

interface ModernLoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function ModernLoadingOverlay({ isVisible, onComplete }: ModernLoadingOverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + Math.random() * 15; // Random progress increments
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Animated background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      <Column align="center" gap="l" style={{ position: "relative", zIndex: 1 }}>
        {/* Animated logo/icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "bounce 2s ease-in-out infinite",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Loading text */}
        <div
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "600",
            textAlign: "center",
            animation: "fadeIn 1s ease-out",
          }}
        >
          Loading...
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "300px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #ffffff, #f0f0f0)",
              borderRadius: "2px",
              transition: "width 0.3s ease-out",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Progress percentage */}
        <div
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          {Math.round(progress)}%
        </div>
      </Column>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Add floating animation
if (typeof document !== 'undefined' && !document.getElementById('loading-overlay-styles')) {
  const style = document.createElement('style');
  style.id = 'loading-overlay-styles';
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}
