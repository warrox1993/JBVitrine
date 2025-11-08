"use client";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/Button/Button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import styles from "./page.module.css";

export function ServicesHero() {
  const { ref: heroRef, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });

  return (
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
        <Breadcrumb />

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
  );
}
