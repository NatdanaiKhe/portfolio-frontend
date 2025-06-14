import type { HomeData, AboutType, TechStackType, ProjectType, ContactType } from "@/types";

const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT + "/api";

export const getHome = async (): Promise<HomeData> => {
  const res = await fetch(`${apiBaseUrl}/home?populate=*`);  
  if (!res.ok) throw new Error("Failed to fetch home data");
  const json = await res.json();  
  return json.data;
};

export const getAbout = async (): Promise<AboutType> => {
  const res = await fetch(`${apiBaseUrl}/about?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  const json = await res.json();
  return json.data;
};

export const getTechStack = async (): Promise<TechStackType[]> => {
  const res = await fetch(`${apiBaseUrl}/tech-stacks?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch tech stack data");
  const json = await res.json();
  return json.data;
};

export const getProjects = async (): Promise<ProjectType[]> => {
  const res = await fetch(`${apiBaseUrl}/projects?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch projects data");
  const json = await res.json();
  return json.data;
};

export const getContact = async (): Promise<ContactType> => {
  const res = await fetch(
    `${apiBaseUrl}/contact?populate[socials][populate]=icon`,
  );
  if (!res.ok) throw new Error("Failed to fetch contact data");
  const json = await res.json();
  return json.data;
};