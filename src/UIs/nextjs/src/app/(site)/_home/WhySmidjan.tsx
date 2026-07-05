import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./WhySmidjan.module.css";

interface WhyItem {
  icon: React.ReactNode;
  title: string;
  text: string;
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
    text: "Basés à Liège, nous intervenons vite en Wallonie et vos données restent hébergées en Belgique / UE.",
  },
  {
    icon: (
      <svg {...SVG}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
      </svg>
    ),
    title: "Pragmatisme PME",
    text: "Nous corrigeons ce qui compte vraiment pour votre budget — pas de sur-ingénierie, pas de dépenses inutiles.",
  },
  {
    icon: (
      <svg {...SVG}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Un seul partenaire",
    text: "Construire, sécuriser et mettre en conformité : tout au même endroit, sans coordonner cinq prestataires.",
  },
  {
    icon: (
      <svg {...SVG}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
    title: "Accès direct à l'expert",
    text: "Vous parlez à la personne qui fait le travail — jamais à un centre d'appel ni à un junior en sous-traitance.",
  },
];

/** "Pourquoi Smidjan" differentiators grid + founder card. */
export function WhySmidjan() {
  return (
    <div className={styles.grid}>
      <div>
        <Eyebrow>Pourquoi Smidjan</Eyebrow>
        <h2 className={styles.title}>
          La rigueur d&apos;un grand cabinet, la proximité d&apos;un partenaire
        </h2>
        <p className={styles.lead}>
          Nous sommes une structure à taille humaine, volontairement. Cela veut dire moins
          d&apos;intermédiaires, plus de responsabilité, et un interlocuteur qui connaît réellement
          votre dossier.
        </p>
        <div className={styles.list}>
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
        </div>
      </div>

      <div className={styles.founder}>
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
          « La cybersécurité d&apos;une PME ne se règle pas avec un rapport de 200 pages qu&apos;on
          range dans un tiroir. Elle se règle en corrigeant, une à une, les failles qui comptent — et
          en restant joignable quand ça compte le plus. »
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
      </div>
    </div>
  );
}

export default WhySmidjan;
