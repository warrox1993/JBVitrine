# unify-all-buttons.md — Un seul composant Button, mêmes propriétés partout

## 🎯 Objectif
Réduire le code et les écarts visuels en remplaçant tous les boutons par **un composant unique** `<Button />` :
- mêmes **propriétés** (API),
- mêmes **états** (hover/active/focus/disabled/loading),
- mêmes **animations** (celles de “Démarrer un projet”),
- mêmes **tokens de couleur** (déjà présents — ne pas les changer).

---

## 0) Contraintes
- ❗ Ne pas modifier la **palette** ni créer de nouvelles couleurs. Réutiliser les **tokens existants** (`--color-primary`, `--color-bg`, `--color-on-primary`, etc.).
- ❗ Ne pas toucher aux **layouts**. On ne change que les boutons.
- ❗ Respecter `prefers-reduced-motion`.
- ✅ Animation source = bouton **“Démarrer un projet”** (copie exacte, aucune autre animation).

---

## 1) API du composant unique

**Fichier**: `src/UIs/nextjs/src/components/ui/Button.tsx`  
**Styles**: `src/UIs/nextjs/src/components/ui/Button.module.css` (+ `buttons.animations.css` si séparé)

```tsx
type ButtonProps = {
  as?: 'button' | 'a' | 'link'; // rendu natif ou lien
  href?: string;                // si as='a' ou Link
  variant?: 'solid' | 'outline' | 'ghost';  // style visuel
  size?: 'sm' | 'md' | 'lg';    // 3 tailles max
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;           // extension locale
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function Button(props: ButtonProps) { /* … */ }
```

> **Uniquement ces props**. Toute autre variation précédente (btnPrimary, btnSecondary, etc.) est mappée à `variant` + tokens.

---

## 2) Tokens — source of truth (couleurs déjà existantes)

**Ne pas inventer de nouvelles valeurs.**  
Mapper les variables bouton sur tes **tokens existants** (à mettre dans `:root` si pas déjà présent, avec les mêmes références que le bouton “Démarrer un projet”):

```css
:root {
  /* solid (source = "Démarrer un projet") */
  --btn-solid-bg: var(--color-primary);
  --btn-solid-fg: var(--color-text-on-primary, #0F1115);
  --btn-solid-bg-hover: var(--color-primary-600, #E45700);
  --btn-solid-bg-active: var(--color-primary-700, #C74B00);

  /* outline */
  --btn-outline-fg: var(--color-text);
  --btn-outline-border: var(--color-border);
  --btn-outline-bg-hover: color-mix(in srgb, var(--color-primary) 12%, transparent);

  /* ghost */
  --btn-ghost-fg: var(--color-text);
  --btn-ghost-bg-hover: color-mix(in srgb, var(--color-primary) 10%, transparent);

  /* focus ring (même teinte que le CTA source) */
  --btn-focus-ring: 0 0 0 3px color-mix(in srgb, var(--color-primary) 40%, transparent);

  /* disabled (réutiliser logique existante) */
  --btn-disabled-bg: color-mix(in srgb, var(--color-primary) 25%, var(--color-bg) 75%);
  --btn-disabled-fg: color-mix(in srgb, var(--color-text) 60%, transparent);

  /* animations (copiées du CTA source) */
  --btn-anim-t: 180ms;
  --btn-anim-ease: cubic-bezier(.2,.8,.2,1);
}
```

> Si `color-mix()` est déjà protégé par `@supports`, conserve ce pattern; sinon, mets les fallbacks existants.

---

## 3) Styles — structure commune

