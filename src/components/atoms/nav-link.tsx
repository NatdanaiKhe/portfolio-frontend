"use client";

import { motion, useReducedMotion } from "motion/react";
import type { AnchorHTMLAttributes } from "react";

interface SmoothLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const hoverTransition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1] as const,
};

export function NavLink({
  href,
  children,
  className = "",
  ...props
}: SmoothLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={hoverTransition}
      className="inline-block"
    >
      <a
        href={href}
        className={`relative text-sm font-medium tracking-wide text-text-muted transition-colors hover:text-text ${className}`}
        {...props}
      >
        {children}
      </a>
    </motion.span>
  );
}
