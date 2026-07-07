import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { StatsBand, CTABox } from "@/components/shared";
import { QuiSommesNous } from "./QuiSommesNous";
import { Fondateur } from "./Fondateur";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agence.meta");
  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "agence cybersécurité Liège",
      "cybersécurité PME Wallonie",
      "expert cybersécurité Belgique",
      "conformité NIS2 CyFun",
      "audit sécurité pentest Liège",
      "Jean-Baptiste Dhondt",
    ],
    alternates: {
      canonical: "/agence",
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be/agence",
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
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og-image.webp"],
    },
  };
}

export default async function AgencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agence");
  return (
    <>
      {/* ===== Page header ===== */}
      <section className={styles.pageHero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <Reveal as="div" className={styles.heroText}>
              <nav className={styles.crumb} aria-label={t("hero.ariaBreadcrumb")}>
                <Link href="/">{t("hero.breadcrumbHome")}</Link>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className={styles.crumbHere}>{t("hero.breadcrumbHere")}</span>
              </nav>
              <Eyebrow className={styles.kickerMono}>{t("hero.eyebrow")}</Eyebrow>
              <h1 className={styles.h1}>
                {t.rich("hero.title", {
                  accent: (c) => <span className="accent">{c}</span>,
                })}
              </h1>
              <p className={styles.lead}>{t("hero.lead")}</p>
              <div className={styles.heroCtas}>
                <Button
                  as="a"
                  href="#contact"
                  variant="primary"
                  size="lg"
                  trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
                >
                  {t("hero.ctaPrimary")}
                </Button>
                <Button as="a" href="tel:+32475205562" variant="ghost" size="lg">
                  {t("hero.ctaCall")}
                </Button>
              </div>
              <ul className={styles.badges}>
                <li>
                  <Icon name="map-pin" size={18} />
                  {t("hero.badgeLocation")}
                </li>
                <li>
                  <Icon name="users" size={18} />
                  {t("hero.badgeAccess")}
                </li>
                <li>
                  <Icon name="check" size={18} />
                  {t("hero.badgeData")}
                </li>
              </ul>
            </Reveal>
            <Reveal as="div" className={styles.heroMedia} variant="right" delay={100}>
              <OptimizedImage
                src="/images/pages/agence/liege-nuit.jpg"
                alt={t("hero.imageAlt")}
                width={1400}
                height={788}
                sizePreset="hero"
                aspectRatio="landscape"
                priority
                className={styles.heroImg}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <QuiSommesNous />
      <Fondateur />

      {/* ===== Engagements / valeurs - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="engagements">
        <Reveal>
          <SectionHeading
            center
            onDark
            eyebrow={t("engagements.eyebrow")}
            title={t.rich("engagements.title", {
              accentOnDark: (c) => <span className="accentOnDark">{c}</span>,
            })}
            lead={t("engagements.lead")}
          />
        </Reveal>
        <Reveal stagger className={styles.engageGrid}>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="map-pin" strokeWidth={1.7} />
            </div>
            <h3>{t("engagements.proximiteTitle")}</h3>
            <p>{t("engagements.proximiteText")}</p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="check-circle" strokeWidth={1.7} />
            </div>
            <h3>{t("engagements.franchiseTitle")}</h3>
            <p>{t("engagements.franchiseText")}</p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="file-check" strokeWidth={1.7} />
            </div>
            <h3>{t("engagements.corrigeTitle")}</h3>
            <p>{t("engagements.corrigeText")}</p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="sparkles" strokeWidth={1.7} />
            </div>
            <h3>{t("engagements.iaTitle")}</h3>
            <p>{t("engagements.iaText")}</p>
          </article>
        </Reveal>
      </Section>

      {/*
        NOTE (flag for human): the figures below (12+ / 50+ / 6+ / <24h) are
        placeholders ported from the approved mockup. Confirm the real numbers
        with the client before this page goes live.
      */}
      <StatsBand
        title={t("stats.title")}
        lead={t("stats.lead")}
        stats={[
          { value: "12", accent: "+", label: t("stats.experienceLabel") },
          { value: "50", accent: "+", label: t("stats.auditsLabel") },
          { value: "6", accent: "+", label: t("stats.secteursLabel") },
          { value: "<24", accent: "h", label: t("stats.reponseLabel") },
        ]}
      />

      <CTABox
        id="contact"
        title={t("cta.title")}
        text={t("cta.text")}
        actions={[
          { label: t("cta.actionPrimary"), href: "/contact" },
          { label: t("cta.actionCall"), href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={[
          t("cta.reassurance1"),
          t("cta.reassurance2"),
          t("cta.reassurance3"),
        ]}
      />
    </>
  );
}
