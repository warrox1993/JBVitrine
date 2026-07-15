import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import { authorSchema } from "@/lib/author-schema";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Button } from "@/components/ui/Button/Button";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CTABox } from "@/components/shared";
import { Fondateur } from "./Fondateur";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("agence.meta");
  return {
    title: t("title"),
    description: t("description"),
alternates: buildAlternates(locale, "/agence"),
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", ...authorSchema }),
        }}
      />
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

      <Fondateur />

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
