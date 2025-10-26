import { ReactNode } from "react";
import styles from "../work/ProjectContent.module.scss";

interface ProjectContentProps {
  children: ReactNode;
}

export function ProjectContent({ children }: ProjectContentProps) {
  return (
    <div className={styles.projectContent}>
      {children}
    </div>
  );
}

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
}

export function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
