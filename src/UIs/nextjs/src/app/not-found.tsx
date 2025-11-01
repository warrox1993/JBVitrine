"use client";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { Button } from "@/components/ui/Button/Button";
import styles from "./error.module.css";

export default function NotFound() {
  return (
    <section className={styles.errorPage}>
      <AnimatedBackground variant="dark" />
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className={styles.actions}>
          <Button
            as="a"
            href="/"
            variant="solid"
            size="md"
            ariaLabel="Retour à l'accueil"
          >
            Retour à l'accueil
          </Button>
          <Button
            as="a"
            href="/contact"
            variant="outline"
            size="md"
            ariaLabel="Nous contacter"
          >
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  );
}
