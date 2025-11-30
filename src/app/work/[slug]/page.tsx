import { CustomMDX, ScrollToHash } from "@/components";
import { SimilarProjects } from "@/components/work/SimilarProjects";
import { ProjectMetadata } from "@/components/work/ProjectMetadata";
import { ProjectNavigation } from "@/components/work/ProjectNavigation";
import { about, baseURL, person, work } from "@/resources";
import responsiveStyles from "../work-responsive.module.scss";
import projectContentStyles from "./project-content.module.scss";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { getAllProjects } from "@/utils/serverProjectFilters";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Column,
  Flex,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  // Get all projects for navigation
  const allProjects = getAllProjects();

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <div className={responsiveStyles.workPage}>
      <Column as="section" maxWidth="l" horizontal="center" gap="xl">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Professional Hero Section */}
      <Column maxWidth="l" gap="32" horizontal="center" align="center" paddingY="xl">
        <SmartLink href="/work">
          <Button variant="secondary" size="s" prefixIcon="arrowLeft">
            Back to Projects
          </Button>
        </SmartLink>
        
        <Column gap="24" horizontal="center" align="center" style={{ maxWidth: "800px" }}>
          <Column gap="16" horizontal="center" align="center">
            <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="8">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
            <Heading variant="display-strong-xl" align="center" wrap="balance">
              {post.metadata.title}
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance" style={{ maxWidth: "700px", lineHeight: "1.6" }}>
              {post.metadata.summary}
            </Text>
          </Column>

          {/* Professional Project Info */}
          <Row gap="24" vertical="center" wrap horizontal="center" marginTop="24">
            {post.metadata.team && (
              <Row gap="12" vertical="center" padding="12" background="neutral-alpha-weak" radius="m">
                <AvatarGroup reverse avatars={avatars} size="s" />
                <Text variant="label-default-m" onBackground="brand-weak">
                  {post.metadata.team?.map((member, idx) => (
                    <span key={`member-${member.name}-${idx}`}>
                      {idx > 0 && (
                        <Text as="span" onBackground="neutral-weak">
                          ,{" "}
                        </Text>
                      )}
                      <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                    </span>
                  ))}
                </Text>
              </Row>
            )}
            
            {post.metadata.category && (
              <Badge 
                background="brand-alpha-weak"
                onBackground="brand-strong"
                textVariant="label-default-s"
                paddingX="m"
                paddingY="xs"
              >
                {post.metadata.category}
              </Badge>
            )}
          </Row>

          {/* Professional Tech Stack */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <Column gap="16" align="center" marginTop="24">
              <Text variant="label-strong-s" onBackground="neutral-weak">Technologies Used</Text>
              <Row gap="s" wrap horizontal="center" style={{ maxWidth: "600px" }}>
                {post.metadata.tags.map((tag) => (
                  <Badge 
                    key={`tag-${tag}`}
                    background="neutral-alpha-weak"
                    onBackground="neutral-strong"
                    textVariant="label-default-xs"
                    paddingX="12"
                    paddingY="4"
                  >
                    {tag}
                  </Badge>
                ))}
              </Row>
            </Column>
          )}
        </Column>
      </Column>

      {/* Professional Project Showcase */}
      {post.metadata.images.length > 0 && (
        <Column fillWidth gap="24" marginBottom="48">
          <Text variant="label-strong-m" onBackground="neutral-weak" align="center">Project Preview</Text>
          <Media 
            priority 
            aspectRatio="16 / 9" 
            radius="xl" 
            alt={`${post.metadata.title} - Project Screenshot`} 
            src={post.metadata.images[0]}
            style={{ 
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              border: "1px solid var(--border-strong)"
            }}
          />
        </Column>
      )}

      {/* Professional Action Buttons */}
      <Row horizontal="center" gap="20" wrap marginBottom="48">
        {post.metadata.link && (
          <Button
            href={post.metadata.link}
            variant="primary"
            size="l"
            prefixIcon="globe"
            suffixIcon="arrowUpRightFromSquare"
          >
            View Live Demo
          </Button>
        )}
        {post.metadata.github && (
          <Button
            href={post.metadata.github}
            variant="secondary"
            size="l"
            prefixIcon="github"
            suffixIcon="arrowUpRightFromSquare"
          >
            View on GitHub
          </Button>
        )}
      </Row>

      {/* Professional Content Section */}
      <Column as="article" maxWidth="l" gap="48" horizontal="center">
        <CustomMDX source={post.content} />
        
        {/* Professional Project Metadata */}
        <ProjectMetadata
          category={post.metadata.category}
          tags={post.metadata.tags}
          publishedAt={post.metadata.publishedAt}
          team={post.metadata.team}
          github={post.metadata.github}
          link={post.metadata.link}
          technologies={post.metadata.tags}
          status="completed"
        />
        
        {/* Professional Project Navigation */}
        <ProjectNavigation
          currentSlug={post.slug}
          allProjects={allProjects}
        />
      </Column>

      {/* Professional Similar Projects Section */}
      <Column fillWidth gap="48" horizontal="center" marginTop="xl" paddingY="xl" background="neutral-alpha-weak" radius="xl">
        <Line maxWidth="l" />
        <Column gap="24" horizontal="center" align="center" style={{ maxWidth: "800px" }}>
          <Heading as="h2" variant="heading-strong-xl" align="center">
            Explore More Projects
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: "600px", lineHeight: "1.6" }}>
            Discover other projects that showcase similar technologies and approaches
          </Text>
        </Column>
        <SimilarProjects
          currentSlug={post.slug}
          currentCategory={post.metadata.category}
          currentTags={post.metadata.tags}
          limit={2}
        />
      </Column>
      <ScrollToHash />
      </Column>
    </div>
  );
}
