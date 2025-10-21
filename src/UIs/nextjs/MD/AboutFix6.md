````markdown
---
title: About — Enforce H2 Consistency with Home (Typography & Spacing)
owner: Frontend (Next.js + React + CSS)
scope: About page only — Home is READ-ONLY
status: Ready to apply
---

## Objective

Make **all `<h2>` on the About page** identical to the **Home page H2** (typography, spacing, weight, responsive scale, and decorative rules).  
This is **mandatory**: About must **reuse** the exact styles/tokens/components used by Home.

**Do not** edit the Home page or its CSS. **Do not** create new tokens. Only refactor About to consume the existing H2 styling.

---

## Constraints (must follow)

1. **Home is READ-ONLY**  
   - No changes to Home files or global theme tokens.

2. **Reuse, don’t reinvent**  
   - If the project has a shared **Heading component** (e.g., `Heading.tsx`) or a utility class (e.g., `.heading-2`), **use that**.
   - If About currently overrides H2 in a local stylesheet/module, **remove those overrides**.

3. **No new CSS variables**  
   - Use existing typography tokens and utilities already referenced on Home.

---

## Where to work (adjust paths to repo)

- About route:
  - `src/UIs/nextjs/src/app/about/page.tsx`
- About sections/components:
  - `src/UIs/nextjs/src/components/sections/About/*`
- Shared heading (one of):
  - `src/UIs/nextjs/src/components/ui/Heading.tsx`  
  - or global utility/class for H2, e.g. `heading-2` in `globals.css`
- About local styles that must **stop overriding** H2:
  - `Timeline.module.css`, `About.module.css`, etc.

---

## Reference — Home H2 contract

Treat the **Home H2** as the single source of truth. Reuse its exact props/classes. Typical contract (examples; do not change values, just reuse):

- Font family: `var(--font-heading)`
- Weight: `700` or `800` (match Home)
- Size: `clamp(22px, 2.6vw, 32px)` (match Home)
- Line-height: `1.2`
- Letter-spacing: existing token (e.g., `var(--ls-tight)`)
- Color: `var(--color-text-1)`
- Margin top/bottom: use Home utilities (e.g., `.stack-md`, `.mb-6`, `.mt-10`)
- Optional accent rule/underline used on Home: same markup/classes

---

## Implementation

### A) Prefer the shared Heading component

If the project ships a reusable heading:

```tsx
// BEFORE (About section — ad-hoc h2)
export function AboutMission() {
  return (
    <section>
      <h2 className="aboutTitle">Our mission</h2>   {/* custom class to remove */}
      <p>...</p>
    </section>
  );
}

// AFTER (use the same component/props as Home)
import { Heading } from '@/components/ui/Heading'; // path may differ

export function AboutMission() {
  return (
    <section>
      <Heading as="h2" size="h2" className="mb-6">Our mission</Heading>
      <p>...</p>
    </section>
  );
}
````

Rules:

* Use the **same `size`/`variant`** prop values the Home page passes for H2.
* Do not add extra CSS around it; rely on spacing utilities already used on Home.

### B) If the site uses a global H2 utility class

Replace any About-specific classes with the **Home H2 utility**:

```tsx
// BEFORE
<h2 className="aboutTitle altH2">Our vision</h2>

// AFTER
<h2 className="heading-2 mb-6">Our vision</h2>   {/* exact class used on Home */}
```

### C) Remove About-local overrides

Search and delete/neutralize any About-only H2 rules that diverge from Home:

* In `About/*.module.css` or section styles, **remove** declarations that affect `h2`, `.aboutTitle`, `.sectionTitle`, `.title-2`, etc. Typical offenders:

    * `font-size`, `font-weight`, `line-height`, `letter-spacing`
    * `margin-top/bottom` not using Home utilities
    * custom colors or gradients

Example removal:

```css
/* BEFORE — must be removed */
.aboutTitle {
  font-size: 36px;
  letter-spacing: .02em;
  color: #e3e3e3;
  margin: 24px 0;
}

/* AFTER — delete the block, or keep only neutral layout specifics
   (e.g., container alignment) that do not modify typography */
```

### D) Match decorative elements

If Home H2 uses a decorative rule/badge (e.g., underline via pseudo-element), ensure About uses the **same markup/class**:

```tsx
// Example: Home uses <span className="heading-accent" />
<h2 className="heading-2">
  Our values <span className="heading-accent" />
</h2>
```

Do not duplicate CSS; reuse the Home class.

---

## Regression checklist (acceptance tests)

1. **Visual parity**

    * About H2 matches Home H2 in size, weight, spacing, color, and decoration across all breakpoints.

2. **No local overrides**

    * No `h2` or `.aboutTitle` rules remain in About styles that differ from Home.

3. **Responsive scale**

    * The H2 scales with the **same clamp()** or responsive utilities as Home.

4. **Spacing rhythm**

    * Vertical rhythm around H2 uses the **same spacing utilities** as Home (no custom margins).

5. **No global changes**

    * Home page unchanged (read-only).
    * No new tokens or global CSS files were created.

6. **No console/TypeScript errors**

    * Components compile and render without warnings.

---

## Rollback

Revert About component edits where we switched to the shared heading or global class. Since Home wasn’t touched, rollback is limited to About files only.

---

```
```
