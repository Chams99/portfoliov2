import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "edge";

// Reduced timeout for faster responses in development
const FETCH_TIMEOUT = 3000; // 3 seconds

// Cache for font data to avoid repeated fetches
let fontCache: ArrayBuffer | null | undefined = undefined;

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";

  async function loadGoogleFont(font: string): Promise<ArrayBuffer | null> {
    // Return cached font if available
    if (fontCache !== undefined) {
      return fontCache;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font}`;
      const css = await (await fetch(fontUrl, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })).text();
      clearTimeout(timeoutId);
      
      const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

      if (resource) {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), FETCH_TIMEOUT);
        
        const response = await fetch(resource[1], { 
          signal: controller2.signal 
        });
        clearTimeout(timeoutId2);
        
        if (response.status == 200) {
          const buffer = await response.arrayBuffer();
          fontCache = buffer; // Cache the font
          return buffer;
        }
      }

      throw new Error("failed to load font data");
    } catch (error) {
      console.warn("Font loading skipped (using system fonts):", error instanceof Error ? error.message : "Unknown error");
      // Cache null to avoid retrying
      fontCache = null;
      return null;
    }
  }

  // Load font with fallback (now cached)
  const fontData = await loadGoogleFont("Geist:wght@400");
  const fontConfig = fontData ? [
    {
      name: "Geist",
      data: fontData,
      style: "normal" as const,
    },
  ] : [];

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "6rem",
        background: "#151515",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "4rem",
          fontStyle: "normal",
          color: "white",
          fontFamily: fontData ? "Geist" : "system-ui, -apple-system, sans-serif",
        }}
      >
        <span
          style={{
            padding: "1rem",
            fontSize: "6rem",
            lineHeight: "8rem",
            letterSpacing: "-0.05em",
            whiteSpace: "wrap",
            textWrap: "balance",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <img
            alt={`${person.name} avatar`}
            src={baseURL + person.avatar}
            style={{
              width: "12rem",
              height: "12rem",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontSize: "4.5rem",
                lineHeight: "4.5rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
                opacity: "0.6",
              }}
            >
              {person.role}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: fontConfig,
    },
  );
}
