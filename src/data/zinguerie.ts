// Sous-pages du cocon /zinguerie/ : libellés, accroches des cartes et photos.
// Utilisé par la page mère, les sous-pages (cartes « autres prestations ») et
// le plan du site.
export interface SousPageZinguerie {
  slug: string;
  label: string;
  desc: string;
  image: string;
  alt: string;
}

export const sousPagesZinguerie: SousPageZinguerie[] = [
  {
    slug: 'gouttieres-zinc',
    label: 'Gouttières en zinc',
    desc: 'La gouttière qui dure : zinc soudé et façonné sur mesure pour évacuer l’eau pendant des décennies.',
    image: '/images/gouttiere-zinc-essonne.webp',
    alt: 'Gouttière en zinc demi-ronde posée en bas de pente d’une toiture en tuiles',
  },
  {
    slug: 'gouttieres-aluminium',
    label: 'Gouttières en aluminium',
    desc: 'Profilée en longueur continue, sans raccord, dans de nombreux coloris. L’aluminium ne rouille pas.',
    image: '/images/gouttiere-aluminium-profilage-essonne.webp',
    alt: 'Gouttière en aluminium profilée en une seule longueur devant le camion de l’entreprise',
  },
  {
    slug: 'gouttieres-pvc',
    label: 'Gouttières en PVC',
    desc: 'Une solution légère et économique, simple à entretenir, pour les petites toitures et les annexes.',
    image: '/images/zinguerie-toiture-tuiles-essonne.webp',
    alt: 'Maison de l’Essonne avec sa toiture en tuiles et ses gouttières',
  },
  {
    slug: 'descentes-eaux-pluviales',
    label: 'Descentes d’eaux pluviales',
    desc: 'Les tuyaux et raccords qui conduisent l’eau de la gouttière jusqu’au sol ou au réseau.',
    image: '/images/zinguerie-gouttiere-descente-zinc-essonne.webp',
    alt: 'Gouttière et descente d’eaux pluviales en zinc sur une façade',
  },
  {
    slug: 'noues-aretiers',
    label: 'Noues et arêtiers',
    desc: 'Les lignes de jonction de la toiture, façonnées pour canaliser l’eau sans fuite.',
    image: '/images/noue-zinc-toiture-essonne.webp',
    alt: 'Noue en zinc entre deux pans de toiture en tuiles',
  },
  {
    slug: 'solins-raccords',
    label: 'Solins et raccords',
    desc: 'L’étanchéité entre la couverture et les murs, les cheminées et les souches.',
    image: '/images/cheminee-solin-essonne.webp',
    alt: 'Solin de cheminée en zinc sur une toiture en tuiles',
  },
  {
    slug: 'couvertines',
    label: 'Couvertines',
    desc: 'Le couronnement métallique qui protège le haut des murs et des acrotères de la pluie.',
    image: '/images/zinguerie-habillage-zinc-facade-essonne.webp',
    alt: 'Couvertine et habillage métallique en tête de mur sur une façade',
  },
];

export const sousPage = (slug: string) => sousPagesZinguerie.find((s) => s.slug === slug)!;
