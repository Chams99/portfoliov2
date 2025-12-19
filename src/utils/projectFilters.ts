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

export function filterProjects(
  projects: ProjectWithMetadata[],
  searchQuery: string,
  selectedCategories: string[],
  selectedTechnologies: string[],
): ProjectWithMetadata[] {
  return projects.filter((project) => {
    // Search filter
    const searchMatch =
      !searchQuery ||
      project.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.metadata.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.metadata.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    // Category filter - use OR logic for multiple categories
    const categoryMatch =
      selectedCategories.length === 0 ||
      (project.metadata.category && selectedCategories.includes(project.metadata.category));

    // Technology filter
    const technologyMatch =
      selectedTechnologies.length === 0 ||
      (project.metadata.tags || []).some((tag) => selectedTechnologies.includes(tag));

    return searchMatch && categoryMatch && technologyMatch;
  });
}
