import { getAllPageData } from "@/lib/strapi";
import { PageSections } from "./page-sections";
import { ErrorSections } from "./error-sections";
import { SITE } from "@/site.config";

// Regenerate every hour
export const revalidate = 3600;

export default async function Page() {
  try {
    const data = await getAllPageData();
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
        <PageSections data={data} />
      </>
    );
  } catch (error) {
    console.error(error);
    return <ErrorSections />;
  }
}
