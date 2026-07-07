import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import OptimizedImage from "@/components/ui/OptimizedImage/OptimizedImage";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { CTABox } from "@/components/shared/CTABox/CTABox";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";
import { StatsBand } from "@/components/shared/StatsBand/StatsBand";
import { TrustStrip } from "@/components/shared/TrustStrip/TrustStrip";

import { AiIllustration, ProofVisual, RoadmapIllustration } from "./illustrations";
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
    keywords: [
      "méthode cybersécurité PME",
      "diagnostic cybersécurité Liège",
      "audit sécurité OWASP",
      "conformité NIS2 CyFun",
      "pentest Wallonie",
      "cabinet cybersécurité Liège",
      "remédiation sécurité informatique",
    ],
    alternates: {
      canonical: "/approche",
      languages: {
        "fr-BE": "/approche",
        fr: "/approche",
      },
    },
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

const aiCardMeta: { key: string; icon: IconName }[] = [
  { key: "veille", icon: "search" },
  { key: "detection", icon: "alert-triangle" },
  { key: "mailles", icon: "layers" },
  { key: "decision", icon: "check" },
];

const whyMeta: { key: string; icon: IconName; pinIcon: IconName }[] = [
  { key: "local", icon: "map-pin", pinIcon: "phone" },
  { key: "acces", icon: "users", pinIcon: "check" },
  { key: "pragmatisme", icon: "target", pinIcon: "check" },
  { key: "partenaire", icon: "layers", pinIcon: "check" },
];

