import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractTextFromBlocks(
  blocks: Array<{
    type: string;
    children?: Array<{
      text?: string;
      children?: Array<{ text?: string; children?: unknown[] }>;
    }>;
  }>,
): string {
  return blocks
    .map((block) => {
      if (block.children) {
        return block.children.map((c) => c.text ?? "").join(" ");
      }
      return "";
    })
    .join(" ");
}

/** Format date string (e.g., "2025-01-15T..." → "Jan 15, 2025") */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
