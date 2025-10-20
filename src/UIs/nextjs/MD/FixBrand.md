Parfait — là tu veux simplement **renforcer la présence visuelle du nom de marque (“Smidjan”)** dans le header, sans le rendre tape-à-l’œil ni casser ton style global forge sombre/cuivre. Voici le fichier `fixBrandHeader.md` à envoyer à Codex pour corriger proprement.

---

````markdown
# fixBrandHeader.md — Brand Visibility & Style Consistency (Header)

## 🎯 Goal
Make the brand name **“Smidjan”** in the header more prominent and visually stable:
- Stronger weight and contrast.
- Remove the default link color (blue) and underline.
- Preserve hover accessibility but keep it subtle and on-brand (forge copper tone).

---

## 1. Target component
**File:** `src/UIs/nextjs/src/components/layout/Header.tsx`  
**CSS:** `src/UIs/nextjs/src/components/layout/Header.module.css`  
(if style is global, apply to `.header .brand` selector)

---

## 2. Changes to apply

### a) HTML / JSX
Locate the logo/brand element:
```tsx
<a href="/" className="brand">Smidjan</a>
```
If it’s nested in a `<Link>`, ensure the brand text has its own `.brand` class for targeted styling.

---

### b) CSS adjustments

Add or modify in `Header.module.css` (or `globals.css` if header styles are global):

```css
/* Brand name visibility fix */
.brand {
  font-family: var(--font-display), var(--font-base);
  font-weight: 700;              /* Strong visual anchor */
  font-size: 1.25rem;            /* Slightly larger than nav links */
  color: var(--color-text);      /* Neutral light, not link blue */
  text-decoration: none;         /* Remove underline */
  letter-spacing: 0.02em;        /* Slight presence without widening */
  transition: color 0.2s ease, opacity 0.2s ease;
}

.brand:hover,
.brand:focus-visible {
  color: var(--color-primary);   /* Copper accent (#FF6A00) for hover only */
  opacity: 0.9;                  /* Subtle response */
  text-decoration: none;
}

/* Optional fine-tuning for mobile (if header shrinks) */
@media (max-width: 768px) {
  .brand {
    font-size: 1.1rem;
  }
}
```

---

## 3. Optional enhancement
If you want to align the flame logo + name better:
```css
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.header-logo img {
  height: 28px;
  width: auto;
}
```

This ensures the flame icon and text baseline align perfectly and the name remains crisp at any screen size.

---

## 4. Acceptance criteria
- The brand text appears **white/light gray** (`var(--color-text)`) by default.
- No underline or blue highlight visible.
- Hover/focus only adds a **soft copper tint**.
- Font weight visibly thicker than the nav links.
- Responsive: remains clear and centered in mobile view.
- Logo + text align visually if both are displayed.

---

## 5. Non-goals
- Do **not** modify nav links, layout, or colors elsewhere.
- Do **not** change the flame logo sizing unless alignment breaks.

---

## 6. Quick QA checklist
1. Check in DevTools that `.brand` inherits `var(--font-display)` and `--font-base` properly.
2. Verify hover color equals `--color-primary (#FF6A00)` with no underline.
3. Test both light/dark themes (if applicable) — ensure sufficient contrast.
4. Confirm accessible focus ring still visible (outline intact).

---

**Result expected:**  
The “Smidjan” text stands out clearly, feels bold and intentional, without the default link aesthetics or blue tint — consistent with your forge-inspired design.
````

---

Ce fichier `.md` suffit pour que Codex audite puis corrige précisément la visibilité du nom de marque dans le header, sans perturber le reste du design.
