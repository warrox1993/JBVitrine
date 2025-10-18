"use client";
import { CheckIcon } from "@/components/icons/CheckIcon";
import styles from "./Services.module.css";

export function Services() {
  const services = [
    {
      title: "Développement Web",
      desc: "Applications performantes avec Next.js, React, TypeScript – UI/UX premium intégré et identité cohérente.",
      features: [
        "Code scalable & performance maximale",
        "Design system & prototypage intégrés",
        "SEO technique & accessibilité",
        "Brand guidelines appliquées",
      ],
      price: "Sur devis",
      featured: true,
    },
    {
      title: "Cybersécurité Web",
      desc: "Sécurisation bout-à-bout des applications et de la chaîne CI/CD.",
      features: [
        "Audit OWASP, durcissement headers & CSP",
        "Auth & gestion secrets, Key Vault / KMS",
        "Tests SAST/DAST, revues de code",
        "Monitoring & réponse aux incidents",
      ],
      price: "Sur devis",
    },
    {
      title: "Automatisation n8n & IA",
      desc: "Workflows sans couture pour gagner du temps et scaler les opérations.",
      features: [
        "Intégrations n8n (CRM, email, facturation)",
        "Agents & assistants IA sur mesure",
        "Scraping légal / reporting automatisé",
        "Observabilité & alertes",
      ],
      price: "Sur devis",
    },
  ];
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Services Excellence</h2>
          <p className={styles.desc}>Tailored digital solutions designed to elevate your brand, secure your infrastructure, and automate your growth.</p>
        </div>
        <div className={`${styles.grid} services-grid`}>
          {services.map((s, i) => (
            <div
              key={i}
              className={`${styles.card} ${s.featured ? styles.featured : styles.regular} service-card ${
                s.title.startsWith('Développement Web') ? 'service-dev' : s.title.startsWith('Cybersécurité') ? 'service-cyber' : 'service-auto'
              }`}
            >
              {s.featured && <div className={styles.badge}>Populaire</div>}
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <ul className={styles.featureList}>
                {s.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}><CheckIcon />{f}</li>
                ))}
              </ul>
              <div className={styles.price}>{s.price}</div>
              <button className={`${styles.cta} ${s.featured ? styles.ctaFeatured : styles.ctaRegular}`}>Démarrer un projet</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
