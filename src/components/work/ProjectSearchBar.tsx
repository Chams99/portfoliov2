"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./ProjectSearchBar.module.scss";

interface ProjectSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProjectSearchBar({
  onSearch,
  placeholder = "Search projects...",
  className,
}: ProjectSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className={`${styles.searchContainer} ${className || ""}`}>
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
    </div>
  );
}
