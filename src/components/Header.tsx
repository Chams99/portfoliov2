"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Row } from "@once-ui-system/core";

import { display, person } from "@/resources";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { TimeDisplay } from "./navigation/TimeDisplay";
import styles from "./Header.module.scss";

/**
 * Main header component containing desktop and mobile navigation.
 * Handles responsive navigation with separate components for desktop and mobile views.
 */
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
        paddingLeft="8"
        paddingRight="8"
        paddingTop="2"
        paddingBottom="2"
        horizontal="center"
        data-border="rounded"
        role="banner"
        aria-label="Main navigation"
        s={{
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.locationName}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <DesktopNav pathname={pathname} />
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
                  <TimeDisplay timeZone={person.timeZone} />
                </div>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>

      {/* Mobile Navigation - Only render on client side */}
      {isMounted && <MobileNav pathname={pathname} />}
    </>
  );
};
