import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/blogActions";
import { ArticleEditor } from "../../ArticleEditor";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return {
    title: `Modifier ${article?.title || "Article"} — Admin Smidjan`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleEditor article={article} mode="edit" />;
}
