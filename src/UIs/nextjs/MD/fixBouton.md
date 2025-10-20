# unifyButtonsColors.md — Unifier les couleurs de TOUTES les variantes de boutons

## 🎯 But
Prendre **le bouton de référence** :  
**“Voir le cas complet”** dans la section **“Étude de cas”**, et **appliquer exactement ses couleurs** (repos, hover, active, focus, disabled) à **tous les boutons** du site pour obtenir **un style unique**.  
⚠️ **Ne rien changer d’autre** que les couleurs (ni taille, ni rayon, ni police, ni ombres, ni spacing).

---

## 0) Contraintes
- Palette et tokens **déjà présents** : réutiliser les **mêmes variables** que ce bouton de référence.
- **Pas** de nouveaux tokens, **pas** de nouvelles valeurs hex/HSL.
- **Pas** de refacto structurel : on touche seulement aux **variables de couleur** utilisées par les boutons.

---

## 1) Bouton de référence
Localiser le composant et extraire ses couleurs effectives (lire les CSS computed si nécessaire) :
- **Default (rest)** : `--btn-bg`, `--btn-fg`, `--btn-border` (si présent), `--btn-shadow` (si glow).
- **Hover** : `--btn-bg-hover`, `--btn-fg-hover`, `--btn-border-hover`.
- **Active/Pressed** : `--btn-bg-active`, `--btn-fg-active`, `--btn-border-active`.
- **Focus-visible** : **anneau** (ex. `box-shadow` ou `outline`) → `--btn-focus-ring`.
- **Disabled** : `--btn-bg-disabled`, `--btn-fg-disabled`, `--btn-border-disabled` (opacity autorisée si déjà pratiquée).

➡️ Ces valeurs **doivent** pointer vers les tokens déjà utilisés par **“Voir le cas complet”** (ex: `--color-primary`, `--color-text-on-primary`, etc.).  
Ne pas re-écrire les couleurs en dur si le bouton de référence utilise des variables.

---

## 2) Source of truth (scope commun)
Créer/centraliser un **scope de variables** commun aux boutons (sans modifier la structure CSS existante).  
Si un scope existe (ex. `.btn` ou `:root` → `--btn-*`), **renseigne les variables** avec les **mêmes tokens** que le bouton de référence :

```css
/* Exemple de mappage — remplacer par les variables/tokens RÉELS du bouton de référence */
:root {
  /* état normal */
  --btn-bg: var(--color-primary);
  --btn-fg: var(--color-on-primary);
  --btn-border: transparent;

  /* hover */
  --btn-bg-hover: var(--color-primary-strong);
  --btn-fg-hover: var(--color-on-primary);
  --btn-border-hover: transparent;

  /* active */
  --btn-bg-active: var(--color-primary-stronger);
  --btn-fg-active: var(--color-on-primary);
  --btn-border-active: transparent;

  /* focus ring (même teinte que le bouton de réf) */
  --btn-focus-ring: 0 0 0 3px color-mix(in srgb, var(--color-primary) 40%, transparent);

  /* disabled */
  --btn-bg-disabled: color-mix(in srgb, var(--color-primary) 30%, var(--color-bg) 70%);
  --btn-fg-disabled: color-mix(in srgb, var(--color-on-primary) 60%, transparent);
  --btn-border-disabled: transparent;
}
```

> Si le site a déjà un fichier `buttons.css`/`elements.css` avec ces variables, **mets à jour les valeurs** pour qu’elles égalent **celles du bouton de référence**.

---

## 3) Appliquer à toutes les variantes
Pour **chaque** variante existante (`.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--outline`, etc.) :
- **Ne pas toucher** aux dimensions/typo.
- **Mapper** leurs couleurs sur **les mêmes variables** :

```css
.btn,
.btn--primary,
.btn--secondary,
.btn--ghost,
.btn--outline {
  color: var(--btn-fg);
  background: var(--btn-bg);
  border-color: var(--btn-border);
}

.btn:hover { background: var(--btn-bg-hover); color: var(--btn-fg-hover); border-color: var(--btn-border-hover); }
.btn:active { background: var(--btn-bg-active); color: var(--btn-fg-active); border-color: var(--btn-border-active); }

.btn:focus-visible {
  outline: none;
  box-shadow: var(--btn-focus-ring);
}

.btn[disabled],
.btn:disabled {
  background: var(--btn-bg-disabled);
  color: var(--btn-fg-disabled);
  border-color: var(--btn-border-disabled);
  cursor: not-allowed;
  /* garder l’opacité si déjà en place */
}
```

> Si une variante (ex. `--ghost`/`--outline`) doit **visuellement** rester “ghost/outline”, **tu utilises les mêmes tokens** mais en respectant sa structure (fond transparent pour outline, etc.). Le **jeu de couleurs** reste celui du bouton de référence.

---

## 4) Pages/sections à vérifier
- Home (CTA du hero, “Voir le cas complet” dans Étude de cas, boutons secondaires).
- Projects, Services, Contact, About.  
  Tous les boutons doivent **afficher exactement la même palette d’états** que “Voir le cas complet”.

---

## 5) QA (obligatoire)
- Hover/Active/Focus **identiques** entre “Voir le cas complet” et **tout autre bouton**.
- Anneau de focus **même teinte/épaisseur** que le bouton de référence.
- Contraste AA conservé (au moins 4.5:1 pour le texte normal).
- Aucune régression de layout (tailles/espacements inchangés).

---

## 6) Commits
- `feat(ui): unify button color tokens using the case-study button as source of truth`
- `chore(ui): map all button variants to shared --btn-* variables (no size/style changes)`