const refMeta: { key: string; icon: IconName; code: string }[] = [
  { key: "owasp", icon: "code", code: "OWASP" },
  { key: "iso", icon: "shield-check", code: "ISO/IEC 27001" },
  { key: "cyfun", icon: "layers", code: "CyFun · NIS2 (CCB)" },
];

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
  const accentOnDark = (chunks: ReactNode) => <span className="accentOnDark">{chunks}</span>;

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

      <TrustStrip />

      {/* ===== Philosophy ===== */}
      <Section variant="white">
        <Reveal as="div" stagger className={styles.philoGrid}>
          <div>
            <SectionHeading
              eyebrow={t("philosophy.eyebrow")}
              title={t.rich("philosophy.title", { accent })}
              lead={t.rich("philosophy.lead", { b })}
            />
            <blockquote className={styles.quote}>{t.rich("philosophy.quote", { b })}</blockquote>
          </div>
          <div className={styles.contrast}>
            <div className={`${styles.col} ${styles.bad}`}>
              <div className={styles.cap}>
                <span className={styles.capBadge}>
                  <Icon name="alert-circle" size={15} />
                </span>
                {t("philosophy.badCap")}
              </div>
              <ul>
                <li>
                  <Icon name="alert-circle" size={16} />
                  {t("philosophy.badItem1")}
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  {t("philosophy.badItem2")}
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  {t("philosophy.badItem3")}
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  {t("philosophy.badItem4")}
                </li>
              </ul>
            </div>
            <div className={`${styles.col} ${styles.good}`}>
              <div className={styles.cap}>
                <span className={styles.capBadge}>
                  <Icon name="check" size={15} strokeWidth={2.6} />
                </span>
                {t("philosophy.goodCap")}
              </div>
              <ul>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  {t("philosophy.goodItem1")}
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  {t("philosophy.goodItem2")}
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  {t("philosophy.goodItem3")}
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  {t("philosophy.goodItem4")}
                </li>
              </ul>
            </div>
            <div
              className={styles.proofVisual}
              role="img"
              aria-label={t("philosophy.proofAriaLabel")}
            >
              <ProofVisual />
              <p className={styles.proofCaption}>{t.rich("philosophy.proofCaption", { b })}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ===== Method ===== */}
      <Section variant="tint" id="method">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t("method.eyebrow")}
            title={t.rich("method.title", { accent })}
            lead={t("method.lead")}
          />
        </Reveal>

        <Reveal variant="scale" className={styles.roadmap}>
          <RoadmapIllustration />
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

        <Reveal as="div" stagger className={styles.methodGallery}>
          <figure className={styles.methodPhoto}>
            <OptimizedImage
              src="/images/pages/approche/methode-architecture.jpg"
              alt={t("method.photo1Alt")}
              width={1200}
              height={801}
              sizePreset="card"
              className={styles.methodPhotoFrame}
            />
            <figcaption className={styles.methodPhotoCap}>
              {t.rich("method.photo1Caption", { b })}
            </figcaption>
          </figure>
          <figure className={styles.methodPhoto}>
            <OptimizedImage
              src="/images/pages/approche/planification-roadmap.jpg"
              alt={t("method.photo2Alt")}
              width={1400}
              height={933}
              sizePreset="card"
              className={styles.methodPhotoFrame}
            />
            <figcaption className={styles.methodPhotoCap}>
              {t.rich("method.photo2Caption", { b })}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal as="div" stagger className={styles.stepsDetail}>
          {methodStepKeys.map((key, i) => (
            <article key={key} className={styles.mstep}>
              <div className={styles.idx}>
                <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
                {i < methodStepKeys.length - 1 ? <div className={styles.ln} /> : null}
              </div>
              <div>
                <div className={styles.kick}>{t(`steps.${key}.kick`)}</div>
                <h3 className={styles.stepTitle}>{t(`steps.${key}.title`)}</h3>
                <p className={styles.stepText}>{t.rich(`steps.${key}.text`, { b })}</p>
              </div>
              <div className={styles.deliverCol}>
                <div className={styles.deliverHead}>
                  <Icon name="file-check" size={16} />
                  {t("method.deliverHead")}
                </div>
                <ul>
                  {(["d1", "d2", "d3"] as const).map((d) => (
                    <li key={d}>
                      <Icon name="check" size={15} strokeWidth={2.4} />
                      {t(`steps.${key}.${d}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ===== AI companion ===== */}
      <Section variant="navy" gridBg id="ia">
        <Reveal as="div" stagger className={styles.aiGrid}>
          <div>
            <SectionHeading
              onDark
              eyebrow={t("ai.eyebrow")}
              title={t.rich("ai.title", { accentOnDark })}
              lead={t("ai.lead")}
            />
            <div className={styles.aiHonest}>
              <Icon name="alert-circle" size={22} />
              <p>{t.rich("ai.honest", { b })}</p>
            </div>
          </div>
          <Reveal as="div" stagger className={styles.aiCards}>
            {aiCardMeta.map((card) => (
              <div key={card.key} className={styles.aiCard}>
                <div className={styles.aiIcon}>
                  <Icon name={card.icon} size={22} />
                </div>
                <h4>{t(`ai.cards.${card.key}.title`)}</h4>
                <p>{t(`ai.cards.${card.key}.text`)}</p>
              </div>
            ))}
          </Reveal>
          <div className={styles.aiIllustration}>
            <AiIllustration />
            <div className={styles.legend}>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                {t("ai.legendHuman")}
              </span>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                {t("ai.legendVerified")}
              </span>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                {t("ai.legendAi")}
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ===== Why Smidjan ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t("why.eyebrow")}
            title={t.rich("why.title", { accent })}
            lead={t("why.lead")}
          />
        </Reveal>

        <Reveal variant="scale" as="figure" className={styles.sectionPhoto}>
          <OptimizedImage
            src="/images/pages/approche/collaboration-expert.jpg"
            alt={t("why.photoAlt")}
            width={1200}
            height={800}
            sizePreset="hero"
            className={styles.sectionPhotoFrame}
          />
          <figcaption className={styles.sectionPhotoCap}>
            {t.rich("why.photoCaption", { b })}
          </figcaption>
        </Reveal>

        <Reveal as="div" stagger className={styles.whyGrid}>
          {whyMeta.map((item) => (
            <div key={item.key} className={styles.whyItem}>
              <div className={styles.whyIcon}>
                <Icon name={item.icon} size={24} />
              </div>
              <div>
                <h4 className={styles.whyTitle}>{t(`why.items.${item.key}.title`)}</h4>
                <p className={styles.whyText}>{t(`why.items.${item.key}.text`)}</p>
                <span className={styles.whyPin}>
                  <Icon name={item.pinIcon} size={14} strokeWidth={2.4} />
                  {t(`why.items.${item.key}.pin`)}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      <StatsBand
        title={t("stats.title")}
        lead={t("stats.lead")}
        stats={[
          { value: "4", label: t("stats.label1") },
          { value: "24", accent: "h", label: t("stats.label2") },
          { value: "100", accent: "%", label: t("stats.label3") },
          { value: "0", label: t("stats.label4") },
        ]}
      />

      {/* ===== Référentiels / quality ===== */}
      <Section variant="tint">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t("refs.eyebrow")}
            title={t.rich("refs.title", { accent })}
            lead={t("refs.lead")}
          />
        </Reveal>
        <Reveal as="div" stagger className={styles.refsGrid}>
          {refMeta.map((ref) => (
            <article key={ref.key} className={styles.refCard}>
              <div className={styles.refIcon}>
                <Icon name={ref.icon} size={26} />
              </div>
              <div className={styles.refCode}>{ref.code}</div>
              <h3 className={styles.refTitle}>{t(`refs.items.${ref.key}.title`)}</h3>
              <p className={styles.refText}>{t(`refs.items.${ref.key}.text`)}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className={styles.refsHonesty}>
          <Icon name="alert-circle" size={26} />
          <div>
            <h4>{t("refs.honestyTitle")}</h4>
            <p>{t.rich("refs.honestyText", { b })}</p>
          </div>
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
