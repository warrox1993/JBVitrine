import type { Metadata } from "next";
import OptimizedImage from "@/components/ui/OptimizedImage/OptimizedImage";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import {
  TrustStrip,
  ServiceCard,
  CyFunTiers,
  ProcessSteps,
  StatsBand,
  CTABox,
} from "@/components/shared";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { Hero } from "./_home/Hero";
import { IllusPanel } from "./_home/IllusPanel";
import { AiNote } from "./_home/AiNote";
import { CyfunIntro } from "./_home/CyfunIntro";
import { Honesty } from "./_home/Honesty";
import { WhySmidjan } from "./_home/WhySmidjan";
import { Testimonials } from "./_home/Testimonials";
import { InsightTeaser } from "./_home/InsightTeaser";
import { TopologyFigure, AuditDashboardFigure, BelgiumMapFigure } from "./_home/figures";
import homeStyles from "./_home/Home.module.css";

export const metadata: Metadata = {
  title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan — Liège, Wallonie",
  description:
    "Smidjan sécurise réseaux, infrastructure et applications des PME wallonnes et vous met en conformité NIS2 / CyFun (CyberFundamentals, CCB). Audit, pentest, remédiation. Diagnostic gratuit à Liège.",
  keywords: [
    "cybersécurité PME Liège",
    "conformité NIS2 Belgique",
    "CyberFundamentals CyFun CCB",
    "audit sécurité informatique Wallonie",
    "test d'intrusion pentest Liège",
    "analyse d'écart NIS2",
    "remédiation cybersécurité PME",
    "sécurité réseau infrastructure",
    "développement web sécurisé",
    "expert cybersécurité Liège",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan — Liège",
    description:
      "On sécurise, on teste, on développe, on met en règle NIS2 / CyFun — et on corrige ce qu'on trouve. Diagnostic gratuit pour les PME de Wallonie.",
    url: "https://smidjan.be",
    siteName: "Smidjan — Cybersécurité Liège",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan — Cybersécurité & conformité NIS2 pour les PME à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan — Liège",
    description:
      "Sécurité, pentest, conformité NIS2 / CyFun pour les PME wallonnes. Diagnostic gratuit à Liège.",
    images: ["/og-image.webp"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Hero />

      <TrustStrip />

      {/* ===== Services ===== */}
      <Section variant="tint" id="services">
        <SectionHeading
          center
          eyebrow="Nos services"
          title={
            <>
              Quatre missions, un même objectif&nbsp;: réduire votre{" "}
              <span className="accent">risque cyber</span>
            </>
          }
          lead="De la protection de votre infrastructure à la conformité réglementaire, nous couvrons l'ensemble de la chaîne — et nous corrigeons ce que nous trouvons."
        />
        <div className={homeStyles.svcGrid}>
          <ServiceCard
            icon="server"
            kicker="Sécuriser"
            title="Réseaux & infrastructure"
            description="Nous durcissons votre socle technique pour bloquer les attaques avant qu'elles n'atteignent vos données."
            bullets={[
              "Pare-feu & segmentation réseau",
              "Supervision & détection",
              "Sauvegardes & plan de reprise (PRA)",
            ]}
            href="/services#securiser"
          />
          <ServiceCard
            icon="search"
            kicker="Tester"
            title="Audits & pentest"
            description="Nous pensons comme un attaquant pour révéler vos failles web et applicatives — avant qu'un vrai ne le fasse."
            bullets={[
              "Tests d'intrusion (OWASP)",
              "Analyse d'écart de sécurité",
              "Sécurité des applications",
            ]}
            href="/services#tester"
          />
          <ServiceCard
            icon="code"
            kicker="Développer"
            title="Développement web sécurisé"
            description="Des applications et sites conçus « secure by design », où la sécurité est intégrée dès la première ligne de code."
            bullets={[
              "Sites & applications sur mesure",
              "Sécurité intégrée au cycle de dev",
              "Revue de code & durcissement",
            ]}
            href="/services#developper"
          />
          <ServiceCard
            icon="file-check"
            kicker="Se conformer"
            title="Conformité NIS2 / CyFun"
            description="Audit, analyse d'écart et remédiation pour atteindre le niveau CyberFundamentals attendu par le CCB."
            bullets={[
              "Diagnostic & analyse d'écart",
              "Remédiation concrète",
              "Préparation à la vérification CCB",
            ]}
            href="/conformite-nis2"
            linkLabel="Voir la section dédiée"
          />
        </div>

        <IllusPanel
          eyebrow="Architecture"
          title="Un périmètre défendu, pas un empilement d'outils"
          text={
            <>
              Postes de travail, serveurs et bases de données regroupés derrière un pare-feu qui
              filtre chaque connexion entrante, avec des segments internes chiffrés.{" "}
              <b>Une architecture lisible</b>, que nous documentons et faisons évoluer avec vous.
            </>
          }
          figure={
            <div className={homeStyles.figWithPhoto}>
              <TopologyFigure />
              <OptimizedImage
                src="/images/pages/home/infrastructure-datacenter.jpg"
                alt="Baies de serveurs et câblage réseau dans un datacenter sécurisé, illustrant l'infrastructure des PME que nous durcissons."
                fill
                sizePreset="card"
                aspectRatio="landscape"
                className={homeStyles.figPhoto}
              />
            </div>
          }
        />

        <IllusPanel
          eyebrow="Développement"
          title="La sécurité intégrée dès la conception"
          text={
            <>
              Nos applications et sites sont pensés « secure by design »&nbsp;:{" "}
              <b>chaque choix d&apos;architecture</b>, du code au déploiement, réduit la surface
              d&apos;attaque avant même la mise en production.
            </>
          }
          figure={
            <OptimizedImage
              src="/images/pages/home/architecture-secure.jpg"
              alt="Circuit imprimé lumineux symbolisant une architecture applicative sécurisée dès la conception."
              fill
              sizePreset="card"
              aspectRatio="landscape"
              className={homeStyles.figPhoto}
            />
          }
        />

        <AiNote />
      </Section>

      {/* ===== CyFun flagship ===== */}
      <Section variant="white" id="cyfun">
        <CyfunIntro />
        <CyFunTiers showTable={false} className={homeStyles.tiers} />
        <IllusPanel
          eyebrow="Diagnostic"
          title="Un rapport d'écart clair, domaine par domaine"
          text={
            <>
              <b>Chaque exigence CyFun est mesurée, pas devinée</b>&nbsp;: gouvernance, accès,
              réseau, détection et continuité obtiennent chacun un niveau de maturité, agrégé en un
              score global qui situe votre entreprise par rapport au niveau visé.
            </>
          }
          figure={<AuditDashboardFigure />}
          onTint
        />
        <Honesty />
        <ProcessSteps
          kicker="Notre méthode en 4 étapes"
          steps={[
            {
              title: "Cadrage & auto-évaluation",
              description:
                "Nous délimitons le périmètre, identifions les actifs critiques et réalisons l'auto-évaluation CyFun avec vos équipes.",
            },
            {
              title: "Analyse d'écart & remédiation",
              description:
                "Nous mesurons l'écart au niveau visé et corrigeons concrètement les manques, par ordre de priorité et de risque.",
            },
            {
              title: "Support à la vérification CCB",
              description:
                "Nous préparons le dossier et vous accompagnons jusqu'à la soumission / vérification par l'organisme accrédité.",
            },
            {
              title: "Suivi continu",
              description:
                "La conformité n'est pas un projet ponctuel : nous maintenons votre posture dans le temps et à chaque évolution.",
            },
          ]}
        />
      </Section>

      {/* ===== Why Smidjan ===== */}
      <Section variant="tint" id="pourquoi">
        <WhySmidjan />
        <IllusPanel
          eyebrow="Souveraineté des données"
          title="Basés à Liège, vos données restent en Belgique"
          text={
            <>
              Pas de sous-traitance à distance ni d&apos;hébergement délocalisé&nbsp;:{" "}
              <b>votre infrastructure, vos sauvegardes et vos échanges restent hébergés en
              Belgique et dans l&apos;Union européenne</b>, avec un interlocuteur joignable sur
              place.
            </>
          }
          figure={<BelgiumMapFigure />}
        />
      </Section>

      {/* ===== Stats band ===== */}
      <StatsBand
        title={
          <>
            Des <span className="accentOnDark">résultats concrets</span>, une exigence constante
          </>
        }
        lead="Des indicateurs modestes mais réels — la mesure d'un partenaire qui privilégie la qualité à la promesse."
        stats={[
          { value: "12", accent: "+", label: "années d'expertise cumulée en sécurité" },
          { value: "50", accent: "+", label: "audits & tests d'intrusion réalisés" },
          { value: "<24", accent: "h", label: "délai de réponse à toute sollicitation" },
          { value: "100", accent: "%", label: "des données hébergées en Belgique / UE" },
        ]}
      />

      {/* ===== Testimonials ===== */}
      <Section variant="white">
        <SectionHeading
          center
          eyebrow="Ils nous font confiance"
          title={
            <>
              Ce qu&apos;en disent <span className="accent">nos clients</span>
            </>
          }
        />
        <Testimonials />
      </Section>

      {/* ===== Insight teaser ===== */}
      <Section variant="tint" id="insight">
        <InsightTeaser />
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        id="diagnostic"
        title={
          <>
            Un <span className="accentOnDark">diagnostic gratuit</span> pour savoir où vous en
            êtes
          </>
        }
        text="30 minutes avec un expert pour évaluer votre exposition, cadrer votre conformité NIS2 et repartir avec des priorités claires. Sans engagement."
        actions={[
          { label: "Réserver mon diagnostic gratuit", href: "/contact" },
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
