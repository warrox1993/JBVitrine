---
title: About — Timeline Fix & Redesign (Swiper React)
owner: Frontend (Next.js + React + CSS)
scope: About page only — Home is READ-ONLY
status: Ready to apply
---

## Objective

Rebuild the **About page timeline** so it strongly matches the reference “Responsive Slider Timeline” behavior and layout, but **uses our existing design tokens and CSS utilities**. The current implementation has functional and styling bugs.

**Non-negotiables**
- **Home page is read-only** (no edits to Home markup/CSS and no new global CSS files).
- **No new color tokens**. Map the timeline to the **existing site palette** (accent/orange, neutrals, background gradients).
- **About-only changes**. Do not alter global nav/sidebars shared by other pages.

---

## Root causes & required fixes

1. **Legacy Swiper API**  
   Code uses v3/v4 options (`pagination: '.swiper-pagination'`, `nextButton`, `prevButton`, `paginationClickable`, `paginationBulletRender`). These are deprecated and cause runtime bugs with modern Swiper.
    - **Fix**: Use **Swiper React (v9+)** with ES modules (`Navigation`, `Pagination`, `Keyboard`, `A11y`). Configure via objects, not string selectors.

2. **Pug/templating markup & inline background URLs**  
   Current snippet relies on templated `.swiper-slide(style=...)` and `data-year` attributes. In React/Next, this often results in style hydration warnings or broken backgrounds.
    - **Fix**: Use `<SwiperSlide>` with a dedicated **content wrapper** and set background via a class or inline `style` in TSX. Years come from an array of slide objects.

3. **SCSS variables outside our token system**  
   `$white`, `$black`, `$primary`, `$gray` conflict with our tokens.
    - **Fix**: Replace with **existing CSS variables** from the site (examples below). **Do not** add new variables.

4. **Pagination bullets as years**  
   The reference uses a custom “render bullet” callback.
    - **Fix**: Implement `pagination={{ clickable: true, renderBullet }}` in Swiper React, pulling years from the slide data.

5. **Motion & accessibility**  
   Heavy transitions can cause jank and fails on reduced-motion.
    - **Fix**: Respect `prefers-reduced-motion`, keep transforms GPU-friendly, and wire keyboard navigation.

---

## Where to work (adjust to repo)

- About page route:  
  `src/UIs/nextjs/src/app/about/page.tsx`
- Timeline component (create/update **About-scoped component only**):  
  `src/UIs/nextjs/src/components/sections/About/Timeline.tsx`
- Styles: **reuse existing utilities/tokens**. If a local stylesheet is required, **co-locate** as a module and only reference existing tokens:  
  `src/UIs/nextjs/src/components/sections/About/Timeline.module.css`  
  Do not create new global CSS or new tokens.

---

## Design mapping (use existing tokens)

Map the old SCSS vars to our tokens:

- `$primary` → `var(--color-accent-1)` (our orange/amber accent)
- `$white` → `var(--color-text-1)` on dark backgrounds or `#fff` if already defined in tokens
- `$black` → `var(--color-bg-ink)` or `#000` only if token exists
- `$gray` → `var(--color-text-2)`

Shadows/overlays: reuse `--shadow-xl` or the existing gradient overlay used in hero sections.

Spacing/typography: use the same utilities already used on Home (e.g., `.px-*`, `.py-*`, `.stack-*`, heading classes).

---

## Implementation (React + Swiper v9+)

