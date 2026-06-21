import { config } from "@/config";

type CacheEntry = {
  data: unknown;
  expiresAt: number;
};

const store = new Map<string, CacheEntry>();

function isExpired(entry: CacheEntry): boolean {
  return Date.now() > entry.expiresAt;
}

export const cache = {
  get(key: string): unknown | null {
    const entry = store.get(key);
    if (!entry) return null;
    if (isExpired(entry)) {
      store.delete(key);
      return null;
    }
    return entry.data;
  },

  set(key: string, data: unknown, ttl?: number): void {
    store.set(key, {
      data,
      expiresAt: Date.now() + (ttl ?? config.cacheTTL),
    });
  },

  has(key: string): boolean {
    const entry = store.get(key);
    if (!entry) return false;
    if (isExpired(entry)) {
      store.delete(key);
      return false;
    }
    return true;
  },

  purge(key?: string): void {
    if (key) {
      store.delete(key);
    } else {
      store.clear();
    }
  },
};
