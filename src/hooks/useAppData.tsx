// src/hooks/useAppData.ts
import useSWR from "swr";
import {
  getAbout,
  getContact,
  getExperience,
  getHome,
  getProjects,
  getTechStack,
} from "../services/strapi";

const fetchAll = async () => {
  const [home, about, techStack, projects, experience, contact] = await Promise.all([
    getHome(),
    getAbout(),
    getTechStack(),
    getProjects(),
    getExperience(),
    getContact(),
  ]);

  return {
    home,
    about,
    techStack,
    projects,
    experience,
    contact,
  };
};

export function useAppData() {
  const { data, error, isLoading } = useSWR("appData", fetchAll, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}
