import { getPosts } from "./utils";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ProjectWithMetadata {
  metadata: {
    title: string;
    summary: string;
    category?: string;
    tags?: string[];
    // Higher priority means the project appears earlier in listings.
    // Defaults to 0 when not set in frontmatter.
    priority?: number;
    publishedAt: string;
    images: string[];
    team?: Array<{
      name: string;
      role: string;
      avatar: string;
      linkedIn: string;
    }>;
    link?: string;
  };
  slug: string;
  content: string;
}

export function getAllProjects(): ProjectWithMetadata[] {
  const projects = getPosts(["src", "app", "work", "projects"]);
  return projects.sort((a, b) => {
    return (b.metadata.priority || 0) - (a.metadata.priority || 0);
  });
}

export function getCategoriesFromProjects(projects: ProjectWithMetadata[]): FilterOption[] {
  const categoryCounts = projects.reduce(
    (acc, project) => {
      const category = project.metadata.category;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Define proper labels for categories
  const categoryLabels: Record<string, string> = {
    web: "Web Applications",
    mobile: "Mobile Apps", 
    business: "Business Websites",
    ecommerce: "E-commerce",
    tool: "Web Tools",
    game: "Games"
  };

  return Object.entries(categoryCounts)
    .map(([value, count]) => ({
      value,
      label: categoryLabels[value] || value.charAt(0).toUpperCase() + value.slice(1),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Limit to top 8 categories to reduce overwhelming UI
}

export function getTechnologiesFromProjects(projects: ProjectWithMetadata[]): FilterOption[] {
  const technologyCounts = projects.reduce(
    (acc, project) => {
      const tags = project.metadata.tags || [];
      for (const tag of tags) {
        acc[tag] = (acc[tag] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(technologyCounts)
    .map(([value, count]) => ({
      value,
      label: value,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12); // Limit to top 12 technologies to reduce overwhelming UI
}
