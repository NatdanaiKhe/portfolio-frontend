"use client";

import type { ExperienceType } from "@/types";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ExperienceTimelineItem } from "@/components/molecules/experience-item";

export function ExperienceSection({
  experience,
}: {
  experience: ExperienceType[];
}) {
  const sorted = [...experience].sort((a, b) => b.exp_id - a.exp_id);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: sticky heading */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionHeading id="experience-title">Experience</SectionHeading>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="md:col-span-8">
            <div className="relative space-y-14">
              {/* Timeline continuous line */}
              <div className="from-accent/40 via-text/[0.06] absolute top-0 bottom-0 left-[7px] w-px bg-gradient-to-b to-transparent" />

              {sorted.map((exp, i) => (
                <ExperienceTimelineItem key={exp.exp_id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
