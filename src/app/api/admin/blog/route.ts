import { NextResponse } from "next/server";
import { createArticle } from "@/lib/blogActions";
import type { BlogArticle } from "@/lib/blogActions";
import { guardRoute } from "@/lib/auth/guard";

export async function POST(request: Request) {
  const denied = await guardRoute("sales");
  if (denied) return denied;
  try {
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

    const result = await createArticle(article);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de l'article" },
      { status: 500 },
    );
  }
}
