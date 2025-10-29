"use client";
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
        "Un CMS modulaire et complet pour produits, services et abonnements, conçu pour grandir avec ton entreprise.",
    },
  ];
  return (
    <section id="projects" className={`${styles.section} ${styles.showreelModule}`}>
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Notre projet phare</h2>
          <p className={styles.description}>
            SMIDJAN CMS est le cœur de notre savoir-faire : une solution e-commerce modulaire, sécurisée et entièrement personnalisable.
            Nous le faisons évoluer en continu pour repousser les limites du design, de la performance et de l’automatisation.
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
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.footnote}>
          D’autres projets seront prochainement présentés. Chaque réalisation SMIDJAN est sélectionnée pour son ambition technique et son impact durable.
        </p>
      </div>
    </section>
  );
}
