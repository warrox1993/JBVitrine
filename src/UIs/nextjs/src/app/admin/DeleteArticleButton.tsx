"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/blogActions";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./page.module.css";

interface DeleteArticleButtonProps {
  slug: string;
  title: string;
}

export function DeleteArticleButton({ slug, title }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading("Suppression de l'article...");

    try {
      const result = await deleteArticle(slug);

      if (result.success) {
        toast.update(toastId, {
          render: "Article supprimé avec succès",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        router.refresh();
      } else {
        toast.update(toastId, {
          render: `Erreur : ${result.error}`,
          type: "error",
          isLoading: false,
          autoClose: 5000
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.update(toastId, {
        render: "Une erreur inattendue est survenue",
        type: "error",
        isLoading: false,
        autoClose: 5000
      });
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={`${styles.actionButton} ${styles.delete}`}
      onClick={handleDelete}
      disabled={isDeleting}
      title="Supprimer l'article"
    >
      {isDeleting ? <Loader2 size={18} className={styles.spin} /> : <Trash2 size={18} />}
    </button>
  );
}
