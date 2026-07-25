"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./CopyButton.module.css";

type CopyButtonProps = {
  /** The exact text placed on the clipboard. */
  value: string;
  /** Accessible label + tooltip in the idle state, e.g. "Copier l'adresse e-mail". */
  copyLabel: string;
  /** Confirmation shown briefly after a successful copy, e.g. "Copié". */
  copiedLabel: string;
};

const RESET_MS = 1800;

export function CopyButton({ value, copyLabel, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_MS);
    } catch {
      // Clipboard unavailable (insecure context / denied): the mailto/tel link
      // beside this button remains the working fallback, so we stay silent.
    }
  }, [value]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onCopy}
      data-copied={copied || undefined}
      aria-label={copied ? copiedLabel : copyLabel}
      title={copied ? copiedLabel : copyLabel}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{copiedLabel}</span>
        </>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
