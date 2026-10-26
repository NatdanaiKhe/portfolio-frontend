"use client";

import type { ReactNode } from "react";
import { InlineSkillTag } from "@/components/atoms/inline-skill-tag";
import type { RichExperienceTextProps } from "@/types/skills";

export function RichExperienceText({ text }: RichExperienceTextProps): ReactNode {
  const cleanText = text
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+([,.:;!?])/g, "$1");

  const skillPattern = /\[([a-zA-Z0-9\s._+-]+)\]/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = skillPattern.exec(cleanText)) !== null) {
    const matchStart = match.index;
    const matchEnd = skillPattern.lastIndex;

    if (matchStart > lastIndex) {
      parts.push(cleanText.slice(lastIndex, matchStart));
    }

    const rawSkillName = match[1]?.trim();
    if (rawSkillName) {
      parts.push(
        <InlineSkillTag
          key={`skill-${matchStart}`}
          name={rawSkillName}
        />
      );
    }

    lastIndex = matchEnd;
  }

  if (lastIndex < cleanText.length) {
    parts.push(cleanText.slice(lastIndex));
  }

  return <>{parts}</>;
}
