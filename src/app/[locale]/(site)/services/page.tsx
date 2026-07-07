import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import { LinkMore } from "@/components/ui/LinkMore/LinkMore";
import { Button } from "@/components/ui/Button/Button";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  ServicePillar,
  CyFunTiers,
  CTABox,
} from "@/components/shared";
import {
  SecureVisual,
  TestVisual,
  DevVisual,
  ComplyVisual,
} from "./PillarVisuals";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
  title: t("title"),
  description: t("description"),
  keywords: [
    "cybersécurité PME Liège",
    "audit sécurité OWASP",
    "test d'intrusion pentest Belgique",
    "développement web sécurisé",
    "secure by design",
    "conformité NIS2 CyFun",
    "durcissement infrastructure réseau",
    "réponse à incident cyber",
  ],
  alternates: {
    canonical: "/services",
    languages: {
      "fr-BE": "/services",
      fr: "/services",
    },
  },
  openGraph: {
    title: t("ogTitle"),
    description: t("ogDescription"),
    url: "https://smidjan.be/services",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#securiser",
      name: "Sécuriser réseaux & infrastructure",
      description:
        "Segmentation réseau, VPN, EDR, supervision, sauvegardes et durcissement pour bloquer les attaques avant qu'elles n'atteignent vos données.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Sécurité réseau & infrastructure",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#tester",
      name: "Audits & tests d'intrusion",
      description:
        "Audits de sécurité et pentests web/applicatifs suivant une approche OWASP, avec plan de remédiation priorisé et contre-vérification.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Audit & test d'intrusion",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#developper",
      name: "Développement web sécurisé",
      description:
        "Sites et applications sur mesure conçus secure by design, ainsi que la remise à niveau d'applications existantes fragiles.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Développement web sécurisé",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#conformer",
      name: "Conformité NIS2 / CyFun",
      description:
        "Accompagnement à la conformité au référentiel CyberFundamentals (CyFun) du CCB, de l'audit à la préparation à la vérification.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Conformité NIS2 / CyFun",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://smidjan.be" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://smidjan.be/services" },
  ],
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== Page hero ===== */}
      <Section variant="white" className={styles.hero} contained={false}>
        <div className="container">
          <Breadcrumbs items={[{ label: t("breadcrumb.home"), href: "/" }, { label: t("breadcrumb.services") }]} />
          <Reveal>
            <div className={styles.heroKicker}>
              <span className={styles.heroRule} aria-hidden="true" />
              <Eyebrow className={styles.kickerMono}>{t("hero.kicker")}</Eyebrow>
            </div>
            <h1 className={styles.heroTitle}>
              {t.rich("hero.title", { accent: (c) => <span className="accent">{c}</span> })}
            </h1>
            <p className={styles.heroLead}>
              {t("hero.lead")}
            </p>
            <div className={styles.heroActions}>
              <Button
                as="a"
                href="/contact"
                variant="primary"
                size="lg"
                trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
              >
                {t("hero.ctaPrimary")}
              </Button>
              <a className={styles.heroPhone} href="tel:+32475205562">
                <Icon name="phone" strokeWidth={1.8} />
                0475 20 55 62
              </a>
            </div>
            <p className={styles.jumpLabel}>{t("hero.jumpLabel")}</p>
          </Reveal>
          <Reveal as="ul" stagger className={styles.jump}>
            <li><Link className={styles.jumpLink} href="#securiser"><span className={styles.jumpNum}>01</span>{t("jump.securiser")}</Link></li>
            <li><Link className={styles.jumpLink} href="#tester"><span className={styles.jumpNum}>02</span>{t("jump.tester")}</Link></li>
            <li><Link className={styles.jumpLink} href="#developper"><span className={styles.jumpNum}>03</span>{t("jump.developper")}</Link></li>
            <li><Link className={styles.jumpLink} href="#conformer"><span className={styles.jumpNum}>04</span>{t("jump.conformer")}</Link></li>
          </Reveal>
        </div>
      </Section>

      {/* ===== Pillar 01 - Sécuriser ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="securiser"
          index="01"
          icon="server"
          kicker={t("pillars.securiser.kicker")}
          title={t("pillars.securiser.title")}
          intro={t("pillars.securiser.intro")}
          visual={<SecureVisual />}
          capabilities={t.raw("pillars.securiser.capabilities")}
          audience={[
            { label: t("pillars.securiser.audience.forWho.label"), text: t("pillars.securiser.audience.forWho.text"), icon: "users" },
            { label: t("pillars.securiser.audience.when.label"), text: t("pillars.securiser.audience.when.text"), icon: "clock" },
          ]}
          deliverables={t.raw("pillars.securiser.deliverables")}
          ctaLabel={t("pillars.securiser.ctaLabel")}
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== Pillar 02 - Tester ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="tester"
          index="02"
          icon="target"
          kicker={t("pillars.tester.kicker")}
          title={t("pillars.tester.title")}
          intro={t("pillars.tester.intro")}
          visual={<TestVisual alt />}
          alt
          capabilities={t.raw("pillars.tester.capabilities")}
          audience={[
            { label: t("pillars.tester.audience.forWho.label"), text: t("pillars.tester.audience.forWho.text"), icon: "users" },
            { label: t("pillars.tester.audience.when.label"), text: t("pillars.tester.audience.when.text"), icon: "clock" },
          ]}
          deliverables={t.raw("pillars.tester.deliverables")}
          ctaLabel={t("pillars.tester.ctaLabel")}
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== Pillar 03 - Développer ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="developper"
          index="03"
          icon="code"
          kicker={t("pillars.developper.kicker")}
          title={t("pillars.developper.title")}
          intro={t("pillars.developper.intro")}
          visual={<DevVisual />}
          capabilities={t.raw("pillars.developper.capabilities")}
          audience={[
            { label: t("pillars.developper.audience.forWho.label"), text: t("pillars.developper.audience.forWho.text"), icon: "users" },
            { label: t("pillars.developper.audience.when.label"), text: t("pillars.developper.audience.when.text"), icon: "clock" },
          ]}
          deliverables={t.raw("pillars.developper.deliverables")}
          ctaLabel={t("pillars.developper.ctaLabel")}
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== "Un seul partenaire" cross-cut band - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg className={styles.partner}>
        <div className={styles.partnerBox}>
          <Reveal variant="left">
            <Eyebrow onDark className={styles.kickerMono}>{t("partner.kicker")}</Eyebrow>
            <h2>
              {t.rich("partner.title", { accent: (c) => <span className="accentOnDark">{c}</span> })}
            </h2>
            <p className={styles.partnerLead}>
              {t.rich("partner.lead", { em: (c) => <em>{c}</em> })}
            </p>
          </Reveal>
          <Reveal as="div" stagger className={styles.chain}>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="code" strokeWidth={1.8} /></div>
              <b>{t("partner.build.label")}</b>
              <p>{t("partner.build.text")}</p>
              <span className={styles.plus} aria-hidden="true">+</span>
            </div>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="shield-check" strokeWidth={1.8} /></div>
              <b>{t("partner.secure.label")}</b>
              <p>{t("partner.secure.text")}</p>
              <span className={styles.plus} aria-hidden="true">+</span>
            </div>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="file-check" strokeWidth={1.8} /></div>
              <b>{t("partner.comply.label")}</b>
              <p>{t("partner.comply.text")}</p>
            </div>
          </Reveal>
        </div>
        <Reveal variant="up" delay={140}>
          <div className={styles.aiNote}>
            <Icon name="sparkles" strokeWidth={1.8} />
            <span>
              {t.rich("partner.aiNote", { b: (c) => <b>{c}</b> })}
            </span>
          </div>
        </Reveal>
      </Section>

      {/* ===== Pillar 04 - Se conformer (CyFun / NIS2) ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="conformer"
          index="04"
          icon="file-check"
          kicker={t("pillars.conformer.kicker")}
          title={t("pillars.conformer.title")}
          intro={t("pillars.conformer.intro")}
          visual={<ComplyVisual alt />}
          alt
          capabilities={t.raw("pillars.conformer.capabilities")}
          audience={[
            { label: t("pillars.conformer.audience.forWho.label"), text: t("pillars.conformer.audience.forWho.text"), icon: "users" },
            { label: t("pillars.conformer.audience.when.label"), text: t("pillars.conformer.audience.when.text"), icon: "clock" },
          ]}
          deliverables={t.raw("pillars.conformer.deliverables")}
          ctaLabel={t("pillars.conformer.ctaLabel")}
          ctaHref="/conformite-nis2"
        />
      </Reveal>

      {/* ===== CyFun teaser - 3 niveaux + transparency block ===== */}
      <Section variant="tint">
        <Reveal variant="up">
          <SectionHeading
            center
            eyebrow={t("cyfun.eyebrow")}
            title={t.rich("cyfun.title", { accent: (c) => <span className="accent">{c}</span> })}
            lead={t("cyfun.lead")}
            className={styles.cyfunTeaser}
          />
          <div style={{ textAlign: "center" }}>
            <LinkMore href="/conformite-nis2" className={styles.cyfunLinkMore}>
              {t("cyfun.linkMore")}
            </LinkMore>
          </div>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <CyFunTiers showTable={false} />
        </Reveal>
        <Reveal variant="up" delay={120}>
          <div className={styles.transparency}>
            <Icon name="alert-circle" strokeWidth={2} />
            <p>
              {t.rich("cyfun.transparency", { b: (c) => <b>{c}</b> })}
            </p>
          </div>
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
