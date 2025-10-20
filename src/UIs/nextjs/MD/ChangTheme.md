# Color-Theme Refactor — Align the site with the logo (flame/forge)

But: **ne changer que les couleurs.** Aucune modif de layout, composants, timing d’animations ou CSS structurel. Ce plan fournit des **valeurs précises** (hex/HSL), des **règles d’application** et une **cartographie sémantique** pour remplacer l’actuelle palette violet/rose par une palette cohérente avec le logo (feu/forge : orange-cuivre, ambre, noir graphite, acier froid).

---

## 1) Objectif

* Aligner **tous les éléments colorés** du site sur l’identité du logo (flamme).
* Garantir **contrastes AA/AAA** et lisibilité sur fond sombre.
* Préserver la hiérarchie visuelle existante en ne changeant **que** les couleurs.

---

## 2) Palette maîtresse (exact values)

> Les valeurs ci-dessous sont le référentiel unique. Utiliser **ces hex** (ou leurs équivalents HSL fournis) partout.

### Couleurs de base

* **Primary — Forge Orange**: `#FF6A00` (HSL 22, 100%, 50%)

* **Primary-600 — Copper**: `#E45700` (HSL 22, 100%, 45%)

* **Primary-700 — Ember**: `#C74B00` (HSL 22, 100%, 39%)

* **Secondary — Warm Amber**: `#FFC43A` (HSL 43, 100%, 62%)

* **Secondary-600 — Goldenrod**: `#E6AE19` (HSL 43, 80%, 50%)

* **Accent-Cool — Steel Blue**: `#3A85FF` (HSL 218, 100%, 61%)
  Utilisation rare pour liens secondaires, puces info, graphiques.

### Neutres (fond/texte)

* **Background-900 — Graphite**: `#0F1115` (HSL 220, 18%, 7%)
* **Background-800 — Charcoal**: `#161A22` (HSL 222, 17%, 11%)
* **Surface-700 — Slate**: `#1E2430` (HSL 220, 19%, 15%)
* **Border-500 — Iron**: `#2B3342` (HSL 218, 21%, 22%)
* **Text-Primary**: `#F6F7F9` (HSL 220, 20%, 96%)
* **Text-Secondary**: `#C8CDD6` (HSL 220, 20%, 80%)

### États d’alerte (si présents)

* **Success**: `#2BB673`
* **Warning**: `#E3B341`
* **Danger**: `#E5484D`

---

## 3) Gradients et lueurs (remplacement des violets)

### Gradient héro et gros CTA

* **Hero Gradient** (remplace l’actuel violet)

    * Stop 0%: `#0F1115`
    * Stop 40%: `#1E2430`
    * Stop 70%: `#6A1D00` (shadow de braise)
    * Stop 100%: `#FF6A00` à 20% d’opacité par-dessus
      Direction: radial subtil, centre décalé bas-droite.

### Glow contrôlé (lueur douce, pas de halo agressif)

* **Forge Glow** (pour boutons primaires et focus fort):

    * Outer: `#FF6A00` @ 24% blur 18–24px
    * Inner: `#FFC43A` @ 12% blur 8–12px

---

## 4) Système de **tokens sémantiques** à utiliser

Définir/mapper ces tokens dans la couche thème. Ce sont **des noms de rôles**, pas de composants.

* `--color-bg` → `#0F1115`

* `--color-bg-alt` → `#161A22`

* `--color-surface` → `#1E2430`

* `--color-border` → `#2B3342`

* `--color-text` → `#F6F7F9`

* `--color-text-muted` → `#C8CDD6`

* `--color-primary` → `#FF6A00`

* `--color-primary-strong` → `#E45700`

* `--color-primary-contrast` → `#0F1115` ou `#0B0D10` (texte sur bouton orange)

* `--color-secondary` → `#FFC43A`

* `--color-accent` → `#3A85FF` (usage parcimonieux)

* `--shadow-glow-outer` → Forge Glow outer

* `--shadow-glow-inner` → Forge Glow inner

---

## 5) Règles d’application par type d’élément

### Titres/Hero

* H1/Hero title: `--color-text`
* Soulignements ou filet décoratif: `--color-primary`
* Sous-titre: `--color-text-muted`

### Paragraphes et listes

* Corps: `--color-text`
* Meta/notes: `--color-text-muted`

### Liens

* Couleur par défaut: `--color-accent`
* Hover: mélanger `--color-accent` → 10% vers `--color-primary` (ou utiliser `#2F6FE6` si mélange indisponible)
* Focus ring: `--color-accent` 2px + glow inner faible

