"use client";

import { memo, useMemo } from "react";
import { Column, Row } from "@once-ui-system/core";
import { SkeletonBase, SkeletonLine, SkeletonBox } from "./SkeletonBase";
import styles from "./OptimizedSkeleton.module.scss";

interface OptimizedSkeletonProps {
  type?: "home" | "about" | "work" | "blog" | "contact" | "gallery" | "project" | "post";
  className?: string;
}

// Memoized skeleton components for better performance
const HomeSkeleton = memo(() => (
  <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
    <Column fillWidth horizontal="center" gap="m">
      <Column maxWidth="s" horizontal="center" align="center">
        <SkeletonBox width="200px" height="40px" className="mb-8" />
        <SkeletonLine width="90%" height="3rem" className="mb-4" />
        <SkeletonLine width="80%" height="1.5rem" className="mb-8" />
        <SkeletonBox width="180px" height="48px" className="mb-4" />
      </Column>
    </Column>
    <Column fillWidth gap="l">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonBox key={index} width="100%" height="200px" />
      ))}
    </Column>
  </Column>
));

const AboutSkeleton = memo(() => (
  <Column maxWidth="m">
    <Row fillWidth s={{ direction: "column" }} horizontal="center">
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
        <SkeletonBox width="80px" height="80px" borderRadius="50%" />
        <SkeletonLine width="100px" height="1rem" />
        <Row gap="8" wrap>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBox key={index} width="60px" height="24px" />
          ))}
        </Row>
      </Column>
      <Column className="blockAlign" flex={9} maxWidth={40}>
        <Column fillWidth gap="m" marginBottom="xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLine key={index} width="100%" height="1.25rem" />
          ))}
        </Column>
      </Column>
    </Row>
  </Column>
));

const WorkSkeleton = memo(() => (
  <Column maxWidth="m" paddingTop="24" paddingBottom="40">
    <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
      <SkeletonLine width="200px" height="3rem" />
      <Column maxWidth="s" align="center">
        <SkeletonLine width="100%" height="1.5rem" />
        <SkeletonLine width="80%" height="1rem" />
      </Column>
    </Column>
    <Column fillWidth gap="l">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonBox key={index} width="100%" height="250px" />
      ))}
    </Column>
  </Column>
));

const BlogSkeleton = memo(() => (
  <Column maxWidth="m" paddingTop="24" paddingBottom="40">
    <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
      <SkeletonLine width="200px" height="3rem" />
      <Column maxWidth="s" align="center">
        <SkeletonLine width="100%" height="1.5rem" />
        <SkeletonLine width="80%" height="1rem" />
      </Column>
    </Column>
    <Column fillWidth gap="l">
      {Array.from({ length: 4 }).map((_, index) => (
        <Column key={index} gap="m">
          <SkeletonLine width="80%" height="1.5rem" />
          <SkeletonLine width="100%" height="1.25rem" />
          <SkeletonLine width="70%" height="1rem" />
        </Column>
      ))}
    </Column>
  </Column>
));

const ProjectSkeleton = memo(() => (
  <Column maxWidth="m" paddingTop="24" paddingBottom="40">
    <Column fillWidth gap="l" marginBottom="40">
      <SkeletonLine width="80%" height="3rem" />
      <SkeletonLine width="60%" height="1.5rem" />
      <Row gap="m" wrap>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBox key={index} width="80px" height="32px" />
        ))}
      </Row>
    </Column>
    <Column fillWidth gap="l" marginBottom="40">
      <SkeletonBox width="100%" height="400px" />
      <Row gap="l" wrap>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBox key={index} width="200px" height="150px" />
        ))}
      </Row>
    </Column>
  </Column>
));

const PostSkeleton = memo(() => (
  <Column maxWidth="m" paddingTop="24" paddingBottom="40">
    <Column fillWidth gap="l" marginBottom="40">
      <SkeletonLine width="80%" height="3rem" />
      <SkeletonLine width="60%" height="1.5rem" />
      <Row gap="m" wrap>
        <SkeletonBox width="120px" height="32px" />
        <SkeletonBox width="100px" height="32px" />
      </Row>
    </Column>
    <Column fillWidth gap="m" marginBottom="40">
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonLine 
          key={index} 
          width={index % 3 === 0 ? "60%" : "100%"} 
          height="1.25rem" 
        />
      ))}
    </Column>
  </Column>
));

// Skeleton type mapping
const skeletonComponents = {
  home: HomeSkeleton,
  about: AboutSkeleton,
  work: WorkSkeleton,
  blog: BlogSkeleton,
  contact: BlogSkeleton, // Reuse blog skeleton for contact
  gallery: WorkSkeleton, // Reuse work skeleton for gallery
  project: ProjectSkeleton,
  post: PostSkeleton,
};

export const OptimizedSkeleton = memo<OptimizedSkeletonProps>(({ 
  type = "home", 
  className 
}) => {
  const SkeletonComponent = useMemo(() => {
    return skeletonComponents[type] || HomeSkeleton;
  }, [type]);

  return (
    <div className={`${styles.optimizedSkeleton} ${className || ""}`}>
      <SkeletonComponent />
    </div>
  );
});

OptimizedSkeleton.displayName = "OptimizedSkeleton";
