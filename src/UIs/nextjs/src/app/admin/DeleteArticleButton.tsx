"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/blogActions";
import { Button } from "@/components/ui/Button/Button";

interface DeleteArticleButtonProps {
  slug: string;
  title: string;
}

export function DeleteArticleButton({ slug, title }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'article "${title}" ? Cette action est irréversible.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const result = await deleteArticle(slug);

      if (result.success) {
        router.refresh();
      } else {
        alert(`Erreur : ${result.error}`);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Une erreur est survenue lors de la suppression");
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      ariaLabel={`Supprimer l'article ${title}`}
      style={{
        color: isDeleting ? "var(--color-text-tertiary)" : "var(--color-error, #dc2626)",
        borderColor: isDeleting ? "var(--color-border)" : "var(--color-error, #dc2626)",
      }}
    >
      {isDeleting ? "Suppression..." : "Supprimer"}
    </Button>
  );
}
