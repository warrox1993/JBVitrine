import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import { Card, CardBody, CardHeader } from "@/components/atoms/Card";
import { Footer } from "@/components/sections/Footer/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SMIDJAN CMS — La solution e-commerce tout-en-un",
  description:
    "CMS complet et modulaire pour produits, services ou offres hybrides. Performant, sécurisé, personnalisable et prêt à l’emploi.",
  alternates: {
    canonical: "/produits/cms-ecommerce",
    languages: {
      "fr-BE": "/produits/cms-ecommerce",
      fr: "/produits/cms-ecommerce",
    },
  },
  openGraph: {
    title: "SMIDJAN CMS — La solution e-commerce tout-en-un",
    description:
      "Solution e-commerce modulaire pour lancer produits, services ou offres hybrides. Performance, sécurité et personnalisation sans compromis.",
    url: "https://smidjan.be/produits/cms-ecommerce",
    siteName: "SMIDJAN",
    images: [
      {
        url: "https://smidjan.be/logo.png",
        width: 512,
        height: 512,
        alt: "SMIDJAN CMS — La solution e-commerce tout-en-un",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMIDJAN CMS — La solution e-commerce tout-en-un",
    description:
      "CMS e-commerce complet, sécurisé, personnalisable et prêt à l’emploi. Produits, services ou abonnements : vendez sans limite.",
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
    label: "Tout est inclus : catalogue, commandes, paiements, analytics",
    icon: <SparklesIcon aria-hidden="true" />,
  },
  {
    label: "100 % personnalisable, sans thème imposé",
    icon: <TargetIcon aria-hidden="true" />,
  },
  {
    label: "Sécurisé, évolutif et prêt pour la croissance",
    icon: <ShieldCheckIcon aria-hidden="true" />,
  },
  {
    label: "Pensé pour les pros et intégrable à ton écosystème",
    icon: <WorkflowIcon aria-hidden="true" />,
  },
] as const;

const whySmidjanReasons = [
  {
    title: "Base e-commerce robuste",
    description:
      "Un socle back-end unique, stable et sécurisé, utilisé pour tous les projets. Tu gagnes du temps et de la fiabilité sans repartir de zéro à chaque fois.",
  },
  {
    title: "Front ultra-modulable",
    description:
      "Chaque site dispose d’un front entièrement sur mesure : React, Next.js, Tailwind ou Blade. Tu crées exactement l’expérience que tes clients veulent, sans contrainte.",
  },
  {
    title: "Déploiement rapide et accessible",
    description:
      "Le CMS est prêt dès l’installation : produits, paiements et facturation inclus. Lance un e-commerce complet en quelques heures, sans complexité technique.",
  },
  {
    title: "Intégrable à tout écosystème",
    description:
      "Connecte ton CMS à Stripe, n8n, ERP, CRM ou tout autre outil via API. Aucune dépendance, tout reste ouvert et extensible.",
  },
] as const;

const functionalModules = [
  {
    title: "Catalogue & produits",
    items: [
      "Produits simples, configurables, groupés ou téléchargeables",
      "Gestion d’attributs, de variantes, d’options et de packs",
      "Stock multi-entrepôts et inventaire en temps réel",
      "Import/export via CSV ou API",
      "Catégories hiérarchiques avec SEO intégré",
    ],
  },
  {
    title: "Commandes & clients",
    items: [
      "Panier intelligent et tunnel de commande fluide",
      "Commandes, factures, avoirs et retours gérés de bout en bout",
      "Comptes clients, multi-adresses, groupes B2B/B2C",
      "Historique complet et notifications automatiques",
      "Espace client personnalisable avec suivi d’état",
    ],
  },
  {
    title: "Paiement & facturation",
    items: [
      "Stripe, virement ou solution sur mesure",
      "Factures conformes UE générées automatiquement",
      "Taxes, devises et taux de change multiples",
      "Emails de confirmation et relances automatiques",
    ],
  },
  {
    title: "Marketing & promotion",
    items: [
      "Coupons, remises progressives et packs promo",
      "Bannières dynamiques et pages de campagne",
      "Newsletter intégrée et ciblage par segment",
      "Sitemap, meta et rich snippets inclus",
    ],
  },
  {
    title: "Administration & gestion",
    items: [
      "Tableau de bord ventes, commandes, clients, produits",
      "Multi-utilisateurs et rôles ACL avancés",
      "Journalisation des actions et logs d’audit",
      "Configuration paiement, livraison, taxes, langues, emails",
      "Système modulaire prêt pour extensions",
    ],
  },
  {
    title: "Sécurité & performances",
    items: [
      "Auth sécurisée et gestion fine des permissions",
      "Headers de sécurité, protections CSRF, XSS, SQLi",
      "Sauvegardes automatisées et restauration simple",
      "Optimisations Core Web Vitals et cache intelligent",
      "Monitoring intégré et alertes d’anomalies",
    ],
  },
  {
    title: "Design & personnalisation",
    items: [
      "Design 100 % modulable, compatible Tailwind, Bootstrap…",
      "Templates éditables sans toucher au noyau",
      "Gestion avancée thèmes, couleurs, polices, composants",
      "Blocs réutilisables pour construire les pages",
      "Responsive design optimisé nativement",
    ],
  },
  {
    title: "Automatisations & intégrations",
    items: [
      "Workflows n8n prêts : facturation, rappels, CRM, emailing",
      "Connecteurs vers ERP, marketing, analytics",
      "Webhooks et endpoints sécurisés",
      "IA embarquée pour suggestions et analyses (option)",
    ],
  },
] as const;

const showcaseShots = [
  {
    src: "/images/pic01.webp",
    title: "Interface sur mesure",
    description:
      "Chaque interface est imaginée à partir de ton identité visuelle. Structure, interactions et animations sont intégrées directement sans modifier le noyau du CMS.",
  },
  {
    src: "/images/pic02.webp",
    title: "Thèmes flexibles & composants réutilisables",
    description:
      "Sections, formulaires, galeries ou blocs produits restent modulaires. Tu ajustes couleurs, typographies et mises en page librement selon tes besoins.",
  },
  {
    src: "/images/pic03.webp",
    title: "Expériences optimisées",
    description:
      "Les designs sont pensés pour la vitesse, le SEO et la conversion. Chaque front est audité et testé pour garantir performance et accessibilité.",
  },
] as const;

const evolutionCards = [
  {
    title: "Noyau stable et évolutif",
    items: [
      "Même socle back-end pour tous les projets",
      "Sécurité et performances maintenues en continu",
      "Les évolutions globales profitent à tous",
    ],
  },
  {
    title: "Extensions sur mesure",
    items: [
      "Modules dédiés pour logique métier spécifique",
      "Automatisations, reporting ou passerelles métiers",
      "Extensions intégrées sans modifier le noyau",
    ],
  },
  {
    title: "Front libre et découplé",
    items: [
      "Design, framework et UX totalement libres",
      "API prêtes pour connecter toute interface",
      "Une identité unique sur un socle commun",
    ],
  },
] as const;

const faqItems = [
  {
    question: "Quelle est la portée des fonctionnalités incluses ?",
    answer:
      "Le CMS couvre catalogue, commandes, paiements, marketing, analytics et sécurité. Tout est prêt dès l’installation, sans achat d’extensions cachées.",
  },
  {
    question: "Quel est le modèle de prix ?",
    answer:
      "Le tarif est fixe pour tous les projets, transparent et sans surcoûts. Les 40 premières heures de mise en place et d’adaptation sont offertes pour garantir un démarrage solide sans frais additionnels.",
  },
  {
    question: "Puis-je personnaliser l’expérience utilisateur ?",
    answer:
      "Le design system est modulable et découplé du back-end. Tu peux brancher ton front existant (Next.js, React, autre) ou utiliser nos templates comme base.",
  },
  {
    question: "Qui détient le code et les données ?",
    answer:
      "Le code source et le design structurel du CMS restent la propriété exclusive de SMIDJAN. Tu conserves la propriété de tes données, de ton contenu et de ton identité visuelle pour garantir sécurité et compatibilité dans le temps.",
  },
  {
    question: "Le CMS s’intègre-t-il avec mes outils existants ?",
    answer:
      "Oui, via API, webhooks, n8n et connecteurs fournis. Nous accompagnons l’intégration à ton ERP, CRM ou plateforme marketing.",
  },
  {
    question: "Y a-t-il des fonctionnalités d’IA intégrées ?",
    answer:
      "Oui. Le CMS peut se connecter à des API d’IA externes (OpenAI, Anthropic, etc.) pour automatiser des tâches. Une IA intégrée génère déjà des descriptions produits optimisées SEO et le système est prêt pour recommandations, catégorisation ou contenu marketing.",
  },
  {
    question: "Quelle est la politique de sécurité ?",
    answer:
      "SMIDJAN CMS applique les protections OWASP, gère les secrets, renforce les headers et propose des tests SAST/DAST selon ton contexte.",
  },
  {
    question: "Proposez-vous de l’accompagnement ?",
    answer:
      "Oui. Chaque client bénéficie d’un accompagnement complet : cadrage, mise en production, formation et support humain direct, avec documentation et suivi technique.",
  },
] as const;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SMIDJAN CMS — La solution e-commerce tout-en-un",
    description:
      "CMS e-commerce complet, modulaire et personnalisable pour produits, services ou offres hybrides. Sécurité avancée, intégrations et automatisations incluses.",
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
    name: "SMIDJAN CMS — La solution e-commerce tout-en-un",
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
              SMIDJAN CMS — La solution e-commerce tout-en-un
            </Heading>
            <p className={styles.heroSubtitle}>
              SMIDJAN CMS est une solution e-commerce complète et évolutive, prête pour vendre produits physiques, services digitaux ou abonnements récurrents. Chaque module s’adapte à ton activité — sans dépendance à un modèle figé.
            </p>
            <div className={styles.heroActions}>
              <Button
                as="a"
                href="/contact"
                variant="solid"
                size="lg"
                ariaLabel="Demander une démonstration du CMS e-commerce SMIDJAN"
                trailingIcon={<ArrowRightIcon aria-hidden="true" />}
              >
                Demander une démo
              </Button>
              <Button
                as="a"
                href="#cms-modules"
                variant="outline"
                size="lg"
                ariaLabel="Voir les fonctionnalités natives du CMS SMIDJAN"
              >
                Explorer les fonctionnalités
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
              alt="Interface SMIDJAN CMS présentant un catalogue produits et services"
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
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-proofs-title" className={styles.sectionTitle} accent>
            Pourquoi choisir SMIDJAN CMS ?
          </Heading>
          <p className={styles.sectionLead}>
            Un back-end e-commerce commun, un front sur mesure à chaque projet. SMIDJAN CMS sépare la logique métier du design pour offrir des sites uniques, performants et faciles à maintenir.
          </p>
        </div>
        <ul className={styles.proofList} role="list">
          {whySmidjanReasons.map((reason) => (
            <li key={reason.title} className={styles.proofItem}>
              <h3 className={styles.proofTitle}>{reason.title}</h3>
              <p className={styles.proofDescription}>{reason.description}</p>
            </li>
          ))}
        </ul>
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
            Fonctionnalités natives
          </Heading>
          <p className={styles.sectionLead}>
            Tu disposes dès l’installation d’un environnement professionnel prêt à l’emploi pour gérer catalogue, commandes, marketing, sécurité et automatisations.
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

function ShowcaseSection() {
  return (
    <section id="cms-showcase" className={`${styles.section} ${styles.altBackground}`} aria-labelledby="cms-showcase-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="cms-showcase-title" className={styles.sectionTitle} accent>
            Design &amp; personnalisation sur mesure
          </Heading>
          <p className={styles.sectionLead}>
            Chaque projet démarre avec la base solide de SMIDJAN CMS, mais l’interface est créée sur mesure. Charte, expérience, structure : tout est adapté à ton univers.
          </p>
          <p className={styles.sectionSub}>
            Le visuel s’adapte à ton projet, pas l’inverse. SMIDJAN CMS devient le moteur invisible de ton identité digitale.
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

function EvolutionSection() {
  return (
    <section id="evolutivite" className={styles.section} aria-labelledby="evolutivite-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" id="evolutivite-title" className={styles.sectionTitle} accent>
            Un CMS pensé pour évoluer
          </Heading>
          <p className={styles.sectionLead}>
            Le back-end de SMIDJAN CMS reste la base commune de tous les projets : robuste, éprouvé et maintenu en continu. Chaque client s’appuie sur cette architecture solide et peut y ajouter des modules spécifiques selon ses besoins. Le front, lui, reste totalement libre et découplé pour offrir une expérience unique.
          </p>
        </div>
        <div className={styles.evolutionGrid}>
          {evolutionCards.map((card) => (
            <Card key={card.title} className={styles.evolutionCard}>
              <CardHeader className={styles.cardTitle}>{card.title}</CardHeader>
              <CardBody>
                <ul className={styles.evolutionList}>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className={styles.evolutionFooter}>
          <Button
            as="a"
            href="#cms-cta"
            variant="outline"
            size="md"
            ariaLabel="Discuter d’une évolution sur mesure"
            trailingIcon={<ArrowRightIcon aria-hidden="true" />}
          >
            Discuter d’une évolution sur mesure
          </Button>
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
            Prêt à passer à la vitesse supérieure ?
          </Heading>
          <p className={styles.sectionLead}>
            Lance ton e-commerce avec une base solide, performante et totalement maîtrisée. Contacte-nous pour une démonstration ou un accompagnement sur mesure.
          </p>
          <Button
            as="a"
            href="/contact"
            variant="solid"
            size="lg"
            ariaLabel="Contacter SMIDJAN pour adopter le CMS e-commerce"
            trailingIcon={<ArrowRightIcon aria-hidden="true" />}
            className={styles.finalCtaButton}
          >
            Nous contacter
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
        <FunctionalitySection />
        <ShowcaseSection />
        <EvolutionSection />
        <FaqSection />
        <FinalCtaSection />
      </div>
      <Footer />
    </>
  );
}
