"use client";

import NotFound from "@/app/not-found";
import { protectedRoutes, routes } from "@/resources";
import { Button, Column, Flex, Heading, PasswordInput, Spinner } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      try {
        setIsRouteEnabled(false);
        setIsPasswordRequired(false);
        setIsAuthenticated(false);

        const checkRouteEnabled = () => {
          if (!pathname) return false;

          if (pathname in routes) {
            return routes[pathname as keyof typeof routes];
          }

          const dynamicRoutes = ["/blog", "/work"] as const;
          for (const route of dynamicRoutes) {
            if (pathname?.startsWith(route) && routes[route]) {
              return true;
            }
          }

          return false;
        };

        const routeEnabled = checkRouteEnabled();
        setIsRouteEnabled(routeEnabled);

        if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
          setIsPasswordRequired(true);

          try {
            const response = await fetch("/api/check-auth");
            if (response.ok) {
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error("Auth check failed:", error);
            // Default to not authenticated on error
          }
        }
      } catch (error) {
        console.error("Route guard checks failed:", error);
        // Ensure we don't block the UI violently, but maybe show error state if needed
        // For now, allowing flow to continue or showing not found might be safer depending on preference
        // but ensuring loading stops is critical.
      } finally {
        setLoading(false);
      }
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex
        fillWidth
        fillHeight
        style={{
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
        horizontal="center"
        align="center"
        className="glass-panel"
      >
        <Column align="center" gap="16">
          <div className="elegant-loader" />
        </Column>
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
