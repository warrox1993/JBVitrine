import { Metadata } from "next";
import { 
  FileText, 
  Globe, 
  Shield, 
  Cpu, 
  ExternalLink,
  Users
} from "lucide-react";

import { getAllArticles } from "@/lib/blogActions";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard - Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const articles = await getAllArticles();

  const stats = [
    { label: "Articles publiés", value: articles.length, icon: FileText },
    { label: "Développement Web", value: articles.filter(a => a.category === "Développement Web").length, icon: Globe },
    { label: "Cybersécurité", value: articles.filter(a => a.category === "Cybersécurité").length, icon: Shield },
    { label: "Automatisation & IA", value: articles.filter(a => a.category === "Automatisation & IA").length, icon: Cpu },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Tableau de Bord</h1>
          <p className={styles.subtitle}>Aperçu global et gestion de votre activité digitale</p>
        </div>
      </div>

      <div className={styles.stats}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon size={20} />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.shortcutsGrid}>
        <Link href="/admin/blog" className={styles.shortcutCard}>
          <FileText size={24} />
          <div className={styles.shortcutInfo}>
            <h3>Gérer le Blog</h3>
            <p>Éditer, supprimer ou créer des articles</p>
          </div>
        </Link>
        <Link href="/admin/leads" className={styles.shortcutCard}>
          <Users size={24} />
          <div className={styles.shortcutInfo}>
            <h3>Gérer les Leads</h3>
            <p>Consulter les nouveaux contacts et devis</p>
          </div>
        </Link>
        <Link href="/" target="_blank" rel="noopener noreferrer" className={styles.shortcutCard}>
          <ExternalLink size={24} />
          <div className={styles.shortcutInfo}>
            <h3>Voir le Site</h3>
            <p>Accéder à la version publique</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
