import React from "react";
import { Button } from "../../ui/Button/Button";
import { Icon } from "../../ui/Icon/Icon";
import styles from "./CyFunTiers.module.css";

export type TierLevel = "basic" | "important" | "essential";

export interface CyFunTier {
  level: TierLevel;
  name: string;
  /** Coverage badge text, e.g. "~82%" or "Quasi complet". */
  coverage: string;
  /** "Pour qui" sentence (plain text). */
  audience: string;
  /** "Ce qui est couvert" bullet list. */
  covered: string[];
  /** Short "Livrable" description. */
  deliverable: string;
  ctaHref: string;
  ctaLabel?: string;
  /** Middle tier — flagged as recommended. */
  featured?: boolean;
  flag?: string;
}

export interface CyFunTableRow {
  criterion: string;
  basic: React.ReactNode;
  important: React.ReactNode;
  essential: React.ReactNode;
}

export interface CyFunTiersProps {
  tiers?: CyFunTier[];
  /** Render the comparison table below the cards (default true). */
  showTable?: boolean;
  tableRows?: CyFunTableRow[];
  tableCaption?: string;
  note?: React.ReactNode;
  className?: string;
}

/* -------- Default content (from the approved mockup) -------- */

export const DEFAULT_CYFUN_TIERS: CyFunTier[] = [
  {
    level: "basic",
    name: "Basic",
    coverage: "~82%",
    audience:
      "PME qui veulent une base solide et couvrir l'essentiel des menaces courantes.",
    covered: [
      "Mesures de cyberhygiène essentielles",
      "Sauvegardes, MFA, mises à jour",
      "~82 % des attaques courantes couvertes",
    ],
    deliverable:
      "Rapport d'écart + plan de remédiation priorisé, prêt pour l'auto-évaluation CyFun.",
    ctaHref: "/contact",
    ctaLabel: "Demander un diagnostic",
  },
  {
    level: "important",
    name: "Important",
    coverage: "~94%",
    featured: true,
    flag: "Recommandé pour la plupart des PME",
    audience:
      "Entités « importantes » NIS2 et PME traitant des données sensibles ou critiques.",
    covered: [
      "Tout le niveau Basic, renforcé",
      "Détection & réponse aux incidents",
      "Gouvernance & gestion des risques",
    ],
    deliverable:
      "Dossier de conformité complet + accompagnement jusqu'à la vérification par un organisme accrédité.",
    ctaHref: "/contact",
    ctaLabel: "Demander un diagnostic",
  },
  {
    level: "essential",
    name: "Essential",
    coverage: "Quasi complet",
    audience:
      "Entités « essentielles » NIS2 et organisations à exigence de sécurité élevée.",
    covered: [
      "Tout le niveau Important, approfondi",
      "Mesures avancées & tests réguliers",
      "Amélioration continue mesurée",
    ],
    deliverable:
      "Programme de sécurité complet, documentation d'audit et feuille de route pluriannuelle.",
    ctaHref: "/contact",
    ctaLabel: "Demander un diagnostic",
  },
];

export const DEFAULT_CYFUN_TABLE: CyFunTableRow[] = [
  {
    criterion: "Pour qui ?",
    basic: "PME cherchant une base solide de cyberhygiène.",
    important: "Entités « importantes » NIS2 & PME à données sensibles.",
    essential: "Entités « essentielles » NIS2 & forte exigence de sécurité.",
  },
  {
    criterion: "Couverture des attaques",
    basic: <><b>~82 %</b> des attaques courantes.</>,
    important: <><b>~94 %</b> des attaques courantes.</>,
    essential: <><b>Quasi complète</b> — protection maximale.</>,
  },
  {
    criterion: "Profondeur des mesures",
    basic: "Socle de cyberhygiène essentielle.",
    important: "Socle renforcé + détection, réponse & gouvernance.",
    essential: "Mesures avancées, tests réguliers & amélioration continue.",
  },
  {
    criterion: "Livrable Smidjan",
    basic: "Rapport d'écart + plan de remédiation priorisé.",
    important: "Dossier de conformité complet + support à la vérification.",
    essential: "Programme de sécurité complet + feuille de route pluriannuelle.",
  },
  {
    criterion: "Durée indicative*",
    basic: "≈ 1 à 3 mois.",
    important: "≈ 3 à 6 mois.",
    essential: "≈ 6 à 12 mois.",
  },
  {
    criterion: "Vérification / certification",
    basic: "Auto-évaluation (assurance légère).",
    important: "Vérification par un organisme accrédité BELAC.",
    essential: "Vérification par un organisme accrédité BELAC.",
  },
];

const DEFAULT_NOTE =
  "*Durées indicatives, variables selon votre maturité de départ, la taille du périmètre et vos ressources internes. Elles sont précisées lors du cadrage.";

/**
 * CyFun three-tier comparison — cards + optional comparison table.
 * "Important" is flagged as the recommended tier. Reusable across
 * the home, services and conformité NIS2 pages.
 */
export function CyFunTiers({
  tiers = DEFAULT_CYFUN_TIERS,
  showTable = true,
  tableRows = DEFAULT_CYFUN_TABLE,
  tableCaption = "Comparatif des trois niveaux CyFun",
  note = DEFAULT_NOTE,
  className,
}: CyFunTiersProps) {
  const cn = [styles.wrapRoot, className].filter(Boolean).join(" ");
  return (
    <div className={cn || undefined}>
      <div className={styles.tiers}>
        {tiers.map((tier) => (
          <article
            key={tier.level}
            className={`${styles.tier} ${styles[tier.level]} ${
              tier.featured ? styles.featured : ""
            }`}
          >
            {tier.flag ? <span className={styles.flag}>{tier.flag}</span> : null}
            <div className={styles.lvl}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.cov}>{tier.coverage}</span>
            </div>
            <h3 className={styles.name}>{tier.name}</h3>
            <p className={styles.for}>
              <b>Pour qui :</b> {tier.audience}
            </p>
            <div className={styles.covers}>
              <div className={styles.coversHead}>Ce qui est couvert</div>
              <ul>
                {tier.covered.map((c) => (
                  <li key={c}>
                    <Icon name="check" strokeWidth={2.4} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.deliver}>
              <b>Livrable</b>
              {tier.deliverable}
            </div>
            <Button
              as="a"
              href={tier.ctaHref}
              variant={tier.featured ? "primary" : "ghost"}
              className={styles.tierCta}
            >
              {tier.ctaLabel ?? "Demander un diagnostic"}
            </Button>
          </article>
        ))}
      </div>

      {showTable ? (
        <>
          <div className={styles.cmpWrap}>
            <table className={styles.cmp}>
              <caption>{tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">
                    Basic<span className={styles.sub}>Le point de départ</span>
                  </th>
                  <th scope="col" className={styles.mid}>
                    Important
                    <span className={styles.sub}>Recommandé PME</span>
                    <span className={styles.recTag}>Le plus courant</span>
                  </th>
                  <th scope="col">
                    Essential<span className={styles.sub}>Le plus exigeant</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row">{row.criterion}</th>
                    <td>{row.basic}</td>
                    <td className={styles.mid}>{row.important}</td>
                    <td>{row.essential}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {note ? <p className={styles.note}>{note}</p> : null}
        </>
      ) : null}
    </div>
  );
}

export default CyFunTiers;
