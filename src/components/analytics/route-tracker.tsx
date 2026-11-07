"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_TRACKING_ID } from "@/lib/gtag";

export function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || typeof window === "undefined" || !GA_TRACKING_ID) {
      return;
    }

    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    // Avoid duplicate event on initial mount if identical
    if (lastTrackedPath.current === fullPath) {
      return;
    }

    lastTrackedPath.current = fullPath;

    if (typeof window.gtag === "function") {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: fullPath,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
