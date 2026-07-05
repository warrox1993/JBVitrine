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
                Basé à Liège, Jean-Baptiste Dhondt sécurise lui-même votre
                entreprise — pas un centre d&rsquo;appel, pas de
                sous-traitance, pas de rapport qu&rsquo;on range dans un
                tiroir.
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
            lead="Quatre principes qui guident chaque mission — et sur lesquels nous acceptons d'être jugés."
          />
        </Reveal>
        <Reveal stagger className={styles.engageGrid}>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="map-pin" strokeWidth={1.7} />
            </div>
            <h3>Proximité</h3>
            <p>
              Locaux et réactifs. Nous intervenons vite en Wallonie, et vous
              avez un interlocuteur réellement joignable — au téléphone, pas
              derrière un ticket.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="check-circle" strokeWidth={1.7} />
            </div>
            <h3>Franchise</h3>
            <p>
              On vous dit ce qui compte, clairement et sans dramatiser. Pas
              de vente de peur : des priorités honnêtes, adaptées à votre
              réalité et à votre budget.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="file-check" strokeWidth={1.7} />
            </div>
            <h3>On corrige</h3>
            <p>
              Nous ne nous contentons pas d&rsquo;auditer : nous corrigeons
              ce que nous trouvons. Un constat sans remédiation ne réduit
              aucun risque.
            </p>
          </article>
          <article className={styles.engageCard}>
            <div className={styles.engageIco}>
              <Icon name="sparkles" strokeWidth={1.7} />
            </div>
            <h3>L&rsquo;humain augmenté par l&rsquo;IA</h3>
            <p>
              Nous utilisons l&rsquo;IA pour aller plus vite et couvrir plus
              large — mais l&rsquo;analyse et les décisions restent entre
              des mains humaines et expertes.
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
        lead="Des indicateurs modestes mais réels — la mesure d'un partenaire qui privilégie la qualité à la promesse."
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
        text="Pas de commercial intermédiaire : vous parlez à la personne qui réalisera le travail. On évalue votre exposition, on cadre votre conformité NIS2 et vous repartez avec des priorités claires. Sans engagement."
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
