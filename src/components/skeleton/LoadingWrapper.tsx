import { Column } from "@once-ui-system/core";
import { Suspense } from "react";
import styles from "./LoadingWrapper.module.scss";
import { SkeletonBase, SkeletonBox, SkeletonLine } from "./SkeletonBase";

interface LoadingWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
  className?: string;
}

// Default loading fallback
function DefaultLoadingFallback() {
  return (
    <Column fillWidth gap="l" padding="l">
      <SkeletonLine width="80%" height="2rem" />
      <SkeletonLine width="60%" height="1.5rem" />
      <SkeletonBox width="100%" height="200px" />
      <Column gap="m">
        <SkeletonLine width="100%" height="1.25rem" />
        <SkeletonLine width="90%" height="1.25rem" />
        <SkeletonLine width="70%" height="1.25rem" />
      </Column>
    </Column>
  );
}

export function LoadingWrapper({
  children,
  fallback = <DefaultLoadingFallback />,
  minHeight = "400px",
  className,
}: LoadingWrapperProps) {
  const wrapperClass = `${styles.loadingWrapper} ${className || ""}`;

  return (
    <Suspense fallback={fallback}>
      <div className={wrapperClass} style={{ minHeight }}>
        {children}
      </div>
    </Suspense>
  );
}

// Specialized loading wrappers for different content types
export function ProjectLoadingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingWrapper
      fallback={
        <Column fillWidth gap="l" padding="l">
          <SkeletonBox width="100%" height="300px" />
          <Column gap="m">
            <SkeletonLine width="80%" height="2rem" />
            <SkeletonLine width="60%" height="1.5rem" />
            <SkeletonLine width="40%" height="1rem" />
          </Column>
        </Column>
      }
    >
      {children}
    </LoadingWrapper>
  );
}

export function BlogPostLoadingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingWrapper
      fallback={
        <Column fillWidth gap="l" padding="l">
          <Column gap="m">
            <SkeletonLine width="80%" height="2.5rem" />
            <SkeletonLine width="60%" height="1.5rem" />
            <SkeletonLine width="40%" height="1rem" />
          </Column>
          <Column gap="s">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLine key={`skeleton-line-${Date.now()}-${index}`} width={index % 3 === 0 ? "60%" : "100%"} height="1.25rem" />
            ))}
          </Column>
        </Column>
      }
    >
      {children}
    </LoadingWrapper>
  );
}

export function ImageLoadingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingWrapper fallback={<SkeletonBox width="100%" height="300px" />} minHeight="300px">
      {children}
    </LoadingWrapper>
  );
}
