import { CATEGORY_FILTER_LIMIT, TECHNOLOGY_FILTER_LIMIT } from "@/constants";
import type { FilterOption, ProjectWithMetadata } from "@/types";
import { getPosts } from "./utils";

/**
 * Retrieves all projects from the projects directory, sorted by priority.
 * Projects with higher priority values appear first.
 * @returns Array of projects sorted by priority (descending)
 */
export function getAllProjects(): ProjectWithMetadata[] {
  const projects = getPosts(["src", "app", "work", "projects"]);
  return projects.sort((a, b) => {
    return (b.metadata.priority || 0) - (a.metadata.priority || 0);
  });
}

/**
 * Extracts unique categories from projects and returns filter options.
 * Categories are sorted by frequency (most common first) and limited to top N.
 * @param projects - Array of projects to extract categories from
 * @returns Array of filter options with category labels and counts
 */
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
    .slice(0, CATEGORY_FILTER_LIMIT);
}

/**
 * Extracts unique technologies/tags from projects and returns filter options.
 * Technologies are sorted by frequency (most common first) and limited to top N.
 * @param projects - Array of projects to extract technologies from
 * @returns Array of filter options with technology names and counts
 */
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
    .slice(0, TECHNOLOGY_FILTER_LIMIT);
}
