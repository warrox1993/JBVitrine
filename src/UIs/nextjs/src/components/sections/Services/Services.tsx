"use client";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { Heading } from "@/components/ui/Heading";
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
      orderKey: "dev" as const,
    },
    {
      title: "Cybersécurité Web",
      desc: "Sécurisation bout-à-bout des applications et de la chaîne CI/CD.",
      features: [
        "Audit et durcissement des failles web",
        "Surveillance continue et alertes IA",
        "Sécurisation des API et données clients",
        "Conformité RGPD et SOC",
      ],
      price: "Sur devis",
      orderKey: "cyber" as const,
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
      orderKey: "auto" as const,
    },
  ];
  type ServiceOrderKey = (typeof services)[number]["orderKey"];
  const orderClasses: Record<ServiceOrderKey, string> = {
    dev: styles.cardDev,
    cyber: styles.cardCyber,
    auto: styles.cardAuto,
  };
  const ctaTargets: Record<ServiceOrderKey, string> = {
    dev: "/services#developpement-web",
    cyber: "/services#cybersecurite",
    auto: "/services#automatisation-ia",
  };

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" accent className={styles.title}>Services Excellence</Heading>
          <p className={styles.desc}>Trois domaines d'excellence pour bâtir des sites plus rapides, plus sûrs et plus intelligents.</p>
        </div>
        <div className={styles.grid}>
          {services.map((s, i) => (
            <div
              key={i}
              className={[
                styles.card,
                s.featured ? styles.featured : styles.regular,
                orderClasses[s.orderKey],
              ].join(" ")}
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
              <a
                href={ctaTargets[s.orderKey]}
                className={`${styles.cta} ${s.featured ? styles.ctaFeatured : styles.ctaRegular}`}
              >
                Démarrer un projet
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
