import type { Metadata } from "next";
import { SITE, MAINTENANCE_CONFIG } from "@/site.config";
import { MaintenanceView } from "./maintenance-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Under Maintenance — ${SITE.name}`,
  description:
    "We are currently performing scheduled maintenance. Please check back shortly.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MaintenancePage() {
  return (
    <MaintenanceView
      title={MAINTENANCE_CONFIG.title}
      message={MAINTENANCE_CONFIG.message}
      estimatedEnd={MAINTENANCE_CONFIG.estimatedEnd || undefined}
      contactEmail={MAINTENANCE_CONFIG.contactEmail || undefined}
    />
  );
}
