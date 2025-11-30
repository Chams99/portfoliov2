"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface LoadingState {
  isLoading: boolean;
  loadingKey: number;
}

export function useLoading() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    loadingKey: 0,
  });
  const pathname = usePathname();

  const startLoading = useCallback(() => {
    setLoadingState((prev) => ({
      isLoading: true,
      loadingKey: prev.loadingKey + 1,
    }));
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  // Auto-loading on route change
  useEffect(() => {
    startLoading();

    // Use a shorter timeout for better perceived performance
    const timer = setTimeout(() => {
      stopLoading();
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, startLoading, stopLoading]);

  return {
    isLoading: loadingState.isLoading,
    loadingKey: loadingState.loadingKey,
    startLoading,
    stopLoading,
  };
}

// Optimized loading hook with intersection observer
export function useOptimizedLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0);
  const pathname = usePathname();

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setLoadingKey((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    // Use requestIdleCallback for better performance
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(() => {
        setIsLoading(false);
      });
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  }, []);

  useEffect(() => {
    startLoading();

    // Optimized timing based on content complexity
    const timer = setTimeout(
      () => {
        stopLoading();
      },
      pathname.includes("/work") ? 300 : 150,
    );

    return () => clearTimeout(timer);
  }, [pathname, startLoading, stopLoading]);

  return {
    isLoading,
    loadingKey,
    startLoading,
    stopLoading,
  };
}
