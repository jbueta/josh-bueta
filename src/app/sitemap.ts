import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/resume`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
