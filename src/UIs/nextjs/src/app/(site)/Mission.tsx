"use client";

import { Button } from "@/components/ui/Button/Button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import styles from "./Mission.module.css";

export default function Mission() {
  return (
    <div id="mission" className={styles["mission-root"]} aria-labelledby="mission-title">
      <AnimatedBackground variant="light" />
      <div className={styles["mission-background"]} aria-hidden="true">
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--1"]}`} />
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--2"]}`} />
        <span className={`${styles["mission-orb"]} ${styles["mission-orb--3"]}`} />
      </div>

      <div className={styles["mission-wrapper"]}>
        <h2 id="mission-title" className={styles["mission-heading"]}>
          Notre mission
        </h2>

        <p className={styles["mission-intro"]}>
          Chez SMIDJAN, nous croyons que la technologie n'a de valeur que lorsqu'elle sert des objectifs clairs : gagner du temps, renforcer la sécurité et améliorer les performances.
          Nous concevons des systèmes sur mesure, pensés pour durer, intégrés avec précision dans la réalité de chaque entreprise.
        </p>

        <div className={styles["mission-grid"]} role="list">
          <article className={styles["mission-card"]} role="listitem">
            <div className={styles["mission-cardIcon"]} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles["mission-icon"]}
                aria-hidden="true"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles["mission-cardTitle"]}>Performance technique</h3>
            <p className={styles["mission-cardText"]}>
              Nous bâtissons des fondations solides : code propre, architecture claire et maintenance facilitée.
              Chaque ligne est pensée pour la scalabilité.
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
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles["mission-cardTitle"]}>Sécurité intégrée</h3>
            <p className={styles["mission-cardText"]}>
              Nous anticipons les risques dès la conception. Tests automatisés, conformité, chiffrement et supervision sont intégrés au cœur de nos solutions.
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
            <h3 className={styles["mission-cardTitle"]}>Résultats mesurables</h3>
            <p className={styles["mission-cardText"]}>
              Nos projets se jugent aux chiffres. Nous mettons en place des indicateurs précis pour suivre l'impact réel sur votre activité.
            </p>
          </article>
        </div>

        <div className={styles["mission-cta"]}>
          <Button as="a" href="/services" variant="solid" size="md" ariaLabel="Découvrir nos services">
            Découvrir nos services
          </Button>
        </div>
      </div>
    </div>
  );
}
