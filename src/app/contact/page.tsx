import { ContactForm } from "@/components";
import { about, baseURL, person } from "@/resources";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import styles from "./contact.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: "Contact - Chames Dhibi",
    description:
      "Get in touch with Chames Dhibi for projects, collaborations, or PFE internship opportunities",
    baseURL: baseURL,
    path: "/contact",
  });
}

export default function Contact() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="40" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/contact"
        title="Contact - Chames Dhibi"
        description="Get in touch with Chames Dhibi for projects, collaborations, or PFE internship opportunities"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth align="center" gap="16" marginBottom="40" paddingX="l">
        <Heading variant="display-strong-l" align="center">
          Get In Touch
        </Heading>
        <div className={styles.descriptionWrapper}>
          <Heading
            as="p"
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
            style={{ textAlign: "center" }}
          >
            Open to new opportunities and collaborations. Got a project or just want to chat? I'll
            respond within 24 hours.
          </Heading>
        </div>
      </Column>
      <ContactForm />
    </Column>
  );
}
