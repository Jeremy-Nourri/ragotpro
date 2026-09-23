/**
 * Configuration centrale de l'entreprise.
 * Tout ce qui sert au SEO local (NAP, zone, horaires) est défini ici une seule fois
 * et réutilisé dans les pages, le footer et les données structurées Schema.org.
 *
 * ⚠️ Les champs marqués TODO doivent être complétés avant la mise en ligne.
 */

const phone = "06 41 88 54 49";
/** Ligne fixe du bureau (renvoyée sur le portable) : rassure une partie de la clientèle. */
const officePhone = "09 82 56 86 07";
const e164 = (n: string) => "+33" + n.replace(/\D/g, "").replace(/^0/, "");

export const site = {
  name: "RAGOT Couvreur Pro",
  /** Entrepreneur individuel : nom du dirigeant suivi de la mention « EI » (obligatoire). */
  legalName: "RAGOT Manzon EI",
  director: "Manzon RAGOT",
  tagline: "Artisan couvreur et façadier dans l'Oise",
  description:
    "Artisan couvreur dans l'Oise : couverture, réparation et démoussage de toiture, zinguerie, façade et ravalement, isolation et étanchéité toit-terrasse. Garantie décennale, devis et déplacement gratuits.",

  phone,
  phoneHref: "tel:" + e164(phone),
  phoneE164: e164(phone),
  officePhone,
  officePhoneHref: "tel:" + e164(officePhone),
  officePhoneE164: e164(officePhone),
  email: "contact@ragotpro.fr",

  /** Zone d'intervention : libellé court (« Zone d'intervention : … ») et forme en phrase. */
  zone: "Oise (60) — Creil, Beauvais, Chantilly et alentours",
  zoneIn: "dans l'Oise, de Creil à Beauvais et de Chantilly à Grandvilliers",
  /** Communes desservies (liste non exhaustive) — alimente la section « Zones d'intervention » et areaServed (Schema.org). */
  cities: [
    { name: "Creil", postalCode: "60100" },
    { name: "Nogent-sur-Oise", postalCode: "60180" },
    { name: "Beauvais", postalCode: "60000" },
    { name: "Chantilly", postalCode: "60500" },
    { name: "Gouvieux", postalCode: "60270" },
    { name: "Pont-Sainte-Maxence", postalCode: "60700" },
    { name: "Liancourt", postalCode: "60140" },
    { name: "Mogneville", postalCode: "60140" },
    { name: "Cauffry", postalCode: "60290" },
    { name: "Rantigny", postalCode: "60290" },
    { name: "Mouy", postalCode: "60250" },
    { name: "Fitz-James", postalCode: "60600" },
    { name: "Milly-sur-Thérain", postalCode: "60112" },
    { name: "Saint-Just-en-Chaussée", postalCode: "60130" },
    { name: "Saint-Omer-en-Chaussée", postalCode: "60860" },
    { name: "Grandvilliers", postalCode: "60210" },
    { name: "Clermont", postalCode: "60600" },
    { name: "Tillé", postalCode: "60000" },
    { name: "Senlis", postalCode: "60300" },
    { name: "Bresles", postalCode: "60510" },
  ],
  /** Département desservi (en plus des communes). */
  region: "Oise",

  address: {
    streetAddress: "5 rue de la Colline des Puits",
    postalCode: "60140",
    addressLocality: "Mogneville",
    addressRegion: "Hauts-de-France",
    addressCountry: "FR",
  },
  /** Dépôt (matériel et matériaux), affiché en plus du siège. */
  depot: {
    streetAddress: "2b rue du Château",
    postalCode: "60860",
    addressLocality: "Saint-Omer-en-Chaussée",
  },
  /** Coordonnées GPS du siège (améliore le SEO local). */
  geo: null as null | { latitude: number; longitude: number }, // TODO

  openingHours: {
    label: "Prise de RDV du lundi au samedi",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00", // TODO : à confirmer
    closes: "19:00", // TODO : à confirmer
  },

  siren: "831 773 700",
  siret: "831 773 700 00016",
  rcs: "831 773 700 R.C.S. Beauvais",
  vatNumber: "FR89831773700",
  insurance: "", // TODO : assureur décennale + zone de couverture

  /** Profils publics (Google Business Profile, Facebook…) — alimente sameAs. */
  sameAs: [] as string[],

  foundingYear: 2017 as number | null,
};

export type NavKey = "" | "couverture" | "facade" | "isolation" | "etancheite" | "contact";

export const services = [
  {
    key: "couverture" as const,
    href: "/couverture-toiture/",
    nav: "Couverture",
    label: "Couverture & toiture",
  },
  {
    key: "facade" as const,
    href: "/facade-ravalement/",
    nav: "Façade",
    label: "Façade & ravalement",
  },
  {
    key: "isolation" as const,
    href: "/isolation/",
    nav: "Isolation",
    label: "Isolation",
  },
  {
    key: "etancheite" as const,
    href: "/etancheite-toit-terrasse/",
    nav: "Étanchéité",
    label: "Étanchéité toit-terrasse",
  },
];
