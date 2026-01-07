import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import styles from "./ProcessMini.module.css";

const STEPS = [
  {
    title: "Découverte",
    text: "Comprendre l'entreprise, son marché, ses contraintes et ses ambitions. Nous analysons vos objectifs business avant d'écrire la première ligne de code.",
  },
  {
    title: "Design System",
    text: "Construire une identité visuelle et technique cohérente. Chaque interface repose sur une base solide : accessibilité, cohérence et performance.",
  },
  {
    title: "Implémentation",
    text: "Développement modulaire, documentation continue, tests et intégration CI/CD. Chaque composant est conçu pour être évolutif.",
  },
  {
    title: "Mesure & évolution",
    text: "Mise en production, monitoring et optimisation continue. Votre produit vit, apprend et s'améliore dans le temps.",
  },
] as const;

export default function ProcessMini() {
  return (
    <section className={styles["process-root"]} aria-labelledby="process-mini-title">
      <header className={styles["process-header"]}>
        <Heading as="h2" accent className={styles["process-heading"]} id="process-mini-title">
          Notre méthode
        </Heading>
        <p className={styles["process-intro"]}>
          Nous avons forgé une approche unique qui combine rigueur d'ingénierie et agilité produit.
          Chaque projet suit un processus clair, que nous appelons le <strong>Cycle de Forge</strong>.
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
