import Image from "next/image";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { getCmsImageUrl } from "@/lib/media-url";
import { ReadingTime } from "@/components/atoms/reading-time";
import { ViewCounter } from "@/components/atoms/view-counter";
import { BlogContent } from "@/components/blocks-renderer";
import { TableOfContents } from "@/components/molecules/table-of-contents";
import { ShareButtons } from "@/components/molecules/share-buttons";
import { PostNavigation } from "@/components/molecules/post-navigation";
import { RelatedPosts } from "@/components/molecules/related-posts";

interface BlogPostSectionProps {
  post: BlogPost;
  prev: BlogPost | null;
  next: BlogPost | null;
  related: BlogPost[];
}

export function BlogPostSection({
  post,
  prev,
  next,
  related,
}: BlogPostSectionProps) {
  return (
    <article className="reading-bg min-h-screen">
      <div className="mx-auto max-w-[1100px] px-6 pt-32 pb-20 md:px-8">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-[700px]">
          {post.category && (
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
              {post.category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-text-faint">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <ReadingTime content={post.content} />
            <span aria-hidden="true">·</span>
            <ViewCounter
              documentId={post.documentId}
              initialCount={post.view_count}
            />
          </div>
        </header>

        {/* Cover image */}
        {post.cover_image && (
          <div className="relative mx-auto mb-12 aspect-[16/9] max-w-[700px] overflow-hidden rounded-2xl">
            <Image
              src={getCmsImageUrl(post.cover_image.url)}
              alt={post.cover_image.alternativeText ?? post.title}
              fill
              sizes="700px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content + TOC layout */}
        <div className="mx-auto flex max-w-[1100px] gap-12">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="prose-blog">
              <BlogContent content={post.content} />
            </div>

            {/* Share */}
            <div className="mt-12 border-t border-text/[0.06] pt-6">
              <ShareButtons />
            </div>
          </div>

          {/* TOC sidebar */}
          <aside className="sticky top-28 hidden w-56 shrink-0 self-start lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Post navigation */}
        <div className="mx-auto mt-16 max-w-[700px]">
          <PostNavigation prev={prev} next={next} />
        </div>

        {/* Related posts */}
        <div className="mx-auto mt-16 max-w-[700px]">
          <RelatedPosts posts={related} />
        </div>
      </div>
    </article>
  );
}
