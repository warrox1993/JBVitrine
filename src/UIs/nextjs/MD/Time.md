# AboutTimelineLayoutFix.md — Align timeline like the reference (no centered content)

## Goal

Fix the About timeline layout so it matches the reference:

* Do **not** center slide content.
* Years column (pagination) sits on the **left**.
* Slide content block (year/title/text) is **right-aligned**, vertically centered on the image.
* Keep current color theme (tokens only), no new palette.

Scope: `src/UIs/nextjs/src/app/about/timeline.css` and `Timeline.tsx` only. No regressions elsewhere.

---

## TL;DR changes

1. Move the content block to the **right** and align text to **right**.
2. Reposition the dark **halo** so it supports the right content.
3. Place years pagination on the **left**; ensure it is visible above slides.
4. Put Prev/Next buttons centered vertically on block sides.

---

## 1) Replace the content block rules (not centered anymore)

**File:** `src/UIs/nextjs/src/app/about/timeline.css`
**Find and replace the whole block** for `.timeline .swiper-slide-content`:

```diff
-.timeline .swiper-slide-content {
-  position: absolute;
-  text-align: center;
-  width: 80%;
-  max-width: 310px;
-  right: 50%;
-  top: 13%;
-  transform: translate(50%, 0);
-  font-size: 12px;
-  z-index: 2;
-}
+.timeline .swiper-slide-content {
+  position: absolute;
+  right: 10%;                  /* anchor on the right side */
+  top: 50%;                    /* vertical center */
+  transform: translateY(-50%); /* no horizontal translation */
+  text-align: right;           /* right align all text */
+  width: clamp(260px, 25%, 400px);
+  max-width: 400px;
+  font-size: 12px;
+  z-index: 3;
+}
```

Desktop refinement (keep existing media query, but ensure these values win):

```diff
 @media (min-width: 768px) {
-  .timeline .swiper-slide-content {
-    right: 30%;
-    top: 50%;
-    transform: translateY(-50%);
-    width: 310px;
-    font-size: 11px;
-    text-align: right;
-  }
+  .timeline .swiper-slide-content {
+    right: 10%;
+    top: 50%;
+    transform: translateY(-50%);
+    width: 400px;
+    font-size: 13px;
+    text-align: right;
+  }
 }
```

---

## 2) Reposition the dark halo (ellipse) to support the right content

**File:** `timeline.css`
**Replace the entire `::after` block**:

```diff
-.timeline .swiper-slide::after {
-  right: -115%;
-  bottom: -10%;
-  width: 100%;
-  height: 100%;
-  background-color: var(--tl-shadow);
-  box-shadow: -230px 0 150px 60vw var(--tl-shadow);
-  border-radius: 100%;
-}
+.timeline .swiper-slide::after {
+  right: -25%;
+  bottom: -8%;
+  width: 240px;
+  height: 60%;
+  background-color: var(--tl-shadow);
+  box-shadow: -200px 0 150px 40vw var(--tl-shadow);
+  border-radius: 100%;
+  z-index: 1;
+}
```

Desktop tune inside the existing media queries (override if present):

```diff
 @media (min-width: 768px) {
-  .timeline .swiper-slide::after {
-    right: -30%;
-    bottom: -8%;
-    width: 240px;
-    height: 50%;
-    box-shadow: -230px 0 150px 50vw var(--tl-shadow);
-  }
+  .timeline .swiper-slide::after {
+    right: -22%;
+    bottom: -10%;
+    width: 260px;
+    height: 55%;
+    box-shadow: -210px 0 150px 42vw var(--tl-shadow);
+  }
 }
 @media (min-width: 1024px) {
-  .timeline .swiper-slide::after {
-    right: -20%;
-    bottom: -12%;
-    width: 240px;
-    height: 50%;
-    box-shadow: -230px 0 150px 39vw var(--tl-shadow);
-  }
+  .timeline .swiper-slide::after {
+    right: -18%;
+    bottom: -12%;
+    width: 280px;
+    height: 55%;
+    box-shadow: -200px 0 150px 38vw var(--tl-shadow);
+  }
 }
```

