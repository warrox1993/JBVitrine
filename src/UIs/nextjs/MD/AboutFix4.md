````markdown
# SMIDJAN — HEADER PROGRESS BAR FIX (Z-INDEX / STACKING CONTEXT)

**Contexte**  
La barre de progression du **header** s’affiche mal / passe **sous** certains éléments. Avant, tout fonctionnait : une régression de stacking context (z-index) a probablement été introduite (transform, filter, positionnement ou nouveau wrapper).  
**Objectif** : restaurer un rendu **au-dessus de tout** (header sticky, menus, hero, overlays), sans clignotements, sans CLS, et avec un code factorisé.

---

## 0) Règles non négociables

- La progress bar doit être **visible sur toutes les pages**, **au-dessus** des contenus et **sous** d’éventuels modals système (si vous en avez).
- **Aucune nouvelle dépendance**.  
- **Aucune duplication CSS** : réutiliser les tokens `--z-*`, `--color-*`, `--space-*`.  
- **Aucun transform/filter** sur les parents directs de la barre (évite les stacking contexts parasites).  
- **Pointer-events: none** sur la barre (pas d’interception de clics).  
- **Aucun CLS** (layout shift) au montage.

---

## 1) Hypothèses de cause (diagnostic express)

1. Un parent du header ou de la barre porte un **`transform`** / **`filter`** / **`opacity < 1`** / **`mix-blend-mode`** → crée un **nouveau stacking context** qui “emprisonne” le z-index.  
2. La barre est **`position: absolute`** dans un conteneur non sticky/fixed → passe sous le flux.  
3. **`z-index` tokens** : la valeur du header/overlay a été modifiée, la barre n’est plus au top.  
4. Un **overlay** (ex. menu mobile) possède `z-index` supérieur non contrôlé.  
5. Un **portal** a disparu et la barre est redevenue locale au header.

> On va corriger pour **toutes** ces situations.

---

## 2) Tokens & conventions (à centraliser si absent)

Dans `globals.css` (ou `tokens.css`), garantir les **valeurs uniques** :

```css
:root {
  /* Z layers - ordonné par importance (bas → haut) */
  --z-base: 0;
  --z-header: 100;              /* Header sticky (nav) */
  --z-sidebar: 200;             /* Sidebar de page */
  --z-progress: 999;            /* Progress bar au-dessus de tout le layout */
  --z-modal: 1000;              /* Modals, toasts... (si existants) */

  /* Couleurs/épaisseur de barre */
  --progress-height: 3px;
  --progress-color: var(--color-accent, #F5A623);
  --progress-bg: transparent;
}
````

> Si vous avez déjà des tokens `--z-*`, **réutilisez-les** et choisissez `--z-progress` > à tout le reste (sauf modal/toasts si besoin).

---

## 3) CSS robuste de la progress bar

```css
/* Progress bar globale (hors stacking piégeux) */
.progressbar {
  position: fixed;         /* toujours au viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: var(--progress-height);
  background: var(--progress-bg);
  z-index: var(--z-progress);       /* au-dessus de header, sidebar, hero */
  pointer-events: none;             /* ne bloque aucun clic */

  /* Optionnel : légère ombre pour lisibilité */
  box-shadow: 0 0 0.5px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.12);
}

.progressbar__inner {
  height: 100%;
  width: 0%;
  background: var(--progress-color);
  transform-origin: left center;

  /* Animations fluides */
  transition: width 120ms ease-out;
}

/* Pour les pages avec header sticky + blur : neutraliser stacking context du header si nécessaire */
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  /* Éviter de mettre transform/filter ici */
}
```

> Si le header applique `backdrop-filter` (créateur de stacking context), **ça n’empêche plus** la barre (en fixed) d’être visible si son `z-index` est global et le parent n’est pas transformé.

---

## 4) Composant React (Next.js) — approche PORTAL (anti-conflit)

Pour sortir la barre de **tous** les stacking contexts locaux, on la rend via **portal** dans `document.body`. Créez `src/components/ui/ProgressBar.tsx` :

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ProgressBar() {
  const [mounted, setMounted] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Exemple de progression : écoute d’un event global, route change, fetch, etc.
    // Ici on expose une API simple :
    (window as any).__progress = {
      set: (pct: number) => {
        const clamped = Math.max(0, Math.min(100, pct));
        if (innerRef.current) innerRef.current.style.width = clamped + '%';
      },
      done: () => {
        if (innerRef.current) innerRef.current.style.width = '100%';
        setTimeout(() => {
          if (innerRef.current) innerRef.current.style.width = '0%';
        }, 250);
      }
    };
    return () => { delete (window as any).__progress; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="progressbar" aria-hidden="true">
      <div className="progressbar__inner" ref={innerRef} />
    </div>,
    document.body
  );
}
```

