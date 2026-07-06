import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import { LinkMore } from "@/components/ui/LinkMore/LinkMore";
import { Button } from "@/components/ui/Button/Button";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  ServicePillar,
  CyFunTiers,
  CTABox,
} from "@/components/shared";
import {
  SecureVisual,
  TestVisual,
  DevVisual,
  ComplyVisual,
} from "./PillarVisuals";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nos expertises — Cybersécurité, pentest, développement & conformité | Smidjan Liège",
  description:
    "Smidjan sécurise votre infrastructure, teste vos applications (pentest OWASP), développe en secure by design et vous accompagne vers la conformité NIS2 / CyFun. Un seul interlocuteur, à Liège.",
  keywords: [
    "cybersécurité PME Liège",
    "audit sécurité OWASP",
    "test d'intrusion pentest Belgique",
    "développement web sécurisé",
    "secure by design",
    "conformité NIS2 CyFun",
    "durcissement infrastructure réseau",
    "réponse à incident cyber",
  ],
  alternates: {
    canonical: "/services",
    languages: {
      "fr-BE": "/services",
      fr: "/services",
    },
  },
  openGraph: {
    title: "Nos expertises — Cybersécurité, pentest, développement & conformité",
    description:
      "Sécuriser, tester, développer, se conformer : quatre expertises Smidjan pour réduire concrètement le risque cyber des PME en Belgique.",
    url: "https://smidjan.be/services",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan — Cybersécurité, pentest, développement sécurisé & conformité NIS2 à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos expertises — Smidjan Cybersécurité",
    description:
      "Sécuriser, tester, développer, se conformer : quatre expertises pour réduire le risque cyber des PME.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#securiser",
      name: "Sécuriser réseaux & infrastructure",
      description:
        "Segmentation réseau, VPN, EDR, supervision, sauvegardes et durcissement pour bloquer les attaques avant qu'elles n'atteignent vos données.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Sécurité réseau & infrastructure",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#tester",
      name: "Audits & tests d'intrusion",
      description:
        "Audits de sécurité et pentests web/applicatifs suivant une approche OWASP, avec plan de remédiation priorisé et contre-vérification.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Audit & test d'intrusion",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#developper",
      name: "Développement web sécurisé",
      description:
        "Sites et applications sur mesure conçus secure by design, ainsi que la remise à niveau d'applications existantes fragiles.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Développement web sécurisé",
    },
    {
      "@type": "Service",
      "@id": "https://smidjan.be/services#conformer",
      name: "Conformité NIS2 / CyFun",
      description:
        "Accompagnement à la conformité au référentiel CyberFundamentals (CyFun) du CCB, de l'audit à la préparation à la vérification.",
      provider: { "@type": "Organization", name: "Smidjan", url: "https://smidjan.be" },
      areaServed: { "@type": "Country", name: "Belgique" },
      serviceType: "Conformité NIS2 / CyFun",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://smidjan.be" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://smidjan.be/services" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== Page hero ===== */}
      <Section variant="white" className={styles.hero} contained={false}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Services" }]} />
          <Reveal>
            <div className={styles.heroKicker}>
              <span className={styles.heroRule} aria-hidden="true" />
              <Eyebrow className={styles.kickerMono}>Nos expertises</Eyebrow>
            </div>
            <h1 className={styles.heroTitle}>
              Sécuriser, tester, développer, <span className="accent">se conformer</span>.
            </h1>
            <p className={styles.heroLead}>
              Infrastructure durcie. Applications testées. Code secure by design.
              Conformité NIS2 / CyFun. Un seul interlocuteur, de l&apos;audit à la remédiation.
            </p>
            <div className={styles.heroActions}>
              <Button
                as="a"
                href="/contact"
                variant="primary"
                size="lg"
                trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} />}
              >
                Réserver mon diagnostic gratuit
              </Button>
              <a className={styles.heroPhone} href="tel:+32475205562">
                <Icon name="phone" strokeWidth={1.8} />
                0475 20 55 62
              </a>
            </div>
            <p className={styles.jumpLabel}>Aller directement à</p>
          </Reveal>
          <Reveal as="ul" stagger className={styles.jump}>
            <li><Link className={styles.jumpLink} href="#securiser"><span className={styles.jumpNum}>01</span>Sécuriser</Link></li>
            <li><Link className={styles.jumpLink} href="#tester"><span className={styles.jumpNum}>02</span>Tester</Link></li>
            <li><Link className={styles.jumpLink} href="#developper"><span className={styles.jumpNum}>03</span>Développer</Link></li>
            <li><Link className={styles.jumpLink} href="#conformer"><span className={styles.jumpNum}>04</span>Se conformer</Link></li>
          </Reveal>
        </div>
      </Section>

      {/* ===== Pillar 01 — Sécuriser ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="securiser"
          index="01"
          icon="server"
          kicker="Sécuriser"
          title="Réseaux & infrastructure"
          intro="Bloquez les attaques avant qu'elles n'atteignent vos données. Une défense en profondeur taillée pour une PME, sans équipe sécurité dédiée."
          visual={<SecureVisual />}
          capabilities={[
            { title: "Pare-feu & segmentation", description: "Cloisonnement du réseau, règles de filtrage, isolation des zones sensibles." },
            { title: "VPN & accès distant", description: "Télétravail et accès prestataires sécurisés, authentification forte." },
            { title: "EDR / antivirus nouvelle génération", description: "Détection et blocage des menaces sur les postes et serveurs." },
            { title: "Supervision & journalisation", description: "Collecte des logs, alertes sur les comportements suspects, traçabilité." },
            { title: "Sauvegardes & PRA", description: "Sauvegardes chiffrées, hors-ligne, plan de reprise testé." },
            { title: "Durcissement (hardening)", description: "Configuration sécurisée des serveurs, postes, comptes et services." },
          ]}
          audience={[
            { label: "Pour qui", text: "PME sans équipe sécurité dédiée, en quête d'une base solide.", icon: "users" },
            { label: "Quand", text: "Refonte réseau, migration, après un incident ou avant un audit.", icon: "clock" },
          ]}
          deliverables={[
            "Architecture réseau documentée & segmentée",
            "Politique de sauvegarde + PRA testé",
            "Tableau de bord de supervision",
            "Rapport de durcissement & recommandations",
          ]}
          ctaLabel="Sécuriser mon infrastructure"
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== Pillar 02 — Tester ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="tester"
          index="02"
          icon="target"
          kicker="Tester"
          title="Audits & pentest"
          intro={
            "On pense comme un attaquant pour trouver vos failles avant lui. Méthodologie OWASP, remédiation priorisée — on vous aide à corriger, pas juste à constater."
          }
          visual={<TestVisual alt />}
          alt
          capabilities={[
            { title: "Audit de sécurité", description: "Évaluation organisationnelle et technique de votre exposition réelle." },
            { title: "Test d'intrusion web & applicatif", description: "Approche OWASP sur vos sites, applications et API exposés." },
            { title: "Revue de configuration", description: "Serveurs, cloud, Active Directory : chasse aux mauvaises configurations." },
            { title: "Revue de code", description: "Analyse du code source pour détecter les vulnérabilités à la racine." },
          ]}
          audience={[
            { label: "Pour qui", text: "Éditeurs d'un site ou d'une appli, ou soumis à une exigence client / assureur.", icon: "users" },
            { label: "Quand", text: "Avant une mise en production, chaque année, ou après un changement majeur.", icon: "clock" },
          ]}
          deliverables={[
            "Rapport de pentest priorisé par criticité",
            "Preuves d'exploitation reproductibles",
            "Recommandations concrètes & plan de remédiation",
            "Contre-vérification (retest) après correction",
          ]}
          ctaLabel="Planifier un pentest"
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== Pillar 03 — Développer ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="developper"
          index="03"
          icon="code"
          kicker="Développer"
          title="Développement web sécurisé"
          intro="La sécurité intégrée dès la première ligne de code, pas ajoutée après coup. Nouveaux projets ou remise à niveau d'un existant fragile."
          visual={<DevVisual />}
          capabilities={[
            { title: "Sites & applications sur mesure", description: "Développement adapté à vos processus métier, sans dette de sécurité." },
            { title: "Secure by design", description: "Modélisation des menaces et bonnes pratiques OWASP dès la conception." },
            { title: "Mise en conformité applicative", description: "RGPD, durcissement et remise à niveau d'un existant fragile." },
            { title: "Revue de code & intégration continue", description: "Contrôles de sécurité automatisés tout au long du cycle de développement." },
          ]}
          audience={[
            { label: "Pour qui", text: "PME lançant un projet web, ou reprenant une appli existante à fiabiliser.", icon: "users" },
            { label: "Quand", text: "Nouveau développement, refonte ou mise en conformité applicative.", icon: "clock" },
          ]}
          deliverables={[
            "Application livrée, documentée & maintenable",
            "Couverture des points de contrôle OWASP",
            "Tests de sécurité & documentation technique",
            "Transfert de connaissances à vos équipes",
          ]}
          ctaLabel="Discuter de mon projet"
          ctaHref="/contact"
        />
      </Reveal>

      {/* ===== "Un seul partenaire" cross-cut band — full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg className={styles.partner}>
        <div className={styles.partnerBox}>
          <Reveal variant="left">
            <Eyebrow onDark className={styles.kickerMono}>Un seul partenaire</Eyebrow>
            <h2>
              Construire, <span className="accentOnDark">sécuriser</span> et mettre en conformité —
              au même endroit
            </h2>
            <p className={styles.partnerLead}>
              La plupart des prestataires font l&apos;un <em>ou</em> l&apos;autre. Nous couvrons
              toute la chaîne — construire, sécuriser, conformer. Un seul interlocuteur, aucune
              balle renvoyée.
            </p>
          </Reveal>
          <Reveal as="div" stagger className={styles.chain}>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="code" strokeWidth={1.8} /></div>
              <b>Build</b>
              <p>Développement web sécurisé, secure by design.</p>
              <span className={styles.plus} aria-hidden="true">+</span>
            </div>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="shield-check" strokeWidth={1.8} /></div>
              <b>Secure</b>
              <p>Infrastructure durcie, pentest & supervision.</p>
              <span className={styles.plus} aria-hidden="true">+</span>
            </div>
            <div className={styles.node}>
              <div className={styles.nodeIcon}><Icon name="file-check" strokeWidth={1.8} /></div>
              <b>Comply</b>
              <p>Conformité CyFun / NIS2, de l&apos;écart à la preuve.</p>
            </div>
          </Reveal>
        </div>
        <Reveal variant="up" delay={140}>
          <div className={styles.aiNote}>
            <Icon name="sparkles" strokeWidth={1.8} />
            <span>
              Des <b>experts augmentés par l&apos;IA</b> — plus rapides, plus de terrain couvert.
              L&apos;analyse et les décisions restent humaines.
            </span>
          </div>
        </Reveal>
      </Section>

      {/* ===== Pillar 04 — Se conformer (CyFun / NIS2) ===== */}
      <Reveal variant="up">
        <ServicePillar
          id="conformer"
          index="04"
          icon="file-check"
          kicker="Se conformer"
          title="CyFun / NIS2"
          intro="Êtes-vous concerné par NIS2 ? Le règlement impose un socle cyber à des milliers d'entreprises belges, sous-traitants inclus. On vous accompagne de l'audit à la préparation de la vérification, sur le référentiel CyFun du CCB."
          visual={<ComplyVisual alt />}
          alt
          capabilities={[
            { title: "Audit & auto-évaluation", description: "Évaluation du niveau visé (Basic, Important ou Essential) au regard de votre exposition." },
            { title: "Analyse d'écart (gap analysis)", description: "Cartographie des mesures manquantes par rapport au référentiel CyFun." },
            { title: "Remédiation concrète", description: "On corrige ce qu'on trouve — pas seulement un rapport, un plan d'action exécuté." },
            { title: "Préparation à la vérification", description: "Dossier de preuves prêt pour l'auto-évaluation ou l'organisme certificateur." },
          ]}
          audience={[
            { label: "Pour qui", text: "Entités « importantes » ou « essentielles » NIS2, et leurs sous-traitants.", icon: "users" },
            { label: "Quand", text: "Avant l'échéance réglementaire, sur demande d'un donneur d'ordre, ou avant un audit.", icon: "clock" },
          ]}
          deliverables={[
            "Rapport d'écart (gap analysis) documenté",
            "Plan de remédiation priorisé",
            "Dossier de preuves pour le niveau visé",
            "Suivi jusqu'à la remédiation complète",
          ]}
          ctaLabel="Découvrir notre accompagnement CyFun"
          ctaHref="/conformite-nis2"
        />
      </Reveal>

      {/* ===== CyFun teaser — 3 niveaux + transparency block ===== */}
      <Section variant="tint">
        <Reveal variant="up">
          <SectionHeading
            center
            eyebrow="Les 3 niveaux CyFun"
            title={
              <>
                Un référentiel gradué, un accompagnement <span className="accent">sur mesure</span>
              </>
            }
            lead="Les trois paliers du CyberFundamentals Framework, en bref. Comparatif complet et calendrier NIS2 sur la page dédiée."
            className={styles.cyfunTeaser}
          />
          <div style={{ textAlign: "center" }}>
            <LinkMore href="/conformite-nis2" className={styles.cyfunLinkMore}>
              Voir le comparatif complet des niveaux CyFun
            </LinkMore>
          </div>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <CyFunTiers showTable={false} />
        </Reveal>
        <Reveal variant="up" delay={120}>
          <div className={styles.transparency}>
            <Icon name="alert-circle" strokeWidth={2} />
            <p>
              <b>En toute transparence :</b> la certification CyFun est délivrée par des organismes
              accrédités BELAC, indépendants de Smidjan. Notre rôle : audit, analyse d&apos;écart,
              remédiation concrète et préparation à la vérification — une méthodologie alignée sur
              le référentiel CyFun, sans nous substituer au certificateur.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        title="Un diagnostic gratuit pour savoir par où commencer"
        text="30 minutes avec un expert pour cadrer la mission utile. Priorités claires, sans engagement."
        actions={[
          { label: "Réserver mon diagnostic gratuit", href: "/contact" },
          { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={["Réponse sous 24 h", "Expert dédié, pas de sous-traitance", "Données en Belgique"]}
      />
    </>
  );
}
