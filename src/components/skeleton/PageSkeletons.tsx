import { Column, Row } from "@once-ui-system/core";
import {
  SkeletonBase,
  SkeletonBox,
  SkeletonCard,
  SkeletonCircle,
  SkeletonLine,
} from "./SkeletonBase";

// Home page skeleton
export function HomePageSkeleton() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {/* Featured Badge */}
          <SkeletonBox width="200px" height="40px" className="mb-8" />

          {/* Main Heading */}
          <SkeletonLine width="90%" height="3rem" className="mb-4" />

          {/* Subheading */}
          <SkeletonLine width="80%" height="1.5rem" className="mb-8" />

          {/* CTA Button */}
          <SkeletonBox width="180px" height="48px" className="mb-4" />
        </Column>
      </Column>

      {/* Featured Projects Section */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth horizontal="center">
          <SkeletonLine width="200px" height="2px" />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <SkeletonLine width="200px" height="2rem" />
          </Row>
          <Column flex={3} paddingX="20" gap="16">
            <SkeletonLine width="100%" height="1.5rem" />
            <SkeletonLine width="80%" height="1rem" />
          </Column>
        </Row>
      </Column>

      {/* Project Cards */}
      <Column fillWidth gap="l">
        <Row fillWidth gap="l" s={{ direction: "column" }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${Date.now()}-${index}`} />
          ))}
        </Row>
      </Column>

      {/* View All Button */}
      <Column fillWidth horizontal="center" paddingY="32">
        <SkeletonBox width="200px" height="48px" />
      </Column>

      {/* Skills Section */}
      <Column fillWidth gap="l">
        <SkeletonLine width="150px" height="2rem" />
        <Row wrap gap="m">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBox key={`skeleton-${Date.now()}-${index}`} width="120px" height="40px" />
          ))}
        </Row>
      </Column>

      {/* Blog Section */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth horizontal="center">
          <SkeletonLine width="200px" height="2px" />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <SkeletonLine width="200px" height="2rem" />
          </Row>
          <Row flex={3} paddingX="20" gap="l">
            {Array.from({ length: 2 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${Date.now()}-${index}`} />
            ))}
          </Row>
        </Row>
      </Column>
    </Column>
  );
}

// About page skeleton
export function AboutPageSkeleton() {
  return (
    <Column maxWidth="m">
      {/* Table of Contents */}
      <Column
        left="0"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        position="fixed"
        paddingLeft="24"
        gap="32"
        s={{ hide: true }}
      >
        <Column gap="m">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLine key={`skeleton-${Date.now()}-${index}`} width="120px" height="1rem" />
          ))}
        </Column>
      </Column>

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {/* Avatar Section */}
        <Column
          top="64"
          fitHeight
          position="sticky"
          s={{ position: "relative", style: { top: "auto" } }}
          xs={{ style: { top: "auto" } }}
          minWidth="160"
          paddingX="l"
          paddingBottom="xl"
          gap="m"
          flex={3}
          horizontal="center"
        >
          <SkeletonCircle size="80px" />
          <SkeletonLine width="100px" height="1rem" />
          <Row gap="8" wrap>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonBox key={`skeleton-${Date.now()}-${index}`} width="60px" height="24px" />
            ))}
          </Row>
        </Column>

        {/* Content Section */}
        <Column className="blockAlign" flex={9} maxWidth={40}>
          {/* Intro Section */}
          <Column fillWidth minHeight="160" vertical="center" marginBottom="32">
            <SkeletonLine width="300px" height="3rem" className="mb-4" />
            <SkeletonLine width="200px" height="1.5rem" className="mb-8" />
            <Row gap="8" wrap>
              <SkeletonBox width="120px" height="40px" />
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonBox key={`skeleton-${Date.now()}-${index}`} width="40px" height="40px" />
              ))}
            </Row>
          </Column>

          {/* Description */}
          <Column fillWidth gap="m" marginBottom="xl">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonLine key={`skeleton-${Date.now()}-${index}`} width="100%" height="1.25rem" />
            ))}
          </Column>

          {/* Work Experience */}
          <Column fillWidth gap="l" marginBottom="40">
            <SkeletonLine width="200px" height="2rem" className="mb-4" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Column key={`skeleton-${Date.now()}-${index}`} fillWidth gap="m">
                <Row fillWidth horizontal="between" vertical="end">
                  <SkeletonLine width="150px" height="1.5rem" />
                  <SkeletonLine width="80px" height="1rem" />
                </Row>
                <SkeletonLine width="200px" height="1.25rem" />
                <Column gap="s">
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <SkeletonLine key={`skeleton-item-${Date.now()}-${itemIndex}`} width="100%" height="1rem" />
                  ))}
                </Column>
              </Column>
            ))}
          </Column>

          {/* Studies */}
          <Column fillWidth gap="l" marginBottom="40">
            <SkeletonLine width="150px" height="2rem" className="mb-4" />
            {Array.from({ length: 2 }).map((_, index) => (
              <Column key={`skeleton-${Date.now()}-${index}`} fillWidth gap="s">
                <SkeletonLine width="200px" height="1.5rem" />
                <SkeletonLine width="300px" height="1rem" />
              </Column>
            ))}
          </Column>

          {/* Technical Skills */}
          <Column fillWidth gap="l">
            <SkeletonLine width="180px" height="2rem" className="mb-4" />
            {Array.from({ length: 4 }).map((_, index) => (
              <Column key={`skeleton-${Date.now()}-${index}`} fillWidth gap="s">
                <SkeletonLine width="150px" height="1.5rem" />
                <SkeletonLine width="100%" height="1rem" />
                <Row wrap gap="s">
                  {Array.from({ length: 4 }).map((_, tagIndex) => (
                    <SkeletonBox key={`skeleton-tag-${Date.now()}-${tagIndex}`} width="80px" height="24px" />
                  ))}
                </Row>
              </Column>
            ))}
          </Column>
        </Column>
      </Row>
    </Column>
  );
}

