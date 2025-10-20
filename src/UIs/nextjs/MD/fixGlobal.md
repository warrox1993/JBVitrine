# Global CSS/Fonts & Visibility — Audit & Fix Plan

Scope: **Only audit and fix the issues listed below** in the global layer. Do not change layout, spacing, components, timings, or content. Keep existing colors unless a token is clearly wrong. Target a clean, deterministic result in all modern browsers.

Repository layout (for reference):

* `src/UIs/nextjs/src/app/globals.css` (primary target)
* `src/UIs/nextjs/src/app/layout.tsx` (next/font wiring)
* `src/UIs/nextjs/src/app/elements.css`, `utilities.css`, and any `*.module.css` using the same tokens

---

## 0) Goals (non-negotiable)

1. **Fonts:** Ensure `--font-base` and `--font-display` are valid, consistently defined, and correctly wired to Next.js `next/font`. Titles must reliably use Display; body uses Base; no regressions in weight, FOUT/FOIT, or CLS.
2. **Global CSS correctness:** Remove/replace problematic or non-portable declarations in `globals.css` that can silently invalidate rules or cause performance issues.
3. **Visibility/perf:** Fix `.section { content-visibility: auto; contain-intrinsic-size: … }` to avoid layout jumps, Safari glitches, and over-aggressive containment.
4. **Utilities sanity pass:** Keep utilities but tighten those that can degrade rendering quality (e.g., aggressive 3D hacks).

Deliverables: a minimal, reviewed patch with inline comments explaining **why** each change exists.

---

## 1) Audit Checklist (run before changing anything)

### 1.1 Tokens & Fonts

* [ ] Locate where `--font-base` and `--font-display` are defined (likely in `:root` of `globals.css`).
* [ ] Verify they hold **font stacks** only (comma-separated family names), not weights, not URLs.
* [ ] In `layout.tsx`, verify `next/font` loads are declared with `variable` and applied on `<body>` as variables, not just `className`.
* [ ] Ensure no duplicate `Segoe UI` entries and that quoting is consistent for families with spaces.
* [ ] Check that headings (`h1,h2,h3,h4`) actually use `var(--font-display)` before `var(--font-base)`.

### 1.2 Global CSS integrity

* [ ] Inspect `body { background: radial-gradient(...), ... }` for **invalid syntax** or vendor prefixes that could invalidate the block.
* [ ] Confirm `font-size-adjust` is numeric and supported value (it is), and that `-webkit-font-smoothing` / `-moz-osx-font-smoothing` are not overridden elsewhere.
* [ ] Verify any `color-mix()` or experimental functions are guarded with `@supports` or have safe fallbacks.

### 1.3 Visibility & containment

* [ ] Find `.section { content-visibility: auto; contain-intrinsic-size: auto 500px; }`.
* [ ] Confirm all pages render without **layout jumps** at first paint; measure CLS in devtools.
* [ ] Test Safari (Tech Preview if available) for content-visibility inconsistencies.

### 1.4 Utilities hygiene

* [ ] `.gpu-accelerated` is not globally applied; ensure it’s used only on elements with transforms/animations.
* [ ] `.sr-only` uses a modern, accessible pattern (clip/clip-path plus overflow hidden) and doesn’t trap focus.
* [ ] `.gradient-text`, `.gradient-border` don’t leak paint effects (no missing `background-clip: text` fallbacks).

---

## 2) Corrections (exact changes)

> Provide a single PR with the following minimal patches. Keep comments — they are part of the documentation debt paydown.

### 2.1 `layout.tsx` — wire `next/font` variables cleanly

* Ensure fonts are loaded with `variable` names matching our tokens and applied to `<body>`.

```ts
// layout.tsx — ensure this shape (names may differ, keep semantics)
import { Inter } from "next/font/google";
import { Instrument_Sans } from "next/font/google";

const base = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400","700"],
  variable: "--font-base",
});

const display = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600","700"],
  variable: "--font-display",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${base.variable} ${display.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

**Why:** We want the variables present on the root so `var(--font-*)` resolves everywhere without depending on per-component classes.

### 2.2 `globals.css` — fix font tokens and usage

* Replace the current `--font-base` / `--font-display` definitions with safe stacks (and remove duplicates).
* Ensure headings prefer Display with Base as fallback.

```css
/* globals.css */
:root {
  /* keep as pure font-family stacks; no weights here */
  --font-base: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
               "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-display: "Instrument Sans", Inter, ui-sans-serif, system-ui, -apple-system,
                  BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  font-family: var(--font-base);
  line-height: 1.55;
  color: var(--color-text);
  /* keep background; if multiple gradients are used, validate with devtools that syntax parses */
}

