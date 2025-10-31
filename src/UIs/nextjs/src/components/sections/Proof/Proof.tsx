"use client";
import styles from "./Proof.module.css";

export function Proof() {
  return (
    <section
      id="premiers-partenaires"
      aria-labelledby="premiers-partenaires-title"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 id="premiers-partenaires-title" className={styles.title}>
          Devenir partenaire d'une agence, c'est choisir une vision.
        </h2>

        <p className={styles.lead}>
          Nous lançons actuellement nos premiers projets clients — et nous cherchons des marques prêtes à co-construire cette nouvelle génération de sites : plus rapides, plus sûrs, plus intelligents.
        </p>

        <p className={styles.conclusion}>
          Vous serez peut-être le premier à partager votre expérience Smidjan.
        </p>

        <div className={styles.ctaWrapper}>
          <a
            href="/contact"
            aria-label="Démarrer un projet avec Smidjan"
            className={styles.cta}
          >
            Démarrer un projet
          </a>
        </div>
      </div>
    </section>
  );
}
