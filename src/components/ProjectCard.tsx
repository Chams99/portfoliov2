"use client";

import { AvatarGroup, Badge, Column, Flex, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import { HighQualityCarousel } from "./HighQualityCarousel";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  category,
  tags,
  publishedAt,
}) => {
  return (
    <div className={`${styles.projectCard} glass-card`}>
      <Column fillWidth gap="m">
        {/* Enhanced Image Section */}
        <div className={styles.imageSection}>
          <HighQualityCarousel images={images} title={title} />
          {category && (
            <div className={styles.categoryBadge}>
              <Badge 
                background="neutral-alpha-weak"
                onBackground="neutral-strong"
                textVariant="label-default-xs"
                paddingX="s"
                paddingY="2"
              >
                {category}
              </Badge>
            </div>
          )}
        </div>

        {/* Enhanced Content Section */}
        <Flex
          s={{ direction: "column" }}
          fillWidth
          paddingX="l"
          paddingTop="20"
          paddingBottom="24"
          gap="l"
        >
          {/* Title and Date */}
          <Column gap="12">
            {title && (
              <Flex flex={5}>
                <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                  {title}
                </Heading>
              </Flex>
            )}
            {publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {new Date(publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            )}
          </Column>

          {/* Team and Description */}
          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && (
                <Row gap="12" vertical="center">
                  <AvatarGroup avatars={avatars} size="s" reverse />
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Team
                  </Text>
                </Row>
              )}
              
              {description?.trim() && (
                <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
                  {description}
                </Text>
              )}

              {/* Tech Stack Tags */}
              {tags && tags.length > 0 && (
                <Row gap="s" wrap marginTop="8">
                  {tags.slice(0, 4).map((tag) => (
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
                  {tags.length > 4 && (
                    <Badge 
                      background="neutral-alpha-weak"
                      onBackground="neutral-weak"
                      textVariant="label-default-xs"
                      paddingX="s"
                      paddingY="2"
                    >
                      +{tags.length - 4} more
                    </Badge>
                  )}
                </Row>
              )}

              {/* Enhanced Action Buttons */}
              <div className={styles.projectActions}>
                {link && (
                  <SmartLink 
                    suffixIcon="arrowUpRightFromSquare" 
                    className={styles.actionButton}
                    href={link}
                  >
                    <Text variant="label-default-m" onBackground="brand-strong">
                      Live Demo
                    </Text>
                  </SmartLink>
                )}
                {content?.trim() && (
                  <SmartLink 
                    suffixIcon="arrowRight" 
                    className={styles.actionButton}
                    href={href}
                  >
                    <Text variant="label-default-m" onBackground="neutral-strong">
                      View Details
                    </Text>
                  </SmartLink>
                )}
              </div>
            </Column>
          )}
        </Flex>
      </Column>
    </div>
  );
};
