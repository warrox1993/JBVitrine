import type { Metadata } from "next";
import Link from "next/link";
import {
  Plus,
  FileText,
  Clock,
  Edit,
  Eye
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { getAllArticles } from "@/lib/blogActions";
import { DeleteArticleButton } from "../DeleteArticleButton";
import { Button } from "@/components/ui/Button/Button";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Administration Blog | Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminBlogPage() {
  const articles = await getAllArticles();
  const t = await getTranslations("common");

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[
        { label: t("breadcrumb.home"), href: "/" },
        { label: 'Admin', href: '/admin' },
        { label: 'Blog' }
      ]} />

      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Gestion du Blog</h1>
          <p className={styles.subtitle}>
            {articles.length} article{articles.length > 1 ? "s" : ""} publié
            {articles.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <Button
          as="a"
          href="/admin/blog/new"
          variant="solid"
          size="md"
          ariaLabel="Créer un nouvel article"
        >
          <Plus size={18} style={{ marginRight: '8px' }} />
          Nouvel Article
        </Button>
      </div>

      <div className={styles.articlesSection}>
        {articles.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.statIcon} style={{ width: '64px', height: '64px' }}>
              <FileText size={32} />
            </div>
            <p>Aucun article pour le moment.</p>
            <Button
              as="a"
              href="/admin/blog/new"
              variant="solid"
              size="md"
              ariaLabel="Créer votre premier article"
            >
              Créer votre premier article
            </Button>
          </div>
        ) : (
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <div key={article.slug} className={styles.articleCard}>
                <div className={styles.articleHeader}>
                  <span className={styles.category}>{article.category}</span>
                  <span className={styles.date}>
                    {new Date(article.publishedAt).toLocaleDateString("fr-BE", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>

                <h3 className={styles.articleTitle}>{article.title}</h3>

                <p className={styles.articleExcerpt}>{article.excerpt}</p>

                <div className={styles.articleFooter}>
                  <div className={styles.articleMeta}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                  <div className={styles.articleActions}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className={styles.actionButton}
                      title="Voir sur le site"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/blog/edit/${article.slug}`}
                      className={`${styles.actionButton} ${styles.edit}`}
                      title="Modifier"
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteArticleButton slug={article.slug} title={article.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
