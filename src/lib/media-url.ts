const DEFAULT_CMS_URL = "http://localhost:1337";

export function getCmsImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = process.env.NEXT_PUBLIC_CMS_URL || DEFAULT_CMS_URL;
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  return `${base.replace(/\/+$/, "")}${normalizedUrl}`;
}
