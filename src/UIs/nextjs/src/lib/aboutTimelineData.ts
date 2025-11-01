// src/UIs/nextjs/src/lib/aboutTimelineData.ts
export type TimelineItem = {
  year: string; // ex: "2017"
  title: string; // ex: "Lancement"
  text: string; // ex: "Nous posons les bases..."
  imageUrl: string; // background image (URL absolue ou /public)
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2017",
    title: "Les débuts",
    text: "Premiers projets indépendants, volonté de combiner design et ingénierie logicielle dans une approche sur mesure.",
    imageUrl: "/images/timeline/2017.jpg",
  },
  {
    year: "2020",
    title: "La méthode prend forme",
    text: "Structuration autour d'une exigence : livrer des solutions stables, scalables et maintenables, sans compromis sur la qualité.",
    imageUrl: "/images/timeline/2020.jpg",
  },
  {
    year: "2024",
    title: "Naissance de SMIDJAN",
    text: "Fusion entre expertise technique et sens du produit. SMIDJAN devient la forge où les idées prennent forme, avec un objectif simple : allier exigence et impact.",
    imageUrl: "/images/timeline/2024.jpg",
  },
];
