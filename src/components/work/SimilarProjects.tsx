import { ProjectCard } from "@/components";
import { getAllProjects } from "@/utils/serverProjectFilters";
import { Column } from "@once-ui-system/core";

interface SimilarProjectsProps {
  currentSlug: string;
  currentCategory?: string;
  currentTags?: string[];
  limit?: number;
}

export function SimilarProjects({
  currentSlug,
  currentCategory,
  currentTags = [],
  limit = 2,
}: SimilarProjectsProps) {
  let allProjects = getAllProjects();

  allProjects = allProjects.filter((post) => post.slug !== currentSlug);

  const scoredProjects = allProjects.map((post) => {
    let score = 0;

    if (currentCategory && post.metadata.category === currentCategory) {
      score += 10;
    }

    if (currentTags.length > 0 && post.metadata.tags) {
      const matchingTags = currentTags.filter((tag) => post.metadata.tags?.includes(tag));
      score += matchingTags.length * 3;
    }

    return { post, score };
  });

  const sortedProjects = scoredProjects
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (
        new Date(b.post.metadata.publishedAt).getTime() -
        new Date(a.post.metadata.publishedAt).getTime()
      );
    });

  const relatedProjects =
    sortedProjects.length > 0
      ? sortedProjects.slice(0, limit).map((item) => item.post)
      : allProjects
          .sort(
            (a, b) =>
              new Date(b.metadata.publishedAt).getTime() -
              new Date(a.metadata.publishedAt).getTime(),
          )
          .slice(0, limit);

  return (
    <Column fillWidth gap="xl" paddingX="l">
      {relatedProjects.map((post, index) => (
        <ProjectCard
          priority={false}
          key={post.slug}
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
      ))}
    </Column>
  );
}
