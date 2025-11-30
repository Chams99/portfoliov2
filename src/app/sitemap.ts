import { baseURL, routes as routesConfig } from "@/resources";
import { getPosts } from "../utils/utils";
import type { MetadataRoute } from "next";

type PostWithMetadata = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Array<{
      name: string;
      role: string;
      avatar: string;
      linkedIn: string;
    }>;
    link?: string;
    category?: string;
    tags?: string[];
    github?: string;
  };
  slug: string;
  content: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get blog posts dynamically
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post: PostWithMetadata) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Get work projects dynamically
  const works = getPosts(["src", "app", "work", "projects"]).map((post: PostWithMetadata) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Get active routes from config
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  // Create static routes with appropriate priorities
  const routes = activeRoutes.map((route) => {
    let priority = 0.5;
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" =
      "monthly";

    // Set priority and change frequency based on route
    if (route === "/") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (route === "/about") {
      priority = 0.9;
      changeFrequency = "monthly";
    } else if (route === "/work") {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route === "/contact") {
      priority = 0.8;
      changeFrequency = "monthly";
    } else if (route === "/blog") {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (route === "/gallery") {
      priority = 0.7;
      changeFrequency = "monthly";
    }

    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    };
  });

  // Add project demos and important static assets
  const projectDemos = [
    {
      url: `${baseURL}/ChamsShop`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/chicken`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/Energy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/fitness_app`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/messenger_app`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/Property`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/restaurents`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/typing-game`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/wallpaper`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseURL}/white`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Add additional important pages that might not be in routes config
  const additionalPages = [
    {
      url: `${baseURL}/sitemap.xml`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
    {
      url: `${baseURL}/robots.txt`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.1,
    },
  ];

  return [...routes, ...blogs, ...works, ...projectDemos, ...additionalPages];
}
