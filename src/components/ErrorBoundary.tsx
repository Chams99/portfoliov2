"use client";

import React from "react";
import { Button, Column, Heading, Text } from "@once-ui-system/core";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <Column
          fillWidth
          horizontal="center"
          vertical="center"
          padding="xl"
          gap="m"
          style={{ minHeight: "50vh" }}
        >
          <Heading variant="display-strong-s" onBackground="neutral-strong">
            Something went wrong
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </Text>
          <Button
            variant="primary"
            size="m"
            onClick={() => window.location.reload()}
            prefixIcon="refresh"
          >
            Refresh Page
          </Button>
        </Column>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error("Error caught by useErrorHandler:", error, errorInfo);
  };
}
