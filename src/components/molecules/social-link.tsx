"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ContactType } from "@/types";
import { getCmsImageUrl } from "@/lib/media-url";

export function SocialLink({ social }: { social: ContactType["socials"][number] }) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-text/[0.06] bg-text/[0.03] px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-400 hover:border-text/[0.12] hover:bg-text/[0.05] hover:text-text"
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      <Image
        src={getCmsImageUrl(social.icon.url)}
        alt={social.name}
        width={16}
        height={16}
        className="h-4 w-4"
        referrerPolicy="no-referrer"
      />
      {social.name}
    </motion.a>
  );
}
