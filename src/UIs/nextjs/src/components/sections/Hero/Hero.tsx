"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

const stats = [
  { value: "150+", label: "Projets livrés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "5x", label: "ROI moyen" },
] as const;

export function Hero() {
  const { ref: heroRef, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });
  return (
    <section id="hero" ref={heroRef} className={`${styles.hero} ${isVisible ? styles.visible : ""}`} aria-labelledby="hero-title">
      <div className={styles.gradientBg} aria-hidden="true" />
      <svg className={styles.pattern} viewBox="0 0 1440 200" fill="none" aria-hidden="true" role="presentation">
        <path d="M0,100 Q360,50 720,100 T1440,100 L1440,200 L0,200 Z" fill="url(#hero-gradient)" />
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
          <h1 id="hero-title" className={styles.title}>Exceptional Design, Flawless Code, Measurable Results</h1>
          <p className={styles.description}>
            We craft premium digital experiences that don’t just look elegant — they perform.
            Our approach blends high-end design systems, scalable engineering, and measurable business outcomes.
            Every pixel, every line of code, every decision is made to grow your brand’s digital impact.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" magnetic aria-label="View our projects">
              View Our Projects
              <ArrowRight size={20} aria-hidden="true" />
            </Button>
            <Button variant="secondary" aria-label="Let’s discuss your vision">
              Let’s Discuss Your Vision
            </Button>
          </div>
          <div className={styles.stats} role="list">
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.stat} style={{ animationDelay: `${0.2 + i * 0.1}s` }} role="listitem">
                <div className={styles.statValue} aria-label={`${stat.value} ${stat.label}`}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


