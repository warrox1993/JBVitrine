import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { social } from "@/config/site";
import styles from "./BentoGrid.module.css";

/**
 * Home "Bento" dashboard: an asymmetric grid of 7 tiles that summarizes the
 * profile at a glance (identity, flagship project, certifications, current
 * focus, public code, offensive-security rank, contact). Reuses only the
 * `home.bento` i18n namespace — no implementation detail beyond what's
 * already public elsewhere on the site (CV, projets, maintenant pages).
 * Collapses to 2 cols (tablet) then 1 col (mobile) via CSS grid-template-areas.
 */
export async function BentoGrid() {
  const t = await getTranslations("home.bento");
  const badges = t.raw("identity.badges") as string[];

  return (
    <>
      <Reveal>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.lead}>{t("lead")}</p>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {/* 1. Identity / hook — large, not a link (already the hero's job); one inline CTA to /cv. */}
        <article className={`${styles.tile} ${styles.identity}`}>
          <p className={styles.prompt}>
            <span className={styles.sigil} aria-hidden="true">
              $
            </span>{" "}
            whoami
          </p>
          <h3 className={styles.identityName}>{t("identity.name")}</h3>
          <p className={styles.identityRole}>{t("identity.role")}</p>
          <p className={styles.identityText}>{t("identity.text")}</p>
          <ul className={styles.badges}>
            {badges.map((b) => (
              <li key={b} className={styles.badge}>
                {b}
              </li>
            ))}
          </ul>
          <Link href="/cv" className={styles.identityLink}>
            {t("identity.cta")}
            <Icon
              name="arrow-right"
              size={16}
              strokeWidth={2.3}
              className={styles.identityLinkIcon}
            />
          </Link>
        </article>

        {/* 2. Flagship project — ClawkWerk, links to /projets. */}
        <Link
          href="/projets"
          className={`${styles.tile} ${styles.interactive} ${styles.clawkwerk}`}
        >
          <span className={styles.tileBadge}>{t("clawkwerk.badge")}</span>
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="shield-check" size={20} strokeWidth={2.1} />
          </span>
          <h3 className={styles.tileTitle}>{t("clawkwerk.title")}</h3>
          <p className={styles.tileText}>{t("clawkwerk.text")}</p>
          <span className={styles.tileArrow} aria-hidden="true">
            <Icon name="arrow-right" size={18} strokeWidth={2.3} />
          </span>
        </Link>

        {/* 3. Certifications — AZ-900 + CCNA, links to /cv. */}
        <Link
          href="/cv"
          className={`${styles.tile} ${styles.interactive} ${styles.certs}`}
        >
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="file-check" size={20} strokeWidth={2.1} />
          </span>
          <h3 className={styles.tileTitle}>{t("certs.title")}</h3>
          <ul className={styles.certList}>
            <li>
              <span className={styles.certOk} aria-hidden="true">
                <Icon name="check" size={14} strokeWidth={2.6} />
              </span>
              {t("certs.az900")}
            </li>
            <li>
              <span className={styles.certPending} aria-hidden="true">
                <Icon name="clock" size={14} strokeWidth={2.2} />
              </span>
              {t("certs.ccna")}
            </li>
          </ul>
        </Link>

        {/* 4. "En ce moment" live status — links to /maintenant. */}
        <Link
          href="/maintenant"
          className={`${styles.tile} ${styles.interactive} ${styles.status}`}
        >
          <span className={styles.liveDot} aria-hidden="true" />
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="clock" size={20} strokeWidth={2.1} />
          </span>
          <h3 className={styles.tileTitle}>{t("status.title")}</h3>
          <p className={styles.tileText}>{t("status.text")}</p>
        </Link>

        {/* 5. GitHub — external. */}
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.tile} ${styles.interactive} ${styles.github}`}
        >
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="github" size={20} strokeWidth={2} />
          </span>
          <h3 className={styles.tileTitle}>{t("github.title")}</h3>
          <p className={styles.tileText}>{t("github.text")}</p>
        </a>

        {/* 6. TryHackMe rank — external. */}
        <a
          href={social.tryhackme}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.tile} ${styles.interactive} ${styles.thm}`}
        >
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="target" size={20} strokeWidth={2.1} />
          </span>
          <h3 className={styles.tileTitle}>{t("thm.title")}</h3>
          <p className={styles.thmStat}>{t("thm.stat")}</p>
          <p className={styles.tileText}>{t("thm.text")}</p>
        </a>

        {/* 7. Contact CTA — filled accent tile, links to /contact. */}
        <Link
          href="/contact"
          className={`${styles.tile} ${styles.interactive} ${styles.contact}`}
        >
          <span className={styles.tileIcon} aria-hidden="true">
            <Icon name="mail" size={20} strokeWidth={2.1} />
          </span>
          <h3 className={styles.tileTitle}>{t("contact.title")}</h3>
          <p className={styles.tileText}>{t("contact.text")}</p>
          <span className={styles.tileArrow} aria-hidden="true">
            <Icon name="arrow-right" size={18} strokeWidth={2.3} />
          </span>
        </Link>
      </Reveal>
    </>
  );
}

export default BentoGrid;
