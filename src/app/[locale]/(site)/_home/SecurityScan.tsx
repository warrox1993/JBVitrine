"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./SecurityScan.module.css";

/**
 * Scan en direct des en-têtes de sécurité de CE site — dogfooding. À l'entrée
 * dans le champ, une requête HEAD de même origine lit les en-têtes réellement
 * renvoyés, puis les note.
 *
 * Il ne teste PAS leur présence mais leur VALEUR. C'est toute la différence :
 * `Strict-Transport-Security: max-age=1` et `Referrer-Policy: unsafe-url` sont
 * présents et ne protègent de rien. Un scanner qui coche « présent » donne une
 * fausse assurance — exactement ce qu'un auditeur reproche à un rapport.
 *
 * Chaque ligne affiche donc un verdict (conforme / faible / absent) ET l'extrait
 * de la valeur lue, pour que le visiteur puisse la recouper dans ses propres
 * outils de développement. Si la configuration se dégradait, la note baisserait
 * toute seule.
 */

type Verdict = "strong" | "weak" | "absent";
type Check = { key: string; header: string; verdict: Verdict; detail: string };

/**
 * Chaque en-tête a son propre contrôle, parce que « présent » ne prouve rien :
 * un `Strict-Transport-Security: max-age=1` ou un `Referrer-Policy: unsafe-url`
 * sont présents et inutiles. C'est la valeur qui décide.
 *
 * `detail` renvoie un extrait de la valeur RÉELLEMENT lue, en notation
 * technique — donc identique dans les trois langues, et vérifiable par le
 * visiteur qui ouvre ses propres outils de développement.
 */
type Audit = (value: string) => { verdict: "strong" | "weak"; detail: string };

