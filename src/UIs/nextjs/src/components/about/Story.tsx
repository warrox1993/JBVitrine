import { Heading } from "@/components/ui/Heading";
import styles from "./Story.module.css";

const ITEMS = [
  {
    year: "2021",
    title: "Origines",
    text: "Au départ, SMIDJAN était un atelier de passionnés, obsédés par le détail. Nous voulions réconcilier deux mondes : la beauté du design et la rigueur de l’ingénierie. C’est dans une petite pièce, autour d’un café et de beaucoup de post-its, que la première ligne de code a été écrite.",
  },
  {
    year: "2022",
    title: "Premiers projets",
    text: "Les premières collaborations ont posé les fondations de notre méthode : écrire du code clair, documenté, auditable. Chaque pixel devait répondre à une raison, chaque animation à une intention.",
  },
  {
    year: "2023",
    title: "La méthode",
    text: "Nous avons systématisé notre approche : un design system, des tokens, des composants réutilisables. Notre obsession : la cohérence. L’année 2023 fut celle de la formalisation — transformer l’artisanat en méthode.",
  },
  {
    year: "2024",
    title: "Accélération",
    text: "Nous avons intégré des outils de mesure plus fins, des audits de performance réguliers, et des revues croisées design/tech. Le lien entre valeur perçue et valeur mesurée s’est resserré.",
  },
  {
    year: "2025",
    title: "Aujourd’hui",
    text: "Nous produisons des livrables nets, traçables, optimisés Core Web Vitals, pensés pour durer. Notre ambition reste la même : des expériences qui marquent, un code qui tient, une méthode qui s’affine.",
  },
] as const;

export default function Story() {
  return (
    <section className={styles["story-root"]} aria-labelledby="story-heading">
      <Heading as="h2" accent className={styles["story-heading"]} id="story-heading">
        Notre histoire
      </Heading>
      <ul className={styles["story-list"]} role="list" aria-label="Chronologie 2021–2025">
        {ITEMS.map(({ year, title, text }) => (
          <li key={year} className={styles["story-item"]} role="listitem">
            <div className={styles["story-meta"]}>
              <strong className={styles["story-year"]} aria-label={`Année ${year}`}>
                {year}
              </strong>
              <span className={styles["story-title"]}>{title}</span>
            </div>
            <p className={styles["story-text"]}>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
