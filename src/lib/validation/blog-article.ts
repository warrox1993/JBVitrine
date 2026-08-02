/**
 * Runtime validation for the blog-article payload accepted by
 * POST /api/admin/blog and PUT /api/admin/blog/[slug].
 *
 * WHY THIS EXISTS: both routes used to build the article by reading raw body
 * fields into a `BlogArticle`-annotated object literal. A TypeScript annotation
 * is erased at build time and checks NOTHING at runtime, so any authenticated
 * `sales` account could post `{"slug": {"a":1}, "publishedAt": "not-a-date"}`.
 * That corrupts src/data/blogArticles.json, and the sort in getAllArticles
 * (`new Date(b.publishedAt).getTime()` → NaN) then breaks /blog for every
 * visitor. A 50 MB `content` was accepted too. Validate, don't annotate.
 */

import type { BlogArticle } from "@/lib/blogActions";

/** Per-field ceilings. `content` is markdown, so it gets the generous one. */
const LIMITS = {
  slug: 80,
  title: 200,
  excerpt: 500,
  category: 60,
  readTime: 20,
  coverImage: 300,
  content: 200 * 1024,
  tocEntries: 100,
  tocTitle: 200,
  tocId: 100,
} as const;

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;
const TOC_ID_RE = /^[a-z0-9][a-z0-9-]*$/;
/**
 * A local path: one leading slash, then no second slash.
 *
 * The `(?!\/)` lookahead is load-bearing. Without it, `/` sits inside the
 * character class, so "//evil.com/x.jpg" matched — a protocol-relative URL,
 * the exact opposite of the "never an absolute URL" rule below. It would then
 * reach <Image src={coverImage}> and be handed to the image optimizer.
 */
const COVER_IMAGE_RE = /^\/(?!\/)[A-Za-z0-9._\-/]+$/;

export type BlogArticleValidation =
  | { ok: true; article: BlogArticle }
  | { ok: false; error: string };

function str(value: unknown, field: string, max: number): string | string[] {
  if (typeof value !== "string") return [`${field} doit être une chaîne`];
  const trimmed = value.trim();
  if (trimmed.length === 0) return [`${field} est requis`];
  if (trimmed.length > max) return [`${field} dépasse ${max} caractères`];
  return trimmed;
}

/**
 * Validate an untrusted request body into a BlogArticle.
 *
 * Rejects unknown keys so a future field cannot be smuggled into the stored
 * JSON, and requires publishedAt to be a real date (the value the /blog sort
 * depends on).
 */
export function validateBlogArticle(body: unknown): BlogArticleValidation {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "Corps de requête invalide" };
  }

  const input = body as Record<string, unknown>;

  const allowedKeys = new Set([
    "slug",
    "title",
    "excerpt",
    "publishedAt",
    "updatedAt",
    "category",
    "readTime",
    "coverImage",
    "content",
    "tableOfContents",
  ]);
  const unknownKeys = Object.keys(input).filter((k) => !allowedKeys.has(k));
  if (unknownKeys.length > 0) {
    return { ok: false, error: `Champs inconnus: ${unknownKeys.join(", ")}` };
  }

  const errors: string[] = [];
  const take = (field: keyof typeof LIMITS, value: unknown): string => {
    const result = str(value, field, LIMITS[field] as number);
    if (Array.isArray(result)) {
      errors.push(...result);
      return "";
    }
    return result;
  };

  const slug = take("slug", input.slug);
  const title = take("title", input.title);
  const excerpt = take("excerpt", input.excerpt);
  const category = take("category", input.category);
  const readTime = take("readTime", input.readTime);
  const content = take("content", input.content);

  if (slug && !SLUG_RE.test(slug)) {
    errors.push("slug: minuscules, chiffres et tirets uniquement");
  }

  // publishedAt must parse — the /blog listing sorts on it.
  let publishedAt = "";
  if (typeof input.publishedAt !== "string") {
    errors.push("publishedAt doit être une chaîne");
  } else {
    publishedAt = input.publishedAt.trim();
    if (Number.isNaN(new Date(publishedAt).getTime())) {
      errors.push("publishedAt doit être une date valide (ISO 8601)");
    }
  }

  // updatedAt is optional, but when present it must parse AND not predate
  // publishedAt — an article "updated" before it was written would emit a
  // <lastmod> older than its own publication date and read as broken data.
  let updatedAt: string | undefined;
  if (input.updatedAt !== undefined && input.updatedAt !== null && input.updatedAt !== "") {
    if (typeof input.updatedAt !== "string") {
      errors.push("updatedAt doit être une chaîne");
    } else {
      const value = input.updatedAt.trim();
      const parsed = new Date(value).getTime();
      if (Number.isNaN(parsed)) {
        errors.push("updatedAt doit être une date valide (ISO 8601)");
      } else if (publishedAt && parsed < new Date(publishedAt).getTime()) {
        errors.push("updatedAt ne peut pas être antérieur à publishedAt");
      } else {
        updatedAt = value;
      }
    }
  }

  // coverImage is optional but, when present, must be a local path — never an
  // absolute URL (which would let an editor point the cover at a remote host).
  let coverImage: string | undefined;
  if (input.coverImage !== undefined && input.coverImage !== null && input.coverImage !== "") {
    if (typeof input.coverImage !== "string") {
      errors.push("coverImage doit être une chaîne");
    } else {
      const value = input.coverImage.trim();
      if (value.length > LIMITS.coverImage) {
        errors.push(`coverImage dépasse ${LIMITS.coverImage} caractères`);
      } else if (!COVER_IMAGE_RE.test(value) || value.includes("..")) {
        errors.push("coverImage doit être un chemin local (ex: /images/blog/x.jpg)");
      } else {
        coverImage = value;
      }
    }
  }

  // tableOfContents: array of { title, id }, bounded, ids anchor-safe.
  const tableOfContents: { title: string; id: string }[] = [];
  const rawToc = input.tableOfContents ?? [];
  if (!Array.isArray(rawToc)) {
    errors.push("tableOfContents doit être un tableau");
  } else if (rawToc.length > LIMITS.tocEntries) {
    errors.push(`tableOfContents dépasse ${LIMITS.tocEntries} entrées`);
  } else {
    rawToc.forEach((entry, i) => {
      if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
        errors.push(`tableOfContents[${i}] doit être un objet`);
        return;
      }
      const e = entry as Record<string, unknown>;
      const extra = Object.keys(e).filter((k) => k !== "title" && k !== "id");
      if (extra.length > 0) {
        errors.push(`tableOfContents[${i}]: champs inconnus (${extra.join(", ")})`);
        return;
      }
      if (typeof e.title !== "string" || e.title.trim().length === 0) {
        errors.push(`tableOfContents[${i}].title est requis`);
        return;
      }
      if (e.title.length > LIMITS.tocTitle) {
        errors.push(`tableOfContents[${i}].title trop long`);
        return;
      }
      if (typeof e.id !== "string" || !TOC_ID_RE.test(e.id) || e.id.length > LIMITS.tocId) {
        errors.push(`tableOfContents[${i}].id invalide (a-z, 0-9, tirets)`);
        return;
      }
      tableOfContents.push({ title: e.title.trim(), id: e.id });
    });
  }

  if (errors.length > 0) {
    return { ok: false, error: errors.join(" ; ") };
  }

  return {
    ok: true,
    article: {
      slug,
      title,
      excerpt,
      publishedAt,
      ...(updatedAt ? { updatedAt } : {}),
      category,
      readTime,
      ...(coverImage ? { coverImage } : {}),
      content,
      tableOfContents,
    },
  };
}
