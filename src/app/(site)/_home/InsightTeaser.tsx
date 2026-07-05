import React from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./InsightTeaser.module.css";

/** Journal / guide teaser: NIS2 & CyFun PME guide download. */
export function InsightTeaser() {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.kick}>Guide gratuit</div>
        <h3>
          NIS2 &amp; CyFun&nbsp;: le guide de mise en conformité pour les PME belges
        </h3>
        <p>
          Ce que dit la loi, qui est concerné, comment choisir votre niveau CyFun et par où commencer
          maintenant que NIS2 est en vigueur — en langage clair, sans jargon.
        </p>
        <div className={styles.meta}>
          <span>
            <Icon name="book" />
            18 pages
          </span>
          <span>
            <Icon name="clock" />
            Lecture 12 min
          </span>
        </div>
        <Button
          as="a"
          href="/contact"
          variant="navy"
          className={styles.cta}
          trailingIcon={<Icon name="download" strokeWidth={2.2} />}
        >
          Télécharger le guide
        </Button>
      </div>
      <div className={styles.visual}>
        <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
        <div className={styles.mock} aria-hidden="true">
          <div className={styles.hd}>
            <div className={styles.tag}>Guide · Conformité</div>
            <h5>NIS2 &amp; CyFun pour les PME</h5>
          </div>
          <div className={styles.bd}>
            <div className={styles.bar} />
            <div className={`${styles.bar} ${styles.s}`} />
            <div className={`${styles.bar} ${styles.o}`} />
            <div className={styles.bar} />
            <div className={`${styles.bar} ${styles.s}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightTeaser;
