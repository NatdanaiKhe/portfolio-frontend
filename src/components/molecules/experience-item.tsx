"use client";

import { useId } from "react";
import Image from "next/image";
import { ChevronDown, Building2 } from "lucide-react";
import { RichExperienceText } from "@/components/atoms/rich-experience-text";
import { InlineSkillTag } from "@/components/atoms/inline-skill-tag";
import { getDuration, extractSkills } from "@/lib/experience-utils";
import { getCmsImageUrl } from "@/lib/media-url";
import type { ExperienceTimelineItemProps } from "@/types/experience";

export function ExperienceTimelineItem({
  exp,
  defaultOpen = true,
  company_icon,
}: ExperienceTimelineItemProps) {
  const rawIcon =
    company_icon ||
    (typeof exp.company_icon === "string"
      ? exp.company_icon
      : exp.company_icon?.url);
  const iconUrl = rawIcon ? getCmsImageUrl(rawIcon) : null;
  const duration = getDuration(exp.startDate, exp.endDate);
  const points = (exp.detail ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const detectedSkills = exp.detail ? extractSkills(exp.detail) : [];
  const detailsId = useId();

  const formattedDateRange = [
    exp.startDate?.trim(),
    exp.endDate ? exp.endDate.trim() : "Present",
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <li className="relative group">
      <div className="absolute -left-[37px] sm:-left-[45px] top-4 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-bg border border-text/20 ring-4 ring-bg transition-transform duration-300 group-hover:scale-125 group-hover:border-accent">
        <div className="h-1.5 w-1.5 rounded-full bg-accent transition-colors" />
      </div>

      <details
        id={detailsId}
        className="group/disclosure rounded-2xl border border-white/[0.06] bg-bg-elevated/70 p-4 sm:p-6 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-all duration-300 hover:border-white/12 hover:bg-bg-elevated [&_summary::-webkit-details-marker]:hidden"
        open={defaultOpen}
      >
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 select-none">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-1.5 shadow-sm transition-transform duration-300 group-hover/disclosure:scale-105">
              {iconUrl ? (
                <Image
                  src={iconUrl}
                  alt={
                    typeof exp.company_icon === "object" &&
                    exp.company_icon?.alternativeText
                      ? exp.company_icon.alternativeText
                      : `${exp.company} icon`
                  }
                  width={48}
                  height={48}
                  className="h-full w-full rounded-lg object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Building2 className="h-5 w-5 text-text-muted" aria-hidden="true" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-text">
                  {exp.company}
                </h3>
                {duration && (
                  <span className="text-xs font-medium text-text-faint">
                    <span className="inline-block px-1 opacity-50">·</span>
                    {duration}
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-sm font-medium text-text-muted">
                {exp.title}
              </p>

              <p className="mt-1 text-xs text-text-faint">
                {formattedDateRange}
              </p>
            </div>
          </div>

          <div className="flex items-center pt-1 text-text-faint transition-transform duration-200 group-open/disclosure:rotate-180 group-hover/disclosure:text-text">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Toggle details</span>
          </div>
        </summary>

        <div className="mt-4 pt-4 border-t border-white/[0.04]">
          <ul className="space-y-2.5 text-sm leading-relaxed text-text-muted">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span className="flex-1">
                  <RichExperienceText text={point} />
                </span>
              </li>
            ))}
          </ul>

          {detectedSkills.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/[0.03] flex items-center flex-wrap gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-text-faint uppercase mr-1">
                Tech:
              </span>
              {detectedSkills.map((skill) => (
                <InlineSkillTag key={skill} name={skill} />
              ))}
            </div>
          )}
        </div>
      </details>
    </li>
  );
}
