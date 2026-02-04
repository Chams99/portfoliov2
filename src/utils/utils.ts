import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "@/types";

/**
 * Retrieves all MDX files from a directory.
 * @param dir - Directory path to search for MDX files
 * @returns Array of MDX file names
 * @throws Calls notFound() if directory doesn't exist
 */
function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Reads and parses an MDX file, extracting frontmatter and content.
 * @param filePath - Full path to the MDX file
 * @returns Object containing parsed metadata and content
 * @throws Calls notFound() if file doesn't exist
 */
function readMDXFile(filePath: string): { metadata: Metadata; content: string } {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    category: data.category || "",
    tags: data.tags || [],
    github: data.github || "",
    priority: data.priority || 0,
  };

  return { metadata, content };
}

/**
 * Processes all MDX files in a directory and returns their data.
 * @param dir - Directory path containing MDX files
 * @returns Array of objects with metadata, slug, and content for each file
 */
function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * Retrieves all posts/projects from a specified directory path.
 * @param customPath - Array of path segments relative to process.cwd() (default: empty array)
 * @returns Array of posts with metadata, slug, and content
 * @example
 * getPosts(["src", "app", "blog", "posts"])
 */
export function getPosts(customPath: string[] = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
