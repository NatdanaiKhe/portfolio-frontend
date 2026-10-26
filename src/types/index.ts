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
  hero_text: string;
  role: StrapiBlock[] | string;
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
  id?: number;
  exp_id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  detail: string;
  company_icon?: {
    id?: number;
    name?: string;
    url: string;
    alternativeText?: string | null;
    formats?: Record<string, { url: string }> | null;
  } | string | null;
};

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

// --- Blog types ---

export type StrapiBlock =
  | {
      type: "paragraph";
      children: { text: string; bold?: boolean; italic?: boolean }[];
    }
  | {
      type: "heading";
      level: 1 | 2 | 3 | 4 | 5 | 6;
      children: { text: string }[];
    }
  | {
      type: "list";
      format: "ordered" | "unordered";
      children: StrapiBlock[];
    }
  | {
      type: "code";
      children: { text: string }[];
    }
  | {
      type: "quote";
      children: { text: string }[];
    }
  | {
      type: "image";
      image: { url: string; alt?: string; width?: number; height?: number };
      children: never[];
    }
  | {
      type: "link";
      url: string;
      children: { text: string }[];
    };

export type Tag = { id: number; name: string };

export type BlogCategory = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
};

export type BlogPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: StrapiBlock[];
  cover_image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
  category?: BlogCategory | null;
  tags?: Tag[];
  view_count: number;
  publishedAt: string;
};
