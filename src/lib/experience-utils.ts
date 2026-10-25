import type { CompanyCharm } from "@/types/experience";

export function getCompanyCharm(company: string): CompanyCharm {
  const c = company.toLowerCase();
  if (c.includes("mtel")) {
    return {
      monogram: "MT",
      bgGradient: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-300",
    };
  }
  if (c.includes("brilliant") || c.includes("million")) {
    return {
      monogram: "BM",
      bgGradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300",
    };
  }
  if (c.includes("ai9")) {
    return {
      monogram: "Ai9",
      bgGradient: "from-teal-500/20 to-emerald-500/20",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-300",
    };
  }
  const initials = company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return {
    monogram: initials || "EXP",
    bgGradient: "from-white/10 to-white/5",
    borderColor: "border-white/15",
    textColor: "text-text",
  };
}

export function getDuration(startStr: string, endStr: string): string {
  try {
    const parseMonthYear = (s: string) => {
      const trimmed = s.trim().toLowerCase();
      if (trimmed === "present") return new Date();
      const parts = trimmed.split(/\s+/);
      if (parts.length < 2) return null;
      const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
      ];
      const mIdx = monthNames.findIndex((m) => m.startsWith(parts[0].slice(0, 3)));
      const year = parseInt(parts[1], 10);
      if (mIdx === -1 || isNaN(year)) return null;
      return new Date(year, mIdx, 1);
    };

    const d1 = parseMonthYear(startStr);
    const d2 = parseMonthYear(endStr);
    if (!d1 || !d2) return "";

    const months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()) + 1;
    if (months <= 0) return "";

    const yrs = Math.floor(months / 12);
    const mos = months % 12;

    if (yrs > 0 && mos > 0) {
      return `${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo${mos > 1 ? "s" : ""}`;
    }
    if (yrs > 0) {
      return `${yrs} yr${yrs > 1 ? "s" : ""}`;
    }
    return `${mos} mo${mos > 1 ? "s" : ""}`;
  } catch {
    return "";
  }
}

export function extractSkills(text: string): string[] {
  const matches = Array.from(text.matchAll(/\[([a-zA-Z0-9\s._+-]+)\]/g));
  const unique = new Set<string>();
  for (const m of matches) {
    if (m[1]) {
      unique.add(m[1].trim());
    }
  }
  return Array.from(unique);
}
