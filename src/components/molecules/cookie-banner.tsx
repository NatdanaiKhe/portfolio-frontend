"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Cookie,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredConsent,
  setStoredConsent,
  OPEN_COOKIE_BANNER_EVENT,
  CONSENT_CHANGE_EVENT,
  type ConsentStatus,
} from "@/lib/gtag";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<ConsentStatus | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsSelected, setAnalyticsSelected] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setCurrentConsent(stored);
    setAnalyticsSelected(stored !== "denied");

    // If the visitor has not yet chosen, display banner after a short delay
    let timer: NodeJS.Timeout | null = null;
    if (stored === null) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
    }

    const handleOpen = () => {
      const latest = getStoredConsent();
      setCurrentConsent(latest);
      setAnalyticsSelected(latest !== "denied");
      setIsOpen(true);
    };

    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ consent: ConsentStatus }>;
      if (customEvent.detail?.consent) {
        setCurrentConsent(customEvent.detail.consent);
        setAnalyticsSelected(customEvent.detail.consent === "granted");
      }
    };

    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpen);
    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpen);
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  const handleAcceptAll = useCallback(() => {
    setStoredConsent("granted");
    setCurrentConsent("granted");
    setIsOpen(false);
    setShowDetails(false);
  }, []);

  const handleDeclineAll = useCallback(() => {
    setStoredConsent("denied");
    setCurrentConsent("denied");
    setIsOpen(false);
    setShowDetails(false);
  }, []);

  const handleSaveCustom = useCallback(() => {
    const nextStatus: ConsentStatus = analyticsSelected ? "granted" : "denied";
    setStoredConsent(nextStatus);
    setCurrentConsent(nextStatus);
    setIsOpen(false);
    setShowDetails(false);
  }, [analyticsSelected]);

  const handleDismiss = useCallback(() => {
    // If dismissing without explicit action, preserve existing choice or default to essential
    if (currentConsent === null) {
      setStoredConsent("denied");
      setCurrentConsent("denied");
    }
    setIsOpen(false);
  }, [currentConsent]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Preferences"
          className="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-lg md:bottom-6 md:right-6 md:left-auto md:mx-0 md:max-w-[420px]"
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-text/10 bg-bg-elevated/95 p-5 shadow-2xl shadow-black/80 backdrop-blur-md ring-1 ring-white/5 md:p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/15 text-accent">
                  <Cookie className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text">
                    Cookie &amp; Privacy Choices
                  </h2>
                  {currentConsent && (
                    <span className="text-[11px] text-text-faint">
                      Status:{" "}
                      <span className="text-accent">
                        {currentConsent === "granted"
                          ? "Analytics Enabled"
                          : "Essential Only"}
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-lg p-1 text-text-faint transition-colors hover:bg-text/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Dismiss cookie notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              We use cookies to analyze anonymous site traffic and improve performance
              with Google Analytics. We never use advertising or cross-site tracking
              cookies.
            </p>

            {/* Details Accordion */}
            {showDetails && (
              <motion.div
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-3 border-t border-text/10 pt-3 text-xs"
              >
                {/* Essential cookies item */}
                <div className="rounded-xl border border-text/5 bg-text/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-text">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Strictly Necessary</span>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Always Active
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-text-faint">
                    Required for core site functions, security, and remembering your
                    consent preferences.
                  </p>
                </div>

                {/* Analytics cookies item */}
                <div className="rounded-xl border border-text/5 bg-text/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-text">
                      <Cookie className="h-3.5 w-3.5 text-accent" />
                      <span>Analytics &amp; Performance</span>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={analyticsSelected}
                        onChange={(e) => setAnalyticsSelected(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="h-5 w-9 rounded-full bg-text/20 transition-colors after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-text after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40" />
                      <span className="sr-only">Enable analytics cookies</span>
                    </label>
                  </div>
                  <p className="mt-1 text-[11px] text-text-faint">
                    Google Analytics 4 helps us measure aggregate visits and
                    popular pages with IP anonymization.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Toggle Details Button */}
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[11px] text-text-faint transition-colors hover:text-text focus-visible:outline-none"
              >
                <SlidersHorizontal className="h-3 w-3" />
                <span>{showDetails ? "Hide Details" : "Customize Preferences"}</span>
                {showDetails ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              {showDetails ? (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleDeclineAll}
                    className="w-full sm:w-auto"
                  >
                    Decline All
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveCustom}
                    className="w-full sm:w-auto"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Save Choices
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleDeclineAll}
                    className="w-full sm:w-auto"
                  >
                    Decline
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto"
                  >
                    Accept All
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
