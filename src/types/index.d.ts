export type HomeData = {
  id: number;
  documentId: string;
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
  background: string;
};

export type TechStack = {
  name: string;
  proficiency_level: string;
  tech_image: {
    name: string;
    url: string;
  };
};

export type Project = {
  name: string;
  description: string;
  repository: string;
  demo: string;
  preview_images: {
    name: string;
    url: string;
  };
  stacks: [
    {
      id: number;
      name: string;
    },
  ];
};

export type Contact = {
  email: string;
  location: string;
  socials: [
    {
      id: number;
      name: string;
      link: string;
    },
  ];
};
