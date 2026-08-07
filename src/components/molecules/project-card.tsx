"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { ProjectType } from "@/types";
import { TechTag } from "@/components/atoms/tech-tag";
import { getCmsImageUrl } from "@/lib/media-url";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Double-Bezel card */}
      <div className="group border-text/[0.06] bg-bg-elevated h-full rounded-[1.25rem] border p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] transition-shadow duration-700 hover:shadow-[inset_0_1px_0_var(--surface-highlight),0_0_40px_rgba(99,102,241,0.08)]">
        <div className="bg-bg-subtle flex h-full flex-col overflow-hidden rounded-[calc(1.25rem-2px)]">
          {/* Preview image */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden"
          >
            <Image
              src={getCmsImageUrl(project.preview_image.url)}
              alt={project.name}
              width={640}
              height={360}
              className="h-48 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-text text-lg font-semibold tracking-tight">
              {project.name}
            </h3>
            <p className="text-text-muted line-clamp-3 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.stacks.map((stack) => (
                  <TechTag key={stack.id} name={stack.name} />
                ))}
              </div>

              {/* Actions */}
              <div className="mt-1 flex gap-3">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
