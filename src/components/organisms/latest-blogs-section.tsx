import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { ReadingTime } from "@/components/atoms/reading-time";
import { ArrowRight } from "lucide-react";

interface LatestBlogsSectionProps {
  posts: BlogPost[];
}

export function LatestBlogsSection({ posts }: LatestBlogsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section
      id="latest"
      className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 lg:px-24"
    >
      {/* Eyebrow */}
      <p className="mb-2 inline-block rounded-full border border-text/[0.06] bg-text/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
        Latest
      </p>

      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tighter text-text md:text-4xl">
          From the blog
        </h2>
        <Link
          href="/blog"
          className="group flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
        >
          View all posts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 rounded-xl border border-text/[0.06] bg-bg-subtle p-5 transition-colors hover:border-text/[0.12]"
          >
            {post.category && (
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                {post.category.name}
              </span>
            )}
            <h3 className="text-base font-semibold leading-snug text-text transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
            )}
            <div className="mt-auto flex items-center gap-2 text-[0.7rem] text-text-faint">
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <ReadingTime content={post.content} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
