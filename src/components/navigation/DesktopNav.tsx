"use client";

import { Line, Row, ToggleButton } from "@once-ui-system/core";
import { about, blog, display, gallery, routes, work } from "@/resources";
import { EnhancedLink } from "../EnhancedNavigation";
import { ThemeToggle } from "../ThemeToggle";
import { NavItem } from "./NavItem";
import styles from "../Header.module.scss";

/**
 * Props for the DesktopNav component.
 */
type DesktopNavProps = {
  /** Current pathname for active state detection */
  pathname: string;
};

/**
 * Desktop navigation menu component.
 */
export const DesktopNav = ({ pathname }: DesktopNavProps) => {
  return (
    <Row
      className={styles.navContainer}
      radius="m-4"
      padding="4"
      horizontal="center"
      zIndex={1}
      as="nav"
      aria-label="Main navigation menu"
    >
      <Row gap="2" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
        {routes["/"] && (
          <EnhancedLink href="/">
            <ToggleButton
              className={styles.navItem}
              prefixIcon="home"
              selected={pathname === "/"}
              aria-label="Home"
            />
          </EnhancedLink>
        )}
        <Line background="neutral-alpha-medium" vert maxHeight="24" />
        
        {routes["/about"] && (
          <NavItem
            href="/about"
            icon="person"
            label={about.label}
            selected={pathname === "/about"}
            ariaLabel={`Navigate to ${about.label}`}
          />
        )}
        
        {routes["/work"] && (
          <NavItem
            href="/work"
            icon="grid"
            label={work.label}
            selected={pathname.startsWith("/work")}
            ariaLabel={`Navigate to ${work.label}`}
          />
        )}
        
        {routes["/blog"] && (
          <NavItem
            href="/blog"
            icon="book"
            label={blog.label}
            selected={pathname.startsWith("/blog")}
            ariaLabel={`Navigate to ${blog.label}`}
          />
        )}
        
        {routes["/gallery"] && (
          <NavItem
            href="/gallery"
            icon="gallery"
            label={gallery.label}
            selected={pathname.startsWith("/gallery")}
            ariaLabel={`Navigate to ${gallery.label}`}
          />
        )}
        
        {routes["/contact"] && (
          <NavItem
            href="/contact"
            icon="email"
            label="Contact"
            selected={pathname === "/contact"}
            ariaLabel="Navigate to Contact"
          />
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
  );
};
