"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import blogData from "@/data/blogArticles.json";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  /**
   * ISO date of the last substantive revision, when there has been one.
   *
   * Drives <lastmod> in the sitemap and dateModified in the article's JSON-LD:
   * without it, a rewritten article still advertises its original date and
   * crawlers have no reason to come back and re-read it.
   */
  updatedAt?: string;
  category: string;
  readTime: string;
  /** Optional real photo cover (e.g. "/images/blog/<slug>.jpg"). Falls back to ArticleCoverSvg when unset. */
  coverImage?: string;
  content: string;
  tableOfContents: { title: string; id: string }[];
}

interface BlogData {
  articles: BlogArticle[];
}

const BLOG_DATA_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "blogArticles.json",
);

/**
 * Notifie Google Search Console de la mise à jour du sitemap
 * SEO 2025: Indexation automatique des nouveaux articles
 */
async function notifyGoogleSearchConsole(): Promise<void> {
  // No-op: Google removed the sitemap "ping" endpoint (google.com/ping) in 2023
  // — it now 404s. Sitemaps are discovered via robots.txt / Search Console.
}

/**
 * Revalide le cache Next.js pour le blog et le sitemap
 * SEO 2025: Mise à jour instantanée du sitemap dynamique
 */
function revalidateBlogCache(slug?: string): void {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function getAllArticles(): Promise<BlogArticle[]> {
  // Static import: blogArticles.json is bundled at build time, so reads happen
  // in-memory with no runtime fs.readFile against process.cwd(). The previous
  // fs-based read was unreliable on Vercel's serverless filesystem (process.cwd()
  // does not point at the traced bundle root) and returned 500s on /blog/[slug]
  // in production. Copy before sort so we never mutate the imported module.
  const articles = (blogData as BlogData).articles;
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export async function createArticle(
  article: BlogArticle,
): Promise<{ success: boolean; error?: string }> {
  await requireAuth("sales");
  try {
    const articles = await getAllArticles();

    // Check if slug already exists
    if (articles.some((a) => a.slug === article.slug)) {
      return { success: false, error: "Un article avec ce slug existe déjà" };
    }

    articles.push(article);

    const data: BlogData = { articles };
    await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    // SEO 2025: Revalidation instantanée + notification Google
    revalidateBlogCache(article.slug);
    await notifyGoogleSearchConsole();

    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: "Erreur lors de la création de l'article" };
  }
}

export async function updateArticle(
  slug: string,
  updatedArticle: BlogArticle,
): Promise<{ success: boolean; error?: string }> {
  await requireAuth("sales");
  try {
    const articles = await getAllArticles();
    const index = articles.findIndex((a) => a.slug === slug);

    if (index === -1) {
      return { success: false, error: "Article non trouvé" };
    }

    // If slug changed, check it doesn't conflict
    if (
      slug !== updatedArticle.slug &&
      articles.some((a) => a.slug === updatedArticle.slug)
    ) {
      return { success: false, error: "Un article avec ce slug existe déjà" };
    }

    articles[index] = updatedArticle;

    const data: BlogData = { articles };
    await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    // SEO 2025: Revalidation instantanée + notification Google
    revalidateBlogCache(slug);
    if (slug !== updatedArticle.slug) {
      revalidateBlogCache(updatedArticle.slug); // Si le slug a changé
    }
    await notifyGoogleSearchConsole();

    return { success: true };
  } catch (error) {
    console.error("Error updating article:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour de l'article",
    };
  }
}

export async function deleteArticle(
  slug: string,
): Promise<{ success: boolean; error?: string }> {
  await requireAuth("sales");
  try {
    const articles = await getAllArticles();
    const filteredArticles = articles.filter((a) => a.slug !== slug);

    if (articles.length === filteredArticles.length) {
      return { success: false, error: "Article non trouvé" };
    }

    const data: BlogData = { articles: filteredArticles };
    await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    // SEO 2025: Revalidation instantanée + notification Google
    revalidateBlogCache(slug);
    await notifyGoogleSearchConsole();

    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de l'article",
    };
  }
}
