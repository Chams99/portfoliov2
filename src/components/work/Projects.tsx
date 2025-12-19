"use client";

import { ProjectCard } from "@/components";
import type { ProjectWithMetadata } from "@/utils/projectFilters";
import { filterProjects } from "@/utils/projectFilters";
import { Column, Line } from "@once-ui-system/core";
import { useMemo, useState } from "react";
import { type FilterOption, IntegratedSearchFilter } from "./IntegratedSearchFilter";
import styles from "./ProjectsFilters.module.scss";

interface ProjectsProps {
  projects: ProjectWithMetadata[];
  categories: FilterOption[];
  technologies: FilterOption[];
  range?: [number, number?];
  exclude?: string[];
  showFilters?: boolean;
}

export function Projects({
  projects: allProjects,
  categories,
  technologies,
  range,
  exclude,
  showFilters = true,
}: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    let projects = allProjects;

    // Exclude by slug (exact match)
    if (exclude && exclude.length > 0) {
      projects = projects.filter((post) => !exclude.includes(post.slug));
    }

    // Apply search and filters
    const filtered = filterProjects(
      projects,
      searchQuery,
      selectedCategories,
      selectedTechnologies,
    );

    // Sort by quality first (priority), then by published date (newest first)
    return filtered.sort((a, b) => {
      const aPriority = a.metadata.priority ?? 0;
      const bPriority = b.metadata.priority ?? 0;

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });
  }, [allProjects, exclude, searchQuery, selectedCategories, selectedTechnologies]);

  const displayedProjects = range
    ? filteredProjects.slice(range[0] - 1, range[1] ?? filteredProjects.length)
    : filteredProjects;

  return (
    <Column fillWidth gap="l" marginBottom="40" paddingX="l">
      {showFilters && (
        <Column gap="l" marginBottom="s" align="center">
          <IntegratedSearchFilter
            onSearch={setSearchQuery}
            onCategoryChange={setSelectedCategories}
            onTechnologyChange={setSelectedTechnologies}
            categories={categories}
            technologies={technologies}
            selectedCategories={selectedCategories}
            selectedTechnologies={selectedTechnologies}
            placeholder="Search projects by title, description, or technology..."
          />

          {/* Results count */}
          <div className={styles.resultsCount}>
            {displayedProjects.length} project{displayedProjects.length !== 1 ? "s" : ""} found
            {(searchQuery || selectedCategories.length > 0 || selectedTechnologies.length > 0) &&
              ` (filtered from ${allProjects.length} total)`}
          </div>
        </Column>
      )}

      {displayedProjects.length === 0 ? (
        <Column align="center" gap="m" paddingY="xl">
          <div className={styles.noResultsContainer}>
            <p className={styles.noResultsText}>No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
                setSelectedTechnologies([]);
              }}
              className={styles.clearFiltersButton}
            >
              Clear all filters
            </button>
          </div>
        </Column>
      ) : (
        displayedProjects.map((post, index) => (
          <Column key={post.slug} gap="xl">
            <ProjectCard
              priority={index < 2}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
              link={post.metadata.link || ""}
              category={post.metadata.category}
              tags={post.metadata.tags}
              publishedAt={post.metadata.publishedAt}
            />
            {index < displayedProjects.length - 1 && <Line maxWidth="l" />}
          </Column>
        ))
      )}
    </Column>
  );
}
