import type { Metadata } from "next";
import Link from "next/link";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { StatsBand, CTABox } from "@/components/shared";
import { QuiSommesNous } from "./QuiSommesNous";
import { Fondateur } from "./Fondateur";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "L'agence — Smidjan | Cybersécurité des PME wallonnes, par un expert local · Liège",
  description:
    "Smidjan est une agence de cybersécurité basée à Liège, au service des PME, indépendants et collectivités de Wallonie. Découvrez l'agence et son fondateur, Jean-Baptiste Dhondt.",
  keywords: [
    "agence cybersécurité Liège",
    "cybersécurité PME Wallonie",
    "expert cybersécurité Belgique",
    "conformité NIS2 CyFun",
    "audit sécurité pentest Liège",
    "Jean-Baptiste Dhondt",
  ],
  alternates: {
    canonical: "/agence",
  },
  openGraph: {
    title: "L'agence — Smidjan | Cybersécurité des PME wallonnes",
    description:
      "Une agence de cybersécurité à taille humaine, basée à Liège, au service des PME et collectivités de Wallonie.",
    url: "https://smidjan.be/agence",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan - Agence de cybersécurité à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'agence — Smidjan | Cybersécurité des PME wallonnes",
    description:
      "Une agence de cybersécurité à taille humaine, basée à Liège, au service des PME et collectivités de Wallonie.",
    images: ["/og-image.webp"],
  },
};

export default function AgencePage() {
  return (
    <>
      {/* ===== Page header ===== */}
      <section className={styles.pageHero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <Reveal as="div" className={styles.heroText}>
              <nav className={styles.crumb} aria-label="Fil d'Ariane">
                <Link href="/">Accueil</Link>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className={styles.crumbHere}>L&rsquo;agence</span>
              </nav>
              <Eyebrow className={styles.kickerMono}>L&rsquo;agence</Eyebrow>
              <h1 className={styles.h1}>
                Un <span className="accent">expert cybersécurité local</span>,
                pas une agence anonyme.
              </h1>
              <p className={styles.lead}>
                Jean-Baptiste Dhondt sécurise lui-même votre entreprise.
                Pas de centre d&rsquo;appel. Pas de sous-traitance.
              </p>
              <div className={styles.heroCtas}>
                <Button
                  as="a"
                  href="#contact"
                  variant="primary"
                  size="lg"
                  trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
                >
                  Réserver un appel de cadrage
                </Button>
                <Button as="a" href="tel:+32475205562" variant="ghost" size="lg">
                  Appeler le 0475 20 55 62
                </Button>
              </div>
              <ul className={styles.badges}>
                <li>
                  <Icon name="map-pin" size={18} />
                  Basés à Liège, actifs en Wallonie
                </li>
                <li>
                  <Icon name="users" size={18} />
                  Accès direct à l&rsquo;expert
                </li>
                <li>
                  <Icon name="check" size={18} />
                  Données hébergées en Belgique / UE
                </li>
              </ul>
            </Reveal>
            <Reveal as="div" className={styles.heroMedia} variant="right" delay={100}>
              <OptimizedImage
                src="/images/pages/agence/liege-nuit.jpg"
                alt="Le pont de Fragnée illuminé la nuit au-dessus de la Meuse, à Liège"
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

      <QuiSommesNous />
      <Fondateur />

      {/* ===== Engagements / valeurs — full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="engagements">
        <Reveal>
          <SectionHeading
            center
            onDark
            eyebrow="Nos engagements"
            title={
              <>
                Ce que vous êtes{" "}
                <span className="accentOnDark">en droit d&rsquo;attendre</span> de
                nous
              </>
            }
            lead="Quatre principes. Sur lesquels vous pouvez nous juger."
          />
        </Reveal>
        <Reveal stagger className={styles.engageGrid}>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="map-pin" strokeWidth={1.7} />
            </div>
            <h3>Proximité</h3>
            <p>
              Basés en Wallonie, on répond vite. Un interlocuteur direct,
              au téléphone — jamais un ticket.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="check-circle" strokeWidth={1.7} />
            </div>
            <h3>Franchise</h3>
            <p>
              On dit ce qui compte, sans dramatiser. Des priorités
              honnêtes, adaptées à votre budget.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="file-check" strokeWidth={1.7} />
            </div>
            <h3>On corrige</h3>
            <p>
              On n&rsquo;audite pas pour auditer : on corrige. Un rapport
              sans remédiation ne réduit aucun risque.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="sparkles" strokeWidth={1.7} />
            </div>
            <h3>L&rsquo;humain augmenté par l&rsquo;IA</h3>
            <p>
              L&rsquo;IA accélère l&rsquo;analyse et élargit la couverture.
              Les décisions restent humaines.
            </p>
          </article>
        </Reveal>
      </Section>

      {/*
        NOTE (flag for human): the figures below (12+ / 50+ / 6+ / <24h) are
        placeholders ported from the approved mockup. Confirm the real numbers
        with the client before this page goes live.
      */}
      <StatsBand
        title="Une agence à taille humaine, des standards élevés"
        lead="Des chiffres modestes mais réels. La qualité plutôt que la promesse."
        stats={[
          { value: "12", accent: "+", label: "années d'expérience cumulée en informatique & sécurité" },
          { value: "50", accent: "+", label: "audits, tests & missions de sécurisation menés" },
          { value: "6", accent: "+", label: "secteurs d'activité accompagnés en Wallonie" },
          { value: "<24", accent: "h", label: "délai de réponse à toute sollicitation" },
        ]}
      />

      <CTABox
        id="contact"
        title="Un échange de 30 minutes, directement avec le fondateur"
        text="Vous parlez à la personne qui fera le travail. On évalue votre exposition, on cadre votre NIS2 — vous repartez avec des priorités claires."
        actions={[
          { label: "Réserver un appel de cadrage", href: "/contact" },
          { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={[
          "Réponse sous 24 h",
          "Expert dédié, pas de sous-traitance",
          "Données en Belgique",
        ]}
      />
    </>
  );
}
