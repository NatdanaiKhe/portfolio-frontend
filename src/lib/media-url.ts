const DEFAULT_CMS_URL = "http://localhost:1337";

export function getCmsImageUrl(url: string): string {
  const base = DEFAULT_CMS_URL;
  return `${base.replace(/\/+$/, "")}${url}`;
}
