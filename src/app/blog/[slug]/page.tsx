import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRelatedPosts,
} from "@/lib/strapi";
import { getCmsImageUrl } from "@/lib/media-url";
import { SITE } from "@/site.config";
import { BlogPostSection } from "@/components/organisms/blog-post-section";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // ISR-first: empty array means all pages are built on demand
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const description = post.excerpt ?? "";
  const ogImage = post.cover_image
    ? getCmsImageUrl(post.cover_image.url)
    : undefined;

  return {
    title: `${post.title} — ${SITE.name}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: post.cover_image?.width ?? 1200,
              height: post.cover_image?.height ?? 630,
              alt: post.cover_image?.alternativeText ?? post.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

async function getAdjacentPosts(slug: string) {
  // Get all published posts sorted by publishedAt desc
  const { posts } = await getBlogPosts({ pageSize: 100 });
  const idx = posts.findIndex((p) => p.slug === slug);

  if (idx === -1) return { prev: null, next: null };

  return {
    // "Older" = next in the desc-sorted list (lower index means newer)
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    // "Newer" = prev in the desc-sorted list
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [{ prev, next }, related] = await Promise.all([
    getAdjacentPosts(slug),
    getRelatedPosts(post, 3),
  ]);

  return (
    <BlogPostSection post={post} prev={prev} next={next} related={related} />
  );
}
