import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix workspace root warning
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],

  // Enable ESLint during builds for better code quality
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Optimize images with high quality
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimize SASS compilation
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },

  // Critical: Modularize imports to reduce bundle size
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },

  // Optimize for faster development with Turbopack
  turbopack: {
    rules: {
      "*.scss": {
        loaders: ["sass-loader"],
        as: "*.css",
      },
      "*.module.scss": {
        loaders: ["sass-loader"],
        as: "*.module.css",
      },
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Add security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Add compression and optimization
  compress: true,
  poweredByHeader: false,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["@once-ui-system/core", "react-icons", "lucide-react"],
  },

  // Optimize webpack for faster builds
  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching for faster rebuilds
    if (dev) {
      config.cache = {
        type: "filesystem",
      };

      // Skip type checking in webpack for faster builds
      config.infrastructureLogging = {
        level: "error",
      };
    }

    // Reduce module resolution time
    config.resolve.modules = ["node_modules"];

    // Fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }

    // Handle font loading errors gracefully - use built-in Next.js font handling

    return config;
  },
};

export default withMDX(nextConfig);
