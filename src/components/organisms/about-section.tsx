"use client";

import { motion, useReducedMotion } from "motion/react";
import type { AboutType, TechStackType } from "@/types";
import { TechStackChip } from "@/components/molecules/tech-stack-chip";

export interface AboutSectionProps {
  about: AboutType;
  techStacks: TechStackType[];
}

export function AboutSection({ about, techStacks }: AboutSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="px-6 py-24 sm:py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 sm:mb-14">
          <h2
            id="about-title"
            className="text-text text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            About
          </h2>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
            Software engineer building accessible, performance-driven web and
            mobile interfaces with clean code and modern tooling.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          <motion.div
            className="bg-bg-elevated/70 rounded-2xl border border-white/[0.06] p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12 md:col-span-8"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-bg-subtle/40 h-full rounded-[calc(1rem-1px)] p-6 md:p-8">
              <h3 className="text-text-faint mb-3 text-xs font-semibold tracking-wider uppercase">
                Bio & Philosophy
              </h3>
              <p className="text-text-muted text-sm leading-relaxed sm:text-base">
                {about.background}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5 md:col-span-4">
            <motion.div
              className="bg-bg-elevated/70 flex-1 rounded-2xl border border-white/[0.06] p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="bg-bg-subtle/40 h-full rounded-[calc(1rem-1px)] p-5 sm:p-6">
                <h3 className="text-text-faint mb-2 text-xs font-semibold tracking-wider uppercase">
                  Experience Level
                </h3>
                <p className="text-text text-sm leading-relaxed font-medium">
                  {about.experience}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-bg-elevated/70 flex-1 rounded-2xl border border-white/[0.06] p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="bg-bg-subtle/40 h-full rounded-[calc(1rem-1px)] p-5 sm:p-6">
                <h3 className="text-text-faint mb-2 text-xs font-semibold tracking-wider uppercase">
                  Education
                </h3>
                <p className="text-text text-sm leading-relaxed font-medium">
                  {about.education}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {techStacks.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="mb-6">
              <h3 className="text-text text-xl font-bold tracking-tight sm:text-2xl">
                Core Technologies
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {techStacks.map((tech, i) => (
                <TechStackChip key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
