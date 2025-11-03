"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/blogActions";
import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  slug: string;
  title: string;
}

export function DeleteButton({ slug, title }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteArticle(slug);
      if (result.success) {
        router.refresh();
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      alert("Erreur lors de la suppression de l'article");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className={styles.confirmDialog}>
        <p className={styles.confirmText}>Supprimer "{title}" ?</p>
        <div className={styles.confirmButtons}>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.confirmButton}
          >
            {isDeleting ? "Suppression..." : "Oui"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className={styles.cancelButton}
          >
            Non
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className={styles.deleteButton}
      aria-label={`Supprimer l'article ${title}`}
    >
      Supprimer
    </button>
  );
}
