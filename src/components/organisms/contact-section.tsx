"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import type { ContactType } from "@/types";
import { SocialLink } from "@/components/molecules/social-link";

export interface ContactSectionProps {
  contact: ContactType;
}

export function ContactSection({ contact }: ContactSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-6 py-24 sm:py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 sm:mb-14">
          <h2
            id="contact-title"
            className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
          >
            Get in Touch
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Have an open role, an interesting project, or just want to connect? My inbox is always open.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-bg-elevated/70 p-5 sm:p-6 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-accent mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-text-faint uppercase">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-sm font-medium text-text transition-colors hover:text-accent truncate"
            >
              {contact.email}
            </a>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-bg-elevated/70 p-5 sm:p-6 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-accent mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-text-faint uppercase">
              Location
            </p>
            <p className="mt-1 text-sm font-medium text-text">
              {contact.location}
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-bg-elevated/70 p-5 sm:p-6 shadow-[inset_0_1px_0_var(--surface-highlight)] transition-colors duration-300 hover:border-white/12 sm:col-span-2 lg:col-span-1"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-accent mb-4">
              <Send className="h-5 w-5" />
            </div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-text-faint uppercase">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {contact.socials.map((social) => (
                <SocialLink key={social.name} social={social} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
