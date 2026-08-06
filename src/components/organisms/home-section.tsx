"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Circle } from "lucide-react";
import type { HomeData } from "@/types";
import { CTAButton } from "@/components/atoms/cta-button";
import { getCmsImageUrl } from "@/lib/media-url";

export function HomeSection({ homeData }: { homeData: HomeData }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-12 px-6 pt-24 md:flex-row md:gap-16 md:px-12 lg:gap-24"
    >
      {/* Text block */}
      <div className="flex max-w-lg flex-col items-start">
        <motion.p
          className="mb-3 inline-block rounded-full border border-text/[0.06] bg-text/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="text-4xl font-bold tracking-tighter text-text leading-[1.1] md:text-5xl lg:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Software
          <br />
          Developer
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-text-muted md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          I build clean, responsive user interfaces with a passion for crafting
          end-to-end web solutions that feel premium and perform at scale.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <CTAButton href="#projects" variant="default">
            View Projects
          </CTAButton>
          <CTAButton href="#contact" variant="secondary" showArrow={false}>
            Get in Touch
          </CTAButton>
        </motion.div>
      </div>

      {/* Image block */}
      <motion.div
        className="relative"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Double-Bezel wrapper */}
        <div className="rounded-[2rem] border border-text/[0.06] bg-text/[0.02] p-1.5 shadow-[inset_0_1px_0_var(--surface-highlight)]">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)]">
            <Image
              src={
                homeData.profile_image?.url
                  ? getCmsImageUrl(homeData.profile_image.url)
                  : "/logo.svg"
              }
              alt="Profile"
              width={400}
              height={400}
              className="h-64 w-64 object-cover md:h-80 md:w-80"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Availability badge */}
        <motion.div
          className="absolute -bottom-2 -right-2 flex items-center gap-2 rounded-full border border-text/[0.08] bg-bg-subtle px-4 py-2 shadow-lg"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Circle
            className={`h-2.5 w-2.5 ${
              homeData.available_status
                ? "animate-pulse text-emerald-400"
                : "text-red-400"
            }`}
            fill={homeData.available_status ? "#34d399" : "#f87171"}
          />
          <span className="text-xs font-medium text-text-muted">
            {homeData.available_status ? "Available for work" : "Not available"}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
