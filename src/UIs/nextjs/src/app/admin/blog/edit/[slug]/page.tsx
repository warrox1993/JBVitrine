import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getArticleBySlug } from "@/lib/blogActions";
import { BlogForm } from "@/components/admin/BlogForm";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Éditer Article | Admin Blog",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Blog', href: '/admin/blog' },
        { label: 'Éditer', href: `/admin/blog/edit/${slug}` }
      ]} />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Éditer l'Article</h1>
          <p className={styles.subtitle}>{article.title}</p>
        </div>
        <Link href="/admin/blog" className={styles.backLink}>
          ← Retour à la liste
        </Link>
      </div>

      <BlogForm article={article} mode="edit" />
    </div>
  );
}
