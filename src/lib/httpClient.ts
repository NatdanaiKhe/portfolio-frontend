import { config } from "@/config";
import { cache } from "./cache";

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

type GetOptions = {
  skipCache?: boolean;
};

function cacheKey(path: string): string {
  return `GET${path}`;
}

export async function get<T>(path: string, options?: GetOptions): Promise<T> {
  const key = cacheKey(path);

  if (!options?.skipCache) {
    const cached = cache.get(key);
    if (cached !== null) return cached as T;
  }

  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_CMS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new HttpError(
      `GET ${path} failed with status ${res.status}`,
      res.status,
    );
  }

  const json: T = await res.json();
  cache.set(key, json);
  return json;
}

export const purgeCache = cache.purge;
