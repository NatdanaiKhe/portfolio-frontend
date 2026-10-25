"use client";

import type { ProjectType } from "@/types";
import { ProjectCard } from "@/components/molecules/project-card";

export interface ProjectsSectionProps {
  projects: ProjectType[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="px-6 py-24 sm:py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 sm:mb-14">
          <h2
            id="projects-title"
            className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
          >
            Selected Projects
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Featured products, open source tooling, and applications crafted with modern tech stacks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
