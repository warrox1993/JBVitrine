import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { CTABox } from "@/components/shared/CTABox/CTABox";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";

import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "approche.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/approche"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be/approche",
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

const methodStepKeys = ["diagnostic", "priorisation", "remediation", "supervision"] as const;

type ValueItem = {
  icon: IconName;
  title: string;
  text: ReactNode;
  pin?: string;
};

export default async function ApprochePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("approche");

  const b = (chunks: ReactNode) => <b>{chunks}</b>;
  const accent = (chunks: ReactNode) => <span className="accent">{chunks}</span>;

  const values: ValueItem[] = [
    {
      icon: "users",
      title: t("why.items.acces.title"),
      text: t("why.items.acces.text"),
      pin: t("why.items.acces.pin"),
    },
    {
      icon: "alert-circle",
      title: t("refs.honestyTitle"),
      text: t.rich("refs.honestyText", { b }),
    },
    {
      icon: "target",
      title: t("why.items.pragmatisme.title"),
      text: t("why.items.pragmatisme.text"),
      pin: t("why.items.pragmatisme.pin"),
    },
    {
      icon: "check",
      title: t("ai.cards.decision.title"),
      text: t("ai.cards.decision.text"),
    },
  ];

  return (
    <>
      {/* ===== Page header ===== */}
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: t("hero.breadcrumbHome"), href: "/" },
              { label: t("hero.breadcrumbCurrent") },
            ]}
          />
          <Reveal as="div" stagger className={styles.heroGrid}>
            <div>
              <div className={styles.kickerRow}>
                <span className={styles.rule} aria-hidden="true" />
                <Eyebrow className={styles.kickerMono}>{t("hero.eyebrow")}</Eyebrow>
              </div>
              <h1 className={styles.h1}>{t.rich("hero.title", { accent })}</h1>
              <p className={styles.lead}>{t("hero.lead")}</p>
              <div className={styles.heroCta}>
                <Button as="a" href="/contact" variant="primary" size="lg" trailingIcon={<Icon name="arrow-right" />}>
                  {t("hero.ctaPrimary")}
                </Button>
                <Button as="a" href="#method" variant="ghost" size="lg">
                  {t("hero.ctaSecondary")}
                </Button>
              </div>
            </div>
            <div className={styles.promiseCard}>
              <div className={`${styles.promiseGridBg} grid-bg`} aria-hidden="true" />
              <div className={styles.promiseTop}>
                <div className={styles.promiseIcon}>
                  <Icon name="shield-check" size={24} />
                </div>
                <div>
                  <h3 className={styles.promiseTitle}>{t("hero.promiseTitle")}</h3>
                  <div className={styles.promiseSub}>{t("hero.promiseSub")}</div>
                </div>
              </div>
              <ul className={styles.promiseList}>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>{t.rich("hero.promiseItem1", { b })}</span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>{t.rich("hero.promiseItem2", { b })}</span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>{t.rich("hero.promiseItem3", { b })}</span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>{t.rich("hero.promiseItem4", { b })}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Ma façon de travailler ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            eyebrow={t("philosophy.eyebrow")}
            title={t.rich("philosophy.title", { accent })}
            lead={t.rich("philosophy.lead", { b })}
          />
          <blockquote className={styles.quote}>{t.rich("philosophy.quote", { b })}</blockquote>
        </Reveal>
      </Section>

      {/* ===== Method (4 steps) ===== */}
      <Section variant="tint" id="method">
        <Reveal>
          <SectionHeading
            eyebrow={t("method.eyebrow")}
            title={t.rich("method.title", { accent })}
            lead={t("method.lead")}
          />
        </Reveal>

        <div className={styles.overview}>
          <ProcessSteps
            kicker={t("method.overviewKicker")}
            steps={methodStepKeys.map((key) => ({
              title: t(`steps.${key}.title`),
              description: t(`steps.${key}.kick`),
            }))}
          />
        </div>
      </Section>

      {/* ===== Values ===== */}
      <Section variant="white">
        <Reveal>
          <Eyebrow>{t("why.eyebrow")}</Eyebrow>
          <p className={styles.valuesLead}>{t("why.lead")}</p>
        </Reveal>
        <Reveal as="div" stagger className={styles.whyGrid}>
          {values.map((item) => (
            <div key={item.title} className={styles.whyItem}>
              <div className={styles.whyIcon}>
                <Icon name={item.icon} size={24} />
              </div>
              <div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyText}>{item.text}</p>
                {item.pin ? (
                  <span className={styles.whyPin}>
                    <Icon name="check" size={14} strokeWidth={2.4} />
                    {item.pin}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        id="contact"
        title={t("cta.title")}
        text={t("cta.text")}
        actions={[
          { label: t("cta.action1"), href: "/contact" },
          { label: t("cta.action2"), href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={[t("cta.reassurance1"), t("cta.reassurance2"), t("cta.reassurance3")]}
      />
    </>
  );
}
