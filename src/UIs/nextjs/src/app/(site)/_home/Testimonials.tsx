import React from "react";
import OptimizedImage from "@/components/ui/OptimizedImage/OptimizedImage";
import styles from "./Testimonials.module.css";

interface Testimonial {
  quote: string;
  role: string;
  sector: string;
  badge: React.ReactNode;
}

const SVG = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "« En six semaines, ils avaient identifié et corrigé des failles que notre ancien prestataire n'avait jamais vues. Un accompagnement clair, sans jargon inutile. »",
    role: "Directeur des opérations",
    sector: "Industrie manufacturière · Liège",
    badge: (
      <svg {...SVG}>
        <path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h.01M14 9h.01M10 13h.01M14 13h.01" />
      </svg>
    ),
  },
  {
    quote:
      "« La conformité NIS2 nous paraissait insurmontable. Smidjan a transformé une obligation anxiogène en une feuille de route claire, étape par étape. »",
    role: "Directrice générale",
    sector: "Services B2B · Namur",
    badge: (
      <svg {...SVG}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    quote:
      "« Ce que j'apprécie : je téléphone, et j'ai l'expert au bout du fil. Pas de ticket, pas d'attente. Pour une PME comme la nôtre, ça change tout. »",
    role: "Gérant",
    sector: "Cabinet comptable · Verviers",
    badge: (
      <svg {...SVG}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
];

/** Client testimonials grid (role + sector, anonymised). */
export function Testimonials() {
  return (
    <div>
      <div className={styles.photoBand}>
        <OptimizedImage
          src="/images/pages/home/collaboration-pme.jpg"
          alt="Deux professionnels collaborant sur un projet de cybersécurité, illustrant l'accompagnement de proximité de Smidjan auprès des PME wallonnes."
          fill
          sizePreset="hero"
          aspectRatio="video"
          className={styles.photoImg}
        />
        <div className={styles.photoOverlay} aria-hidden="true" />
        <p className={styles.photoCaption}>
          Un accompagnement de proximité, pensé pour les PME wallonnes
        </p>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <article key={t.role + t.sector} className={styles.card}>
            <svg className={styles.quoteIc} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.5 5C6.5 6.7 5 9.2 5 12.5V19h6v-6H8.2c.1-2 .9-3.4 2.6-4.4L9.5 5Zm9 0C15.5 6.7 14 9.2 14 12.5V19h6v-6h-2.8c.1-2 .9-3.4 2.6-4.4L18.5 5Z" />
            </svg>
            <blockquote>{t.quote}</blockquote>
            <div className={styles.who}>
              <div className={styles.badge} aria-hidden="true">
                {t.badge}
              </div>
              <div>
                <b>{t.role}</b>
                <span>{t.sector}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
