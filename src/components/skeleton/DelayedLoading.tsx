"use client";

import { useState, useEffect } from "react";
import { InlineHomeSkeleton, InlineAboutSkeleton, InlineWorkSkeleton } from "./InlineSkeleton";
import { ModernLoadingOverlay } from "./ModernLoadingOverlay";

interface DelayedLoadingProps {
  type?: "home" | "about" | "work" | "blog" | "contact" | "gallery";
  delay?: number;
  useModernOverlay?: boolean;
}

const MINIMUM_LOADING_TIME = 800; // 800ms minimum loading time

export function DelayedLoading({ 
  type = "home", 
  delay = MINIMUM_LOADING_TIME,
  useModernOverlay = false 
}: DelayedLoadingProps) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [startTime] = useState(Date.now());
  const [isVisible, setIsVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(useModernOverlay);

  useEffect(() => {
    // Show skeleton immediately
    setIsVisible(true);
    
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, delay - elapsed);
    
    const timer = setTimeout(() => {
      setShowSkeleton(false);
      setShowOverlay(false);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [delay, startTime]);

  // Add a small delay before showing skeleton to ensure it's visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // 50ms delay to ensure skeleton is visible

    return () => clearTimeout(timer);
  }, []);

  // Show modern overlay for first 300ms, then skeleton
  useEffect(() => {
    if (useModernOverlay) {
      const overlayTimer = setTimeout(() => {
        setShowOverlay(false);
      }, 300);

      return () => clearTimeout(overlayTimer);
    }
  }, [useModernOverlay]);

  if (!showSkeleton || !isVisible) {
    return null; // Don't render anything when loading is complete
  }

  // Show modern overlay if enabled
  if (showOverlay && useModernOverlay) {
    return (
      <ModernLoadingOverlay 
        isVisible={showOverlay}
        onComplete={() => setShowOverlay(false)}
      />
    );
  }

  // Render appropriate skeleton based on type
  switch (type) {
    case "home":
      return <InlineHomeSkeleton />;
    case "about":
      return <InlineAboutSkeleton />;
    case "work":
    case "blog":
    case "contact":
    case "gallery":
      return <InlineWorkSkeleton />;
    default:
      return <InlineHomeSkeleton />;
  }
}
