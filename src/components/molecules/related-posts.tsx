import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { getCmsImageUrl } from "@/lib/media-url";
import { ReadingTime } from "@/components/atoms/reading-time";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-text">
        Read next
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 rounded-xl border border-text/[0.06] bg-bg-subtle p-4 transition-colors hover:border-text/[0.12]"
          >
            {post.cover_image && (
              <div className="relative h-36 w-full overflow-hidden rounded-lg">
                <Image
                  src={getCmsImageUrl(post.cover_image.url)}
                  alt={post.cover_image.alternativeText ?? post.title}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            {post.category && (
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                {post.category.name}
              </span>
            )}
            <h4 className="text-sm font-medium leading-snug text-text transition-colors group-hover:text-accent">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="line-clamp-2 text-xs leading-relaxed text-text-muted">
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
