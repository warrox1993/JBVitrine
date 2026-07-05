import Link from "next/link";
import type { BlogArticle } from "@/lib/blogActions";
import { Icon } from "@/components/ui/Icon/Icon";
import { Button } from "@/components/ui/Button/Button";
import { ArticleCoverSvg } from "./ArticleCoverSvg";
import styles from "./FeaturedArticle.module.css";

export interface FeaturedArticleProps {
  article: BlogArticle;
}

/** "Article à la une" — highlighted first article on the Journal index. */
export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const date = new Date(article.publishedAt).toLocaleDateString("fr-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const href = `/blog/${article.slug}`;

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <span className={styles.flag}>
          <Icon name="book" size={14} />
          Article à la une
        </span>
        <div className={styles.kick}>{article.category}</div>
        <h2 className={styles.title}>
          <Link href={href}>{article.title}</Link>
        </h2>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.meta}>
          <span>
            <Icon name="calendar" size={15} />
            {date}
          </span>
          <span>
            <Icon name="clock" size={15} />
            {article.readTime} de lecture
          </span>
        </div>
        <Button
          as="a"
          href={href}
          variant="navy"
          trailingIcon={<Icon name="arrow-right" size={16} strokeWidth={2.2} />}
        >
          Lire l&apos;article
        </Button>
      </div>
      <div className={styles.visual}>
        <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
        <div className={styles.iconPlate} aria-hidden="true">
          <ArticleCoverSvg category={article.category} size={104} tone="dark" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedArticle;
