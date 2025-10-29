"use client";
import { useEffect, useRef } from "react";
import Image from 'next/image';
import styles from "./Proof.module.css";

export function Proof() {
  const logos = ["Acme Corp", "TechStart", "Innovate", "DigitalFlow", "Nexus", "Quantum"];
  const testimonials = [
    { quote: "L’équipe a transformé notre vision en une expérience web exceptionnelle.", name: "Sarah Laurent", role: "CMO, TechStart", avatar: "/images/pic01.webp" },
    { quote: "Code propre, planning tenu, résultats mesurables dès le mois 1.", name: "Marc Dubois", role: "CTO, Innovate", avatar: "/images/pic02.webp" },
    { quote: "UX orientée conversion. Notre CAC a baissé de 23%.", name: "Aïcha Benali", role: "Growth Lead, DigitalFlow", avatar: "/images/pic03.webp" },
    { quote: "Accompagnement clair, zéro surprise, perf Lighthouse au vert.", name: "Lucas Peters", role: "Founder, Nexus", avatar: "/images/pic04.webp" },
    { quote: "Refonte SEO + React: +61% de leads qualifiés en 90 jours.", name: "Chloé Martin", role: "Marketing Director, Quantum", avatar: "/images/pic05.webp" },
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children);
    const intervalMs = 5000;

    const prefersReducedMotion = () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth);
    const goTo = (i: number) => {
      const clamped = ((i % items.length) + items.length) % items.length;
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    };

    const start = () => {
      if (
        intervalRef.current !== null ||
        pausedRef.current ||
        !visibleRef.current ||
        prefersReducedMotion()
      ) {
        return;
      }
      intervalRef.current = window.setInterval(
        () => goTo(currentIndex() + 1),
        intervalMs
      );
    };
    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
    const restartSoon = () => {
      stop();
      if (!pausedRef.current && visibleRef.current && !prefersReducedMotion()) {
        resumeTimeoutRef.current = window.setTimeout(start, 1200);
      }
    };

    const onPointerEnter = () => { pausedRef.current = true; stop(); };
    const onPointerLeave = () => { pausedRef.current = false; start(); };
    const onFocusIn = () => { pausedRef.current = true; stop(); };
    const onFocusOut = () => { pausedRef.current = false; start(); };
    let userScrollTimeout: number | null = null;
    const onScroll = () => {
      if (userScrollTimeout !== null) {
        window.clearTimeout(userScrollTimeout);
      }
      userScrollTimeout = window.setTimeout(restartSoon, 300);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(currentIndex() + 1); restartSoon(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(currentIndex() - 1); restartSoon(); }
    };

    const passiveOptions: AddEventListenerOptions = { passive: true };

    track.addEventListener("pointerenter", onPointerEnter);
    track.addEventListener("pointerleave", onPointerLeave);
    track.addEventListener("focusin", onFocusIn);
    track.addEventListener("focusout", onFocusOut);
    track.addEventListener("scroll", onScroll, passiveOptions);
    track.addEventListener("keydown", onKeyDown);

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (visibleRef.current) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0.3 });
    io.observe(track);

    if (!prefersReducedMotion()) start();

    return () => {
      stop();
      if (userScrollTimeout !== null) {
        window.clearTimeout(userScrollTimeout);
      }
      io.disconnect();
      track.removeEventListener("pointerenter", onPointerEnter);
      track.removeEventListener("pointerleave", onPointerLeave);
      track.removeEventListener("focusin", onFocusIn);
      track.removeEventListener("focusout", onFocusOut);
      track.removeEventListener("scroll", onScroll, passiveOptions);
      track.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.intro}>Trusted by ambitious brands who seek design that delights and code that endures.</p>
        <div className={styles.grid}>
          {logos.map((logo) => (
            <div key={logo} className={styles.logo}>{logo}</div>
          ))}
        </div>

        <section className={styles.proofModule} aria-label="Témoignages">
          <div className={styles.proofTrack} role="list" id="proofTrack" ref={trackRef} tabIndex={0}>
            {testimonials.map(({ quote, name, role, avatar }, idx) => (
              <article key={idx} className={styles.proofItem} role="listitem" tabIndex={0}>
                <blockquote className={styles.quote}>“{quote}”</blockquote>
                <footer>
                  <div className={styles.proofPerson}>
                    <Image src={avatar} alt={name} className={styles.proofAvatar} width={96} height={96} loading="lazy" fetchPriority="low" quality={80} />
                    <div>
                      <span className={styles.authorName}>{name}</span><br />
                      <span className={styles.authorRole}>{role}</span>
                    </div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
