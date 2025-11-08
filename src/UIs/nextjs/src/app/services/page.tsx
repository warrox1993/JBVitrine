import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardBody, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import { Footer } from "@/components/sections/Footer/Footer";
import { TechStackEnhanced } from "@/components/sections/TechStack/TechStackEnhanced";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { ServicesHero } from "./ServicesHero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services — Développement Web, Cybersécurité & IA à Liège",
  description:
    "Agence digitale à Liège : développement web sur mesure avec Next.js/React, cybersécurité (OWASP, audits), automatisation IA et CMS e-commerce. Services pour toute la Belgique.",
  keywords: [
    "développement web Liège",
    "cybersécurité Belgique",
    "automatisation IA",
    "agence web Wallonie",
    "CMS e-commerce",
    "Next.js React",
    "audit sécurité OWASP",
    "n8n automatisation",
  ],
  alternates: {
    canonical: "/services",
    languages: {
      "fr-BE": "/services",
      fr: "/services",
    },
  },
  openGraph: {
    title: "Services Web & Cybersécurité — Smidjan Liège",
    description:
      "Développement web performant, cybersécurité avancée et automatisations IA pour entreprises en Belgique. CMS e-commerce, audits OWASP et solutions sur mesure.",
    url: "https://smidjan.be/services",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan — Services de développement web et cybersécurité à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Web & Cybersécurité — Smidjan",
    description:
      "Développement web, cybersécurité et IA pour entreprises en Belgique.",
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

const servicePillars = [
  {
    id: "developpement-web",
    title: "Développement Web",
    subtitle: "Des architectures web sur mesure, rapides et prêtes à évoluer.",
    description:
      "Nous créons des sites, applications et plateformes taillés pour la performance : rapides à charger, simples à maintenir et adaptés à votre croissance. De la vitrine à l'écosystème complet, chaque projet repose sur un code robuste et un design clair.",
    technologies: "Next.js / React / Smidjan CMS / PostgreSQL / Stripe / API REST",
    benefits: [
      "Un site ou une application à haute performance (LCP < 2 s)",
      "Une architecture évolutive et bien documentée",
      "Un front-end optimisé SEO et accessible",
      "Une intégration fluide avec vos outils internes",
    ],
    examples: [
      "Site vitrine premium pour PME locale",
      "Plateforme e-commerce connectée à Stripe et ERP",
      "Application interne avec tableau de bord et gestion utilisateurs",
    ],
    cta: "Démarrer un projet web",
  },
  {
    id: "cybersecurite",
    title: "Cybersécurité Web",
    subtitle: "Sécuriser vos sites et applications dès la conception.",
    description:
      "Nous intégrons la sécurité dans chaque ligne de code : analyse, test, surveillance et durcissement des environnements web. L'objectif : anticiper les failles avant qu'elles ne deviennent des menaces.",
    technologies: "Audit OWASP / Pentest / Durcissement serveur / Monitoring IA / RGPD / DevSecOps",
    benefits: [
      "Un audit complet et priorisé",
      "Un code auditable et un serveur durci",
      "Une surveillance continue et alertes intelligentes",
      "Une conformité RGPD documentée",
    ],
    examples: [
      "Audit de sécurité avant levée de fonds",
      "Protection d'une plateforme e-commerce",
      "Sécurisation d'une API exposée",
    ],
    cta: "Sécuriser mon projet",
  },
  {
    id: "automatisation-ia",
    title: "Automatisation & IA",
    subtitle: "Automatiser, connecter, accélérer.",
    description:
      "Nous mettons en place des workflows intelligents et des assistants IA capables de réduire la charge opérationnelle et d'améliorer vos processus quotidiens. Du simple déclencheur n8n au micro-service IA, tout est pensé pour fluidifier votre activité.",
    technologies: "n8n / Python (FastAPI) / GPT / Zapier / Notion / CRM / API REST",
    benefits: [
      "Des tâches automatisées et synchronisées entre vos outils",
      "Des rapports et dashboards automatiques",
      "Des agents IA formés sur vos données internes",
      "Moins de frictions et plus de productivité",
    ],
    examples: [
      "Automatisation des factures et emails internes",
      "Assistant IA pour support client ou marketing",
      "Connexion CRM ↔ Stripe ↔ Notion",
    ],
    cta: "Automatiser mon business",
  },
] as const;

const cmsFeatures = [
  {
    title: "Fonctionnalités clés",
    items: [
      "Gestion produits avancée (variantes, stocks, bundles)",
      "Commandes, paiements sécurisés et facturation",
      "Interface admin personnalisable et droits fins",
      "API REST complète pour écosystème externe",
      "Multi-langues, multi-devises, SEO intégré",
    ],
  },
  {
    title: "Avantages business",
    items: [
      "Déploiement en 1 à 4 semaines",
      "Coûts maîtrisés vs développement from scratch",
      "Évolutions continues incluses dans la maintenance",
      "Support dédié et SLA contractuel",
      "Mises à jour de sécurité automatisées",
    ],
  },
  {
    title: "Personnalisation",
    items: [
      "Adaptation complète à votre charte",
      "Modules métier spécifiques",
      "Intégrations CRM/ERP/marketing",
      "Workflows automatisés sur mesure",
      "Analytics et reporting dédiés",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      {/* JSON-LD Structured Data - Service Catalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Service",
                "@id": "https://smidjan.be/services#developpement-web",
                name: "Développement Web sur Mesure",
                description: "Création de sites web, applications et plateformes performantes avec Next.js, React et CMS e-commerce. Architecture évolutive et optimisée SEO.",
                provider: {
                  "@type": "Organization",
                  name: "Smidjan",
                  url: "https://smidjan.be",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Belgique",
                },
                serviceType: "Développement Web",
                category: "Web Development",
              },
              {
                "@type": "Service",
                "@id": "https://smidjan.be/services#cybersecurite",
                name: "Cybersécurité Web",
                description: "Audits de sécurité OWASP, tests de pénétration, durcissement serveur et conformité RGPD. Protection complète de vos applications web.",
                provider: {
                  "@type": "Organization",
                  name: "Smidjan",
                  url: "https://smidjan.be",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Belgique",
                },
                serviceType: "Cybersécurité",
                category: "Security Services",
              },
              {
                "@type": "Service",
                "@id": "https://smidjan.be/services#automatisation-ia",
                name: "Automatisation & Intelligence Artificielle",
                description: "Automatisations intelligentes avec n8n, intégration IA (GPT, Anthropic) et workflows personnalisés pour optimiser vos processus métier.",
                provider: {
                  "@type": "Organization",
                  name: "Smidjan",
                  url: "https://smidjan.be",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Belgique",
                },
                serviceType: "Automatisation & IA",
                category: "Business Automation",
              },
            ],
          }),
        }}
      />
      {/* JSON-LD Structured Data - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://smidjan.be",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://smidjan.be/services",
              },
            ],
          }),
        }}
      />
      <ServicesHero />

      <section
        id="services-pillars"
        className={`${styles.section} ${styles.pillars} ${styles.sectionLight}`}
        aria-labelledby="services-pillars-title"
      >
        <AnimatedBackground variant="light" />
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-pillars-title">
              Nos services
            </Heading>
            <p className={styles.sectionLead}>
              Chaque service Smidjan est pensé pour résoudre un problème réel : plus de lenteur, plus d'incertitude technique, plus de perte de temps. Nous livrons des solutions mesurables, documentées et évolutives.
            </p>
          </div>
          <div className={styles.servicesDetailed}>
            {servicePillars.map((service) => (
              <div key={service.id} id={service.id} className={styles.serviceBlock}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDescription}>{service.description}</p>

                <div className={styles.serviceTech}>
                  <strong>Technologies :</strong>
                  <p>{service.technologies}</p>
                </div>

                <div className={styles.serviceBenefits}>
                  <strong>Ce que vous obtenez :</strong>
                  <ul>
                    {service.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceExamples}>
                  <strong>Exemples de projets :</strong>
                  <ul>
                    {service.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  as="a"
                  href="/contact"
                  variant="solid"
                  size="sm"
                  ariaLabel={service.cta}
                >
                  {service.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechStackEnhanced />

      <section id="services-cms" className={`${styles.section} ${styles.sectionLight}`} aria-labelledby="services-cms-highlight">
        <AnimatedBackground variant="light" />
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-cms-highlight">
              Smidjan CMS — le socle produit que nous faisons évoluer en continu.
            </Heading>
            <p className={styles.sectionLead}>
              Au cœur de notre savoir-faire, un CMS e-commerce modulaire et évolutif, conçu pour offrir la liberté du sur-mesure avec la stabilité d'une architecture éprouvée. Multi-store, sécurisé et rapide, Smidjan CMS propulse nos projets internes et ceux de nos clients pilotes.
            </p>
          </div>
          <div className={`${styles.packagesGrid} ${styles.cmsPackages}`}>
            {cmsFeatures.map((feature) => (
              <div key={feature.title} className={styles.packageCard}>
                <h3 className={styles.packageName}>{feature.title}</h3>
                <ul className={styles.packageList}>
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-4)", textAlign: "center" }}>
            <Button as="a" href="/contact" variant="solid" size="md" ariaLabel="Découvrir Smidjan CMS">
              Découvrir Smidjan CMS
            </Button>
          </div>
        </div>
      </section>

      <section id="services-contact" className={`${styles.section} ${styles.sectionLight}`} aria-labelledby="services-final-cta">
        <AnimatedBackground variant="light" />
        <div className="container">
          <div className={styles.finalCta}>
            <h2 id="services-final-cta" className={styles.finalCtaTitle}>
              Votre projet mérite une architecture solide.
            </h2>
            <p className={styles.finalCtaText}>
              Discutons de vos objectifs, et voyons comment les traduire en code. Chez Smidjan, chaque collaboration repose sur un engagement simple : livrer des résultats mesurables, pas des promesses vagues.
            </p>
            <Button
              as="a"
              href="/contact"
              variant="solid"
              size="md"
              className={styles.finalCtaButton}
              ariaLabel="Démarrer un projet avec SMIDJAN"
            >
              Démarrer un projet
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

