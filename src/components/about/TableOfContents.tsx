"use client";

import { Column, Flex, Text } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = structure.filter((section) => section.display);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].title);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].title);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [structure]);

  if (!about.tableOfContent.display) return null;

  return (
    <Column gap="24">
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Column key={sectionIndex} gap="12">
            <Flex
              cursor="interactive"
              className={`${styles.hover} ${activeSection === section.title ? styles.activeSection : ""}`}
              gap="8"
              vertical="center"
              onClick={() => scrollTo(section.title, 80)}
              padding="8"
            >
              <Flex
                height="2"
                minWidth="20"
                background={activeSection === section.title ? "brand-strong" : "neutral-medium"}
              />
              <Text
                variant="body-default-m"
                onBackground={activeSection === section.title ? "brand-strong" : "neutral-strong"}
              >
                {section.title}
              </Text>
            </Flex>
            {about.tableOfContent.subItems && section.items.length > 0 && (
              <Column gap="8" paddingLeft="16">
                {section.items.map((item, itemIndex) => (
                  <Flex
                    key={itemIndex}
                    style={{ cursor: "pointer" }}
                    className={styles.hover}
                    gap="8"
                    padding="8"
                    vertical="center"
                    onClick={() => scrollTo(item, 80)}
                  >
                    <Flex height="1" minWidth="12" background="neutral-medium" />
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {item}
                    </Text>
                  </Flex>
                ))}
              </Column>
            )}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
