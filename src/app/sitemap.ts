import type { MetadataRoute } from "next";
import { getHome, getAbout, getBlogPosts } from "@/lib/strapi";
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

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Blog listing and posts (only include if blog posts exist)
  try {
    const { posts, total } = await getBlogPosts({ pageSize: 100 });
    if (total > 0 && posts.length > 0) {
      entries.push({
        url: `${SITE.url}/blog`,
        lastModified,
        changeFrequency: "daily",
        priority: 0.8,
      });

      for (const post of posts) {
        entries.push({
          url: `${SITE.url}/blog/${post.slug}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // CMS unreachable during build — blog posts won't be in sitemap
  }

  return entries;
}
