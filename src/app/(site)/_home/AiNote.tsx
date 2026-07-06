import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./AiNote.module.css";

/** Honest "AI-augmented, human-decided" note under the services grid. */
export function AiNote() {
  return (
    <Reveal className={styles.note}>
      <Icon name="sparkles" strokeWidth={1.8} />
      <span>
        Des <b>experts augmentés par l&apos;IA</b> pour aller plus vite&nbsp;: décisions et analyse
        restent 100&nbsp;% humaines.
      </span>
    </Reveal>
  );
}

export default AiNote;
