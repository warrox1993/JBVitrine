# AboutTimelineFix.md — Boutons visibles, autoplay, suppression du titre, colonne d’années

## Objectif

Corriger la timeline About pour :

1. afficher **les boutons Prev/Next**,
2. activer **le slider automatique**,
3. **supprimer le titre** “Responsive Slider Timeline”,
4. rendre **la colonne des années** (pagination) visible et cliquable côté desktop.

Aucune nouvelle couleur. On reste strictement sur les tokens du thème SMIDJAN.

---

## Résumé des causes probables

* Le `<h2>` de titre a été gardé (à retirer).
* Les **modules Swiper** nécessaires à l’autoplay n’étaient pas chargés.
* Conflit de **z-index** entre l’ellipse sombre (`.swiper-slide::after` z-index:1) et la pagination/boutons (z-index trop bas).
* La pagination existe mais reste **masquée** (display: none) hors breakpoint, ou derrière le slide.

---

## Correctifs à appliquer (bloquants)

### 1) Supprimer le titre

Dans `src/UIs/nextjs/src/app/about/Timeline.tsx` :

* Retirer la ligne du titre et sa classe associée.

```diff
- <h2 className="timeline-title">Responsive Slider Timeline</h2>
```

Supprimer aussi le bloc CSS `.timeline-title { ... }` si non réutilisé.

---

### 2) Activer navigation + autoplay (Swiper ESM)

Dans `Timeline.tsx`, **ajouter le module Autoplay**, et configurer `autoplay` :

```diff
- import { Navigation, Pagination, A11y } from "swiper/modules";
+ import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
...
- modules={[Navigation, Pagination, A11y]}
+ modules={[Navigation, Pagination, A11y, Autoplay]}
...
  <Swiper
    className="timeline-swiper"
    direction={"vertical"}
    loop={false}
    speed={1600}
+   autoplay={{
+     delay: 5000,
+     disableOnInteraction: false,   // continue après interaction
+     pauseOnMouseEnter: true,       // UX web: pause au survol
+   }}
    pagination={{
      el: ".timeline-pagination",
      clickable: true,
      renderBullet: (index, className) => {
        const year = TIMELINE_ITEMS[index]?.year ?? "";
        return `<span class="${className}">${year}</span>`;
      },
    }}
    navigation={{
      nextEl: ".timeline-button-next",
      prevEl: ".timeline-button-prev",
    }}
    breakpoints={{ 768: { direction: "horizontal" } }}
  >
```

> L’autoplay est volontairement à 5 s. Ajuste si tu veux un rythme plus nerveux (3000 ms).

---

### 3) Forcer visibilité/z-index de la pagination et des boutons

Dans `timeline.css`, **hausser les z-index** et s’assurer du positionnement.

```diff
-.timeline .timeline-pagination {
-  right: 15% !important;
-  height: 100%;
-  display: none;
-  flex-direction: column;
-  justify-content: center;
-  font-style: italic;
-  font-weight: 300;
-  font-size: 18px;
-  z-index: 1;
-  position: absolute;
-  top: 0;
-}
+.timeline .timeline-pagination {
+  position: absolute;
+  top: 0;
+  right: 15% !important;
+  height: 100%;
+  display: none;                  /* visible >= 768px */
+  flex-direction: column;
+  justify-content: center;
+  font-style: italic;
+  font-weight: 300;
+  font-size: 18px;
+  z-index: 4;                     /* au-dessus du halo et des slides */
+  pointer-events: auto;
+}
```

Boutons:

```diff
-.timeline .timeline-button-next,
-.timeline .timeline-button-prev {
+.timeline .timeline-button-next,
+.timeline .timeline-button-prev {
   background-size: 20px 20px;
   top: 15%;
   width: 20px;
   height: 20px;
   margin-top: 0;
-  z-index: 2;
+  z-index: 5;                    /* au-dessus de tout */
   transition: transform .2s ease;
   position: absolute;
   background-repeat: no-repeat;
+  cursor: pointer;
}
```

> Raison: le halo (`.swiper-slide::after`) était en z-index:1, les bullets à 1 aussi. On met pagination à 4, boutons à 5 pour garantir le clic.

---

### 4) Assurer l’affichage desktop de la colonne d’années

Le CSS masquait la pagination en mobile. On la **montre** en ≥768px:

```diff
 @media (min-width: 768px) {
-  .timeline .timeline-pagination { display: flex; }
+  .timeline .timeline-pagination { display: flex; }
 }
```

