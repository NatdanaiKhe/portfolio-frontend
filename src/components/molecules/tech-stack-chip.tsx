"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { TechStackType } from "@/types";
import { getCmsImageUrl } from "@/lib/media-url";

export function TechStackChip({
  tech,
  index,
}: {
  tech: TechStackType;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="group flex flex-col items-center gap-2 rounded-2xl border border-text/[0.04] bg-bg-subtle p-4 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-shadow duration-500 hover:shadow-[inset_0_1px_0_var(--surface-highlight)]"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative h-10 w-10">
        <Image
          src={getCmsImageUrl(tech.tech_image.url)}
          alt={tech.name}
          width={40}
          height={40}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-xs font-medium text-text">{tech.name}</p>
      <p className="text-[10px] text-text-faint">{tech.proficiency_level}</p>
    </motion.div>
  );
}
