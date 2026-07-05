import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Honesty.module.css";

/** Transparency callout — we remediate, we don't claim to certify. */
export function Honesty() {
  return (
    <Reveal className={styles.honesty}>
      <Icon name="shield-check" strokeWidth={1.8} />
      <div>
        <h4>En toute transparence</h4>
        <p>
          La <b>certification officielle</b> CyFun est délivrée par des organismes accrédités
          BELAC — pas par Smidjan. Notre rôle&nbsp;:{" "}
          <b>audit, analyse d&apos;écart, remédiation</b>, préparation à la vérification. On ne se
          contente pas de constater les manques — <b>on les corrige</b>. C&apos;est notre
          différence avec les pures maisons d&apos;audit.
        </p>
      </div>
    </Reveal>
  );
}

export default Honesty;
