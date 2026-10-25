"use client";

import { ExperienceTimelineItem } from "@/components/molecules/experience-item";
import type { ExperienceSectionProps } from "@/types/experience";

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const sorted = [...experience].sort((a, b) => b.exp_id - a.exp_id);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="px-6 py-24 sm:py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 sm:mb-16">
          <h2
            id="experience-title"
            className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
          >
            Experience
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Professional trajectory building web platforms, mobile applications, and reliable digital systems.
          </p>
        </div>

        <div className="relative pl-7 sm:pl-9">
          <div
            className="absolute top-4 bottom-4 left-[3px] sm:left-[5px] w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-6 sm:space-y-8">
            {sorted.map((exp, i) => (
              <ExperienceTimelineItem
                key={exp.exp_id || i}
                exp={exp}
                index={i}
                defaultOpen={true}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
