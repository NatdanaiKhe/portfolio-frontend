import type { ExperienceType } from "@/types";

export interface CompanyCharm {
  monogram: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
}

export interface ExperienceTimelineItemProps {
  exp: ExperienceType;
  index: number;
  defaultOpen?: boolean;
}

export interface ExperienceSectionProps {
  experience: ExperienceType[];
}
