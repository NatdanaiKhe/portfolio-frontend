"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getCmsImageUrl } from "@/lib/media-url";
import { useTechStacks } from "@/context/tech-stack-context";
import { getSkillConfig } from "@/lib/skill-utils";
import type { InlineSkillTagProps } from "@/types/skills";

export function InlineSkillTag({ name, className }: InlineSkillTagProps) {
  const cmsStacks = useTechStacks();
  const normalized = name.trim().toLowerCase();

  const cmsMatch = cmsStacks.find(
    (s) => s.name?.trim().toLowerCase() === normalized
  );

  const config = getSkillConfig(name);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[12px] font-medium leading-tight align-baseline select-none transition-all duration-150",
        "bg-white/[0.04] border-white/10 text-text hover:bg-white/[0.08] hover:border-white/25",
        className,
      )}
    >
      {cmsMatch?.tech_image?.url ? (
        <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
          <Image
            src={getCmsImageUrl(cmsMatch.tech_image.url)}
            alt={cmsMatch.name}
            width={14}
            height={14}
            className="h-3.5 w-3.5 object-contain"
            referrerPolicy="no-referrer"
          />
        </span>
      ) : (
        <Icon
          className="h-3 w-3 shrink-0"
          style={{ color: config.tint }}
          aria-hidden="true"
        />
      )}
      <span>{cmsMatch?.name ?? config.displayName}</span>
    </span>
  );
}
