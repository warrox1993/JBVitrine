import type { Metadata } from "next";
import { contact, siteUrl } from "@/config/site";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section/Section";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CTABox } from "@/components/shared";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  personSchema,
  homeWebPageSchema,
} from "@/lib/schema";
import { Hero } from "./_home/Hero";
import { RecruiterBand } from "./_home/RecruiterBand";
import { Capabilities } from "./_home/Capabilities";
import { CyfunTeaser } from "./_home/CyfunTeaser";
import { Parcours } from "./_home/Parcours";
import { ApprocheTeaser } from "./_home/ApprocheTeaser";

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
      url: siteUrl,
      siteName: t("ogSiteName"),
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageSchema) }}
      />

      <Hero />

      <RecruiterBand />

      <Section variant="white" id="savoir-faire">
        <Capabilities />
      </Section>

      <Section variant="tint" id="cyfun">
        <CyfunTeaser />
      </Section>

      <Section variant="white" id="parcours">
        <Parcours />
      </Section>

      <Section variant="tint" id="approche">
        <ApprocheTeaser />
      </Section>

      <Reveal>
        <CTABox
          id="contact"
          title={t("contact.title")}
          text={t("contact.text")}
          actions={[
            { label: t("contact.ctaPrimary"), href: "/contact" },
            {
              label: t("contact.ctaCall"),
              href: contact.phoneHref,
              variant: "ghostD",
            },
          ]}
          reassurances={[
            t("contact.reassure1"),
            t("contact.reassure2"),
            t("contact.reassure3"),
          ]}
        />
      </Reveal>
    </>
  );
}
