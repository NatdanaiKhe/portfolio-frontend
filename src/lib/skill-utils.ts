import { Code2 } from "lucide-react";
import type { SkillConfig } from "@/types/skills";
import { SKILL_REGISTRY } from "@/constants/skills";

export function getSkillConfig(skillName?: string | null): SkillConfig {
  const safeName = (skillName ?? "").trim();
  const normalized = safeName.toLowerCase();
  return (
    SKILL_REGISTRY[normalized] ?? {
      displayName: safeName || "Skill",
      tint: "#2dd4bf",
      icon: Code2,
    }
  );
}
