import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { BlogForm } from "@/components/features/admin/BlogForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nouvel Article | Admin Blog",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewArticlePage() {
  const t = await getTranslations("common");
  return (
    <div className={styles.container}>
      <Breadcrumbs items={[
        { label: t("breadcrumb.home"), href: "/" },
        { label: 'Admin', href: '/admin' },
        { label: 'Blog', href: '/admin/blog' },
        { label: 'Nouvel Article' }
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
