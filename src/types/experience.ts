import type { ExperienceType } from "@/types";


export interface ExperienceTimelineItemProps {
  exp: ExperienceType;
  index: number;
  defaultOpen?: boolean;
  company_icon?: string;
}

export interface ExperienceSectionProps {
  experience: ExperienceType[];
}
