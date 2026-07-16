import type { MetadataRoute } from "next";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/payroll",
    "/recruitment",
    "/consulting",
    "/jobs",
    "/submit-cv",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const jobRoutes = jobs.map((j) => ({
    url: `${base}/jobs/${j.slug}`,
    lastModified: new Date(j.postedISO),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...jobRoutes];
}
