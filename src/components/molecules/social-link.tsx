"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ContactType } from "@/types";
import { getCmsImageUrl } from "@/lib/media-url";
import { getSocialSvg } from "@/lib/social-utils";

export interface SocialLinkProps {
  social: ContactType["socials"][number];
}

export function SocialLink({ social }: SocialLinkProps) {
  const reduce = useReducedMotion();
  const builtInIcon = getSocialSvg(social.name);

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-bg-elevated px-4 py-2 text-sm font-medium text-text-muted transition-all duration-300 hover:border-white/20 hover:bg-bg-subtle hover:text-text shadow-xs"
      whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {builtInIcon ? (
        builtInIcon
      ) : social.icon?.url ? (
        <Image
          src={getCmsImageUrl(social.icon.url)}
          alt={social.name}
          width={16}
          height={16}
          className="h-4 w-4"
          referrerPolicy="no-referrer"
        />
      ) : null}
      <span>{social.name}</span>
    </motion.a>
  );
}