**Button.module.css**
```css
.root {
  display: inline-flex; align-items: center; justify-content: center;
  gap: .5rem;
  border: 1px solid transparent;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  transition:
    transform var(--btn-anim-t) var(--btn-anim-ease),
    box-shadow var(--btn-anim-t) var(--btn-anim-ease),
    filter var(--btn-anim-t) var(--btn-anim-ease),
    background-position var(--btn-anim-t) var(--btn-anim-ease),
    opacity var(--btn-anim-t) var(--btn-anim-ease);
  will-change: transform, box-shadow, filter, background-position, opacity;
}

/* tailles */
.sm { height: 36px; padding: 0 .9rem; font-size: .9rem; }
.md { height: 44px; padding: 0 1.1rem; font-size: 1rem; }
.lg { height: 52px; padding: 0 1.25rem; font-size: 1.0625rem; }

.fullWidth { width: 100%; }

/* variants (couleurs via tokens existants) */
.solid {
  background: var(--btn-solid-bg);
  color: var(--btn-solid-fg);
}
.solid:hover { background: var(--btn-solid-bg-hover); }
.solid:active { background: var(--btn-solid-bg-active); }

.outline {
  background: transparent;
  color: var(--btn-outline-fg);
  border-color: var(--btn-outline-border);
}
.outline:hover { background: var(--btn-outline-bg-hover); }

.ghost {
  background: transparent;
  color: var(--btn-ghost-fg);
}
.ghost:hover { background: var(--btn-ghost-bg-hover); }

/* focus visible (couleur identique au CTA source) */
.root:focus-visible {
  outline: none;
  box-shadow: var(--btn-focus-ring);
}

/* disabled / loading */
.disabled, .loading {
  cursor: not-allowed;
  opacity: .7;
}
.disabled { background: var(--btn-disabled-bg); color: var(--btn-disabled-fg); }

/* icônes */
.icon { display: inline-flex; align-items: center; }
.icon svg { width: 1.1em; height: 1.1em; }

/* animation (copie exacte de "Démarrer un projet") */
.root:hover { transform: translateY(-1px) scale(1.01); }
.root:active { transform: translateY(0) scale(.995); }
/* Si le CTA source a un keyframes glow/gradient, dupliquer ici: */
@keyframes btn-glow-source {
  /* Copier-coller EXACT du CTA source */
}
.isAnimated { animation: btn-glow-source 3s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .root, .root:hover, .root:active, .isAnimated {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    filter: none !important;
    box-shadow: none !important;
  }
}
```

---

## 4) Implémentation Button.tsx (simplifiée)

```tsx
import cx from "clsx";
import s from "./Button.module.css";

type Props = {
  as?: 'button' | 'a';
  href?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function Button({
  as = 'button',
  href,
  variant = 'solid',
  size = 'md',
  fullWidth,
  disabled,
  loading,
  leadingIcon,
  trailingIcon,
  className,
  type = 'button',
  ariaLabel,
  children
}: Props) {
  const cls = cx(
    s.root,
    s[variant],
    s[size],
    fullWidth && s.fullWidth,
    (disabled || loading) && s.disabled,
    /* si le CTA source a une animation de fond continue: ajouter s.isAnimated ici selon un prop si besoin */
    className
  );

  if (as === 'a' && href) {
    return (
      <a className={cls} href={href} aria-label={ariaLabel} aria-disabled={disabled || loading || undefined}>
        {leadingIcon && <span className={s.icon}>{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className={s.icon}>{trailingIcon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {leadingIcon && <span className={s.icon}>{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className={s.icon}>{trailingIcon}</span>}
    </button>
  );
}
```

---

## 5) Migration — remplacer tout l’ancien code

1. **Rechercher** dans le repo : `btnPrimary|btnSecondary|btnGhost|btnOutline|Button*` (toutes variantes héritées).
2. **Remplacer** par `<Button variant="solid|outline|ghost" size="sm|md|lg" …>` en gardant **exactement** les mêmes textes/icônes/CTA.
3. **Supprimer** les anciens fichiers CSS de variantes qui ne servent plus (laisser rediriger vers `Button.module.css`).
4. **Garder** les couleurs : elles viennent des **tokens mappés** ci-dessus, déjà utilisés par “Démarrer un projet”.

---

## 6) QA (obligatoire)
- Tous les boutons ont **la même animation** que “Démarrer un projet” (hover/active/focus).
- Les **couleurs** n’ont **pas changé** (on lit les mêmes computed tokens).
- Les tailles `sm|md|lg` produisent des hauteurs/paddings cohérents, sans jank.
- `prefers-reduced-motion` coupe bien transitions/animations.
- Aucun **layout shift** en hover.
- Accessibilité : focus visible, `aria-disabled` pour liens désactivés.

---

## 7) Commits
- `feat(ui): introduce single <Button/> component with unified API`
- `feat(ui): port CTA animation to all buttons`
- `chore(ui): migrate legacy button variants to unified Button; remove dead styles`
