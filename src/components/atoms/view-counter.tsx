"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { incrementViewCount } from "@/lib/strapi";

interface ViewCounterProps {
  documentId: string;
  initialCount: number;
}

export function ViewCounter({ documentId, initialCount }: ViewCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Fire-and-forget: increment on mount
    incrementViewCount(documentId)
      .then(() => setCount((c) => c + 1))
      .catch(() => {
        /* swallow */
      });
  }, [documentId]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-text-faint">
      <Eye className="h-3.5 w-3.5" />
      {count} {count === 1 ? "view" : "views"}
    </span>
  );
}
