"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/atoms/nav-link";

export interface NavBarProps {
  showBlog?: boolean;
}

export function NavBar({ showBlog = false }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  const navItems: Array<{ label: string; href: string; isRoute?: boolean }> = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    ...(showBlog ? [{ label: "Blog", href: "/blog", isRoute: true }] : []),
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-4 left-1/2 z-40 flex -translate-x-1/2 items-center justify-between sm:justify-start gap-4 sm:gap-6 rounded-full border border-white/[0.08] bg-bg/80 px-4 sm:px-6 py-2.5 sm:py-3 shadow-[inset_0_1px_0_var(--surface-highlight)] backdrop-blur-xl w-[calc(100%-2rem)] sm:w-auto max-w-lg"
      >
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="relative h-7 w-7 shrink-0 overflow-hidden flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              priority
              className="h-7 w-7 object-contain"
            />
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1.5 text-sm font-medium tracking-wide text-text-muted transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.href} href={item.href} className="px-3 py-1.5">
                {item.label}
              </NavLink>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={toggle}
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full md:hidden"
          aria-label="Toggle menu"
        >
          <div
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-bg/90 fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 backdrop-blur-2xl md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={close}
          >
            {navItems.map((item, i) => {
              const sharedClasses =
                "text-text-muted hover:text-text text-2xl font-semibold tracking-tight transition-colors";
              const motionProps = {
                initial: reduce ? false : { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 24 },
                transition: {
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as const,
                },
              };

              return item.isRoute ? (
                <motion.div key={item.href} {...motionProps}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={sharedClasses}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={sharedClasses}
                  {...motionProps}
                >
                  {item.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
