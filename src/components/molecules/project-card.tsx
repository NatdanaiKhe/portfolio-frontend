"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { ProjectType } from "@/types";
import { InlineSkillTag } from "@/components/atoms/inline-skill-tag";
import { getCmsImageUrl } from "@/lib/media-url";

export interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-elevated/70 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-all duration-500 hover:border-white/15 hover:bg-bg-elevated hover:shadow-[inset_0_1px_0_var(--surface-highlight),0_12px_32px_-8px_rgba(0,0,0,0.5)]">
        <a
          href={project.demo || project.repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View project ${project.name}`}
          className="relative block aspect-[16/9] w-full overflow-hidden bg-bg-subtle"
        >
          <Image
            src={getCmsImageUrl(project.preview_image.url)}
            alt={project.name}
            width={640}
            height={360}
            sizes="(max-width: 640px) 360px, (max-width: 1024px) 50vw, 320px"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-text group-hover:text-accent transition-colors">
              {project.name}
            </h3>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-text-muted line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto pt-5 flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-1.5">
              {project.stacks
                ?.filter((stack) => Boolean(stack && stack.name))
                .map((stack) => (
                  <InlineSkillTag key={stack.id} name={stack.name} />
                ))}
            </div>

            <div className="flex items-center gap-3 pt-1 border-t border-white/[0.04]">
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.name}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:text-text"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo for ${project.name}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline transition-colors duration-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
