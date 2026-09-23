import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** Guides et conseils (src/content/conseils/*.md). Le nom du fichier donne l'URL : /conseils/<nom>/ */
const conseils = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/conseils" }),
  schema: z.object({
    title: z.string(),
    /** Résumé affiché dans les listes et utilisé comme meta description (≈ 150 caractères). */
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Prestation liée : lien « Découvrir la prestation » et affichage sur la page métier. */
    service: z.enum(["couverture", "facade", "isolation", "etancheite"]),
    /** Saisons concernées, affichées en étiquettes. */
    seasons: z.array(z.enum(["Printemps", "Été", "Automne", "Hiver"])).default([]),
    /** Mis en avant sur l'accueil. */
    featured: z.boolean().default(false),
  }),
});

export const collections = { conseils };
