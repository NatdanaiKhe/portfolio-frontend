"use client";

import { motion, useReducedMotion } from "motion/react";
import type { AboutType, TechStackType } from "@/types";
import { SectionEyebrow } from "@/components/atoms/section-eyebrow";
import { SectionHeading } from "@/components/atoms/section-heading";
import { TechStackChip } from "@/components/molecules/tech-stack-chip";

export function AboutSection({
  about,
  techStacks,
}: {
  about: AboutType;
  techStacks: TechStackType[];
}) {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>About Me</SectionEyebrow>
        <SectionHeading>My Background</SectionHeading>

        {/* Asymmetric Bento grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-12 md:grid-rows-[auto,auto]">
          {/* Main bio — spans 8 cols, 2 rows */}
          <motion.div
            className="border-text/[0.05] bg-bg-subtle rounded-[1.25rem] border p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] md:col-span-8 md:row-span-2"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-bg-subtle rounded-[calc(1.25rem-1px)] p-6 md:p-8">
              <p className="text-text-muted text-sm leading-relaxed md:text-base">
                {about.background}
              </p>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="border-text/[0.05] bg-bg-elevated rounded-[1.25rem] border p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] md:col-span-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-bg-subtle rounded-[calc(1.25rem-1px)] p-6">
              <h3 className="text-text mb-3 text-sm font-semibold tracking-wide uppercase">
                Skills & Experience
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {about.experience}
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="border-text/[0.05] bg-bg-elevated rounded-[1.25rem] border p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] md:col-span-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-bg-subtle rounded-[calc(1.25rem-1px)] p-6">
              <h3 className="text-text mb-3 text-sm font-semibold tracking-wide uppercase">
                Education
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {about.education}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack chips */}
        {techStacks.length > 0 && (
          <>
            <motion.div
              className="via-text/[0.06] mt-20 mb-8 h-px w-full bg-gradient-to-r from-transparent to-transparent"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {techStacks.map((tech, i) => (
                <TechStackChip key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
