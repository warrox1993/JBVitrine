import React from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./InsightTeaser.module.css";

/** Journal / guide teaser: NIS2 & CyFun — links to the on-site guide page. */
export function InsightTeaser() {
  return (
    <div className={styles.card}>
      <Reveal variant="left" className={styles.body}>
        <div className={styles.kick}>Guide gratuit</div>
        <h3>
          NIS2 &amp; CyFun&nbsp;: le guide de mise en conformité pour les{" "}
          <span className="accent">PME belges</span>
        </h3>
        <p>
          Ce que dit la loi, qui est concerné, quel niveau CyFun choisir.{" "}
          <b>Clair, sans jargon.</b>
        </p>
        <Button
          as="a"
          href="/conformite-nis2"
          variant="navy"
          className={styles.cta}
          trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
        >
          Lire le guide
        </Button>
      </Reveal>
      <Reveal variant="right" delay={100} className={styles.visual}>
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
      </Reveal>
    </div>
  );
}

export default InsightTeaser;
