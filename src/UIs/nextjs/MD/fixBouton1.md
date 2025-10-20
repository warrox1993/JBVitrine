# unifyButtonAnimation.md — Dupliquer l’animation de “Démarrer un projet” sur tous les boutons

## 🔒 Contraintes
- ❗️Ne modifier **que l’animation** (transitions, keyframes, propriétés animées).
- ❗️Ne pas changer : couleurs, tailles, rayons, polices, icônes, layout, ombres statiques.
- ❗️Respecter `prefers-reduced-motion: reduce`.
- ✅ Source de vérité = **le bouton “Démarrer un projet”** (dans la Home).

---

## 1) Localiser la source (sans rien changer dessus)
**Composant source** (noms à adapter selon repo) :
- `src/UIs/nextjs/src/components/sections/Hero/Hero.tsx` (ou le fichier qui contient le CTA “Démarrer un projet”)
- `Hero.module.css` (ou CSS associé)

**Action**
- Identifier **toutes** les règles qui s’appliquent à “Démarrer un projet” :
    - `transition` (durées, propriétés, courbes d’interpolation)
    - `:hover`, `:focus-visible`, `:active`
    - `@keyframes` éventuels (glow/pulse/gradient shift)
    - Propriétés animées : `transform`, `box-shadow`, `filter`, `background-position/size`, `opacity`, etc.
- Ne **pas** prendre de règles de **couleur** (ex: `color`, `background-color`, `border-color`) — on ne déplace **que** l’animation.

---

## 2) Extraire dans un module réutilisable (sans effet visuel par défaut)
Créer/compléter `src/UIs/nextjs/src/styles/buttons.animations.css` (chemin à adapter).  
Y placer **uniquement** l’animation du bouton source, renommée en classes génériques.

```css
/* === Source: "Démarrer un projet" — ANIMATIONS UNIQUEMENT === */

/* Transitions communes (mêmes durées et courbe que le bouton source) */
.btn-anim {
  transition:
    transform var(--btn-anim-t, 180ms) var(--btn-anim-ease, cubic-bezier(.2,.8,.2,1)),
    box-shadow var(--btn-anim-t, 180ms) var(--btn-anim-ease, cubic-bezier(.2,.8,.2,1)),
    filter var(--btn-anim-t, 180ms) var(--btn-anim-ease, cubic-bezier(.2,.8,.2,1)),
    background-position var(--btn-anim-t, 180ms) var(--btn-anim-ease, cubic-bezier(.2,.8,.2,1)),
    opacity var(--btn-anim-t, 180ms) var(--btn-anim-ease, cubic-bezier(.2,.8,.2,1));
  will-change: transform, box-shadow, filter, background-position, opacity;
}

/* États — recopier EXACTEMENT le comportement du CTA source,
   SANS modifier les couleurs (laisser les couleurs existantes de chaque bouton) */
.btn-ani
