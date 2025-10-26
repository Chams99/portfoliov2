import { CustomMDX, ScrollToHash } from "@/components";
import { SimilarProjects } from "@/components/work/SimilarProjects";
import { ProjectMetadata } from "@/components/work/ProjectMetadata";
import { ProjectNavigation } from "@/components/work/ProjectNavigation";
import { about, baseURL, person, work } from "@/resources";
import responsiveStyles from "../work-responsive.module.scss";
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
      
      {/* Enhanced Hero Section */}
      <Column maxWidth="m" gap="24" horizontal="center" align="center" paddingY="xl">
        <SmartLink href="/work">
          <Text variant="label-strong-m" onBackground="brand-weak">← Back to Projects</Text>
        </SmartLink>
        
        <Column gap="16" horizontal="center" align="center">
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="8">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
          <Heading variant="display-strong-l" align="center" wrap="balance">
            {post.metadata.title}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance" style={{ maxWidth: "600px" }}>
            {post.metadata.summary}
          </Text>
        </Column>

        {/* Enhanced Project Metadata */}
        <Row gap="24" vertical="center" wrap horizontal="center" marginTop="16">
          {post.metadata.team && (
            <Row gap="12" vertical="center">
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
              background="neutral-alpha-weak"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              paddingX="12"
              paddingY="4"
            >
              {post.metadata.category}
            </Badge>
          )}
        </Row>

        {/* Tech Stack Tags */}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <Row gap="s" wrap horizontal="center" marginTop="16">
            {post.metadata.tags.map((tag) => (
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
        )}
      </Column>

      {/* Enhanced Project Image */}
      {post.metadata.images.length > 0 && (
        <Column fillWidth gap="16" marginBottom="32">
          <Media 
            priority 
            aspectRatio="16 / 9" 
            radius="l" 
            alt={`${post.metadata.title} - Project Screenshot`} 
            src={post.metadata.images[0]}
            style={{ 
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid var(--border-default)"
            }}
          />
        </Column>
      )}

      {/* Enhanced Action Buttons */}
      <Row horizontal="center" gap="16" wrap marginBottom="40">
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

      {/* Enhanced Content Section */}
      <Column style={{ margin: "auto" }} as="article" maxWidth="m" gap="32">
        <CustomMDX source={post.content} />
        
        {/* Enhanced Project Metadata */}
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
        
        {/* Enhanced Project Navigation */}
        <ProjectNavigation
          currentSlug={post.slug}
          currentCategory={post.metadata.category}
          currentTags={post.metadata.tags}
          allProjects={allProjects}
        />
      </Column>

      {/* Enhanced Similar Projects Section */}
      <Column fillWidth gap="40" horizontal="center" marginTop="xl" paddingY="xl">
        <Line maxWidth="l" />
        <Column gap="16" horizontal="center" align="center">
          <Heading as="h2" variant="heading-strong-xl" align="center">
            Explore More Projects
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" style={{ maxWidth: "500px" }}>
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
