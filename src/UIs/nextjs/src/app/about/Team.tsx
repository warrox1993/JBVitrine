"use client";

// CHANGE LOG:
// 2025-10-28 - codex: Migrated team section to CSS Modules, next/image, and shared Button component.

import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <>
      <div className={styles["team-header"]}>
        <Heading as="h2" accent className={styles["team-headingSpacing"]}>
          Notre Équipe
        </Heading>
        <p className={styles["team-subtitle"]}>
          Une équipe en construction, avec l’excellence au cœur de notre ADN et l’ambition
          de créer des expériences digitales mesurables.
        </p>
      </div>

      <div className={styles["team-grid"]} role="list">
        {/* Slot 1 – À recruter (Frontend) */}
        <article
          className={styles["team-member"]}
          role="listitem"
          aria-label="Consultant Frontend à recruter"
        >
          <div className={styles["team-avatar"]}>
            <div className={styles["team-recruitPlaceholder"]} aria-hidden="true">
              <span className={styles["team-placeholderMark"]} aria-hidden="true">
                ?
              </span>
            </div>
          </div>
          <span className={styles["team-recruitBadge"]} aria-hidden="true">
            Nous recrutons
          </span>
          <h3 className={styles["team-memberName"]}>Consultant Frontend</h3>
          <p className={styles["team-memberRole"]}>Développeur·se</p>
          <p className={styles["team-memberDesc"]}>
            Expert·e React/Next.js et design systems. Focalisé·e performance et UX. Rejoignez-nous
            pour façonner des interfaces élégantes et scalables.
          </p>
        </article>

        {/* Slot 2 – Membre central */}
        <article
          className={`${styles["team-member"]} ${styles["team-member--center"]}`}
          role="listitem"
          aria-label="Jean-Baptiste D. — CEO & Designer Produit"
        >
          <div className={styles["team-avatar"]}>
            <Image
              className={styles["team-avatarImage"]}
              src="/images/team/alexandre.jpg"
              alt="Portrait de Jean-Baptiste D."
              width={320}
              height={320}
              loading="lazy"
            />
          </div>
          <h3 className={styles["team-memberName"]}>Jean-Baptiste D.</h3>
          <p className={styles["team-memberRole"]}>CEO & Designer Produit</p>
          <p className={styles["team-memberDesc"]}>
            Conçoit des systèmes clairs où chaque détail sert le parcours. Esthétique utile,
            mesurable, durable.
          </p>
        </article>

        {/* Slot 3 – À recruter (Backend) */}
        <article
          className={styles["team-member"]}
          role="listitem"
          aria-label="Consultant Backend à recruter"
        >
          <div className={styles["team-avatar"]}>
            <div className={styles["team-recruitPlaceholder"]} aria-hidden="true">
              <span className={styles["team-placeholderMark"]} aria-hidden="true">
                ?
              </span>
            </div>
          </div>
          <span className={styles["team-recruitBadge"]} aria-hidden="true">
            Nous recrutons
          </span>
          <h3 className={styles["team-memberName"]}>Consultant Backend</h3>
          <p className={styles["team-memberRole"]}>Développeur·se</p>
          <p className={styles["team-memberDesc"]}>
            Expert·e Node.js/Python/Java/.Net. Architecture scalable, APIs robustes, fiabilité en
            production.
          </p>
        </article>
      </div>

      <p className={styles["team-note"]}>
        Selon le projet, nous activons un réseau d’experts associés (recherche utilisateur, contenu,
        vidéo, data).
      </p>

      <div className={styles["team-cta"]}>
        <h3 className={styles["team-ctaTitle"]}>Rejoindre SMIDJAN</h3>
        <p className={styles["team-ctaSubtitle"]}>
          Consultant orienté excellence et impact business, autonome et exigeant ? Parlons-en.
        </p>

        <Button
          as="a"
          href="#contact"
          variant="solid"
          size="md"
          ariaLabel="Postuler maintenant"
        >
          Postuler maintenant
        </Button>
      </div>
    </>
  );
}
