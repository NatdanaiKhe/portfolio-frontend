"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ExperienceType } from "@/types";

export function ExperienceTimelineItem({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative pl-10"
      initial={reduce ? false : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/30">
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      {/* Timeline line (rendered via CSS on parent) */}
      <div>
        <p className="text-xs font-medium tracking-wider text-text-faint uppercase">
          {exp.startDate} — {exp.endDate}
        </p>
        <h3 className="mt-0.5 text-xl font-semibold tracking-tight text-text">
          {exp.title}
        </h3>
        <p className="text-sm font-medium text-text-muted">{exp.company}</p>
        <ul className="mt-3 space-y-1.5">
          {exp.detail.split("\n").map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-text-muted"
            >
              <span className="mt-[0.45em] block h-1 w-1 shrink-0 rounded-full bg-text-faint" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
