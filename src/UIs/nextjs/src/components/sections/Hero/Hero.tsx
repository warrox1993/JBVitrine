"use client";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
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
      <AnimatedBackground variant="dark" />
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
          <h1 id="hero-title" className={styles.title}>Agence Web Liège : Développement Next.js, Design & Cybersécurité RGPD</h1>
          <p className={styles.description}>
            Basés à Liège, nous transformons les idées ambitieuses des PME wallonnes en plateformes web rapides, sûres et optimisées pour l'ère de l'IA.
          </p>
          <div className={styles.actions}>
            <Button as="a" href="/contact" variant="solid" size="md" ariaLabel="Demander un devis gratuit" trailingIcon={<ArrowRightIcon aria-hidden="true" />}>
              Devis Gratuit
            </Button>
            <Button as="a" href="/cms-ecommerce" variant="outline" size="md" ariaLabel="Voir nos réalisations web">
              Nos Projets
            </Button>
            <Button as="a" href="/about" variant="outline" size="md" ariaLabel="À propos de notre agence web Liège">
              À propos
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


