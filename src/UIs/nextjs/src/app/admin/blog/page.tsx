import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, deleteArticle } from "@/lib/blogActions";
import { Button } from "@/components/ui/Button/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administration Blog | Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminBlogPage() {
  const articles = await getAllArticles();

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <div>
          <h1 className={styles.title}>Gestion des Articles</h1>
          <p className={styles.subtitle}>
            {articles.length} article{articles.length > 1 ? "s" : ""} publié
            {articles.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button
          as="a"
          href="/admin/blog/new"
          variant="solid"
          size="md"
          ariaLabel="Créer un nouvel article"
        >
          + Nouvel article
        </Button>
      </div>

      <div className={styles.articlesTable}>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th>Temps de lecture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.slug}>
                <td>
                  <Link
                    href={`/blog/${article.slug}`}
                    target="_blank"
                    className={styles.articleLink}
                  >
                    {article.title}
                  </Link>
                </td>
                <td>
                  <span className={styles.category}>{article.category}</span>
                </td>
                <td>
                  {new Date(article.publishedAt).toLocaleDateString("fr-BE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>{article.readTime}</td>
                <td>
                  <div className={styles.actions}>
                    <Link
                      href={`/admin/blog/edit/${article.slug}`}
                      className={styles.editButton}
                    >
                      Éditer
                    </Link>
                    <DeleteButton slug={article.slug} title={article.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className={styles.emptyState}>
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
        )}
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Retour au site
        </Link>
      </div>
    </div>
  );
}
