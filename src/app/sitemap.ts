import type { MetadataRoute } from "next";
import { getHome, getAbout } from "@/lib/strapi";
import { SITE } from "@/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let lastModified = new Date();
  try {
    const [home, about] = await Promise.all([getHome(), getAbout()]);
    const candidates = [home.updatedAt, about.updatedAt]
      .filter(Boolean)
      .map((d) => new Date(d as string));
    if (candidates.length) {
      lastModified = new Date(Math.max(...candidates.map((d) => d.getTime())));
    }
  } catch {
    // CMS unreachable during build — keep fallback new Date()
  }

  return [
    {
      url: `${SITE.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
