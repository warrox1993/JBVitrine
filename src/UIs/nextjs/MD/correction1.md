Perfect — yes, writing the `.md` in **English** will make Codex interpret and apply it far more predictably.
Here’s your **optimized English `.md` block** version of the previous instructions, rewritten in clean, developer-oriented technical English with full precision.
You can safely append it to the end of your existing `.md` file.

---

````markdown
---

# 🧭 NAVBAR FIX — ALIGN RIGHT & PREVENT SHIFT ON SIDEBAR HOVER

## 🎯 Goal

1. Keep the **brand ("V / VotreBrand") aligned left** inside the header.  
2. Align **all navbar links to the right** within the same header.  
3. When the sidebar expands (`width: 80px → 240px` on hover),  
   **the navbar links must remain perfectly fixed** at the right edge — no visual “push” or shifting.  
4. Maintain 100% of the visual style, colors, typography, shadows, and animations already implemented.

---

## 🧩 Structural Requirements

### 1. Header HTML (correct structure)

The header must contain:
- The **brand block** on the left.
- The **navigation links** on the right.

There must be **no wrapper elements** between `<header>` and `.header-nav`.

```html
<header>
  <div class="navbar-brand">
    <div class="navbar-icon">V</div>
    <span class="navbar-text">VotreBrand</span>
  </div>

  <nav class="header-nav" aria-label="Primary navigation">
    <a href="#work" class="header-link">Work</a>
    <a href="#services" class="header-link">Services</a>
    <a href="#process" class="header-link">Process</a>
    <a href="#contact" class="header-link">Contact</a>
  </nav>
</header>
````

> The sidebar must **not** contain the brand anymore.

---

## 🎨 CSS Adjustments (Core Fix)

The current sidebar-hover behavior uses:

```css
.sidebar:hover ~ header,
.sidebar:hover ~ main {
  left: 240px;
}
```

That is correct — **keep it as-is**.

We will fix the navbar layout using flexbox alignment so that
the links always stay visually pinned to the right, even when the header’s `left` offset changes.

### ✅ Corrected Header Layout

```css
/* Header container — maintain existing positioning */
header {
  display: flex;
  align-items: center;
  gap: 24px;
  /* keep existing position, height, padding, transitions, etc. */
}

/* Brand stays on the left */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: auto;   /* pushes nav to the right */
}

/* Navbar links aligned to the right */
.header-nav {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-left: auto;    /* ensures nav sticks to the right edge */
}

/* Keep the existing link visuals */
.header-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  position: relative;
  transition: var(--transition-fast);
}

.header-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.header-link:hover {
  color: var(--text-primary);
}

.header-link:hover::after {
  width: 100%;
}
```

**Why this works:**
Even when the header’s `left` offset changes during sidebar hover,
the flex layout ensures the navigation section (`.header-nav`) always remains visually anchored to the viewport’s right edge.
No absolute positioning is required.

---

## ⚙️ Optional Absolute Fallback (only if minor drift remains)

If a very small horizontal drift still appears (depending on viewport scaling),
you can lock the navbar to the right side of the header explicitly:

```css
.header-nav {
  position: absolute;
  right: 48px; /* same horizontal padding as header */
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}
```

> Use this **only** if necessary.
> The flex layout above should already solve the issue in 99% of cases.

---

## 🔎 QA Checklist

* [ ] On desktop (1440×900):

    * Brand stays on the **left**.
    * Navbar links remain **on the right** at all times.
* [ ] Hovering the sidebar (`width: 80px → 240px`):

    * Header correctly shifts left → 240px.
    * **Navbar links do not move visually**.
* [ ] No flicker, no jump, no overflow.
* [ ] Works identically on both App Router (`layout.tsx`) and Pages Router (`_app.tsx`).

---

## ✅ Acceptance Criteria

* Pixel-perfect alignment with previous design.
* `.header-nav` visually fixed at the right edge of the header, regardless of sidebar hover state.
* 100% of previous styles preserved (colors, font, underline hover animation).
* No new JavaScript dependencies.
* DOM order: `Sidebar → Header → Main` remains identical.

---

## 🧪 Visual Testing

Compare screenshots **before/after** (Desktop 1440×900):

| Scenario                 | Expected Behavior                                      |
| ------------------------ | ------------------------------------------------------ |
| Sidebar collapsed (80px) | Navbar links fully visible, aligned right              |
| Sidebar expanded (240px) | Header moves, but links remain in same screen position |
| Mobile (<768px)          | Sidebar collapsed, navbar layout unchanged             |

---

## 🧰 Files to Update

* `/components/Header.tsx`
* `/styles/globals.css`

---

## ⚠️ Notes for Codex

* **Do not** alter sidebar CSS or hover behavior.
* **Do not** modify the header’s `left` transition logic.
* Apply only layout fixes to the header content (brand + nav).
* The visual design must remain pixel-identical.

---


Good — that `.md` is already clean, explicit, and Codex-friendly.
If you want the *whole homepage* to reach professional polish, there are a few visual and structural improvements you could safely add as new sections at the end of the file — not a redesign, just production-grade refinements Codex can apply without breaking anything.

---

### 1. **Consistent vertical rhythm**

Right now, the hero section and following blocks have a slightly irregular vertical spacing.
Add to the `.md` something like:

````markdown
## 🧩 Section Spacing Consistency

Ensure that all major sections (`.hero`, `.services`, `.process`, `.projects`, `.contact`) share a consistent top and bottom padding scale.

```css
:root {
  --section-padding-desktop: 120px;
  --section-padding-mobile: 80px;
}

