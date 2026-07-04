// src/UIs/nextjs/src/lib/aboutTimelineData.ts
export type TimelineItem = {
  year: string; // ex: "2017"
  title: string; // ex: "Lancement"
  text: string; // ex: "Nous posons les bases..."
  imageUrl: string; // background image (URL absolue ou /public)
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2000",
    title: "Premiers pas dans l'informatique",
    text: "À 7 ans, découverte de Windows 2000 et d'une passion immédiate pour l'informatique. Déjà à cet âge, une facilité déconcertante dans le domaine : installation de logiciels pour la famille alors que les adultes n'y arrivaient pas.",
    imageUrl: "/images/timeline/2000.jpg",
  },
  {
    year: "2005",
    title: "Découverte de Linux et l'autonomie",
    text: "Premier ordinateur personnel à 12 ans. Faute de licence Windows, exploration d'internet à la bibliothèque pour trouver une alternative : découverte de Linux, puis de Kali Linux. Face à un quota internet imposé, apprentissage des bases de la sécurité réseau pour comprendre les contrôles parentaux. Cette curiosité technique a jeté les bases de ma future expertise en cybersécurité. [Lire mon article éducatif sur la sécurité WiFi](/blog/securite-wifi-controle-parental-education)",
    imageUrl: "/images/timeline/2005.jpg",
  },
  {
    year: "2008",
    title: "Initiation à la cybersécurité",
    text: "À 15 ans, découverte que le voisin utilisait la connexion internet familiale. Application de techniques de sécurité réseau pour identifier l'intrusion et envoyer un message d'avertissement directement sur son écran. Début d'une amitié basée sur des défis techniques mutuels et une passion commune pour le hacking éthique.",
    imageUrl: "/images/timeline/2008.jpg",
  },
  {
    year: "2012",
    title: "Diplôme technique en informatique",
    text: "Fin du secondaire avec un diplôme en technique de qualification informatique. Apprentissage de langages de programmation (Python, Java) et consolidation des bases théoriques et pratiques.",
    imageUrl: "/images/timeline/2012.jpg",
  },
  {
    year: "2014",
    title: "Service militaire : télécommunications et cybersécurité",
    text: "Entrée dans l'armée belge au sein du département télécommunications. Deux ans de formation intensive sur les réseaux, la sécurité des communications et la cyberdéfense. Acquisition de compétences opérationnelles en environnement critique.",
    imageUrl: "/images/timeline/2014.jpg",
  },
  {
    year: "2020",
    title: "Études de droit à l'Université de Liège",
    text: "Début d'un bachelier en droit à l'ULiège (2020-2024). Exploration du lien entre droit et cybersécurité : RGPD, conformité, cybercriminalité. Une expérience enrichissante, mais la réalisation progressive que l'informatique reste la véritable passion.",
    imageUrl: "/images/timeline/2020.jpg",
  },
  {
    year: "2024",
    title: "Retour aux sources : certifications cybersécurité",
    text: "Après l'obtention du bachelier en droit, retour définitif à l'informatique. Début de formations en ligne et certifications : CompTIA Security+, plateforme TryHackMe. Distinction claire entre hacking éthique (pénétration testing) et cracking (piratage illégal).",
    imageUrl: "/images/timeline/2024.jpg",
  },
  {
    year: "2025",
    title: "Formation Java & Cybersécurité intensive",
    text: "Formation intensive Java orientée cybersécurité chez TechnofuturTIC à Charleroi. Apprentissage approfondi des techniques de sécurisation d'applications web (OWASP Top 10, authentification, tests de pénétration). Naissance de SMIDJAN : expertise technique au service des PME belges.",
    imageUrl: "/images/timeline/2025.jpg",
  },
  {
    year: "2026",
    title: "Le grand saut : passage en indépendant",
    text: "Je suis en train de passer indépendant avec SMIDJAN. Après des années d'expérience cumulée en informatique, cybersécurité et développement web, je franchis le cap de l'entrepreneuriat. L'objectif : accompagner les PME wallonnes dans leur transformation digitale avec une expertise pointue en sécurité, développement moderne (Next.js, React) et automatisation IA. Un nouveau chapitre s'ouvre, porté par la passion technique et l'envie d'avoir un impact concret sur le tissu économique local.",
    imageUrl: "/images/timeline/2026.jpg",
  },
];
