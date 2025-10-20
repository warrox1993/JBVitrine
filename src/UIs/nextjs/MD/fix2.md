# fixAlternanceSections.md — Aligner l’alternance des fonds (sans modifier la palette)

## 🔒 Contraintes (à respecter absolument)
- ❗️ **Ne PAS modifier** la palette, les variables, les tokens, ni les valeurs hex/RGB/HSL.
- ❗️ **Ne PAS toucher** au Hero.
- ❗️ **Ne PAS créer de nouvelles couleurs** ni renommer les existantes.
- ✅ On **réaligne l’alternance** en appliquant **les tokens déjà en place** (ex. `--color-bg`, `--color-bg-alt`, `--color-surface`) **sur les bonnes sections**.
- ✅ L’objectif est que la **1ʳᵉ section après le Hero** soit **grise** (le même gris déjà utilisé par les autres sections grises), puis que l’alternance se poursuive normalement.

---

## 1) Référence d’alternance (ne rien inventer)
- Sections “foncées” actuelles → utilisent le token **noir** déjà en place (ex. `--color-bg`).
- Sections “grises” actuelles → utilisent le token **gris** déjà en place (ex. `--color-bg-alt`).
- **On se cale sur ce pattern existant**. On ne change ni le nom des tokens, ni leurs valeurs.

---

## 2) Cible exacte à corriger
- **Composant** : la section **Testimonials / Trusted by Ambitious Brands** (juste après le Hero).
- **Problème** : elle est **noire** au lieu d’être **grise** (elle ne suit pas l’alternance appliquée ailleurs).
- **Action** : appliquer **sur la section racine (full-bleed)** le **token gris existant** déjà utilisé par les autres sections grises.

> ⚠️ Le **fond doit être sur l’élément `<section>` racine**, pas sur le `container` interne (qui reste transparent), sinon on obtient une “bande” au centre et pas un fond plein-écran.

---

## 3) À faire (sans changer les couleurs)
1. **Testimonials.tsx** (ou `Trusted.tsx`)
    - S’assurer que la section a une **classe racine dédiée** (ex. `sectionTestimonials`).

   ```tsx
   <section className={styles.sectionTestimonials} data-block="testimonials">
     <div className={styles.container}>{/* contenu */}</div>
   </section>
   ```

2. **Testimonials.module.css** (ou équivalent)
    - **Appliquer le token gris existant** à la **section racine**.
    - **Container** : garder `background: transparent;`.
    - **Ne rien toucher** aux valeurs de couleurs (réutiliser les **tokens existants**).

   ```css
   /* Utiliser le token DEJA EN PLACE pour "gris" (ex: --color-bg-alt) */
   .sectionTestimonials {
     position: relative;
     background: var(--color-bg-alt); /* token existant, ne pas changer sa valeur */
     isolation: isolate;
     /* paddings inchangés selon le design */
   }

   .container { background: transparent; }
   ```

3. **Projects (section suivante)**
    - **Vérifier** que la racine de la section Projects utilise bien le token **noir** existant (ex. `--color-bg`) sur l’élément `<section>` (pas dans le container).
    - **Aucune modification de couleur** si c’est déjà le cas.

   ```css
   .sectionProjects {
     background: var(--color-bg); /* token existant pour "noir" */
     isolation: isolate;
   }
   ```

---

## 4) Garde-fous (pour éviter les effets de bord)
- `container` des deux sections → **toujours transparent**.
- Pas de `mix-blend-mode` ou pseudo-éléments (`::before`/`::after`) qui repeignent du noir par-dessus Testimonials.
- Pas de `border-top`/`border-bottom` pour “simuler” une séparation : l’alternance de **fond** suffit.
- **Ne pas** toucher au Hero ni à ses décorations.

---

## 5) Checks visuels (obligatoires)
- Ordre perçu : **Hero (cuivre)** → **Testimonials (gris)** → **Projects (noir)**.
- En masquant la classe de Testimonials dans DevTools, on doit revoir le **noir** du dessous → preuve que **Testimonials peint bien le gris** à elle seule.
- Zéro scroll horizontal. Zéro “bande” centrale (signe que le fond serait sur le container au lieu de la section racine).

---

## 6) Critères d’acceptation
- La **section juste après le Hero** est **grise** (via le **token gris existant**), **plein-écran**, **sur la racine**.
- La section **Projects** reste **noire** (token noir existant), **sur la racine**.
- **Aucune valeur de couleur** n’a été modifiée ni ajoutée.
- L’alternance globale correspond à celle déjà visible sur les autres sections.

---

## 7) Commits
- `fix(testimonials): apply existing gray token on section root (full-bleed)`
- `chore(projects): verify section root uses existing black token`
- `chore: ensure containers are transparent; remove decorative overrides`
