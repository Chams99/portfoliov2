import { Column, Row } from "@once-ui-system/core";

// Simple fallback skeleton without CSS modules to avoid chunk loading issues
export function FallbackSkeleton() {
  return (
    <Column fillWidth gap="l" padding="l">
      <div
        style={{
          width: "100%",
          height: "200px",
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          borderRadius: "0.5rem",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <Column gap="m">
        <div
          style={{
            width: "80%",
            height: "1.5rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "0.25rem",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "1rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "0.25rem",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div
          style={{
            width: "40%",
            height: "1rem",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "0.25rem",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </Column>
    </Column>
  );
}

// Add the shimmer animation to the document head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;
  document.head.appendChild(style);
}
