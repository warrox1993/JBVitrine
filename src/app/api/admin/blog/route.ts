import { NextRequest, NextResponse } from "next/server";
import { createArticle } from "@/lib/blogActions";
import { guardRoute } from "@/lib/auth/guard";
import { validateContentType, validateCSRF } from "@/lib/api/middleware";
import { validateBlogArticle } from "@/lib/validation/blog-article";

/** Reject oversized bodies before parsing (markdown content is the bulk). */
const MAX_BODY_BYTES = 512 * 1024;

export async function POST(request: NextRequest) {
  const denied = await guardRoute("sales");
  if (denied) return denied;

  const contentTypeCheck = validateContentType(request);
  if (!contentTypeCheck.success) return contentTypeCheck.response;

  // SECURITY (V-W7): explicit CSRF check as defense-in-depth beyond SameSite
  // cookies, since this route mutates blog content.
  const csrfCheck = validateCSRF(request);
  if (!csrfCheck.success) return csrfCheck.response;

  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload trop volumineux" },
        { status: 413 },
      );
    }

    const body = await request.json();

    // Validate at runtime — a `BlogArticle` type annotation checks nothing once
    // compiled, so a malformed payload used to reach the stored JSON directly.
    const validation = validateBlogArticle(body);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 },
      );
    }

    const result = await createArticle(validation.article);

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
