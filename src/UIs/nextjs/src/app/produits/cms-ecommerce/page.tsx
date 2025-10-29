import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/atoms/Card";
import { Footer } from "@/components/sections/Footer/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SMIDJAN CMS e-commerce — rapide, sécurisé, modulaire",
  description:
    "CMS e-commerce pour produits, services ou offres hybrides : performance front, sécurité OWASP, intégrations Stripe, n8n, SEO technique, facturation européenne.",
  alternates: {
    canonical: "/produits/cms-ecommerce",
    languages: {
      "fr-BE": "/produits/cms-ecommerce",
      fr: "/produits/cms-ecommerce",
    },
  },
  openGraph: {
    title: "SMIDJAN CMS e-commerce — rapide, sécurisé, modulaire",
    description:
      "Une plateforme CMS e-commerce modulaire avec performances Core Web Vitals, sécurité intégrée, automatisations n8n et intégrations Stripe.",
    url: "https://smidjan.be/produits/cms-ecommerce",
    siteName: "SMIDJAN",
    images: [
      {
        url: "https://smidjan.be/logo.png",
        width: 512,
        height: 512,
        alt: "SMIDJAN CMS e-commerce",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMIDJAN CMS e-commerce — rapide, sécurisé, modulaire",
    description:
      "CMS e-commerce SMIDJAN : front performant, sécurité OWASP native, Stripe, n8n et reporting pour vos catalogues produits et services.",
    images: ["/og-image.png"],
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

export const dynamic = "error";

const heroHighlights = [
  {
    label: "Performance Core Web Vitals",
    icon: <SparklesIcon aria-hidden="true" />,
  },
  {
    label: "Sécurité intégrée (OWASP, headers, secrets)",
    icon: <ShieldCheckIcon aria-hidden="true" />,
  },
  {
    label: "Intégrations Stripe / n8n / emailing",
    icon: <WorkflowIcon aria-hidden="true" />,
  },
  {
    label: "Multi-catalogue produits & services",
    icon: <TargetIcon aria-hidden="true" />,
  },
] as const;

const benefits = [
  {
    title: "Vitesse de mise en ligne",
    description: "Base Next.js optimisée, design system prêt, déploiements CI/CD sécurisés pour lancer en quelques semaines.",
  },
  {
    title: "Admin simple et documenté",
    description: "Back-office guidé, rôles utilisateurs, documentation intégrée et tutoriels contextualisés.",
  },
  {
    title: "SEO technique & accessibilité",
    description: "Balises structurées, sitemaps, tests axe et monitoring Lighthouse automatisé.",
  },
  {
    title: "Scalabilité maîtrisée",
    description: "Architecture modulaire, tests automatisés, monitoring de charge et observabilité.",
  },
  {
    title: "Automatisations n8n",
    description: "Workflows CRM, facturation, emailing et synchronisation ERP déclenchés en temps réel.",
  },
  {
    title: "Observabilité & logs",
    description: "Dashboards de suivi, alertes, journaux de transactions et audit trail complet.",
  },
] as const;

const functionalModules = [
  {
    title: "Catalogue",
    items: [
      "Produits & services illimités",
      "Variantes, attributs, SKU",
      "Catégories hiérarchiques",
      "Gestion d’inventaire et stocks",
    ],
  },
  {
    title: "Paiements & facturation",
    items: [
      "Intégration Stripe & virement",
      "Facturation UE et TVA multi-régions",
      "Automatisation des reçus",
      "Plans de paiement récurrents",
    ],
  },
  {
    title: "Commandes & logistique",
    items: [
      "Statuts personnalisables",
      "Notifications transactionnelles",
      "Transporteurs & point relais",
      "Portail client en libre-service",
    ],
  },
  {
    title: "CMS & contenu",
    items: [
      "Pages, blog, ressources",
      "Gestion media optimisée (AVIF/WebP)",
      "SEO éditorial intégré",
      "A/B testing des pages clés",
    ],
  },
  {
    title: "Sécurité",
    items: [
      "Auth multi-facteurs",
      "Gestion des secrets & KV",
      "Headers CSP/HSTS durcis",
      "Tests DAST & SAST en pipeline",
    ],
  },
  {
    title: "Analytics & reporting",
    items: [
      "Tableaux personnalisés",
      "Exports CSV programmés",
      "Connecteurs BI (Metabase, Looker)",
      "Alerting sur anomalies",
    ],
  },
] as const;

type PlanId = "mvp" | "pro" | "premium";

const plans: Array<{
  id: PlanId;
  name: string;
  description: string;
  features: readonly string[];
  highlight?: boolean;
}> = [
  {
    id: "mvp",
    name: "MVP",
    description: "Base e-commerce opérationnelle pour produits OU services, panier, paiement et facturation.",
    features: [
      "Catalogue + panier + checkout Stripe",
      "Page produits + landing pack SEO",
      "Automatisation factures PDF",
      "Support lancement 30 jours",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Sécurité CI/CD renforcée, automatisations n8n et optimisation continue des performances.",
    features: [
      "Workflows n8n (CRM, mailing, ERP)",
      "Scans SAST + DAST en pipeline",
      "Monitoring Lighthouse + Web Vitals",
      "Coaching équipe interne & doc avancée",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Scalabilité avancée, catalogue mixte produits & services, intégrations sur mesure et SLA prioritaire.",
    features: [
      "Catalogue hybride + pricing dynamique",
      "Intégrations spécifiques (PIM, OMS)",
      "SLA 24h + support incident critique",
      "Feature flags & rollbacks sécurisés",
    ],
  },
];

const integrations = [
  { name: "Stripe", description: "Paiements sécurisés, paiement fractionné, abonnements." },
  { name: "n8n", description: "Automatisations CRM, facturation, back-office." },
  { name: "Suite emailing", description: "Transactional + marketing (Brevo, Mailjet, Postmark)." },
  { name: "Hébergement cloud", description: "Vercel, Azure, OVHcloud ou infrastructure dédiée." },
  { name: "Key Vault / KMS", description: "Gestion des secrets et rotation automatisée." },
] as const;

const showcaseShots = [
  {
    src: "/images/pic01.webp",
    title: "Catalogue modulable",
    description: "Vue produits responsive avec filtres dynamiques et prévisualisation rapide.",
  },
  {
    src: "/images/pic02.webp",
    title: "Checkout optimisé",
    description: "Tunnel de commande rapide, support des paniers mixtes et codes promo.",
  },
  {
    src: "/images/pic03.webp",
    title: "Dashboard analytics",
    description: "Tableaux temps réel : ventes, panier moyen, sources d’acquisition.",
  },
] as const;

const caseStudy = {
  client: "Nova Retail",
  summary: "Migration d’un site vitrine vers SMIDJAN CMS e-commerce avec catalogue produits et services synchronisé.",
  metrics: [
    { label: "Lancement", value: "5 semaines" },
    { label: "Panier moyen", value: "+32%" },
    { label: "Core Web Vitals", value: "98 / 100" },
  ] as const,
};

const faqItems = [
  {
    question: "Quelle licence est incluse ?",
    answer:
      "Le CMS est fourni sous licence propriétaire SMIDJAN avec code source livré et réutilisable dans votre infrastructure.",
  },
  {
    question: "Peut-on personnaliser le design ?",
    answer:
      "Oui. Le design system est modulable : chartes graphiques, composants React et templates peuvent être adaptés.",
  },
  {
    question: "Quels délais moyens pour un déploiement ?",
    answer: "Un MVP complet se livre en 4 à 6 semaines. Les versions Pro et Premium varient entre 6 et 10 semaines.",
  },
  {
    question: "Comment est gérée la sécurité ?",
    answer:
      "CI/CD sécurisé, audits OWASP, scans SAST/DAST, gestion des secrets et revue de code. Les plans Pro et Premium incluent monitoring continu.",
  },
  {
    question: "Qui possède les données et le code ?",
    answer: "Vous. Les dépôts Git, pipelines et environnements vous sont transférés avec documentation complète.",
  },
  {
    question: "Proposez-vous une formation ?",
    answer:
      "Chaque lancement inclut ateliers admin + formation équipe marketing/ops, ainsi qu’un guide PDF et vidéos.",
  },
  {
    question: "Le CMS gère-t-il le SEO avancé ?",
    answer:
      "Oui : sitemaps, balises, Open Graph, données structurées, redirections et monitoring Search Console.",
  },
] as const;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SMIDJAN CMS e-commerce",
    description:
      "CMS e-commerce modulaire pour produits et services avec performances optimisées, sécurité OWASP, intégrations Stripe et automatisations n8n.",
    brand: {
      "@type": "Brand",
      name: "SMIDJAN",
    },
    offers: {
      "@type": "Offer",
      price: "Sur devis",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://smidjan.be/produits/cms-ecommerce",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "B2B",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SMIDJAN CMS e-commerce",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "Sur devis",
      priceCurrency: "EUR",
    },
  },
] as const;

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function HeroSection() {
  return (
    <section id="cms-hero" className={`${styles.section} ${styles.heroSection}`} aria-labelledby="cms-hero-title">
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <Heading as="h1" className={styles.heroTitle} id="cms-hero-title">
              SMIDJAN CMS — e-commerce modulaire, performant et sécurisé
            </Heading>
            <p className={styles.heroSubtitle}>
              Lancez une boutique produits, services, ou hybride. Architecture propre, sécurité intégrée, automations
              prêtes à l’emploi.
            </p>
            <div className={styles.heroActions}>
              <Button
                as="a"
                href="/contact"
                variant="solid"
                size="lg"
                ariaLabel="Demander une démo du CMS e-commerce"
                trailingIcon={<ArrowRightIcon aria-hidden="true" />}
              >
                Demander une démo
              </Button>
              <Button
                as="a"
                href="#plans"
                variant="outline"
                size="lg"
                ariaLabel="Voir les plans CMS e-commerce"
              >
                Voir les plans
              </Button>
            </div>
            <ul className={styles.heroHighlights} role="list">
              {heroHighlights.map((item) => (
                <li key={item.label} className={styles.heroHighlightItem}>
                  <span className={styles.heroHighlightIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualGlow} aria-hidden="true" />
            <Image
              src="/images/pic04.webp"
              alt="Interface du CMS e-commerce SMIDJAN montrant le catalogue produits et services"
              width={720}
              height={520}
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickProofsSection() {
  return (
    <section id="cms-proofs" className={`${styles.section} ${styles.proofsSection}`} aria-labelledby="cms-proofs-title">
      <div className="container">
        <Heading as="h2" id="cms-proofs-title" className={styles.sectionTitle} accent>
          Preuves rapides
        </Heading>
        <ul className={styles.proofList} role="list">
          {heroHighlights.map((item) => (
            <li key={item.label} className={styles.proofItem}>
              <span className={styles.proofIcon}>{item.icon}</span>
              <span className={styles.proofLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="cms-benefits" className={`${styles.section} ${styles.altBackground}`} aria-labelledby="cms-benefits-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-benefits-title" className={styles.sectionTitle} accent>
            Bénéfices clés
          </Heading>
          <p className={styles.sectionLead}>
            Une base technique solide pour accélérer votre go-to-market, simplifier l’opérationnel et fiabiliser vos performances.
          </p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <article key={benefit.title} className={styles.benefitCard}>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FunctionalitySection() {
  return (
    <section id="cms-modules" className={styles.section} aria-labelledby="cms-modules-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-modules-title" className={styles.sectionTitle} accent>
            Modules fonctionnels
          </Heading>
          <p className={styles.sectionLead}>
            Des blocs modulables pour composer votre plateforme : chaque module respecte nos exigences de sécurité, performance et accessibilité.
          </p>
        </div>
        <div className={styles.modulesGrid}>
          {functionalModules.map((module) => (
            <article key={module.title} className={styles.moduleCard}>
              <h3 className={styles.cardTitle}>{module.title}</h3>
              <ul className={styles.moduleList}>
                {module.items.map((item) => (
                  <li key={item} className={styles.moduleItem}>
                    <CheckIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section id="plans" className={`${styles.section} ${styles.altBackground}`} aria-labelledby="cms-plans-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-plans-title" className={styles.sectionTitle} accent>
            Plans &amp; tarifs
          </Heading>
          <p className={styles.sectionLead}>
            Trois niveaux pour aligner votre roadmap business, votre niveau d’exigence sécurité et vos intégrations existantes.
          </p>
        </div>
        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${styles.planCard}${plan.highlight ? ` ${styles.planCardHighlight}` : ""}`}
              id={plan.id}
              aria-labelledby={`${plan.id}-title`}
            >
              <CardHeader className={styles.planHeader}>
                <span className={styles.planBadge}>{plan.name}</span>
                <h3 id={`${plan.id}-title`} className={styles.cardTitle}>
                  {plan.description}
                </h3>
              </CardHeader>
              <CardBody>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter className={styles.planFooter}>
                <Button
                  as="a"
                  href="/contact"
                  variant="solid"
                  size="md"
                  ariaLabel={`Demander un devis pour le plan ${plan.name}`}
                  trailingIcon={<ArrowRightIcon aria-hidden="true" />}
                  className={styles.planPrimaryCta}
                >
                  Demander un devis
                </Button>
                <Button
                  as="a"
                  href={`#${plan.id}`}
                  variant="ghost"
                  size="md"
                  ariaLabel={`Voir le détail du plan ${plan.name}`}
                >
                  Voir le détail du plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section
      id="cms-integrations"
      className={styles.section}
      aria-labelledby="cms-integrations-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-integrations-title" className={styles.sectionTitle} accent>
            Intégrations prêtes
          </Heading>
          <p className={styles.sectionLead}>
            Connectez votre CMS aux outils indispensables pour vos opérations : paiements, automatisations, emailing, hébergement et sécurité.
          </p>
        </div>
        <ul className={styles.integrationsList} role="list">
          {integrations.map((integration) => (
            <li key={integration.name} className={styles.integrationItem}>
              <div className={styles.integrationName}>{integration.name}</div>
              <p className={styles.integrationDescription}>{integration.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section id="cms-showcase" className={`${styles.section} ${styles.altBackground}`} aria-labelledby="cms-showcase-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-showcase-title" className={styles.sectionTitle} accent>
            Captures &amp; démos
          </Heading>
          <p className={styles.sectionLead}>
            Visualisez l’expérience côté client et côté équipe : interfaces rapides, lisibles et accessibles pensée pour convertir.
          </p>
        </div>
        <div className={styles.showcaseGrid}>
          {showcaseShots.map((shot) => (
            <figure key={shot.title} className={styles.showcaseItem}>
              <Image
                src={shot.src}
                alt={shot.title}
                width={480}
                height={320}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.showcaseImage}
              />
              <figcaption className={styles.showcaseCaption}>
                <strong>{shot.title}</strong>
                <span>{shot.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudySection() {
  return (
    <section id="cms-case" className={styles.section} aria-labelledby="cms-case-title">
      <div className="container">
        <div className={styles.caseWrapper}>
          <div>
            <Heading as="h2" id="cms-case-title" className={styles.sectionTitle} accent>
              Cas client — {caseStudy.client}
            </Heading>
            <p className={styles.sectionLead}>{caseStudy.summary}</p>
          </div>
          <dl className={styles.caseMetrics}>
            {caseStudy.metrics.map((metric) => (
              <Fragment key={metric.label}>
                <dt className={styles.caseMetricLabel}>{metric.label}</dt>
                <dd className={styles.caseMetricValue}>{metric.value}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="cms-faq" className={`${styles.section} ${styles.altBackground}`} aria-labelledby="cms-faq-title">
      <div className="container">
        <Heading as="h2" id="cms-faq-title" className={styles.sectionTitle} accent>
          FAQ
        </Heading>
        <div className={styles.faqList} role="list">
          {faqItems.map((item, index) => (
            <details key={item.question} className={styles.faqItem} {...(index === 0 ? { open: true } : {})}>
              <summary className={styles.faqSummary}>
                <span>{item.question}</span>
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="cms-cta" className={styles.section} aria-labelledby="cms-cta-title">
      <div className="container">
        <div className={styles.finalCta}>
          <Heading as="h2" id="cms-cta-title" className={styles.sectionTitle} accent>
            Prêt à lancer ?
          </Heading>
          <p className={styles.sectionLead}>Discutons de votre projet. Nous auditons vos besoins et alignons la feuille de route en moins de 72 heures.</p>
          <Button
            as="a"
            href="/contact"
            variant="solid"
            size="lg"
            ariaLabel="Contacter SMIDJAN pour un projet CMS e-commerce"
            trailingIcon={<ArrowRightIcon aria-hidden="true" />}
            className={styles.finalCtaButton}
          >
            Prendre contact
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function CmsEcommercePage() {
  return (
    <>
      <StructuredData />
      <div className={styles.pageRoot}>
        <HeroSection />
        <QuickProofsSection />
        <BenefitsSection />
        <FunctionalitySection />
        <PlansSection />
        <IntegrationsSection />
        <ShowcaseSection />
        <CaseStudySection />
        <FaqSection />
        <FinalCtaSection />
      </div>
      <Footer />
    </>
  );
}

