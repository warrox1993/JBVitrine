"use client";

import { useEffect } from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { Button } from "@/components/ui/Button/Button";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.errorPage}>
      <AnimatedBackground variant="dark" />
      <div className={styles.content}>
        <h1 className={styles.title}>Oups !</h1>
        <p className={styles.message}>
          Une erreur s'est produite. Nous nous excusons pour la gêne occasionnée.
        </p>
        {error.digest && (
          <p className={styles.digest}>Code d'erreur : {error.digest}</p>
        )}
        <div className={styles.actions}>
          <Button variant="solid" size="md" onClick={reset} ariaLabel="Réessayer">
            Réessayer
          </Button>
          <Button
            as="a"
            href="/"
            variant="outline"
            size="md"
            ariaLabel="Retour à l'accueil"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </section>
  );
}
