import type { LucideIcon } from "lucide-react";

export interface SkillConfig {
  displayName: string;
  tint: string;
  icon: LucideIcon;
}

export interface InlineSkillTagProps {
  name: string;
  className?: string;
}

export interface RichExperienceTextProps {
  text: string;
}
