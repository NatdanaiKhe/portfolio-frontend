import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogCategories } from "@/lib/strapi";
import { SITE } from "@/site.config";
import { BlogListSection } from "@/components/organisms/blog-list-section";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Blog — ${SITE.name}`,
  description:
    "Thoughts on building things, code, and the craft of software.",
  openGraph: {
    title: `Blog — ${SITE.name}`,
    description:
      "Thoughts on building things, code, and the craft of software.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const categorySlug = category ?? undefined;

  const [{ posts, total }, categories] = await Promise.all([
    getBlogPosts({ categorySlug }),
    getBlogCategories(),
  ]);

  // If no blog posts exist at all, don't show the blog page in UI (return 404)
  if (total === 0) {
    if (!categorySlug) {
      notFound();
    }
    const allPosts = await getBlogPosts({ pageSize: 1 });
    if (allPosts.total === 0) {
      notFound();
    }
  }

  return (
    <div className="bg-bg min-h-screen">
      <BlogListSection
        posts={posts}
        categories={categories}
        activeCategorySlug={categorySlug}
        total={total}
      />
    </div>
  );
}
