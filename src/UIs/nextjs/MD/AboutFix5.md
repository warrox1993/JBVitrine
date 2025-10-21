````markdown
---
title: About Page Cleanup — Remove “Contact”, “FAQ”, and “Proof/Testimonials” (About-only)
owner: Frontend (Next.js + React + CSS)
scope: Single page (About) — Home page is READ-ONLY
status: Ready to apply
---

## Goal

On the **About** page only:
- Remove every occurrence of the following UI entries **from the About page body and from the About page’s own sidebar**:
  - `Contact`
  - `FAQ`
  - `Proof` / `Proofs` / `Testimonials` (a.k.a. “Preuves”, sometimes implemented as `article.proof.module` or similar)
- Do **not** touch the global Home page or create any new CSS. **Home page stays read-only** and its existing CSS design-tokens are reused.

---

## Hard Constraints (must follow)

1. **Home page is read-only**  
   - Do not modify files under the Home route (e.g. `/app/page.tsx` or `/pages/index.tsx`) and **do not** change its CSS.  
   - Do not create new CSS files. Reuse existing tokens, utilities, and component classes already used on the Home page.

2. **About-only changes**  
   - Only edit the **About page** route and the **About page’s own sidebar** component.  
   - Do not alter the global top navbar or global sidebar used site-wide. If About has a **local/sidebar variant**, change that one only.

3. **Zero new styles**  
   - No new CSS variables, utility classes, or files. If a visual gap appears after removal, use existing spacing/typography utilities already present.

4. **Accessibility & layout stability**  
   - Removing items must not cause layout shift. Keep focus order and keyboard navigation consistent.

---

## Where to work (typical structure — adjust to actual repo)

- About page:
  - `src/UIs/nextjs/src/app/about/page.tsx` (App Router) **or**
  - `src/pages/about.tsx` (Pages Router)

- About page **sidebar** (local to About; do not touch global sidebar):
  - `src/UIs/nextjs/src/components/sections/About/AboutSidebar.tsx`  
  - or a co-located file near the About page, e.g.:
    - `src/UIs/nextjs/src/app/about/_components/Sidebar.tsx`
    - `src/components/sidebar/AboutSidebar.tsx`

- About page content sections (body):
  - `src/UIs/nextjs/src/components/sections/About/*` (e.g., `Hero.tsx`, `Mission.tsx`, `Proof.tsx`)
  - Look specifically for blocks named:
    - `Proof`, `Testimonials`, `article.proof.module`, `FAQ`, `ContactCTA`, `ContactBlock`, etc.

> If the repo uses a single “Sections registry” (e.g., `sections.json` or a `sections.ts` array), remove the entries there **for About only**.

---

## Exact changes to perform

### A) Remove from the **About sidebar (About-only)**
- In the **About page’s own sidebar** component, remove any nav items whose label or route matches case-insensitively:
  - `contact`, `contacts`, `/contact`
  - `faq`, `/faq`
  - `proof`, `proofs`, `testimonials`, `preuves`, `/proof`, `/testimonials`
- Keep the remaining order intact. If there is an index-based animation or width transition, ensure removing items does not break it.

**Implementation pattern (example in React/TypeScript):**
```tsx
// BEFORE (example)
const aboutNav = [
  { id: 'intro', label: 'Introduction', href: '#intro' },
  { id: 'proof', label: 'Proof', href: '#proof' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

// AFTER (About-only)
const aboutNav = [
  { id: 'intro', label: 'Introduction', href: '#intro' },
  // removed: proof/testimonials
  // removed: faq
  // removed: contact
];
````

> If the sidebar items are generated from CMS or a `sections` array, filter them out for the About route only.

### B) Remove from the **About body**

* Delete or comment out the entire sections/components that render these blocks on About:

    * `Proof` / `Testimonials` / `article.proof.module`
    * `FAQ`
    * Any `Contact` CTA block embedded inside About (buttons like “Contact”, “Let’s talk”, linking to `/contact`)
* If those components are shared, **do not modify the component itself**; instead, stop **including** it on the About page.

**Implementation pattern (example in `about/page.tsx`):**

```tsx
// BEFORE
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutProof />        {/* remove */}
      <AboutFAQ />          {/* remove */}
      <ContactCTA />        {/* remove */}
    </>
  );
}

// AFTER
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      {/* removed: Proof/Testimonials */}
      {/* removed: FAQ */}
      {/* removed: Contact CTA */}
    </>
  );
}
```

### C) Do **not** change global navigation

* Do not remove “Contact” or “FAQ” from the **global** top navbar or global sidebar used across the whole site.
* This task is strictly **About page only**.

---

## CSS & Theming notes (read-only policy)

* **Do not create new CSS files**.
* **Do not** add new CSS variables or tokens.
* If spacing looks off after removals, adjust via existing utilities (e.g., `.stack-*`, `.gap-*`, `.mb-*`, `.pt-*`) already in the Home page CSS set.
* If a gradient or background band appears too tall after removal, adjust the **existing** About section container padding using the same utility classes used on Home. No new selectors.

---

## Acceptance tests

1. **About sidebar (About-only):**

    * No items labeled Contact/FAQ/Proof/Testimonials appear.
    * Keyboard navigation skips directly from the previous item to the next without dead links.
    * Hover/active styles remain consistent with existing tokens.

2. **About body content:**

    * No Proof/Testimonials module, no FAQ section, no Contact CTA block.
    * No empty whitespace holes; vertical rhythm remains consistent with existing spacing utilities.

3. **Home page untouched:**

    * Home renders identically to before.
    * No new CSS files were added; no modifications to Home CSS.

4. **No global regressions:**

    * Global navbar and global sidebar still include their original items (including Contact/FAQ if they existed there).
    * Routes not related to About are unaffected.

5. **No console errors and no TypeScript errors** after removals.

---

## Rollback strategy

* All removals are localized to About page files and the About-specific sidebar component.
* To rollback, re-add the removed imports and JSX blocks, or restore the previous `about/page.tsx` and `AboutSidebar.tsx` from VCS.

---

```
```
