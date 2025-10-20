---

# ⚙️ Technical Enhancement — Footer Logo Alignment (Final Implementation + Responsive Optimization)
> **Context:** Applied according to Context7 (Next.js docs best practices for `next/image` intrinsic dimensions and ratio).  
> **Goal:** Ensure the footer logo is perfectly vertically centered, non-distorted, crisp on all devices, and responsive down to 320 px.

---

## 🧩 Problem Recap

The footer logo previously appeared slightly misaligned with the other footer columns (“Navigation” / “Legal”).  
Root cause: combination of **inline image baseline alignment**, **grid misalignment**, and **residual global rules** forcing stretch or offset.

---

## ✅ Expected Final Behavior

- The logo must remain **perfectly centered vertically** within the footer row.
- Maintain **1 : 1 aspect ratio** at all viewport sizes.
- Preserve **crisp rendering** (no compression or blur).
- Be **responsive**: automatically scale between 200 px – 300 px depending on screen width.
- No layout shift (CLS = 0) — intrinsic width/height provided to `next/image`.

---

## 🧱 Implementation Steps (Codex-Executable Sequence)

### STEP 1 — HTML / JSX wrapper confirmation

**File:** `src/UIs/nextjs/src/components/sections/Footer/Footer.tsx`

Ensure the logo image is wrapped in its own container for vertical control:

```tsx
<div className={styles.logoCell}>
  <Image
    src="/images/logofooter/LogoFoot.webp"
    alt="Smidjan footer logo"
    width={300}
    height={300}
    unoptimized
    className={styles.logoFooter}
  />
</div>
```

- Keep `unoptimized` = true to avoid recompression of the WebP file.
- Ensure the file used is `LogoFoot.webp` (lossless, 1 : 1 ratio).

---

### STEP 2 — Remove legacy global overrides

Search the codebase for any CSS rule similar to:
```css
.grid > div:first-child img {
  width: 100%;
  height: 100%;
}
```
or
```css
img {
  vertical-align: baseline;
}
```

If found, **delete** or override them with:
```css
.grid > div:first-child img,
footer img {
  width: auto !important;
  height: auto !important;
  vertical-align: middle !important;
}
```

Reason: global `width:100%` or `height:100%` breaks the logo’s intrinsic ratio.

---

### STEP 3 — Adjust footer grid alignment

**Selector:** `.grid` inside `Footer.module.css`

Add or update:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);

  /* Comment or remove align-items:center if you want only the logo centered */
  /* align-items: center; */
}
```

Explanation:
- Using `align-items:center` on the grid centers *all* columns;
- If you prefer strict geometric centering only for the logo, keep this commented and handle alignment inside `.logoCell`.

---

### STEP 4 — Create / update `.logoCell` (centering container)

```css
.logoCell {
  display: flex;
  align-items: center;        /* geometric vertical center */
  justify-content: flex-start;
  line-height: 0;             /* removes inline descender gap */
}
```

This ensures that the logo is centered **independently** of the other columns, regardless of their height or line-height.

---

### STEP 5 — Final `.logoFooter` rule (with responsive sizing)

Replace any existing `.logoFooter` block with this **exact version**:

```css
.logoFooter {
  display: block;                     /* removes inline baseline alignment */
  width: clamp(200px, 14vw, 300px);   /* responsive scaling */
  height: clamp(200px, 14vw, 300px);
  aspect-ratio: 1 / 1;
  object-fit: contain;

  image-rendering: crisp-edges;
  max-width: none;
  max-height: none;
  -webkit-user-drag: none;
  user-select: none;

  transform: none;                    /* remove legacy translateY(-2px) */
  filter: drop-shadow(0 0 8px rgba(255,165,0,0.25)); /* optional glow */
}
```

Optional override for small devices if you prefer discrete breakpoints instead of clamp:

```css
@media (max-width: 768px) {
  .logoFooter {
    width: 240px;
    height: 240px;
  }
}
```

---

### STEP 6 — Forbidden properties (Codex guard clause)

Codex must ensure the following **are absent** from `.logoFooter`, `.logoCell`, or `.grid`:

```css
translateY(-2px);
align-self: flex-start;
vertical-align: baseline;
width: 100%;
height: 100%;
margin-top;
margin-bottom;
```

Any occurrence of these rules must be removed or overridden.

---

### STEP 7 — Post-Validation Checklist

| Checkpoint | Expected Result |
|-------------|----------------|
| `.logoFooter` bounding box | Square, ratio 1:1 |
| `.logoCell` alignment | Content centered vertically |
| Footer row | All columns aligned on shared center line |
| Responsive test | Scales smoothly 200→300 px |
| Browser DevTools | `display:block`, no baseline gap |
| Next.js CLS | 0 (intrinsic width/height prevents layout shift) |

---

### STEP 8 — Optional optical correction

If optical perception shows a 1 px offset due to font baselines of adjacent text, apply:

```css
.logoFooter {
  transform: translateY(1px);
}
```

Never exceed ±2 px correction.

---

## 🧪 QA Verification Script

After modifications:
```bash
npm run dev
# open http://localhost:3000
# Inspect footer in Chrome DevTools:
#  - .logoFooter display:block
#  - .logoCell align-items:center
#  - logo visually centered between top and bottom of footer
```

Optional automated diff (if Playwright configured):
```bash
npx playwright test tests/visual/footer-alignment.spec.ts
```
Expected: `.logoFooter` center Y position = `.grid` center ±1 px tolerance.

---

## 🧾 Commit Template

```
fix(footer): finalize logo vertical alignment and responsive sizing

- Wrapped logo in .logoCell flex container
- Applied display:block to .logoFooter (removed inline baseline)
- Standardized aspect-ratio 1/1, crisp rendering
- Added responsive clamp(200px,14vw,300px)
- Removed global width/height:100% overrides
- Validated against Context7 (Next.js image intrinsic dimensions)
```

---

## 🔒 Outcome

After applying this Markdown:
- The logo remains visually centered regardless of footer content height.
- The 1:1 aspect ratio is guaranteed by CSS and intrinsic width/height.
- All residual vertical drift or baseline artifacts are eliminated.
- The layout passes responsive and accessibility QA.

---

✅ **End of Codex-Executable Footer Logo Alignment Documentation**

---
