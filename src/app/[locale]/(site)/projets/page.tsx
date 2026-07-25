import type { Metadata } from "next";
import { contact } from "@/config/site";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Button } from "@/components/ui/Button/Button";
import { CTABox } from "@/components/shared";
import styles from "./page.module.css";

const GITHUB_URL = "https://github.com/warrox1993";
const FORMCRAFT_URL = "https://github.com/warrox1993/FormCraft";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projets.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/projets"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be/projets",
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

const METHODE_KEYS = [
  "aligned",
  "readOnly",
  "scope",
  "noCreds",
  "auditLog",
  "humanValidation",
  "noRetention",
] as const;

type GridItem = {
  key: "formcraft" | "site" | "secapp";
  status: "public" | "private";
  repoUrl?: string;
};

const GRID_ITEMS: GridItem[] = [
  { key: "formcraft", status: "public", repoUrl: FORMCRAFT_URL },
  { key: "site", status: "private" },
  { key: "secapp", status: "private" },
];

export default async function ProjetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projets");

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
            <div className={styles.heroActions}>
              <Button
                as="a"
                href={GITHUB_URL}
                target="_blank"
                variant="primary"
                leadingIcon={<Icon name="github" size={18} />}
              >
                {t("hero.githubCta")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ===== Flagship: CyFun / NIS2 audit tool ===== */}
      <Section variant="tint">
        <Reveal>
          <SectionHeading
            eyebrow={t("flagship.eyebrow")}
            title={t("flagship.title")}
            lead={t("flagship.lead")}
          />
          <span className={styles.badge}>{t("flagship.badge")}</span>
        </Reveal>

        <Reveal stagger className={styles.flagshipBody}>
          <div className={styles.flagshipBlock}>
            <h3 className={styles.flagshipHeading}>{t("flagship.contexte.heading")}</h3>
            <p className={styles.flagshipText}>{t("flagship.contexte.text")}</p>
          </div>

          <div className={styles.flagshipBlock}>
            <h3 className={styles.flagshipHeading}>{t("flagship.methode.heading")}</h3>
            <ul className={styles.guaranteeList}>
              {METHODE_KEYS.map((key) => (
                <li key={key}>
                  <Icon name="check" size={15} strokeWidth={2.4} />
                  <span>{t(`flagship.methode.items.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.flagshipBlock}>
            <h3 className={styles.flagshipHeading}>{t("flagship.resultat.heading")}</h3>
            <p className={styles.flagshipText}>{t("flagship.resultat.text")}</p>
          </div>
        </Reveal>

        <Reveal className={styles.honesty}>
          <Icon name="alert-circle" strokeWidth={1.7} />
          <p>{t("flagship.honesty")}</p>
        </Reveal>

        <Reveal className={styles.confidential}>
          <Icon name="lock" strokeWidth={1.7} />
          <p>{t("flagship.confidential")}</p>
        </Reveal>

        <Reveal>
          <Link href="/conformite-nis2" className={styles.flagshipCta}>
            {t("flagship.cta")}
            <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>
      </Section>

      {/* ===== Other projects grid ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading eyebrow={t("grid.eyebrow")} title={t("grid.title")} lead={t("grid.lead")} />
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {GRID_ITEMS.map((item) => {
            const tech = t.raw(`grid.items.${item.key}.tech`) as string[];
            const isPublic = item.status === "public";
            return (
              <div key={item.key} className={styles.card}>
                <span
                  className={`${styles.statusPill} ${isPublic ? styles.statusPublic : styles.statusPrivate}`}
                >
                  <Icon name={isPublic ? "github" : "lock"} size={13} strokeWidth={2} />
                  {isPublic ? t("grid.statusPublic") : t("grid.statusPrivate")}
                </span>
                <h3 className={styles.cardTitle}>{t(`grid.items.${item.key}.name`)}</h3>
                <p className={styles.cardDesc}>{t(`grid.items.${item.key}.description`)}</p>
                <div className={styles.techTags}>
                  {tech.map((tag) => (
                    <span key={tag} className={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {item.repoUrl ? (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    {t("grid.repoLabel")}
                    <Icon name="arrow-right" size={15} />
                  </a>
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </Section>

      {/* ===== Closing: keep following on GitHub ===== */}
      <Section variant="tint">
        <Reveal className={styles.closing}>
          <p>{t("closing.text")}</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.closingCta}>
            <Icon name="github" size={18} />
            {t("closing.cta")}
          </a>
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        title={t("finalCta.title")}
        text={t("finalCta.text")}
        actions={[
          { label: t("finalCta.actionPrimary"), href: "/contact" },
          { label: t("finalCta.actionCall"), href: contact.phoneHref, variant: "ghostD" },
        ]}
        reassurances={t.raw("finalCta.reassurances")}
      />
    </>
  );
}
