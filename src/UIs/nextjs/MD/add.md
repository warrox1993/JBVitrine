````markdown
---
title: Fix & small refactor – testimonials, showreel offset, process accordion, services reshuffle
scope: home page only
impact: visual polish + UX clarity, no breaking changes expected
---

## 1) Testimonials (“Ils nous font confiance”) → simple auto-carousel

**Goal**: keep the current minimalist look, but rotate 5 different quotes automatically.
**Selector**: `.proof-module` (container) with each item as `.proof-item`.

---
title: Amendement — Témoignages en JS autoplay (avec contrôle manuel)
scope: home page — section "Ils nous font confiance"
impact: UX fluide, accessible, performant; pas de lib externe
---

## HTML (remplace le bloc existant)
<section class="proof-module" aria-label="Témoignages">
  <div class="proof-track" role="list" id="proofTrack">
    <article class="proof-item" role="listitem" tabindex="0">
      <blockquote>“L’équipe a transformé notre vision en une expérience web exceptionnelle.”</blockquote>
      <footer><span class="proof-name">Sarah Laurent</span> — <span class="proof-role">CMO, TechStart</span></footer>
    </article>
    <article class="proof-item" role="listitem" tabindex="0">
      <blockquote>“Code propre, planning tenu, résultats mesurables dès le mois 1.”</blockquote>
      <footer><span class="proof-name">Marc Dubois</span> — <span class="proof-role">CTO, Innovate</span></footer>
    </article>
    <article class="proof-item" role="listitem" tabindex="0">
      <blockquote>“UX orientée conversion. Notre CAC a baissé de 23%.”</blockquote>
      <footer><span class="proof-name">Aïcha Benali</span> — <span class="proof-role">Growth Lead, DigitalFlow</span></footer>
    </article>
    <article class="proof-item" role="listitem" tabindex="0">
      <blockquote>“Accompagnement clair, zéro surprise, perf Lighthouse au vert.”</blockquote>
      <footer><span class="proof-name">Lucas Peters</span> — <span class="proof-role">Founder, Nexus</span></footer>
    </article>
    <article class="proof-item" role="listitem" tabindex="0">
      <blockquote>“Refonte SEO + React: +61% de leads qualifiés en 90 jours.”</blockquote>
      <footer><span class="proof-name">Chloé Martin</span> — <span class="proof-role">Marketing Director, Quantum</span></footer>
    </article>
  </div>
</section>

## CSS (même design, sans animation CSS)
.proof-module { position: relative; overflow: hidden; }
.proof-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.proof-track::-webkit-scrollbar { display: none; }

.proof-item {
  scroll-snap-align: center;
  padding: clamp(24px, 5vw, 48px) 0;
  display: grid;
  place-items: center;
  text-align: center;
}
.proof-item blockquote { font-style: italic; max-width: 900px; line-height: 1.6; }
.proof-item footer { margin-top: 16px; opacity: .9; }

## JS (autoplay + pause on hover/focus + visibilité)
<script>
(() => {
  const track = document.getElementById('proofTrack');
  if (!track) return;

  const items = Array.from(track.children);
  const intervalMs = 7000; // tempo d’autoplay
  let timer = null, isPaused = false, isVisible = true;

  // util: index de la slide visible
  const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth);

  // défilement vers l’index demandé
  function goTo(i) {
    const clamped = ((i % items.length) + items.length) % items.length;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  }

  // autoplay cyclique
  function start() {
    if (timer || isPaused || !isVisible || prefersReducedMotion()) return;
    timer = setInterval(() => goTo(currentIndex() + 1), intervalMs);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restartSoon() {
    stop();
    if (!isPaused && isVisible && !prefersReducedMotion()) {
      timer = setTimeout(() => { start(); }, 1200);
    }
  }
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // pause au survol / focus clavier
  track.addEventListener('pointerenter', () => { isPaused = true; stop(); });
  track.addEventListener('pointerleave', () => { isPaused = false; start(); });
  track.addEventListener('focusin', () => { isPaused = true; stop(); });
  track.addEventListener('focusout', () => { isPaused = false; start(); });

  // relance après une interaction manuelle
  let userScroll;
  track.addEventListener('scroll', () => {
    clearTimeout(userScroll);
    userScroll = setTimeout(restartSoon, 300);
  }, { passive: true });

  // navigation clavier (flèches)
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); restartSoon(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex() - 1); restartSoon(); }
  });

  // lancer uniquement quand visible
  const io = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    isVisible ? start() : stop();
  }, { threshold: 0.3 });
  io.observe(track);

  // init
  if (!prefersReducedMotion()) start();
})();
</script>

---

## 2) “Projets qui marquent” – lift `showreel-module` by 5px

**Problem**: the block slightly overlaps the line below.
**Selector**: `.showreel-module`

### CSS (choose one of the two)

Option A – nudge up:

```css
.showreel-module { transform: translateY(-5px); }
```

Option B – margin fix:

```css
.showreel-module { margin-bottom: calc(var(--space-lg, 32px) - 5px); }
```

