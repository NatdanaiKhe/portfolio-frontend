"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TechStackType } from "@/types";
import { SectionHeading } from "@/components/atoms/section-heading";
import { TechStackChip } from "@/components/molecules/tech-stack-chip";

export function TechStackSection({
  techStacks,
}: {
  techStacks: TechStackType[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-title"
      className="px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading id="tech-stack-title">Tech Stack</SectionHeading>

        <motion.p
          className="mt-4 max-w-lg text-sm leading-relaxed text-text-faint"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Technologies and tools I work with regularly.
        </motion.p>

        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {techStacks.map((tech, i) => (
            <TechStackChip key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
