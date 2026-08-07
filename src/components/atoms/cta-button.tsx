"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

interface CTAButtonProps extends ComponentProps<typeof Button> {
  href: string;
  external?: boolean;
  showArrow?: boolean;
}

export function CTAButton({
  href,
  external,
  showArrow = true,
  children,
  ...props
}: CTAButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      <Button asChild {...props}>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
          {showArrow && (
            <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-text/10 transition-transform duration-500 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </a>
      </Button>
    </motion.div>
  );
}
