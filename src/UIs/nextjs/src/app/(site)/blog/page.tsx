import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Heading } from "@/components/ui/Heading";
import { Footer } from "@/components/layout/Footer/Footer";
import { SectionWithBackground } from "@/components/ui/SectionWithBackground/SectionWithBackground";
import { getAllArticles } from "@/lib/blogActions";
import { BlogFilter } from "@/components/features/blog/BlogFilter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog Dev Web & IA | Smidjan Liège",
  description:
    "Articles techniques sur le développement web, la cybersécurité, l'automatisation IA et les bonnes pratiques SEO. Conseils d'experts pour PME en Belgique.",
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
    title: "Blog Technique - Smidjan",
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
    title: "Blog Technique - Smidjan",
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
  return (
    <>
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
                  name: "Blog",
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
              name: "Blog Smidjan",
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

        <SectionWithBackground
          id="blog-hero"
          className={styles.hero}
          variant="dark"
          ariaLabel="Blog hero section"
        >
          <div className="container">
            <Breadcrumb />

            <Heading as="h1" className={styles.heroTitle}>
              Blog Technique
            </Heading>
            <p className={styles.heroLead}>
              Articles sur le développement web, la cybersécurité et l'automatisation IA. Conseils pratiques et bonnes pratiques pour entreprises en Belgique.
            </p>
          </div>
        </SectionWithBackground>

        <SectionWithBackground
          id="blog-articles"
          className={styles.articlesSection}
          variant="light"
          ariaLabel="Liste des articles"
        >
          <div className="container">
            <BlogFilter articles={blogArticles} />
          </div>
        </SectionWithBackground>
      </div>
      <Footer />
    </>
  );
}
