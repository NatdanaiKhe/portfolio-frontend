export const SITE = {
  name: "Natdanai Khemthong",
  role: "Full-Stack Developer",
  shortName: "Natdanai",
  url: process.env.DOMAIN || "https://natdanai.dev",
  locale: "en_US",
  description:
    "Natdanai Khemthong builds clean, responsive, high-performance web interfaces and end-to-end solutions. View selected projects and experience.",
  ogImageAlt: "Natdanai Khemthong — Developer portfolio card",
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume",
} as const;

export const MAINTENANCE_CONFIG = {
  get isEnabled() {
    const val =
      process.env.MAINTENANCE_MODE || process.env.NEXT_PUBLIC_MAINTENANCE_MODE;
    return val === "true" || val === "1";
  },
  get title() {
    return (
      process.env.MAINTENANCE_TITLE ||
      process.env.NEXT_PUBLIC_MAINTENANCE_TITLE ||
      "Under Maintenance"
    );
  },
  get message() {
    return (
      process.env.MAINTENANCE_MESSAGE ||
      process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE ||
      "We're currently performing scheduled maintenance to improve our site and services. Please check back shortly."
    );
  },
  get estimatedEnd() {
    return (
      process.env.MAINTENANCE_ESTIMATED_END ||
      process.env.NEXT_PUBLIC_MAINTENANCE_ESTIMATED_END ||
      ""
    );
  },
  get contactEmail() {
    return (
      process.env.MAINTENANCE_CONTACT_EMAIL ||
      process.env.NEXT_PUBLIC_MAINTENANCE_CONTACT_EMAIL ||
      ""
    );
  },
  get bypassSecret() {
    return process.env.MAINTENANCE_BYPASS_SECRET || "";
  },
};
