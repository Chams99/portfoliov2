"use client";

import { Column, Row } from "@once-ui-system/core";

// Inline skeleton components that don't rely on CSS modules
// This prevents chunk loading issues with Turbopack

const shimmerKeyframes = `
  @keyframes shimmer {
    0% { 
      background-position: -200% 0;
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% { 
      background-position: 200% 0;
      opacity: 0.6;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }
  
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-styles')) {
  const style = document.createElement('style');
  style.id = 'skeleton-styles';
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

// Add minimum delay for skeleton visibility
const MINIMUM_LOADING_TIME = 800; // 800ms minimum loading time

// Enhanced skeleton with modern animations
export function EnhancedSkeleton({ 
  width = "100%", 
  height = "1rem", 
  borderRadius = "0.25rem",
  className,
  variant = "shimmer"
}: InlineSkeletonProps & { variant?: "shimmer" | "pulse" | "wave" | "glow" }) {
  const getAnimationStyle = () => {
    switch (variant) {
      case "pulse":
        return {
          background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 50%, #f0f0f0 100%)",
          animation: "pulse 2s ease-in-out infinite",
        };
      case "wave":
        return {
          background: "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
          animation: "wave 2s ease-in-out infinite",
          position: "relative" as const,
          overflow: "hidden",
        };
      case "glow":
        return {
          background: "linear-gradient(45deg, #f0f0f0 0%, #e8e8e8 50%, #f0f0f0 100%)",
          animation: "glow 2s ease-in-out infinite",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        };
      default:
        return {
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        };
    }
  };

  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        opacity: 0.8,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform, opacity",
        ...getAnimationStyle(),
      }}
    />
  );
}

interface InlineSkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export function InlineSkeleton({ 
  width = "100%", 
  height = "1rem", 
  borderRadius = "0.25rem",
  className 
}: InlineSkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}

export function InlineSkeletonCard({ variant = "shimmer" }: { variant?: "shimmer" | "pulse" | "wave" | "glow" }) {
  return (
    <Column 
      gap="m" 
      padding="l"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "0.75rem",
        minHeight: "320px",
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Image skeleton with overlay effect */}
      <div style={{ position: "relative" }}>
        <EnhancedSkeleton width="100%" height="200px" borderRadius="0.5rem" variant={variant} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
            animation: "shimmer 2s ease-in-out infinite",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      
      {/* Content skeleton with staggered animation */}
      <Column gap="s">
        <EnhancedSkeleton 
          width="80%" 
          height="1.5rem" 
          variant={variant}
        />
        <EnhancedSkeleton 
          width="60%" 
          height="1rem" 
          variant={variant}
        />
        <EnhancedSkeleton 
          width="40%" 
          height="1rem" 
          variant={variant}
        />
      </Column>
      
      {/* Tags skeleton */}
      <Row gap="s" wrap>
        <EnhancedSkeleton width="60px" height="24px" borderRadius="12px" variant={variant} />
        <EnhancedSkeleton width="80px" height="24px" borderRadius="12px" variant={variant} />
        <EnhancedSkeleton width="70px" height="24px" borderRadius="12px" variant={variant} />
      </Row>
    </Column>
  );
}

export function InlineSkeletonCircle({ size = "2rem" }: { size?: string | number }) {
  return (
    <InlineSkeleton 
      width={size} 
      height={size} 
      borderRadius="50%" 
    />
  );
}

// Page-specific inline skeletons with modern animations
export function InlineHomeSkeleton() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      {/* Hero Section with staggered animations */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <EnhancedSkeleton 
            width="200px" 
            height="40px" 
            variant="pulse"
          />
          <EnhancedSkeleton 
            width="90%" 
            height="3rem" 
            variant="shimmer"
          />
          <EnhancedSkeleton 
            width="80%" 
            height="1.5rem" 
            variant="wave"
          />
          <EnhancedSkeleton 
            width="180px" 
            height="48px" 
            variant="glow"
          />
        </Column>
      </Column>
      
      {/* Project Cards with different variants */}
      <Column fillWidth gap="l">
        {Array.from({ length: 4 }).map((_, index) => (
          <InlineSkeletonCard 
            key={index} 
            variant={["shimmer", "pulse", "wave", "glow"][index % 4] as any}
          />
        ))}
      </Column>
    </Column>
  );
}

export function InlineAboutSkeleton() {
  return (
    <Column maxWidth="m">
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {/* Avatar Section with modern effects */}
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
          <div style={{ position: "relative" }}>
            <EnhancedSkeleton 
              width="80px" 
              height="80px" 
              borderRadius="50%" 
              variant="pulse"
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                animation: "shimmer 3s linear infinite",
              }}
            />
          </div>
          <EnhancedSkeleton width="100px" height="1rem" variant="wave" />
          <Row gap="8" wrap>
            {Array.from({ length: 3 }).map((_, index) => (
              <EnhancedSkeleton 
                key={index} 
                width="60px" 
                height="24px" 
                variant="glow"
              />
            ))}
          </Row>
        </Column>
        
        {/* Content Section with staggered animations */}
        <Column className="blockAlign" flex={9} maxWidth={40}>
          <Column fillWidth gap="m" marginBottom="xl">
            {Array.from({ length: 3 }).map((_, index) => (
              <EnhancedSkeleton 
                key={index} 
                width="100%" 
                height="1.25rem" 
                variant="shimmer"
              />
            ))}
          </Column>
        </Column>
      </Row>
    </Column>
  );
}

export function InlineWorkSkeleton() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40">
      {/* Header with modern effects */}
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <EnhancedSkeleton 
          width="200px" 
          height="3rem" 
          variant="shimmer"
        />
        <Column maxWidth="s" align="center">
          <EnhancedSkeleton 
            width="100%" 
            height="1.5rem" 
            variant="wave"
          />
          <EnhancedSkeleton 
            width="80%" 
            height="1rem" 
            variant="pulse"
          />
        </Column>
      </Column>
      
      {/* Project Grid with advanced animations */}
      <Column fillWidth gap="l">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <InlineSkeletonCard 
              variant={["shimmer", "pulse", "wave", "glow", "shimmer", "pulse"][index] as any}
            />
          </div>
        ))}
      </Column>
    </Column>
  );
}
