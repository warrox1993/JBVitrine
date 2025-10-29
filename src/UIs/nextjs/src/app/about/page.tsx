import type { Metadata } from 'next';
import HeroAbout from '@/components/about/HeroAbout';
import Mission from './Mission';
import ValuesCards from '@/components/about/ValuesCards';
import Timeline from './Timeline';
import Team from './Team';
import ProcessMini from '@/components/about/ProcessMini';
// Removed per AboutFix5: Proof/Testimonials, FAQ, Contact CTA on About page
import { Footer } from '@/components/sections/Footer/Footer';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'À propos — SMIDJAN',
  description:
    "À propos de SMIDJAN : nous forgeons des expériences digitales élégantes, scalables et mesurables. Notre méthode relie design system, ingénierie et performance web Next.js pour produire des résultats concrets, traçables et durables.",
  alternates: { canonical: '/about' },
};

function BreadcrumbJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'À propos', item: '/about' },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd />
      <div className={styles.aboutPage}>
        {/* HERO (client component) */}
        <HeroAbout />

        {/* IntroSignature section removed per request */}

        {/* MISSION (scoped section component) */}
        <Mission />

        {/* VALUES CARDS (below hero/mission, before timeline/team) */}
        <section id="values" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionContainer}>
            <ValuesCards />
          </div>
        </section>

        {/* STORY (ALTERNANCE) */}
        <section id="story" className={styles.section}>
          <div className={styles.sectionContainer}>
            <Timeline />
          </div>
        </section>

        {/* SplitVisual section removed per request */}

        {/* Values old section removed: replaced by ValuesCards above */}

        {/* TEAM (ALTERNANCE) */}
        <section id="team" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionContainer}>
            <Team />
          </div>
        </section>

        {/* PROCESS MINI */}
        <section id="process-mini" className={styles.section}>
          <div className={styles.sectionContainer}>
            <ProcessMini />
          </div>
        </section>
      </div>

      {/* Removed per AboutFix5: Proof/Testimonials */}
      {/* Removed per AboutFix5: FAQ */}
      {/* Removed per AboutFix5: Contact CTA */}
      <Footer />
    </>
  );
}
