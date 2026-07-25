import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { CTABox } from "@/components/shared";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maintenant.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/maintenant"),
    robots: { index: true, follow: true },
  };
}

type ResourceLink = { label: string; href: string };
type ListItem = {
  title: string;
  desc: string;
  href?: string;
  links?: ResourceLink[];
};
type Milestone = { period: string; title: string; desc: string };

export default async function MaintenantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("maintenant");
  const learning = t.raw("learning.items") as ListItem[];
  const building = t.raw("building.items") as ListItem[];
  const roadmap = t.raw("roadmap.items") as Milestone[];

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.current") },
            ]}
          />
          <Reveal>
            <div className={styles.kicker}>
              <span className={styles.dot} aria-hidden="true" />
              <Eyebrow className={styles.kickerMono}>{t("hero.eyebrow")}</Eyebrow>
            </div>
            <h1 className={styles.h1}>
              {t.rich("hero.title", { accent: (c) => <span className="accent">{c}</span> })}
            </h1>
            <p className={styles.lead}>{t("hero.lead")}</p>
            <p className={styles.updated}>{t("hero.updated")}</p>
          </Reveal>
        </div>
      </section>

      <Section variant="white">
        <div className={styles.cols}>
          <Reveal className={styles.col}>
            <h2 className={styles.colTitle}>{t("learning.title")}</h2>
            <ul className={styles.list}>
              {learning.map((it) => (
                <li key={it.title}>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  <div>
                    <b>
                      {it.href ? (
                        <a
                          href={it.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.titleLink}
                        >
                          {it.title}
                        </a>
                      ) : (
                        it.title
                      )}
                    </b>
                    <span>{it.desc}</span>
                    {it.links && it.links.length > 0 && (
                      <span className={styles.resLinks}>
                        {it.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resChip}
                          >
                            {l.label}
                          </a>
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.col} variant="right">
            <h2 className={styles.colTitle}>{t("building.title")}</h2>
            <ul className={styles.list}>
              {building.map((it) => (
                <li key={it.title}>
                  <Icon name="code" size={16} strokeWidth={2.2} />
                  <div>
                    <b>{it.title}</b>
                    <span>{it.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section variant="tint">
        <Reveal>
          <SectionHeading
            eyebrow={t("roadmap.eyebrow")}
            title={t.rich("roadmap.title", { accent: (c) => <span className="accent">{c}</span> })}
            lead={t("roadmap.lead")}
          />
        </Reveal>
        <Reveal stagger className={styles.timeline}>
          {roadmap.map((m) => (
            <div key={`${m.period}-${m.title}`} className={styles.milestone}>
              <span className={styles.period}>{m.period}</span>
              <h3 className={styles.mTitle}>{m.title}</h3>
              <p className={styles.mDesc}>{m.desc}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Reveal>
        <CTABox
          title={t("cta.title")}
          text={t("cta.text")}
          actions={[
            { label: t("cta.action"), href: "/contact" },
            { label: t("cta.actionCv"), href: "/cv", variant: "ghostD" },
          ]}
        />
      </Reveal>
    </>
  );
}
