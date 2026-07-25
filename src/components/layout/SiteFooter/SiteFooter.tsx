import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { Icon } from "@/components/ui/Icon/Icon";
import { BrandMark } from "@/components/ui/BrandMark/BrandMark";
import { social, contact } from "@/config/site";
import styles from "./SiteFooter.module.css";

const PROFILE_LINKS = [
  { key: "github", href: social.github, icon: "github" as const },
  { key: "linkedin", href: social.linkedin, icon: "linkedin" as const },
  { key: "tryhackme", href: social.tryhackme, icon: "shield" as const },
];

/**
 * Rich navy footer with a 3px orange top border.
 * Static server component. Ported from the approved corporate mockup.
 * NOTE: no VAT/BCE line is rendered: the real number must come from the
 * client before it can be shown (never ship the mockup placeholder).
 */
export default async function SiteFooter() {
  const t = await getTranslations("common");
  return (
    <footer className={styles.site}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link className={styles.brand} href="/" aria-label={t("brand.ariaHome")}>
              <BrandMark className={styles.logo} />
              <span className={styles.brandText}>
                Smidjan
                <small>{t("brand.tagline")}</small>
              </span>
            </Link>
            <p className={styles.blurb}>{t("footer.blurb")}</p>
            <ul className={styles.contact}>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t("footer.location")}</span>
              </li>
              <li>
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
                <a href={contact.phoneHref}>{contact.phoneLabel}</a>
              </li>
              <li>
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
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
            <h2 className={`${styles.heading} ${styles.headingSpaced}`}>
              {t("footer.profilesHeading")}
            </h2>
            <ul className={styles.profiles}>
              {PROFILE_LINKS.map(({ key, href, icon }) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon name={icon} size={17} />
                    <span>{t(`footer.profiles.${key}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>{t("footer.servicesHeading")}</h2>
            <ul className={styles.links}>
              <li>
                <Link href="/services">{t("footer.links.reseaux")}</Link>
              </li>
              <li>
                <Link href="/services">{t("footer.links.audits")}</Link>
              </li>
              <li>
                <Link href="/services">{t("footer.links.devWeb")}</Link>
              </li>
              <li>
                <Link href="/conformite-nis2">
                  {t("footer.links.conformite")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>{t("footer.agenceHeading")}</h2>
            <ul className={styles.links}>
              <li>
                <Link href="/agence">{t("footer.links.apropos")}</Link>
              </li>
              <li>
                <Link href="/cv">{t("nav.cv")}</Link>
              </li>
              <li>
                <Link href="/projets">{t("nav.projets")}</Link>
              </li>
              <li>
                <Link href="/maintenant">{t("footer.links.maintenant")}</Link>
              </li>
              <li>
                <Link href="/blog">{t("footer.links.ressources")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("footer.links.contact")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>{t("footer.certsHeading")}</h2>
            <div className={styles.certs}>
              <span>ISO/IEC 27001</span>
              <span>NIS2</span>
              <span>CyFun (CCB)</span>
              <span>OWASP</span>
            </div>
            <h2 className={`${styles.heading} ${styles.headingSpaced}`}>
              {t("footer.langHeading")}
            </h2>
            <LocaleSwitcher
              className={styles.lang}
              activeClassName={styles.langActive}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          {/* Placeholder: TVA/BCE number intentionally omitted until the
              real BCE number is provided by the client. */}
          <div>
            {t("footer.copyright")}
            <span className={styles.builtWith}>{t("footer.builtWith")}</span>
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/mentions-legales">{t("footer.legal.mentions")}</Link>
            <Link href="/confidentialite">{t("footer.legal.privacy")}</Link>
            <Link href="/cgv">{t("footer.legal.cgv")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
