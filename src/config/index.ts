export const config = {
  apiBaseUrl: import.meta.env.VITE_API_ENDPOINT + "/api",
  cacheTTL: (import.meta.env.VITE_CACHE_TTL as number) || 24 * 60 * 60 * 1000, // 24 hours
} as const;
