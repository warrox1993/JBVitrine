import { Metadata } from "next";
import { ArticleEditor } from "../ArticleEditor";

export const metadata: Metadata = {
  title: "Nouvel Article — Admin Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewArticlePage() {
  return <ArticleEditor mode="create" />;
}
