import type { Metadata } from "next";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/ui/Reveal/Reveal";
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
import { AuditDashboardFigure, BelgiumMapFigure } from "./_home/figures";
import homeStyles from "./_home/Home.module.css";

export const metadata: Metadata = {
  title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan, Liège, Wallonie",
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
    title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan, Liège",
    description:
      "On sécurise, on teste, on développe, on met en règle NIS2 / CyFun, et on corrige ce qu'on trouve. Diagnostic gratuit pour les PME de Wallonie.",
    url: "https://smidjan.be",
    siteName: "Smidjan, Cybersécurité Liège",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan, Cybersécurité & conformité NIS2 pour les PME à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité & conformité NIS2 pour les PME | Smidjan, Liège",
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

      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* ===== Services ===== */}
      <Section variant="tint" id="services">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Nos services"
            title={
              <>
                Quatre missions, un objectif&nbsp;: réduire votre{" "}
                <span className="accent">risque cyber</span>
              </>
            }
            lead="De l'infrastructure à la conformité, et on corrige ce qu'on trouve."
          />
        </Reveal>
        <Reveal stagger className={homeStyles.svcGrid}>
          <ServiceCard
            icon="server"
            kicker="Sécuriser"
            title="Réseaux & infrastructure"
            description="On verrouille votre socle technique avant que l'attaque n'atteigne vos données."
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
            description="On pense comme un attaquant pour trouver vos failles, avant qu'un vrai ne le fasse."
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
            description="« Secure by design » : la sécurité intégrée dès la première ligne de code."
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
            description="Audit, analyse d'écart, remédiation : on vous amène au niveau CyFun attendu par le CCB."
            bullets={[
              "Diagnostic & analyse d'écart",
              "Remédiation concrète",
              "Préparation à la vérification CCB",
            ]}
            href="/conformite-nis2"
            linkLabel="Voir la section dédiée"
          />
        </Reveal>

        <AiNote />
      </Section>

      {/* ===== CyFun flagship ===== */}
      <Section variant="white" id="cyfun">
        <CyfunIntro />
        <Reveal>
          <CyFunTiers showTable={false} className={homeStyles.tiers} />
        </Reveal>
        <IllusPanel
          eyebrow="Diagnostic"
          title="Un rapport d'écart clair, domaine par domaine"
          text={
            <>
              <b>Chaque exigence CyFun est mesurée, pas devinée.</b> Un niveau de maturité par
              domaine (gouvernance, accès, réseau, détection, continuité) agrégé en un score
              global.
            </>
          }
          figure={<AuditDashboardFigure />}
          onTint
        />
        <Honesty />
        <Reveal>
          <ProcessSteps
            kicker="Notre méthode en 4 étapes"
            steps={[
              {
                title: "Cadrage & auto-évaluation",
                description:
                  "Périmètre, actifs critiques, auto-évaluation CyFun, avec vos équipes.",
              },
              {
                title: "Analyse d'écart & remédiation",
                description:
                  "On mesure l'écart au niveau visé et on corrige, par priorité de risque.",
              },
              {
                title: "Support à la vérification CCB",
                description:
                  "On prépare le dossier jusqu'à la vérification par l'organisme accrédité.",
              },
              {
                title: "Suivi continu",
                description: "On maintient votre posture dans la durée, pas seulement le jour J.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* ===== Why Smidjan - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="pourquoi">
        <WhySmidjan />
        <IllusPanel
          onDark
          eyebrow="Souveraineté des données"
          title="Basés à Liège, vos données restent en Belgique"
          text={
            <>
              Pas d&apos;hébergement délocalisé.{" "}
              <b>Infrastructure, sauvegardes, échanges&nbsp;: tout reste en Belgique et dans
              l&apos;UE</b>, avec un interlocuteur sur place.
            </>
          }
          figure={<BelgiumMapFigure />}
        />
      </Section>

      {/* ===== Stats band ===== */}
      <Reveal>
        <StatsBand
          title={
            <>
              Des <span className="accentOnDark">résultats concrets</span>, une exigence constante
            </>
          }
          lead="Peu de chiffres, mais réels : la qualité plutôt que la promesse."
          stats={[
            { value: "12", accent: "+", label: "années d'expertise cumulée en sécurité" },
            { value: "50", accent: "+", label: "audits & tests d'intrusion réalisés" },
            { value: "<24", accent: "h", label: "délai de réponse à toute sollicitation" },
            { value: "100", accent: "%", label: "des données hébergées en Belgique / UE" },
          ]}
        />
      </Reveal>

      {/* ===== Testimonials ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Ils nous font confiance"
            title={
              <>
                Ce qu&apos;en disent <span className="accent">nos clients</span>
              </>
            }
          />
        </Reveal>
        <Testimonials />
      </Section>

      {/* ===== Insight teaser - full-bleed navy chapter ===== */}
      <Section variant="navy" gridBg id="insight">
        <InsightTeaser />
      </Section>

      {/* ===== Final CTA ===== */}
      <Reveal>
        <CTABox
          id="diagnostic"
          title={
            <>
              Un <span className="accentOnDark">diagnostic gratuit</span> pour savoir où vous en
              êtes
            </>
          }
          text="30 minutes avec un expert : votre exposition évaluée, votre conformité NIS2 cadrée, des priorités claires."
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
      </Reveal>
    </>
  );
}
