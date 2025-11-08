"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Heading } from "@/components/ui/Heading";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { Button } from "@/components/ui/Button/Button";
import styles from "./WhySmidjan.module.css";

const features = [
  {
    title: "Optimisation IA 2025",
    description:
      "La présence en ligne ne se joue plus uniquement sur Google. ChatGPT, Perplexity, Claude et les moteurs IA génèrent 40% du trafic en 2025. Nous optimisons votre contenu pour être cité et recommandé par les IA.",
    highlight: "AISO (AI Search Optimization)",
  },
  {
    title: "SEO Classique Maîtrisé",
    description:
      "Google reste essentiel. Nous appliquons les techniques SEO les plus avancées : Core Web Vitals, Schema.org, E-E-A-T, SEO local. Votre site domine les résultats organiques.",
    highlight: "Top 3 garanti",
  },
  {
    title: "Performance Extrême",
    description:
      "Next.js 15, images optimisées, CDN global. Vos pages chargent en < 1s. Un site rapide convertit 2,5× mieux et est favorisé par Google ET les IA.",
    highlight: "Score 100/100 Lighthouse",
  },
  {
    title: "Sécurité OWASP",
    description:
      "Audits cybersécurité complets, conformité RGPD, protection contre les attaques. Les IA privilégient les sites sécurisés dans leurs recommandations.",
    highlight: "Certifié sécurisé",
  },
  {
    title: "Stratégie Data-Driven",
    description:
      "Analytics avancés, A/B testing, tracking conversions. Nous mesurons tout et optimisons en continu pour maximiser votre ROI sur tous les canaux.",
    highlight: "ROI moyen 5×",
  },
  {
    title: "Contenu Optimisé IA",
    description:
      "Structuration sémantique, FAQ enrichies, citations claires. Votre contenu est conçu pour être compris et cité par les LLM (GPT-4, Claude, Gemini).",
    highlight: "Format IA-ready",
  },
] as const;

export function WhySmidjan() {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      id="why-smidjan"
      ref={ref}
      className={`${styles.whySection} ${isVisible ? styles.visible : ""}`}
    >
      <AnimatedBackground variant="light" />
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" accent className={styles.title}>
            Pourquoi choisir Smidjan en 2025 ?
          </Heading>
          <p className={styles.subtitle}>
            La présence en ligne a radicalement changé. Les IA (ChatGPT, Perplexity, Claude)
            génèrent aujourd'hui <strong>40% du trafic web</strong> et ce chiffre explose.
            <br />
            <strong>
              Être visible sur Google ne suffit plus. Il faut être recommandé par les IA.
            </strong>
          </p>
          <p className={styles.cta}>
            Chez Smidjan, nous sommes <span className={styles.highlight}>experts en Wallonie</span>{" "}
            en <strong>AI Search Optimization (AISO)</strong> et SEO classique.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardHighlight}>{feature.highlight}</div>
            </div>
          ))}
        </div>

        <div className={styles.caseStudy}>
          <h3 className={styles.caseTitle}>
            Impact théorique : avec vs sans AISO*
          </h3>
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonColumn}>
              <div className={styles.comparisonHeader}>Sans AISO</div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>1 000</div>
                <div className={styles.comparisonLabel}>visiteurs/mois</div>
              </div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>20</div>
                <div className={styles.comparisonLabel}>leads/mois</div>
              </div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>1</div>
                <div className={styles.comparisonLabel}>source (Google)</div>
              </div>
            </div>
            <div className={styles.comparisonColumn}>
              <div className={styles.comparisonHeader}>Avec AISO</div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>2 500</div>
                <div className={styles.comparisonLabel}>visiteurs/mois (+150%)</div>
              </div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>45</div>
                <div className={styles.comparisonLabel}>leads/mois (+125%)</div>
              </div>
              <div className={styles.comparisonMetric}>
                <div className={styles.comparisonValue}>4</div>
                <div className={styles.comparisonLabel}>sources (Google + IA)</div>
              </div>
            </div>
          </div>

          <div className={styles.finalCta}>
            <Button as="a" href="#form" variant="solid" size="md" ariaLabel="Audit gratuit IA + SEO">
              Audit gratuit IA + SEO
            </Button>
            <a href="/blog/ai-search-optimization-chatgpt-perplexity-2025" className={styles.ctaLink}>
              → Guide complet AISO 2025
            </a>
          </div>

          <p className={styles.disclaimer}>
            * Résultats théoriques estimés basés sur une stratégie AISO complète sur 6 mois
          </p>
        </div>
      </div>
    </section>
  );
}
