import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon, IconName } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CTABox } from "@/components/shared";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";
import { authorSchema } from "@/lib/author-schema";
import { social, credentials, siteUrl } from "@/config/site";
import { FlipCard, type FlipCardLearn } from "./FlipCard";
import { CvSideNav, type CvSideNavItem } from "./CvSideNav";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/cv"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteUrl}/cv`,
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
      type: "profile",
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

type FormationItem = {
  period: string;
  title: string;
  desc: string;
};

type LanguageItem = {
  lang: string;
  level: string;
};

const OBJECTIF_KEYS = ["ccna", "az104", "security", "architecte"] as const;

const COMPETENCE_KEYS = ["cloud", "reseaux", "secApp", "grc", "dev", "ia"] as const;
const COMPETENCE_ICONS: Record<(typeof COMPETENCE_KEYS)[number], IconName> = {
  cloud: "globe",
  reseaux: "server",
  secApp: "lock",
  grc: "file-check",
  dev: "code",
  ia: "sparkles",
};

const PROFILE_LINKS = [
  { key: "github", href: social.github, icon: "github" as const },
  { key: "linkedin", href: social.linkedin, icon: "linkedin" as const },
  { key: "tryhackme", href: social.tryhackme, icon: "target" as const },
];

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cv");
  const tc = await getTranslations("certifications");
  const formationItems = tc.raw("formation.items") as FormationItem[];
  const languageItems = t.raw("languages.items") as LanguageItem[];
  const passionItems = t.raw("beyond.passions") as string[];
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // Section anchors for the sticky sidebar nav — labels reuse the same
  // eyebrows shown atop each section below, so the nav and the destination
  // always read the same word.
  const NAV_SECTIONS: CvSideNavItem[] = [
    { id: "formation", label: tc("formation.eyebrow") },
    { id: "certifications", label: tc("certs.eyebrow") },
    { id: "objectifs", label: tc("objectifs.eyebrow") },
    { id: "competences", label: tc("competences.eyebrow") },
    { id: "langues", label: t("languages.eyebrow") },
    { id: "beyond", label: t("beyond.eyebrow") },
  ];

  return (
    <>
      {/* Person JSON-LD — a CV is the canonical place to describe the person. */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", ...authorSchema }),
        }}
      />

      <div className={styles.splitWrap}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.current") },
            ]}
          />

          <div className={styles.splitGrid}>
            {/* ===== Sticky left column: identity, page nav, socials ===== */}
            <aside className={styles.sidebar} aria-label={t("hero.kicker")}>
              {/* Above-the-fold identity block (likely LCP element): render
                  visible from SSR, no fade-in, and no lingering transform on
                  the sticky element. */}
              <Reveal as="div" className={styles.sidebarInner} priority>
                <div className={styles.heroKicker}>
                  <span className={styles.heroRule} aria-hidden="true" />
                  <Eyebrow className={styles.kickerMono}>{t("hero.kicker")}</Eyebrow>
                </div>
                <h1 className={styles.idName}>{t("hero.name")}</h1>
                <p className={styles.idRole}>{t("hero.role")}</p>
                <p className={styles.idSummary}>{t("hero.summary")}</p>

                <div className={styles.idActions}>
                  <Button
                    as="a"
                    href="/contact"
                    variant="primary"
                    size="lg"
                    trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
                  >
                    {t("hero.ctaContact")}
                  </Button>
                  <span className={styles.idPdfNote}>{t("hero.pdfNote")}</span>
                </div>

                <CvSideNav items={NAV_SECTIONS} heading={t("sidebar.heading")} />

                <div className={styles.idFacts}>
                  <div className={`${styles.idFact} ${styles.idFactHot}`}>
                    <span className={styles.idFactK}>{t("hero.availLabel")}</span>
                    <span className={styles.idFactV}>
                      <span className={styles.idDot} aria-hidden="true" />
                      {t("hero.availValue")}
                    </span>
                  </div>
                  <div className={styles.idFact}>
                    <span className={styles.idFactK}>{t("hero.locLabel")}</span>
                    <span className={styles.idFactV}>{t("hero.locValue")}</span>
                  </div>
                  <div className={styles.idFact}>
                    <span className={styles.idFactK}>{t("hero.focusLabel")}</span>
                    <span className={styles.idFactV}>{t("hero.focusValue")}</span>
                  </div>
                </div>

                <div className={styles.profilesRow}>
                  {PROFILE_LINKS.map(({ key, href, icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.profileLink}
                    >
                      <Icon name={icon} size={18} />
                      {tc(`profiles.${key}`)}
                    </a>
                  ))}
                </div>
              </Reveal>
            </aside>

            {/* ===== Scrolling right column: the CV sections ===== */}
            <div className={styles.mainCol}>
              {/* ===== Formation & diplômes ===== */}
              <Section id="formation" variant="tint" className={styles.panel}>
                <Reveal>
                  <SectionHeading
                    eyebrow={tc("formation.eyebrow")}
                    title={tc("formation.title")}
                    lead={tc("formation.lead")}
                  />
                </Reveal>

                <Reveal stagger className={styles.timeline}>
                  {formationItems.map((item) => (
                    <div key={`${item.period}-${item.title}`} className={styles.timelineItem}>
                      <span className={styles.timelinePeriod}>{item.period}</span>
                      <h3 className={styles.timelineTitle}>{item.title}</h3>
                      <p className={styles.timelineDesc}>{item.desc}</p>
                    </div>
                  ))}
                </Reveal>

                <Reveal className={styles.priorBox}>
                  <h3 className={styles.priorHeading}>{tc("formation.prior.heading")}</h3>
                  <p className={styles.priorText}>{tc("formation.prior.text")}</p>
                </Reveal>
              </Section>

              {/* ===== Certifications ===== */}
              <Section id="certifications" variant="white" className={styles.panel}>
                <Reveal>
                  <SectionHeading
                    eyebrow={tc("certs.eyebrow")}
                    title={tc("certs.title")}
                    lead={tc("certs.lead")}
                  />
                </Reveal>

                <Reveal stagger className={styles.certGrid}>
                  <FlipCard
                    icon={<Icon name="shield-check" strokeWidth={1.7} />}
                    status={tc("certs.az900.status")}
                    statusVariant="done"
                    name={tc("certs.az900.name")}
                    description={tc("certs.az900.description")}
                    learn={tc.raw("certs.az900.learn") as FlipCardLearn}
                    verifyHref={credentials.az900VerifyUrl}
                    verifyLabel={tc("certs.az900.verifyLabel")}
                    whyTitle={tc("certs.whyHeading")}
                    whyText={tc("certs.az900.why")}
                    hint={tc("certs.flipHint")}
                    backHint={tc("certs.backHint")}
                  />

                  <FlipCard
                    icon={<Icon name="clock" strokeWidth={1.7} />}
                    status={tc("certs.ccna.status")}
                    statusVariant="progress"
                    name={tc("certs.ccna.name")}
                    description={tc("certs.ccna.description")}
                    learn={tc.raw("certs.ccna.learn") as FlipCardLearn}
                    whyTitle={tc("certs.whyHeading")}
                    whyText={tc("certs.ccna.why")}
                    hint={tc("certs.flipHint")}
                    backHint={tc("certs.backHint")}
                  />
                </Reveal>

                <Reveal className={styles.autoformation}>
                  <Icon name="book" strokeWidth={1.7} />
                  <div>
                    <strong>{tc("certs.autoformation.label")}</strong>
                    <p>{tc("certs.autoformation.text")}</p>
                    <a
                      href={social.tryhackme}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.thmBadge}
                    >
                      <Icon name="target" strokeWidth={2} />
                      {tc("certs.autoformation.badge")}
                    </a>
                  </div>
                </Reveal>
              </Section>

              {/* ===== Objectifs de certification ===== */}
              <Section id="objectifs" variant="tint" className={styles.panel}>
                <Reveal>
                  <SectionHeading
                    eyebrow={tc("objectifs.eyebrow")}
                    title={tc("objectifs.title")}
                    lead={tc("objectifs.lead")}
                  />
                </Reveal>

                <div className={styles.objectivesWrap}>
                  <ProcessSteps
                    steps={OBJECTIF_KEYS.map((key) => ({
                      title: tc(`objectifs.steps.${key}.title`),
                      description: tc(`objectifs.steps.${key}.description`),
                    }))}
                  />
                </div>
              </Section>

              {/* ===== Compétences ===== */}
              <Section id="competences" variant="white" className={styles.panel}>
                <Reveal>
                  <SectionHeading
                    eyebrow={tc("competences.eyebrow")}
                    title={tc("competences.title")}
                  />
                </Reveal>

                <Reveal stagger className={styles.competencesGrid}>
                  {COMPETENCE_KEYS.map((key) => (
                    <div key={key} className={styles.competenceCard}>
                      <div className={styles.competenceIcon}>
                        <Icon name={COMPETENCE_ICONS[key]} strokeWidth={1.7} />
                      </div>
                      <h3 className={styles.competenceTitle}>
                        {tc(`competences.items.${key}.title`)}
                      </h3>
                      <p className={styles.competenceDesc}>
                        {tc(`competences.items.${key}.description`)}
                      </p>
                    </div>
                  ))}
                </Reveal>
              </Section>

              {/* ===== Langues ===== */}
              <Section id="langues" variant="tint" className={styles.panel}>
                <Reveal>
                  <SectionHeading eyebrow={t("languages.eyebrow")} title={t("languages.title")} />
                </Reveal>
                <Reveal stagger className={styles.langGrid}>
                  {languageItems.map((item) => (
                    <div key={item.lang} className={styles.langItem}>
                      <span className={styles.langName}>{item.lang}</span>
                      <span className={styles.langLevel}>{item.level}</span>
                    </div>
                  ))}
                </Reveal>
              </Section>

              {/* ===== Au-delà du code : passions & initiatives ===== */}
              <Section id="beyond" variant="white" className={styles.panel}>
                <Reveal>
                  <SectionHeading eyebrow={t("beyond.eyebrow")} title={t("beyond.title")} />
                </Reveal>
                <div className={styles.beyondGrid}>
                  <Reveal className={styles.beyondCol}>
                    <h3 className={styles.beyondTitle}>{t("beyond.passionsTitle")}</h3>
                    <ul className={styles.passions}>
                      {passionItems.map((p) => (
                        <li key={p} className={styles.passionChip}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal variant="right" className={styles.beyondCol}>
                    <h3 className={styles.beyondTitle}>{t("beyond.projectTitle")}</h3>
                    <div className={styles.projectCard}>
                      <div className={styles.projectIcon}>
                        <Icon name="sparkles" strokeWidth={1.7} />
                      </div>
                      <div>
                        <strong className={styles.projectName}>{t("beyond.projectName")}</strong>
                        <p className={styles.projectText}>{t("beyond.projectText")}</p>
                        <span className={styles.projectTag}>{t("beyond.projectTag")}</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Final CTA ===== */}
      <CTABox
        title={tc("finalCta.title")}
        text={tc("finalCta.text")}
        actions={[
          { label: tc("finalCta.actionPrimary"), href: "/contact" },
          { label: tc("finalCta.actionCall"), href: social.linkedin, variant: "ghostD" },
        ]}
        reassurances={tc.raw("finalCta.reassurances")}
      />
    </>
  );
}
