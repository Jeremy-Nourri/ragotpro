# Site RAGOT Couvreur Pro

Site vitrine statique — Astro 7, Tailwind CSS 4, pnpm. Recréé depuis la maquette
`../Site artisan couvreur moderne/design_handoff_site_ragot/`.

## Commandes

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # génère dist/ (site 100 % statique, à déposer sur n'importe quel hébergeur)
pnpm preview    # sert dist/ en local
pnpm check      # vérification TypeScript / Astro
pnpm icons      # régénère favicons, logo Schema.org et image Open Graph (public/)
```

Variables d'environnement (voir `.env.example`) :

- `SITE_URL` : domaine de production (canonical, sitemap, Open Graph, JSON-LD).
- `PUBLIC_FORM_ENDPOINT` : URL de réception du formulaire de devis (Formspree, Web3Forms…).

## Structure

```
src/
├── data/site.ts        ← coordonnées, zone, horaires, SIRET… (source unique)
├── data/schema.ts      ← générateurs Schema.org (JSON-LD)
├── layouts/BaseLayout  ← <head> SEO complet, header, footer
├── components/         ← Header, Footer, PageHero, Photo, QuoteForm, Faq…
├── pages/              ← accueil, 4 pages métier, mentions légales, 404, robots.txt
└── assets/             ← logo + photos du client (optimisées au build)
```

## SEO et performance

- Une page par métier avec URL parlante, `<title>` et meta description dédiés, un seul H1.
- JSON-LD : `RoofingContractor` (LocalBusiness), `WebSite`, `WebPage`,
  `BreadcrumbList`, `Service` et `FAQPage` sur chaque page métier.
- Canonical, Open Graph et Twitter Card, `geo.region`, `sitemap-index.xml` (avec lastmod), `robots.txt`.
- Images : AVIF + WebP + JPEG de repli, `srcset`/`sizes`, dimensions explicites (pas de décalage
  de mise en page), image du hero chargée en priorité, lazy loading ailleurs. Les montages
  avant/après ne sont jamais recadrés.
- Polices Archivo et Barlow auto-hébergées (API Fonts d'Astro), préchargées, avec polices de
  repli à métriques ajustées (évite le saut de texte au chargement).
- CSS intégré dans la page, pas de framework JS : le seul script est celui du formulaire.
- Accessibilité : lien d'évitement, `aria-current`, focus visible, contrastes AA, FAQ en `<details>`.

## À compléter avant la mise en ligne

Tout se règle dans `src/data/site.ts` (chercher `TODO`) :

1. **Zone d'intervention** (`zone`, `areaServed`) : c'est le point le plus important pour le SEO local.
   Les titres disent « dans l'Oise » : les préciser si la zone est plus fine (ex. « Creil, Clermont… »).
2. Coordonnées GPS, assurance décennale, horaires (adresse, e-mail, SIRET, RCS et TVA sont renseignés).
3. `SITE_URL` (par défaut `https://www.ragotpro.fr`, le domaine affiché sur le camion) et `PUBLIC_FORM_ENDPOINT` (service de réception du formulaire).
4. Photos étanchéité : les déposer dans `src/assets/photos/` et les brancher sur
   `etancheite-toit-terrasse.astro` (voir le commentaire TODO).
6. Faire relire les FAQ par le client (fréquences, conseils).
7. Après la mise en ligne : créer la fiche **Google Business Profile** avec les mêmes nom, adresse
   et téléphone que le site, l'ajouter dans `sameAs`, puis soumettre le sitemap dans Google Search Console.
