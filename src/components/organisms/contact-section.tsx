"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import type { ContactType } from "@/types";
import { SectionHeading } from "@/components/atoms/section-heading";
import { SocialLink } from "@/components/molecules/social-link";

export function ContactSection({ contact }: { contact: ContactType }) {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading>Get in Touch</SectionHeading>

        <motion.p
          className="mt-4 max-w-lg text-sm leading-relaxed text-text-faint"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Have a project in mind or want to discuss potential opportunities?
          I&apos;d love to hear from you.
        </motion.p>

        {/* Contact info cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <motion.div
            className="rounded-[1.25rem] border border-text/[0.05] bg-bg-elevated p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[calc(1.25rem-1px)] bg-bg-subtle p-6">
              <Mail className="mb-3 h-5 w-5 text-accent" />
              <p className="text-xs font-medium tracking-wider text-text-faint uppercase">
                Email
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block text-sm font-medium text-text transition-colors hover:text-accent"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="rounded-[1.25rem] border border-text/[0.05] bg-bg-elevated p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="rounded-[calc(1.25rem-1px)] bg-bg-subtle p-6">
              <MapPin className="mb-3 h-5 w-5 text-accent" />
              <p className="text-xs font-medium tracking-wider text-text-faint uppercase">
                Based in
              </p>
              <p className="mt-1 text-sm font-medium text-text">
                {contact.location}
              </p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="rounded-[1.25rem] border border-text/[0.05] bg-bg-elevated p-[1px] shadow-[inset_0_1px_0_var(--surface-highlight)] sm:col-span-2 lg:col-span-1"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="rounded-[calc(1.25rem-1px)] bg-bg-subtle p-6">
              <p className="mb-4 text-xs font-medium tracking-wider text-text-faint uppercase">
                Connect
              </p>
              <div className="flex flex-wrap gap-2">
                {contact.socials.map((social) => (
                  <SocialLink key={social.name} social={social} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
