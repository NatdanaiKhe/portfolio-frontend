import { cache } from "./cache";

function buildItemsUrl(connectionString: string): string {
  return connectionString.replace("?", "/items?");
}

async function fetchRemoteVersion(): Promise<string | null> {
  const connectionString = import.meta.env.VITE_EDGE_CONFIG as
    | string
    | undefined;
  if (!connectionString) return null;

  try {
    const res = await fetch(buildItemsUrl(connectionString));
    if (!res.ok) return null;
    const data = await res.json();
    return data.cache_version ?? null;
  } catch {
    return null;
  }
}

export async function initCacheVersion(): Promise<void> {
  const remote = await fetchRemoteVersion();
  if (!remote) return;

  const local = localStorage.getItem("cache_version");
  if (local !== remote) {
    cache.purge();
    localStorage.setItem("cache_version", remote);
  }
}
