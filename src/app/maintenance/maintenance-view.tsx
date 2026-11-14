"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Wrench, Clock, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenanceViewProps {
  title: string;
  message: string;
  estimatedEnd?: string;
  contactEmail?: string;
}

export function MaintenanceView({
  title,
  message,
  estimatedEnd,
  contactEmail,
}: MaintenanceViewProps) {
  const reduce = useReducedMotion();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg px-6 py-16">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status Chip */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span>System Maintenance</span>
        </div>

        {/* Icon Container */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-text/[0.08] bg-bg-elevated text-accent shadow-lg shadow-accent/5">
          <Wrench className="h-8 w-8" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {title}
        </h1>

        {/* Message */}
        <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
          {message}
        </p>

        {/* Estimated End Time Card (optional) */}
        {estimatedEnd && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-text/[0.08] bg-bg-elevated px-4 py-3 text-left">
            <Clock className="h-4 w-4 shrink-0 text-text-muted" />
            <div className="text-xs">
              <span className="font-medium text-text">Estimated Return: </span>
              <span className="text-text-muted">{estimatedEnd}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="default"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>{isRefreshing ? "Checking..." : "Check Again"}</span>
          </Button>

          {contactEmail && (
            <Button variant="secondary" asChild className="gap-2">
              <a href={`mailto:${contactEmail}`}>
                <Mail className="h-4 w-4 text-text-muted" />
                <span>Contact</span>
              </a>
            </Button>
          )}
        </div>

        {/* Brand / Sign-off */}
        <p className="mt-12 text-xs tracking-wider text-text-faint uppercase">
          Natdanai Khemthong
        </p>
      </motion.div>
    </div>
  );
}