section {
  padding-block: var(--section-padding-desktop);
}

@media (max-width: 768px) {
  section {
    padding-block: var(--section-padding-mobile);
  }
}
````

This keeps the page breathing evenly on all viewports.

````

---

### 2. **Hero responsiveness & optical balance**
In large screens, the text block is perfectly centered vertically but too close to the left edge compared with the sidebar.  
You can instruct Codex:

```markdown
## 🪶 Hero Layout Adjustment

Add left padding equal to the collapsed sidebar width (≈80px) so the hero text remains optically centered when the sidebar is visible.

```css
.hero .container {
  padding-left: calc(80px + 48px);
}

@media (max-width: 768px) {
  .hero .container {
    padding-left: 24px;
  }
}
````

````

---

### 3. **Typography rhythm & line-length**
Your hero’s subtitle (`.hero-subtitle`) is a bit wide on very large screens.  
Add a max-width cap and improve line-height:

```markdown
## ✍️ Text Readability Enhancements

```css
.hero-subtitle {
  max-width: 600px;
  line-height: 1.75;
}
````

Maintain the same color, but Codex can reduce the font size by 1–2 px on small screens.

````

---

### 4. **Button consistency**
Both `.btn-primary` and `.btn-secondary` look great but differ slightly in padding and shadow strength.  
Add:

```markdown
## 🔘 Button Visual Consistency

Normalize button height and inner padding so both CTAs align perfectly:

```css
.btn {
  padding: 16px 32px;
  border-radius: 12px;
}

.btn-secondary {
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
}
````

````

---

### 5. **Hover transitions optimization**
Codex can unify transitions for a smoother feel (currently some are 0.2 s, others 0.4 s):

```markdown
## ⚙️ Unified Transition Timing

```css
:root {
  --transition-fast: all 0.25s ease;
  --transition-base: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
````

````

---

### 6. **Accessibility polish**
The contrast ratio of `--text-secondary` on dark background is borderline for WCAG AA.  
You can request a slight adjustment without altering the color scheme:

```markdown
## ♿ Accessibility Contrast Improvement

Increase `--text-secondary` brightness for better contrast:

```css
:root {
  --text-secondary: #b3b3d1; /* previously #a1a1bc */
}
````

````

---

### 7. **Footer alignment**
Your footer currently sits flush with the left margin offset (80 px).  
You can make it visually aligned with content instead of sidebar edge:

```markdown
## ⚓ Footer Alignment

Ensure footer content aligns with main container, not sidebar offset:

```css
footer {
  margin-left: 0;
}
````

````

---

### 8. **Performance micro-optimizations**
Tell Codex to:

```markdown
## 🚀 Performance Enhancements

- Move the inline SVG icons used in the sidebar into separate SVG sprite files or React components.
- Add `loading="lazy"` to non-critical images.
- Use `will-change: transform` on elements that animate (e.g. `.sidebar`, `.hero::before`) for smoother transitions.
````
