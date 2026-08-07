"use client";

import { motion, useReducedMotion } from "motion/react";

export function ErrorSections() {
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-8">
      <motion.div
        className="max-w-md text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-3xl font-bold tracking-tighter text-text">
          CMS Unavailable
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          The content API is not reachable. Please ensure the Strapi CMS is
          running.
        </p>
      </motion.div>
    </div>
  );
}
