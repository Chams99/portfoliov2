import { getPosts } from "./utils";

/**
 * Blog post with parsed metadata from MDX frontmatter.
 */
export interface BlogPostWithMetadata {
  /** Post metadata from frontmatter */
  metadata: {
    /** Post title */
    title: string;
    /** Publication date (ISO format) */
    publishedAt: string;
    /** Post summary/description */
    summary: string;
    /** Main image path */
    image?: string;
    /** Post tags */
    tags?: string[];
  };
  /** URL slug for the post */
  slug: string;
  /** MDX content */
  content: string;
}

/**
 * Retrieves all blog posts from the blog posts directory.
 * @returns Array of blog posts sorted by publication date (newest first)
 */
export function getAllBlogPosts(): BlogPostWithMetadata[] {
  return getPosts(["src", "app", "blog", "posts"]);
}
