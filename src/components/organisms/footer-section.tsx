"use client";

import { motion, useReducedMotion } from "motion/react";
import { openCookieBanner } from "@/lib/gtag";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-text/[0.05] px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 md:flex-row">
        <motion.p
          className="text-xs text-text-faint"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &copy; {year} Natdanai Khemthong. All rights reserved.
        </motion.p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          {footerLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-xs text-text-faint transition-colors hover:text-text"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            type="button"
            onClick={openCookieBanner}
            className="text-xs text-text-faint transition-colors hover:text-text cursor-pointer"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: footerLinks.length * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Cookie Settings
          </motion.button>
        </nav>
      </div>
    </footer>
  );
}
