"use client";

import { about, blog, display, gallery, routes, work } from "@/resources";
import { ThemeToggle } from "../ThemeToggle";
import { MobileNavItem } from "./MobileNavItem";
import styles from "../Header.module.scss";

/**
 * Props for the MobileNav component.
 */
type MobileNavProps = {
  /** Current pathname for active state detection */
  pathname: string;
};

/**
 * Mobile navigation menu component.
 * Renders a bottom navigation bar with icons and labels.
 */
export const MobileNav = ({ pathname }: MobileNavProps) => {
  return (
    <div className={styles.mobileNav}>
      {routes["/"] && (
        <MobileNavItem
          href="/"
          iconContent={
            <>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </>
          }
          label="Home"
          selected={pathname === "/"}
          ariaLabel="Home"
        />
      )}
      
      {routes["/about"] && (
        <MobileNavItem
          href="/about"
          iconContent={
            <>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </>
          }
          label={about.label}
          selected={pathname === "/about"}
          ariaLabel={`Navigate to ${about.label}`}
        />
      )}
      
      {routes["/work"] && (
        <MobileNavItem
          href="/work"
          iconContent={
            <>
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </>
          }
          label={work.label}
          selected={pathname.startsWith("/work")}
          ariaLabel={`Navigate to ${work.label}`}
        />
      )}
      
      {routes["/blog"] && (
        <MobileNavItem
          href="/blog"
          iconContent={
            <>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </>
          }
          label={blog.label}
          selected={pathname.startsWith("/blog")}
          ariaLabel={`Navigate to ${blog.label}`}
        />
      )}
      
      {routes["/gallery"] && (
        <MobileNavItem
          href="/gallery"
          iconContent={
            <>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </>
          }
          label={gallery.label}
          selected={pathname.startsWith("/gallery")}
          ariaLabel={`Navigate to ${gallery.label}`}
        />
      )}
      
      {routes["/contact"] && (
        <MobileNavItem
          href="/contact"
          iconContent={
            <>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </>
          }
          label="Contact"
          selected={pathname === "/contact"}
          ariaLabel="Navigate to Contact"
        />
      )}
      
      {display.themeSwitcher && (
        <div className={styles.mobileNavItem}>
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};