**Line rule** (if the issue is the divider):

```css
.section-divider { /* the thin horizontal line under the block */
  /* either remove it on this section… */
  display: none; /* only on the affected section via a more specific selector */
  /* …or push it down a bit */
  /* margin-top: 5px; */
}
```

---

## 3) “Notre Processus Créatif” → convert `.process-module` into an accordion

**Goal**: same theme, cleaner mobile UX, keyboard accessible.
**Markup**: use native `<details>/<summary>` for accessibility (no JS required).

### HTML (replace the 4 cards grid)

```html
<section class="process-module" aria-label="Processus créatif">
  <details class="process-acc" open>
    <summary><span class="step">01</span> Découverte</summary>
    <div class="panel">Analyse approfondie des objectifs, contexte marché, risques, contraintes.</div>
  </details>
  <details class="process-acc">
    <summary><span class="step">02</span> Conception</summary>
    <div class="panel">Design system, wireframes, prototypage interactif, tests rapides.</div>
  </details>
  <details class="process-acc">
    <summary><span class="step">03</span> Développement</summary>
    <div class="panel">Code propre, perfs optimisées, CI, tests, sécurité.</div>
  </details>
  <details class="process-acc">
    <summary><span class="step">04</span> Lancement</summary>
    <div class="panel">Déploiement, monitoring, support continu, itérations.</div>
  </details>
</section>
```

### CSS (match your cards look)

```css
.process-module { display: grid; gap: 16px; }
.process-acc {
  background: var(--card-bg, rgba(255,255,255,.02));
  border: 1px solid var(--card-border, rgba(255,255,255,.08));
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
}
.process-acc summary {
  list-style: none;
  cursor: pointer;
  padding: 20px 24px;
  display: flex; align-items: center; gap: 12px;
  font-weight: 600;
}
.process-acc summary::-webkit-details-marker { display: none; }
.process-acc .step {
  font-weight: 800; opacity: .15; font-size: clamp(18px, 3vw, 24px);
}
.process-acc .panel { padding: 0 24px 20px 24px; opacity: .9; }
.process-acc[open] { box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset; }
```

---

## 4) “Services Excellence” – merge and create two new services

**Goal**: keep 3 cards. Merge the content of “Design UI/UX Premium” and “Branding Digital” **into** “Développement Web”. Add 2 new cards: “Cybersécurité Web” and “Automatisation n8n & IA”.

### HTML (replace the three cards grid)

```html
<section class="services-excellence" aria-label="Services">
  <div class="services-grid">
    <!-- 1) Développement Web (fusion) -->
    <article class="service-card service-dev">
      <h3>Développement Web</h3>
      <p>Applications performantes avec Next.js, React, TypeScript – UI/UX premium intégré et identité cohérente.</p>
      <ul>
        <li>Code scalable & performance maximale</li>
        <li>Design system & prototypage intégrés</li>
        <li>SEO technique & accessibilité</li>
        <li>Brand guidelines appliquées</li>
      </ul>
      <div class="service-cta">Sur devis</div>
      <a class="btn-primary" href="#contact">Démarrer un projet</a>
    </article>

    <!-- 2) Cybersécurité Web -->
    <article class="service-card service-cyber">
      <h3>Cybersécurité Web</h3>
      <p>Sécurisation bout-à-bout des applications et de la chaîne CI/CD.</p>
      <ul>
        <li>Audit OWASP, durcissement headers & CSP</li>
        <li>Auth & gestion secrets, Key Vault / KMS</li>
        <li>Tests SAST/DAST, revues de code</li>
        <li>Monitoring & réponse aux incidents</li>
      </ul>
      <div class="service-cta">Sur devis</div>
      <a class="btn-secondary" href="#contact">Démarrer un projet</a>
    </article>

    <!-- 3) Automatisation n8n & IA -->
    <article class="service-card service-auto">
      <h3>Automatisation n8n & IA</h3>
      <p>Workflows sans couture pour gagner du temps et scaler les opérations.</p>
      <ul>
        <li>Intégrations n8n (CRM, email, facturation)</li>
        <li>Agents & assistants IA sur mesure</li>
        <li>Scraping légal / reporting automatisé</li>
        <li>Observabilité & alertes</li>
      </ul>
      <div class="service-cta">Sur devis</div>
      <a class="btn-secondary" href="#contact">Démarrer un projet</a>
    </article>
  </div>
</section>
```

### CSS (keeps your existing look)

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: clamp(16px, 3vw, 28px);
}
@media (max-width: 980px) {
  .services-grid { grid-template-columns: 1fr; }
}

