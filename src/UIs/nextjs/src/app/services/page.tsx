"use client";
import { Card, CardBody, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import { Footer } from "@/components/sections/Footer/Footer";
import { TechStackEnhanced } from "@/components/sections/TechStack/TechStackEnhanced";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import styles from "./page.module.css";

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


const packages = [
  {
    name: "Pack Build",
    subtitle: "lancer vite, solide et mesurable.",
    description: "Inclut : développement web complet, hébergement, mise en ligne, documentation.",
  },
  {
    name: "Pack Sécurité",
    subtitle: "auditer, durcir, stabiliser.",
    description: "Inclut : audit OWASP, monitoring IA, plan de remédiation.",
  },
  {
    name: "Pack Automatisation & IA",
    subtitle: "connecter, fluidifier, accélérer.",
    description: "Inclut : automatisations n8n / Zapier / API + intégration IA personnalisée.",
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
  const { ref: heroRef, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });

  return (
    <div className={styles.page}>
      <section
        id="services-hero"
        ref={heroRef}
        className={`${styles.section} ${styles.hero} ${styles.sectionDark} ${isVisible ? styles.visible : ""}`}
        aria-labelledby="services-hero-title"
      >
        <AnimatedBackground variant="dark" />
        <svg
          className={styles.heroDecor}
          viewBox="0 0 1440 200"
          fill="none"
          aria-hidden="true"
          role="presentation"
          preserveAspectRatio="none"
        >
          <path d="M0,10 Q360,0 720,60 T1440,60 L1440,200 L0,200 Z" fill="url(#services-hero-gradient)" />
          <defs>
            <linearGradient id="services-hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent-1)" />
              <stop offset="50%" stopColor="var(--color-accent-2)" />
              <stop offset="100%" stopColor="var(--color-accent-3)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="container">
          <div className={styles.heroInner}>
            <h1 id="services-hero-title" className={styles.heroTitle}>
              Des solutions digitales prêtes à performer.
            </h1>
            <p className={styles.heroLead}>
              Smidjan conçoit et sécurise des systèmes web sur mesure : sites, plateformes et automatisations qui augmentent votre efficacité réelle — pas votre jargon.
            </p>
            <div className={styles.heroActions}>
              <Button as="a" href="/contact" variant="solid" size="md" ariaLabel="Démarrer un projet avec SMIDJAN">
                Démarrer un projet
              </Button>
            </div>
          </div>
        </div>
      </section>

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

      <section id="services-tech" className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="services-tech-stack">
        <TechStackEnhanced />
      </section>

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

      <section id="services-packages" className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="services-packages-title">
        <AnimatedBackground variant="dark" />
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-packages-title">
              Trois formules pour passer de l'idée au résultat
            </Heading>
            <p className={styles.sectionLead}>
              Chaque pack est une porte d'entrée vers la solution adaptée à votre projet. Nous ajustons ensuite chaque prestation selon vos besoins exacts.
            </p>
          </div>
          <div className={styles.packagesGrid}>
            {packages.map((pack) => (
              <div key={pack.name} className={styles.packageCard}>
                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{pack.name}</h3>
                  <p className={styles.packageDescription}>{pack.subtitle}</p>
                </div>
                <p className={styles.packageDescription}>{pack.description}</p>
                <Button as="a" href="/contact" variant="solid" size="sm" ariaLabel={`Demander un devis pour ${pack.name}`}>
                  Demander un devis personnalisé
                </Button>
              </div>
            ))}
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

