import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BlogForm } from "@/components/features/admin/BlogForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nouvel Article | Admin Blog",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewArticlePage() {
  return (
    <div className={styles.container}>
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Blog', href: '/admin/blog' },
        { label: 'Nouvel Article', href: '/admin/blog/new' }
      ]} />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Nouvel Article</h1>
          <p className={styles.subtitle}>
            Créez un nouvel article pour votre blog
          </p>
        </div>
        <Link href="/admin/blog" className={styles.backLink}>
          ← Retour à la liste
        </Link>
      </div>

      <BlogForm mode="create" />
    </div>
  );
}
