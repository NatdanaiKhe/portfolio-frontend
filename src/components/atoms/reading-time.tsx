import { extractTextFromBlocks } from "@/lib/utils";
import type { StrapiBlock } from "@/types";

function computeReadingTime(content: StrapiBlock[]): number {
  const text = extractTextFromBlocks(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function ReadingTime({ content }: { content: StrapiBlock[] }) {
  const minutes = computeReadingTime(content);
  return <span>{minutes} min read</span>;
}
