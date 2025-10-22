"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/Button/Button";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import styles from "./Hero.module.css";

const stats = [
  { value: "150+", label: "Projets livrés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "5x", label: "ROI moyen" },
] as const;

export function Hero() {
  const { ref: heroRef, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });
  // Feature flag: hero stats disabled by default to avoid seams/lines
  const showStats = false;
  return (
    <section id="hero" ref={heroRef} className={`${styles.hero} ${isVisible ? styles.visible : ""}`} aria-labelledby="hero-title">
      <div className={styles.gradientBg} aria-hidden="true" />
      <svg className={styles.decor} viewBox="0 0 1440 200" fill="none" aria-hidden="true" role="presentation" preserveAspectRatio="none">
        <path d="M0,10 Q360,0 720,60 T1440,60 L1440,200 L0,200 Z" fill="url(#hero-gradient)" />
        <defs>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-1)" />
            <stop offset="50%" stopColor="var(--color-accent-2)" />
            <stop offset="100%" stopColor="var(--color-accent-3)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container">
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>Smidjan : agence digitale experte en développement web, cybersécurité et IA.</h1>
          <p className={styles.description}>
            Nous forgeons des expériences digitales sur mesure : sites, applications et automatisations pensées pour la performance, la sécurité et la fiabilité.
              Chez Smidjan, chaque ligne de code et chaque détail de design servent un même but : bâtir un web plus robuste, plus intelligent et durable pour votre entreprise.
          </p>
          <div className={styles.actions}>
            <Button variant="solid" size="md" ariaLabel="Voir nos projets" trailingIcon={<ArrowRightIcon aria-hidden="true" />}> 
              View Our Projects
            </Button>
            <Button variant="outline" size="md" ariaLabel="Lancer votre projet">
              Let’s Discuss Your Vision
            </Button>
            <Button as="a" href="/about" variant="ghost" size="md" ariaLabel="En savoir plus sur nous">
                Découvrir notre méthode
            </Button>
          </div>
          {showStats ? (
            <ul className={styles.stats} role="list" aria-label="Key stats">
              {stats.map((stat, i) => (
                <li key={stat.label} className={styles.stat} style={{ animationDelay: `${0.2 + i * 0.1}s` }} role="listitem">
                  <div className={styles.statValue} aria-label={`${stat.value} ${stat.label}`}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}


