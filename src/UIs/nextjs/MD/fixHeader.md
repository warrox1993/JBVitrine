# fixHeaderLayout.md — Agrandir le header, le logo et activer le sticky header

## 🎯 Objectif
- Rendre le **header plus haut** pour lui donner plus de présence.
- **Agrandir le logo** (proportionnellement à la nouvelle hauteur du header).
- **Rendre le header sticky** pour qu’il reste visible en haut au défilement.
- ❗️Ne rien changer d’autre : couleurs, polices, espacement horizontal et comportement des liens inchangés.

---

## 1) Fichiers concernés
- `src/UIs/nextjs/src/components/layout/Header/Header.tsx`
- `src/UIs/nextjs/src/components/layout/Header/Header.module.css`
  (ou équivalent selon ton projet)

---

## 2) Header — structure et comportement sticky
S’assurer que l’élément racine du header possède une classe dédiée (ex. `header`), puis appliquer :

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100; /* au-dessus du contenu principal */
  backdrop-filter: blur(12px); /* garder l’effet si déjà présent */
  -webkit-backdrop-filter: blur(12px);
  background: var(--color-bg-header, rgba(0, 0, 0, 0.6)); /* ne pas changer la teinte, juste s'assurer de la transparence */
  height: clamp(80px, 9vh, 110px); /* augmenté par rapport à avant (~60–70px d’origine) */
  transition: height 200ms ease-in-out;
}
```

> ⚠️ Si le site utilise déjà un scroll shrink (header qui se réduit au scroll), garder cette logique : ajuster simplement les valeurs de `height` pour que le mode “grand” soit plus généreux.

---

## 3) Logo — agrandir et centrer verticalement
Dans le même fichier CSS :

```css
.logo {
  height: clamp(48px, 6vh, 72px); /* ~20–25 % plus grand qu’actuellement */
  aspect-ratio: auto; /* garder le ratio naturel */
  display: flex;
  align-items: center;
}
```

> Si le logo est géré par `next/image`, il faut aussi adapter la prop `width`/`height` dans `Header.tsx` :
> - ex : `width={140}` → `width={180}`, `height={40}` → `height={55}` (selon proportions réelles).

---

## 4) Vérifications
- Le header reste **visible** et **fixe** en haut pendant le scroll (sticky actif).
- Le logo garde son ratio et **ne déborde pas**.
- Le texte de navigation est **centré verticalement** malgré la nouvelle hauteur.
- Aucun **saut de layout** à l’apparition du sticky (si déjà présent sur le site).
- Le z-index du header est supérieur aux sections animées ou overlays (≥ 100).
- Aucune régression responsive (test < 768 px).

---

## 5) Commits
- `feat(ui): enlarge header height and logo size`
- `feat(ui): make header sticky at top`
