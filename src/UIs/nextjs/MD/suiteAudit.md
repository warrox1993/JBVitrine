Perfect — here’s the **complete, developer-ready `.md` file** (in English, fully self-contained, written for Codex in *execution mode*).
It’s designed for **production-grade optimization**, covering all five performance dimensions: middleware, fonts, heavy assets, pre-LCP effects, and image optimization.
It assumes Codex has full read/write access to your Next.js project, knows the current structure, and must apply the changes while keeping your visual identity intact.

---

# PERFORMANCE-REMEDIATION.md

### Full Optimization Plan — Target LCP ≤ 2 s (Ideal 1.6–1.9 s)

## 🎯 Goal

Refactor the current Next.js project for **measurable performance improvements** without altering its visual identity.
All changes must **preserve design and UX** while reducing time-to-paint and JS/CSS cost.
Final targets (measured on production build, desktop + mobile):

* **Largest Contentful Paint (LCP)** ≤ 2.0 s (ideal 1.6–1.9 s)
* **Time to First Byte (TTFB)** ≤ 200 ms
* **Interaction to Next Paint (INP)** ≤ 200 ms
* **Cumulative Layout Shift (CLS)** ≤ 0.02
* **Initial JS payload** ≤ 150 kB gzip
* **Blocking CSS** ≤ 20 kB
* **Fonts above-the-fold** ≤ 2 files total

---

## 🧩 Phase 1 — Middleware & Server TTFB

### Current Issue

`src/app/middleware.ts` defines a **global matcher** (`/:path*`) executed for every request, even when unnecessary.
This adds overhead and increases TTFB for all routes.

### Required Actions

1. **Open:** `src/app/middleware.ts`
2. **Check usage** — if the middleware only performs redirects to `/`, or non-critical headers:

    * Remove the global matcher and wrap only the required routes (e.g., `/api/*` or `/dashboard/*`).
3. **If middleware is obsolete:** delete the file entirely.
4. **If mandatory for specific routes:**

    * Replace `matcher: ['/:path*']` with a targeted matcher array (e.g. `['/dashboard/:path*']`).
5. **Confirm**: after rebuild, TTFB in Chrome DevTools ≤ 200 ms (Fast 3G + No Throttling).

---

## 🅰️ Phase 2 — Font Optimization (`next/font`)

### Current Issue

Inter + Instrument Sans are properly imported but **with unrestricted weights/axes**, increasing download size and delaying text render.

### Required Actions

1. **Locate font imports** (likely in `src/app/layout.tsx` or `_app.tsx`):
   Example current:

   ```js
   import { Inter, Instrument_Sans } from 'next/font/google'
   ```
2. **Restrict weights explicitly** to only those used visually (e.g., 400 & 700).
   Example corrected:

   ```js
   const inter = Inter({
     subsets: ['latin'],
     weight: ['400', '700'],
     display: 'swap',
     variable: '--font-inter'
   })
   const instrument = Instrument_Sans({
     subsets: ['latin'],
     weight: ['400', '700'],
     display: 'swap',
     variable: '--font-instrument'
   })
   ```
3. **Add fallback stack** to each font via CSS variable:

   ```css
   :root {
     --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
     --font-display: 'Instrument Sans', var(--font-sans);
   }
   ```
4. **Enable `font-size-adjust`** to minimize jump between fallback and webfont:

   ```css
   body { font-size-adjust: 0.5; }
   ```
5. **Verify**:

    * No external `@import` or `<link>` font declarations remain.
    * Text appears immediately (fallback visible) → webfont swap → no layout shift.

Expected gain: −100 to −250 ms LCP improvement.

---

## 🎨 Phase 3 — Heavy Visual Effects Before LCP

### Current Issue

The Hero and Header apply costly GPU effects (`backdrop-filter`, multiple gradients, blur overlays) before first paint.
CursorGlow overlay (600×600 mix-blend-mode: screen) also composites early.

### Required Actions

#### 3.1 Header (blur effect)

File: `src/components/HeaderBasic/HeaderBasic.module.css`

* Comment out or conditionally disable `backdrop-filter` and heavy shadows in the default state.
* Re-enable via a lightweight `useEffect` on mount (after hydration).

Example pattern:

```js
useEffect(() => {
  document.body.dataset.fxReady = 'true';
}, []);
```

CSS:

```css
header { backdrop-filter: none; }
body[data-fxReady='true'] header { backdrop-filter: blur(8px); }
```

#### 3.2 Hero Background

File: `src/components/sections/Hero/Hero.module.css`

* Replace multiple overlapping gradients and filters with a lighter static gradient for first paint.
* Add a CSS class or data-attribute that re-applies the full effect after interactivity:

```css
.hero { background: var(--hero-gradient-light); }
body[data-fxReady='true'] .hero { background: var(--hero-gradient-full); }
```

#### 3.3 CursorGlow Overlay

File: `src/components/effects/CursorGlow.tsx`

* Import dynamically:

  ```js
  const CursorGlow = dynamic(() => import('./CursorGlow'), {
    ssr: false,
    loading: () => null,
  });
  ```
* Mount it **after first idle**:

  ```js
  useEffect(() => {
    if ('requestIdleCallback' in window)
      requestIdleCallback(() => setShow(true));
    else
      setTimeout(() => setShow(true), 500);
  }, []);
  ```

Expected gain: −150 to −300 ms paint improvement.

---

## 🧹 Phase 4 — Public Folder Cleanup (Dead Assets)

