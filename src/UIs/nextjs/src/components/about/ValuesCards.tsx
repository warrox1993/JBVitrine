import { Heading } from "@/components/ui/Heading";
import styles from "./ValuesCards.module.css";

type Value = { readonly title: string; readonly desc: string };

const VALUES: readonly Value[] = [
  {
    title: "Rigueur",
    desc: "Standards élevés, tests automatisés et revues croisées. Des livrables précis, mesurables et maintenables.",
  },
  {
    title: "Clarté",
    desc: "Parcours lisibles et hiérarchie nette. Chaque décision est documentée pour garder le cap.",
  },
  {
    title: "Impact",
    desc: "Pilotage par les indicateurs qui comptent: performance, adoption et conversion.",
  },
] as const;

export default function ValuesCards() {
  return (
    <section
      className={styles["values-section"]}
      aria-labelledby="values-heading"
    >
      <header className={styles["values-header"]}>
        <Heading
          as="h2"
          accent
          className={styles["values-heading"]}
          id="values-heading"
        >
          Nos valeurs
        </Heading>
      </header>
      <div className={styles["values-grid"]}>
        {VALUES.map(({ title, desc }) => (
          <article key={title} className={styles["values-card"]}>
            <h3 className={styles["values-cardTitle"]}>{title}</h3>
            <p className={styles["values-cardDesc"]}>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
