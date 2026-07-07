import React from "react";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./AiNote.module.css";

/** Honest "AI-augmented, human-decided" note under the services grid. */
export async function AiNote() {
  const t = await getTranslations("home");
  return (
    <Reveal className={styles.note}>
      <Icon name="sparkles" strokeWidth={1.8} />
      <span>
        {t.rich("aiNote", {
          b: (c) => <b>{c}</b>,
        })}
      </span>
    </Reveal>
  );
}

export default AiNote;
