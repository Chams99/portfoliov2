"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Simple page transition effect using CSS
export function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    // Add a subtle fade effect on route change
    const body = document.body;
    body.style.transition = 'opacity 0.2s ease-in-out';
    body.style.opacity = '0.8';
    
    const timer = setTimeout(() => {
      body.style.opacity = '1';
    }, 100);

    return () => {
      clearTimeout(timer);
      body.style.transition = '';
      body.style.opacity = '';
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}