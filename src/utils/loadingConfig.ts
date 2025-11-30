// Loading configuration for optimal performance
export const LOADING_CONFIG = {
  // Timing configurations
  TIMING: {
    FAST: 150, // For simple pages
    NORMAL: 300, // For standard pages
    SLOW: 500, // For complex pages with heavy content
  },

  // Route-specific timing
  ROUTE_TIMING: {
    "/": 200,
    "/about": 300,
    "/work": 400,
    "/blog": 250,
    "/contact": 200,
    "/gallery": 350,
  },

  // Skeleton animation settings
  ANIMATION: {
    DURATION: 1500,
    EASING: "ease-in-out",
    STAGGER: 100, // Delay between skeleton elements
  },

  // Performance thresholds
  PERFORMANCE: {
    // Use shorter timeouts on slower devices
    MOBILE_TIMEOUT: 200,
    DESKTOP_TIMEOUT: 300,

    // Intersection observer settings
    INTERSECTION_THRESHOLD: 0.1,
    INTERSECTION_ROOT_MARGIN: "50px",
  },

  // Accessibility settings
  ACCESSIBILITY: {
    // Respect user's motion preferences
    RESPECT_REDUCED_MOTION: true,

    // Screen reader announcements
    ANNOUNCE_LOADING: true,
    ANNOUNCE_LOADED: true,
  },
} as const;

// Get optimal loading timeout based on route and device
export function getLoadingTimeout(pathname: string, isMobile = false): number {
  const routeTiming =
    LOADING_CONFIG.ROUTE_TIMING[pathname as keyof typeof LOADING_CONFIG.ROUTE_TIMING];
  const baseTimeout = routeTiming || LOADING_CONFIG.TIMING.NORMAL;

  return isMobile ? Math.min(baseTimeout, LOADING_CONFIG.PERFORMANCE.MOBILE_TIMEOUT) : baseTimeout;
}

// Check if user prefers reduced motion
export function shouldRespectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Get optimal animation duration based on user preferences
export function getAnimationDuration(): number {
  return shouldRespectReducedMotion() ? 0 : LOADING_CONFIG.ANIMATION.DURATION;
}

// Performance monitoring
export class LoadingPerformanceMonitor {
  private startTime = 0;
  private endTime = 0;

  start() {
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  }

  getDuration(): number {
    return this.endTime - this.startTime;
  }

  // Log performance metrics in development
  logMetrics(pathname: string) {
    if (process.env.NODE_ENV === "development") {
      // Loading time logged
    }
  }
}
