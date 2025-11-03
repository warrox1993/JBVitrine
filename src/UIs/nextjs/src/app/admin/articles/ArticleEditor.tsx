"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BlogArticle, createArticle, updateArticle } from "@/lib/blogActions";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading";
import styles from "./ArticleEditor.module.css";

interface ArticleEditorProps {
  article?: BlogArticle;
  mode: "create" | "edit";
}

export function ArticleEditor({ article, mode }: ArticleEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    slug: article?.slug || "",
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    publishedAt: article?.publishedAt || new Date().toISOString().split("T")[0],
    category: article?.category || "Développement Web",
    readTime: article?.readTime || "5 min",
    content: article?.content || "",
    tableOfContents: article?.tableOfContents || [],
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(mode === "create" ? { slug: generateSlug(title) } : {}),
    }));
  };

  const extractTableOfContents = (content: string) => {
    const headings = content.match(/^##\s+(.+)$/gm) || [];
    return headings.map((heading) => {
      const title = heading.replace(/^##\s+/, "");
      const id = generateSlug(title);
      return { title, id };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const toc = extractTableOfContents(formData.content);

      const articleData: BlogArticle = {
        ...formData,
        tableOfContents: toc,
      };

      const result =
        mode === "create"
          ? await createArticle(articleData)
          : await updateArticle(article!.slug, articleData);

      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Une erreur est survenue");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error submitting article:", err);
      setError("Une erreur est survenue lors de la sauvegarde");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading level={1} className={styles.title}>
          {mode === "create" ? "Nouvel Article" : "Modifier l'Article"}
        </Heading>
        <Button
          as="a"
          href="/admin"
          variant="outline"
          size="sm"
          ariaLabel="Retour au dashboard"
        >
          ← Retour
        </Button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Titre <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              className={styles.input}
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Comment optimiser..."
            />
          </div>

          {/* Slug */}
          <div className={styles.formGroup}>
            <label htmlFor="slug" className={styles.label}>
              Slug <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="slug"
              className={styles.input}
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              placeholder="comment-optimiser"
              pattern="[a-z0-9-]+"
              title="Lettres minuscules, chiffres et tirets uniquement"
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Catégorie <span className={styles.required}>*</span>
            </label>
            <select
              id="category"
              className={styles.select}
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              required
            >
              <option value="Développement Web">Développement Web</option>
              <option value="Cybersécurité">Cybersécurité</option>
              <option value="Automatisation & IA">Automatisation & IA</option>
            </select>
          </div>

          {/* Published Date */}
          <div className={styles.formGroup}>
            <label htmlFor="publishedAt" className={styles.label}>
              Date de publication <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="publishedAt"
              className={styles.input}
              value={formData.publishedAt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))
              }
              required
            />
          </div>

          {/* Read Time */}
          <div className={styles.formGroup}>
            <label htmlFor="readTime" className={styles.label}>
              Temps de lecture <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="readTime"
              className={styles.input}
              value={formData.readTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, readTime: e.target.value }))
              }
              required
              placeholder="8 min"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className={styles.formGroup}>
          <label htmlFor="excerpt" className={styles.label}>
            Extrait <span className={styles.required}>*</span>
          </label>
          <textarea
            id="excerpt"
            className={styles.textarea}
            rows={3}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
            }
            required
            placeholder="Description courte de l'article (160-200 caractères)..."
          />
          <div className={styles.charCount}>{formData.excerpt.length} caractères</div>
        </div>

        {/* Content */}
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            Contenu (Markdown) <span className={styles.required}>*</span>
          </label>
          <div className={styles.markdownHelp}>
            Utilisez la syntaxe Markdown : # Titre 1, ## Titre 2, **gras**, *italique*,
            [lien](url), etc.
          </div>
          <textarea
            id="content"
            className={`${styles.textarea} ${styles.contentTextarea}`}
            rows={20}
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            required
            placeholder="# Titre de l'article&#10;&#10;## Introduction&#10;&#10;Votre contenu ici..."
          />
          <div className={styles.charCount}>{formData.content.length} caractères</div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            size="md"
            ariaLabel="Annuler"
            onClick={() => router.push("/admin")}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="solid"
            size="md"
            ariaLabel={mode === "create" ? "Créer l'article" : "Sauvegarder les modifications"}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Enregistrement..."
              : mode === "create"
                ? "Créer l'article"
                : "Sauvegarder"}
          </Button>
        </div>
      </form>
    </div>
  );
}
