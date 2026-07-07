import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  TrustStrip,
  ServiceCard,
  CyFunTiers,
  ProcessSteps,
  CTABox,
} from "@/components/shared";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { Hero } from "./_home/Hero";
import { IllusPanel } from "./_home/IllusPanel";
import { AiNote } from "./_home/AiNote";
import { CyfunIntro } from "./_home/CyfunIntro";
import { Honesty } from "./_home/Honesty";
import { WhySmidjan } from "./_home/WhySmidjan";
import { InsightTeaser } from "./_home/InsightTeaser";
import { AuditDashboardFigure, BelgiumMapFigure } from "./_home/figures";
import homeStyles from "./_home/Home.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home.meta");
  return {
    title: t("title"),
    description: t("description"),
alternates: buildAlternates(locale, "/"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be",
      siteName: t("ogSiteName"),
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
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Hero />

      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* ===== Services ===== */}
      <Section variant="tint" id="services">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t("services.eyebrow")}
            title={t.rich("services.title", {
              accent: (c) => <span className="accent">{c}</span>,
            })}
            lead={t("services.lead")}
          />
        </Reveal>
        <Reveal stagger className={homeStyles.svcGrid}>
          <ServiceCard
            icon="server"
            kicker={t("cards.securiser.kicker")}
            title={t("cards.securiser.title")}
            description={t("cards.securiser.description")}
            bullets={[
              t("cards.securiser.bullet1"),
              t("cards.securiser.bullet2"),
              t("cards.securiser.bullet3"),
            ]}
            href="/services#securiser"
          />
          <ServiceCard
            icon="search"
            kicker={t("cards.tester.kicker")}
            title={t("cards.tester.title")}
            description={t("cards.tester.description")}
            bullets={[
              t("cards.tester.bullet1"),
              t("cards.tester.bullet2"),
              t("cards.tester.bullet3"),
            ]}
            href="/services#tester"
          />
          <ServiceCard
            icon="code"
            kicker={t("cards.developper.kicker")}
            title={t("cards.developper.title")}
            description={t("cards.developper.description")}
            bullets={[
              t("cards.developper.bullet1"),
              t("cards.developper.bullet2"),
              t("cards.developper.bullet3"),
            ]}
            href="/services#developper"
          />
          <ServiceCard
            icon="file-check"
            kicker={t("cards.conformer.kicker")}
            title={t("cards.conformer.title")}
            description={t("cards.conformer.description")}
            bullets={[
              t("cards.conformer.bullet1"),
              t("cards.conformer.bullet2"),
              t("cards.conformer.bullet3"),
            ]}
            href="/conformite-nis2"
            linkLabel={t("cards.conformer.linkLabel")}
          />
        </Reveal>

        <AiNote />
      </Section>

      {/* ===== CyFun flagship ===== */}
      <Section variant="white" id="cyfun">
        <CyfunIntro />
        <Reveal>
          <CyFunTiers showTable={false} className={homeStyles.tiers} />
        </Reveal>
        <IllusPanel
          eyebrow={t("illus.diagnostic.eyebrow")}
          title={t("illus.diagnostic.title")}
          text={t.rich("illus.diagnostic.text", {
            b: (c) => <b>{c}</b>,
          })}
          figure={<AuditDashboardFigure />}
          onTint
        />
        <Honesty />
        <Reveal>
          <ProcessSteps
            kicker={t("process.kicker")}
            steps={[
              {
                title: t("process.step1.title"),
                description: t("process.step1.description"),
              },
              {
                title: t("process.step2.title"),
                description: t("process.step2.description"),
              },
              {
                title: t("process.step3.title"),
                description: t("process.step3.description"),
              },
              {
                title: t("process.step4.title"),
                description: t("process.step4.description"),
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* ===== Why Smidjan - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="pourquoi">
        <WhySmidjan />
        <IllusPanel
          onDark
          eyebrow={t("illus.data.eyebrow")}
          title={t("illus.data.title")}
          text={t.rich("illus.data.text", {
            b: (c) => <b>{c}</b>,
          })}
          figure={<BelgiumMapFigure />}
        />
      </Section>


      {/* ===== Insight teaser - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="insight">
        <InsightTeaser />
      </Section>

      {/* ===== Final CTA ===== */}
      <Reveal>
        <CTABox
          id="diagnostic"
          title={t.rich("cta.title", {
            accent: (c) => <span className="accentOnDark">{c}</span>,
          })}
          text={t("cta.text")}
          actions={[
            { label: t("cta.actionPrimary"), href: "/contact" },
            { label: t("cta.actionCall"), href: "tel:+32475205562", variant: "ghostD" },
          ]}
          reassurances={[
            t("cta.reassure1"),
            t("cta.reassure2"),
            t("cta.reassure3"),
          ]}
        />
      </Reveal>
    </>
  );
}
