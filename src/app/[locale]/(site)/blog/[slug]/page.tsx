import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Icon } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { ArticleCard } from "@/components/shared/ArticleCard/ArticleCard";
import { CTABox } from "@/components/shared/CTABox/CTABox";
import { ArticleCoverSvg } from "@/components/features/blog/ArticleCoverSvg";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { SectionRail } from "@/components/ui/SectionRail/SectionRail";
import { getAllArticles, getArticleBySlug, type BlogArticle } from "@/lib/blogActions";
import { markdownToHtml, stripLeadingH1 } from "@/lib/markdown";
import { jsonLdSafe } from "@/lib/security/escape";
import { authorSchema } from "@/lib/author-schema";
import { siteUrl } from "@/config/site";
import cardStyles from "@/components/shared/ArticleCard/ArticleCard.module.css";
import styles from "./page.module.css";

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

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: t("article.metaNotFound"),
    };
  }

  return {
    title: t("article.metaTitle", { title: article.title }),
    description: article.excerpt,
alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      siteName: "Smidjan",
      images: [
        {
          url: `${siteUrl}/og-image.webp`,
          width: 1200,
          height: 630,
          alt: article.title,
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
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  // Nom accessible du rail : partage par toutes les pages, et traduit — la
  // valeur par defaut du composant etait une chaine francaise en dur.
  const tA11y = await getTranslations("common.a11y");
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
            image: `${siteUrl}/og-image.webp`,
            datePublished: article.publishedAt,
            // Reflect the real last revision. Copying publishedAt here meant a
            // rewritten article kept advertising its original date, so crawlers
            // had no signal to come back and re-read it.
            dateModified: article.updatedAt ?? article.publishedAt,
            // A named PERSON, not an Organization. The legal pages state that
            // "Smidjan" is the pseudonym of a natural person, and Google's
            // author signals (E-E-A-T) attach to people, not brands. The shared
            // @id consolidates this node with the ones on /cv and /agence
            // instead of creating three unrelated entities.
            author: authorSchema,
            publisher: {
              "@type": "Organization",
              name: "Smidjan",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/images/logoheader/logo-200.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteUrl}/blog/${slug}`,
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
                name: t("breadcrumb.home"),
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t("breadcrumb.journal"),
                item: `${siteUrl}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `${siteUrl}/blog/${slug}`,
              },
            ],
          }),
        }}
      />

      {/* Même repère de lecture que sur l'accueil : les sections viennent du
          sommaire de l'article, dont les identifiants sont exactement les
          ancres posées sur les <h2> par le rendu markdown. */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <SectionRail
          // Nom DIFFÉRENT de celui du sommaire en ligne plus bas : les deux
          // portaient « Sommaire de l'article », donc un lecteur d'écran
          // affichait deux repères de navigation indistinguables.
          ariaLabel={tA11y("sectionRail")}
          items={article.tableOfContents.map((entry) => ({
            id: entry.id,
            label: entry.title,
          }))}
        />
      )}

      <div className={styles.breadcrumbBar}>
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.journal"), href: "/blog" },
              { label: article.title },
            ]}
          />
        </div>
      </div>

      <header className={styles.articleHead}>
        <Reveal priority>
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
                {t("article.readTimeSuffix", { time: article.readTime })}
              </span>
            </div>
          </div>
        </Reveal>
      </header>

      <Reveal priority>
        <div className={`wrap ${styles.narrow}`}>
          {article.coverImage ? (
            <figure className={styles.heroPhoto}>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 760px) 100vw, 760px"
                priority
              />
              <div className={styles.heroPhotoOverlay} aria-hidden="true" />
            </figure>
          ) : (
            <figure className={styles.heroArt} aria-hidden="true">
              <ArticleCoverSvg category={article.category} size={120} tone="dark" />
            </figure>
          )}
        </div>
      </Reveal>

      <section className={styles.articleSection}>
        {/* `priority` : ce bloc porte le corps de l'article, c'est-à-dire tout le
            contenu utile de la page. Une animation d'entrée le met à `opacity: 0`
            jusqu'à ce que du JS le révèle — le texte disparaît donc au moindre
            grain de sable côté client, et il est exclu du calcul du LCP. Le
            contenu principal ne doit dépendre de rien : il est rendu visible dès
            le HTML serveur. L'animation reste sur les blocs décoratifs. */}
        <Reveal priority>
          <div className={`wrap ${styles.narrow}`}>
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <nav className={styles.toc} aria-label={t("article.tocAriaLabel")}>
                <div className={styles.tocLabel}>{t("article.tocLabel")}</div>
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
                // stripLeadingH1 : le markdown répète le titre de l'article en
                // tête de corps, alors que la page le rend déjà dans son <h1>.
                __html: markdownToHtml(stripLeadingH1(article.content || "")),
              }}
            />

            {/* Navigation between articles */}
            {(previousArticle || nextArticle) && (
              <nav className={styles.articleNavigation} aria-label={t("article.navAriaLabel")}>
                {previousArticle && (
                  <Link
                    href={`/blog/${previousArticle.slug}`}
                    className={`${styles.navLink} ${styles.navPrevious}`}
                  >
                    <span className={styles.navLabel}>← {t("article.navPrevious")}</span>
                    <span className={styles.navTitle}>{previousArticle.title}</span>
                  </Link>
                )}
                {nextArticle && (
                  <Link
                    href={`/blog/${nextArticle.slug}`}
                    className={`${styles.navLink} ${styles.navNext}`}
                  >
                    <span className={styles.navLabel}>{t("article.navNext")} →</span>
                    <span className={styles.navTitle}>{nextArticle.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </Reveal>
      </section>

      <Reveal>
        <CTABox
          title={t("article.cta.title")}
          text={t("article.cta.text")}
          actions={[{ label: t("article.cta.action"), href: "/contact" }]}
          reassurances={[t("cta.reassuranceNoCommitment"), t("cta.reassurance24h")]}
        />
      </Reveal>

      <Reveal>
        <div className={`wrap ${styles.narrow}`}>
          <div className={styles.authorCard}>
            <div className={styles.avatar}>{authorInitials}</div>
            <div>
              <h2 className={styles.authorKicker}>{t("article.authorKicker")}</h2>
              <div className={styles.authorName}>{authorSchema.name}</div>
              <div className={styles.authorRole}>{authorSchema.jobTitle}</div>
              <p className={styles.authorBio}>{authorSchema.description}</p>
            </div>
          </div>
        </div>
      </Reveal>

      {relatedArticles.length > 0 && (
        <Section variant="tint" className={styles.related}>
          <Reveal>
            <div className={styles.relatedHead}>
              <div className={styles.relatedKicker}>{t("article.relatedKicker")}</div>
              <h2 className={styles.relatedTitle}>{t("article.relatedTitle")}</h2>
            </div>
          </Reveal>
          <Reveal stagger className={styles.relatedGrid}>
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
                  cover={<ArticleCover article={related} />}
                />
              );
            })}
          </Reveal>
        </Section>
      )}
    </article>
  );
}
