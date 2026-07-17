import React from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { WhoamiTerminal } from "./WhoamiTerminal";
import styles from "./Hero.module.css";

/** Home hero: split layout, editorial copy (left) + WhoamiTerminal signature animation (right). */
export async function Hero() {
  const t = await getTranslations("home");
  const trust = [t("hero.trust1"), t("hero.trust2"), t("hero.trust3")];

  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <Reveal>
          <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
          <h1 className={styles.title}>{t("hero.h1")}</h1>
          <p className={styles.lead}>{t("hero.p1")}</p>
          <p className={styles.lead}>{t("hero.p2")}</p>
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
            <Button as="a" href="/approche" variant="ghost" size="lg">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
          <p className={styles.trust}>
            {trust.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <span className={styles.trustDot} aria-hidden="true">&middot;</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </p>
          <p className={styles.availability}>{t("hero.availability")}</p>
        </Reveal>

        <Reveal variant="scale" delay={120} className={styles.visual}>
          <WhoamiTerminal name="Jean-Baptiste Dhondt" role="Sécurité cloud · réseau · infra · web" />
        </Reveal>
      </Container>
    </section>
  );
}

export default Hero;
