"use client";

import type { ReactNode } from "react";
import { EnhancedLink } from "../EnhancedNavigation";
import styles from "../Header.module.scss";

/**
 * Props for the MobileNavItem component.
 */
type MobileNavItemProps = {
  /** Route path */
  href: string;
  /** SVG icon content as ReactNode */
  iconContent: ReactNode;
  /** Display label */
  label: string;
  /** Whether this item is currently selected/active */
  selected: boolean;
  /** ARIA label for accessibility */
  ariaLabel: string;
};

/**
 * Mobile navigation item component with custom SVG icon.
 */
export const MobileNavItem = ({
  href,
  iconContent,
  label,
  selected,
  ariaLabel,
}: MobileNavItemProps) => {
  return (
    <EnhancedLink
      href={href}
      className={`${styles.mobileNavItem} ${selected ? styles.mobileNavItemSelected : ""}`}
      aria-label={ariaLabel}
    >
      <svg
        className={styles.mobileNavIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {iconContent}
      </svg>
      <div className={styles.mobileNavLabel}>{label}</div>
    </EnhancedLink>
  );
};
