Excellent réflexe : tu veux donc **déplacer le bloc "V / VotreBrand" (branding)** de la **sidebar** vers la **navbar**, tout en gardant *strictement le même design, la même typographie, les mêmes espacements et la même animation hover* sur le reste.

Voici un fichier `.md` à ajouter à ton repo pour demander précisément cette modification à Codex — sans qu’il modifie le rendu général.

---

````markdown
# 🧭 PROJECT SPEC — Move Branding from Sidebar to Navbar (Visual Parity Required)

## 🎯 Objective

The visual brand block currently located in the **sidebar**  
```html
<div class="sidebar-brand">
  <div class="sidebar-icon">V</div>
  <span class="sidebar-brand-text">VotreBrand</span>
</div>
````

must be **moved into the navbar (`header`)** instead.

The goal is to preserve **100 % of the visual design and behavior**:

* Same typography, colors, gradients, spacing, and proportions.
* Sidebar keeps its current layout, hover animation, and structure (minus the brand).
* Navbar must now display the brand on the **left**, before the navigation links.

---

## 🧩 Current Situation

### Sidebar (before)

```html
<aside class="sidebar">
  <div class="sidebar-brand"> ... </div>
  <nav class="sidebar-nav"> ... </nav>
</aside>
```

### Header (before)

```html
<header>
  <nav class="header-nav">
    <a href="#projets" class="header-link">Work</a>
    <a href="#services" class="header-link">Services</a>
    <a href="#process" class="header-link">Process</a>
    <a href="#contact" class="header-link">Contact</a>
  </nav>
</header>
```

---

## 🧱 Required Modification

### 1. Remove Brand from Sidebar

Delete this entire block from `Sidebar.tsx`:

```html
<div class="sidebar-brand">
  <div class="sidebar-icon">V</div>
  <span class="sidebar-brand-text">VotreBrand</span>
</div>
```

Keep all other markup in place — the spacing of `.sidebar-nav` must not change.

### 2. Add Brand to Navbar (Header)

Insert the same markup **inside the header**, before the nav links.

Resulting structure:

```html
<header>
  <div class="navbar-brand">
    <div class="navbar-icon">V</div>
    <span class="navbar-text">VotreBrand</span>
  </div>
  <nav class="header-nav">
    ...
  </nav>
</header>
```

---

## 🎨 Styling Rules (to add to `globals.css`)

Add these classes below the existing header section.
They replicate `.sidebar-brand` styles, with adjusted alignment for horizontal layout.

```css
/* === Navbar Brand (moved from sidebar) === */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: auto;          /* pushes nav links to the right */
}
.navbar-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--accent-primary), #6366f1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
}
.navbar-text {
  font-weight: 700;
  font-size: 20px;
  color: var(--text-primary);
  white-space: nowrap;
}
```

> Important: **Do not** reuse `.sidebar-brand` classes directly,
> as their vertical spacing and opacity animations are specific to the hover state of the sidebar.

---

## 🧭 Expected Layout (Final)

```
Header (fixed)
 ├─ Brand ("V VotreBrand") aligned left
 └─ Navigation links aligned right (Work, Services, Process, Contact)
Sidebar (fixed left)
 └─ Navigation icons only (no brand)
Main (follows same offset behavior)
```

* Header and sidebar continue to shift right when hovering the sidebar (rule `:hover ~ header` remains unchanged).
* The brand stays visible at all times inside the header (does not animate or fade).

---

## 🧪 Acceptance Criteria

* Brand visually identical (same icon, gradient, typography).
* Sidebar’s hover behavior unchanged.
* Header layout: brand left, links right.
* No regression in hover animations or alignment.
* Works identically in both App Router (`layout.tsx`) and Pages Router (`_app.tsx`) structures.

---

## ✅ Deliverables

* Updated `Sidebar.tsx` (brand removed)
* Updated `Header.tsx` (brand inserted)
* Updated `globals.css` (added `.navbar-brand`, `.navbar-icon`, `.navbar-text`)
* Pixel-perfect visual check (desktop 1440×900):
  brand position, spacing, header shift on sidebar hover.

---

## 🧩 Optional Enhancement (non-blocking)

If desired, make the brand clickable (link to home) by wrapping it in:

```tsx
<Link href="/" className="navbar-brand"> ... </Link>
```

This does **not** change layout or appearance and can be added safely in both Next App and Pages routers.

```

---

Souhaites-tu que je te fasse la **version Next.js complète du correctif** (avec les composants `Sidebar.tsx` et `Header.tsx` mis à jour et prêts à coller) ?  
Ainsi, ton `.md` servirait à la fois de doc et de patch exécutable.
```
