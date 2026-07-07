"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { BlogArticle } from "@/lib/blogActions";
import { ArticleCard } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { ArticleCoverSvg } from "./ArticleCoverSvg";
import cardStyles from "@/components/shared/ArticleCard/ArticleCard.module.css";
import styles from "./BlogFilter.module.css";

/** Real photo cover when set on the article, else the themed SVG fallback. */
function ArticleCover({ article }: { article: BlogArticle }) {
  if (article.coverImage) {
    return (
      <div className={cardStyles.coverPhoto}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }
  return <ArticleCoverSvg category={article.category} />;
}

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
  const t = useTranslations("blog");
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
        aria-label={t("filter.ariaLabel")}
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
              {category === "Tous" ? t("filter.all") : category}
            </button>
          );
        })}
      </div>

      {/* Articles grid */}
      <Reveal stagger className={styles.grid}>
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            href={`/blog/${article.slug}`}
            category={article.category}
            excerpt={article.excerpt}
            date={formatDate(article.publishedAt)}
            readingTime={article.readTime}
            cover={<ArticleCover article={article} />}
          />
        ))}
      </Reveal>

      {filteredArticles.length === 0 && (
        <div className={styles.empty}>
          <p>{t("filter.empty")}</p>
        </div>
      )}
    </div>
  );
}
