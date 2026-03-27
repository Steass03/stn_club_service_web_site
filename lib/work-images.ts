import type { WorkExample } from "@/types";

/** Усі URL фото для кейсу: `images` або застарілий одиночний `image`. */
export function getWorkImageUrls(work: WorkExample): string[] {
  if (work.images?.length) return work.images.filter(Boolean);
  if (work.image) return [work.image];
  return [];
}
