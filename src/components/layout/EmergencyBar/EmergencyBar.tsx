import Link from "next/link";
import { getTranslations } from "next-intl/server";
import styles from "./EmergencyBar.module.css";

/**
 * Emergency top bar: navy-2 incident line.
 * Static server component. Ported from the approved corporate mockup.
 */
export default async function EmergencyBar() {
  const t = await getTranslations("common");
  return (
    <div className={styles.emerg}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
          <span>{t("emergency.message")}</span>
        </div>
        <div className={styles.meta}>
          <a href="tel:+32475205562">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            +32 475 20 55 62
          </a>
          <a href="mailto:contact@smidjan.be">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            contact@smidjan.be
          </a>
        </div>
        <Link className={styles.cta} href="/contact">
          <span className={styles.dot} />
          {t("emergency.cta")}
        </Link>
      </div>
    </div>
  );
}
