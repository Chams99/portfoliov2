"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { about, blog, display, gallery, person, routes, work } from "@/resources";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
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
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />

      {/* Desktop Navigation */}
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        role="banner"
        aria-label="Main navigation"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            className={styles.navContainer}
            radius="m-4"
            padding="4"
            horizontal="center"
            zIndex={1}
            role="navigation"
            aria-label="Main navigation menu"
          >
            <Row gap="2" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton
                  className={styles.navItem}
                  prefixIcon="home"
                  href="/"
                  selected={pathname === "/"}
                  aria-label="Home"
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname === "/about" ? styles.navItemSelected : ""}`}
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                      aria-label={`Navigate to ${about.label}`}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname === "/about" ? styles.navItemSelected : ""}`}
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                      aria-label={`Navigate to ${about.label}`}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/work") ? styles.navItemSelected : ""}`}
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                      aria-label={`Navigate to ${work.label}`}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/work") ? styles.navItemSelected : ""}`}
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                      aria-label={`Navigate to ${work.label}`}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/blog") ? styles.navItemSelected : ""}`}
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                      aria-label={`Navigate to ${blog.label}`}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/blog") ? styles.navItemSelected : ""}`}
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                      aria-label={`Navigate to ${blog.label}`}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/gallery") ? styles.navItemSelected : ""}`}
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                      aria-label={`Navigate to ${gallery.label}`}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname.startsWith("/gallery") ? styles.navItemSelected : ""}`}
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                      aria-label={`Navigate to ${gallery.label}`}
                    />
                  </Row>
                </>
              )}
              {routes["/contact"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname === "/contact" ? styles.navItemSelected : ""}`}
                      prefixIcon="email"
                      href="/contact"
                      label="Contact"
                      selected={pathname === "/contact"}
                      aria-label="Navigate to Contact"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className={`${styles.navItem} ${pathname === "/contact" ? styles.navItemSelected : ""}`}
                      prefixIcon="email"
                      href="/contact"
                      selected={pathname === "/contact"}
                      aria-label="Navigate to Contact"
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <div className={styles.themeToggle}>
                    <ThemeToggle />
                  </div>
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && (
                <div className={styles.timeDisplay}>
                  <TimeDisplay timeZone={person.location} />
                </div>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>

      {/* Mobile Navigation - Only render on client side */}
      {isMounted && (
        <div className={styles.mobileNav}>
          {routes["/"] && (
            <a
              href="/"
              className={`${styles.mobileNavItem} ${pathname === "/" ? styles.mobileNavItemSelected : ""}`}
              aria-label="Home"
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              <div className={styles.mobileNavLabel}>Home</div>
            </a>
          )}
          {routes["/about"] && (
            <a
              href="/about"
              className={`${styles.mobileNavItem} ${pathname === "/about" ? styles.mobileNavItemSelected : ""}`}
              aria-label={`Navigate to ${about.label}`}
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className={styles.mobileNavLabel}>{about.label}</div>
            </a>
          )}
          {routes["/work"] && (
            <a
              href="/work"
              className={`${styles.mobileNavItem} ${pathname.startsWith("/work") ? styles.mobileNavItemSelected : ""}`}
              aria-label={`Navigate to ${work.label}`}
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              <div className={styles.mobileNavLabel}>{work.label}</div>
            </a>
          )}
          {routes["/blog"] && (
            <a
              href="/blog"
              className={`${styles.mobileNavItem} ${pathname.startsWith("/blog") ? styles.mobileNavItemSelected : ""}`}
              aria-label={`Navigate to ${blog.label}`}
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <div className={styles.mobileNavLabel}>{blog.label}</div>
            </a>
          )}
          {routes["/gallery"] && (
            <a
              href="/gallery"
              className={`${styles.mobileNavItem} ${pathname.startsWith("/gallery") ? styles.mobileNavItemSelected : ""}`}
              aria-label={`Navigate to ${gallery.label}`}
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <div className={styles.mobileNavLabel}>{gallery.label}</div>
            </a>
          )}
          {routes["/contact"] && (
            <a
              href="/contact"
              className={`${styles.mobileNavItem} ${pathname === "/contact" ? styles.mobileNavItemSelected : ""}`}
              aria-label="Navigate to Contact"
            >
              <svg
                className={styles.mobileNavIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div className={styles.mobileNavLabel}>Contact</div>
            </a>
          )}
          {display.themeSwitcher && (
            <div className={styles.mobileNavItem}>
              <ThemeToggle />
            </div>
          )}
        </div>
      )}
    </>
  );
};
