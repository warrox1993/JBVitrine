import type { Metadata } from "next";
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllArticles } from "@/lib/blogActions";
import { BlogFilter } from "@/components/features/blog/BlogFilter";
import { FeaturedArticle } from "@/components/features/blog/FeaturedArticle";
import { CTABox } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
alternates: buildAlternates(locale, "/blog"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: "https://smidjan.be/blog",
      siteName: "Smidjan, Cybersécurité Liège",
      images: [
        {
          url: "https://smidjan.be/og-image.webp",
          width: 1200,
          height: 630,
          alt: t("meta.ogImageAlt"),
          type: "image/webp",
        },
      ],
      locale: "fr_BE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
      images: ["/og-image.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const blogArticles = await getAllArticles();
  const [featured] = blogArticles;

  return (
    <div className={styles.pageRoot}>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("breadcrumb.home"),
                item: "https://smidjan.be",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t("breadcrumb.journal"),
                item: "https://smidjan.be/blog",
              },
            ],
          }),
        }}
      />

      {/* Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: t("jsonLd.blogName"),
            description: t("jsonLd.blogDescription"),
            url: "https://smidjan.be/blog",
            publisher: {
              "@type": "Organization",
              name: "Smidjan",
              logo: {
                "@type": "ImageObject",
                url: "https://smidjan.be/images/logoheader/logo-200.png",
              },
            },
            blogPost: blogArticles.map((article) => ({
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.publishedAt,
              url: `https://smidjan.be/blog/${article.slug}`,
              author: {
                "@type": "Organization",
                name: "Smidjan",
              },
            })),
          }),
        }}
      />

      <div className={styles.breadcrumbBar}>
        <div className="wrap">
          <Breadcrumb />
        </div>
      </div>

      <section className={styles.hero}>
        <svg
          className={styles.heroMotif}
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="200" cy="200" r="150" stroke="#d3dae6" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="104" stroke="#e2e7ef" strokeWidth="1.5" />
          <path
            d="M205 96 300 236M300 236 128 264M128 264 205 96M300 236 246 328"
            stroke="#c7d0de"
            strokeWidth="1.4"
          />
          <circle cx="205" cy="96" r="7.5" fill="#fff" stroke="#1c3a63" strokeWidth="1.6" />
          <circle cx="300" cy="236" r="7.5" fill="#fff" stroke="#1c3a63" strokeWidth="1.6" />
          <circle cx="128" cy="264" r="7.5" fill="#fff" stroke="#12294a" strokeWidth="1.6" />
          <circle cx="246" cy="328" r="6" fill="#ff6a00" />
        </svg>
        <Reveal>
          <div className="wrap">
            <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.heroLead}>{t("hero.lead")}</p>
          </div>
        </Reveal>
      </section>

      {featured && (
        <section className={styles.featuredSection}>
          <Reveal>
            <div className="wrap">
              <FeaturedArticle article={featured} />
            </div>
          </Reveal>
        </section>
      )}

      <section className={styles.articlesSection}>
        <div className="wrap">
          <Reveal>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>{t("articles.eyebrow")}</span>
              <h2 className={styles.sectionTitle}>{t("articles.title")}</h2>
            </div>
          </Reveal>

          <BlogFilter articles={blogArticles} />
        </div>
      </section>

      <CTABox
        title={t("cta.title")}
        text={t("cta.text")}
        actions={[{ label: t("cta.action"), href: "/contact" }]}
        reassurances={[t("cta.reassurance24h"), t("cta.reassuranceNoCommitment")]}
      />
    </div>
  );
}