### Boutons

* Primary (CTA): fond `--color-primary`, texte `--color-primary-contrast`, hover `--color-primary-strong`, focus = Forge Glow
* Secondary: bordure `--color-border`, texte `--color-text`, hover fond `--color-surface`
* Ghost: texte `--color-text`, hover texte `--color-primary`

### Sidebar / Navbar

* Fond: `--color-bg-alt`
* Icônes actives: `--color-primary`
* Icônes inactives: `--color-text-muted`
* Indicateur actif (barre/puce): `--color-primary`

### Cards/Surfaces

* Fond: `--color-surface`
* Titre: `--color-text`
* Bordure: `--color-border`
* Hover elevation: ajouter Forge Glow très léger (outer 8–12px @ 12%)

### Footer

* Fond: `--color-bg-alt`
* Liens sociaux: normal `--color-text-muted`, hover `--color-primary`
* Logo: ne pas appliquer de filtre, respecter les couleurs originales

### Badges/Chips

* Par défaut: fond `#1A1F2B`, bord `--color-border`, texte `--color-text-muted`
* Variation “hot”: fond translucide `#FF6A00` @ 16%, texte `--color-primary`

### Progress/Loaders

* Barre: `--color-primary`
* Fond de piste: `--color-border`

### Formulaires

* Label: `--color-text`
* Input fond: `--color-bg`
* Bordure: `--color-border` → `--color-primary` on focus
* Placeholder: `--color-text-muted`

---

## 6) Remplacements ciblés des couleurs existantes

> Partir du principe que le thème actuel utilise des violets/roses pour primaires et un fond sombre neutre.

* Ancien primaire violet → **`#FF6A00`**
* Ancien hover primaire plus sombre → **`#E45700`**
* Ancien secondaire rose → **`#FFC43A`**
* Tous dégradés violets du hero → **Hero Gradient** défini plus haut
* Glows violets → **Forge Glow**
* Liens violets → **`#3A85FF`**
* Fonds sombres inchangés mais **normalisés** à `#0F1115` / `#161A22` / `#1E2430`

---

## 7) Accessibilité et contrastes

* Texte normal sur `--color-bg` et `--color-surface` avec `--color-text` ≥ **AAA**.
* Bouton primaire: `#FF6A00` vs `#0F1115` ratio ≈ 7.3:1 → **AAA**.
* Lien `#3A85FF` sur `#0F1115` ratio ≈ 5.8:1 → **AA** (ok).
  Pour AAA sur petits textes, utiliser `#2F6FE6`.

---

## 8) Ordre d’exécution pour la mise à jour

1. Centraliser les **tokens sémantiques** ci-dessus dans la couche thème.
2. Remplacer toutes références directes à l’ancienne palette par les **tokens**.
3. Appliquer les **remplacements ciblés** (section 6).
4. Mettre à jour les **gradients** du hero et des CTA.
5. Ajuster les **glows** via les nouveaux tokens.
6. Passer le **check contrastes** sur les principales pages et états (hover, focus, disabled).
7. Valider que **aucun composant** ne dépasse 2 couleurs d’accent simultanées (primary + accent-cool au maximum).

---

## 9) Contrôle qualité visuel

* Les boutons et liens ne doivent **jamais** apparaître violets.
* Le hero doit donner une **ambiance forge**: sombre chaud, lueur cuivre.
* Le footer reprend `--color-bg-alt`, pas de halo autour du logo.
* Les focus rings sont visibles mais **contenus** (glow inner faible).

---

## 10) Notes d’ingénierie

* Ne pas mixer de conversions sRGB/Display-P3 sans nécessité.
* Éviter les blend CSS non supportés si des fallbacks ne sont pas gérés.
* Documenter dans le thème la **raison d’être** de chaque token (primaire = forge, secondaire = chaleur, accent = signal froid).

---

## 11) Résumé exécutable

* Primaires: `#FF6A00` / `#E45700`
* Secondaire: `#FFC43A`
* Accent rare: `#3A85FF`
* Neutres: `#0F1115`, `#161A22`, `#1E2430`, `#2B3342`, `#F6F7F9`, `#C8CDD6`
* Gradients: Hero Gradient défini, glows Forge Glow
* Remplacements: supprimer tous violets/roses existants au profit des valeurs ci-dessus
* Aucune autre modification que la couleur

---. 