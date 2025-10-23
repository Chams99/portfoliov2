import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import styles from "./work.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40" horizontal="center">
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
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <Heading variant="display-strong-l" align="center">
          All Projects
        </Heading>
        <div className={styles.descriptionWrapper}>
          <Heading
            as="p"
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
            style={{ textAlign: 'center' }}
          >
            A comprehensive showcase of 15+ web and mobile applications, 
            from AI-powered fitness apps to e-commerce platforms and interactive tools.
          </Heading>
        </div>
      </Column>
      <Projects />
    </Column>
  );
}
