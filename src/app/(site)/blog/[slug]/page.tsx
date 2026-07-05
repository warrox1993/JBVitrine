import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Icon } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { ArticleCard, CTABox } from "@/components/shared";
import { ArticleCoverSvg } from "@/components/features/blog/ArticleCoverSvg";
import { getAllArticles, getArticleBySlug } from "@/lib/blogActions";
import { markdownToHtml } from "@/lib/markdown";
import { jsonLdSafe } from "@/lib/security/escape";
import { authorSchema } from "@/lib/author-schema";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${article.title} | Blog Smidjan`,
    description: article.excerpt,
    keywords: [
      article.category,
      "Belgique",
      "Liège",
      "développement web",
      "guide technique",
    ],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://smidjan.be/blog/${slug}`,
      siteName: "Smidjan",
      images: [
        {
          url: "https://smidjan.be/og-image.webp",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Smidjan"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/og-image.webp"],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("fr-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const authorInitials = authorSchema.givenName
    .split("-")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <article className={styles.article}>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdSafe({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            image: "https://smidjan.be/og-image.webp",
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            author: {
              "@type": "Organization",
              name: "Smidjan",
              url: "https://smidjan.be",
            },
            publisher: {
              "@type": "Organization",
              name: "Smidjan",
              logo: {
                "@type": "ImageObject",
                url: "https://smidjan.be/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://smidjan.be/blog/${slug}`,
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdSafe({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://smidjan.be",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Journal",
                item: "https://smidjan.be/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://smidjan.be/blog/${slug}`,
              },
            ],
          }),
        }}
      />

      <div className={styles.breadcrumbBar}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Journal", href: "/blog" },
              { label: article.title, href: `/blog/${slug}` },
            ]}
          />
        </div>
      </div>

      <header className={styles.articleHead}>
        <div className={`wrap ${styles.narrow}`}>
          <span className={styles.catTag}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.articleMeta}>
            <div className={styles.who}>
              <div className={styles.miniAvatar}>{authorInitials}</div>
              <div>
                <b>{authorSchema.name}</b>
                <span>{authorSchema.jobTitle}</span>
              </div>
            </div>
            <span className={styles.item}>
              <Icon name="calendar" size={16} />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            <span className={styles.item}>
              <Icon name="clock" size={16} />
              {article.readTime} de lecture
            </span>
          </div>
        </div>
      </header>

      <div className={`wrap ${styles.narrow}`}>
        <figure className={styles.heroArt} aria-hidden="true">
          <ArticleCoverSvg category={article.category} size={120} tone="dark" />
        </figure>
      </div>

      <section className={styles.articleSection}>
        <div className={`wrap ${styles.narrow}`}>
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <nav className={styles.toc} aria-label="Sommaire de l'article">
              <div className={styles.tocLabel}>Sommaire</div>
              <ol>
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(article.content || ""),
            }}
          />

          {/* Navigation between articles */}
          {(previousArticle || nextArticle) && (
            <nav className={styles.articleNavigation} aria-label="Navigation entre articles">
              {previousArticle && (
                <Link
                  href={`/blog/${previousArticle.slug}`}
                  className={`${styles.navLink} ${styles.navPrevious}`}
                >
                  <span className={styles.navLabel}>← Article précédent</span>
                  <span className={styles.navTitle}>{previousArticle.title}</span>
                </Link>
              )}
              {nextArticle && (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className={`${styles.navLink} ${styles.navNext}`}
                >
                  <span className={styles.navLabel}>Article suivant →</span>
                  <span className={styles.navTitle}>{nextArticle.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <CTABox
        title="Besoin d'accompagnement ?"
        text="Smidjan vous aide à mettre en place ces solutions pour votre entreprise en Belgique."
        actions={[{ label: "Discutons de votre projet", href: "/contact" }]}
        reassurances={["Sans engagement", "Réponse sous 24 h"]}
      />

      <div className={`wrap ${styles.narrow}`}>
        <div className={styles.authorCard}>
          <div className={styles.avatar}>{authorInitials}</div>
          <div>
            <h2 className={styles.authorKicker}>À propos de l&apos;auteur</h2>
            <div className={styles.authorName}>{authorSchema.name}</div>
            <div className={styles.authorRole}>{authorSchema.jobTitle}</div>
            <p className={styles.authorBio}>{authorSchema.description}</p>
          </div>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <Section variant="tint" className={styles.related}>
          <div className={styles.relatedHead}>
            <div className={styles.relatedKicker}>Pour aller plus loin</div>
            <h2 className={styles.relatedTitle}>Articles liés</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((related) => {
              const relatedDate = new Date(related.publishedAt).toLocaleDateString("fr-BE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <ArticleCard
                  key={related.slug}
                  title={related.title}
                  href={`/blog/${related.slug}`}
                  category={related.category}
                  excerpt={related.excerpt}
                  date={relatedDate}
                  readingTime={related.readTime}
                  cover={<ArticleCoverSvg category={related.category} />}
                />
              );
            })}
          </div>
        </Section>
      )}
    </article>
  );
}
