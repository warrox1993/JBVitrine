import { Heading } from "@/components/ui/Heading";
import styles from "./Differentiators.module.css";

const CARDS = [
  {
    title: "Design system concret",
    text: "Composants réels, documentés, utilisables. Pas de maquettage hors-sol.",
  },
  {
    title: "Performance budgétée",
    text: "Perf mesurée, objectifs CWV intégrés dans la dette produit.",
  },
  {
    title: "Résultats mesurables",
    text: "KPIs définis, learning loops, décisions par la donnée.",
  },
  {
    title: "Transparence du code",
    text: "Code clair, maintenable, prêt pour l’audit.",
  },
] as const;

export default function Differentiators() {
  return (
    <section className={styles["diff-section"]} aria-labelledby="diff-heading">
      <div className={styles["diff-container"]}>
        <Heading as="h2" accent className={styles["diff-heading"]} id="diff-heading">
          Ce qui nous distingue
        </Heading>
        <div className={styles["diff-grid"]}>
          {CARDS.map(({ title, text }, index) => {
            const cardId = `diff-card-${index}`;
            return (
              <article key={title} className={styles["diff-card"]} aria-labelledby={cardId}>
                <h3 id={cardId} className={styles["diff-cardTitle"]}>
                {title}
              </h3>
              <p className={styles["diff-cardText"]}>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
