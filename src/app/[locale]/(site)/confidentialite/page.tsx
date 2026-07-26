import type { Metadata } from "next";
import { contact, siteUrl } from "@/config/site";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LegalLayout,
  LegalSection,
  LegalLink,
  LegalTable,
} from "@/components/shared/LegalLayout/LegalLayout";
import { PrivacyVisual } from "@/components/shared/LegalLayout/LegalVisuals";
import { jsonLdSafe } from "@/lib/security/escape";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.meta" });
  return {
    title: t("confidentialite.title"),
    description: t("confidentialite.description"),
    alternates: buildAlternates(locale, "/confidentialite"),
    openGraph: {
      title: t("confidentialite.ogTitle"),
      description: t("confidentialite.ogDescription"),
      type: "website",
      url: `${siteUrl}/confidentialite`,
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
      {
        "@type": "ListItem",
        position: 2,
        name: t("nav.items.confidentialite"),
        item: `${siteUrl}/confidentialite`,
      },
    ],
  };
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: jsonLdSafe(json) }} />;
}

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  const strong = (chunks: ReactNode) => <strong>{chunks}</strong>;
  const mailLink = (chunks: ReactNode) => (
    <LegalLink href={`mailto:${contact.email}`}>{chunks}</LegalLink>
  );

  return (
    <>
      <BreadcrumbJsonLd />
      <LegalLayout
        active="confidentialite"
        eyebrow={t("conf.hero.eyebrow")}
        title={t("conf.hero.title")}
        lead={t("conf.hero.lead")}
        visual={<PrivacyVisual />}
      >
        <p>{t("conf.intro")}</p>

        <LegalSection id="responsable" num="1" title={t("conf.responsable.title")}>
          <p>{t.rich("conf.responsable.body", { link: mailLink })}</p>
        </LegalSection>

        <LegalSection id="donnees" num="2" title={t("conf.donnees.title")}>
          <ul>
            <li>{t.rich("conf.donnees.formulaire", { strong })}</li>
            <li>{t.rich("conf.donnees.navigation", { strong })}</li>
            <li>{t.rich("conf.donnees.recaptcha", { strong })}</li>
          </ul>
        </LegalSection>

        <LegalSection id="finalites" num="3" title={t("conf.finalites.title")}>
          <ul>
            <li>{t("conf.finalites.item1")}</li>
            <li>{t("conf.finalites.item2")}</li>
            <li>{t("conf.finalites.item3")}</li>
          </ul>
        </LegalSection>

        <LegalSection id="base-legale" num="4" title={t("conf.baseLegale.title")}>
          <ul>
            <li>{t.rich("conf.baseLegale.item1", { strong })}</li>
            <li>{t.rich("conf.baseLegale.item2", { strong })}</li>
            <li>{t.rich("conf.baseLegale.item3", { strong })}</li>
          </ul>
        </LegalSection>

        <LegalSection id="duree" num="5" title={t("conf.duree.title")}>
          <p>{t.rich("conf.duree.body", { strong })}</p>
        </LegalSection>

        <LegalSection id="destinataires" num="6" title={t("conf.destinataires.title")}>
          <p>{t("conf.destinataires.body")}</p>
        </LegalSection>

        <LegalSection id="cookies" num="7" title={t("conf.cookies.title")}>
          <p>{t("conf.cookies.p1")}</p>
          <LegalTable>
            <thead>
              <tr>
                <th>{t("conf.cookies.table.type")}</th>
                <th>{t("conf.cookies.table.finalite")}</th>
                <th>{t("conf.cookies.table.baseLegale")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("conf.cookies.table.row1.type")}</td>
                <td>{t("conf.cookies.table.row1.finalite")}</td>
                <td>{t("conf.cookies.table.row1.base")}</td>
              </tr>
              <tr>
                <td>{t("conf.cookies.table.row2.type")}</td>
                <td>{t("conf.cookies.table.row2.finalite")}</td>
                <td>{t("conf.cookies.table.row2.base")}</td>
              </tr>
            </tbody>
          </LegalTable>
          <p>{t.rich("conf.cookies.p2", { strong })}</p>
          <p>{t("conf.cookies.p3")}</p>
        </LegalSection>

        <LegalSection id="droits" num="8" title={t("conf.droits.title")}>
          <p>{t("conf.droits.p1")}</p>
          <p>{t.rich("conf.droits.p2", { link: mailLink })}</p>
          <p>
            {t.rich("conf.droits.p3", {
              strong,
              link: (chunks) => (
                <LegalLink href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener">
                  {chunks}
                </LegalLink>
              ),
            })}
          </p>
        </LegalSection>

        <LegalSection id="dpo" num="9" title={t("conf.dpo.title")}>
          <p>{t.rich("conf.dpo.body", { link: mailLink })}</p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
