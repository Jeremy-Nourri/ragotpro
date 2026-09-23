// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// URL de production — à définir avant la mise en ligne (canonical, sitemap, Open Graph).
const SITE_URL = process.env.SITE_URL ?? "https://www.ragotpro.fr";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/mentions-legales/"),
      changefreq: "monthly",
      lastmod: new Date(),
      i18n: { defaultLocale: "fr", locales: { fr: "fr-FR" } },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      weights: ["500 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Helvetica", "Arial", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Barlow",
      cssVariable: "--font-barlow",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Helvetica", "Arial", "sans-serif"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
