import type { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services — Développement Web, Cybersécurité, Automatisation & IA | SMIDJAN",
  description:
    "Des services pensés pour la performance, la sécurité et la scalabilité : développement web sur mesure, cybersécurité (audit, durcissement, monitoring) et automatisation & IA (workflows, n8n, agents).",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Développement Web, Cybersécurité, Automatisation & IA | SMIDJAN",
    description:
      "Des services pensés pour la performance, la sécurité et la scalabilité : développement web sur mesure, cybersécurité (audit, durcissement, monitoring) et automatisation & IA (workflows, n8n, agents).",
    url: "https://smidjan.be/services",
    siteName: "SMIDJAN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Développement Web, Cybersécurité, Automatisation & IA | SMIDJAN",
    description:
      "Des services pensés pour la performance, la sécurité et la scalabilité : développement web sur mesure, cybersécurité (audit, durcissement, monitoring) et automatisation & IA (workflows, n8n, agents).",
  },
};

const servicePillars = [
  {
    id: "developpement-web",
    title: "Développement Web",
    description:
      "Applications et sites sur mesure (Next.js, TypeScript), front découplé et CMS modulaire. Architecture propre, accessible et performante.",
    points: [
      "Next.js, TypeScript, API REST et GraphQL",
      "CMS modulaire (catalogue, contenu, SEO)",
      "Intégrations paiement et facturation UE",
      "Performance et Core Web Vitals",
      "Documentation et transfert de compétences",
    ],
  },
  {
    id: "cybersecurite",
    title: "Cybersécurité Web",
    description:
      "Sécurité intégrée au cycle de vie : audit, durcissement, supervision et réponses rapides.",
    points: [
      "Audit OWASP et revue d’architecture",
      "Durcissement (headers, secrets, auth)",
      "CI/CD sécurisée et scans réguliers",
      "Monitoring, alertes et journaux d’audit",
      "Plan d’action et remédiation pilotée",
    ],
  },
  {
    id: "automatisation-ia",
    title: "Automatisation & IA",
    description:
      "Automatiser les processus métiers : n8n, webhooks et IA pour accélérer le quotidien sans code superflu.",
    points: [
      "Workflows n8n (CRM, facturation, emailing)",
      "Connecteurs ERP, CRM et analytics",
      "IA via API (contenus, tagging, recommandations)",
      "Webhooks sécurisés (signatures, replay)",
      "Tableaux de bord et reporting métiers",
    ],
  },
] as const;

const engagements = [
  {
    title: "Code propre & durable",
    text: "Base technique maintenable, testée et extensible. Chaque livraison inclut revues de code, conventions claires et documentation.",
  },
  {
    title: "Sécurité dès la conception",
    text: "La sécurité est intégrée dès la conception. Politics de secrets, access management et durcissement applicatif systématisés.",
  },
  {
    title: "Accompagnement personnalisé",
    text: "Formation de vos équipes, support direct et conseil stratégique. Nos livrables sont pensés pour être repris en interne.",
  },
  {
    title: "Méthodologie transparente",
    text: "Nous travaillons en cycles courts, avec jalons vérifiables et accès continu aux environnements. Vous savez où en est le projet.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Cadrage",
    description: "Atelier de compréhension métier, définition des priorités et des KPIs. Cahier de charge fonctionnel et technique synthétisé.",
  },
  {
    step: "02",
    title: "Architecture",
    description: "Design technique, sécurité, dataflow, modules et choix d’intégrations. Les décisions sont documentées et validées ensemble.",
  },
  {
    step: "03",
    title: "Implémentation",
    description: "Développement itératif, CI/CD, tests automatisés et supervision. Mise en place des automatisations et suivi de la qualité.",
  },
  {
    step: "04",
    title: "Livraison & suivi",
    description: "Mise en production accompagnée, formation, monitoring et plan d’évolution pour garantir la continuité opérationnelle.",
  },
] as const;

const integrationCategories = [
  {
    title: "DevOps & Observabilité",
    items: ["CI/CD GitHub Actions", "Infrastructure as Code", "Sentry & DataDog", "Alerting et escalade"],
  },
  {
    title: "Qualité & documentation",
    items: ["Tests end-to-end", "Lint/format automatique", "Handbook projet", "Guides d’exploitation"],
  },
  {
    title: "Conformité & sécurité",
    items: ["Traçabilité utilisateurs", "Gestion des secrets", "Accès restreints", "Journalisation complète"],
  },
] as const;

