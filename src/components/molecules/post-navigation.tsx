import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface PostNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid grid-cols-1 gap-4 border-t border-b border-text/[0.06] py-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-lg p-3 transition-colors hover:bg-text/[0.03]"
        >
          <span className="flex items-center gap-1 text-xs text-text-faint">
            <ArrowLeft className="h-3 w-3" />
            Older
          </span>
          <span className="text-sm font-medium text-text-muted transition-colors group-hover:text-text">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-lg p-3 text-right transition-colors hover:bg-text/[0.03]"
        >
          <span className="flex items-center gap-1 text-xs text-text-faint">
            Newer
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium text-text-muted transition-colors group-hover:text-text">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
