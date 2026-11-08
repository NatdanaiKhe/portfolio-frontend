
export function getDuration(
  startStr?: string | null,
  endStr?: string | null,
): string {
  try {
    if (!startStr) return "";

    const parseMonthYear = (s?: string | null) => {
      if (!s) return null;
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
    const d2 = parseMonthYear(endStr || "Present");
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
