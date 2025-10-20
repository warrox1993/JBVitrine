# Improve footer logo clarity — use context7 (PNG only)

> Context: **use context7**

## Goal
The footer logo appears blurry or faint even though the source PNG is 1024×1024.
We need to (1) enlarge it to 300 px, (2) display the original PNG without Next.js recompression,
and (3) force crisp rendering and subtle contrast improvement.

---

## File: `src/UIs/nextjs/src/components/sections/Footer/Footer.tsx`

Find the `<Image>` element for the footer logo and replace it with:

```tsx
<Image
  src="/images/logofooter/LogoFootSansBack.png"
  alt="Smidjan footer logo"
  width={300}
  height={300}
  unoptimized
  className={styles.logoFooter}
/>
Explanation
width / height = 300: true visual size for clear text and logo details.

unoptimized: disables Next.js automatic WebP compression that causes quality loss.

Keeps the same PNG path (no SVG).

File: src/UIs/nextjs/src/components/sections/Footer/Footer.module.css
Replace or extend .logoFooter with:

css
Copier le code
.logoFooter {
  width: 300px;
  height: 300px;
  aspect-ratio: 1 / 1;
  object-fit: contain;

  /* improve visual sharpness and contrast */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.25));

  /* safety: prevent external overrides */
  max-width: none;
  max-height: none;
}
Optional responsive scaling:

css
Copier le code
@media (max-width: 1024px) {
  .logoFooter {
    width: 240px;
    height: 240px;
  }
}

@media (max-width: 768px) {
  .logoFooter {
    width: 200px;
    height: 200px;
  }
}
Why this fixes the issue
300 px size fully leverages the 1024 px PNG for sharp edges.

unoptimized ensures Next.js does not re-encode the logo.

image-rendering disables blur interpolation on downscaling.

drop-shadow increases legibility on the dark background.

Validation checklist
Logo appears crisp and perfectly round, no stretch.

No visible blur or color desaturation.

No layout shift (intrinsic width/height kept).

PNG only — no SVG fallback.