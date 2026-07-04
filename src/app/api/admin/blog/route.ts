import { NextRequest, NextResponse } from "next/server";
import { createArticle } from "@/lib/blogActions";
import type { BlogArticle } from "@/lib/blogActions";
import { guardRoute } from "@/lib/auth/guard";
import { validateCSRF } from "@/lib/api/middleware";

export async function POST(request: NextRequest) {
  const denied = await guardRoute("sales");
  if (denied) return denied;

  // SECURITY (V-W7): explicit CSRF check as defense-in-depth beyond SameSite
  // cookies, since this route mutates blog content.
  const csrfCheck = validateCSRF(request);
  if (!csrfCheck.success) return csrfCheck.response;

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
