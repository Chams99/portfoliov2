"use client";

import { Badge, Column, Flex, Heading, Row, Text } from "@once-ui-system/core";
import styles from "./ProjectMetadata.module.scss";

interface ProjectMetadataProps {
  category?: string;
  tags?: string[];
  publishedAt?: string;
  team?: Array<{
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
  }>;
  github?: string;
  link?: string;
  technologies?: string[];
  duration?: string;
  status?: "completed" | "in-progress" | "archived";
}

export const ProjectMetadata: React.FC<ProjectMetadataProps> = ({
  category,
  tags = [],
  publishedAt,
  team = [],
  github,
  link,
  technologies = [],
  duration,
  status = "completed",
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          background: "surface" as const,
          onBackground: "neutral-strong" as const,
        };
      case 'in-progress':
        return {
          background: "surface" as const,
          onBackground: "neutral-strong" as const,
        };
      case 'archived':
        return {
          background: "surface" as const,
          onBackground: "neutral-strong" as const,
        };
      default:
        return {
          background: "surface" as const,
          onBackground: "neutral-strong" as const,
        };
    }
  };

  return (
    <div className={styles.metadataContainer}>
      {/* Project Status and Category */}
      <Row gap="16" wrap marginBottom="24">
        {status && (
          <Badge 
            {...getStatusStyle(status)}
            textVariant="label-default-s"
            paddingX="12"
            paddingY="4"
          >
            {status.replace('-', ' ').toUpperCase()}
          </Badge>
        )}
        {category && (
          <Badge 
            background="neutral-alpha-weak"
            onBackground="neutral-strong"
            textVariant="label-default-s"
            paddingX="12"
            paddingY="4"
          >
            {category}
          </Badge>
        )}
        {publishedAt && (
          <Text variant="label-default-s" onBackground="neutral-weak">
            Published {formatDate(publishedAt)}
          </Text>
        )}
      </Row>

      {/* Tech Stack */}
      {technologies.length > 0 && (
        <Column gap="12" marginBottom="24">
          <Heading as="h3" variant="heading-strong-s">
            Technologies Used
          </Heading>
          <Row gap="s" wrap>
            {technologies.map((tech) => (
              <Badge 
                key={`tech-${tech}`}
                background="neutral-alpha-weak"
                onBackground="neutral-weak"
                textVariant="label-default-xs"
                paddingX="s"
                paddingY="2"
              >
                {tech}
              </Badge>
            ))}
          </Row>
        </Column>
      )}

      {/* Project Tags */}
      {tags.length > 0 && (
        <Column gap="12" marginBottom="24">
          <Heading as="h3" variant="heading-strong-s">
            Tags
          </Heading>
          <Row gap="s" wrap>
            {tags.map((tag) => (
              <Badge 
                key={`tag-${tag}`}
                background="neutral-alpha-weak"
                onBackground="neutral-weak"
                textVariant="label-default-xs"
                paddingX="s"
                paddingY="2"
              >
                {tag}
              </Badge>
            ))}
          </Row>
        </Column>
      )}

      {/* Project Duration */}
      {duration && (
        <Column gap="12" marginBottom="24">
          <Heading as="h3" variant="heading-strong-s">
            Project Duration
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {duration}
          </Text>
        </Column>
      )}

      {/* Team Information */}
      {team.length > 0 && (
        <Column gap="12" marginBottom="24">
          <Heading as="h3" variant="heading-strong-s">
            Team
          </Heading>
          <Column gap="s">
            {team.map((member, index) => (
              <Row key={`member-${member.name}-${index}`} gap="12" vertical="center">
                <div className={styles.avatarContainer}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={styles.avatar}
                  />
                </div>
                <Column gap="xs">
                  <Text variant="label-strong-s">{member.name}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {member.role}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Column>
      )}

      {/* Project Links */}
      {(github || link) && (
        <Column gap="12">
          <Heading as="h3" variant="heading-strong-s">
            Project Links
          </Heading>
          <Column gap="s">
            {link && (
              <Row gap="s" vertical="center">
                <div className={styles.linkIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Text variant="body-default-s" onBackground="brand-weak">
                  Live Demo Available
                </Text>
              </Row>
            )}
            {github && (
              <Row gap="s" vertical="center">
                <div className={styles.linkIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Source Code Available
                </Text>
              </Row>
            )}
          </Column>
        </Column>
      )}
    </div>
  );
};
