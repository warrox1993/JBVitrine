"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogArticle } from "@/lib/blogActions";
import { Button } from "@/components/ui/Button/Button";
import styles from "./BlogForm.module.css";

interface BlogFormProps {
  article?: BlogArticle;
  mode: "create" | "edit";
}

export function BlogForm({ article, mode }: BlogFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${article?.slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(result.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur lors de la sauvegarde de l'article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, slug });
  };

  const addTocItem = () => {
    setFormData({
      ...formData,
      tableOfContents: [
        ...formData.tableOfContents,
        { title: "", id: "" },
      ],
    });
  };

  const updateTocItem = (index: number, field: "title" | "id", value: string) => {
    const newToc = [...formData.tableOfContents];
    newToc[index] = { ...newToc[index], [field]: value };
    setFormData({ ...formData, tableOfContents: newToc });
  };

  const removeTocItem = (index: number) => {
    const newToc = formData.tableOfContents.filter((_, i) => i !== index);
    setFormData({ ...formData, tableOfContents: newToc });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Titre de l'article *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="slug" className={styles.label}>
          Slug (URL) *
        </label>
        <div className={styles.slugGroup}>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className={styles.input}
            required
            disabled={mode === "edit"}
          />
          {mode === "create" && (
            <Button
              type="button"
              onClick={generateSlug}
              variant="outline"
              size="sm"
              ariaLabel="Générer le slug depuis le titre"
            >
              Générer
            </Button>
          )}
        </div>
        <small className={styles.hint}>
          URL: /blog/{formData.slug || "votre-slug"}
        </small>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Catégorie *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={styles.select}
            required
          >
            <option value="Développement Web">Développement Web</option>
            <option value="Cybersécurité">Cybersécurité</option>
            <option value="Automatisation & IA">Automatisation & IA</option>
            <option value="SEO & Marketing">SEO & Marketing</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="publishedAt" className={styles.label}>
            Date de publication *
          </label>
          <input
            id="publishedAt"
            type="date"
            value={formData.publishedAt}
            onChange={(e) =>
              setFormData({ ...formData, publishedAt: e.target.value })
            }
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="readTime" className={styles.label}>
            Temps de lecture *
          </label>
          <input
            id="readTime"
            type="text"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className={styles.input}
            placeholder="5 min"
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="excerpt" className={styles.label}>
          Résumé (excerpt) *
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className={styles.textarea}
          rows={3}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Contenu (Markdown) *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={styles.textareaLarge}
          rows={20}
          required
        />
        <small className={styles.hint}>
          Utilisez la syntaxe Markdown. Exemple: # Titre, ## Sous-titre, **gras**,
          *italique*, [lien](url)
        </small>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.tocHeader}>
          <label className={styles.label}>Table des matières</label>
          <Button
            type="button"
            onClick={addTocItem}
            variant="outline"
            size="sm"
            ariaLabel="Ajouter un élément à la table des matières"
          >
            + Ajouter
          </Button>
        </div>

        {formData.tableOfContents.map((item, index) => (
          <div key={index} className={styles.tocItem}>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateTocItem(index, "title", e.target.value)}
              placeholder="Titre de la section"
              className={styles.input}
            />
            <input
              type="text"
              value={item.id}
              onChange={(e) => updateTocItem(index, "id", e.target.value)}
              placeholder="id-de-la-section"
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => removeTocItem(index)}
              className={styles.removeButton}
              aria-label="Supprimer cet élément"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          size="md"
          ariaLabel="Annuler"
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="solid"
          size="md"
          ariaLabel={mode === "create" ? "Créer l'article" : "Mettre à jour l'article"}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Sauvegarde..."
            : mode === "create"
              ? "Créer l'article"
              : "Mettre à jour"}
        </Button>
      </div>
    </form>
  );
}
