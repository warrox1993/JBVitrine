import { NextResponse } from "next/server";
import { updateArticle } from "@/lib/blogActions";
import type { BlogArticle } from "@/lib/blogActions";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function PUT(request: Request, context: Context) {
  try {
    const { slug } = await context.params;
    const body = await request.json();

    const article: BlogArticle = {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      publishedAt: body.publishedAt,
      category: body.category,
      readTime: body.readTime,
      content: body.content,
      tableOfContents: body.tableOfContents || [],
    };

    const result = await updateArticle(slug, article);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour de l'article" },
      { status: 500 },
    );
  }
}
