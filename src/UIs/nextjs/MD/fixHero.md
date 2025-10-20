Parfait, on va régler ça proprement. Tu as un bloc **stats** dans le Hero qui crée la “barre” et, quand tu le commentes à moitié, il laisse apparaître du texte résiduel (list items / labels). Voici un fichier prêt pour Codex.

````markdown
# fixHeroStats.md — Remove/Harden the Hero “stats” block without visual seams

## 🎯 Goal
Supprimer (ou désactiver) le bloc **stats** placé sous le Hero **sans laisser de ligne, de texte résiduel, ni d’espace fantôme**, et sans casser le gradient de fond ni la hiérarchie du Hero.

---

## 1) Where to look
- `src/UIs/nextjs/src/components/sections/Hero/Hero.tsx` (ou `Hero.jsx/tsx`)
- `src/UIs/nextjs/src/components/sections/Hero/Hero.module.css` (et/ou `Hero.module.scss`)
- Éventuels utilitaires globaux: `elements.css`, `utilities.css`

Le bloc a généralement une racine de type:
```tsx
<ul className={styles.stats} role="list"> ... </ul>
```
ou
```tsx
<div className={styles.stats}> ... </div>
```
avec des items `li`/`div` et parfois un pseudo-élément décoratif (`::before/::after`) servant de “trait séparateur”.

---

## 2) Fix (Option A — recommandé): **Feature-flag OFF** + nettoyage
Objectif: rendre le bloc optionnel, **désactivé par défaut**, sans side effects.

### 2.1 Code (Hero.tsx)
- Introduire un flag local (jusqu’à ce qu’on ait un vrai paramètre):
```tsx
const showStats = false;
```

- Encapsuler le rendu:
```tsx
{showStats ? (
  <ul className={styles.stats} role="list" aria-label="Key stats">
    {/* items */}
  </ul>
) : null}
```

- Si les stats conditionnent des espacements (ex: des `margin-bottom` sur le container “content”), appliquer l’espacement **sur le container**, pas sur `.stats`. Exemple: le bloc CTA garde son `margin-bottom` normal; pas d’espacement négatif pour “faire place aux stats”.

### 2.2 CSS (Hero.module.css)
- Neutraliser l’ensemble du style **sans** laisser d’artefacts:
```css
/* root stats block — fully removable */
.stats { display: none !important; }

/* Sécuriser tout pseudo-élément décoratif éventuel */
.stats::before,
.stats::after { content: none !important; }

/* Les items ne doivent pas exister si .stats est absent, mais on neutralise par prudence */
.stats > * { display: none !important; }
```

- Vérifier qu’aucune autre règle (ex: `.hero + .nextSection { border-top: 1px solid ... }`) ne crée un trait quand `.stats` est absent. Si présent, la supprimer:
```css
.hero + .nextSection { border-top: none; }
```

---

## 3) Fix (Option B — fallback rapide): **Hide accessibly** sans supprimer le DOM
À utiliser si une logique runtime attend la présence du nœud.

**Hero.tsx**
```tsx
<ul className={styles.stats} role="presentation" aria-hidden="true" data-hidden="true">
  {/* items */}
</ul>
```

**Hero.module.css**
```css
.stats[data-hidden="true"] {
  display: none !important;
}
.stats[data-hidden="true"]::before,
.stats[data-hidden="true"]::after { content: none !important; }
```

---

## 4) Nettoyage des causes de “ligne”
Même si `.stats` est masqué, **ces sources créent des coutures** et doivent être supprimées:

- **Bordures implicites**: enlever `border-top` / `border-bottom` sur `.stats`, sur le parent direct, et sur la section suivante.
- **Pseudo-éléments décoratifs**: supprimer `::before/::after` qui dessinent un filet ou une “vague” sous `.stats`.
- **Background local**: si `.stats` applique un `background` différent du `body`, le supprimer (tout doit être transparent).

---

## 5) QA checklist
1. **DOM**: aucun texte “stat” dans l’accessibility tree (role “list” supprimé ou `aria-hidden="true"`).
2. **Visuel**: plus aucune ligne horizontale ni bande sombre sous le Hero.
3. **Espacement**: la distance entre Hero et la section suivante reste cohérente (pas de trou, pas de chevauchement).
4. **Responsive**: mobile/desktop OK; pas de scroll-jump.
5. **Perf/paint**: pas de repaints anormaux (DevTools → Performance).

---

## 6) Acceptance criteria
- Le bloc `.stats` ne se rend plus (ou est totalement masqué, accessiblement).
- Zéro artefact visuel: pas de border, pas de pseudo-élément, pas de fond résiduel.
- Le Hero conserve son gradient et son CTA aligné.
- La section “Trusted by ambitious brands…” commence sans trait séparateur.

---

## 7) Commit plan
- `feat(hero): gate stats behind flag (off by default)`
- `fix(hero): remove residual borders/pseudo-elements under hero`
- `chore(a11y): hide stats accessibly when disabled`

---

## 8) Note
Quand tu voudras réintroduire des “metrics”, on les rendra **utiles** (ex: “Lighthouse 95+ / INP < 200ms / TTI < 2s”), présentées en **chips** intégrées au bloc CTA, **sans** barre pleine largeur ni séparateur.
````
