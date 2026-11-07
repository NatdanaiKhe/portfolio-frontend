"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@/lib/gtag";

interface ReadingMilestoneTrackerProps {
  postSlug: string;
  postTitle: string;
}

const MILESTONES_SECONDS = [30, 60, 120];

export function ReadingMilestoneTracker({
  postSlug,
  postTitle,
}: ReadingMilestoneTrackerProps) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    let activeSeconds = 0;
    let isVisible = typeof document !== "undefined" ? !document.hidden : true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      if (!isVisible) return;

      activeSeconds += 1;

      for (const milestone of MILESTONES_SECONDS) {
        if (activeSeconds >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          sendGAEvent("read_milestone", {
            milestone_seconds: milestone,
            post_slug: postSlug,
            post_title: postTitle,
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [postSlug, postTitle]);

  return null;
}
