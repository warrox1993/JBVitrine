"use client";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import styles from "./Showreel.module.css";

type ProjectCard = {
  title: string;
  tag: string;
  description: string;
};

export function Showreel() {
  const projects: ProjectCard[] = [
    {
      title: "SMIDJAN CMS",
      tag: "E-commerce",
      description:
        "Une base e-commerce modulaire, conçue pour évoluer avec les besoins des marques ambitieuses.",
    },
  ];
  return (
    <section id="projects" className={`${styles.section} ${styles.showreelModule}`}>
      <AnimatedBackground variant="dark" />
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Notre projet phare</h2>
          <p className={styles.description}>
            SMIDJAN CMS incarne notre philosophie : un outil e-commerce modulaire, pensé pour la performance, la sécurité et la liberté totale de création.
          </p>
        </div>
        <div className={styles.grid}>
          {projects.map((project) => {
            return (
              <article key={project.title} className={styles.card}>
                <div className={styles.overlay}>
                  <div className={styles.tag}>{project.tag}</div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <a className={styles.cardCta} href="/produits/cms-ecommerce">
                    Découvrir le projet
                  </a>
                  <p className={styles.reassurance}>
                    Une solution conçue pour repousser les limites du design et de l'automatisation.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.footnote}>
          D'autres projets seront prochainement présentés. Chaque réalisation SMIDJAN est sélectionnée pour son ambition technique et son impact durable.
        </p>
      </div>
    </section>
  );
}
