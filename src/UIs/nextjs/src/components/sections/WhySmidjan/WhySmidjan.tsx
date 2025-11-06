"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Heading } from "@/components/ui/Heading";
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
            Smidjan est la <span className={styles.highlight}>seule agence en Wallonie</span>{" "}
            à maîtriser l'<strong>AI Search Optimization (AISO)</strong> ET le SEO classique.
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

        <div className={styles.proof}>
          <div className={styles.proofItem}>
            <div className={styles.proofValue}>92%</div>
            <div className={styles.proofLabel}>
              de nos clients sont cités par ChatGPT
            </div>
          </div>
          <div className={styles.proofItem}>
            <div className={styles.proofValue}>Top 3</div>
            <div className={styles.proofLabel}>
              Position moyenne Google après 60 jours
            </div>
          </div>
          <div className={styles.proofItem}>
            <div className={styles.proofValue}>100/100</div>
            <div className={styles.proofLabel}>Score Lighthouse moyen clients</div>
          </div>
        </div>

        <div className={styles.caseStudy}>
          <h3 className={styles.caseTitle}>
            Cas concret : PME liégeoise (e-commerce)
          </h3>
          <div className={styles.caseGrid}>
            <div className={styles.caseMetric}>
              <div className={styles.caseLabel}>Trafic IA (ChatGPT + Perplexity)</div>
              <div className={styles.caseValue}>+340%</div>
              <div className={styles.casePeriod}>en 90 jours</div>
            </div>
            <div className={styles.caseMetric}>
              <div className={styles.caseLabel}>Trafic Google organique</div>
              <div className={styles.caseValue}>+180%</div>
              <div className={styles.casePeriod}>en 90 jours</div>
            </div>
            <div className={styles.caseMetric}>
              <div className={styles.caseLabel}>Conversions totales</div>
              <div className={styles.caseValue}>+250%</div>
              <div className={styles.casePeriod}>en 90 jours</div>
            </div>
          </div>
          <p className={styles.caseFootnote}>
            Résultat obtenu grâce à notre approche hybride AISO + SEO + Performance
          </p>
        </div>

        <div className={styles.finalCta}>
          <p className={styles.finalText}>
            <strong>Ne restez pas invisible sur les IA.</strong> Vos concurrents s'y préparent déjà.
          </p>
          <a href="#form" className={styles.ctaButton}>
            Audit gratuit IA + SEO
          </a>
          <a href="/blog/ai-search-optimization-chatgpt-perplexity-2025" className={styles.ctaLink}>
            → Lire notre guide complet AISO 2025
          </a>
        </div>
      </div>
    </section>
  );
}
