"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./WhoamiTerminal.module.css";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = { name: string; role: string };

const SHIELD_PATH = "M20 8l9 3.4v6.9c0 5.6-3.7 10.7-9 12.3-5.3-1.6-9-6.7-9-12.3v-6.9L20 8Z";
const CHECK_PATH = "M15.8 20.2l3 3 5.4-6";

export function WhoamiTerminal({ name, role }: Props) {
  const [phase, setPhase] = useState(0); // 0..4 (lignes révélées), 5 = bouclier

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setPhase(5);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timers = [420, 900, 1300, 1750, 2200].map((ms, i) =>
      window.setTimeout(() => setPhase(i + 1), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.term} role="group" aria-label={`${name}, ${role}`}>
      <div className={styles.bar}><span/><span/><span/></div>
      <pre className={styles.body}>
        <span className={styles.prompt}>&gt; whoami</span>
        {phase >= 1 && <span className={styles.out}>{name}</span>}
        {phase >= 2 && <span className={styles.prompt}>&gt; role</span>}
        {phase >= 3 && <span className={styles.out}>{role}</span>}
        {phase >= 4 && <span className={styles.prompt}>&gt; smidjan --init</span>}
      </pre>
      {phase >= 5 && (
        <svg className={styles.shield} viewBox="0 0 40 40" aria-hidden="true">
          <path d={SHIELD_PATH} fill="none" stroke="var(--color-primary)" strokeWidth="2" className={styles.draw}/>
          <path d={CHECK_PATH} fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.drawCheck}/>
        </svg>
      )}
    </div>
  );
}
