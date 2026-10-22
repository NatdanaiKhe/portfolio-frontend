import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { getCmsImageUrl } from "@/lib/media-url";
import { ReadingTime } from "@/components/atoms/reading-time";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-row items-start gap-5 border-b border-text/[0.06] py-7 transition-colors first:pt-0"
    >
      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-xl font-semibold leading-snug tracking-tight text-text transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
            {post.excerpt}
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-text-faint">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <ReadingTime content={post.content} />
          {post.category && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium uppercase tracking-wider">
                {post.category.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      {post.cover_image && (
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-32">
          <Image
            src={getCmsImageUrl(post.cover_image.url)}
            alt={post.cover_image.alternativeText ?? post.title}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      )}
    </Link>
  );
}
