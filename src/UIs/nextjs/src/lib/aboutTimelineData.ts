// src/UIs/nextjs/src/lib/aboutTimelineData.ts
export type TimelineItem = {
  year: string;              // ex: "2017"
  title: string;             // ex: "Lancement"
  text: string;              // ex: "Nous posons les bases..."
  imageUrl: string;          // background image (URL absolue ou /public)
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2017",
    title: "Nos débuts",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2017.jpg"
  },
  {
    year: "2018",
    title: "Premier palier",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2018.jpg"
  },
  {
    year: "2019",
    title: "Accélération",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2019.jpg"
  },
  {
    year: "2020",
    title: "Changement d’échelle",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2020.jpg"
  },
  {
    year: "2021",
    title: "Structuration",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2021.jpg"
  },
  {
    year: "2022",
    title: "Maturité",
    text: "Texte court et mesurable. Max ~240 caractères.",
    imageUrl: "/images/timeline/2022.jpg"
  }
];
