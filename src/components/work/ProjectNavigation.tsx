import { Button, Column, Flex, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./ProjectNavigation.module.scss";

interface ProjectWithMetadata {
  metadata: {
    title: string;
    summary: string;
    category?: string;
    tags?: string[];
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

interface ProjectNavigationProps {
  currentSlug: string;
  allProjects: ProjectWithMetadata[];
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentSlug,
  allProjects,
}) => {
  const currentIndex = allProjects.findIndex(project => project.slug === currentSlug);
  
  // Get previous and next projects
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  

  return (
    <div className={styles.navigationContainer}>
      {/* Previous/Next Navigation */}
      <Row gap="16" wrap className={styles.prevNextNav}>
        {previousProject && (
          <SmartLink 
            href={`/work/${previousProject.slug}`}
            className={styles.navButton}
          >
            <Column gap="xs" align="start">
              <Text variant="label-default-xs" onBackground="neutral-weak">
                Previous Project
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-strong">
                {previousProject.metadata.title}
              </Text>
            </Column>
          </SmartLink>
        )}
        
        {nextProject && (
          <SmartLink 
            href={`/work/${nextProject.slug}`}
            className={styles.navButton}
          >
            <Column gap="xs" align="end">
              <Text variant="label-default-xs" onBackground="neutral-weak">
                Next Project
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-strong">
                {nextProject.metadata.title}
              </Text>
            </Column>
          </SmartLink>
        )}
      </Row>


      {/* Back to All Projects */}
      <Row horizontal="center" className={styles.backToAll}>
        <SmartLink href="/work" className={styles.backButton}>
          <Button variant="secondary" size="m" prefixIcon="arrowLeft">
            View All Projects
          </Button>
        </SmartLink>
      </Row>
    </div>
  );
};
