Tu as raison : on va pousser le refactoring **à l’échelle de TOUT** le système d’UI, pas seulement des boutons ou des `h1`. Voici un `.md` complet, sans code, que tu peux coller tel quel pour guider Codex. Il couvre l’inventaire, la normalisation et les contrats pour **tous les éléments** et composants, avec critères d’acceptation et plan de migration.

---

# Global UI Refactor — System-wide Normalization (spec `.md` pour Codex)

## But

Refactoriser **l’intégralité** de l’interface pour obtenir un **design system unique** et cohérent, applicable à toutes les pages actuelles et futures :

1. Une source de vérité pour les tokens (couleurs, typo, espacements, rayons, ombres, motion, z-index, breakpoints).
2. Des **contrats d’éléments** pour tous les HTML natifs.
3. Des **contrats de composants** pour tous les patterns d’UI.
4. Des **primitives de layout** réutilisables.
5. Zéro valeur magique dispersée. Aucune duplication. Aucune divergence locale.

## Ce qui ne change pas

* Identité visuelle et intention actuelle (pas d’invention graphique).
* Stack et librairies existantes.
* Logique métier et routing.

## Contraintes

* Travailler dans l’arborescence existante (déplacements minimaux et justifiés).
* Aucune utilisation de `!important`, sauf exception documentée.
* Respect de l’accessibilité (contraste AA, focus visible, `prefers-reduced-motion`).
* Pas d’inline styles pour de la présentation.

---

## Livrables (structure attendue)

1. **Design Tokens** — fichier unique de variables (emplacement global existant ou `styles/tokens.css`).
   Inclure obligatoirement :

    * Couleurs (rôles sémantiques, pas hex techniques)
    * Typographie (familles, échelle de tailles, graisses, hauteurs de ligne)
    * Espacements (échelle cohérente)
    * Rayons, ombres
    * Motion (durations, easings)
    * Z-index (calibré pour header/overlays/toasts/progress)
    * Breakpoints (`--bp-sm/md/lg/xl`) pour les règles responsives

2. **Contrats d’éléments HTML** — fichier global (ex. `styles/elements.css`) qui normalise **TOUS** les éléments natifs :

    * **Texte** : `h1–h6`, `p`, `small`, `strong`, `em`, `mark`, `code`, `pre`, `blockquote`, `hr`

        * Marges verticales cohérentes via tokens, échelle de titres, rythme vertical stable.
    * **Listes** : `ul`, `ol`, `li` (+ padding de base, style, nesting)
    * **Liens** : `a` (états hover/focus/active, soulignement focus-visible, couleurs via tokens)
    * **Média** : `img`, `picture`, `video`, `figure`, `figcaption` (max-width, ratio, légendes normalisées).
    * **Tableaux** : `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td` (zébrage optionnel, densités, alignements, survols).
    * **Formulaires** : `label`, `input` (text, email, password, number, date, file), `textarea`, `select`, `optgroup`, `option`

        * Hauteur, padding, bordures, couleurs d’état (focus/erreur/succès), messages d’aide/erreur, disabled/readonly.
    * **Boutons natifs** : `button`, `input[type=button|submit|reset]` : reset + mapping vers tokens.

3. **Utilities** — fichier `styles/utilities.css` (ou consolidation si déjà présent) :

    * Espacements (`.m*`, `.p*`, dérivés de l’échelle), display/visibility (`.hidden`, `.sr-only`),
    * Layout rapides : `.container`, `.stack-*` (gap vertical), `.cluster` (rangées avec wrap+gap), `.grid-2/3/4` (patterns responsives),
    * Typo utilitaires : `.lead`, `.muted`, `.mono`, `.uppercase`, etc.
    * États génériques : `.is-active`, `.is-disabled`, `.is-loading` (purement sémantiques, sans valeurs en dur).

4. **Contrats de composants** — chaque composant documenté avec API de classes claire et dépendant **uniquement** des tokens/utilities :

    * **Boutons** : `.btn` base + variantes `.btn--primary|secondary|ghost|link`, tailles `--sm|--md|--lg`, états `:hover/:active/:focus-visible/.is-loading/.is-disabled`.
    * **Liens-boutons** : mêmes règles, balise `a`.
    * **Badges/Tags** : `.badge` + variantes (info/success/warning/danger).
    * **Cards** : `.card`, slots `.card__header|__body|__footer`.
    * **Navbar** : hauteur tokenisée, z-index `header`, sticky/scroll.
    * **Sidebar** : largeur collapse/expand tokenisée, transition fluide transform/opacity (pas de poussée du body, jamais de jank au premier hover), data-attr `[data-sidebar="collapsed|expanded"]`.
    * **Breadcrumbs** : séparateur, truncation responsable, focus clair.
    * **Tabs** : onglets cliquables, focus/active, panel ARIA.
    * **Accordéon** : affordance claire (caret, hover), `aria-expanded/controls`, transition hauteur/opacity respectant `prefers-reduced-motion`.
    * **Pagination** : tailles/cibles accessibles, états disabled/active.
    * **Table (avancée)** : densité, survol, tri, pagination, sticky header si nécessaire.
    * **Alertes/Toasts** : rôles ARIA, couleurs sémantiques, timeout/motion tokenisés.
    * **Modal/Drawer** : overlay, focus trap, scroll lock, z-index > overlays.
    * **Tooltip/Popover** : déclencheur focus/hover, positionnement stable, délais via tokens.
    * **Progress/Loader/Skeleton** : z-index `--z-progress` pour la barre; loaders et skeletons basés tokens.
    * **Testimonials/Carousel** : timing ≤ 5 s par item, avatars ronds centrés sous nom+poste, pas de CLS, motion via tokens.
    * **Chips/Inputs enrichis** : états focus, suppr., overflow géré.

