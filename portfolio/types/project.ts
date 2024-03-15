import { Url } from "next/dist/shared/lib/router/router";

// Type for the projects
export interface ProjectProp {
  icon: string;
  title: string;
  tags: string[];
  description: string;
  carousel: string[];
  content: string[];
  others?: string[];
  link: Url;
}
