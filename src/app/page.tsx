import { Mailchimp, Skills } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, person, routes } from "@/resources";
import { getAllBlogPosts } from "@/utils/serverBlogFilters";
import {
  getAllProjects,
  getCategoriesFromProjects,
  getTechnologiesFromProjects,
} from "@/utils/serverProjectFilters";
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const projects = getAllProjects();
  const categories = getCategoriesFromProjects(projects);
  const technologies = getTechnologiesFromProjects(projects);
  const blogPosts = getAllBlogPosts();
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      {/* Featured Projects Section */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth horizontal="center">
          <Line maxWidth="l" />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Featured Projects
            </Heading>
          </Row>
          <Column flex={3} paddingX="20" gap="16">
            <Text variant="body-default-l" onBackground="neutral-weak">
              A curated selection of my best work showcasing expertise in full-stack development,
              modern web technologies, and innovative solutions.
            </Text>
          </Column>
        </Row>
      </Column>

      {/* Best Projects - Top 4 */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects
          projects={projects}
          categories={categories}
          technologies={technologies}
          range={[1, 4]}
          showFilters={false}
        />
      </RevealFx>

      {/* View All Projects Button */}
      <RevealFx translateY="8" delay={0.8}>
        <Column fillWidth horizontal="center" paddingY="32">
          <Button
            id="view-all-projects"
            data-border="rounded"
            href="/work"
            variant="secondary"
            size="l"
            weight="default"
            arrowIcon
          >
            View All Projects
          </Button>
        </Column>
      </RevealFx>

      {/* Skills Section */}
      <RevealFx translateY="16" delay={1.0}>
        <Skills />
      </RevealFx>

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth horizontal="center">
            <Line maxWidth="l" />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts posts={blogPosts} range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth horizontal="center">
            <Line maxWidth="l" />
          </Row>
        </Column>
      )}

      <Mailchimp />
    </Column>
  );
}
