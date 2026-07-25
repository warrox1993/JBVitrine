import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import { siteUrl } from "@/config/site";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LegalLayout,
  LegalCallout,
  LegalSection,
  LegalLink,
} from "@/components/shared/LegalLayout/LegalLayout";
import { TermsVisual } from "@/components/shared/LegalLayout/LegalVisuals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.meta" });
  return {
    title: t("cgv.title"),
    description: t("cgv.description"),
    alternates: buildAlternates(locale, "/cgv"),
    openGraph: {
      title: t("cgv.ogTitle"),
      description: t("cgv.ogDescription"),
      type: "website",
      url: `${siteUrl}/cgv`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function BreadcrumbJsonLd() {
  const t = await getTranslations("legal");
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: t("nav.items.cgv"), item: `${siteUrl}/cgv` },
    ],
  };
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default async function CgvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  const strong = (chunks: ReactNode) => <strong>{chunks}</strong>;
  const b = (chunks: ReactNode) => <b>{chunks}</b>;

  return (
    <>
      <BreadcrumbJsonLd />
      <LegalLayout
        active="cgv"
        eyebrow={t("cgv.hero.eyebrow")}
        title={t("cgv.hero.title")}
        lead={t("cgv.hero.lead")}
        visual={<TermsVisual />}
      >
        <p>{t("cgv.intro")}</p>

        <LegalSection id="objet" num="1" title={t("cgv.objet.title")}>
          <p>{t("cgv.objet.body")}</p>
        </LegalSection>

        <LegalSection id="devis" num="2" title={t("cgv.devis.title")}>
          <p>{t("cgv.devis.body")}</p>
        </LegalSection>

        <LegalSection id="execution" num="3" title={t("cgv.execution.title")}>
          <p>{t("cgv.execution.p1")}</p>
          <h3>{t("cgv.execution.h3")}</h3>
          <p>{t("cgv.execution.p2")}</p>
        </LegalSection>

        <LegalSection id="responsabilite" num="4" title={t("cgv.responsabilite.title")}>
          <p>{t("cgv.responsabilite.body")}</p>
        </LegalSection>

        <LegalSection id="confidentialite" num="5" title={t("cgv.confidentialite.title")}>
          <p>{t("cgv.confidentialite.p1")}</p>
          <p>
            {t.rich("cgv.confidentialite.p2", {
              link: (chunks) => <LegalLink href="/confidentialite">{chunks}</LegalLink>,
            })}
          </p>
        </LegalSection>

        <LegalSection id="propriete-livrables" num="6" title={t("cgv.propriete.title")}>
          <p>{t("cgv.propriete.body")}</p>
        </LegalSection>

        <LegalSection id="resiliation" num="7" title={t("cgv.resiliation.title")}>
          <p>{t("cgv.resiliation.body")}</p>
        </LegalSection>

        <LegalSection id="droit-applicable" num="8" title={t("cgv.droit.title")}>
          <p>{t.rich("cgv.droit.body", { strong })}</p>
          <LegalCallout>{t.rich("cgv.droit.callout", { b })}</LegalCallout>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
