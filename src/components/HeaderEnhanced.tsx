"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex, Row } from "@once-ui-system/core";

import { person } from "@/resources";
import { EnhancedLink, useRoutePrefetching } from "./EnhancedNavigation";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone, locale]);

  return <span>{currentTime}</span>;
};

export function HeaderEnhanced() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { prefetchCriticalRoutes } = useRoutePrefetching();

  // Prefetch critical routes on mount
  useEffect(() => {
    const criticalRoutes = ["/about", "/work", "/blog", "/contact", "/gallery"];
    prefetchCriticalRoutes(criticalRoutes);
  }, [prefetchCriticalRoutes]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/about", label: "About", isActive: pathname === "/about" },
    { href: "/work", label: "Work", isActive: pathname.startsWith("/work") },
    { href: "/blog", label: "Blog", isActive: pathname.startsWith("/blog") },
    { href: "/gallery", label: "Gallery", isActive: pathname === "/gallery" },
    { href: "/contact", label: "Contact", isActive: pathname === "/contact" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Flex
        fillWidth
        horizontal="center"
        paddingX="l"
        paddingY="m"
        className={styles.headerContent}
      >
        <Row fillWidth horizontal="between" align="center">
          {/* Logo/Brand */}
          <EnhancedLink
            href="/"
            className={styles.logo}
            prefetch={true}
            enablePerformanceMonitoring={true}
          >
            <Flex align="center" gap="s">
              <div className={styles.avatar}>
                <img src="/images/avatar.webp" alt={person.name} width={32} height={32} />
              </div>
              <span className={styles.brandName}>{person.name}</span>
            </Flex>
          </EnhancedLink>

          {/* Navigation */}
          <nav className={styles.navigation}>
            <Row gap="l" align="center">
              {navigationItems.map((item) => (
                <EnhancedLink
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${item.isActive ? styles.active : ""}`}
                  prefetch={true}
                  enablePerformanceMonitoring={true}
                >
                  {item.label}
                </EnhancedLink>
              ))}
            </Row>
          </nav>

          {/* Right side controls */}
          <Row gap="m" align="center">
            {/* Time Display */}
            <div className={styles.timeDisplay}>
              <TimeDisplay timeZone="Africa/Tunisia" locale="en-GB" />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </Row>
        </Row>
      </Flex>

      {/* Progress indicator for page loads */}
      <div className={styles.progressIndicator} />
    </header>
  );
}
