import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./Honesty.module.css";

/** Transparency callout — we remediate, we don't claim to certify. */
export function Honesty() {
  return (
    <div className={styles.honesty}>
      <Icon name="shield-check" strokeWidth={1.8} />
      <div>
        <h4>En toute transparence</h4>
        <p>
          La <b>certification officielle</b> CyFun est délivrée par des organismes accrédités BELAC.
          Le rôle de Smidjan&nbsp;: <b>audit, analyse d&apos;écart, remédiation et préparation</b> à
          la vérification. Autrement dit, nous ne nous contentons pas de constater les manques —{" "}
          <b>nous corrigeons ce que nous trouvons</b> et vous amenons prêts à la soumission. C&apos;est
          notre différence avec les pures maisons d&apos;audit.
        </p>
      </div>
    </div>
  );
}

export default Honesty;
