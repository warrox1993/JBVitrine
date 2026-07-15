import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon, IconName } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CTABox } from "@/components/shared";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";
import styles from "./page.module.css";

// Placeholder Credly profile URL: the real one must be confirmed before launch.
// TODO: confirmer l'URL Credly
const CREDLY_URL = "https://www.credly.com/users/jean-baptiste-dhondt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/certifications"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be/certifications",
      siteName: "Smidjan",
      images: [
        {
          url: "https://smidjan.be/og-image.webp",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
          type: "image/webp",
        },
      ],
      locale: "fr_BE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og-image.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

type FormationItem = {
  period: string;
  title: string;
  desc: string;
};

const OBJECTIF_KEYS = ["ccna", "cloud", "securityPlus"] as const;

const COMPETENCE_KEYS = ["cloud", "reseaux", "secApp", "grc", "dev", "ia"] as const;
const COMPETENCE_ICONS: Record<(typeof COMPETENCE_KEYS)[number], IconName> = {
  cloud: "globe",
  reseaux: "server",
  secApp: "lock",
  grc: "file-check",
  dev: "code",
  ia: "sparkles",
};

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("certifications");
  const formationItems = t.raw("formation.items") as FormationItem[];

  return (
    <>
      {/* ===== Page hero ===== */}
      <Section variant="white" className={styles.hero} contained={false}>
        <div className="container">
          <Breadcrumbs
            items={[{ label: t("breadcrumb.home"), href: "/" }, { label: t("breadcrumb.current") }]}
          />
          <Reveal>
            <div className={styles.heroKicker}>
              <span className={styles.heroRule} aria-hidden="true" />
              <Eyebrow className={styles.kickerMono}>{t("hero.kicker")}</Eyebrow>
            </div>
            <h1 className={styles.heroTitle}>
              {t.rich("hero.title", { accent: (c) => <span className="accent">{c}</span> })}
            </h1>
            <p className={styles.heroLead}>{t("hero.lead")}</p>
          </Reveal>
        </div>
      </Section>

      {/* ===== Certifications ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            eyebrow={t("certs.eyebrow")}
            title={t("certs.title")}
            lead={t("certs.lead")}
          />
        </Reveal>

        <Reveal stagger className={styles.certGrid}>
          <article className={styles.certCard}>
            <div className={styles.certIcon}>
              <Icon name="shield-check" strokeWidth={1.7} />
            </div>
            <span className={`${styles.certStatus} ${styles.statusDone}`}>
              {t("certs.az900.status")}
            </span>
            <h3 className={styles.certName}>{t("certs.az900.name")}</h3>
            <p className={styles.certDesc}>{t("certs.az900.description")}</p>
            <a
              href={CREDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.certVerify}
            >
              {t("certs.az900.verifyLabel")}
              <Icon name="arrow-right" strokeWidth={2.2} />
            </a>
          </article>

          <article className={styles.certCard}>
            <div className={styles.certIcon}>
              <Icon name="clock" strokeWidth={1.7} />
            </div>
            <span className={`${styles.certStatus} ${styles.statusProgress}`}>
              {t("certs.ccna.status")}
            </span>
            <h3 className={styles.certName}>{t("certs.ccna.name")}</h3>
            <p className={styles.certDesc}>{t("certs.ccna.description")}</p>
          </article>
        </Reveal>

        <Reveal className={styles.autoformation}>
          <Icon name="book" strokeWidth={1.7} />
          <div>
            <strong>{t("certs.autoformation.label")}</strong>
            <p>{t("certs.autoformation.text")}</p>
          </div>
        </Reveal>
      </Section>

      {/* ===== Formation & diplômes ===== */}
      <Section variant="tint">
        <Reveal>
          <SectionHeading
            eyebrow={t("formation.eyebrow")}
            title={t("formation.title")}
            lead={t("formation.lead")}
          />
        </Reveal>

        <Reveal stagger className={styles.timeline}>
          {formationItems.map((item) => (
            <div key={`${item.period}-${item.title}`} className={styles.timelineItem}>
              <span className={styles.timelinePeriod}>{item.period}</span>
              <h3 className={styles.timelineTitle}>{item.title}</h3>
              <p className={styles.timelineDesc}>{item.desc}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className={styles.priorBox}>
          <h3 className={styles.priorHeading}>{t("formation.prior.heading")}</h3>
          <p className={styles.priorText}>{t("formation.prior.text")}</p>
        </Reveal>
      </Section>

      {/* ===== Objectifs de certification ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            eyebrow={t("objectifs.eyebrow")}
            title={t("objectifs.title")}
            lead={t("objectifs.lead")}
          />
        </Reveal>

        <div className={styles.objectivesWrap}>
          <ProcessSteps
            steps={OBJECTIF_KEYS.map((key) => ({
              title: t(`objectifs.steps.${key}.title`),
              description: t(`objectifs.steps.${key}.description`),
            }))}
          />
        </div>
      </Section>

      {/* ===== Compétences ===== */}
      <Section variant="tint">
        <Reveal>
          <SectionHeading eyebrow={t("competences.eyebrow")} title={t("competences.title")} />
        </Reveal>

        <Reveal stagger className={styles.competencesGrid}>
          {COMPETENCE_KEYS.map((key) => (
            <div key={key} className={styles.competenceCard}>
              <div className={styles.competenceIcon}>
                <Icon name={COMPETENCE_ICONS[key]} strokeWidth={1.7} />
              </div>
              <h3 className={styles.competenceTitle}>{t(`competences.items.${key}.title`)}</h3>
              <p className={styles.competenceDesc}>{t(`competences.items.${key}.description`)}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        title={t("finalCta.title")}
        text={t("finalCta.text")}
        actions={[
          { label: t("finalCta.actionPrimary"), href: "/contact" },
          { label: t("finalCta.actionCall"), href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={t.raw("finalCta.reassurances")}
      />
    </>
  );
}
