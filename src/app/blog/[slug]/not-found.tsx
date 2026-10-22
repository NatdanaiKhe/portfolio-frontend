import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="bg-bg flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <p className="text-6xl font-bold tracking-tighter text-text-muted">
        404
      </p>
      <h1 className="text-xl font-semibold text-text">Post not found</h1>
      <p className="text-text-muted">
        The blog post you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-text/[0.06] px-5 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-text/[0.1] hover:text-text"
      >
        ← Back to home
      </Link>
    </div>
  );
}
