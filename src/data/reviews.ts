/**
 * Avis clients réels, recopiés depuis le profil AlloVoisins de l'entreprise.
 * Pour en ajouter : copier un bloc, garder le texte tel que publié (orthographe comprise, à la ponctuation près).
 * Ne jamais inventer ni reformuler un avis.
 */
export const reviewsSource = {
  name: "AlloVoisins",
  rating: 4.5,
  /** TODO : lien vers le profil public AlloVoisins (affiche un bouton « Voir tous les avis »). */
  url: "",
};

export const reviews = [
  {
    author: "Milie M.",
    date: "2025-09-25",
    rating: 5,
    service: "Couverture - Toiture",
    text: "Vraiment super, rien à dire, merci encore.",
  },
  {
    author: "Gaïa K.",
    date: "2025-08-30",
    rating: 5,
    service: "Couverture - Toiture",
    text: "Bonne prestation, fiable et efficace.",
  },
  {
    author: "Jimmy C.",
    date: "2025-02-06",
    rating: 5,
    service: "",
    text: "Entreprise sérieuse, réactive, travail soigné. Je recommande.",
  },
];