.service-card {
  background: var(--card-bg, rgba(255,255,255,.02));
  border: 1px solid var(--card-border, rgba(255,255,255,.08));
  border-radius: 20px;
  padding: clamp(20px, 3vw, 28px);
}
.service-card h3 { margin: 0 0 8px; }
.service-card p { opacity: .9; margin-bottom: 12px; }
.service-card ul { margin: 0 0 16px 0; padding-left: 18px; }
.service-cta { font-weight: 800; font-size: 22px; margin-bottom: 12px; }
.btn-primary, .btn-secondary { display: inline-block; }
```

---

## QA checklist

* Testimonials auto-rotate without jank; manual swipe still possible on touch.
* No overflow under “Projets” after the 5px adjustment or divider change.
* Accordion is keyboard accessible (Enter/Space on `<summary>`).
* Services section shows exactly 3 cards: Dev (merged), Cyber, Automatisation.

```

````markdown
---
title: Amendement — Progress bar overlay + fluidité, et remplacement Dribbble → Facebook (footer)
scope: global (progress bar), footer only (social icon)
impact: meilleure lisibilité de la barre, animation fluide, lien social corrigé
---

## A) Progress bar — ne plus être coupée + animation fluide
**Problèmes observés**
- La barre est partiellement masquée quand elle croise `.showreel-module`, `.process-module`, `.services-excellence` (clipping par `overflow`/nouveaux contextes de stacking).
- L’animation n’est pas fluide (listener `scroll` déclenché trop souvent, calculs non rAF).

**Correctifs**
1) **Isoler la barre en overlay global** (hors de toute section) et empêcher toute interaction.
2) **Forcer la priorité de rendu** avec un `z-index` très élevé et un layer dédié.
3) **Calculer la progression via `requestAnimationFrame`** pour la fluidité.

### HTML (placer juste avant `</body>`)
```html
<div id="pageProgress" class="progress-bar" aria-hidden="true"></div>
````

### CSS

```css
/* overlay global, jamais clippé par des parents */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px; /* adapter si besoin */
  width: 100%;
  pointer-events: none;
  z-index: 2147483646; /* > tout, y compris sidebars/fixed */
  /* fond “vide” + ligne progress via pseudo-élément pour moins de repaints */
  background: transparent;
  isolation: isolate;            /* crée un nouveau contexte pour éviter les mixes étranges */
  contain: layout paint style;   /* limite l'impact */
}
.progress-bar::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  transform: scaleX(var(--progress, 0));
  transform-origin: 0 50%;
  height: 100%;
  /* réutiliser votre gradient/teinte */
  background: linear-gradient(90deg, var(--brand-500), var(--brand-400));
  will-change: transform;
  /* petit lissage pour éviter l’effet “à-coups” sans retarder la sensation de direct */
  transition: transform .08s linear;
}

/* éviter tout recouvrement local créé par des sections transformées */
.showreel-module,
.process-module,
.services-excellence {
  /* ne pas mettre de z-index élevé ici si vous avez des transforms */
  /* si nécessaire, retirer overflow: hidden; uniquement sur les bords supérieurs */
  /* overflow: clip; peut être conservé si la barre est en fixed + z-index max */
}
```

### JS (rAF + visibilité)

```html
<script>
(() => {
  const bar = document.getElementById('pageProgress');
  if (!bar) return;

  let ticking = false;

  function update() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const p = Math.min(1, Math.max(0, scrollTop / max));
    bar.style.setProperty('--progress', p.toFixed(5));
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // Démarrage + écoute passive
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Optionnel: pause si onglet inactif
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') onScroll();
  });
})();
</script>
```

> Notes techniques
>
> * La barre est fixée au `body` en dernier enfant, donc **aucun parent** ne peut la clipper.
> * Si une section utilise `transform` + `z-index`, éviter de dépasser `z-index: 2147483646` sur ces sections.
> * Si certains modules ont `overflow: hidden` strict au top, garder la barre en `position: fixed` suffit pour éviter le clipping.

---

## B) Footer — remplacer l’icône + lien Dribbble → Facebook

### HTML (remplacer l’entry Dribbble existante)

```html
<li class="social-item">
  <a class="social-link social-facebook" href="https://www.facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <!-- Icône Facebook (SVG inline pour garder le style) -->
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v6h3v-6h2.1l.4-3H13v-1.3c0-.4.1-.7.6-.7Z" fill="currentColor"/>
    </svg>
    <span class="sr-only">Facebook</span>
  </a>
</li>
```

### CSS (harmoniser avec vos autres icônes)

```css
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--card-bg, rgba(255,255,255,.06));
  color: var(--text-weak, #cfcfe6);
  transition: transform .15s ease, background .15s ease, color .15s ease;
}
.social-link .icon { width: 18px; height: 18px; }

/* hover/focus */
.social-link:focus-visible,
.social-link:hover {
  background: var(--brand-500, #8b5cf6);
  color: #0b0b10;
  transform: translateY(-1px);
}

/* variante si vous avez une teinte spécifique Facebook */
.social-facebook:hover { background: var(--fb, #1877f2); color: #ffffff; }
```

**Checklist**

* La barre reste visible et non coupée au-dessus de tous les modules.
* Le mouvement est lissé via rAF.
* Le lien Dribbble n’existe plus; l’icône + URL Facebook fonctionnent et héritent de vos styles.

```