# AboutMission.md — Rebuild “Notre mission” ONLY (scopé, tokens, sans émojis)

## But

Remplacer **uniquement** la section “Notre mission” de la page About par une version propre, alignée au thème SMIDJAN.
Contraintes fortes: **Next.js App Router**, **CSS pur**, **tokens existants**, **zéro emoji**, **aucun impact** sur les autres sections.

---

## Portée (strictement)

* Ajouter 2 fichiers et 1 import:

    * `src/UIs/nextjs/src/app/about/Mission.tsx`
    * `src/UIs/nextjs/src/app/about/mission.css`
    * Import de `Mission` dans `about/page.tsx`
* Ne **pas** modifier header/logo/nav ou styles globaux.
* Réutiliser le style bouton maison (classe `.btn .btn--primary`) déjà en place.

---

## Mapping couleurs (tokens → ex-hex)

* Accent (ex-#ff8c42) → `var(--color-accent-1)`
* Fond section → `var(--color-bg-1)`
* Texte principal → `var(--color-fg-1)`
* Texte secondaire → `var(--color-fg-2)`
* Texte ternaire → `var(--color-fg-3)`
* Bordure légère → `var(--color-border, rgba(255,255,255,.12))`

---

## 1) Composant — `about/Mission.tsx`

```tsx
"use client";

import "./mission.css";

export default function Mission() {
  return (
    <section className="mission" aria-labelledby="mission-title">
      {/* BG animé (isolé dans la section, aucun effet hors portée) */}
      <div className="mission__bg" aria-hidden="true">
        <span className="mission__orb mission__orb--1" />
        <span className="mission__orb mission__orb--2" />
        <span className="mission__orb mission__orb--3" />
      </div>

      <div className="mission__wrap">
        <header className="mission__header">
          <span className="mission__tag">Notre mission</span>
          <h2 id="mission-title" className="mission__title">
            Forger l’excellence numérique
          </h2>
        </header>

        <div className="mission__grid" role="list">
          {/* Carte 1 */}
          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M3 20h18M5 20l2-7 5-5 5 5 2 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">La forge technique</h3>
            <p className="mcard__text">
              Nous transformons le code brut en expériences raffinées. Chaque ligne est forgée avec précision, chaque interface sculptée avec intention.
            </p>
          </article>

          {/* Carte 2 */}
          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">L’art & la science</h3>
            <p className="mcard__text">
              Notre approche marie excellence technique et sensibilité artistique pour créer des produits qui inspirent confiance et fluidité.
            </p>
          </article>

          {/* Carte 3 */}
          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M3 12h6v9H3zM15 3h6v18h-6zM9 7h6v14H9z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">Impact mesurable</h3>
            <p className="mcard__text">
              Nous visons des résultats tangibles. Chaque décision est guidée par des métriques claires et des effets concrets pour votre marque.
            </p>
          </article>
        </div>

        <blockquote className="mission__statement">
          <p className="mission__quote">
            SMIDJAN est né d’une conviction : <span className="hl">la technologie n’est pas un but, c’est un matériau</span>. Comme une forge, nous transformons ce matériau — code, données, interfaces — en <span className="hl">expériences utiles, élégantes et durables</span>.
          </p>
        </blockquote>

        <div className="mission__cta">
          {/* Réutilise le style bouton du site */}
          <a href="#contact" className="btn btn--primary" aria-label="Discuter de votre vision">
            Discuter de votre vision
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 2) Styles — `about/mission.css` (scopés, tokens, perf-friendly)

```css
:root{
  --acc: var(--color-accent-1, #d4a024);
  --bg: var(--color-bg-1, #0b0f14);
  --fg: var(--color-fg-1, #ffffff);
  --fg2: var(--color-fg-2, #c7c7c7);
  --fg3: var(--color-fg-3, #9aa0a6);
  --bd: var(--color-border, rgba(255,255,255,.12));
  --radius: 20px;
}

/* SECTION */
.mission{
  position: relative;
  isolation: isolate;
  background: transparent;
  color: var(--fg);
  padding: clamp(48px, 6vw, 96px) 0;
  overflow: clip; /* rien ne déborde hors section */
}
.mission__wrap{
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(12px, 3vw, 32px);
}

/* BG animé — limité à la section */
.mission__bg{
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}
.mission__orb{
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: .25;
  animation: mission-float 20s ease-in-out infinite;
  will-change: transform;
}
.mission__orb--1{
  width: 520px; height: 520px; top: -12%; left: -12%;
  background: radial-gradient(circle, color-mix(in srgb, var(--acc), transparent 0%), transparent 70%);
  animation-delay: 0s;
}
.mission__orb--2{
  width: 420px; height: 420px; bottom: -18%; right: -10%;
  background: radial-gradient(circle, color-mix(in srgb, var(--acc), black 20%), transparent 70%);
  animation-delay: 5s;
}
.mission__orb--3{
  width: 360px; height: 360px; top: 40%; right: 18%;
  background: radial-gradient(circle, color-mix(in srgb, var(--acc), black 40%), transparent 70%);
  animation-delay: 10s;
}
@supports not (color-mix(in srgb, white, black)){
  .mission__orb--1{ background: radial-gradient(circle, rgba(212,160,36,.6), transparent 70%); }
  .mission__orb--2{ background: radial-gradient(circle, rgba(178,134,28,.6), transparent 70%); }
  .mission__orb--3{ background: radial-gradient(circle, rgba(130,98,21,.6), transparent 70%); }
}
@keyframes mission-float{
  0%,100%{ transform: translate(0,0) scale(1); }
  33%{ transform: translate(50px,-50px) scale(1.06); }
  66%{ transform: translate(-30px,30px) scale(.94); }
}
@media (prefers-reduced-motion: reduce){
  .mission__orb{ animation: none; }
}

/* HEADER */
.mission__header{ text-align: center; margin-bottom: clamp(24px, 5vw, 56px); }
.mission__tag{
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255,255,255,.04);
  border: 1px solid color-mix(in srgb, var(--acc), white 15%);
  color: var(--acc);
  font-size: .86rem;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.mission__title{
  margin: 10px 0 0;
  font-weight: 800;
  font-size: clamp(1.8rem, 1.2rem + 2.2vw, 3rem);
  background: linear-gradient(135deg, var(--fg) 0%, var(--acc) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* GRID DE CARTES */
.mission__grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
  gap: clamp(16px, 3vw, 28px);
  margin-top: clamp(16px, 3vw, 32px);
}
.mcard{
  position: relative;
  padding: clamp(18px, 2.5vw, 28px);
  border-radius: var(--radius);
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  backdrop-filter: blur(8px);
  transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s cubic-bezier(.4,0,.2,1), border-color .25s ease;
  will-change: transform;
  overflow: hidden;
}
.mcard::before{
  content:"";
  position:absolute; inset:0 0 auto 0; height:3px;
  background: linear-gradient(90deg, var(--acc), color-mix(in srgb, var(--acc), black 20%));
  transform: scaleX(0); transform-origin: left;
  transition: transform .5s ease;
}
.mcard:hover{
  transform: translateY(-6px);
  background: rgba(255,255,255,.05);
  border-color: color-mix(in srgb, var(--acc), white 20%);
  box-shadow: 0 18px 48px rgba(0,0,0,.35);
}
.mcard:hover::before{ transform: scaleX(1); }

.mcard__icon{
  width: 64px; height: 64px; border-radius: 16px;
  display: grid; place-items:center;
  margin-bottom: 14px;
  color: var(--acc);
  background: linear-gradient(135deg, color-mix(in srgb, var(--acc), white 80%), color-mix(in srgb, var(--acc), transparent 90%));
}
.icon{ width: 28px; height: 28px; }

.mcard__title{
  font-size: 1.2rem; font-weight: 800; color: var(--acc);
  margin: 4px 0 8px;
}
.mcard__text{
  color: var(--fg3);
  line-height: 1.7;
  font-size: .98rem;
}

/* CITATION / MISSION */
.mission__statement{
  margin: clamp(24px, 5vw, 48px) auto 0;
  max-width: 900px;
  padding: clamp(18px, 3vw, 32px);
  border-radius: 28px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--acc), transparent 90%), rgba(255,255,255,.04));
  border: 1px solid color-mix(in srgb, var(--acc), white 20%);
  position: relative; overflow: hidden;
}
.mission__statement::before{
  content:""; position:absolute; inset:-50% -50% auto auto;
  width:200%; height:200%;
  background: radial-gradient(circle, color-mix(in srgb, var(--acc), transparent 80%), transparent 70%);
  animation: mission-rotate 22s linear infinite;
}
@keyframes mission-rotate{ to { transform: rotate(360deg);} }
@media (prefers-reduced-motion: reduce){
  .mission__statement::before{ animation: none; }
}
.mission__quote{
  position: relative; z-index: 1;
  font-size: clamp(1.05rem, .9rem + .6vw, 1.25rem);
  line-height: 1.9;
  color: var(--fg2);
}
.hl{ color: var(--acc); font-weight: 600; }

/* CTA */
.mission__cta{
  text-align: center;
  margin-top: clamp(20px, 4vw, 40px);
}

/* Responsive affiné */
@media (max-width: 768px){
  .mission{ padding: 56px 0; }
}
```

---

## 3) Intégration — `about/page.tsx` (section ciblée uniquement)

```tsx
import Mission from "./Mission";

export default function AboutPage(){
  return (
    <>
      {/* … autres sections About … */}
      <Mission />
      {/* … suite … */}
    </>
  );
}
```

---

## 4) Nettoyage / Remplacements par rapport au code fourni

* Enlevé **header/logo/nav** (hors périmètre).
* Remplacé tous les **emojis** par des **icônes SVG** internes.
* Converti toutes les couleurs **en tokens**.
* Animations limitées à la **section** (isolation + prefers-reduced-motion).
* Bouton: réutilise `.btn .btn--primary` déjà présent (aucune redéfinition globale).

---

## 5) Tests d’acceptation (bloquant)

* La section **n’affecte aucun autre composant** (aucun style global modifié).
* Aucune nouvelle couleur introduite; tokens uniquement.
* Lighthouse: pas d’alertes de contraste; animations respectent `prefers-reduced-motion`.
* Le bouton reprend exactement le style des autres CTA du site.
* Pas de scroll horizontal, pas de débordement.

Quand c’est validé, on branchera les textes sur des **données** (JSON/MDX) pour éditer la mission sans toucher au code, et on ajoutera des tests visuels légers (Playwright snapshot) pour éviter les régressions.
