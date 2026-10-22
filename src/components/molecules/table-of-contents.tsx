"use client";

import { useEffect, useState, useRef } from "react";
import type { StrapiBlock } from "@/types";
import { slugify } from "@/lib/utils";

interface TOCEntry {
  id: string;
  text: string;
  level: number;
}

function extractTOC(blocks: StrapiBlock[]): TOCEntry[] {
  return blocks
    .filter((b) => b.type === "heading" && (b.level === 2 || b.level === 3))
    .map((b) => {
      const text =
        "children" in b
          ? (b.children as Array<{ text: string }>)
              .map((c) => c.text)
              .join("")
          : "";
      return { id: slugify(text), text, level: (b as { level: number }).level };
    });
}

export function TableOfContents({ content }: { content: StrapiBlock[] }) {
  const entries = extractTOC(content);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of entries) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-faint">
        On this page
      </h4>
      <ul className="space-y-1.5 border-l border-text/[0.08] pl-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`block text-sm transition-colors ${
                entry.level === 3 ? "pl-3" : ""
              } ${
                activeId === entry.id
                  ? "font-medium text-accent"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
