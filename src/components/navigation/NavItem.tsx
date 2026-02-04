"use client";

import { Row, ToggleButton } from "@once-ui-system/core";
import { EnhancedLink } from "../EnhancedNavigation";
import styles from "../Header.module.scss";

/**
 * Props for the NavItem component.
 */
type NavItemProps = {
  /** Route path */
  href: string;
  /** Icon name for the navigation item */
  icon: string;
  /** Display label (optional, hidden on mobile) */
  label?: string;
  /** Whether this item is currently selected/active */
  selected: boolean;
  /** ARIA label for accessibility */
  ariaLabel: string;
  /** Whether to match pathname with startsWith (for nested routes) */
  matchWithStartsWith?: boolean;
};

/**
 * Reusable navigation item component for desktop navigation.
 * Handles both exact path matching and startsWith matching for nested routes.
 */
export const NavItem = ({
  href,
  icon,
  label,
  selected,
  ariaLabel,
}: NavItemProps) => {
  return (
    <>
      <Row s={{ hide: true }}>
        <EnhancedLink href={href}>
          <ToggleButton
            className={`${styles.navItem} ${selected ? styles.navItemSelected : ""}`}
            prefixIcon={icon}
            label={label}
            selected={selected}
            aria-label={ariaLabel}
          />
        </EnhancedLink>
      </Row>
      <Row hide s={{ hide: false }}>
        <EnhancedLink href={href}>
          <ToggleButton
            className={`${styles.navItem} ${selected ? styles.navItemSelected : ""}`}
            prefixIcon={icon}
            selected={selected}
            aria-label={ariaLabel}
          />
        </EnhancedLink>
      </Row>
    </>
  );
};