// Work page skeleton
export function WorkPageSkeleton() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40">
      {/* Header */}
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <SkeletonLine width="200px" height="3rem" />
        <Column maxWidth="s" align="center">
          <SkeletonLine width="100%" height="1.5rem" />
          <SkeletonLine width="80%" height="1rem" />
        </Column>
      </Column>

      {/* Project Grid */}
      <Column fillWidth gap="l">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${Date.now()}-${index}`} />
        ))}
      </Column>
    </Column>
  );
}

// Blog page skeleton
export function BlogPageSkeleton() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40">
      {/* Header */}
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <SkeletonLine width="200px" height="3rem" />
        <Column maxWidth="s" align="center">
          <SkeletonLine width="100%" height="1.5rem" />
          <SkeletonLine width="80%" height="1rem" />
        </Column>
      </Column>

      {/* Blog Posts */}
      <Column fillWidth gap="l">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${Date.now()}-${index}`} />
        ))}
      </Column>
    </Column>
  );
}

// Contact page skeleton
export function ContactPageSkeleton() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40">
      {/* Header */}
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <SkeletonLine width="200px" height="3rem" />
        <Column maxWidth="s" align="center">
          <SkeletonLine width="100%" height="1.5rem" />
          <SkeletonLine width="80%" height="1rem" />
        </Column>
      </Column>

      {/* Contact Form */}
      <Column fillWidth gap="l" maxWidth="s" horizontal="center">
        <SkeletonLine width="100%" height="3rem" />
        <SkeletonLine width="100%" height="3rem" />
        <SkeletonLine width="100%" height="8rem" />
        <SkeletonBox width="120px" height="48px" />
      </Column>
    </Column>
  );
}

// Gallery page skeleton
export function GalleryPageSkeleton() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40">
      {/* Header */}
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <SkeletonLine width="200px" height="3rem" />
        <Column maxWidth="s" align="center">
          <SkeletonLine width="100%" height="1.5rem" />
          <SkeletonLine width="80%" height="1rem" />
        </Column>
      </Column>

      {/* Gallery Grid */}
      <Column fillWidth gap="l">
        <Row wrap gap="l" horizontal="center">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBox key={`skeleton-${Date.now()}-${index}`} width="200px" height="200px" />
          ))}
        </Row>
      </Column>
    </Column>
  );
}
