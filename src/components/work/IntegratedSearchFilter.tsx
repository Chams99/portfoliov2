"use client";

import { Check, ChevronDown, Filter, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./IntegratedSearchFilter.module.scss";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface IntegratedSearchFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categories: string[]) => void;
  onTechnologyChange: (technologies: string[]) => void;
  categories: FilterOption[];
  technologies: FilterOption[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  placeholder?: string;
  className?: string;
}

export function IntegratedSearchFilter({
  onSearch,
  onCategoryChange,
  onTechnologyChange,
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  placeholder = "Search projects...",
  className,
}: IntegratedSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Limit categories and technologies shown initially
  const maxInitialItems = 4;
  const displayedCategories = showAllCategories ? categories : categories.slice(0, maxInitialItems);
  const displayedTechnologies = showAllTechnologies
    ? technologies
    : technologies.slice(0, maxInitialItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
  };

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
    setSearchQuery("");
    onSearch("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedTechnologies.length > 0 || searchQuery.length > 0;

  const ariaExpanded = showFilters;

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`${styles.searchFilterContainer} ${className || ""}`}>
      {/* Search Bar and Filter Button Side by Side */}
      <div className={styles.searchFilterRow}>
        {/* Main Search Bar */}
        <div className={`${styles.searchInputWrapper} ${isFocused ? styles.focused : ""}`}>
          <Search className={styles.searchIcon} size={20} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.searchInput}
            aria-label="Search projects"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Clear search"
              title="Clear search (Esc)"
            >
              <X size={16} />
            </button>
          )}
          {!searchQuery && (
            <div className={styles.keyboardHint}>
              <kbd>⌘</kbd> <kbd>K</kbd>
            </div>
          )}
        </div>

        {/* Filter Button */}
        <button
          type="button"
          className={`${styles.filterToggle} ${showFilters ? styles.expanded : ""}`}
          onClick={() => setShowFilters(!showFilters)}
          {...(showFilters ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
        >
          <Filter size={16} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className={styles.activeCount}>
              {selectedCategories.length + selectedTechnologies.length + (searchQuery ? 1 : 0)}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${showFilters ? styles.rotated : ""}`}
          />
        </button>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearAllButton}
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className={styles.filtersContent}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <div className={styles.filterOptions}>
              {displayedCategories.map((category) => {
                const isActive = selectedCategories.includes(category.value);
                return (
                  <button
                    type="button"
                    key={category.value}
                    className={`${styles.filterOption} ${isActive ? styles.active : ""}`}
                    onClick={() => handleCategoryToggle(category.value)}
                    aria-label={`${isActive ? "Remove" : "Add"} ${category.label} filter`}
                  >
                    {isActive && <Check size={14} className={styles.checkIcon} />}
                    <span className={styles.optionLabel}>{category.label}</span>
                    <span className={styles.optionCount}>({category.count})</span>
                  </button>
                );
              })}
              {categories.length > maxInitialItems && (
                <button
                  type="button"
                  className={styles.showMoreButton}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  {showAllCategories
                    ? "Show less"
                    : `Show ${categories.length - maxInitialItems} more`}
                </button>
              )}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Technologies</h3>
            <div className={styles.filterOptions}>
              {displayedTechnologies.map((technology) => {
                const isActive = selectedTechnologies.includes(technology.value);
                return (
                  <button
                    type="button"
                    key={technology.value}
                    className={`${styles.filterOption} ${isActive ? styles.active : ""}`}
                    onClick={() => handleTechnologyToggle(technology.value)}
                    aria-label={`${isActive ? "Remove" : "Add"} ${technology.label} filter`}
                  >
                    {isActive && <Check size={14} className={styles.checkIcon} />}
                    <span className={styles.optionLabel}>{technology.label}</span>
                    <span className={styles.optionCount}>({technology.count})</span>
                  </button>
                );
              })}
              {technologies.length > maxInitialItems && (
                <button
                  type="button"
                  className={styles.showMoreButton}
                  onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                >
                  {showAllTechnologies
                    ? "Show less"
                    : `Show ${technologies.length - maxInitialItems} more`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
