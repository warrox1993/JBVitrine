# SidebarNavbarSync.md — Empêcher le débordement de la navbar quand la sidebar s’anime

## But

Quand la **sidebar** s’ouvre/se replie, le contenu de la **navbar** ne doit jamais dépasser l’écran. La navbar doit **occuper exactement l’espace restant**, sans scroll horizontal ni saut de mise en page.

Cible: Next.js App Router. Zéro nouvelle couleur. CSS pur. Transition fluide.

---

## Principe

On pilote toute la mise en page via une **variable CSS `--sidebar-w`**.

* Sidebar repliée: `--sidebar-w: 72px` (exemple).
* Sidebar ouverte: `--sidebar-w: 260px` (exemple).

La grille racine réserve `--sidebar-w` à gauche et donne le reste au contenu (navbar incluse).
La navbar a `width: 100%` dans **sa** colonne, donc s’adapte automatiquement.

---

## 1) Mise en page globale en grille

**Fichier:** `src/UIs/nextjs/src/app/layout.css` (ou global.css selon ton projet)

```css
/* Variables d’interface */
:root {
  --sidebar-w: 72px;     /* largeur repliée */
  --sidebar-w-open: 260px;
  --header-h: 64px;
}

/* Grille racine: [sidebar] [content] */
.page-shell {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  grid-template-rows: var(--header-h) 1fr;
  min-height: 100dvh;
  width: 100%;
  overflow-x: hidden; /* coupe tout débordement horizontal global */
}

/* Zones */
.page-shell .sidebar {
  grid-column: 1;
  grid-row: 1 / span 2; /* occupe header + contenu */
  position: sticky;
  top: 0;
  height: 100dvh;
  will-change: width;
  transition: width 200ms ease, transform 200ms ease;
  width: var(--sidebar-w);
  overflow: hidden;
}

.page-shell .header { /* ta navbar */
  grid-column: 2;
  grid-row: 1;
  position: sticky;
  top: 0;
  height: var(--header-h);
  display: flex;
  align-items: center;
  /* Point clé: la navbar s’adapte à la colonne 2 (1fr) */
  width: 100%;
  min-width: 0;          /* évite l’overflow en flex */
  overflow: hidden;      /* coupe tout débordement interne */
  z-index: 10;
}

.page-shell .main {
  grid-column: 2;
  grid-row: 2;
  min-width: 0;          /* indispensable pour que le contenu se rétrécisse */
  overflow-x: clip;      /* pas de scroll horizontal parasite */
}
```

> Important: `min-width: 0` sur tous les conteneurs **flex** ou **grid** qui doivent accepter la réduction de largeur. Sans ça, le contenu peut forcer un overflow.

---

## 2) États sidebar (ouverture/fermeture) via classe sur `<body>`

**Fichier:** `src/UIs/nextjs/src/app/globals.css` (ou équivalent)

```css
/* Quand la sidebar est ouverte, on met à jour la variable */
body.sidebar-open {
  --sidebar-w: var(--sidebar-w-open);
}
```

**JS minimal pour toggler l’état** (utile si déjà géré par un composant, sinon ignorer):

```ts
// Exemple d’utilitaire
export function toggleSidebar(open: boolean) {
  if (open) document.body.classList.add("sidebar-open");
  else document.body.classList.remove("sidebar-open");
}
```

> Si ta sidebar s’anime au survol (hover), tu peux ajouter/retirer la classe au `mouseenter`/`mouseleave` ou binder sur l’état React du composant.

---

## 3) Navbar: prévenir tout débordement interne

**Fichier:** `src/UIs/nextjs/src/components/sections/Header/Header.css` (ou similaire)

