"use client";
import styles from "./SkipLink.module.css";

export function SkipLink() {
  return (
    <a href="#main" className={styles.skipLink}>
      Aller au contenu principal
    </a>
  );
}

