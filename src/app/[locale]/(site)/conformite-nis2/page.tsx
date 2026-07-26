import type { Metadata } from "next";
import { contact, siteUrl } from "@/config/site";
import { buildAlternates } from "@/i18n/metadata";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { CTABox } from "@/components/shared/CTABox/CTABox";
import { CyFunTiers } from "@/components/shared/CyFunTiers/CyFunTiers";
import { NIS2Checker } from "@/components/shared/NIS2Checker/NIS2Checker";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./ConformiteNis2.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("conformite.meta");
  return {
    title: t("title"),
    description: t("description"),
alternates: buildAlternates(locale, "/conformite-nis2"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteUrl}/conformite-nis2`,
      siteName: "Smidjan",
      images: [
        {
          url: `${siteUrl}/og-image.webp`,
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

export default async function ConformiteNis2Page() {
  const t = await getTranslations("conformite");
  const tCommon = await getTranslations("common");
  const tc = await getTranslations("checker");
  const b = (chunks: ReactNode) => <b>{chunks}</b>;
  const accent = (chunks: ReactNode) => (
    <span className={styles.accent}>{chunks}</span>
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: tCommon("breadcrumb.home"), href: "/" },
          { label: t("breadcrumb.services"), href: "/services" },
          { label: t("breadcrumb.current") },
        ]}
      />

      {/* ===== Hero ===== */}
      <section className={styles.hero} id="top">
        <Container className={styles.heroWrap}>
          <div>
            <div className={styles.kickerRow}>
              <span className={styles.rule} aria-hidden="true" />
              <span className={styles.heroBadge}>
                <span className={styles.tag}>NIS2</span>
                {t("hero.badge")}
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              {t.rich("hero.title", { accent })}
            </h1>
            <p className={styles.heroLead}>
              {t.rich("hero.lead", { b })}
            </p>
            <div className={styles.heroCta}>
              <Button
                as="a"
                href="/contact"
                variant="primary"
                trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
              >
                {t("hero.ctaPrimary")}
              </Button>
              <Button as="a" href="#niveaux" variant="ghost">
                {t("hero.ctaSecondary")}
              </Button>
            </div>
            <div className={styles.heroAssure}>
              <div>
                <Icon name="check" size={18} />
                {t("hero.assure1")}
              </div>
              <div>
                <Icon name="check" size={18} />
                {t("hero.assure2")}
              </div>
              <div>
                <Icon name="check" size={18} />
                {t("hero.assure3")}
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.deadlineCard}>
              <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
              <div className={styles.dcTop}>
                <div className={styles.dcCal}>
                  <span className={styles.m}>{t("hero.cardMonth")}</span>
                  <span className={styles.d}>18</span>
                  <span className={styles.y}>{t("hero.cardYear")}</span>
                </div>
                <div>
                  {/* h2, not h3: this is the first heading under the page <h1>.
                      A skipped level breaks heading-based navigation for screen
                      reader users. Styles pinned in the CSS module so the
                      rendering is unchanged. */}
                  <h2>{t("hero.cardTitle")}</h2>
                  <p>{t("hero.cardText")}</p>
                </div>
              </div>
              <div className={styles.dcCount} aria-hidden="true">
                <div className={styles.dcUnit}>
                  <div className={styles.num}>10M€</div>
                  <div className={styles.lbl}>{t("hero.statSanctionLbl")}</div>
                </div>
                <div className={styles.dcUnit}>
                  <div className={styles.num}>2%</div>
                  <div className={styles.lbl}>{t("hero.statCaLbl")}</div>
                </div>
                <div className={styles.dcUnit}>
                  <div className={styles.num}>24h</div>
                  <div className={styles.lbl}>{t("hero.statIncidentLbl")}</div>
                </div>
              </div>
              <div className={styles.dcFoot}>
                <Icon name="shield-check" size={17} />
                <span>{t.rich("hero.cardFoot", { b })}</span>
              </div>
            </div>
            <div className={styles.floatChip} aria-hidden="true">
              <div className={styles.ic}>
                <Icon name="layers" size={20} />
              </div>
              <div>
                <b>{t("hero.chipTitle")}</b>
                <small>{t("hero.chipSub")}</small>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Self-qualification widget (lead magnet) ===== */}
      <Section variant="tint" id="suis-je-concerne">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{tc("eyebrow")}</span>}
            title={tc("title")}
            lead={tc("lead")}
          />
        </Reveal>
        <Reveal>
          <NIS2Checker />
        </Reveal>
      </Section>

      {/* ===== NIS2 en bref ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("clair.eyebrow")}</span>}
            title={t.rich("clair.title", { accent })}
            lead={
              <>
                {t("clair.lead")} {t.rich("cyfun.lead", { b })}
              </>
            }
          />
        </Reveal>
      </Section>

      {/* ===== L'outil d'audit CyFun ===== */}
      <Section variant="tint3" id="methode-audit">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("audit.eyebrow")}</span>}
            title={t.rich("audit.title", { accent })}
            lead={t("audit.lead")}
          />
        </Reveal>

        <Reveal stagger className={styles.trustGrid}>
          {(
            [
              {
                icon: "book",
                title: t("audit.trust.readOnlyTitle"),
                text: t("audit.trust.readOnlyText"),
              },
              {
                icon: "target",
                title: t("audit.trust.scopeTitle"),
                text: t("audit.trust.scopeText"),
              },
              {
                icon: "lock",
                title: t("audit.trust.credsTitle"),
                text: t("audit.trust.credsText"),
              },
              {
                icon: "file-check",
                title: t("audit.trust.logTitle"),
                text: t("audit.trust.logText"),
              },
              {
                icon: "users",
                title: t("audit.trust.humanTitle"),
                text: t("audit.trust.humanText"),
              },
              {
                icon: "check-circle",
                title: t("audit.trust.noDataTitle"),
                text: t("audit.trust.noDataText"),
              },
            ] satisfies { icon: IconName; title: string; text: string }[]
          ).map((c) => (
            <article key={c.title} className={styles.trustCard}>
              <div className={styles.trustIco}>
                <Icon name={c.icon} size={22} strokeWidth={1.8} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal>
          <div className={styles.honesty}>
            <Icon name="alert-circle" size={30} strokeWidth={1.8} />
            <div>
              <h3>{t("audit.honesty.title")}</h3>
              <p>{t.rich("audit.honesty.p", { b })}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ===== Les 3 niveaux CyFun (compact) ===== */}
      <Section variant="navy" gridBg id="niveaux" className={styles.niveauxNavy}>
        <Reveal>
          <SectionHeading
            as="h2"
            onDark
            eyebrow={<span className={styles.kickerMono}>{t("niveaux.eyebrow")}</span>}
            title={t.rich("niveaux.title", { accent })}
            lead={t("niveaux.lead")}
          />
        </Reveal>

        <Reveal>
          <CyFunTiers showTable={false} className={styles.tiersBlock} />
        </Reveal>

        <Reveal>
          <p className={styles.levelsCap}>{t("financement.lead")}</p>
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <Reveal>
        <CTABox
          id="contact"
          tint
          title={t("finalCta.title")}
          text={t("finalCta.text")}
          actions={[
            { label: t("finalCta.action1"), href: "/contact", variant: "primary" },
            { label: t("finalCta.action2"), href: contact.phoneHref, variant: "ghostD" },
          ]}
          reassurances={[
            t("finalCta.reassure1"),
            t("finalCta.reassure2"),
            t("finalCta.reassure3"),
          ]}
        />
      </Reveal>
    </>
  );
}