```css
.header {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-inline: clamp(8px, 2vw, 24px);
  width: 100%;
  min-width: 0;            /* clé anti-overflow */
}

.header .brand,
.header nav,
.header .cta {
  min-width: 0;            /* empêche chaque bloc de forcer l’overflow */
}

.header nav {
  flex: 1 1 auto;          /* nav prend la place disponible */
  min-width: 0;
  overflow: hidden;        /* coupe si le contenu est trop long */
}

.header nav ul {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;       /* pas de retour à la ligne */
  min-width: 0;
}

.header nav a {
  white-space: nowrap;     /* évite la casse des labels */
  text-overflow: ellipsis; /* si trop long, coupe proprement */
  overflow: hidden;
  max-width: 100%;
}
```

> Résultat: quand la sidebar s’élargit, la **colonne 2** de la grille rétrécit. La navbar occupe 100% de cette colonne, **sans jamais déborder**.

---

## 4) Variante “overlay” (mobile) sans pousser la mise en page

Sur mobile, on préfère souvent **superposer** la sidebar au-dessus du contenu, pour éviter de rétrécir la navbar. On passe en overlay dès un breakpoint.

**Fichier:** global CSS (ajoute ce media query)

```css
@media (max-width: 768px) {
  .page-shell {
    grid-template-columns: 1fr;               /* plus de colonne sidebar fixe */
  }
  .page-shell .sidebar {
    grid-column: 1 / -1;
    grid-row: 1 / span 2;
    position: fixed;
    inset: 0 auto 0 0;                        /* colle à gauche */
    width: var(--sidebar-w-open);
    transform: translateX(-100%);             /* cachée par défaut */
    transition: transform 180ms ease;
    z-index: 20;
  }
  body.sidebar-open .sidebar {
    transform: translateX(0);                 /* ouverte en overlay */
  }
  .page-shell .header,
  .page-shell .main {
    grid-column: 1;                            /* 100% largeur */
  }
}
```

> Mobile: la sidebar **n’affecte plus** la largeur restante, donc la navbar reste toujours à 100% de l’écran.

---

## 5) Cas où tu ne peux pas migrer en grille tout de suite (patch rapide)

Si ta page n’emploie pas encore `.page-shell` en grid, tu peux **forcer la largeur de la navbar** avec `calc(100vw - var(--sidebar-w))`:

```css
.header {
  position: sticky;
  top: 0;
  width: calc(100vw - var(--sidebar-w));
  left: var(--sidebar-w);       /* aligne la navbar au bord restant */
  min-width: 0;
  overflow: hidden;
}
body.sidebar-open .header {
  width: calc(100vw - var(--sidebar-w-open));
  left: var(--sidebar-w-open);
}
```

> Ce patch marche, mais la **solution grid** reste plus robuste et propre.

---

## 6) Check-list de validation (bloquant)

* Aucun **scroll horizontal** quand la sidebar s’ouvre/ferme.
* La **navbar** reste **plein écran côté contenu** (100% de sa colonne).
* Les éléments de la nav ne débordent plus: `min-width:0` appliqué où il faut.
* Sur mobile (≤768px), l’overlay de sidebar n’impacte pas la largeur de la navbar.
* Les transitions sont **fluides** (pas de reflow violent).

---

## Fichiers touchés

* `src/UIs/nextjs/src/app/layout.css` (ou `globals.css`) — grid + variables.
* `src/UIs/nextjs/src/components/sections/Header/Header.css` — anti-overflow.
* (Option) utilitaire toggle: où tu gères l’état d’ouverture de la sidebar.

---

## Notes d’intégration

* Si ta sidebar utilise déjà `transform: translateX(...)` pour l’animation, garde-le; la **grille** se contente de réserver l’espace via `--sidebar-w` quand elle est en mode “poussant”.
* Si elle est “au survol”, ajoute/supprime `body.sidebar-open` aux bons événements pour synchroniser la variable.

---

## Définition du “Done”

Quand tu ouvres/fermes la sidebar:

* La navbar ne bouge que pour refléter la place restante, **sans jamais dépasser**.
* Aucun tremblement, aucun sur-scroll horizontal.
* Desktop: layout “poussant” propre. Mobile: overlay propre.
