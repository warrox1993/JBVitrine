import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CyFunTiers, ProcessSteps, Faq, CTABox } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { faqPageSchema } from "@/lib/schema";
import {
  FunctionsRing,
  CoverageGauge,
  LevelsStepChart,
  Roadmap,
} from "./diagrams";
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
    keywords: [
      "NIS2",
      "CyFun",
      "CyberFundamentals",
      "CCB",
      "conformité NIS2 Belgique",
      "audit sécurité PME",
      "remédiation cybersécurité",
      "ISO 27001",
      "Liège",
      "Wallonie",
    ],
    alternates: buildAlternates(locale, "/conformite-nis2"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://smidjan.be/conformite-nis2",
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

const CHECK = <Icon name="check" strokeWidth={2.4} size={16} />;

export default async function ConformiteNis2Page() {
  const t = await getTranslations("conformite");
  const b = (chunks: ReactNode) => <b>{chunks}</b>;
  const accent = (chunks: ReactNode) => (
    <span className={styles.accent}>{chunks}</span>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <Breadcrumb
        items={[
          { label: t("breadcrumb.services"), href: "/services" },
          { label: t("breadcrumb.current"), href: "/conformite-nis2" },
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
                  <h3>{t("hero.cardTitle")}</h3>
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

      {/* ===== NIS2 en clair ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("clair.eyebrow")}</span>}
            title={t.rich("clair.title", { accent })}
            lead={t("clair.lead")}
          />
        </Reveal>

        <Reveal>
          <figure className={styles.sectionPhoto}>
            <OptimizedImage
              src="/images/pages/conformite-nis2/gouvernance-comite.jpg"
              alt={t("clair.photoAlt")}
              width={1400}
              height={935}
              sizePreset="hero"
              className={styles.sectionPhotoFrame}
            />
            <figcaption className={styles.sectionPhotoCap}>
              {t.rich("clair.photoCap", { b })}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal stagger className={styles.clairGrid}>
          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="users" size={26} strokeWidth={1.7} />
            </div>
            <h3>{t("clair.card1.title")}</h3>
            <p>{t("clair.card1.intro")}</p>
            <ul>
              <li>
                {CHECK}
                <span>{t.rich("clair.card1.li1", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card1.li2", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card1.li3", { b })}</span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={styles.pill}>
                <Icon name="file-check" size={14} />
                {t("clair.card1.pill")}
              </span>
            </div>
          </article>

          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="alert-triangle" size={26} strokeWidth={1.7} />
            </div>
            <h3>{t("clair.card2.title")}</h3>
            <p>{t("clair.card2.intro")}</p>
            <ul>
              <li>
                {CHECK}
                <span>{t.rich("clair.card2.li1", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card2.li2", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card2.li3", { b })}</span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={`${styles.pill} ${styles.pillWarn}`}>
                <Icon name="alert-circle" size={14} />
                {t("clair.card2.pill")}
              </span>
            </div>
          </article>

          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="clock" size={26} strokeWidth={1.7} />
            </div>
            <h3>{t("clair.card3.title")}</h3>
            <p>{t("clair.card3.intro")}</p>
            <ul>
              <li>
                {CHECK}
                <span>{t.rich("clair.card3.li1", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card3.li2", { b })}</span>
              </li>
              <li>
                {CHECK}
                <span>{t.rich("clair.card3.li3", { b })}</span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={styles.pill}>
                <Icon name="arrow-right" size={14} />
                {t("clair.card3.pill")}
              </span>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* ===== CyFun framework ===== */}
      <Section variant="tint">
        <Reveal>
        <div className={styles.frameIntro}>
          <div>
            <SectionHeading
              as="h2"
              eyebrow={<span className={styles.kickerMono}>{t("cyfun.eyebrow")}</span>}
              title={t.rich("cyfun.title", { accent })}
            />
            <p className={styles.frameLead}>
              {t.rich("cyfun.lead", { b })}
            </p>
            <p className={styles.frameNote}>
              {t.rich("cyfun.note", { b })}
            </p>
            <figure className={styles.frameInlinePhoto}>
              <OptimizedImage
                src="/images/pages/conformite-nis2/audit-checklist.jpg"
                alt={t("cyfun.photoAlt")}
                width={1400}
                height={788}
                sizePreset="card"
                className={styles.sectionPhotoFrame}
              />
              <figcaption>
                {t.rich("cyfun.photoCap", { b })}
              </figcaption>
            </figure>
          </div>
          <div className={styles.frameMap}>
            <div className={styles.mh}>
              <Icon name="layers" size={16} />
              {t("cyfun.mapHead")}
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("cyfun.map.row1a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("cyfun.map.row1b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("cyfun.map.row2a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("cyfun.map.row2b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("cyfun.map.row3a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("cyfun.map.row3b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("cyfun.map.row4a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("cyfun.map.row4b")}</span>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal>
          <figure
            className={styles.ringWrap}
            role="img"
            aria-label={t("cyfun.ringAria")}
          >
            <FunctionsRing />
          </figure>
          <p className={styles.ringCap}>
            {t.rich("cyfun.ringCap", { b })}
          </p>
        </Reveal>

        <Reveal stagger className={styles.functions}>
          {(
            [
              { n: "01", icon: "shield", title: "Govern", text: t("cyfun.functions.govern") },
              { n: "02", icon: "search", title: "Identify", text: t("cyfun.functions.identify") },
              { n: "03", icon: "shield-check", title: "Protect", text: t("cyfun.functions.protect") },
              { n: "04", icon: "target", title: "Detect", text: t("cyfun.functions.detect") },
              { n: "05", icon: "sparkles", title: "Respond", text: t("cyfun.functions.respond") },
              { n: "06", icon: "clock", title: "Recover", text: t("cyfun.functions.recover") },
            ] satisfies { n: string; icon: IconName; title: string; text: string }[]
          ).map((f) => (
            <div key={f.n} className={styles.fn}>
              <div className={styles.n}>{f.n}</div>
              <div className={styles.ic}>
                <Icon name={f.icon} size={23} strokeWidth={1.7} />
              </div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <p className={styles.fnNote}>
            {t.rich("cyfun.fnNote", { b })}
          </p>
        </Reveal>
      </Section>

      {/* ===== Les 3 niveaux - full-bleed navy chapter (rhythm, matches home) ===== */}
      <Section variant="navy" gridBg id="niveaux" className={styles.niveauxNavy}>
        <Reveal>
          <SectionHeading
            center
            as="h2"
            onDark
            eyebrow={<span className={styles.kickerMono}>{t("niveaux.eyebrow")}</span>}
            title={t.rich("niveaux.title", { accent })}
            lead={t("niveaux.lead")}
          />
        </Reveal>

        <Reveal>
          <div className={styles.statHook}>
            <div className={styles.statBig}>
              <span className={styles.statBigNum}>3</span>
              <span className={styles.statBigLbl}>{t("niveaux.statBigLbl")}</span>
            </div>
            <CoverageGauge className={styles.covGauge} />
            <div className={styles.txt}>
              {t.rich("niveaux.statTxt", { b })}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <figure
            className={styles.levelsFig}
            role="img"
            aria-label={t("niveaux.levelsAria")}
          >
            <LevelsStepChart />
          </figure>
          <p className={styles.levelsCap}>
            {t.rich("niveaux.levelsCap", { b })}
          </p>
        </Reveal>

        <Reveal>
          <CyFunTiers className={styles.tiersBlock} />
        </Reveal>
      </Section>

      {/* ===== Accompagnement + honnêteté ===== */}
      <Section variant="tint" id="accompagnement">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("accompagnement.eyebrow")}</span>}
            title={t.rich("accompagnement.title", { accent })}
            lead={t("accompagnement.lead")}
          />
        </Reveal>

        <Reveal>
          <figure className={styles.sectionPhoto}>
            <OptimizedImage
              src="/images/pages/conformite-nis2/audit-collaboration.jpg"
              alt={t("accompagnement.photoAlt")}
              width={1200}
              height={800}
              sizePreset="hero"
              className={styles.sectionPhotoFrame}
            />
            <figcaption className={styles.sectionPhotoCap}>
              {t.rich("accompagnement.photoCap", { b })}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="shield" size={30} strokeWidth={1.8} />
          <div>
            <h4>{t("accompagnement.honesty.title")}</h4>
            <p>
              {t.rich("accompagnement.honesty.p1", { b })}
            </p>
            <p>
              {t.rich("accompagnement.honesty.p2", { b })}
            </p>
            <Reveal stagger className={styles.roles}>
              <div className={`${styles.roleCol} ${styles.roleSmidjan}`}>
                <h5>
                  <Icon name="lock" size={17} />
                  {t("accompagnement.roleSmidjan.title")}
                </h5>
                <ul>
                  <li>
                    {CHECK}
                    {t("accompagnement.roleSmidjan.li1")}
                  </li>
                  <li>
                    {CHECK}
                    <span>{t.rich("accompagnement.roleSmidjan.li2", { b })}</span>
                  </li>
                  <li>
                    {CHECK}
                    {t("accompagnement.roleSmidjan.li3")}
                  </li>
                  <li>
                    {CHECK}
                    {t("accompagnement.roleSmidjan.li4")}
                  </li>
                </ul>
                <div className={styles.foot}>
                  {t.rich("accompagnement.roleSmidjan.foot", { b })}
                </div>
              </div>
              <div className={`${styles.roleCol} ${styles.roleBelac}`}>
                <h5>
                  <Icon name="check-circle" size={17} />
                  {t("accompagnement.roleBelac.title")}
                </h5>
                <ul>
                  <li>
                    {CHECK}
                    {t("accompagnement.roleBelac.li1")}
                  </li>
                  <li>
                    {CHECK}
                    <span>{t.rich("accompagnement.roleBelac.li2", { b })}</span>
                  </li>
                  <li>
                    {CHECK}
                    {t("accompagnement.roleBelac.li3")}
                  </li>
                </ul>
                <div className={styles.foot}>
                  {t.rich("accompagnement.roleBelac.foot", { b })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <figure
            className={styles.roadmapFig}
            role="img"
            aria-label={t("accompagnement.roadmapAria")}
          >
            <Roadmap />
          </figure>
          <ProcessSteps
            kicker={t("accompagnement.process.kicker")}
            steps={[
              {
                title: t("accompagnement.process.step1Title"),
                description: t("accompagnement.process.step1Desc"),
              },
              {
                title: t("accompagnement.process.step2Title"),
                description: t("accompagnement.process.step2Desc"),
              },
              {
                title: t("accompagnement.process.step3Title"),
                description: t("accompagnement.process.step3Desc"),
              },
              {
                title: t("accompagnement.process.step4Title"),
                description: t("accompagnement.process.step4Desc"),
              },
            ]}
          />
        </div>
        </Reveal>
      </Section>

      {/* ===== Notre outil propriétaire d'audit CyFun ===== */}
      <Section variant="tint3" id="methode-audit">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("audit.eyebrow")}</span>}
            title={t.rich("audit.title", { accent })}
            lead={t("audit.lead")}
          />
        </Reveal>

        <Reveal>
        <div className={styles.auditPanel}>
          <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
          <div className={styles.auditPanelHead}>
            <Icon name="shield-check" size={26} strokeWidth={1.8} />
            <h3>{t("audit.panelTitle")}</h3>
          </div>
          <p className={styles.auditPanelText}>
            {t("audit.panelText")}
          </p>
          <div className={styles.auditChips}>
            <span className={styles.auditChip}>
              <Icon name="layers" size={15} />
              {t("audit.chip1")}
            </span>
            <span className={styles.auditChip}>
              <Icon name="globe" size={15} />
              {t("audit.chip2")}
            </span>
            <span className={styles.auditChip}>
              <Icon name="download" size={15} />
              {t("audit.chip3")}
            </span>
          </div>
        </div>
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
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="alert-circle" size={30} strokeWidth={1.8} />
          <div>
            <h4>{t("audit.honesty.title")}</h4>
            <p>
              {t.rich("audit.honesty.p", { b })}
            </p>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <ProcessSteps
            kicker={t("audit.process.kicker")}
            steps={[
              {
                title: t("audit.process.step1Title"),
                description: t("audit.process.step1Desc"),
              },
              {
                title: t("audit.process.step2Title"),
                description: t("audit.process.step2Desc"),
              },
              {
                title: t("audit.process.step3Title"),
                description: t("audit.process.step3Desc"),
              },
              {
                title: t("audit.process.step4Title"),
                description: t("audit.process.step4Desc"),
              },
            ]}
          />
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.auditCtaWrap}>
          <Button
            as="a"
            href="/contact"
            variant="primary"
            trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
          >
            {t("audit.ctaButton")}
          </Button>
          <p>{t("audit.ctaNote")}</p>
        </div>
        </Reveal>
      </Section>

      {/* ===== Financer votre conformité ===== */}
      <Section variant="white" id="financement">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("financement.eyebrow")}</span>}
            title={t.rich("financement.title", { accent })}
            lead={t("financement.lead")}
          />
        </Reveal>

        <Reveal stagger className={styles.fundingGrid}>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="check-circle" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>
              75<span className={styles.fundingUnit}>%</span>
            </div>
            <div className={styles.fundingLbl}>{t("financement.cards.card1Lbl")}</div>
            <p className={styles.fundingDesc}>
              {t("financement.cards.card1Desc")}
            </p>
          </article>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="layers" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>60 000&nbsp;€</div>
            <div className={styles.fundingLbl}>{t("financement.cards.card2Lbl")}</div>
            <p className={styles.fundingDesc}>
              {t("financement.cards.card2Desc")}
            </p>
          </article>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="download" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>{t("financement.cards.card3Num")}</div>
            <div className={styles.fundingLbl}>{t("financement.cards.card3Lbl")}</div>
            <p className={styles.fundingDesc}>
              {t("financement.cards.card3Desc")}
            </p>
          </article>
        </Reveal>

        <Reveal>
        <div className={`${styles.frameIntro} ${styles.fundingDetails}`}>
          <div>
            <h3>{t("financement.details.title")}</h3>
            <p className={styles.frameLead}>
              {t.rich("financement.details.lead", { b })}
            </p>
            <p className={styles.frameNote}>
              {t.rich("financement.details.note1", { b })}
            </p>
            <p className={styles.frameNote}>
              {t.rich("financement.details.note2", { b })}
            </p>
          </div>
          <div className={styles.frameMap}>
            <div className={styles.mh}>
              <Icon name="file-check" size={16} />
              {t("financement.map.head")}
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row1a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row1b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row2a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row2b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row3a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row3b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row4a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row4b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row5a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row5b")}</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>{t("financement.map.row6a")}</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>{t("financement.map.row6b")}</span>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <ProcessSteps
            kicker={t("financement.process.kicker")}
            steps={[
              {
                title: t("financement.process.step1Title"),
                description: t("financement.process.step1Desc"),
              },
              {
                title: t("financement.process.step2Title"),
                description: t("financement.process.step2Desc"),
              },
              {
                title: t("financement.process.step3Title"),
                description: t("financement.process.step3Desc"),
              },
            ]}
          />
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="alert-circle" size={30} strokeWidth={1.8} />
          <div>
            <h4>{t("financement.honesty.title")}</h4>
            <p>
              {t.rich("financement.honesty.p1", { b })}
            </p>
            <p>
              {t.rich("financement.honesty.p2", {
                b,
                link: (chunks) => (
                  <a
                    href="https://www.cheques-entreprises.be"
                    target="_blank"
                    rel="noopener"
                    className={styles.fundingLink}
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.fundingCtaWrap}>
          <Button
            as="a"
            href="/contact"
            variant="primary"
            trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
          >
            {t("financement.ctaButton")}
          </Button>
          <p>{t("financement.ctaNote")}</p>
        </div>
        </Reveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="white" id="faq">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>{t("faq.eyebrow")}</span>}
            title={t("faq.title")}
            lead={t("faq.lead")}
          />
        </Reveal>
        <Reveal>
        <Faq
          defaultOpenFirst
          items={[
            {
              question: t("faq.q1.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q1.a1", { b })}</p>
                  <p>{t.rich("faq.q1.a2", { b })}</p>
                </>
              ),
            },
            {
              question: t("faq.q2.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q2.a1", { b })}</p>
                  <p>{t.rich("faq.q2.a2", { b })}</p>
                </>
              ),
            },
            {
              question: t("faq.q3.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q3.a1", { b })}</p>
                  <p>{t.rich("faq.q3.a2", { b })}</p>
                </>
              ),
            },
            {
              question: t("faq.q4.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q4.a1", { b })}</p>
                  <p>{t.rich("faq.q4.a2", { b })}</p>
                </>
              ),
            },
            {
              question: t("faq.q5.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q5.a1", { b })}</p>
                  <p>{t.rich("faq.q5.a2", { b })}</p>
                </>
              ),
            },
            {
              question: t("faq.q6.question"),
              answer: (
                <>
                  <p>{t.rich("faq.q6.a1", { b })}</p>
                  <p>{t.rich("faq.q6.a2", { b })}</p>
                </>
              ),
            },
          ]}
        />
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
            { label: t("finalCta.action2"), href: "tel:+32475205562", variant: "ghostD" },
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
