import type { Metadata } from "next";

import HeroAbout from "@/components/features/about/HeroAbout";
import Timeline from "../Timeline";
import { Footer } from "@/components/layout/Footer/Footer";
import styles from "../about.module.css";

export const metadata: Metadata = {
  title: "À propos - Smidjan | Agence Web & Cybersécurité à Liège",
  description:
    "L'histoire de Smidjan et de son fondateur : de la découverte de l'informatique à 7 ans à l'expertise en développement web, cybersécurité et automatisation IA à Liège et en Wallonie.",
  keywords: [
    "à propos Smidjan",
    "agence web Liège",
    "expert cybersécurité Belgique",
    "développeur web Wallonie",
    "parcours fondateur",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "À propos - Smidjan",
    description:
      "Le parcours derrière Smidjan : une passion de l'informatique depuis l'enfance, la cybersécurité et le développement web sur mesure à Liège.",
    type: "website",
    url: "https://smidjan.be/about",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <HeroAbout />

      <section
        className={styles.section}
        aria-labelledby="about-timeline-title"
      >
        <div className={styles.sectionContainer}>
          <h2 id="about-timeline-title">Notre parcours</h2>
          <Timeline />
        </div>
      </section>

      <Footer />
    </div>
  );
}
