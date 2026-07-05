import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./AiNote.module.css";

/** Honest "AI-augmented, human-decided" note under the services grid. */
export function AiNote() {
  return (
    <div className={styles.note}>
      <Icon name="sparkles" strokeWidth={1.8} />
      <span>
        Des <b>experts augmentés par l&apos;IA</b> pour aller plus vite et plus loin — mais
        l&apos;analyse et les décisions restent entre des mains humaines.
      </span>
    </div>
  );
}

export default AiNote;
