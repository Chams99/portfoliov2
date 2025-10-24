import { Column, Row } from "@once-ui-system/core";
import classNames from "classnames";
import styles from "./SkeletonBase.module.scss";

interface SkeletonBaseProps {
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
  style?: React.CSSProperties;
}

export function SkeletonBase({ className, children, animate = true, style }: SkeletonBaseProps) {
  return (
    <div
      className={classNames(styles.skeleton, animate && styles.animate, className)}
      style={style}
    >
      {children}
    </div>
  );
}

interface SkeletonLineProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

export function SkeletonLine({
  width = "100%",
  height = "1rem",
  className,
  animate = true,
}: SkeletonLineProps) {
  return (
    <SkeletonBase
      className={classNames(styles.line, className)}
      animate={animate}
      style={{ width, height }}
    />
  );
}

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  animate?: boolean;
}

export function SkeletonBox({
  width = "100%",
  height = "100%",
  borderRadius = "0.5rem",
  className,
  animate = true,
}: SkeletonBoxProps) {
  return (
    <SkeletonBase
      className={classNames(styles.box, className)}
      animate={animate}
      style={{ width, height, borderRadius }}
    />
  );
}

interface SkeletonCircleProps {
  size?: string | number;
  className?: string;
  animate?: boolean;
}

export function SkeletonCircle({ size = "2rem", className, animate = true }: SkeletonCircleProps) {
  return (
    <SkeletonBase
      className={classNames(styles.circle, className)}
      animate={animate}
      style={{ width: size, height: size }}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
  animate?: boolean;
}

export function SkeletonCard({ className, animate = true }: SkeletonCardProps) {
  return (
    <Column
      className={classNames(styles.card, className)}
      gap="m"
      padding="l"
      border="neutral-medium"
      radius="l"
      background="surface"
    >
      <SkeletonBox height="200px" animate={animate} />
      <Column gap="s">
        <SkeletonLine width="80%" height="1.5rem" animate={animate} />
        <SkeletonLine width="60%" height="1rem" animate={animate} />
        <SkeletonLine width="40%" height="0.875rem" animate={animate} />
      </Column>
    </Column>
  );
}
