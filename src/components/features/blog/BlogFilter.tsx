"use client";

import { useState } from "react";
import type { BlogArticle } from "@/lib/blogActions";
import { ArticleCard } from "@/components/shared";
import { ArticleCoverSvg } from "./ArticleCoverSvg";
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogFilter({ articles }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filteredArticles =
    activeCategory === "Tous"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className={styles.container}>
      {/* Category filter chips */}
      <div
        className={styles.filters}
        role="group"
        aria-label="Filtrer les articles par catégorie"
      >
        {categories.map((category) => {
          const count =
            category === "Tous"
              ? articles.length
              : articles.filter((a) => a.category === category).length;

          if (count === 0 && category !== "Tous") return null;

          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`${styles.chip} ${isActive ? styles.active : ""}`}
              aria-pressed={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Articles grid */}
      <div className={styles.grid}>
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            href={`/blog/${article.slug}`}
            category={article.category}
            excerpt={article.excerpt}
            date={formatDate(article.publishedAt)}
            readingTime={article.readTime}
            cover={<ArticleCoverSvg category={article.category} />}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className={styles.empty}>
          <p>Aucun article dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
