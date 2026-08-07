"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      className="mb-4 inline-block rounded-full border border-text/[0.06] bg-text/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.p>
  );
}
