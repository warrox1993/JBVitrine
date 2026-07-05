import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { StatHook } from "@/components/shared";
import styles from "./CyfunIntro.module.css";

/** CyFun flagship intro: explainer + attack-coverage hook + NIS2 deadline card. */
export function CyfunIntro() {
  return (
    <div className={styles.intro}>
      <div>
        <Eyebrow>Section phare · Conformité</Eyebrow>
        <h2 className={styles.title}>
          NIS2 &amp; CyberFundamentals&nbsp;: se mettre en règle, concrètement
        </h2>
        <p className={styles.lead}>
          La directive européenne <b>NIS2</b> impose à des milliers d&apos;entreprises belges — y
          compris de nombreuses PME et leurs sous-traitants — un niveau minimal de cybersécurité. En
          Belgique, la réponse officielle est le <b>CyberFundamentals Framework (CyFun)</b>, publié
          par le <b>Centre pour la Cybersécurité Belgique (CCB)</b>.
        </p>
        <StatHook className={styles.hook} value="~82%">
          <b>Le niveau Basic couvre déjà environ 82&nbsp;% des attaques courantes.</b> Pour la
          plupart des PME, c&apos;est le point de départ le plus efficace vers la conformité.
        </StatHook>
      </div>

      <aside className={styles.deadline}>
        <div className={styles.row}>
          <div className={styles.cal}>
            <span className={styles.m}>Avr</span>
            <span className={styles.d}>18</span>
            <span className={styles.y}>2026</span>
          </div>
          <div>
            <h3>L&apos;échéance approche</h3>
            <p>
              Date de mise en conformité NIS2 pour les entités concernées. Anticiper évite la
              pression — et le risque de sanction.
            </p>
          </div>
        </div>
        <div className={styles.fine}>
          <Icon name="alert-circle" />
          <span>
            Le non-respect de NIS2 expose à des amendes administratives significatives et engage la
            responsabilité de la direction.
          </span>
        </div>
      </aside>
    </div>
  );
}

export default CyfunIntro;
