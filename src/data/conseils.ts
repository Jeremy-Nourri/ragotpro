import { getCollection, type CollectionEntry } from "astro:content";
import { services } from "./site";

export type Guide = CollectionEntry<"conseils">;

/** Tous les guides, du plus récent au plus ancien. */
export async function getGuides(filter?: (g: Guide) => boolean): Promise<Guide[]> {
  const all = await getCollection("conseils", filter);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const guideHref = (g: Guide) => `/conseils/${g.id}/`;

/** Temps de lecture estimé (≈ 200 mots/min), arrondi à la minute supérieure. */
export function readingTime(g: Guide): number {
  const words = (g.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const serviceOf = (g: Guide) => services.find((s) => s.key === g.data.service)!;

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
