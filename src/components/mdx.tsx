import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type React from "react";
import type { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import { ProjectContent, ProjectSection } from "./work/ProjectContent";

import {
  Accordion,
  AccordionGroup,
  Button,
  Card,
  CodeBlock,
  Column,
  Feedback,
  Grid,
  Heading,
  HeadingLink,
  Icon,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  Row,
  SmartLink,
  Table,
  Text,
} from "@once-ui-system/core";



function CustomLink({ href, children, ...props }: React.ComponentProps<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, width, height, loading, ...props }: React.ComponentProps<"img">) {
  const imageSrc = typeof src === "string" ? src : undefined;
  const parsedWidth = width ? Number(width) : undefined;
  const parsedHeight = height ? Number(height) : undefined;

  if (!imageSrc) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={imageSrc}
      width={parsedWidth}
      height={parsedHeight}
      {...props}
    />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: React.ComponentProps<"h1">) => {
    const slug = slugify(children as string);
    const isH2 = as === "h2";
    return (
      <HeadingLink 
        marginTop={isH2 ? "32" : "24"} 
        marginBottom={isH2 ? "16" : "12"} 
        as={as} 
        id={slug} 
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: React.ComponentProps<"p">) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-s"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: React.ComponentProps<"code">) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: React.ComponentProps<"pre">) {
  // For pre tags that contain code blocks
  const child = props.children as React.ReactElement<React.ComponentProps<"code">>;

  if (child?.props?.className) {
    const { className, children } = child.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: (children as string) || "",
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList({ children }: React.ComponentProps<"ul">) {
  return <List>{children}</List>;
}

function createListItem({ children }: React.ComponentProps<"li">) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%", fontSize: "0.875rem" }}>
      {children}
    </ListItem>
  );
}

function createHR(props: React.ComponentProps<"hr">) {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

const components = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: createInlineCode,
  pre: createCodeBlock,
  ol: createList,
  ul: createList,
  li: createListItem,
  hr: createHR,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  ProjectContent,
  ProjectSection,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
