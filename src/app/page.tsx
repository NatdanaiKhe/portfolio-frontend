import { getAllPageData, getLatestBlogPosts } from "@/lib/strapi";
import { PageSections } from "./page-sections";
import { ErrorSections } from "./error-sections";
import { SITE } from "@/site.config";
import type { BlogPost } from "@/types";

// Regenerate every hour
export const revalidate = 3600;

export default async function Page() {
  try {
    const [data, latestPosts] = await Promise.all([
      getAllPageData(),
      getLatestBlogPosts(3).catch((error) => {
        console.error("Failed to fetch latest blog posts:", error);
        return [] as BlogPost[];
      }),
    ]);
    const techNames = data.techStack.map((t) => t.name).filter(Boolean);
    const socialUrls = data.contact.socials
      .map((s) => s.link)
      .filter((url): url is string => /^https?:\/\//.test(url));

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person" as const,
      name: SITE.name,
      url: SITE.url,
      jobTitle: "Full Stack Developer",
      knowsAbout: techNames,
      sameAs: socialUrls.length > 0 ? socialUrls : undefined,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <PageSections data={data} latestPosts={latestPosts} />
      </>
    );
  } catch (error) {
    console.error(error);
    return <ErrorSections />;
  }
}
