import Link from "next/link";
import type { BlogPost, BlogCategory } from "@/types";
import { BlogCard } from "@/components/molecules/blog-card";

interface BlogListSectionProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  activeCategorySlug?: string;
  total: number;
}

export function BlogListSection({
  posts,
  categories,
  activeCategorySlug,
  total,
}: BlogListSectionProps) {
  return (
    <section className="mx-auto max-w-[760px] px-6 pt-32 pb-20 md:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter text-text md:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-text-muted">
          Thoughts on building things, code, and the craft of software.
        </p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 0 && (
        <nav
          aria-label="Filter by category"
          className="mb-10 flex flex-wrap gap-2"
        >
          <Link
            href="/blog"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategorySlug
                ? "bg-text/[0.06] text-text"
                : "text-text-muted hover:text-text"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategorySlug === cat.slug
                  ? "bg-text/[0.06] text-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Post list */}
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-text-muted">No posts yet.</p>
      )}

      {/* Post count */}
      {total > 0 && (
        <p className="mt-10 text-center text-xs text-text-faint">
          {total} {total === 1 ? "post" : "posts"}
          {activeCategorySlug ? " in this category" : ""}
        </p>
      )}
    </section>
  );
}
