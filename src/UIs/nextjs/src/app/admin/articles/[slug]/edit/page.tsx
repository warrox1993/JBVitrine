import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
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

  return (
    <>
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Articles', href: '/admin' },
        { label: 'Éditer', href: `/admin/articles/${slug}/edit` }
      ]} />
      <ArticleEditor article={article} mode="edit" />
    </>
  );
}
