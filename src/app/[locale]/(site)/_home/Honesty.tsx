import React from "react";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Honesty.module.css";

/** Transparency callout: we remediate, we don't claim to certify. */
export async function Honesty() {
  const t = await getTranslations("home");
  return (
    <Reveal className={styles.honesty}>
      <Icon name="shield-check" strokeWidth={1.8} />
      <div>
        <h4>{t("honesty.title")}</h4>
        <p>
          {t.rich("honesty.text", {
            b: (c) => <b>{c}</b>,
          })}
        </p>
      </div>
    </Reveal>
  );
}

export default Honesty;
