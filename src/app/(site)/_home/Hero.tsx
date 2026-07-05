import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Hero.module.css";

/** Home hero: NIS2 badge, result-led headline, dual CTA, assurances + shield visual. */
export function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <Reveal>
          <div className={styles.kickerRow}>
            <span className={styles.rule} aria-hidden="true" />
            <span className={styles.badge}>
              <span className={styles.tag}>NIS2</span>
              En vigueur en Belgique&nbsp;: votre entreprise doit déjà être conforme
            </span>
          </div>
          <h1 className={styles.title}>
            Votre entreprise, <span className="accent">protégée et conforme</span> — sans jargon,
            sans sous-traitance.
          </h1>
          <p className={styles.lead}>
            Smidjan sécurise réseaux, infrastructure et applications des PME wallonnes, et vous met
            en conformité NIS2&nbsp;/ CyFun. <b>Un seul partenaire, un expert au téléphone.</b>
          </p>
          <div className={styles.cta}>
            <Button
              as="a"
              href="/contact"
              variant="primary"
              size="lg"
              trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
            >
              Diagnostic NIS2 gratuit
            </Button>
            <Button as="a" href="/services" variant="ghost" size="lg">
              Découvrir nos services
            </Button>
          </div>
          <div className={styles.assure}>
            <div>
              <Icon name="check" /> Sans engagement
            </div>
            <div>
              <Icon name="check" /> Réponse sous 24&nbsp;h
            </div>
            <div>
              <Icon name="check" /> Données hébergées en Belgique
            </div>
          </div>
        </Reveal>

        <div className={styles.visual}>
          <Reveal variant="scale" delay={120} className={styles.shieldCard}>
            <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
            <div className={styles.shieldHead}>
              <Icon name="shield-check" className={styles.ico} size={52} strokeWidth={1.6} />
              <div>
                <h3>Posture de sécurité</h3>
                <div className={styles.shieldSub}>Évaluation CyFun — aperçu du diagnostic</div>
              </div>
            </div>
            <ul className={styles.list}>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                Segmentation réseau &amp; pare-feu
                <span className={styles.val}>OK</span>
              </li>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                Sauvegardes &amp; plan de reprise
                <span className={styles.val}>OK</span>
              </li>
              <li>
                <span className={`${styles.ck} ${styles.ckWarn}`}>
                  <Icon name="alert-circle" strokeWidth={3} />
                </span>
                Authentification multifacteur
                <span className={`${styles.val} ${styles.valWarn}`}>À corriger</span>
              </li>
              <li>
                <span className={styles.ck}>
                  <Icon name="check" strokeWidth={3} />
                </span>
                Supervision &amp; journalisation
                <span className={styles.val}>OK</span>
              </li>
            </ul>
            <div className={styles.foot}>
              <div className={styles.score}>
                82<em>%</em>
              </div>
              <div className={styles.lbl}>
                de couverture des attaques courantes
                <br />
                atteinte au niveau <b>Basic</b>
              </div>
            </div>
          </Reveal>
          <div className={styles.floatChip} aria-hidden="true">
            <div className={styles.chipIc}>
              <Icon name="shield" size={20} />
            </div>
            <div>
              <b>CCB · CyberFundamentals</b>
              <small>Cadre officiel belge</small>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