const packages = [
  {
    name: "Pack Build",
    description: "Développement complet d’une plateforme ou d’un produit sur mesure, avec transfert aux équipes internes.",
    points: [
      "Architecture, design system et intégration",
      "CI/CD, tests, observabilité",
      "Support lancement 30 jours",
    ],
  },
  {
    name: "Pack Sécurité",
    description: "Audit, durcissement et supervision continue pour sécuriser vos plateformes web et vos environnements.",
    points: [
      "Audit OWASP complet + recommandations",
      "Durcissement applicatif et infrastructure",
      "Monitoring, alertes et réponse à incident",
    ],
  },
  {
    name: "Pack Automatisation & IA",
    description: "Conception et déploiement de workflows n8n, scripts et intégrations IA autour de vos process métiers.",
    points: [
      "Cartographie de vos processus critiques",
      "Workflows n8n, scripts et alertes",
      "Connexion à vos API d’IA ou modèles internes",
    ],
  },
] as const;

const deliverables = [
  {
    title: "Livrables structurés",
    text: "Roadmap, backlog priorisé, documentation technique, guides d’administration et handover complet.",
  },
  {
    title: "Gouvernance projet",
    text: "Cadence claire : weekly ou biweekly, comité projet, dashboards de suivi et RACI partagé.",
  },
  {
    title: "Support & formation",
    text: "Coaching des équipes, sessions de prise en main et assistance directe pendant la phase de stabilisation.",
  },
] as const;

