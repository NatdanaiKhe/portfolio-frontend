"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProjectType } from "@/types";
import { SectionEyebrow } from "@/components/atoms/section-eyebrow";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ProjectCard } from "@/components/molecules/project-card";

export function ProjectsSection({ projects }: { projects: ProjectType[] }) {
  const reduce = useReducedMotion();

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Selected Work</SectionEyebrow>
        <SectionHeading id="projects-title">Projects</SectionHeading>

        <motion.p
          className="mt-4 max-w-lg text-sm leading-relaxed text-text-faint"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          A selection of recent work. Each project brought unique challenges
          that helped sharpen my craft.
        </motion.p>

        {/* Asymmetric bento project grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
