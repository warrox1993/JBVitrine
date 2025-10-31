"use client";
import { Heading } from "@/components/ui/Heading";
import styles from "./Process.module.css";

export function Process() {
  const steps = [
    {
      num: "01",
      title: "Découverte",
      content: (
        <div className={styles.panel}>
          <p>On explore vos objectifs, votre audience et vos concurrents pour révéler votre avantage stratégique.</p>
          <p>Livrables : rapport benchmark, stratégie UX, notes de faisabilité technique.</p>
        </div>
      ),
    },
    {
      num: "02",
      title: "Conception",
      content: (
        <div className={styles.panel}>
          <p>On conçoit une expérience claire, esthétique et parfaitement adaptée à vos utilisateurs.</p>
          <p>Livrables : fondations design system, kit wireframe, tests prototypes.</p>
        </div>
      ),
    },
    {
      num: "03",
      title: "Développement",
      content: (
        <div className={styles.panel}>
          <p>On forge du code robuste et scalable, prêt à évoluer avec votre entreprise.</p>
          <p>Livrables : code production, budget performance, rapport couverture tests.</p>
        </div>
      ),
    },
    {
      num: "04",
      title: "Lancement",
      content: (
        <div className={styles.panel}>
          <p>On accompagne la mise en ligne, le suivi des performances et les itérations post-lancement.</p>
          <p>Livrables : checklist déploiement, dashboard monitoring, roadmap itération.</p>
        </div>
      ),
    },
  ];
  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" accent className={styles.title}>Notre Processus Créatif</Heading>
          <p className={styles.desc}>Une méthodologie claire qui allie créativité et rigueur technique — de la stratégie à la mise en ligne.</p>
        </div>
        <section className={styles.processModule} aria-label="Processus créatif">
          {steps.map((s, i) => (
            <details key={i} className={styles.processAcc} {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span className={styles.stepNum}>{s.num}</span> {s.title}
              </summary>
              {s.content}
            </details>
          ))}
        </section>
      </div>
    </section>
  );
}
