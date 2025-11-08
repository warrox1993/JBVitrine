import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleEditor } from "../ArticleEditor";

export const metadata: Metadata = {
  title: "Nouvel Article — Admin Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewArticlePage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Articles', href: '/admin' },
        { label: 'Nouvel Article', href: '/admin/articles/new' }
      ]} />
      <ArticleEditor mode="create" />
    </>
  );
}
