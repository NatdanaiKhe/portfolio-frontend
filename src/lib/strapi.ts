import type {
  HomeData,
  AboutType,
  TechStackType,
  ProjectType,
  ContactType,
  ExperienceType,
} from "@/types";

function cmsUrl(): string {
  return (process.env.CMS_URL ?? "http://localhost:1337").replace(/\/+$/, "");
}

function cmsToken(): string {
  return process.env.CMS_TOKEN ?? "";
}

type StrapiSingle<T> = { data: T; meta?: object };
type StrapiCollection<T> = { data: T[]; meta?: { pagination?: object } };

async function fetchFromCMS<T>(path: string, options?: RequestInit): Promise<T> {
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
  const res = await fetchFromCMS<StrapiSingle<AboutType>>(
    "/about?populate=*",
  );
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
  const res =
    await fetchFromCMS<StrapiCollection<TechStackType>>(
      "/tech-stacks?populate=*",
    );
  return res.data;
}

export async function getProjects(): Promise<ProjectType[]> {
  const res =
    await fetchFromCMS<StrapiCollection<ProjectType>>(
      "/projects?populate=*",
    );
  return res.data;
}

export async function getExperience(): Promise<ExperienceType[]> {
  const res =
    await fetchFromCMS<StrapiCollection<ExperienceType>>(
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
