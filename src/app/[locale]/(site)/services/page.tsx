import type { Metadata } from "next";
import { contact, siteUrl } from "@/config/site";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon, IconName } from "@/components/ui/Icon/Icon";
import { Button } from "@/components/ui/Button/Button";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ServiceCard, TrustStrip, Faq, CTABox } from "@/components/shared";
import styles from "./page.module.css";
import { jsonLdSafe } from "@/lib/security/escape";

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
alternates: buildAlternates(locale, "/services"),
  openGraph: {
    title: t("ogTitle"),
    description: t("ogDescription"),
    url: `${siteUrl}/services`,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#cloud",
      name: "Sécurité cloud",
      description:
        "Sécuriser vos environnements cloud (Azure) : configuration, durcissement, gestion des accès et bonnes pratiques.",
      provider: { "@type": "Person", name: "Jean-Baptiste Dhondt", url: siteUrl },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Sécurité cloud",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#reseaux",
      name: "Sécurité réseaux",
      description:
        "Protéger vos réseaux et votre infrastructure : segmentation, durcissement, revue de configuration et bonnes pratiques.",
      provider: { "@type": "Person", name: "Jean-Baptiste Dhondt", url: siteUrl },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Sécurité réseaux",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#ia",
      name: "IA & automatisation",
      description:
        "Automatiser vos tâches avec des workflows fiables (n8n, Make) et sécuriser vos usages de l'IA.",
      provider: { "@type": "Person", name: "Jean-Baptiste Dhondt", url: siteUrl },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "IA & automatisation",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#conformite",
      name: "Conformité NIS2 / CyFun",
      description:
        "Préparer votre conformité NIS2 avec le référentiel CyFun, via un outil d'audit.",
      provider: { "@type": "Person", name: "Jean-Baptiste Dhondt", url: siteUrl },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Conformité NIS2 / CyFun",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
  ],
};

const PILLAR_KEYS = ["cloud", "reseaux", "ia", "conformite"] as const;
const PILLAR_ICONS: Record<(typeof PILLAR_KEYS)[number], IconName> = {
  cloud: "globe",
  reseaux: "server",
  ia: "sparkles",
  conformite: "file-check",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const FAQ_KEYS = ["q1", "q2", "q3"] as const;
  const faqItems = FAQ_KEYS.map((q) => ({
    question: t(`faq.${q}.question`),
    answer: <p>{t(`faq.${q}.answer`)}</p>,
  }));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((q) => ({
      "@type": "Question",
      name: t(`faq.${q}.question`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.${q}.answer`) },
    })),
  };
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdSafe(jsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdSafe(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdSafe(faqSchema) }}
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
              <a className={styles.heroPhone} href={contact.phoneHref}>
                <Icon name="phone" strokeWidth={1.8} />
                {contact.phoneLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* ===== 4 pillars, lean grid ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            eyebrow={t("pillarsIntro.eyebrow")}
            title={t("pillarsIntro.title")}
            className={styles.pillarsHeading}
          />
        </Reveal>
        <Reveal stagger className={styles.grid}>
          {PILLAR_KEYS.map((key) => (
            <ServiceCard
              key={key}
              icon={PILLAR_ICONS[key]}
              kicker={t(`pillars.${key}.index`)}
              title={t(`pillars.${key}.title`)}
              description={t(`pillars.${key}.description`)}
              bullets={t.raw(`pillars.${key}.capabilities`)}
              href={key === "conformite" ? "/conformite-nis2" : undefined}
              linkLabel={key === "conformite" ? t("pillars.conformite.linkLabel") : undefined}
            />
          ))}
        </Reveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="tint" id="faq">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            lead={t("faq.lead")}
          />
        </Reveal>
        <Reveal>
          <Faq defaultOpenFirst items={faqItems} />
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
