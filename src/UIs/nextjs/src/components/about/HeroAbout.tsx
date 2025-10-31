"use client";

import { Button } from '@/components/ui/Button/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground/AnimatedBackground';
import heroStyles from '@/components/sections/Hero/Hero.module.css';

/*
  FICHE TECHNIQUE — Hero About (parité Home)
  - Layout: réutilise Hero.module.css (Home) → classes: hero, gradientBg, decor, content, title, description, actions.
  - Fond: dégradé identique au Hero Home via <svg> linearGradient + overlay noise (via Hero.module.css) + lumière radiale top-left.
  - Typo: h1 utilise var(--font-display) + tailles de Home; paragraphe contrainte à ~70ch, line-height ≈ 1.7.
  - Espacements: section rythmée par tokens; container hérite des paddings globaux; compatibilité sidebar (left padding gérée par CSS de Hero.module.css).
  - Motion: apparition douce (fade/translate) déclenchée par IntersectionObserver (hook maison) avec threshold 0.1; réduit via prefers-reduced-motion.
  - Accessibilité: h1 unique; CTA avec aria-labels explicites; décor marqué aria-hidden.
  - Offsets sticky: scroll-margin-top = var(--header-height) pour éviter la collision sous le header.
  - Tokens: couleurs via --color-accent-{1..3}; ombres via --shadow-glow; transitions via --transition-smooth.
*/

export default function HeroAbout() {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });
  return (
    <section
      id="about-hero"
      ref={ref}
      className={`${heroStyles.hero} ${isVisible ? heroStyles.visible : ''}`}
      style={{ scrollMarginTop: 'var(--header-height)' }}
    >
      <AnimatedBackground variant="dark" />
      {/* Subtle top-left light and texture overlay for depth (reuses tokens) */}
      <div className={heroStyles.gradientBg} aria-hidden="true" />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 40% at 0% 0%, rgba(255,106,0,0.12), transparent)', pointerEvents: 'none', zIndex: 0 }} />
      <svg className={heroStyles.decor} viewBox="0 0 1440 200" fill="none" aria-hidden="true" role="presentation" preserveAspectRatio="none">
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
        <div className={heroStyles.content}>
          <h1 className={heroStyles.title}>Des artisans du digital au service de la performance</h1>
          <p className={heroStyles.description} style={{ maxWidth: '70ch', lineHeight: 1.7 }}>
            SMIDJAN accompagne les entreprises à chaque étape de leur transformation numérique — de l'idée à la mise en production.
            Nous forgeons des solutions stables, sécurisées et évolutives, conçues pour produire des résultats mesurables.
          </p>
          <div className={heroStyles.actions}>
            <Button as="a" href="/contact" variant="solid" size="md" ariaLabel="Démarrer un projet">
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
