"use client";

import { useState, useEffect, useRef } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import { Footer } from "@/components/sections/Footer/Footer";
import { SectionWithBackground } from "@/components/ui/SectionWithBackground/SectionWithBackground";
import styles from "./page.module.css";

// Helper component for Bagisto links
const BagistoLink = ({ children }: { children: React.ReactNode }) => (
  <a
    href="https://bagisto.com/en/"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.bagistoLink}
  >
    {children}
  </a>
);

// Structured Data
const structuredDataJSON = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SMIDJAN CMS E-commerce | Propulsé par Bagisto",
    description:
      "Solution e-commerce complète développée en Belgique. SMIDJAN CMS propulsé par Bagisto Laravel : marketplaces multi-vendeurs, migrations, performance optimisée.",
    brand: {
      "@type": "Brand",
      name: "SMIDJAN",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://smidjan.be/cms-ecommerce",
      areaServed: {
        "@type": "Country",
        name: "Belgique",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que SMIDJAN CMS propulsé par Bagisto ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SMIDJAN CMS est une solution e-commerce construite sur Bagisto, plateforme Laravel open-source. Nous combinons la puissance de Bagisto avec notre expertise pour livrer des solutions sur mesure en Belgique.",
        },
      },
      {
        "@type": "Question",
        name: "Quel délai pour développer une marketplace multi-vendeurs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVP fonctionnel : 6-8 semaines. Plateforme complète : 12-16 semaines selon complexité et intégrations.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la scalabilité de la solution ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Architecture testée en production : 10K+ vendeurs, millions transactions/jour. Limites = infrastructure cloud, pas plateforme.",
        },
      },
    ],
  },
];

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={styles.animatedCounter}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function HeroSection() {
  return (
    <div className="container">
      <Breadcrumb />
      <div className={styles.heroGrid}>
        {/* Animated background mesh */}
        <div className={styles.heroMesh} aria-hidden="true">
          <div className={styles.meshGradient}></div>
          <div className={styles.meshGradient}></div>
          <div className={styles.meshGradient}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <SparklesIcon aria-hidden="true" />
            <span>SMIDJAN CMS × <BagistoLink>Bagisto</BagistoLink> Partnership</span>
          </div>

          <Heading as="h1" className={styles.heroTitle} id="cms-hero-title">
            Solution E-commerce
            <span className="gradient-title"> Propulsée par <BagistoLink>Bagisto</BagistoLink> </span>
            Développée en Belgique
          </Heading>

          <p className={styles.heroSubtitle}>
            SMIDJAN CMS s'appuie sur <BagistoLink>Bagisto</BagistoLink>, la plateforme Laravel open-source de référence,
            pour vous livrer des solutions e-commerce sur mesure : marketplaces multi-vendeurs,
            migrations, architectures headless. Expertise locale belge + puissance technologique
            internationale.
          </p>

          <div className={styles.heroMetrics}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter end={10} suffix="K+" />
              </div>
              <div className={styles.metricLabel}>Vendeurs supportés</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter end={99} suffix=".9%" />
              </div>
              <div className={styles.metricLabel}>Uptime garanti</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter end={2} suffix="s" prefix="<" />
              </div>
              <div className={styles.metricLabel}>Temps de réponse</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Button
              as="a"
              href="/contact"
              variant="solid"
              size="lg"
              ariaLabel="Demander une consultation gratuite"
              trailingIcon={<ArrowRightIcon aria-hidden="true" />}
            >
              Consultation gratuite
            </Button>
            <Button
              as="a"
              href="#services"
              variant="outline"
              size="lg"
              ariaLabel="Découvrir nos services"
            >
              Découvrir nos services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyPartnership() {
  const advantages = [
    {
      icon: <ShieldCheckIcon aria-hidden="true" />,
      title: <>Puissance Technologique <BagistoLink>Bagisto</BagistoLink></>,
      description: (
        <>
          Architecture Laravel moderne, scalable jusqu'à 10K+ vendeurs. <BagistoLink>Bagisto</BagistoLink> est utilisé par des milliers d'entreprises mondialement pour sa robustesse et sa flexibilité.
        </>
      ),
    },
    {
      icon: <WorkflowIcon aria-hidden="true" />,
      title: "Expertise Locale SMIDJAN",
      description: (
        <>
          Développement, support et accompagnement en Belgique (Liège). Nous maîtrisons <BagistoLink>Bagisto</BagistoLink> de A à Z pour adapter la solution à vos besoins spécifiques belges.
        </>
      ),
    },
    {
      icon: <SparklesIcon aria-hidden="true" />,
      title: "Open-Source + Personnalisation",
      description: (
        <>
          Zéro vendor lock-in grâce à <BagistoLink>Bagisto</BagistoLink> open-source. SMIDJAN personnalise l'architecture pour votre identité unique : vous gardez le contrôle total.
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <div className={styles.sectionHeader}>
        <Heading as="h2" id="partnership-title" className={styles.sectionTitle} accent>
          SMIDJAN × <BagistoLink>Bagisto</BagistoLink> : Le Meilleur des Deux Mondes
        </Heading>
        <p className={styles.sectionLead}>
          Nous combinons la plateforme e-commerce{" "}
          <BagistoLink>Bagisto</BagistoLink>{" "}
          (Laravel) de renommée mondiale avec notre expertise technique belge pour livrer des
          solutions sur mesure performantes.
        </p>
      </div>

      <div className={styles.advantagesGrid}>
        {advantages.map((advantage, idx) => (
          <div key={`advantage-${idx}`} className={styles.advantageCard}>
            <div className={styles.advantageIcon}>{advantage.icon}</div>
            <h3 className={styles.advantageTitle}>{advantage.title}</h3>
            <p className={styles.advantageDescription}>{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustedCompanies() {
  const companies = [
    { name: "ftNFT", logo: "https://innowise.com/wp-content/uploads/2025/05/ftNFT.png" },
    { name: "Sultan", logo: "https://innowise.com/wp-content/uploads/2025/05/Sultan.png" },
    { name: "LG", logo: "https://innowise.com/wp-content/uploads/2025/05/LG.png" },
    { name: "Viveks", logo: "https://innowise.com/wp-content/uploads/2025/05/Viveks.png" },
    { name: "Motherson", logo: "https://innowise.com/wp-content/uploads/2025/05/Motherson.png" },
    { name: "Digikala", logo: "https://innowise.com/wp-content/uploads/2025/05/Digikala.png" },
    { name: "Barkevi", logo: "https://innowise.com/wp-content/uploads/2025/05/Barkevi.png" },
  ];

  return (
    <div className="container">
      <div className={styles.sectionHeader}>
        <Heading as="h2" id="trusted-companies-title" className={styles.sectionTitle} accent>
          <BagistoLink>Bagisto</BagistoLink> powers 25,000+ companies
        </Heading>
        <p className={styles.sectionLead}>
          Des entreprises du monde entier font confiance à <BagistoLink>Bagisto</BagistoLink> pour leurs solutions
          e-commerce. Rejoignez des milliers d'entreprises qui propulsent leur croissance avec
          cette plateforme Laravel open-source.
        </p>
      </div>

      <div className={styles.logosContainer}>
        <div className={styles.logosLane}>
          {/* Première série de logos */}
          <div className={styles.logosPart}>
            {companies.map((company, index) => (
              <img
                key={`company-1-${index}`}
                src={company.logo}
                alt={`${company.name} logo`}
                className={styles.companyLogo}
                loading="lazy"
              />
            ))}
          </div>
          {/* Duplication pour effet de défilement continu */}
          <div className={styles.logosPart}>
            {companies.map((company, index) => (
              <img
                key={`company-2-${index}`}
                src={company.logo}
                alt={`${company.name} logo`}
                className={styles.companyLogo}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      <p className={styles.trustedDescription}>
        <BagistoLink>Bagisto</BagistoLink>{" "}
        est la plateforme e-commerce Laravel de confiance pour des entreprises de toutes tailles
        - des startups aux multinationales.
      </p>
    </div>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Développement E-commerce Custom",
      icon: "https://innowise.com/wp-content/uploads/2024/10/112.svg",
      description: (
        <>
          Solutions <BagistoLink>Bagisto</BagistoLink> sur mesure adaptées à votre business. Modules personnalisés, APIs REST/GraphQL, paiements multi-devises, dashboard analytics. Architecture PSR-12 compliant.
        </>
      ),
      features: [
        <>Modules custom sans modification noyau <BagistoLink>Bagisto</BagistoLink></>,
        "Intégrations Stripe, PayPal, Mollie",
        "CRM intégré + automation marketing",
        "SEO native + rich snippets optimisés",
      ],
    },
    {
      title: "Marketplaces Multi-Vendeurs",
      icon: "https://innowise.com/wp-content/uploads/2025/04/333.png",
      description: (
        <>
          Plateformes B2B/B2C scalables basées sur <BagistoLink>Bagisto</BagistoLink>. Gestion vendeurs complète, commissions automatiques, Stripe Connect. Testées 10K+ vendeurs sans dégradation.
        </>
      ),
      features: [
        "Onboarding vendeurs automatisé + KYC",
        "Commissions tiered flexibles par catégorie",
        "Dashboard vendeur avec analytics temps-réel",
        "Modération contenu + validation produits",
      ],
    },
    {
      title: <>Migration vers <BagistoLink>Bagisto</BagistoLink></>,
      icon: "https://innowise.com/wp-content/uploads/2025/05/357.svg",
      description: (
        <>
          Migration zero-downtime depuis Shopify, Magento, WooCommerce vers <BagistoLink>Bagisto</BagistoLink>. ETL custom pour 100K+ produits, déploiement blue-green, downtime &lt; 2h.
        </>
      ),
      features: [
        "Transfert complet données + historique",
        "Data validation automatique",
        "Tests regression complets",
        "Support 24/7 pendant migration",
      ],
    },
    {
      title: "Optimisation Performance",
      icon: "https://innowise.com/wp-content/uploads/2024/11/224.svg",
      description: (
        <>
          Core Web Vitals A garanti sur <BagistoLink>Bagisto</BagistoLink>. MySQL indexing avancé, Redis caching, Elasticsearch, CDN, PHP-FPM tuning. Load testing 10K users simultanés.
        </>
      ),
      features: [
        "LCP < 2.5s, FID < 100ms garantis",
        "Redis + Elasticsearch configurés",
        "Load testing pré-production",
        "Monitoring New Relic 24/7",
      ],
    },
    {
      title: "Intégrations & Automatisations",
      icon: "https://innowise.com/wp-content/uploads/2024/12/145-1.svg",
      description: (
        <>
          Connexion <BagistoLink>Bagisto</BagistoLink> à votre stack business : ERP, CRM, shipping, marketing. Workflows n8n : facturation auto, rappels panier, sync inventory temps-réel.
        </>
      ),
      features: [
        "ERP: SAP, NetSuite, Odoo, Sage",
        "CRM: Salesforce, HubSpot, Pipedrive",
        "Shipping: DHL, UPS, FedEx, Bpost",
        "Workflows n8n sur mesure",
      ],
    },
    {
      title: "Support & Maintenance",
      icon: "https://innowise.com/wp-content/uploads/2025/04/337.png",
      description: (
        <>
          Support technique <BagistoLink>Bagisto</BagistoLink> long-terme. SLA 99.9% uptime, bug fixes réactifs (P1 &lt; 2h), sécurité patches Laravel, monitoring continu, backups automatiques.
        </>
      ),
      features: [
        "SLA 99.9% uptime contractuel",
        "Intervention P1 < 2h, P2 < 4h",
        "Patches sécurité Laravel rapides",
        "Backups quotidiens + disaster recovery",
      ],
    },
  ];

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="services-title" className={styles.sectionTitle} accent>
            Nos Services <BagistoLink>Bagisto</BagistoLink> E-commerce
          </Heading>
          <p className={styles.sectionLead}>
            SMIDJAN maîtrise l'écosystème <BagistoLink>Bagisto</BagistoLink>-Laravel pour livrer des solutions
            e-commerce production-ready. Architecture moderne, tests QA, support long-terme.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <article key={`service-${index}`} className={styles.serviceCard}>
              <img
                src={service.icon}
                alt=""
                className={styles.serviceIcon}
                loading="lazy"
              />
              <div className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</div>

              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>

              <ul className={styles.serviceFeatures} role="list">
                {service.features.map((feature, idx) => (
                  <li key={`service-${index}-feature-${idx}`}>
                    <CheckIcon aria-hidden="true" />
                    <span>{feature}</span>
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

function CaseStudies() {
  const cases = [
    {
      title: "Marketplace B2B Fibre Optique",
      sector: "B2B Infrastructure",
      challenge:
        "Centraliser 500 vendeurs fibre optique avec pricing tiers complexe et gestion commissions automatisée",
      solution: (
        <>
          <BagistoLink>Bagisto</BagistoLink> multi-vendor customisé par SMIDJAN : commission engine sur mesure, Stripe Connect split payments, API ERP synchronisation stock
        </>
      ),
      metrics: [
        { label: "Vendeurs actifs", value: "500", suffix: "+" },
        { label: "SKUs catalogue", value: "50", suffix: "K+" },
        { label: "Uptime", value: "99.9", suffix: "%" },
        { label: "Response time", value: "200", suffix: "ms" },
      ],
      results: [
        "+150% GMV année 1 vs objectif initial",
        "-40% coûts opération vs ancien setup Magento",
        "99.9% uptime SLA respecté",
      ],
    },
    {
      title: <>Migration Shopify → <BagistoLink>Bagisto</BagistoLink></>,
      sector: "E-commerce Retail",
      challenge:
        "Migrer 100K produits, 50K clients depuis Shopify. Réduire fees 2.9% et reprendre contrôle architecture",
      solution:
        "ETL custom SMIDJAN, blue-green deployment orchestré, migration < 2h downtime, tests regression complets",
      metrics: [
        { label: "Produits migrés", value: "100", suffix: "K" },
        { label: "Clients transférés", value: "50", suffix: "K" },
        { label: "Downtime total", value: "2", suffix: "h" },
        { label: "ROI atteint en", value: "8", suffix: " mois" },
      ],
      results: [
        "LCP: 3.2s → 1.8s (+43% conversions)",
        "-55% fees mensuels vs Shopify",
        "Ownership code = 0% vendor dependency",
      ],
    },
    {
      title: "Headless Commerce Next.js",
      sector: "Fashion Premium",
      challenge: (
        <>
          Storefront ultra-moderne Next.js 14 découplée de backend <BagistoLink>Bagisto</BagistoLink> pour UX premium mobile-first
        </>
      ),
      solution: (
        <>
          Backend <BagistoLink>Bagisto</BagistoLink> API (REST + GraphQL), Frontend Next.js 14 PWA par SMIDJAN, SSR + ISR, 100 Lighthouse mobile
        </>
      ),
      metrics: [
        { label: "Lighthouse score", value: "100", suffix: "" },
        { label: "Conversion mobile", value: "42", suffix: "%+" },
        { label: "PWA installs", value: "15", suffix: "K+" },
        { label: "LCP mobile", value: "1.9", suffix: "s" },
      ],
      results: [
        "Core Web Vitals A (LCP 1.9s, CLS 0.05)",
        "+42% mobile conversion rate YoY",
        "15K+ installations PWA première année",
      ],
    },
  ];

  return (
    <section id="case-studies" className={styles.section} aria-labelledby="cases-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cases-title" className={styles.sectionTitle} accent>
            Cas de Succès — <BagistoLink>Bagisto</BagistoLink> en Production
          </Heading>
          <p className={styles.sectionLead}>
            3 exemples concrets de projets <BagistoLink>Bagisto</BagistoLink> livrés par SMIDJAN en production
          </p>
        </div>

        <div className={styles.casesGrid}>
          {cases.map((caseStudy, index) => (
            <article key={`case-${index}`} className={styles.caseCard}>
              <div className={styles.caseBadge}>{caseStudy.sector}</div>
              <h3 className={styles.caseTitle}>{caseStudy.title}</h3>

              <div className={styles.caseSection}>
                <h4>Défi</h4>
                <p>{caseStudy.challenge}</p>
              </div>

              <div className={styles.caseSection}>
                <h4>Solution SMIDJAN</h4>
                <p>{caseStudy.solution}</p>
              </div>

              <div className={styles.caseMetrics}>
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className={styles.caseMetric}>
                    <div className={styles.caseMetricValue}>
                      <AnimatedCounter end={parseInt(metric.value)} suffix={metric.suffix} />
                    </div>
                    <div className={styles.caseMetricLabel}>{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.caseResults}>
                <h4>Résultats</h4>
                <ul>
                  {caseStudy.results.map((result) => (
                    <li key={result}>
                      <CheckIcon aria-hidden="true" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalAdvantages() {
  const advantages = [
    {
      feature: "Architecture Laravel Moderne",
      detail: (
        <>
          <BagistoLink>Bagisto</BagistoLink> suit les standards PSR-12, SOLID principles. Code patterns propres, extensibilité via modules système sans modification noyau.
        </>
      ),
    },
    {
      feature: "Scalabilité Éprouvée",
      detail:
        "MySQL 8.0 partitioning, Redis sub-ms caching, Elasticsearch full-text. Architecture testée 10K+ vendeurs, millions tx/jour.",
    },
    {
      feature: "Headless Commerce API-First",
      detail:
        "GraphQL + REST endpoints versionnés. Découplage front/back complet. Frontend libre : Next.js, Vue.js, Flutter, custom.",
    },
    {
      feature: "Sécurité PCI DSS",
      detail:
        "Tokenization paiements, encryption end-to-end. Protections CSRF/XSS/SQLi natives Laravel. Audits réguliers.",
    },
    {
      feature: "DevOps CI/CD Moderne",
      detail:
        "GitHub Actions automation, Docker containerization, AWS/Azure deployment. Zero-downtime releases, rollback instant.",
    },
    {
      feature: "Ownership Code Complet",
      detail: (
        <>
          <BagistoLink>Bagisto</BagistoLink> = open-source pur. Code vous appartient, déployable anywhere. Zéro vendor lock-in vs Shopify/Magento propriétaires.
        </>
      ),
    },
  ];

  return (
    <section id="advantages" className={styles.section} aria-labelledby="advantages-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="advantages-title" className={styles.sectionTitle} accent>
            Avantages Techniques <BagistoLink>Bagisto</BagistoLink>
          </Heading>
          <p className={styles.sectionLead}>
            Pourquoi <BagistoLink>Bagisto</BagistoLink> + SMIDJAN = solution e-commerce moderne et pérenne
          </p>
        </div>

        <div className={styles.advantagesTable}>
          {advantages.map((advantage) => (
            <div key={advantage.feature} className={styles.advantageRow}>
              <h3 className={styles.advantageFeature}>{advantage.feature}</h3>
              <p className={styles.advantageDetail}>{advantage.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      question: <>Qu'est-ce que SMIDJAN CMS propulsé par <BagistoLink>Bagisto</BagistoLink> ?</>,
      answer: (
        <>
          SMIDJAN CMS est construit sur <BagistoLink>Bagisto</BagistoLink>, la plateforme e-commerce Laravel open-source de référence. Nous combinons la puissance technologique de <BagistoLink>Bagisto</BagistoLink> (utilisée par des milliers d'entreprises mondialement) avec notre expertise locale belge pour livrer des solutions sur mesure : marketplaces, migrations, headless commerce.
        </>
      ),
    },
    {
      question: <>Quel délai pour développer une marketplace <BagistoLink>Bagisto</BagistoLink> multi-vendeurs ?</>,
      answer:
        "MVP fonctionnel (onboarding vendeur, catalogue, checkout) : 6-8 semaines. Plateforme complète (commissions tiered, analytics vendeur, intégrations) : 12-16 semaines. Délai dépend de la complexité métier et volume d'intégrations tierces.",
    },
    {
      question: <>Quelle est la scalabilité maximale de <BagistoLink>Bagisto</BagistoLink> ?</>,
      answer: (
        <>
          Architecture <BagistoLink>Bagisto</BagistoLink> testée en production : 10K+ vendeurs simultanés, millions de transactions/jour, 100M+ produits catalogue. Limites = infrastructure cloud choisie, pas la plateforme. Avec Kubernetes + Aurora DB auto-scaling, potentiel pratiquement illimité.
        </>
      ),
    },
    {
      question: <>Comment réduire les coûts avec <BagistoLink>Bagisto</BagistoLink> vs Shopify/Magento ?</>,
      answer: (
        <>
          Shopify = 2.9% + 0.30€/transaction + subscription 300-2000€/mois. Magento = maintenance 50-100K€/an. <BagistoLink>Bagisto</BagistoLink> SMIDJAN = développement one-time (10-50K€) + infra (100-500€/mois) + support optionnel. ROI &lt; 6-12 mois. Pour volumes 100K€+/mois : économies exponentielles.
        </>
      ),
    },
    {
      question: "Quel support post-lancement proposez-vous ?",
      answer:
        "Support inclus 4 semaines post-launch : bug fixes réactifs (P1 < 2h, P2 < 4h), patches sécurité Laravel, optimisations performance. Support continu optionnel : forfait maintenance 30h/mois, SLA 99.9% uptime contractuel, monitoring 24/7 New Relic, backups automatiques.",
    },
    {
      question: <>Quel est le risque vendor lock-in avec <BagistoLink>Bagisto</BagistoLink> ?</>,
      answer: (
        <>
          ZÉRO risque. <BagistoLink>Bagisto</BagistoLink> = Laravel open-source 100%. Code vous appartient totalement, déployable anywhere (AWS, Azure, on-premise). Modifiable sans permission, contributeur communauté optionnel. Contrairement Shopify/Magento propriétaires : pas de licensing fees croissants, pas de dépendances structurelles, migration facile si nécessaire.
        </>
      ),
    },
  ];

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="faq-title" className={styles.sectionTitle} accent>
            Questions Fréquentes
          </Heading>
        </div>

        <div className={styles.faqList} role="list">
          {faqs.map((item, index) => (
            <details
              key={`faq-${index}`}
              className={styles.faqItem}
              open={openIndex === index}
              onClick={() => setOpenIndex(index)}
            >
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

function FinalCTA() {
  return (
    <section id="final-cta" className={styles.finalCtaSection} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.finalCtaContent}>
          <Heading as="h2" id="cta-title" className={styles.finalCtaTitle}>
            Lancez Votre Projet E-commerce avec <BagistoLink>Bagisto</BagistoLink>
          </Heading>
          <p className={styles.finalCtaText}>
            SMIDJAN vous accompagne dans votre transformation e-commerce avec <BagistoLink>Bagisto</BagistoLink>. De la
            conception à la mise en ligne, bénéficiez d'une expertise technique locale en
            Belgique (Liège, Bruxelles, Wallonie) et de la puissance d'une plateforme mondiale.
          </p>

          <div className={styles.finalCtaActions}>
            <Button
              as="a"
              href="/contact"
              variant="solid"
              size="lg"
              ariaLabel="Demander une consultation gratuite"
              trailingIcon={<ArrowRightIcon aria-hidden="true" />}
            >
              Consultation gratuite
            </Button>
            <Button
              as="a"
              href="tel:+32475205562"
              variant="outline"
              size="lg"
              ariaLabel="Appelez-nous directement"
            >
              +32 475 20 55 62
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CmsEcommercePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataJSON).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.pageRoot}>
        <SectionWithBackground
          id="cms-hero"
          className={`${styles.section} ${styles.heroSection}`}
          variant="dark"
          ariaLabel="Section hero CMS E-commerce"
        >
          <HeroSection />
        </SectionWithBackground>

        <SectionWithBackground
          id="partnership"
          className={styles.section}
          variant="light"
          ariaLabel="Partenariat SMIDJAN Bagisto"
        >
          <WhyPartnership />
        </SectionWithBackground>

        <SectionWithBackground
          id="trusted-companies"
          className={styles.section}
          variant="dark"
          ariaLabel="Entreprises utilisant Bagisto"
        >
          <TrustedCompanies />
        </SectionWithBackground>

        <SectionWithBackground
          id="services"
          className={styles.section}
          variant="light"
          ariaLabel="Services Bagisto"
        >
          <ServicesSection />
        </SectionWithBackground>

        <SectionWithBackground
          id="cases"
          className={styles.section}
          variant="light"
          ariaLabel="Cas de succès"
        >
          <CaseStudies />
        </SectionWithBackground>

        <SectionWithBackground
          id="technical"
          className={styles.section}
          variant="dark"
          ariaLabel="Avantages techniques"
        >
          <TechnicalAdvantages />
        </SectionWithBackground>

        <SectionWithBackground
          id="faq-section"
          className={styles.section}
          variant="light"
          ariaLabel="Questions fréquentes"
        >
          <FAQSection />
        </SectionWithBackground>

        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