const HEADERS: { header: string; label: string; audit: Audit }[] = [
  {
    header: "content-security-policy",
    label: "Content-Security-Policy",
    audit: (v) => {
      const scriptSrc = /script-src([^;]*)/i.exec(v)?.[1] ?? "";
      const parNonce = /'nonce-|'sha(256|384|512)-/.test(scriptSrc);
      const strictDynamic = /'strict-dynamic'/.test(scriptSrc);
      // 'unsafe-inline' est ignoré par le navigateur dès qu'un nonce ou un hash
      // est présent : il n'est une faiblesse que sans eux.
      const inlineActif = /'unsafe-inline'/.test(scriptSrc) && !parNonce;
      const evalActif = /'unsafe-eval'/.test(scriptSrc);
      const objet = /object-src\s+'none'/i.test(v);
      const cadres = /frame-ancestors\s+('none'|'self')/i.test(v);
      const base = /base-uri/i.test(v);
      const jetons = [
        parNonce ? "nonce" : null,
        strictDynamic ? "strict-dynamic" : null,
        objet ? "object-src 'none'" : null,
        cadres ? "frame-ancestors" : null,
        base ? "base-uri" : null,
        inlineActif ? "unsafe-inline" : null,
        evalActif ? "unsafe-eval" : null,
      ].filter(Boolean);
      return {
        verdict: parNonce && !inlineActif && !evalActif && objet && cadres && base ? "strong" : "weak",
        detail: jetons.join(" · "),
      };
    },
  },
  {
    header: "strict-transport-security",
    label: "Strict-Transport-Security",
    audit: (v) => {
      const maxAge = Number(/max-age=(\d+)/i.exec(v)?.[1] ?? 0);
      const sousDomaines = /includeSubDomains/i.test(v);
      // 6 mois : le seuil exigé pour figurer sur la liste de preload.
      const SIX_MOIS = 15_768_000;
      return {
        verdict: maxAge >= SIX_MOIS && sousDomaines ? "strong" : "weak",
        detail: [
          `max-age=${maxAge}`,
          sousDomaines ? "includeSubDomains" : null,
          /preload/i.test(v) ? "preload" : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
  {
    header: "x-frame-options",
    label: "X-Frame-Options",
    audit: (v) => ({
      verdict: /^(deny|sameorigin)$/i.test(v.trim()) ? "strong" : "weak",
      detail: v.trim(),
    }),
  },
  {
    header: "x-content-type-options",
    label: "X-Content-Type-Options",
    audit: (v) => ({
      verdict: /nosniff/i.test(v) ? "strong" : "weak",
      detail: v.trim(),
    }),
  },
  {
    header: "referrer-policy",
    label: "Referrer-Policy",
    audit: (v) => {
      // Les valeurs qui ne fuitent pas le chemin complet vers un tiers.
      const sures = ["no-referrer", "same-origin", "strict-origin", "strict-origin-when-cross-origin"];
      return {
        verdict: sures.includes(v.trim().toLowerCase()) ? "strong" : "weak",
        detail: v.trim(),
      };
    },
  },
  {
    header: "permissions-policy",
    label: "Permissions-Policy",
    audit: (v) => {
      const refusees = (v.match(/=\(\s*\)/g) ?? []).length;
      return { verdict: refusees >= 4 ? "strong" : "weak", detail: `${refusees} × =()` };
    },
  },
  {
    header: "cross-origin-opener-policy",
    label: "Cross-Origin-Opener-Policy",
    audit: (v) => ({
      verdict: /^same-origin(-allow-popups)?$/i.test(v.trim()) ? "strong" : "weak",
      detail: v.trim(),
    }),
  },
  {
    header: "cross-origin-resource-policy",
    label: "Cross-Origin-Resource-Policy",
    audit: (v) => ({
      verdict: /^(same-origin|same-site)$/i.test(v.trim()) ? "strong" : "weak",
      detail: v.trim(),
    }),
  },
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
      // Seuil nul, pas un ratio : `threshold` est une fraction de l'élément, donc
      // un seuil de 0.35 rendait le démarrage du scan impossible dès que la carte
      // dépassait ~2.9x la hauteur de la fenêtre — le terminal serait resté vide
      // pour toujours. Même panne que celle rencontrée sur le journal.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
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
      const result: Check[] = HEADERS.map(({ header, label, audit }) => {
        // Si la requête a échoué, on ne peut rien affirmer : on l'annonce comme
        // absent plutôt que de laisser croire à un contrôle qui n'a pas eu lieu.
        const value = headers?.get(header) ?? null;
        if (value === null) return { key: header, header: label, verdict: "absent", detail: "" };
        const { verdict, detail } = audit(value);
        return { key: header, header: label, verdict, detail };
      });
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

  // Seul « strong » compte : un en-tête présent mais mal réglé ne protège de rien.
  const passed = checks.filter((c) => c.verdict === "strong").length;
  const total = checks.length || HEADERS.length;
  const finalGrade = done ? grade(passed, total) : null;

  return (
    <Reveal>
      <div className={styles.band}>
        <div className={styles.rail}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>{t("eyebrow")}</span>
            <h2 className={styles.title}>{t("title")}</h2>
          </div>
          <p className={styles.scanNote}>{t("lead")}</p>
          <p className={styles.foot}>{t("foot")}</p>
        </div>

        {/* role="group" is required for the aria-label to survive: a bare <div>
            maps to the "generic" role, and screen readers silently drop
            aria-label on generic elements — the name was being thrown away. */}
        <div className={styles.terminal} ref={rootRef} role="group" aria-label={t("title")}>
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
                    className={
                      c.verdict === "strong"
                        ? styles.ok
                        : c.verdict === "weak"
                          ? styles.warn
                          : styles.ko
                    }
                    aria-hidden="true"
                  >
                    {c.verdict === "strong" ? "✓" : c.verdict === "weak" ? "!" : "✕"}
                  </span>
                  <span className={styles.hName}>{c.header}</span>
                  <span className={styles.hState}>
                    {c.verdict === "strong"
                      ? t("strong")
                      : c.verdict === "weak"
                        ? t("weak")
                        : t("absent")}
                  </span>
                  {/* La valeur réellement lue : c'est elle qui rend le scan
                      vérifiable, et elle est en notation technique donc
                      identique dans les trois langues. */}
                  {c.detail ? <span className={styles.hValue}>{c.detail}</span> : null}
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
      </div>
    </Reveal>
  );
}

export default SecurityScan;