### 1) Install (if not already)
```bash
# READ-ONLY for home; this only affects About's component usage
npm i swiper
2) Timeline data (About only)
Create Timeline.data.ts next to the component:

ts
Copier le code
export type TimelineItem = {
  year: string;
  title: string;
  text: string;
  image: string; // public path or remote URL already allowed by next.config.js
};

export const TIMELINE: TimelineItem[] = [
  { year: '2016', title: 'Our nice super title', text: 'Short blurb…', image: '/images/timeline/2016.jpg' },
  { year: '2017', title: 'Scaling the craft',     text: 'Short blurb…', image: '/images/timeline/2017.jpg' },
  // … up to 6+ items
];
3) Component (Timeline.tsx)
tsx
Copier le code
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Timeline.module.css';
import { TIMELINE } from './Timeline.data';

export default function Timeline() {
  return (
    <section aria-label="Company timeline" className={styles.timelineSection}>
      <div className={styles.container}>
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y]}
          // Vertical on small, horizontal ≥ 768px
          direction="vertical"
          speed={800}
          loop={false}
          keyboard={{ enabled: true }}
          navigation={{ nextEl: `.${styles.next}`, prevEl: `.${styles.prev}` }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
            renderBullet: (index, className) => {
              const year = TIMELINE[index]?.year ?? '';
              return `<span class="${className}">${year}</span>`;
            }
          }}
          breakpoints={{ 768: { direction: 'horizontal' } }}
          className={styles.swiperRoot}
        >
          {TIMELINE.map((item) => (
            <SwiperSlide key={item.year}>
              <article
                className={styles.slide}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <span className={styles.year}>{item.year}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
          <button className={styles.prev} aria-label="Previous slide" />
          <button className={styles.next} aria-label="Next slide" />
          <div className={styles.pagination} />
        </Swiper>
      </div>
    </section>
  );
}
4) Styles (Timeline.module.css)
Use only existing tokens/utilities. Do not invent new variables.

css
Copier le code
.timelineSection { /* reuse spacing utilities if available */
  width: 100%;
}

.container {
  width: 100%;
  background: var(--color-bg-1);
  /* reuse an existing shadow token if present */
  box-shadow: var(--shadow-xl, 0 5px 25px rgba(0,0,0,.2));
}

.swiperRoot {
  position: relative;
  width: 100%;
  height: 560px; /* close to reference 600px; matches our layout */
}

.slide {
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--color-text-invert, #fff);
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

/* Overlay that mimics the circular shadow sweep from the reference,
   but simplified to fit our system */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,.55),
    rgba(0,0,0,.35) 40%,
    rgba(0,0,0,0) 65%
  );
  pointer-events: none;
}

/* Content block */
.content {
  position: absolute;
  right: 50%;
  top: 14%;
  transform: translateX(50%);
  max-width: 32rem;
  text-align: center;
}

/* Tokens mapped to our accent/color scale */
.year {
  display: block;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(28px, 5vw, 42px);
  color: var(--color-accent-1);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translate3d(20px,0,0);
  transition: transform .3s ease .2s, opacity .3s ease .2s;
}

.title {
  font-weight: 800;
  font-size: clamp(28px, 4.5vw, 46px);
  margin: 0 0 1rem 0;
  opacity: 0;
  transform: translate3d(20px,0,0);
  transition: transform .3s ease .25s, opacity .3s ease .25s;
}

.text {
  line-height: 1.55;
  opacity: 0;
  transform: translate3d(20px,0,0);
  transition: transform .3s ease .3s, opacity .3s ease .3s;
}

/* Swiper active slide animations */
:global(.swiper-slide-active) .year,
:global(.swiper-slide-active) .title,
:global(.swiper-slide-active) .text {
  opacity: 1;
  transform: translate3d(0,0,0);
}

/* Pagination (years) on the right column for ≥768px, hidden on small by default */
.pagination {
  display: none;
}

@media (min-width: 768px) {
  .content {
    right: 28%;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
  }
  .pagination {
    position: absolute;
    right: 15%;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    z-index: 2;
  }
  .pagination:before {
    content: "";
    position: absolute;
    left: -24px;
    top: 0;
    height: 100%;
    width: 1px;
    background: color-mix(in oklab, white 20%, transparent);
  }
}

/* Swiper pagination bullets rendered as years */
:global(.swiper-pagination-bullet) {
  width: auto;
  height: auto;
  margin: 12px 0 !important;
  background: transparent;
  color: var(--color-accent-1);
  opacity: 1;
  position: relative;
}
:global(.swiper-pagination-bullet)::before {
  content: "";
  position: absolute;
  top: 8px;
  left: -26px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-1);
  transform: scale(0);
  transition: transform .2s ease;
}
:global(.swiper-pagination-bullet-active)::before {
  transform: scale(1);
}

/* Navigation arrows rotated on desktop to mimic reference */
.prev,
.next {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 15%;
  z-index: 3;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  border: 0;
}
.prev { left: 8%; background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='%23f1903a'/%3E%3C/svg%3E"); }
.next { right: 8%; background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='%23f1903a'/%3E%3C/svg%3E"); }

@media (min-width: 768px) {
  .prev {
    left: auto;
    right: 15%;
    transform: rotate(90deg) translate(0, 10px);
  }
  .next {
    top: auto;
    bottom: 15%;
    right: 15%;
    transform: rotate(90deg) translate(0, 10px);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .year, .title, .text { transition: none; }
}
Integration into About page
In about/page.tsx (or the relevant About composition), import and place the component in the correct section:

tsx
Copier le code
import Timeline from '@/components/sections/About/Timeline';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <Timeline />
      <AboutOutro />
    </>
  );
}
Acceptance criteria
Behavior

Vertical slider on small screens; horizontal layout ≥768px.

Pagination shows years in a right-side column on desktop, hidden on small.

Prev/next buttons work and are positioned per reference.

Active slide animates year/title/text in smoothly; respects reduced motion.

Visual

Colors strictly use existing tokens (accent/orange and neutrals). No new tokens or global CSS.

Overlay and content alignment closely match the reference design.

Accessibility

Keyboard navigation enabled (arrow keys).

Buttons have aria-label.

Contrast meets AA using the site’s existing palette.

Scope safety

Only About page files changed. Home remains untouched and read-only.

No new global CSS or token additions.

No TypeScript or console errors.

Rollback
Revert Timeline.tsx, Timeline.module.css, and Timeline.data.ts in VCS. The About page will fall back to the previous state.

