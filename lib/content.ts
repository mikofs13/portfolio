import site from "@/content/site.json";
import projectData from "@/content/projects.json";

export { site };

export type PortfolioProject = {
  slug: string;
  title: string;
  status: string;
  summary: string;
  description: string[];
  stack: string[];
  presentation?: "mobile" | "web";
  preview: { src: string; alt: string };
  screenshots?: { src: string; alt: string }[];
  links: { repo?: string; live?: string };
};

export const projects: PortfolioProject[] = projectData as PortfolioProject[];
