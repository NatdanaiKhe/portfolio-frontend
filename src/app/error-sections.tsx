"use client";

import { motion, useReducedMotion } from "motion/react";

export function ErrorSections() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-bg flex min-h-screen items-center justify-center p-8">
      <motion.div
        className="max-w-md text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-text text-3xl font-bold tracking-tighter">
          Something Went Wrong
        </h1>
        <p className="text-text-muted mt-4 text-sm leading-relaxed">
          We’re having trouble loading this page right now. Please try again in
          a moment.
        </p>
      </motion.div>
    </div>
  );
}
