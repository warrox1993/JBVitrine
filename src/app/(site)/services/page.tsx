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
              Smidjan durcit votre infrastructure, teste vos applications, développe en secure by
              design et vous mène à la conformité NIS2 / CyFun — un seul interlocuteur, du premier
              appel à la remédiation.
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
          intro="Nous durcissons le socle technique de votre entreprise pour bloquer les attaques avant qu'elles n'atteignent vos données. Segmentation, filtrage, accès distant maîtrisé, détection sur les postes, sauvegardes réellement testées : une défense en profondeur, pensée pour un budget et une équipe de PME — pas une usine à gaz."
          visual={<SecureVisual />}
          capabilities={[
            { title: "Pare-feu & segmentation", description: "Cloisonnement du réseau, règles de filtrage, isolation des zones sensibles." },
            { title: "VPN & accès distant", description: "Télétravail et accès prestataires sécurisés, avec authentification forte." },
            { title: "EDR / antivirus nouvelle génération", description: "Détection et blocage des menaces sur les postes et serveurs." },
            { title: "Supervision & journalisation", description: "Collecte des logs, alertes sur les comportements suspects, traçabilité." },
            { title: "Sauvegardes & PRA", description: "Sauvegardes chiffrées, hors-ligne, et plan de reprise d'activité testé." },
            { title: "Durcissement (hardening)", description: "Configuration sécurisée des serveurs, postes, comptes et services." },
          ]}
          audience={[
            { label: "Pour qui", text: "PME sans équipe sécurité dédiée, qui veulent une base solide et maîtrisée.", icon: "users" },
            { label: "Quand", text: "Refonte réseau, migration, après un incident, ou en préparation d'un audit.", icon: "clock" },
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
            "Nous pensons comme un attaquant pour révéler vos failles avant qu'un vrai ne le fasse. Nos tests d'intrusion suivent une approche méthodique inspirée d'OWASP, avec des preuves d'exploitation concrètes et un plan de remédiation priorisé. Et surtout : nous ne nous arrêtons pas au constat — nous vous aidons à corriger ce que nous trouvons."
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
            { label: "Pour qui", text: "Entreprises éditant un site ou une application, ou soumises à une exigence client / assureur.", icon: "users" },
            { label: "Quand", text: "Avant une mise en production, à échéance annuelle, ou après un changement majeur.", icon: "clock" },
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
          intro="Nous concevons des sites et applications sur mesure où la sécurité est intégrée dès la première ligne de code — le principe « secure by design ». Plutôt que de sécuriser après coup, nous anticipons les menaces à la conception. Nous reprenons aussi les applications existantes fragiles pour les remettre à niveau et en conformité."
          visual={<DevVisual />}
          capabilities={[
            { title: "Sites & applications sur mesure", description: "Développement adapté à vos processus métier, sans dette de sécurité." },
            { title: "Secure by design", description: "Modélisation des menaces et bonnes pratiques OWASP dès la conception." },
            { title: "Mise en conformité applicative", description: "RGPD, durcissement et remise à niveau d'un existant fragile." },
            { title: "Revue de code & intégration continue", description: "Contrôles de sécurité automatisés tout au long du cycle de développement." },
          ]}
          audience={[
            { label: "Pour qui", text: "PME lançant un nouveau projet web, ou reprenant une application existante à fiabiliser.", icon: "users" },
            { label: "Quand", text: "Nouveau développement, refonte, ou besoin de mise en conformité applicative.", icon: "clock" },
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
              La plupart des prestataires font l&apos;un <em>ou</em> l&apos;autre. Nous couvrons la
              chaîne complète : nous développons vos applications, nous les mettons à
              l&apos;épreuve, nous sécurisons votre infrastructure et nous vous amenons à la
              conformité. Un interlocuteur unique, une cohérence de bout en bout, et personne à
              qui renvoyer la balle.
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
              Des <b>experts augmentés par l&apos;IA</b> pour aller plus vite et couvrir plus de
              terrain — mais l&apos;analyse et les décisions restent entre des mains humaines.
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
          intro="La directive NIS2 impose à des milliers d'entreprises belges — dont de nombreuses PME et leurs sous-traitants — un socle minimal de cybersécurité. En Belgique, la réponse officielle est le CyberFundamentals Framework (CyFun) du Centre pour la Cybersécurité Belgique (CCB). Nous vous accompagnons de l'audit à la préparation à la vérification."
          visual={<ComplyVisual alt />}
          alt
          capabilities={[
            { title: "Audit & auto-évaluation", description: "Évaluation du niveau visé (Basic, Important ou Essential) au regard de votre exposition." },
            { title: "Analyse d'écart (gap analysis)", description: "Cartographie détaillée des mesures manquantes par rapport au référentiel CyFun." },
            { title: "Remédiation concrète", description: "On corrige ce qu'on trouve — pas seulement un rapport, un plan d'action exécuté." },
            { title: "Préparation à la vérification", description: "Dossier de preuves prêt pour l'auto-évaluation ou l'organisme certificateur." },
          ]}
          audience={[
            { label: "Pour qui", text: "Entités « importantes » ou « essentielles » NIS2, et leurs sous-traitants soumis à une exigence contractuelle.", icon: "users" },
            { label: "Quand", text: "Avant l'échéance réglementaire, sur demande d'un client/donneur d'ordre, ou en anticipation d'un audit.", icon: "clock" },
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
            lead="Aperçu des trois paliers du CyberFundamentals Framework. Le détail complet, le comparatif et le calendrier NIS2 se trouvent sur notre page dédiée."
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
              de certification accrédités par BELAC (l&apos;organisme belge d&apos;accréditation),
              indépendants de Smidjan. Notre rôle : réaliser l&apos;audit et l&apos;analyse
              d&apos;écart, mettre en œuvre la remédiation concrète, et vous préparer à la
              vérification — une méthodologie alignée sur le référentiel CyFun, sans nous
              substituer à l&apos;organisme certificateur.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        title="Un diagnostic gratuit pour savoir par où commencer"
        text="30 minutes avec un expert pour évaluer votre exposition, cadrer la mission la plus utile — sécuriser, tester, développer ou vous conformer — et repartir avec des priorités claires. Sans engagement."
        actions={[
          { label: "Réserver mon diagnostic gratuit", href: "/contact" },
          { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={["Réponse sous 24 h", "Expert dédié, pas de sous-traitance", "Données en Belgique"]}
      />
    </>
  );
}
