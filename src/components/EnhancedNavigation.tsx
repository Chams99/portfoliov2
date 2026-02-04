"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import styles from "./EnhancedNavigation.module.scss";

interface EnhancedNavigationProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced Link component with prefetching
export function EnhancedLink({
  children,
  prefetch = true,
  ...props
}: React.ComponentProps<typeof Link>) {
  const [isPrefetched, setIsPrefetched] = useState(false);
  const router = useRouter();

  // Prefetch on hover
  const handleMouseEnter = useCallback(() => {
    const hrefString = props.href.toString();
    if (prefetch && !isPrefetched) {
      router.prefetch(hrefString);
      setIsPrefetched(true);
    }
  }, [props.href, prefetch, isPrefetched, router]);

  return (
    <Link onMouseEnter={handleMouseEnter} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}

// Navigation wrapper
export function EnhancedNavigation({ children, className }: EnhancedNavigationProps) {
  return <div className={className}>{children}</div>;
}

