import { site, services } from "./site";

type Json = Record<string, unknown>;

const abs = (base: URL | string, path: string) => new URL(path, base).href;

/** Retire les clés vides pour ne pas publier de données structurées incomplètes. */
function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(clean).filter((v) => !isEmpty(v)) as T;
  }
  if (value && typeof value === "object") {
    const out: Json = {};
    for (const [k, v] of Object.entries(value as Json)) {
      const c = clean(v);
      if (!isEmpty(c)) out[k] = c;
    }
    return out as T;
  }
  return value;
}
function isEmpty(v: unknown) {
  if (v === null || v === undefined || v === "") return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v as Json).length === 0;
  return false;
}

export const businessId = (base: URL | string) => abs(base, "/#entreprise");
export const websiteId = (base: URL | string) => abs(base, "/#site");

export function businessSchema(base: URL | string): Json {
  const a = site.address;
  return clean({
    "@type": "RoofingContractor",
    "@id": businessId(base),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: abs(base, "/"),
    telephone: site.phoneE164,
    email: site.email,
    logo: abs(base, "/logo-ragot.png"),
    image: [abs(base, "/og-image.jpg")],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress,
      postalCode: a.postalCode,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      addressCountry: a.addressCountry,
    },
    geo: site.geo && {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: site.region },
      ...site.cities.map((c) => ({ "@type": "City", name: c.name })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.openingHours.days,
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: "French",
      },
      {
        "@type": "ContactPoint",
        name: "Bureau",
        telephone: site.officePhoneE164,
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: "French",
      },
    ],
    knowsAbout: [
      "Couverture",
      "Réparation de toiture",
      "Démoussage de toiture",
      "Traitement hydrofuge",
      "Zinguerie",
      "Recherche de fuite",
      "Ravalement de façade",
      "Peinture de façade",
      "Isolation des combles",
      "Isolation thermique par l'extérieur",
      "Étanchéité de toit-terrasse",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.label, url: abs(base, s.href) },
      })),
    },
    sameAs: site.sameAs,
    foundingDate: site.foundingYear ? String(site.foundingYear) : undefined,
    founder: { "@type": "Person", name: site.director },
    taxID: site.siret,
    vatID: site.vatNumber,
  });
}

export function websiteSchema(base: URL | string): Json {
  return {
    "@type": "WebSite",
    "@id": websiteId(base),
    url: abs(base, "/"),
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": businessId(base) },
  };
}

export function webPageSchema(
  base: URL | string,
  opts: { url: string; title: string; description: string; image?: string; type?: string },
): Json {
  return clean({
    "@type": opts.type ?? "WebPage",
    "@id": `${opts.url}#page`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": businessId(base) },
    primaryImageOfPage: opts.image && { "@type": "ImageObject", url: opts.image },
  });
}

export function breadcrumbSchema(base: URL | string, items: { name: string; href: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(base, it.href),
    })),
  };
}

export function serviceSchema(
  base: URL | string,
  opts: { name: string; serviceType: string; description: string; href: string; offers: string[] },
): Json {
  return {
    "@type": "Service",
    "@id": `${abs(base, opts.href)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(base, opts.href),
    provider: { "@id": businessId(base) },
    areaServed: [
      { "@type": "AdministrativeArea", name: site.region },
      ...site.cities.map((c) => ({ "@type": "City", name: c.name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema(
  base: URL | string,
  a: { title: string; description: string; href: string; date: Date; updated?: Date; image?: string },
): Json {
  return clean({
    "@type": "BlogPosting",
    "@id": `${abs(base, a.href)}#article`,
    headline: a.title,
    description: a.description,
    url: abs(base, a.href),
    datePublished: a.date.toISOString(),
    dateModified: (a.updated ?? a.date).toISOString(),
    inLanguage: "fr-FR",
    image: a.image,
    author: { "@id": businessId(base) },
    publisher: { "@id": businessId(base) },
    mainEntityOfPage: abs(base, a.href),
  });
}