const techStack = [
  {
    title: "Frontend",
    text: "React, Next.js, TypeScript, Tailwind CSS, state managers modernes et animations optimisées.",
  },
  {
    title: "Backend & API",
    text: "Node.js, Python (Django/FastAPI), GraphQL, PostgreSQL, Redis. API sécurisées et scalables.",
  },
  {
    title: "Cloud & DevOps",
    text: "Infrastructure AWS/Azure, Docker, Kubernetes, Terraform, GitHub Actions, Nginx.",
  },
  {
    title: "Sécurité",
    text: "OWASP, authentification forte, gestion centralisée des secrets, scans SAST/DAST, WAF.",
  },
  {
    title: "Automatisation & IA",
    text: "n8n, webhooks sécurisés, intégration OpenAI/Anthropic, orchestration de tâches et reporting automatisé.",
  },
  {
    title: "Analytics",
    text: "Mixpanel, DataDog, Sentry, Grafana et pipelines de données pour piloter le ROI.",
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
      <section
        id="services-hero"
        className={`${styles.section} ${styles.hero}`}
        aria-labelledby="services-hero-title"
      >
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
            <span className={styles.badge}>Services SMIDJAN</span>
            <h1 id="services-hero-title" className={styles.heroTitle}>
              Des services pensés pour la performance, la sécurité et la scalabilité
            </h1>
            <p className={styles.heroLead}>
              Nous concevons, sécurisons et automatisons des systèmes web qui tiennent dans le temps. Un seul objectif&nbsp;: livrer vite, propre et mesurable, sans complexité inutile.
            </p>
            <div className={styles.heroActions}>
              <Button as="a" href="/contact" variant="solid" size="md" ariaLabel="Démarrer un projet avec SMIDJAN">
                Démarrer un projet
              </Button>
              <Button
                as="a"
                href="/produits/cms-ecommerce"
                variant="outline"
                size="md"
                ariaLabel="Découvrir le CMS SMIDJAN"
              >
                Découvrir le CMS
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services-pillars"
        className={`${styles.section} ${styles.pillars}`}
        aria-labelledby="services-pillars-title"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-pillars-title">
              Nos trois pôles d’excellence
            </Heading>
            <p className={styles.sectionLead}>
              Développement sur mesure, cybersécurité et automatisation : trois expertises qui partagent un même socle méthodologique, technique et humain.
            </p>
          </div>
          <div className={styles.pillarsGrid}>
            {servicePillars.map((pillar) => (
              <div key={pillar.id} id={pillar.id} className={styles.pillarAnchor}>
                <Card className={styles.pillarCard}>
                  <CardHeader className={styles.pillarHeader}>{pillar.title}</CardHeader>
                  <CardBody className={styles.pillarBody}>
                    <p className={styles.pillarDescription}>{pillar.description}</p>
                    <ul className={styles.pillarList}>
                      {pillar.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services-engagements"
        className={`${styles.section} ${styles.engagements}`}
        aria-labelledby="services-engagements-title"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-engagements-title">
              Nos engagements
            </Heading>
            <p className={styles.sectionLead}>
              Des fondations techniques solides, une transparence totale et un accompagnement humain pour créer de la valeur mesurable.
            </p>
          </div>
          <div className={styles.engagementsGrid}>
            {engagements.map((engagement) => (
              <div key={engagement.title} className={styles.engagementCard}>
                <h3 className={styles.engagementTitle}>{engagement.title}</h3>
                <p className={styles.engagementText}>{engagement.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-process" className={`${styles.section} ${styles.sectionSurface}`} aria-labelledby="services-process-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-process-title">
              Un cycle projet clair et documenté
            </Heading>
            <p className={styles.sectionLead}>
              Chaque mission suit un déroulé maîtrisé : cadrage, architecture, implémentation puis livraison et suivi. Vous savez précisément où nous en sommes et ce qui reste à faire.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <div key={step.step} className={styles.processCard}>
                <span className={styles.processStep}>{step.step}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-integrations" className={styles.section} aria-labelledby="services-integrations-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-integrations-title">
              Ce que nous intégrons systématiquement
            </Heading>
            <p className={styles.sectionLead}>
              Nous ne nous limitons pas au code&nbsp;: DevOps, observabilité, sécurité et documentation font partie du package.
            </p>
          </div>
          <div className={styles.integrationsGrid}>
            {integrationCategories.map((category) => (
              <div key={category.title} className={styles.integrationCard}>
                <h3 className={styles.integrationTitle}>{category.title}</h3>
                <ul className={styles.integrationList}>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-packages" className={`${styles.section} ${styles.sectionSurface}`} aria-labelledby="services-packages-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-packages-title">
              Des packs pour aller droit à l’essentiel
            </Heading>
            <p className={styles.sectionLead}>
              Trois offres pour couvrir la construction, la sécurisation et l’automatisation de vos plateformes digitales.
            </p>
          </div>
          <div className={styles.packagesGrid}>
            {packages.map((pack) => (
              <div key={pack.name} className={styles.packageCard}>
                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{pack.name}</h3>
                  <p className={styles.packageDescription}>{pack.description}</p>
                </div>
                <ul className={styles.packageList}>
                  {pack.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Button as="a" href="/contact" variant="solid" size="sm" ariaLabel={`Démarrer le pack ${pack.name}`}>
                  Démarrer ce pack
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-deliverables" className={styles.section} aria-labelledby="services-deliverables-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-deliverables-title">
              Livrables et accompagnement
            </Heading>
            <p className={styles.sectionLead}>
              Nos engagements ne s’arrêtent pas à la mise en production. Nous vous accompagnons dans la durée.
            </p>
          </div>
          <div className={styles.deliverablesGrid}>
            {deliverables.map((deliverable) => (
              <div key={deliverable.title} className={styles.deliverableCard}>
                <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
                <p className={styles.deliverableText}>{deliverable.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-tech" className={`${styles.section} ${styles.sectionSurface}`} aria-labelledby="services-tech-stack">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-tech-stack">
              Notre stack technologique
            </Heading>
            <p className={styles.sectionLead}>
              Nous choisissons des outils éprouvés, performants et maintenus pour garantir la pérennité de vos projets.
            </p>
          </div>
          <div className={styles.techGrid}>
            {techStack.map((category) => (
              <div key={category.title} className={styles.techCard}>
                <h3 className={styles.techTitle}>{category.title}</h3>
                <p className={styles.techText}>{category.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services-cms" className={styles.section} aria-labelledby="services-cms-highlight">
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" accent className={styles.sectionTitle} id="services-cms-highlight">
              SMIDJAN CMS, le socle produit que nous faisons évoluer en continu
            </Heading>
            <p className={styles.sectionLead}>
              Un CMS e-commerce headless, sécurisé et administrable. Nous l’adaptons selon vos besoins métiers tout en garantissant des évolutions continues.
            </p>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonialText}>
              «&nbsp;Grâce à SMIDJAN, nous avons pu lancer notre plateforme e-commerce en six semaines au lieu de six mois. Le CMS est d’une flexibilité incroyable et l’équipe a su s’adapter à nos besoins spécifiques sans compromis sur la qualité.&nbsp;»
            </p>
            <span className={styles.testimonialAuthor}>Marie Dubois — CTO, TechRetail</span>
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
        </div>
      </section>

      <section id="services-contact" className={`${styles.section} ${styles.sectionSurface}`} aria-labelledby="services-final-cta">
        <div className="container">
          <div className={styles.finalCta}>
            <h2 id="services-final-cta" className={styles.finalCtaTitle}>
              Besoin d’un accompagnement sur mesure&nbsp;?
            </h2>
            <p className={styles.finalCtaText}>
              Parlons de votre contexte et de vos contraintes. Nous planifions une session gratuite pour vous conseiller sur la faisabilité, les choix technologiques, la sécurité et la performance.
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
    </div>
  );
}

