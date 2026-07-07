import React from "react";
import { getTranslations } from "next-intl/server";
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
  /** Middle tier - flagged as recommended. */
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
    coverage: "Socle essentiel",
    audience:
      "PME qui veulent une base solide et couvrir l'essentiel des menaces courantes.",
    covered: [
      "Mesures de cyberhygiène essentielles",
      "Sauvegardes, MFA, mises à jour",
      "Couvre l'essentiel des attaques courantes",
    ],
    deliverable:
      "Rapport d'écart + plan de remédiation priorisé, prêt pour l'auto-évaluation CyFun.",
    ctaHref: "/contact",
    ctaLabel: "Demander un diagnostic",
  },
  {
    level: "important",
    name: "Important",
    coverage: "Renforcé",
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
    basic: <><b>L'essentiel</b> des attaques courantes.</>,
    important: <><b>Large</b> couverture, gouvernance incluse.</>,
    essential: <><b>Quasi complète</b>&nbsp;: protection maximale.</>,
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

type Translator = Awaited<ReturnType<typeof getTranslations>>;

/** Build the localized default tier cards from the "sharedui" namespace. */
function buildDefaultTiers(t: Translator): CyFunTier[] {
  return [
    {
      level: "basic",
      name: t("cyfun.cards.basic.name"),
      coverage: t("cyfun.cards.basic.coverage"),
      audience: t("cyfun.cards.basic.audience"),
      covered: [
        t("cyfun.cards.basic.covered1"),
        t("cyfun.cards.basic.covered2"),
        t("cyfun.cards.basic.covered3"),
      ],
      deliverable: t("cyfun.cards.basic.deliverable"),
      ctaHref: "/contact",
      ctaLabel: t("cyfun.cards.basic.ctaLabel"),
    },
    {
      level: "important",
      name: t("cyfun.cards.important.name"),
      coverage: t("cyfun.cards.important.coverage"),
      featured: true,
      flag: t("cyfun.cards.important.flag"),
      audience: t("cyfun.cards.important.audience"),
      covered: [
        t("cyfun.cards.important.covered1"),
        t("cyfun.cards.important.covered2"),
        t("cyfun.cards.important.covered3"),
      ],
      deliverable: t("cyfun.cards.important.deliverable"),
      ctaHref: "/contact",
      ctaLabel: t("cyfun.cards.important.ctaLabel"),
    },
    {
      level: "essential",
      name: t("cyfun.cards.essential.name"),
      coverage: t("cyfun.cards.essential.coverage"),
      audience: t("cyfun.cards.essential.audience"),
      covered: [
        t("cyfun.cards.essential.covered1"),
        t("cyfun.cards.essential.covered2"),
        t("cyfun.cards.essential.covered3"),
      ],
      deliverable: t("cyfun.cards.essential.deliverable"),
      ctaHref: "/contact",
      ctaLabel: t("cyfun.cards.essential.ctaLabel"),
    },
  ];
}

/** Build the localized default comparison rows from the "sharedui" namespace. */
function buildDefaultTable(t: Translator): CyFunTableRow[] {
  const b = { b: (chunks: React.ReactNode) => <b>{chunks}</b> };
  return [
    {
      criterion: t("cyfun.table.rows.pourQui.criterion"),
      basic: t("cyfun.table.rows.pourQui.basic"),
      important: t("cyfun.table.rows.pourQui.important"),
      essential: t("cyfun.table.rows.pourQui.essential"),
    },
    {
      criterion: t("cyfun.table.rows.couverture.criterion"),
      basic: t.rich("cyfun.table.rows.couverture.basic", b),
      important: t.rich("cyfun.table.rows.couverture.important", b),
      essential: t.rich("cyfun.table.rows.couverture.essential", b),
    },
    {
      criterion: t("cyfun.table.rows.profondeur.criterion"),
      basic: t("cyfun.table.rows.profondeur.basic"),
      important: t("cyfun.table.rows.profondeur.important"),
      essential: t("cyfun.table.rows.profondeur.essential"),
    },
    {
      criterion: t("cyfun.table.rows.livrable.criterion"),
      basic: t("cyfun.table.rows.livrable.basic"),
      important: t("cyfun.table.rows.livrable.important"),
      essential: t("cyfun.table.rows.livrable.essential"),
    },
    {
      criterion: t("cyfun.table.rows.duree.criterion"),
      basic: t("cyfun.table.rows.duree.basic"),
      important: t("cyfun.table.rows.duree.important"),
      essential: t("cyfun.table.rows.duree.essential"),
    },
    {
      criterion: t("cyfun.table.rows.verification.criterion"),
      basic: t("cyfun.table.rows.verification.basic"),
      important: t("cyfun.table.rows.verification.important"),
      essential: t("cyfun.table.rows.verification.essential"),
    },
  ];
}

/**
 * CyFun three-tier comparison - cards + optional comparison table.
 * "Important" is flagged as the recommended tier. Reusable across
 * the home, services and conformité NIS2 pages.
 */
export async function CyFunTiers({
  tiers,
  showTable = true,
  tableRows,
  tableCaption,
  note,
  className,
}: CyFunTiersProps) {
  const t = await getTranslations("sharedui");
  const resolvedTiers = tiers === undefined ? buildDefaultTiers(t) : tiers;
  const resolvedRows = tableRows === undefined ? buildDefaultTable(t) : tableRows;
  const resolvedCaption =
    tableCaption === undefined ? t("cyfun.table.caption") : tableCaption;
  const resolvedNote = note === undefined ? t("cyfun.note") : note;

  const cn = [styles.wrapRoot, className].filter(Boolean).join(" ");
  return (
    <div className={cn || undefined}>
      <div className={styles.tiers}>
        {resolvedTiers.map((tier) => (
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
              <b>{t("cyfun.cards.forWho")}</b> {tier.audience}
            </p>
            <div className={styles.covers}>
              <div className={styles.coversHead}>{t("cyfun.cards.coveredHead")}</div>
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
              <b>{t("cyfun.cards.deliverableLabel")}</b>
              {tier.deliverable}
            </div>
            <Button
              as="a"
              href={tier.ctaHref}
              variant={tier.featured ? "primary" : "ghost"}
              className={styles.tierCta}
            >
              {tier.ctaLabel ?? t("cyfun.cards.ctaDefault")}
            </Button>
          </article>
        ))}
      </div>

      {showTable ? (
        <>
          <div className={styles.cmpWrap}>
            <table className={styles.cmp}>
              <caption>{resolvedCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("cyfun.table.critereHead")}</th>
                  <th scope="col">
                    {t("cyfun.table.head.basic")}
                    <span className={styles.sub}>
                      {t("cyfun.table.head.basicSub")}
                    </span>
                  </th>
                  <th scope="col" className={styles.mid}>
                    {t("cyfun.table.head.important")}
                    <span className={styles.sub}>
                      {t("cyfun.table.head.importantSub")}
                    </span>
                    <span className={styles.recTag}>
                      {t("cyfun.table.head.importantTag")}
                    </span>
                  </th>
                  <th scope="col">
                    {t("cyfun.table.head.essential")}
                    <span className={styles.sub}>
                      {t("cyfun.table.head.essentialSub")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {resolvedRows.map((row) => (
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
          {resolvedNote ? <p className={styles.note}>{resolvedNote}</p> : null}
        </>
      ) : null}
    </div>
  );
}

export default CyFunTiers;
