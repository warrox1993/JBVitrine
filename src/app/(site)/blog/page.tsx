import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllArticles } from "@/lib/blogActions";
import { BlogFilter } from "@/components/features/blog/BlogFilter";
import { FeaturedArticle } from "@/components/features/blog/FeaturedArticle";
import { CTABox } from "@/components/shared";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal — Ressources techniques | Smidjan",
  description:
    "Articles techniques sur le développement web, la cybersécurité et l'automatisation IA. Conseils d'experts pour PME en Belgique.",
  keywords: [
    "blog développement web Belgique",
    "cybersécurité Belgique",
    "automatisation IA Wallonie",
    "SEO technique Liège",
    "Next.js Belgique",
    "conseils web PME belges",
    "développement Wallonie",
  ],
  alternates: {
    canonical: "/blog",
    languages: {
      "fr-BE": "/blog",
      fr: "/blog",
    },
  },
  openGraph: {
    title: "Journal — Ressources techniques | Smidjan",
    description:
      "Articles sur le développement web, la cybersécurité et l'IA pour entreprises.",
    url: "https://smidjan.be/blog",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan Blog - Articles techniques pour développeurs et entreprises",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal — Ressources techniques | Smidjan",
    description: "Articles sur le développement web, la cybersécurité et l'IA.",
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

export default async function BlogPage() {
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
                name: "Accueil",
                item: "https://smidjan.be",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Journal",
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
            name: "Journal Smidjan",
            description:
              "Articles techniques sur le développement web, la cybersécurité et l'automatisation IA.",
            url: "https://smidjan.be/blog",
            publisher: {
              "@type": "Organization",
              name: "Smidjan",
              logo: {
                "@type": "ImageObject",
                url: "https://smidjan.be/logo.png",
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
        <div className="wrap">
          <span className={styles.eyebrow}>Journal · Ressources</span>
          <h1 className={styles.heroTitle}>
            Des articles techniques pour sécuriser, développer et faire grandir votre entreprise
          </h1>
          <p className={styles.heroLead}>
            Développement web, cybersécurité et automatisation IA&nbsp;: des articles écrits
            pour être appliqués, pas seulement lus — avec un regard pratique sur les
            entreprises en Belgique.
          </p>
        </div>
      </section>

      {featured && (
        <section className={styles.featuredSection}>
          <div className="wrap">
            <FeaturedArticle article={featured} />
          </div>
        </section>
      )}

      <section className={styles.articlesSection}>
        <div className="wrap">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Tous les articles</span>
            <h2 className={styles.sectionTitle}>Parcourir par thème</h2>
          </div>

          <BlogFilter articles={blogArticles} />
        </div>
      </section>

      <CTABox
        title="Besoin d'un accompagnement sur mesure ?"
        text="Discutons de votre projet de développement web, de votre sécurité ou de votre automatisation IA. Sans engagement."
        actions={[{ label: "Nous contacter", href: "/contact" }]}
        reassurances={["Réponse sous 24 h", "Sans engagement"]}
      />
    </div>
  );
}
