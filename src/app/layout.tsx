import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import { EnhancedNavigation, Footer, Header, Providers, RouteGuard, GoogleAnalytics } from "@/components";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { baseURL, dataStyle, effects, fonts, home, style } from "@/resources";
import { Background, Column, Flex, RevealFx } from "@once-ui-system/core/components";
import { Meta } from "@once-ui-system/core/modules";
import type { SpacingToken, opacity } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <GoogleAnalytics />
        <meta name="theme-color" content="#151515" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <Providers>
          <ThemeInitializer />
          <EnhancedNavigation>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <div id="aria-live-region" aria-live="polite" aria-atomic="true" className="sr-only">
              {/* Screen reader announcements */}
            </div>
            <Column
              background="page"
              fillWidth
              style={{ minHeight: "100vh" }}
              margin="0"
              padding="0"
              horizontal="center"
            >
              <RevealFx fill position="absolute">
                <Background
                  mask={{
                    x: effects.mask.x,
                    y: effects.mask.y,
                    radius: effects.mask.radius,
                    cursor: effects.mask.cursor,
                  }}
                  gradient={{
                    display: true,
                    opacity: 80, /* Increased opacity for more color */
                    x: effects.gradient.x,
                    y: effects.gradient.y,
                    width: effects.gradient.width,
                    height: effects.gradient.height,
                    tilt: effects.gradient.tilt,
                    colorStart: effects.gradient.colorStart,
                    colorEnd: effects.gradient.colorEnd,
                  }}
                  dots={{
                    display: true,
                    opacity: 40,
                    size: "2",
                    color: effects.dots.color,
                  }}
                  grid={{
                    display: false, /* Disable grid to reduce noise with glass */
                    opacity: effects.grid.opacity as opacity,
                    color: effects.grid.color,
                    width: effects.grid.width,
                    height: effects.grid.height,
                  }}
                  lines={{
                    display: false,
                    opacity: effects.lines.opacity as opacity,
                    size: effects.lines.size as SpacingToken,
                    thickness: effects.lines.thickness,
                    angle: effects.lines.angle,
                    color: effects.lines.color,
                  }}
                />
              </RevealFx>

              <Header />
              <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
                <Flex horizontal="center" fillWidth minHeight="0">
                  <main id="main-content">
                    <RouteGuard>{children}</RouteGuard>
                  </main>
                </Flex>
              </Flex>
              <Footer />
            </Column>
          </EnhancedNavigation>
        </Providers>
      </body>
    </html>
  );
}
