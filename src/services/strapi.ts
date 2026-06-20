import type {
  HomeData,
  AboutType,
  TechStackType,
  ProjectType,
  ContactType,
  ExperienceType,
} from "@/types";
import { get } from "@/lib/httpClient";

type StrapiResponse<T> = { data: T };

export const getHome = () =>
  get<StrapiResponse<HomeData>>("/home?populate=*").then((r) => r.data);

export const getAbout = () =>
  get<StrapiResponse<AboutType>>("/about?populate=*").then((r) => r.data);

export const getTechStack = () =>
  get<StrapiResponse<TechStackType[]>>("/tech-stacks?populate=*").then(
    (r) => r.data,
  );

export const getProjects = () =>
  get<StrapiResponse<ProjectType[]>>("/projects?populate=*").then(
    (r) => r.data,
  );

export const getExperience = () =>
  get<StrapiResponse<ExperienceType[]>>("/experiences?populate=*").then(
    (r) => r.data,
  );

export const getContact = () =>
  get<StrapiResponse<ContactType>>(
    "/contact?populate[socials][populate]=icon",
  ).then((r) => r.data);