5. **Primitives de layout & gabarits page**

    * **Page shell** standard : header, sidebar (optionnelle), main, footer.
    * **Section spacing** homogène (avant/après sections).
    * **Hero** : réduire la hauteur de ~10 px par rapport à l’actuelle via tokens, pas de valeur fixe locale.
    * **Gabarit “Nouvelle page”** : structure prête à l’emploi, aucune CSS dédiée nécessaire tant qu’on n’introduit pas un nouveau composant.

6. **Thèmes & accessibilité**

    * Thème clair par défaut, basculable via surcharges de tokens (si dark présent, le gérer au niveau tokens).
    * `:focus-visible` toujours perceptible.
    * `prefers-reduced-motion` désactive les animations non essentielles.
    * Contrastes AA minimum conservés lors des remappings.

---

## Processus de migration (ordre strict)

1. **Inventory total**

    * Scanner tous les styles/pages/composants. Lister toutes les valeurs “magiques” (hex, px, ms, etc.), duplications, et styles inline.
    * Regrouper les conventions existantes pour définir l’échelle effective (typo/spacing/motion).

2. **Création des tokens**

    * Définir la table de tokens en mappant **les valeurs existantes** vers des noms sémantiques.
    * Documenter chaque token (rôle et portée).
    * Remplacer les occurrences brutes par les tokens (recherche/remplacement contrôlé).

3. **Normalisation des éléments HTML**

    * Appliquer le contrat global aux éléments natifs (texte/listes/liens/média/table/forms/boutons).
    * Supprimer les overrides locaux redondants.

4. **Utilities**

    * Introduire/Consolider les utilitaires et remplacer les espacements/alignements ad hoc.
    * Retirer tout helper dupliqué ou contradictoire.

5. **Refactor composants (tous)**

    * Migrer **chaque** composant à partir de ses styles existants vers un contrat unique consommant tokens+utilities.
    * Sidebar : corriger définitivement l’animation d’expansion initiale (pas de reflow du body, pas de “saut” au premier hover).
    * Testimonials : avatars ronds centrés, cadence ≤ 5 s, zéro CLS.
    * Progress : surcouche de tout (z-index max défini dans la grille z-index).

6. **Primitives de layout & gabarits**

    * Mettre en place le shell et les espacements de section.
    * Ajuster la hero via tokens (−10 px vs actuel).
    * Créer la page modèle pour l’ajout futur.

7. **Nettoyage**

    * Supprimer styles morts, doublons, hacks non nécessaires.
    * Lint CSS : aucune règle non utilisée, aucune valeur non tokenisée.

---

## Critères d’acceptation (doit être vrai pour TOUT l’UI)

* **Couverture totale** : chaque élément HTML et chaque composant présent dans le projet est rattaché à un contrat documenté et ne contient **aucune** valeur visuelle brute (couleurs/taille/espacement/durée/rayon/ombre) en dehors des tokens.
* **Cohérence** : titres, textes, liens, listes, images, tableaux, formulaires, boutons, navs, sidebars, accordéons, carrousels, modals, tooltips, toasts, progress, loaders, skeletons, badges, tags, chips, tabs, breadcrumbs, pagination — tous alignés sur tokens+utilities.
* **Motion** : toutes les transitions utilisent les durations/easings des tokens et respectent `prefers-reduced-motion`.
* **Layout** : le shell est réutilisé partout ; sections espacées de manière homogène.
* **Sidebar** : aucune poussée du body, aucune micro-saccade au premier hover.
* **Testimonials** : cycle ≤ 5 s, avatars ronds centrés, zéro CLS.
* **Progress** : au-dessus de tout (z-index dédié).
* **Accessibilité** : focus visibles, contrastes AA, tailles cibles suffisantes.
* **Maintenance** : ajout d’une nouvelle page réalisable sans créer de CSS additionnelle (hors nouveaux composants).

---

## Documentation à produire

* `DESIGN-SYSTEM.md` à la racine : liste des tokens réels, matrice des contrats (éléments/composants), règles d’usage.
* Section “Créer une nouvelle page” dans le README : étapes, classes à utiliser, pièges à éviter.
* Changelog indiquant les fichiers touchés et les remplacements majeurs.

---

## Matrice de couverture (QA)

Codex doit remplir une matrice recensant :

* Lignes scannées, tokens créés, occurrences remplacées.
* Liste exhaustive des éléments/composants couverts + statut (migré / non applicable / à créer).
* Rapport de duplication avant/après.
* Mesures CLS/TTI avant/après pour composants dynamiques (sidebar/testimonials/progress).

---

Ce document force la **généralisation** du refactoring à l’ensemble de l’interface. Colle-le tel quel dans ton repo pour guider Codex. Ensuite, on pourra ajouter une mini check-list d’audit automatique pour repérer toute valeur non tokenisée qui aurait échappé au filet.
