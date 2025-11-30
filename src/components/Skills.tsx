"use client";

import { Column, Heading, Line, Row, Text } from "@once-ui-system/core";
import type React from "react";
import { SkillIcons } from "./SkillIcons";
import styles from "./Skills.module.scss";

interface SkillCategory {
  title: string;
  IconComponent: () => React.JSX.Element;
  skills: Array<{ name: string; IconComponent?: () => React.JSX.Element }>;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    IconComponent: SkillIcons.Code,
    skills: [
      { name: "React", IconComponent: SkillIcons.React },
      { name: "Next.js", IconComponent: SkillIcons.NextJS },
      { name: "TypeScript", IconComponent: SkillIcons.TypeScript },
      { name: "JavaScript", IconComponent: SkillIcons.JavaScript },
      { name: "Tailwind CSS", IconComponent: SkillIcons.TailwindCSS },
      { name: "HTML5", IconComponent: SkillIcons.HTML5 },
      { name: "CSS3", IconComponent: SkillIcons.CSS3 },
    ],
  },
  {
    title: "Backend Development",
    IconComponent: SkillIcons.Server,
    skills: [
      { name: "Node.js", IconComponent: SkillIcons.NodeJS },
      { name: "Express.js", IconComponent: SkillIcons.ExpressJS },
      { name: "Python", IconComponent: SkillIcons.Python },
      { name: "PHP", IconComponent: SkillIcons.PHP },
      { name: "Laravel", IconComponent: SkillIcons.Laravel },
      { name: ".NET", IconComponent: SkillIcons.DotNet },
      { name: "C#", IconComponent: SkillIcons.CSharp },
    ],
  },
  {
    title: "Mobile Development",
    IconComponent: SkillIcons.Mobile,
    skills: [
      { name: "Flutter", IconComponent: SkillIcons.Flutter },
      { name: "Dart", IconComponent: SkillIcons.Dart },
      { name: "React Native", IconComponent: SkillIcons.ReactNative },
      { name: "iOS", IconComponent: SkillIcons.iOS },
      { name: "Android", IconComponent: SkillIcons.Android },
    ],
  },
  {
    title: "Database & Cloud",
    IconComponent: SkillIcons.Database,
    skills: [
      { name: "MySQL", IconComponent: SkillIcons.MySQL },
      { name: "PostgreSQL", IconComponent: SkillIcons.PostgreSQL },
      { name: "MongoDB", IconComponent: SkillIcons.MongoDB },
      { name: "Firebase", IconComponent: SkillIcons.Firebase },
      { name: "AWS", IconComponent: SkillIcons.AWS },
      { name: "Cloud Deployment" },
    ],
  },
  {
    title: "Tools & DevOps",
    IconComponent: SkillIcons.Tool,
    skills: [
      { name: "Git", IconComponent: SkillIcons.Git },
      { name: "GitHub", IconComponent: SkillIcons.GitHub },
      { name: "VS Code", IconComponent: SkillIcons.VSCode },
      { name: "Figma", IconComponent: SkillIcons.Figma },
      { name: "Docker", IconComponent: SkillIcons.Docker },
      { name: "CI/CD", IconComponent: SkillIcons.CICD },
    ],
  },
];

const stats = [
  { number: "15+", label: "Projects Built" },
  { number: "7", label: "Tech Stacks" },
  { number: "21+", label: "Technologies" },
];

export function Skills() {
  return (
    <Column fillWidth gap="24" marginBottom="l" className={styles.skillsSection}>
      <Row fillWidth horizontal="center">
        <Line maxWidth="l" />
      </Row>

      <Column fillWidth gap="32" marginTop="40">
        <Column fillWidth align="center" gap="16" paddingX="l">
          <Heading as="h2" variant="display-strong-l" align="center">
            Technical Expertise
          </Heading>
          <div className={styles.descriptionWrapper}>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
            >
              Proficient in modern web and mobile technologies with hands-on experience building
              production-ready applications
            </Text>
          </div>
        </Column>

        <Column fillWidth paddingX="l" gap="24" marginTop="24">
          <div className={styles.skillsGrid}>
            {skillCategories.map((category) => (
              <div key={category.title} className={styles.skillCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>
                    <category.IconComponent />
                  </div>
                  <Heading as="h3" variant="heading-strong-m">
                    {category.title}
                  </Heading>
                </div>

                <div className={styles.skillsWrapper}>
                  {category.skills.map((skill) => (
                    <div key={skill.name} className={styles.skillTag}>
                      {skill.IconComponent && (
                        <div className={styles.skillIcon}>
                          <skill.IconComponent />
                        </div>
                      )}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.statsSection}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Column>
      </Column>

      <Row fillWidth horizontal="center">
        <Line maxWidth="l" />
      </Row>
    </Column>
  );
}
