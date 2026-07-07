import React from "react";
import { getTranslations } from "next-intl/server";
import OptimizedImage from "@/components/ui/OptimizedImage/OptimizedImage";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Testimonials.module.css";

const SVG = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const BADGES: React.ReactNode[] = [
  (
    <svg {...SVG}>
      <path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h.01M14 9h.01M10 13h.01M14 13h.01" />
    </svg>
  ),
  (
    <svg {...SVG}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  (
    <svg {...SVG}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  ),
];

const ITEM_KEYS = ["item1", "item2", "item3"] as const;

/** Client testimonials grid (role + sector, anonymised). */
export async function Testimonials() {
  const t = await getTranslations("home");
  return (
    <div>
      <Reveal className={styles.photoBand}>
        <OptimizedImage
          src="/images/pages/home/collaboration-pme.jpg"
          alt={t("testimonials.photoAlt")}
          fill
          sizePreset="hero"
          aspectRatio="video"
          className={styles.photoImg}
        />
        <div className={styles.photoOverlay} aria-hidden="true" />
        <p className={styles.photoCaption}>{t("testimonials.photoCaption")}</p>
      </Reveal>
      <Reveal stagger className={styles.grid}>
        {ITEM_KEYS.map((key, i) => (
          <article key={key} className={styles.card}>
            <svg className={styles.quoteIc} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.5 5C6.5 6.7 5 9.2 5 12.5V19h6v-6H8.2c.1-2 .9-3.4 2.6-4.4L9.5 5Zm9 0C15.5 6.7 14 9.2 14 12.5V19h6v-6h-2.8c.1-2 .9-3.4 2.6-4.4L18.5 5Z" />
            </svg>
            <blockquote>{t(`testimonials.${key}.quote`)}</blockquote>
            <div className={styles.who}>
              <div className={styles.badge} aria-hidden="true">
                {BADGES[i]}
              </div>
              <div>
                <b>{t(`testimonials.${key}.role`)}</b>
                <span>{t(`testimonials.${key}.sector`)}</span>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

export default Testimonials;