Déjà présent dans ta version — conserve-le. Si la pagination n’apparaît toujours pas, ajoute un fond temporaire pour debug:

```css
/* DEBUG — à retirer après vérif
.timeline .timeline-pagination { outline: 1px dashed rgba(255,255,255,.2); }
*/
```

---

### 5) Contraste des icônes de navigation

Tes icônes utilisent un **SVG en data-URL** avec une couleur codée. Remplace par le **token** pour rester 100% thème (même rendu visuel):

```diff
- fill='%23d4a024'
+ fill='%23d4a024' /* OK si var(--tl-accent) = #d4a024 */
```

Si tu veux 0 hard-code, bascule en **mask** + background-color tokenisé:

```css
.timeline .timeline-button-prev,
.timeline .timeline-button-next {
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  background-color: var(--tl-accent);
  background-image: none;
}
.timeline .timeline-button-prev {
  -webkit-mask-image: url('/icons/chev-left.svg');
  mask-image: url('/icons/chev-left.svg');
}
.timeline .timeline-button-next {
  -webkit-mask-image: url('/icons/chev-right.svg');
  mask-image: url('/icons/chev-right.svg');
}
```

---

## Version consolidée des fichiers (copie-coller)

### `Timeline.tsx` (extrait clé, sans le h2)

```tsx
"use client";

import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";
import "./timeline.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Timeline() {
  return (
    <section className="timeline-container" aria-label="Parcours SMIDJAN">
      <div className="timeline">
        <Swiper
          className="timeline-swiper"
          modules={[Navigation, Pagination, A11y, Autoplay]}
          direction={"vertical"}
          loop={false}
          speed={1600}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{
            el: ".timeline-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              const year = TIMELINE_ITEMS[index]?.year ?? "";
              return `<span class="${className}">${year}</span>`;
            },
          }}
          navigation={{ nextEl: ".timeline-button-next", prevEl: ".timeline-button-prev" }}
          breakpoints={{ 768: { direction: "horizontal" } }}
        >
          {TIMELINE_ITEMS.map((item, idx) => (
            <SwiperSlide key={item.year + idx} data-year={item.year} aria-label={`${item.year} — ${item.title}`}>
              <div className="slide-bg" style={{ backgroundImage: `url(${item.imageUrl})` }} />
              <div className="swiper-slide-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-h3">{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="timeline-button-prev" aria-label="Précédent" />
        <div className="timeline-button-next" aria-label="Suivant" />
        <div className="timeline-pagination" />
      </div>
    </section>
  );
}
```

### `timeline.css` (diffs essentiels déjà montrés)

* z-index pagination: **4**
* z-index boutons: **5**
* pagination visible ≥768px
* curseur pointer sur les boutons
* suppression du style du `<h2>` si non réutilisé

---

## Tests manuels (rapides)

1. Desktop ≥ 1280px :

    * Les **années** s’affichent en colonne droite, clic → change de slide.
    * Les **boutons** sont visibles et cliquables. Hover → petite translation.
2. Mobile 375–414px :

    * **Pas** de colonne d’années (cachée), navigation swipe OK.
3. Autoplay :

    * Les slides avancent toutes les ~5 s.
    * Survol desktop → pause, sortie → reprend.
4. Accessibilité :

    * Tab focus atteint Prev/Next.
    * Contraste texte sur image OK (halo sombre).

---

## Si la colonne des années n’apparaît toujours pas

* Assure-toi que **`.timeline-pagination`** est **sœur** directe du `<Swiper>` (c’est le cas).
* Ouvre DevTools → onglet **Elements**, cherche `.timeline-pagination` :

    * Vérifie **`display:flex`** appliqué en ≥768px.
    * Vérifie **z-index** effectif (Computed) > 1.
    * Vérifie qu’elle **n’est pas couverte** par un parent avec `overflow:hidden` et z-index supérieur. Le parent `.timeline` peut garder `overflow: visible` si besoin.

```diff
-.timeline { overflow: initial; } /* s'il y avait un overflow cachant la pagination */
```

---

## Done = Validation

* Boutons visibles et cliquables.
* Slider autoplay fluide, pause au survol.
* Titre supprimé.
* Colonne d’années visible en desktop, clickable, avec dot actif.

Ensuite, on verrouille le contenu éditorial des 6 jalons (titres courts, une ligne d’impact, une métrique mesurable par jalon), pour coller à ton storytelling pro.
