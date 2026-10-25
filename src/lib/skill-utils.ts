import { Code2 } from "lucide-react";
import type { SkillConfig } from "@/types/skills";
import { SKILL_REGISTRY } from "@/constants/skills";

export function getSkillConfig(skillName: string): SkillConfig {
  const normalized = skillName.trim().toLowerCase();
  return (
    SKILL_REGISTRY[normalized] ?? {
      displayName: skillName.trim(),
      tint: "#2dd4bf",
      icon: Code2,
    }
  );
}
