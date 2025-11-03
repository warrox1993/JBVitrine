"use server";

import fs from "fs/promises";
import path from "path";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime: string;
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

export async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const fileContent = await fs.readFile(BLOG_DATA_PATH, "utf-8");
    const data: BlogData = JSON.parse(fileContent);
    return data.articles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch (error) {
    console.error("Error reading blog articles:", error);
    return [];
  }
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
  try {
    const articles = await getAllArticles();

    // Check if slug already exists
    if (articles.some((a) => a.slug === article.slug)) {
      return { success: false, error: "Un article avec ce slug existe déjà" };
    }

    articles.push(article);

    const data: BlogData = { articles };
    await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

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
  try {
    const articles = await getAllArticles();
    const filteredArticles = articles.filter((a) => a.slug !== slug);

    if (articles.length === filteredArticles.length) {
      return { success: false, error: "Article non trouvé" };
    }

    const data: BlogData = { articles: filteredArticles };
    await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de l'article",
    };
  }
}
