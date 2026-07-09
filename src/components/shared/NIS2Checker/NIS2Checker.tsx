"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./NIS2Checker.module.css";

type Sector =
  | "energy" | "health" | "transport" | "finance" | "digital"
  | "public" | "industry" | "digitalserv" | "other";
type Size = "small" | "medium" | "large";
type Supplier = "yes" | "maybe" | "no";
type Verdict = "essential" | "important" | "ricochet" | "notdirect";

const SECTORS: Sector[] = [
  "energy", "health", "transport", "finance", "digital",
  "public", "industry", "digitalserv", "other",
];
const SIZES: Size[] = ["small", "medium", "large"];
const SUPPLIERS: Supplier[] = ["yes", "maybe", "no"];

const HIGHLY: Sector[] = ["energy", "health", "transport", "finance", "digital", "public"];
const OTHER: Sector[] = ["industry", "digitalserv"];

function computeVerdict(sector: Sector, size: Size, supplier: Supplier): Verdict {
  const highly = HIGHLY.includes(sector);
  const other = OTHER.includes(sector);
  if (highly && size === "large") return "essential";
  if ((highly && size === "medium") || (other && (size === "medium" || size === "large"))) {
    return "important";
  }
  if (supplier === "yes") return "ricochet";
  return "notdirect";
}

const VERDICT_TONE: Record<Verdict, string> = {
  essential: styles.toneHigh,
  important: styles.toneHigh,
  ricochet: styles.toneMid,
  notdirect: styles.toneLow,
};

/**
 * Self-qualification widget: "Am I in NIS2 scope?" in 3 questions, no email,
 * instant verdict. Rule-based estimate (sector category x size x supply chain).
 */
export function NIS2Checker() {
  const t = useTranslations("checker");
  const [step, setStep] = useState(0); // 0..2 questions, 3 result
  const [sector, setSector] = useState<Sector | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  function pickSector(s: Sector) { setSector(s); setStep(1); }
  function pickSize(s: Size) { setSize(s); setStep(2); }
  function pickSupplier(s: Supplier) { setSupplier(s); setStep(3); }
  function restart() { setSector(null); setSize(null); setSupplier(null); setStep(0); }

  const verdict =
    step === 3 && sector && size && supplier
      ? computeVerdict(sector, size, supplier)
      : null;

  return (
    <div className={styles.checker}>
      {step < 3 && (
        <div className={styles.head}>
          <span className={styles.progress}>
            {t("progress", { current: step + 1, total: 3 })}
          </span>
          <div className={styles.bar} aria-hidden="true">
            <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>
        </div>
      )}

      {step === 0 && (
        <fieldset className={styles.q}>
          <legend>{t("q1.label")}</legend>
          <div className={styles.opts}>
            {SECTORS.map((s) => (
              <button key={s} type="button" className={styles.opt} onClick={() => pickSector(s)}>
                {t(`q1.opt.${s}`)}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className={styles.q}>
          <legend>{t("q2.label")}</legend>
          <div className={`${styles.opts} ${styles.optsWide}`}>
            {SIZES.map((s) => (
              <button key={s} type="button" className={styles.opt} onClick={() => pickSize(s)}>
                {t(`q2.opt.${s}`)}
              </button>
            ))}
          </div>
          <button type="button" className={styles.back} onClick={() => setStep(0)}>
            ← {t("back")}
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className={styles.q}>
          <legend>{t("q3.label")}</legend>
          <div className={`${styles.opts} ${styles.optsWide}`}>
            {SUPPLIERS.map((s) => (
              <button key={s} type="button" className={styles.opt} onClick={() => pickSupplier(s)}>
                {t(`q3.opt.${s}`)}
              </button>
            ))}
          </div>
          <button type="button" className={styles.back} onClick={() => setStep(1)}>
            ← {t("back")}
          </button>
        </fieldset>
      )}

      {step === 3 && verdict && (
        <div className={`${styles.result} ${VERDICT_TONE[verdict]}`} role="status" aria-live="polite">
          <span className={styles.verdictLabel}>{t("verdictLabel")}</span>
          <h3 className={styles.verdictTitle}>{t(`result.${verdict}.title`)}</h3>
          <p className={styles.verdictText}>{t(`result.${verdict}.text`)}</p>
          <div className={styles.actions}>
            <Link className={styles.cta} href="/contact">{t("result.cta")}</Link>
            <button type="button" className={styles.restart} onClick={restart}>
              {t("restart")}
            </button>
          </div>
          <p className={styles.disclaimer}>{t("result.disclaimer")}</p>
        </div>
      )}
    </div>
  );
}

export default NIS2Checker;
