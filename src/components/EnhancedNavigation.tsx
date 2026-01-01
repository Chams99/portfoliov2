"use client";

import { useLoadingPerformance } from "@/utils/loadingPerformance";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./EnhancedNavigation.module.scss";

interface EnhancedNavigationProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced Link component with prefetching and performance monitoring
export function EnhancedLink({
  children,
  prefetch = true,
  enablePerformanceMonitoring = true,
  ...props
}: React.ComponentProps<typeof Link> & { enablePerformanceMonitoring?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPrefetched, setIsPrefetched] = useState(false);
  const router = useRouter();
  const { startMonitoring, endMonitoring, logMetrics } = useLoadingPerformance();
  
  const { href } = props; // Extract href for usage

  // Prefetch on hover with performance monitoring
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    const hrefString = props.href.toString();

    if (prefetch && !isPrefetched) {
      // Start performance monitoring for prefetch
      if (enablePerformanceMonitoring) {
        startMonitoring();
      }

      // Prefetch the route
      router.prefetch(hrefString);
      setIsPrefetched(true);

      // End monitoring after a short delay
      setTimeout(() => {
        if (enablePerformanceMonitoring) {
          endMonitoring();
          logMetrics(`prefetch-${hrefString}`);
        }
      }, 100);
    }
  }, [
    props.href,
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
  const navigationStartRef = useRef<number | null>(null);
  const { startMonitoring, endMonitoring, logMetrics } = useLoadingPerformance();

  // Refs for stable access in event listeners
  const startMonitoringRef = useRef(startMonitoring);
  const endMonitoringRef = useRef(endMonitoring);
  const logMetricsRef = useRef(logMetrics);

  useEffect(() => {
    startMonitoringRef.current = startMonitoring;
    endMonitoringRef.current = endMonitoring;
    logMetricsRef.current = logMetrics;
  }, [startMonitoring, endMonitoring, logMetrics]);

  // Handle navigation completion (when pathname changes)
  useEffect(() => {
    // Always reset navigation state when path changes
    // React bails out of updates if the state value is strictly equal
    setIsNavigating(false);
    
    if (navigationStartRef.current) {
      // const navigationTime = performance.now() - navigationStartRef.current; // Unused variable
      logMetricsRef.current(`navigation-${pathname}`);
      endMonitoringRef.current();
    }
    navigationStartRef.current = null;
  }, [pathname]);

  // Monitor navigation start (monkey patch history)
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Defer state updates to avoid "useInsertionEffect must not schedule updates" error
      // caused by Next.js internals interacting with synchronous history updates
      setTimeout(() => {
        setIsNavigating(true);
        navigationStartRef.current = performance.now();
        startMonitoringRef.current();
      }, 0);
    };

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

    /* 
       Note: Next.js App Router performs soft navigation so 'popstate' might not be enough 
       or might behave differently, but capturing pushState/replaceState covers most link clicks.
    */
    window.addEventListener("popstate", handleRouteChangeStart);

    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
      window.removeEventListener("popstate", handleRouteChangeStart);
    };
  }, []);

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
