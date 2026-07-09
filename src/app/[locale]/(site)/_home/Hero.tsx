import React from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Hero.module.css";

/** Home hero: NIS2 badge, result-led headline, dual CTA, assurances + shield visual. */
export async function Hero() {
  const t = await getTranslations("home");
  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <Reveal>
          <div className={styles.kickerRow}>
            <span className={styles.rule} aria-hidden="true" />
            <span className={styles.badge}>
              <span className={styles.tag}>{t("hero.badgeTag")}</span>
              {t("hero.badgeText")}
            </span>
          </div>
          <h1 className={styles.title}>
            {t.rich("hero.title", {
              accent: (c) => <span className="accent">{c}</span>,
            })}
          </h1>
          <p className={styles.lead}>
            {t.rich("hero.lead", {
              b: (c) => <b>{c}</b>,
            })}
          </p>
          <div className={styles.cta}>
            <Button
              as="a"
              href="/contact"
              variant="primary"
              size="lg"
              trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
            >
              {t("hero.ctaPrimary")}
            </Button>
            <Button as="a" href="#concerne" variant="ghost" size="lg">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
          <div className={styles.assure}>
            <div>
              <Icon name="check" /> {t("hero.assure1")}
            </div>
            <div>
              <Icon name="check" /> {t("hero.assure2")}
            </div>
            <div>
              <Icon name="check" /> {t("hero.assure3")}
            </div>
          </div>
        </Reveal>

        <div className={styles.visual}>
          <Reveal variant="scale" delay={120} className={styles.shieldCard}>
            <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
            <div className={styles.shieldHead}>
              <Icon name="shield-check" className={styles.ico} size={52} strokeWidth={1.6} />
              <div>
                <p className={styles.shieldTitle}>{t("hero.shieldTitle")}</p>
                <div className={styles.shieldSub}>{t("hero.shieldSub")}</div>
              </div>
            </div>
            <ul className={styles.list}>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                {t("hero.item1")}
                <span className={styles.val}>{t("hero.statusOk")}</span>
              </li>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                {t("hero.item2")}
                <span className={styles.val}>{t("hero.statusOk")}</span>
              </li>
              <li>
                <span className={`${styles.ck} ${styles.ckWarn}`}>
                  <Icon name="alert-circle" strokeWidth={3} />
                </span>
                {t("hero.item3")}
                <span className={`${styles.val} ${styles.valWarn}`}>{t("hero.statusFix")}</span>
              </li>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                {t("hero.item4")}
                <span className={styles.val}>{t("hero.statusOk")}</span>
              </li>
            </ul>
            <div className={styles.foot}>
              <div className={styles.lbl}>
                {t.rich("hero.footLbl", {
                  b: (c) => <b>{c}</b>,
                })}
              </div>
            </div>
          </Reveal>
          <div className={styles.floatChip} aria-hidden="true">
            <div className={styles.chipIc}>
              <Icon name="shield" size={20} />
            </div>
            <div>
              <b>{t("hero.chipTitle")}</b>
              <small>{t("hero.chipSub")}</small>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
