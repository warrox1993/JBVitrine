"use client";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import styles from "./Showreel.module.css";

export function Showreel() {
  const projects = [
    { title: "E-commerce Luxury", tag: "Next.js", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { title: "SaaS Dashboard", tag: "React", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { title: "Portfolio Créatif", tag: "WebGL", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { title: "Plateforme Finance", tag: "TypeScript", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { title: "App Mobile Hybrid", tag: "React Native", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { title: "Site Institutionnel", tag: "CMS", gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
  ];
  return (
    <section id="projects" className={`${styles.section} ${styles.showreelModule}`}>
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Projets qui marquent</h2>
          <p className={styles.description}>Chaque projet est une opportunité de repousser les limites du design et de la technique.</p>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} className={styles.card} style={{ background: p.gradient } as any}>
              <div className={styles.overlay}>
                <div className={styles.tag}>{p.tag}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
              </div>
              <div className={styles.hoverIcon}><ArrowRightIcon /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