**Intégration dans `layout.tsx` (App Router)**

```tsx
// src/app/layout.tsx
import ProgressBar from '@/components/ui/ProgressBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Header sticky global */}
        {/* <Header /> */}

        {/* Barre de progression au-dessus de tout (portal) */}
        <ProgressBar />

        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
```

---

## 5) Éviter les stacking contexts parasites (audit rapide)

* **À proscrire sur des parents du header / body :**

    * `transform`, `filter`, `perspective`, `mix-blend-mode`, `isolation: isolate`, `opacity < 1`, `will-change: transform` abusif.
* **À vérifier :**

    * `.site-header`, `.layout`, `.page-wrap`, `.hero` n’appliquent **aucun** transform/filter sur le conteneur principal.
    * Les overlays (menus mobiles) utilisent **`z-index < var(--z-progress)`** si la barre doit passer dessus.

        * Si vous souhaitez l’inverse (menu au-dessus), inverser la hiérarchie : `--z-modal` > `--z-progress`.

---

## 6) Gestion des changements de route (Next.js)

Option : animer la barre pendant les navigations. Dans `src/app/providers/RouteProgressProvider.tsx` :

```tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteProgressProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const p = (window as any).__progress;
    if (!p) return;
    p.set(15);             // départ
    const t1 = setTimeout(() => p.set(55), 120);
    const t2 = setTimeout(() => p.set(85), 240);
    const t3 = setTimeout(() => p.done(), 400);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      p.done();
    };
  }, [pathname]);

  return null;
}
```

Et inclure ce provider dans `layout.tsx` (après `<ProgressBar />`) :

```tsx
<ProgressBar />
<RouteProgressProvider />
```

---

## 7) Tests d’acceptation

* [ ] **Z-index** : la barre est visible **au-dessus** du header, hero, sidebar, carrousels, et contenus animés.
* [ ] **Aucun CLS** : l’apparition n’entraîne aucun décalage (position fixed).
* [ ] **Aucun conflit** : les menus overlays / modals affichent la bonne hiérarchie (selon votre choix).
* [ ] **Pointer-events** : aucun lien de la page n’est bloqué.
* [ ] **Cross-route** : la progression s’anime lors d’un changement de route (App Router).
* [ ] **Aucune console error** (hydration / portal).
* [ ] **Responsive** : la barre reste pixel-perfect à 1x / 2x (retina).
* [ ] **Perf** : INP/LCP non dégradés (barre légère, transitions courtes).
* [ ] **Dark/Light** : la couleur garde du contraste (ajuster `--progress-color` si besoin).
* [ ] **Imbrication** : aucun parent n’a `transform/filter` indésirable (audit final).

---

## 8) Plan de commits

1. `fix(progress): render header progress via portal with fixed position and z-index token`
2. `chore(tokens): add --z-progress and normalize z-index scale`
3. `refactor(layout): mount ProgressBar and RouteProgressProvider in root layout`
4. `style(progress): ensure pointer-events none and no CLS`
5. `test(ui): verify stacking contexts (no transform/filter on layout containers)`

---

## 9) Dépannage rapide (si ça coince encore)

* **Toujours derrière un overlay ?**
  → Vérifier la valeur de `--z-progress` vs overlay. Mettre `--z-progress` juste sous `--z-modal`, ou **au-dessus** si voulu.

* **Toujours masquée sous le header ?**
  → Le header porte un `transform` (ex. pour un effet). Supprimez-le du wrapper parent (appliquez-le à un enfant interne) **ou** laissez la barre en portal + `z-index` plus haut.

* **Clignotements / tearing** ?
  → Désactiver toute animation lourde sur le `body/html` (ex. scroll-snap/overscroll).
  → Raccourcir `transition: width` si nécessaire (80–120ms).

---

## 10) Résultat attendu

* Barre **impeccable**, **toujours visible**, **sans interférer** avec l’UI.
* Z-index **maîtrisé** via tokens, **sans stacking context** piégeux.
* Code **factorisé**, **portable** (portal) et **sans dettes**.

```
```
