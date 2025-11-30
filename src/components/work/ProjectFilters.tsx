"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import styles from "./ProjectFilters.module.scss";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ProjectFiltersProps {
  categories: FilterOption[];
  technologies: FilterOption[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  onCategoryChange: (categories: string[]) => void;
  onTechnologyChange: (technologies: string[]) => void;
}

export function ProjectFilters({
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  onCategoryChange,
  onTechnologyChange,
}: ProjectFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleTechnologyToggle = (technology: string) => {
    if (selectedTechnologies.includes(technology)) {
      onTechnologyChange(selectedTechnologies.filter((t) => t !== technology));
    } else {
      onTechnologyChange([...selectedTechnologies, technology]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    onTechnologyChange([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTechnologies.length > 0;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <button className={styles.toggleButton} onClick={() => setIsExpanded(!isExpanded)}>
          <Filter size={18} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className={styles.activeCount}>
              {selectedCategories.length + selectedTechnologies.length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            className={styles.clearButton}
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            <X size={16} />
            Clear all
          </button>
        )}
      </div>

      {isExpanded && (
        <div className={styles.filtersContent}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <div className={styles.filterOptions}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`${styles.filterOption} ${
                    selectedCategories.includes(category.value) ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryToggle(category.value)}
                >
                  <span className={styles.optionLabel}>{category.label}</span>
                  <span className={styles.optionCount}>({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Technologies</h3>
            <div className={styles.filterOptions}>
              {technologies.map((technology) => (
                <button
                  key={technology.value}
                  className={`${styles.filterOption} ${
                    selectedTechnologies.includes(technology.value) ? styles.active : ""
                  }`}
                  onClick={() => handleTechnologyToggle(technology.value)}
                >
                  <span className={styles.optionLabel}>{technology.label}</span>
                  <span className={styles.optionCount}>({technology.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