---

## 3) Years pagination on the left, always above the slide

**File:** `timeline.css`
Move the pagination block to the **left**, increase stacking order:

```diff
-.timeline .timeline-pagination {
-  right: 15% !important;
-  height: 100%;
-  display: none;
-  flex-direction: column;
-  justify-content: center;
-  font-style: italic;
-  font-weight: 300;
-  font-size: 18px;
-  z-index: 4;
-  position: absolute;
-  top: 0;
-}
+.timeline .timeline-pagination {
+  position: absolute;
+  top: 0;
+  left: 4%;
+  height: 100%;
+  display: none;                /* becomes flex ≥ 768px */
+  flex-direction: column;
+  justify-content: center;
+  text-align: left;
+  font-style: italic;
+  font-weight: 300;
+  font-size: 18px;
+  z-index: 4;                   /* above slide + halo */
+  pointer-events: auto;
+}
```

Keep the vertical guide line, but align with left column:

```diff
-.timeline .timeline-pagination::before {
-  left: -30px;
-  background-color: var(--tl-divider);
-}
+.timeline .timeline-pagination::before {
+  left: -30px;
+  background-color: var(--tl-divider);
+}
```

Make sure it **shows on desktop**:

```diff
 @media (min-width: 768px) {
-  .timeline .timeline-pagination { display: flex; }
+  .timeline .timeline-pagination { display: flex; }
 }
```

Bullets remain as years; no change needed, but keep their z-index inherited from parent.

---

## 4) Place Prev/Next buttons mid-height on the sides

**File:** `timeline.css`

```diff
 .timeline .timeline-button-prev,
 .timeline .timeline-button-next {
   background-size: 20px 20px;
-  top: 15%;
+  top: 50%;
   width: 20px;
   height: 20px;
-  margin-top: 0;
-  z-index: 5;
+  margin-top: 0;
+  transform: translateY(-50%);
+  z-index: 5;
   transition: transform .2s ease;
   position: absolute;
   background-repeat: no-repeat;
   cursor: pointer;
 }
-.timeline .timeline-button-prev { left: 8%; }
-.timeline .timeline-button-next { right: 8%; }
+.timeline .timeline-button-prev { left: 2%; }
+.timeline .timeline-button-next { right: 2%; }
```

Desktop variant (optional fine-tune):

```css
@media (min-width: 1024px) {
  .timeline .timeline-button-prev { left: 1.5%; }
  .timeline .timeline-button-next { right: 1.5%; }
}
```

---

## 5) Keep animations and colors as is (theme-safe)

* No new colors. All accents continue to use `var(--tl-accent)` and existing tokens.
* The cascade reveal (year → title → text) remains unchanged.
* Autoplay, pagination, and navigation from previous fix are preserved.

---

## Sanity checks (blocking)

* Slide content is **right-aligned** and vertically centered in every breakpoint ≥ 768px.
* Pagination (years) appears **left**, vertical, clickable, not overlapped.
* Buttons are visible, centered vertically, and clickable.
* No new colors introduced; tokens only.
* No overflow clipping the pagination or buttons.

---

## Files touched

* `src/UIs/nextjs/src/app/about/timeline.css` (layout + positions)
* `src/UIs/nextjs/src/app/about/Timeline.tsx` (no changes required here for alignment)

---

## Completion definition

When navigating desktop:

* You see the left years column.
* You see the right content block (aligned right), not centered.
* Halo darkens the right side behind text, not the whole slide.
* Prev/Next sit mid-height near edges; autoplay keeps advancing.

After merge, capture before/after screenshots (desktop 1440px, mobile 390px) and run a quick Lighthouse to confirm no contrast regressions.
