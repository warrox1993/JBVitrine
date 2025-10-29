import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import styles from "./ProcessMini.module.css";

const STEPS = [
  {
    title: "Découverte",
    text: "Nous commençons par comprendre le vrai besoin, pas la demande initiale. Audit, interviews, objectifs.",
  },
  {
    title: "Design System",
    text: "Nous définissons les tokens, les couleurs, les typographies, les composants, et leur documentation.",
  },
  {
    title: "Implémentation",
    text: "Chaque ligne de code respecte les standards du projet, du naming convention jusqu’à la CI/CD.",
  },
  {
    title: "Mesure & itération",
    text: "Les produits évoluent. Nous mesurons, analysons, corrigeons, itérons.",
  },
] as const;

export default function ProcessMini() {
  return (
    <section className={styles["process-root"]} aria-labelledby="process-mini-title">
      <header className={styles["process-header"]}>
        <Heading as="h2" accent className={styles["process-heading"]} id="process-mini-title">
          Méthode
        </Heading>
        <p className={styles["process-intro"]}>
          Notre méthode n’est pas un secret, c’est une discipline. Nous la partageons car elle garantit
          qualité, prédictibilité et performance.
        </p>
      </header>

      <ol className={styles["process-grid"]} aria-label="Étapes du processus">
        {STEPS.map(({ title, text }) => (
          <li key={title} className={styles["process-step"]}>
            <strong className={styles["process-stepTitle"]}>{title}</strong>
            <span className={styles["process-stepText"]}>{text}</span>
          </li>
        ))}
      </ol>

      <p className={styles["process-linkWrapper"]}>
        <Link className={styles["process-link"]} href="/processus">
          Lire le processus
          <span className={styles["process-linkIcon"]} aria-hidden="true">
            →
          </span>
        </Link>
      </p>
    </section>
  );
}
