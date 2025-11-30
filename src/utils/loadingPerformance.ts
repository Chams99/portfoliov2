"use client";

// Performance monitoring utility for skeleton loading
export class LoadingPerformanceMonitor {
  private startTime = 0;
  private endTime = 0;
  private metrics: Record<string, any> = {};

  start() {
    this.startTime = performance.now();
    this.metrics.startTime = this.startTime;
  }

  end() {
    this.endTime = performance.now();
    this.metrics.endTime = this.endTime;
    this.metrics.duration = this.endTime - this.startTime;
  }

  logMetrics(pathname: string) {
    const metrics = {
      pathname,
      duration: this.metrics.duration,
      startTime: this.metrics.startTime,
      endTime: this.metrics.endTime,
      timestamp: new Date().toISOString(),
    };

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      // Performance metrics logged
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      // You can integrate with your analytics service here
      // Example: analytics.track('loading_performance', metrics);
    }

    return metrics;
  }

  // Get loading timeout based on route complexity
  getLoadingTimeout(pathname: string, isMobile = false): number {
    const baseTimeouts: Record<string, number> = {
      "/": 800,
      "/about": 600,
      "/work": 1000,
      "/blog": 800,
      "/contact": 600,
      "/gallery": 1000,
    };

    const baseTimeout = baseTimeouts[pathname] || 800;

    // Adjust for mobile devices (typically slower)
    if (isMobile) {
      return baseTimeout * 1.2;
    }

    return baseTimeout;
  }

  // Check if reduced motion is preferred
  shouldRespectReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Get animation duration based on user preferences
  getAnimationDuration(): number {
    if (this.shouldRespectReducedMotion()) {
      return 0; // No animation for reduced motion
    }
    return 1.5; // Default animation duration
  }

  // Debounce rapid state changes to prevent flickering
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
}

// Utility functions for loading optimization
export const loadingUtils = {
  // Check if content is likely to load quickly
  shouldShowSkeleton(contentSize: number, connectionSpeed: "slow" | "fast" = "fast"): boolean {
    const threshold = connectionSpeed === "slow" ? 1000 : 500;
    return contentSize > threshold;
  },

  // Get appropriate skeleton variant based on content type
  getSkeletonVariant(
    contentType: "text" | "image" | "card" | "list",
  ): "shimmer" | "pulse" | "wave" | "glow" {
    const variants: Record<string, "shimmer" | "pulse" | "wave" | "glow"> = {
      text: "shimmer",
      image: "pulse",
      card: "wave",
      list: "glow",
    };
    return variants[contentType] || "shimmer";
  },

  // Calculate optimal loading delay
  calculateOptimalDelay(
    contentComplexity: "simple" | "medium" | "complex",
    userConnection: "slow" | "fast",
  ): number {
    const baseDelays = {
      simple: 300,
      medium: 600,
      complex: 1000,
    };

    const baseDelay = baseDelays[contentComplexity];
    const connectionMultiplier = userConnection === "slow" ? 1.5 : 1;

    return Math.min(baseDelay * connectionMultiplier, 2000); // Cap at 2 seconds
  },

  // Detect user's connection speed (basic implementation)
  detectConnectionSpeed(): Promise<"slow" | "fast"> {
    return new Promise((resolve) => {
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection.effectiveType;

        if (effectiveType === "slow-2g" || effectiveType === "2g") {
          resolve("slow");
        } else {
          resolve("fast");
        }
      } else {
        // Fallback: assume fast connection
        resolve("fast");
      }
    });
  },
};

// Hook for loading performance monitoring
export function useLoadingPerformance() {
  const monitor = new LoadingPerformanceMonitor();

  return {
    startMonitoring: () => monitor.start(),
    endMonitoring: () => monitor.end(),
    logMetrics: (pathname: string) => monitor.logMetrics(pathname),
    getTimeout: (pathname: string, isMobile?: boolean) =>
      monitor.getLoadingTimeout(pathname, isMobile),
    shouldRespectReducedMotion: () => monitor.shouldRespectReducedMotion(),
    getAnimationDuration: () => monitor.getAnimationDuration(),
    debounce: monitor.debounce.bind(monitor),
  };
}
