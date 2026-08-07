export type AppData = {
  home: HomeData;
  about: AboutType;
  techStack: TechStackType[];
  projects: ProjectType[];
  experience: ExperienceType[];
  contact: ContactType;
};

export type HomeData = {
  id: number;
  documentId: string;
  updatedAt?: string;
  available_status: boolean;
  profile_image: {
    url: string;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
};

export type AboutType = {
  id: number;
  updatedAt?: string;
  background: string;
  experience: string;
  education: string;
};

export type TechStackType = {
  name: string;
  proficiency_level: string;
  tech_image: {
    name: string;
    url: string;
  };
};

export type ProjectType = {
  name: string;
  description: string;
  repository: string;
  demo: string;
  preview_image: {
    name: string;
    url: string;
  };
  stacks: Array<{
    id: number;
    name: string;
  }>;
};

export type ExperienceType = {
  exp_id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  detail: string;
}

export type ContactType = {
  email: string;
  location: string;
  socials: Array<{
    id: number;
    name: string;
    link: string;
    icon: {
      name: string;
      url: string;
    };
  }>;
};
