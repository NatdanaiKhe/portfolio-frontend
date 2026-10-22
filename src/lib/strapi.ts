import type {
  HomeData,
  AboutType,
  TechStackType,
  ProjectType,
  ContactType,
  ExperienceType,
  BlogPost,
  BlogCategory,
} from "@/types";

function cmsUrl(): string {
  return (process.env.CMS_URL ?? "http://localhost:1337").replace(/\/+$/, "");
}

function cmsToken(): string {
  return process.env.CMS_TOKEN ?? "";
}

type StrapiSingle<T> = { data: T; meta?: object };
type StrapiCollection<T> = { data: T[]; meta?: { pagination?: object } };

async function fetchFromCMS<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = cmsToken();
  const res = await fetch(`${cmsUrl()}/api${path}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `CMS fetch failed: ${path} → ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

// --- Single types ---

export async function getHome(): Promise<HomeData> {
  const res = await fetchFromCMS<StrapiSingle<HomeData>>("/home?populate=*");
  return res.data;
}

export async function getAbout(): Promise<AboutType> {
  const res = await fetchFromCMS<StrapiSingle<AboutType>>("/about?populate=*");
  return res.data;
}

export async function getContact(): Promise<ContactType> {
  const res = await fetchFromCMS<StrapiSingle<ContactType>>(
    "/contact?populate[socials][populate]=icon",
  );
  return res.data;
}

// --- Collection types ---

export async function getTechStack(): Promise<TechStackType[]> {
  const res = await fetchFromCMS<StrapiCollection<TechStackType>>(
    "/tech-stacks?populate=*",
  );
  return res.data;
}

export async function getProjects(): Promise<ProjectType[]> {
  const res = await fetchFromCMS<StrapiCollection<ProjectType>>(
    "/projects?populate=*",
  );
  return res.data;
}

export async function getExperience(): Promise<ExperienceType[]> {
  const res = await fetchFromCMS<StrapiCollection<ExperienceType>>(
    "/experiences?populate=*",
  );
  return res.data;
}

// --- Aggregated (used by page.tsx) ---

export async function getAllPageData() {
  const [home, about, techStack, projects, experience, contact] =
    await Promise.all([
      getHome(),
      getAbout(),
      getTechStack(),
      getProjects(),
      getExperience(),
      getContact(),
    ]);

  return { home, about, techStack, projects, experience, contact };
}

// --- Blog fetchers ---

interface BlogPostsResult {
  posts: BlogPost[];
  total: number;
}

export async function getBlogPosts(opts?: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
}): Promise<BlogPostsResult> {
  try {
    const { page = 1, pageSize = 10, categorySlug } = opts ?? {};
    const params = new URLSearchParams();
    params.set("populate[category]", "*");
    params.set("populate[cover_image]", "true");
    params.set("populate[tags]", "*");
    params.set("sort", "publishedAt:desc");
    params.set("pagination[page]", String(page));
    params.set("pagination[pageSize]", String(pageSize));
    if (categorySlug) {
      params.set("filters[category][slug][$eq]", categorySlug);
    }

    const res = await fetchFromCMS<{
      data: BlogPost[];
      meta: { pagination: { total: number } };
    }>(`/blog-posts?${params.toString()}`);

    return {
      posts: res.data ?? [],
      total: res.meta?.pagination?.total ?? 0,
    };
  } catch (error) {
    console.error("getBlogPosts error:", error);
    return {
      posts: [],
      total: 0,
    };
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const params = new URLSearchParams();
    params.set("filters[slug][$eq]", slug);
    params.set("populate", "*");

    const res = await fetchFromCMS<{ data: BlogPost[] }>(
      `/blog-posts?${params.toString()}`,
    );

    return res.data && res.data.length > 0 ? res.data[0] : null;
  } catch (error) {
    console.error("getBlogPostBySlug error:", error);
    return null;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const res = await fetchFromCMS<{ data: BlogCategory[] }>(
      "/blog-categories?sort=name:asc",
    );
    return res.data ?? [];
  } catch (error) {
    console.error("getBlogCategories error:", error);
    return [];
  }
}

export async function getRelatedPosts(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  if (!post.category?.id) return [];
  try {
    const params = new URLSearchParams();
    params.set("filters[category][id][$eq]", String(post.category.id));
    params.set("filters[slug][$ne]", post.slug);
    params.set("populate[cover_image]", "true");
    params.set("populate[category]", "*");
    params.set("sort", "publishedAt:desc");
    params.set("pagination[limit]", String(limit));

    const res = await fetchFromCMS<{ data: BlogPost[] }>(
      `/blog-posts?${params.toString()}`,
    );
    return res.data ?? [];
  } catch (error) {
    console.error("getRelatedPosts error:", error);
    return [];
  }
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams();
    params.set("sort", "publishedAt:desc");
    params.set("pagination[limit]", String(limit));
    params.set("populate[cover_image]", "true");
    params.set("populate[category]", "*");

    const res = await fetchFromCMS<{ data: BlogPost[] }>(
      `/blog-posts?${params.toString()}`,
    );
    return res.data ?? [];
  } catch (error) {
    console.error("getLatestBlogPosts error:", error);
    return [];
  }
}

export async function incrementViewCount(documentId: string): Promise<void> {
  const publicUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337";
  try {
    await fetch(`${publicUrl}/api/blog-posts/${documentId}/views`, {
      method: "POST",
    });
  } catch {
    // fire-and-forget; swallow errors
  }
}
