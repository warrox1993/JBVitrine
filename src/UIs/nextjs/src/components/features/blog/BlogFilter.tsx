"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogActions";
import styles from "./BlogFilter.module.css";

interface BlogFilterProps {
  articles: BlogArticle[];
}

const categories = [
  "Tous",
  "Développement Web",
  "Cybersécurité",
  "Automatisation & IA",
  "SEO & Marketing",
] as const;

export function BlogFilter({ articles }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filteredArticles =
    activeCategory === "Tous"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className={styles.container}>
      {/* Category Filter */}
      <div className={styles.filterBar}>
        {categories.map((category) => {
          const count =
            category === "Tous"
              ? articles.length
              : articles.filter((a) => a.category === category).length;

          if (count === 0 && category !== "Tous") return null;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ""
              }`}
            >
              {category}
              <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className={styles.articlesGrid}>
        {filteredArticles.map((article) => (
          <article key={article.slug} className={styles.articleCard}>
            <div className={styles.articleMeta}>
              <span className={styles.articleCategory}>{article.category}</span>
              <span className={styles.articleDate}>
                {new Date(article.publishedAt).toLocaleDateString("fr-BE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2 className={styles.articleTitle}>
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
            <div className={styles.articleFooter}>
              <span className={styles.readTime}>{article.readTime} de lecture</span>
              <Link href={`/blog/${article.slug}`} className={styles.readMore}>
                Lire l'article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className={styles.emptyState}>
          <p>Aucun article dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
