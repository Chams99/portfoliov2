import { getPosts } from "./utils";

export interface BlogPostWithMetadata {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    tags?: string[];
  };
  slug: string;
  content: string;
}

export function getAllBlogPosts(): BlogPostWithMetadata[] {
  return getPosts(["src", "app", "blog", "posts"]);
}
