const DEFAULT_CMS_URL = "http://localhost:1337";

export function getCmsImageUrl(url: string): string {
  const base = process.env.NEXT_PUBLIC_CMS_URL || DEFAULT_CMS_URL;
  return `${base.replace(/\/+$/, "")}${url}`;
}
