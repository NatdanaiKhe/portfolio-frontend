export function getMediaUrl(
  url?: string | null,
  apiEndpoint = import.meta.env.VITE_API_ENDPOINT,
): string {
  if (!url || !url.startsWith("/") || url.startsWith("//") || !apiEndpoint) {
    return url ?? "";
  }

  return `${apiEndpoint.replace(/\/+$/, "")}${url}`;
}

export function getCmsImageProps(
  url?: string | null,
  apiEndpoint = import.meta.env.VITE_API_ENDPOINT,
) {
  return {
    src: getMediaUrl(url, apiEndpoint),
    referrerPolicy: "no-referrer" as const,
  };
}
