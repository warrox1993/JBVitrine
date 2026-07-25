"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./SecurityScan.module.css";

/**
 * Live "security headers" scan of THIS site — dogfooding. On reveal, it does a
 * same-origin HEAD request, reads the real response headers, and grades them.
 * Nothing is faked: the grade reflects whatever the server actually sends
 * (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
 * Permissions-Policy). If a header were missing, the grade would drop — which
 * is the point: it proves the practitioner secures his own site.
 */

type Check = { key: string; header: string; present: boolean };

const HEADERS: { header: string; label: string }[] = [
  { header: "content-security-policy", label: "Content-Security-Policy" },
  { header: "strict-transport-security", label: "Strict-Transport-Security" },
  { header: "x-frame-options", label: "X-Frame-Options" },
  { header: "x-content-type-options", label: "X-Content-Type-Options" },
  { header: "referrer-policy", label: "Referrer-Policy" },
  { header: "permissions-policy", label: "Permissions-Policy" },
];

function grade(passed: number, total: number): string {
  if (passed === total) return "A+";
  if (passed >= total - 1) return "A";
  if (passed >= total - 2) return "B";
  if (passed >= total - 3) return "C";
  return "D";
}

export function SecurityScan() {
  const t = useTranslations("home.securityScan");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [checks, setChecks] = useState<Check[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);

  // Kick the scan the first time the card enters the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    (async () => {
      let headers: Headers | null = null;
      try {
        const res = await fetch(window.location.href, {
          method: "HEAD",
          cache: "no-store",
        });
        headers = res.headers;
      } catch {
        headers = null;
      }
      if (cancelled) return;
      const result: Check[] = HEADERS.map(({ header, label }) => ({
        key: header,
        header: label,
        // If the fetch failed (headers === null) we can't verify — mark absent.
        present: headers ? headers.get(header) !== null : false,
      }));
      setChecks(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [started]);

  // Reveal the checks one by one for a scanning feel, then the grade.
  useEffect(() => {
    if (!checks.length) return;
    if (revealed < checks.length) {
      const id = setTimeout(() => setRevealed((n) => n + 1), 260);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setDone(true), 320);
    return () => clearTimeout(id);
  }, [checks, revealed]);

  const passed = checks.filter((c) => c.present).length;
  const total = checks.length || HEADERS.length;
  const finalGrade = done ? grade(passed, total) : null;

  return (
    <Reveal>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{t("eyebrow")}</span>
        <h2 className={styles.title}>{t("title")}</h2>
      </div>

      <div className={styles.terminal} ref={rootRef} aria-label={t("title")}>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.body}>
          <div className={styles.prompt}>
            <span className={styles.sigil}>$</span> scan --headers smidjan.be
          </div>
          <ul className={styles.rows}>
            {checks.slice(0, revealed).map((c) => (
              <li key={c.key} className={styles.row}>
                <span
                  className={c.present ? styles.ok : styles.ko}
                  aria-hidden="true"
                >
                  {c.present ? "✓" : "✕"}
                </span>
                <span className={styles.hName}>{c.header}</span>
                <span className={styles.hState}>
                  {c.present ? t("present") : t("absent")}
                </span>
              </li>
            ))}
          </ul>
          {finalGrade && (
            <div className={styles.result}>
              <span className={styles.resultLabel}>{t("resultLabel")}</span>
              <span
                className={`${styles.gradeBadge} ${
                  finalGrade === "A+" ? styles.gradeTop : ""
                }`}
              >
                {finalGrade}
              </span>
              <span className={styles.resultNote}>
                {t("score", { passed, total })}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className={styles.scanNote}>{t("lead")}</p>
      <p className={styles.foot}>{t("foot")}</p>
    </Reveal>
  );
}

export default SecurityScan;
