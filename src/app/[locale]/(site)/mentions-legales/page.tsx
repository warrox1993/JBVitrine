import type { Metadata } from "next";
import { contact } from "@/config/site";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LegalLayout,
  LegalSection,
  LegalCallout,
  LegalLink,
} from "@/components/shared/LegalLayout/LegalLayout";
import { MentionsVisual } from "@/components/shared/LegalLayout/LegalVisuals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.meta" });
  return {
    title: t("mentions.title"),
    description: t("mentions.description"),
    alternates: buildAlternates(locale, "/mentions-legales"),
    openGraph: {
      title: t("mentions.ogTitle"),
      description: t("mentions.ogDescription"),
      type: "website",
      url: "https://smidjan.be/mentions-legales",
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
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: "https://smidjan.be/" },
      { "@type": "ListItem", position: 2, name: t("nav.items.mentions"), item: "https://smidjan.be/mentions-legales" },
    ],
  };
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default async function MentionsLegalesPage({
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
        active="mentions"
        eyebrow={t("mentions.hero.eyebrow")}
        title={t("mentions.hero.title")}
        lead={t("mentions.hero.lead")}
        visual={<MentionsVisual />}
      >
        <LegalSection id="editeur" num="1" title={t("mentions.editeur.title")}>
          <p>{t("mentions.editeur.intro")}</p>
          <ul>
            <li>{t.rich("mentions.editeur.denomination", { strong })}</li>
            <li>{t.rich("mentions.editeur.siege", { strong })}</li>
            <li>{t.rich("mentions.editeur.bce", { strong })}</li>
            <li>{t.rich("mentions.editeur.tva", { strong })}</li>
            <li>
              {t.rich("mentions.editeur.emailLabel", { strong })}{" "}
              <LegalLink href={`mailto:${contact.email}`}>{contact.email}</LegalLink>
            </li>
            <li>
              {t.rich("mentions.editeur.telephoneLabel", { strong })}{" "}
              <LegalLink href={contact.phoneHref}>{contact.phoneLabel}</LegalLink>
            </li>
          </ul>
          <LegalCallout>{t.rich("mentions.editeur.callout", { b })}</LegalCallout>
        </LegalSection>

        <LegalSection id="responsable-publication" num="2" title={t("mentions.responsable.title")}>
          <p>{t("mentions.responsable.body")}</p>
        </LegalSection>

        <LegalSection id="hebergement" num="3" title={t("mentions.hebergement.title")}>
          <p>
            {t.rich("mentions.hebergement.p1", {
              strong,
              link: (chunks) => (
                <LegalLink href="https://vercel.com" target="_blank" rel="noopener">
                  {chunks}
                </LegalLink>
              ),
            })}
          </p>
          <p>
            {t.rich("mentions.hebergement.p2", {
              link: (chunks) => <LegalLink href="/confidentialite#cookies">{chunks}</LegalLink>,
            })}
          </p>
        </LegalSection>

        <LegalSection id="propriete-intellectuelle" num="4" title={t("mentions.propriete.title")}>
          <p>{t("mentions.propriete.p1")}</p>
          <h3>{t("mentions.propriete.h3")}</h3>
          <p>{t("mentions.propriete.p2")}</p>
        </LegalSection>

        <LegalSection id="contact" num="5" title={t("mentions.contact.title")}>
          <p>
            {t.rich("mentions.contact.body", {
              link: (chunks) => <LegalLink href={`mailto:${contact.email}`}>{chunks}</LegalLink>,
            })}
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
