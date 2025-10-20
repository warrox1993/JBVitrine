"use client";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CaseStudy.module.css";

export function CaseStudy() {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.badge}>Étude de Cas</div>
            <h2 className={styles.title}>+340% de conversions pour TechStart</h2>
            <p className={styles.desc}>Refonte complète de leur plateforme SaaS avec focus sur l&apos;UX et les performances. Résultat: triplement du taux de conversion en 6 mois.</p>
            <div className={styles.kpis}>
              {[{value: "+340%", label: "Conversions"},{value: "0.8s", label: "Load Time"},{value: "96/100", label: "Lighthouse"}].map((k)=> (
                <div key={k.label}><div className={styles.kpiValue}>{k.value}</div><div className={styles.kpiLabel}>{k.label}</div></div>
              ))}
            </div>
            <Button variant="solid" size="md" className={styles.primary} trailingIcon={<ArrowRightIcon />}>
              Voir le cas complet
            </Button>
          </div>
          <div className={styles.visual}>
            <div className={`${styles.panel} ${showAfter ? styles.panelAfter : styles.panelBefore}`}>
              {showAfter ? "Après" : "Avant"}
            </div>
            <Button as="button" variant="ghost" size="sm" className={styles.toggle} onClick={() => setShowAfter(v=>!v)}>
              {showAfter ? "← Voir Avant" : "Voir Après →"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
