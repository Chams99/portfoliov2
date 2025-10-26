import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import {
  getAllProjects,
  getCategoriesFromProjects,
  getTechnologiesFromProjects,
} from "@/utils/serverProjectFilters";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import styles from "./work.module.scss";
import responsiveStyles from "./work-responsive.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default async function Work() {
  const projects = getAllProjects();
  const categories = getCategoriesFromProjects(projects);
  const technologies = getTechnologiesFromProjects(projects);

  return (
    <div className={responsiveStyles.workPage}>
      <Column maxWidth="m" paddingTop="8" paddingBottom="40" horizontal="center" align="center">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l" className={responsiveStyles.heroSection}>
          <Heading variant="display-strong-xl" align="center">
            All Projects
          </Heading>
          <div className={styles.descriptionWrapper}>
            <Heading
              as="p"
              variant="body-default-m"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
              className={responsiveStyles.heroDescription}
            >
              A comprehensive showcase of 15+ web and mobile applications, from AI-powered fitness
              apps to e-commerce platforms and interactive tools. Use the search and filters below to
              find exactly what you're looking for.
            </Heading>
          </div>
        </Column>
        <Projects projects={projects} categories={categories} technologies={technologies} />
      </Column>
    </div>
  );
}
