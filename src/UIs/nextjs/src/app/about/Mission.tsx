"use client";

import { Button } from "@/components/ui/Button/Button";
import styles from "./Mission.module.css";

export default function Mission() {
  return (
    <div id="mission" className={styles["mission-root"]} aria-labelledby="mission-title">
      <div className={styles["mission-background"]} aria-hidden="true">
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--1"]}`} />
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--2"]}`} />
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--3"]}`} />
      </div>

      <div className={styles["mission-wrapper"]}>
        <h2 id="mission-title" className={styles["mission-heading"]}>
          Notre mission
        </h2>

        <div className={styles["mission-grid"]} role="list">
          <article className={styles["mission-card"]} role="listitem">
            <div className={styles["mission-cardIcon"]} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles["mission-icon"]}
                aria-hidden="true"
              >
                <path
                  d="M3 20h18M5 20l2-7 5-5 5 5 2 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles["mission-cardTitle"]}>La forge technique</h3>
            <p className={styles["mission-cardText"]}>
              Nous transformons le code brut en expériences raffinées. Chaque ligne est forgée
              avec précision, chaque interface sculptée avec intention.
            </p>
          </article>

          <article className={styles["mission-card"]} role="listitem">
            <div className={styles["mission-cardIcon"]} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles["mission-icon"]}
                aria-hidden="true"
              >
                <path
                  d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles["mission-cardTitle"]}>L’art & la science</h3>
            <p className={styles["mission-cardText"]}>
              Notre approche marie excellence technique et sensibilité artistique pour créer des
              produits qui inspirent confiance et fluidité.
            </p>
          </article>

          <article className={styles["mission-card"]} role="listitem">
            <div className={styles["mission-cardIcon"]} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles["mission-icon"]}
                aria-hidden="true"
              >
                <path
                  d="M3 12h6v9H3zM15 3h6v18h-6zM9 7h6v14H9z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles["mission-cardTitle"]}>Impact mesurable</h3>
            <p className={styles["mission-cardText"]}>
              Nous visons des résultats tangibles. Chaque décision est guidée par des métriques
              claires et des effets concrets pour votre marque.
            </p>
          </article>
        </div>

        <blockquote className={styles["mission-statement"]}>
          <p className={styles["mission-quote"]}>
            SMIDJAN est né d’une conviction :
            <span className={styles["mission-highlight"]}>
              la technologie n’est pas un but, c’est un matériau
            </span>
            . Comme une forge, nous transformons ce matériau — code, données, interfaces — en
            <span className={styles["mission-highlight"]}>
              expériences utiles, élégantes et durables
            </span>
            .
          </p>
        </blockquote>

        <div className={styles["mission-cta"]}>
          <Button as="a" href="#contact" variant="solid" size="md" ariaLabel="Discuter de votre vision">
            Discuter de votre vision
          </Button>
        </div>
      </div>
    </div>
  );
}
