"use client";

import { openCookieBanner } from "@/lib/gtag";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-text/[0.05] px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-xs text-text-faint">
          &copy; {year} Natdanai Khemthong. All rights reserved.
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-text-faint transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openCookieBanner}
            className="text-xs text-text-faint transition-colors hover:text-text cursor-pointer"
          >
            Cookie Settings
          </button>
        </nav>
      </div>
    </footer>
  );
}
