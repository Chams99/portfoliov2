"use client";

import { useLoadingPerformance } from "@/utils/loadingPerformance";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./EnhancedNavigation.module.scss";

interface EnhancedNavigationProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced Link component with prefetching and performance monitoring
export function EnhancedLink({
  href,
  children,
  className,
  prefetch = true,
  enablePerformanceMonitoring = true,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  enablePerformanceMonitoring?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'className'>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPrefetched, setIsPrefetched] = useState(false);
  const router = useRouter();
  const { startMonitoring, endMonitoring, logMetrics } = useLoadingPerformance();

  // Prefetch on hover with performance monitoring
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    if (prefetch && !isPrefetched) {
      // Start performance monitoring for prefetch
      if (enablePerformanceMonitoring) {
        startMonitoring();
      }

      // Prefetch the route
      router.prefetch(href);
      setIsPrefetched(true);

      // End monitoring after a short delay
      setTimeout(() => {
        if (enablePerformanceMonitoring) {
          endMonitoring();
          logMetrics(`prefetch-${href}`);
        }
      }, 100);
    }
  }, [
    href,
    prefetch,
    isPrefetched,
    router,
    startMonitoring,
    endMonitoring,
    logMetrics,
    enablePerformanceMonitoring,
  ]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}

// Navigation wrapper with enhanced features
export function EnhancedNavigation({ children, className }: EnhancedNavigationProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationStart, setNavigationStart] = useState<number | null>(null);
  const { startMonitoring, endMonitoring, logMetrics } = useLoadingPerformance();

  // Monitor navigation performance
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
      setNavigationStart(performance.now());
      startMonitoring();
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
      if (navigationStart) {
        const navigationTime = performance.now() - navigationStart;
        logMetrics(`navigation-${pathname}`);

        // Log navigation performance
        if (process.env.NODE_ENV === "development") {
          // Navigation performance logged
        }
      }
      endMonitoring();
    };

    // Listen for route changes
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      handleRouteChangeStart();
      return originalPush.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      handleRouteChangeStart();
      return originalReplace.apply(this, args);
    };

    // Listen for popstate events
    window.addEventListener("popstate", handleRouteChangeStart);

    // Cleanup
    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
      window.removeEventListener("popstate", handleRouteChangeStart);
    };
  }, [pathname, navigationStart, startMonitoring, endMonitoring, logMetrics]);

  return (
    <div className={className}>
      {children}
      {isNavigating && <div className={styles.navigationProgress} />}
    </div>
  );
}

// Enhanced page transition component
export function EnhancedPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 200);

      setPreviousPathname(pathname);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname, previousPathname]);

  return (
    <div
      className={`${styles.pageTransition} ${isTransitioning ? styles.pageTransitionTransitioning : ""}`}
    >
      {children}
    </div>
  );
}

// Prefetch utility for critical routes
export function useRoutePrefetching() {
  const router = useRouter();
  const [prefetchedRoutes, setPrefetchedRoutes] = useState<Set<string>>(new Set());

  const prefetchRoute = useCallback(
    (href: string) => {
      if (!prefetchedRoutes.has(href)) {
        router.prefetch(href);
        setPrefetchedRoutes((prev) => new Set([...prev, href]));
      }
    },
    [router, prefetchedRoutes],
  );

  const prefetchCriticalRoutes = useCallback(
    (routes: string[]) => {
      for (const route of routes) {
        if (!prefetchedRoutes.has(route)) {
          router.prefetch(route);
          setPrefetchedRoutes((prev) => new Set([...prev, route]));
        }
      }
    },
    [router, prefetchedRoutes],
  );

  return {
    prefetchRoute,
    prefetchCriticalRoutes,
    prefetchedRoutes: Array.from(prefetchedRoutes),
  };
}