### Current Issue

Large unused assets remain in `/public`:

* `/public/webfonts/fa-solid-900.svg` (~0.9 MB)
* `/public/assets/js/jquery.min.js` (~89 kB)
* Legacy `/public/css/main.css` (template residue)

### Required Actions

1. **Delete** the following unused files and folders:

    * `/public/webfonts/` (entire directory if not referenced)
    * `/public/assets/js/jquery.min.js`
    * `/public/css/main.css` (if not imported anywhere)
2. **Search the codebase** for any references:

    * `grep -ri 'fontawesome' src/`
    * `grep -ri 'jquery' src/`
3. **If any CSS references remain** (e.g., old icons):

    * Replace with existing SVG inline icons (see Phase 5).
4. **Verify build** — ensure `next build` produces no missing asset warnings.

Expected benefit: smaller build, faster deploy, reduced risk of accidental load.

---

## 🖼️ Phase 5 — Images and Icons

### Current Issue

Testimonials avatars are JPEGs; no explicit dimensions or lazy loading hints.
Lucide-react icons add parse/exec overhead for only a few static icons.

### Required Actions

#### 5.1 Testimonials Avatars

* Locate all avatar images under `/images/testimonials/`.
* Replace `<img>` with `<Image>` from `next/image`:

  ```jsx
  import Image from 'next/image';

  <Image
    src="/images/testimonials/john.webp"
    width={96}
    height={96}
    alt="John Doe"
    loading="lazy"
    fetchPriority="low"
  />
  ```
* Convert all avatars to **WebP** or **AVIF** (quality ≈ 80).
* Ensure `priority={false}` (not part of above-the-fold LCP).

#### 5.2 Icons

* Replace `lucide-react` imports with inline SVG for static icons (e.g. Sidebar, CTA, Process).
* If a shared icon component exists, rewrite it as:

  ```jsx
  export const IconHome = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  );
  ```

Expected gain: −50 to −150 ms JS parse/exec reduction.

---

## 🌐 Phase 6 — Network & Headers

### Required Actions

1. **Add proper cache headers** for static assets:

    * `Cache-Control: public, max-age=31536000, immutable`
2. **Ensure compression** (Brotli > Gzip).
3. **Enable HTTP/2 or HTTP/3** on the CDN or host.
4. **Preconnect** only to critical domains (fonts, API, CDN) — no redundant preloads.
5. **Confirm** via DevTools > Network > Headers that all fingerprinted assets are immutable.

Expected effect: improved repeat views and slightly faster cold starts (-50 ms TTFB typical).

---

## 🧪 Phase 7 — Verification & Measurement

### Measurement Procedure

* Build prod: `next build`
* Run prod: `next start`
* Chrome → DevTools → Performance → Web Vitals overlay
* Measure 3 runs per mode (Fast 3G & No Throttling), median values:

| Metric           | Target        | Actual (Before) | Expected (After)   |
| ---------------- | ------------- | --------------- | ------------------ |
| LCP              | ≤ 2.0 s       | 2.19 s          | 1.7–1.9 s          |
| TTFB             | ≤ 200 ms      | —               | ≤ 200 ms           |
| INP              | ≤ 200 ms      | —               | ≤ 200 ms           |
| CLS              | ≤ 0.02        | 0               | 0                  |
| JS Initial       | ≤ 150 kB gzip | 116 kB          | 116 kB (unchanged) |
| CSS Blocking     | ≤ 20 kB       | 17 kB           | 17 kB (unchanged)  |
| Fonts Above Fold | ≤ 2 files     | 2               | 2 (subset)         |

### Export Expected

* `reports/performance/` directory containing:

    * Lighthouse JSON & HTML reports (desktop + mobile)
    * Network HAR files
    * Coverage summary (unused CSS/JS)
    * Screenshot of Web Vitals overlay
    * CSV or JSON inventories of:

        * Assets (type, size, cache, used_before_LCP)
        * Fonts (family, weight, subset, display)
        * Bundles (size, executed_before_LCP)
        * CSS (blocking, unused %)
        * Scripts 3rd-party (none expected)

---

## ✅ Acceptance Criteria

All of the following must be true:

* No middleware executes on routes unnecessarily.
* Fonts subsetted (explicit weights) and loaded with `display: swap`.
* Text above-the-fold visible instantly (fallback → webfont swap → no jump).
* No heavy filters/overlays active before LCP.
* `CursorGlow` dynamically loaded after first idle.
* All heavy unused public assets removed.
* All testimonial avatars use `next/image` with fixed dimensions and modern formats.
* No runtime errors or broken visuals.
* Verified LCP ≤ 2 s (ideal 1.6–1.9 s) on both desktop and mobile.

---

## 📘 Notes for Codex

* Operate in **read + write** mode for project files.
* Preserve **styling and design fidelity** 1:1; modify only performance-related logic.
* No additional libraries unless required by Next.js itself.
* Document every modified file path in a final summary table:

  ```
  | File Path | Change Summary | Reason |
  |------------|----------------|--------|
  | src/app/middleware.ts | Restricted matcher to /dashboard/* | Reduce TTFB |
  | src/app/layout.tsx | Font weights restricted to 400/700 | Reduce LCP |
  | ... | ... | ... |
  ```

---

After this pass, run a new audit (`Lighthouse + Web Vitals`).
If LCP is **≤ 1.9 s**, freeze optimization and document final build metrics;
if still above 2 s, prepare a secondary phase focusing on JS execution & image priorities.

---

