"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  children,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        className={`text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
