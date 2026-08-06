"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ExperienceType } from "@/types";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ExperienceTimelineItem } from "@/components/molecules/experience-item";

export function ExperienceSection({
  experience,
}: {
  experience: ExperienceType[];
}) {
  const reduce = useReducedMotion();

  const sorted = [...experience].sort((a, b) => b.exp_id - a.exp_id);

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-32 md:px-12 lg:px-24">
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
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-text/[0.06] to-transparent" />

              {sorted.map((exp, i) => (
                <ExperienceTimelineItem key={exp.exp_id} exp={exp} index={i} />
              ))}

              {/* End marker */}
              <motion.div
                className="relative pl-10"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute left-0 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                </div>
                <p className="text-xs font-medium text-text-faint">
                  The journey continues...
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
