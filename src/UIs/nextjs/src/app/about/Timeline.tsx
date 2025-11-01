"use client";

import React, { useEffect, useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";

// Timeline 100% calquée sur md/timeline.md, en respectant la palette du site via variables CSS
// - Couleurs d'accent: var(--color-accent-1)
// - Textes/neutres: var(--color-text-1/2/3), var(--color-bg)
// - Aucun ajout d'ARIA ou de navigation clavier non présents dans le .md

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observer comme dans le .md
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.6, 1],
        rootMargin: "-15% 0px -15% 0px",
      }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Progression de scroll du conteneur interne (comme dans le .md)
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = (scrollTop / Math.max(1, scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    const el = containerRef.current;
    if (!el) return;

    const options: AddEventListenerOptions = { passive: true };
    el.addEventListener("scroll", handleScroll, options);
    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll, options);
    };
  }, []);

  // Responsive: afficher le rail de droite uniquement en >= lg (>= 1024px)
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsLg(window.innerWidth >= 1024);
    };
    update();

    const options: AddEventListenerOptions = { passive: true };
    window.addEventListener("resize", update, options);
    return () => window.removeEventListener("resize", update, options);
  }, []);

  // Palette du site
  const accent = "var(--color-accent-1)";
  const text1 = "var(--color-text-1)";
  const text2 = "var(--color-text-2)";
  const text3 = "var(--color-text-3)";
  const bg = "var(--color-bg)";

  return (
    <div className="relative" style={{ height: "100vh", width: "100%", overflow: "hidden", backgroundColor: bg }}>
      {/* Subtle background glow (utilise la couleur d'accent globale) */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          transition: "opacity 1s ease",
          background: `radial-gradient(circle at 50% 50%, ${accent}, transparent 60%)`,
        }}
      />


      {/* Timeline dots - vertical (scoped to section) */}
      {isLg && (
        <div
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 40,
          }}
        >
          <div style={{ position: "relative", height: "50vh" }}>
            {/* Vertical line */}
            <div
              style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 1, height: "100%", backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            {/* Progress line */}
            <div
              style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 2, top: 0, height: `${(activeIndex / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%`, backgroundColor: accent, transition: "height 0.7s" }}
            />
            {/* Dots */}
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={index}
                style={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", top: `${(index / Math.max(1, TIMELINE_ITEMS.length - 1)) * 100}%`, transition: "all 0.5s" }}
              >
                <div
                  style={{
                    width: index === activeIndex ? 12 : 8,
                    height: index === activeIndex ? 12 : 8,
                    borderRadius: "50%",
                    border: `2px solid ${bg}`,
                    backgroundColor: index <= activeIndex ? accent : "rgba(255,255,255,0.2)",
                    boxShadow: index === activeIndex ? `0 0 20px ${accent}` : "none",
                    transition: "all 0.5s",
                  }}
                />
                {index === activeIndex && (
                  <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}>
                    <span style={{ color: text3, fontSize: 12, fontWeight: 500, letterSpacing: "0.08em" }}>{item.year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable content (internal container) */}
      <div
        ref={containerRef}
        style={{ height: "100%", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      >
        {/* Hide scrollbar (webkit) */}
        <style>{`div::-webkit-scrollbar{display:none}`}</style>

        {/* Section-scoped header (sticky inside timeline) */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, pointerEvents: "none", padding: "1rem 1rem 0.5rem" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <h1
              style={{
                fontWeight: 800,
                color: text1,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontSize: "clamp(1.75rem, 5vw, 4.5rem)",
              }}
            >
              Notre Histoire
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <div
                style={{ height: 2, width: "clamp(3rem, 6vw, 4rem)", borderRadius: 9999, backgroundColor: accent, transition: "all 0.7s" }}
              />
              <p
                style={{ color: text3, fontSize: "0.8rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                Parcours Smidjan
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: "8vh" }} />

        {TIMELINE_ITEMS.map((item, index) => (
          <div
            key={item.year}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={{ minHeight: "92vh", scrollSnapAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "3rem 1.25rem" }}
          >
            <div style={{ maxWidth: "72rem", width: "100%", margin: "0 auto" }}>
              <div style={{ display: "grid", gap: "2rem", alignItems: "center", gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}>
                {/* Left - Year Display (shows only on large screens similar to md transitions) */}
                <div
                  style={{ opacity: activeIndex === index ? 1 : 0, transform: activeIndex === index ? "translateX(0)" : "translateX(-20px)", transition: "opacity 1s ease, transform 1s ease" }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "clamp(5rem, 12vw, 12rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        userSelect: "none",
                        color: "transparent",
                        WebkitTextStroke: `2px ${accent}`,
                        opacity: 0.2,
                      }}
                    >
                      {item.year}
                    </div>
                    <div
                      style={{ position: "absolute", top: "25%", right: -24, width: 72, height: 72, borderRadius: "9999px", opacity: 0.2, filter: "blur(20px)", transition: "all 1s", backgroundColor: accent, transform: activeIndex === index ? "scale(1)" : "scale(0.5)" }}
                    />
                    <div
                      style={{ position: "absolute", bottom: "25%", left: -8, width: 96, height: 96, borderRadius: "9999px", opacity: 0.1, filter: "blur(28px)", transition: "all 1s 0.2s", backgroundColor: accent, transform: activeIndex === index ? "scale(1)" : "scale(0.5)" }}
                    />
                  </div>
                </div>

                {/* Right - Content */}
                <div style={{ opacity: activeIndex === index ? 1 : 0, transform: activeIndex === index ? "translateX(0)" : "translateX(20px)", transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s" }}>
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.75rem)", color: accent }}>{String(index + 1).padStart(2, "0")}</span>
                      <div style={{ flex: 1, height: 1, backgroundColor: "color-mix(in srgb, var(--color-accent-1), transparent 75%)" }} />
                    </div>
                    <h2 style={{ fontWeight: 800, color: text1, lineHeight: 1.1, letterSpacing: "-0.02em", fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}>{item.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBlock: 6 }}>
                      <div style={{ width: 48, height: 2, borderRadius: 9999, backgroundColor: accent }} />
                      <div style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: "color-mix(in srgb, var(--color-accent-1), transparent 40%)" }} />
                      <div style={{ width: 24, height: 2, borderRadius: 9999, backgroundColor: "color-mix(in srgb, var(--color-accent-1), transparent 60%)" }} />
                    </div>
                    <p style={{ color: text2, fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)", lineHeight: 1.7, fontWeight: 300, maxWidth: "42rem" }}>{item.text}</p>
                    <div style={{ paddingTop: 16, display: "grid", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: text3, fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        <span>Étape</span>
                        <span>
                          {index + 1} / {TIMELINE_ITEMS.length}
                        </span>
                      </div>
                      <div style={{ height: 4, borderRadius: 9999, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.05)" }}>
                        <div style={{ height: "100%", width: `${((index + 1) / TIMELINE_ITEMS.length) * 100}%`, background: "linear-gradient(90deg, var(--color-accent-1), var(--color-accent-2))", borderRadius: 9999, transition: "width 1s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ height: "8vh" }} />
      </div>

      {/* Scroll indicator (scoped to section) */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          transition: "opacity 0.7s",
          opacity: scrollProgress > 5 ? 0 : 1,
          pointerEvents: scrollProgress > 5 ? "none" : "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ color: text3, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}>Scroll</span>
          <div style={{ width: 20, height: 32, borderRadius: 12, border: "1px solid color-mix(in srgb, var(--color-text-3), transparent 40%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4 }}>
            <div style={{ width: 3, height: 8, borderRadius: 9999, background: accent, animation: "wheelBounce 1.4s ease-in-out infinite" }} />
          </div>
        </div>
        <style>{`@keyframes wheelBounce{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(6px);opacity:.7}}`}</style>
      </div>
    </div>
  );
}