h1, h2, h3, h4 {
  font-family: var(--font-display), var(--font-base);
}
```

**Why:** Some builds break when the custom properties contain unexpected tokens or duplicates that produce parse errors. This normalizes the stacks.

### 2.3 `globals.css` — guard experimental color/gradient functions

* Any `color-mix()` or non-standard functions must be behind `@supports`, with a fallback that always parses.

```css
/* Fallback first (always parses) */
a { color: var(--color-accent); }

/* Progressive enhancement */
@supports (color: color-mix(in oklab, white, black)) {
  a:hover {
    color: color-mix(in oklab, var(--color-accent), var(--color-primary) 10%);
  }
}
```

**Why:** A single invalid declaration can drop the whole rule in some engines, which looks like “no styles applied”.

### 2.4 `.section` visibility — prevent layout jumps and cross-browser glitches

* Replace the current block with a guarded, vertical-flow-friendly version.
* Use `contain-intrinsic-size` with a **fixed block-size** that matches typical section height, not `auto 500px`.
* Provide a no-op fallback for browsers without support.

```css
/* globals.css */
.section {
  /* fallback: render normally where unsupported */
}

@supports (content-visibility: auto) {
  .section {
    content-visibility: auto;
    /* vertical pages: define block-size only to avoid CLS */
    contain-intrinsic-size: 700px; /* tune: see QA below */
  }
}
```

QA notes:

* If a section is usually much taller (e.g., hero), set `contain-intrinsic-size: 900px`.
* Measure CLS after this change; adjust per template (hero/testimonials/feature sections can get their own tuned size).
* Do not use `auto 500px`: it’s poorly supported and can produce odd intrinsic sizing.

### 2.5 Utilities — limit heavy GPU hints

* Keep `.gpu-accelerated` but make it opt-in and safer.

```css
/* utilities.css */
.gpu-accelerated {
  will-change: transform;           /* only when animation is present */
  backface-visibility: hidden;
  /* Remove translateZ(0) and perspective by default to avoid blur/AA artifacts on text. */
}
```

* If a specific animation needs the old behavior, create a **new** utility `.gpu-accelerated-3d` and apply it only there.

### 2.6 Screenreader utility — modern, accessible pattern

* Confirm `.sr-only` doesn’t trap keyboard focus and is reversible with `.not-sr-only` if needed.

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}
.not-sr-only {
  position: static; width: auto; height: auto;
  margin: 0; overflow: visible; clip: auto; white-space: normal;
}
```

---

## 3) Tests to run (must pass)

1. **Font routing**

    * In DevTools, on `<body>`, verify both `--font-base` and `--font-display` are present (computed styles).
    * In the “Rendered Fonts” pane, confirm headings render with Display font; body with Base.

2. **No silent rule drops**

    * Temporarily break one `@supports` block and verify fallback still applies (no “unstyled” look).

3. **CLS**

    * Lighthouse and Performance panel: CLS ≤ 0.02 on home page with network throttling (Slow 4G).
    * Scroll through sections; no late reflows caused by `content-visibility`.

4. **Safari check**

    * Safari stable: page is stable with `content-visibility` block guarded by `@supports`.
    * If unsupported, page still renders identically.

5. **Animation sharpness**

    * Elements with `.gpu-accelerated` no longer show text blurring. If needed, apply the stronger 3D utility only to media-heavy components.

---

## 4) Acceptance Criteria

* `next/font` variables wired on `<body>`; headings use Display; body uses Base.
* No duplicated/invalid font family tokens; no parse errors in `globals.css`.
* `content-visibility` guarded; `contain-intrinsic-size` set per section type; CLS within target.
* Utilities are safe by default; no global 3D hacks on text.
* No visual regressions in spacing/layout; only behavior and rendering quality improved.

---

## 5) Rollback Plan

* Single PR with separated commits:

    * `feat(fonts): wire next/font variables`
    * `fix(globals): normalize font tokens`
    * `fix(visibility): guard content-visibility and intrinsic size`
    * `chore(utils): soften gpu-accelerated defaults`
* If any regression is detected, revert the last commit only; the rest should remain safe.

---

## 6) Notes

* Do not introduce new colors or change existing color tokens in this PR. That was handled in a separate theme task.
* Keep comments in CSS explaining **why** — this avoids future accidental removal of guards/fallbacks.
