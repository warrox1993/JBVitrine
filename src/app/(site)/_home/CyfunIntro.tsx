import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { StatHook } from "@/components/shared";
import styles from "./CyfunIntro.module.css";

/** CyFun flagship intro: explainer + attack-coverage hook + NIS2 deadline card. */
export function CyfunIntro() {
  return (
    <Reveal className={styles.intro}>
      <div>
        <Eyebrow className={styles.kickerMono}>Section phare · Conformité</Eyebrow>
        <h2 className={styles.title}>
          NIS2 &amp; CyFun&nbsp;: <span className="accent">êtes-vous concerné&nbsp;?</span>
        </h2>
        <p className={styles.lead}>
          La directive <b>NIS2</b> vise des milliers d&apos;entreprises belges, PME et
          sous-traitants inclus. En Belgique, le cadre officiel est <b>CyFun</b>, publié par le{" "}
          <b>CCB</b>.
        </p>
        <StatHook className={styles.hook} value="~82%">
          <b>Le niveau Basic couvre déjà ~82&nbsp;% des attaques courantes.</b> Le meilleur point
          de départ pour une PME.
        </StatHook>
      </div>

      <aside className={styles.deadline}>
        <div className={styles.row}>
          <div className={styles.cal}>
            <span className={styles.m}>Oct</span>
            <span className={styles.d}>18</span>
            <span className={styles.y}>2024</span>
          </div>
          <div>
            <h3>NIS2 est déjà en vigueur</h3>
            <p>En vigueur depuis le 18 octobre 2024. Anticiper réduit le risque.</p>
          </div>
        </div>
        <div className={styles.fine}>
          <Icon name="alert-circle" />
          <span>
            Non-conformité&nbsp;: amendes administratives et responsabilité personnelle de la
            direction.
          </span>
        </div>
      </aside>
    </Reveal>
  );
}

export default CyfunIntro;
