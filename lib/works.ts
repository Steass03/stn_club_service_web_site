import { WORK_CATEGORY_SITE_ORDER } from "@/constants/work-categories";
import type { WorkExample } from "@/types";

export type WorksSortMode =
  | "date-desc"
  | "date-asc"
  | "category-alpha"
  | "category-site";

/** Чи містить робота всі передані токени (в заголовку, описі або тегах). */
export function workMatchesQuery(work: WorkExample, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const tokens = normalized
    .split(/\s+/)
    .map((t) => t.normalize("NFC"))
    .filter(Boolean);

  if (tokens.length === 0) return true;

  const haystack = [
    work.title,
    work.description,
    work.category,
    ...work.tags,
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFC");

  return tokens.every((token) => haystack.includes(token));
}

function categorySiteRank(category: string): number {
  return WORK_CATEGORY_SITE_ORDER[category] ?? 99;
}

export function sortWorks(works: WorkExample[], mode: WorksSortMode): WorkExample[] {
  const copy = [...works];

  switch (mode) {
    case "date-desc":
      return copy.sort((a, b) => b.date.localeCompare(a.date));
    case "date-asc":
      return copy.sort((a, b) => a.date.localeCompare(b.date));
    case "category-alpha":
      return copy.sort((a, b) => {
        const c = a.category.localeCompare(b.category, "uk");
        if (c !== 0) return c;
        return a.title.localeCompare(b.title, "uk");
      });
    case "category-site":
      return copy.sort((a, b) => {
        const ra = categorySiteRank(a.category);
        const rb = categorySiteRank(b.category);
        if (ra !== rb) return ra - rb;
        return b.date.localeCompare(a.date);
      });
    default:
      return copy;
  }
}

export function filterWorksByQuery(works: WorkExample[], query: string): WorkExample[] {
  return works.filter((w) => workMatchesQuery(w, query));
}
