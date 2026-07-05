import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./WhySmidjan.module.css";

interface WhyItem {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}

const SVG = {
  strokeWidth: 1.8,
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const WHY_ITEMS: WhyItem[] = [
  {
    icon: (
      <svg {...SVG}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Local & réactif",
    text: (
      <>
        Basés à Liège, nous intervenons vite en Wallonie et vos données restent{" "}
        <b>hébergées en Belgique / UE</b>.
      </>
    ),
  },
  {
    icon: (
      <svg {...SVG}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
      </svg>
    ),
    title: "Pragmatisme PME",
    text: (
      <>
        <b>Nous corrigeons ce qui compte vraiment</b> pour votre budget — pas de sur-ingénierie,
        pas de dépenses inutiles.
      </>
    ),
  },
  {
    icon: (
      <svg {...SVG}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Un seul partenaire",
    text: (
      <>
        Construire, sécuriser et mettre en conformité&nbsp;: <b>tout au même endroit</b>, sans
        coordonner cinq prestataires.
      </>
    ),
  },
  {
    icon: (
      <svg {...SVG}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
    title: "Accès direct à l'expert",
    text: (
      <>
        <b>Vous parlez à la personne qui fait le travail</b> — jamais à un centre d&apos;appel ni
        à un junior en sous-traitance.
      </>
    ),
  },
];

/** "Pourquoi Smidjan" differentiators grid + founder card. */
export function WhySmidjan() {
  return (
    <div className={styles.grid}>
      <Reveal variant="left">
        <Eyebrow onDark className={styles.kickerMono}>Pourquoi Smidjan</Eyebrow>
        <h2 className={styles.title}>
          La rigueur d&apos;un grand cabinet, la <span className="accent">proximité</span>{" "}
          d&apos;un partenaire
        </h2>
        <p className={styles.lead}>
          Une <b>structure à taille humaine</b>, par choix. Moins d&apos;intermédiaires, plus de
          responsabilité, un interlocuteur qui connaît votre dossier.
        </p>
        <Reveal stagger className={styles.list}>
          {WHY_ITEMS.map((it) => (
            <div key={it.title} className={styles.item}>
              <div className={styles.ic} aria-hidden="true">
                {it.icon}
              </div>
              <div>
                <h4>{it.title}</h4>
                <p>{it.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Reveal>

      <Reveal variant="right" delay={100} className={styles.founder}>
        <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
        <div className={styles.top}>
          <div className={styles.avatar} aria-hidden="true">
            JB
          </div>
          <div>
            <h3>Jean-Baptiste Dhondt</h3>
            <div className={styles.role}>Fondateur · Expert en cybersécurité</div>
          </div>
        </div>
        <blockquote className={styles.quote}>
          « La cybersécurité d&apos;une PME ne tient pas dans un rapport de 200 pages qu&apos;on
          range dans un tiroir. Elle se joue faille par faille — en restant joignable. »
        </blockquote>
        <ul className={styles.creds}>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            Parcours approfondi en sécurité offensive &amp; défensive
          </li>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            Spécialiste des référentiels NIS2 &amp; CyFun (CCB)
          </li>
          <li>
            <Icon name="check" strokeWidth={2.2} />
            Méthodologie OWASP &amp; ISO/IEC 27001
          </li>
        </ul>
      </Reveal>
    </div>
  );
}

export default WhySmidjan;
