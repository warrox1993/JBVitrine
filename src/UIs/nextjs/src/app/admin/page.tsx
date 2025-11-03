import { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/blogActions";
import { DeleteArticleButton } from "./DeleteArticleButton";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin Dashboard — Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const articles = await getAllArticles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading level={1} className={styles.title}>
          Admin Dashboard
        </Heading>
        <Button
          as="a"
          href="/admin/articles/new"
          variant="solid"
          size="md"
          ariaLabel="Créer un nouvel article"
        >
          + Nouvel Article
        </Button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{articles.length}</div>
          <div className={styles.statLabel}>Articles publiés</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {articles.filter((a) => a.category === "Développement Web").length}
          </div>
          <div className={styles.statLabel}>Développement Web</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {articles.filter((a) => a.category === "Cybersécurité").length}
          </div>
          <div className={styles.statLabel}>Cybersécurité</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {articles.filter((a) => a.category === "Automatisation & IA").length}
          </div>
          <div className={styles.statLabel}>Automatisation & IA</div>
        </div>
      </div>

      <div className={styles.articlesSection}>
        <Heading level={2} className={styles.sectionTitle}>
          Tous les articles
        </Heading>

        {articles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aucun article pour le moment.</p>
            <Button
              as="a"
              href="/admin/articles/new"
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
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className={styles.articleTitle}>{article.title}</h3>

                <p className={styles.articleExcerpt}>{article.excerpt}</p>

                <div className={styles.articleMeta}>
                  <span className={styles.readTime}>{article.readTime}</span>
                  <span className={styles.slug}>/{article.slug}</span>
                </div>

                <div className={styles.articleActions}>
                  <Button
                    as="a"
                    href={`/blog/${article.slug}`}
                    variant="outline"
                    size="sm"
                    ariaLabel={`Voir l'article ${article.title}`}
                    target="_blank"
                  >
                    Voir
                  </Button>
                  <Button
                    as="a"
                    href={`/admin/articles/${article.slug}/edit`}
                    variant="solid"
                    size="sm"
                    ariaLabel={`Modifier l'article ${article.title}`}
                  >
                    Modifier
                  </Button>
                  <DeleteArticleButton slug={article.slug} title={article.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Button
          as="a"
          href="/"
          variant="outline"
          size="sm"
          ariaLabel="Retour au site"
        >
          ← Retour au site
        </Button>
      </div>
    </div>
  );
}
