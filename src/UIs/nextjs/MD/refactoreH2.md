````markdown
---
title: Site-wide H2 Color Unification — Use the “Prêt à transformer votre vision en réalité ?” Style as Canon
owner: Frontend (Next.js + React + CSS)
scope: All pages that render H2 (About included) — Home is READ-ONLY & Canonical
status: Ready for Codex execution
---

## Goal

Enforce **one single H2 color style across the entire site**, using the exact color styling already applied to the Home headline:
**“Prêt à transformer votre vision en réalité ?”**  
This Home H2 is the **canonical reference**. Other pages (including **About**) must **reuse** that color style without redefining it.

**Non-negotiables**
- **Home page is READ-ONLY.** Do not modify its CSS or tokens; only **reuse** them.
- **No new tokens** if a token already exists for the Home H2 color.
- **No duplicate CSS** (no new hex values for H2 color anywhere else).

---

## What Codex must determine first (discovery step)

1. **Locate the exact source of the Home H2 color**
   - Find the component and/or class used by the Home H2 “Prêt à transformer votre vision en réalité ?”.
   - Extract the **exact color reference** (e.g. a CSS variable or utility), for example:
     - `color: var(--color-heading-2)`  
     - or `color: var(--color-text-1)` with an accent wrapper
     - or a component prop that resolves to a token
   - Record the **file and line** where this is defined.

2. **Identify the canonical selector to reuse**
   - Prefer an **existing shared class or component prop** used by Home (e.g., `.heading-2`, `<Heading as="h2" variant="hero">`, etc.).
   - If the Home H2 color comes from a **token** (e.g., `var(--color-accent-1)`), treat that token as the **single source of truth** for H2 color.

> Outcome of discovery: one of
> - “Canonical class = `.heading-2` (sets `color: var(--color-accent-1)`).”
> - “Canonical token = `var(--color-heading-2)` used by the Home Heading component.”

---

## Refactor plan (apply without touching Home)

For **every H2 outside Home** (About, Services, Projects, Process, Contact, etc.):

1. **Remove local color overrides**  
   - Delete any H2 color set via:
     - Inline style (`style={{ color: '#xxxxxx' }}`)
     - Module CSS rules targeting h2 or `.title-2` with hex/rgba/hsl values
     - Utility classes that conflict with the Home H2 color

2. **Attach the canonical style**
   - If a **shared Heading component** exists, use it with the **same props** as the Home H2:
     ```tsx
     // BEFORE
     <h2 className="aboutTitle">Section title</h2>

     // AFTER
     <Heading as="h2" size="h2" className="mb-6">Section title</Heading>  // same variant used on Home
     ```
   - If the site relies on **utility classes**, apply the **exact class** used on Home:
     ```tsx
     // BEFORE
     <h2 className="title-2 text-muted">Section title</h2>

     // AFTER
     <h2 className="heading-2 mb-6">Section title</h2>  // heading-2 already defines the color
     ```
   - If the color is applied via a **token**, ensure the H2 resolves to that token (no hex duplication):
     ```css
     /* WRONG — remove */
     .aboutTitle { color: #e7a35a; }

     /* RIGHT — reuse token already used on Home */
     .aboutTitle { color: var(--color-heading-2); } /* only if this class must stay for layout; otherwise drop it */
     ```

3. **Purge duplicates**
   - Search for any occurrences in non-Home files that set H2 colors directly:
     - Regex examples: `h2\s*{[^}]*color:` or `color:\s*#` or `color:\s*hsl|rgb|rgba`
   - Replace with the **canonical class** or **token** identified in the discovery step.

---

## Files to check (adjust to repo)

- **About**:  
  `src/UIs/nextjs/src/app/about/page.tsx`  
  `src/UIs/nextjs/src/components/sections/About/**/*.tsx`  
  `src/UIs/nextjs/src/components/sections/About/**/*.module.css`

- **Shared UI** (read-only unless only consumption is needed):  
  `src/UIs/nextjs/src/components/ui/Heading.tsx` (or equivalent)  
  `src/UIs/nextjs/src/app/globals.css`, `tokens.css` (read-only: determine tokens, do not change)

---

## Acceptance checks

1. **Color parity**
   - Inspect computed styles: every H2 outside Home reports the **same computed color** as the Home headline, at all breakpoints and states.

2. **No duplicates**
   - Grep shows **zero** hardcoded color values for H2 outside the canonical source:
     - No `color: #…` on H2 in non-Home files.
     - No `color: rgb|rgba|hsl` on H2 in non-Home files.

3. **Component/class consistency**
   - All H2 use the **same Heading component/variant** or the **same utility class** as the Home H2.

4. **Home untouched**
   - No edits to Home files or tokens.
   - No new tokens created.

---

## Report format (deliver back)

````

# H2 COLOR UNIFICATION REPORT

Canonical source:

* Component/Class: <Heading as="h2" size="h2"> (file + line)
* Token used: var(--color-heading-2) // example; confirm actual token

Updated files:

1. src/.../About/SectionA.tsx

    * Removed: class "aboutTitle" color override (#e7a35a)
    * Now: <Heading as="h2" size="h2" />

2. src/.../Services/SectionB.module.css

    * Removed: h2 { color: rgba(…); }
    * Now: uses .heading-2

Search summary:

* Matches for `color:` under non-Home H2: 0 remaining
* New tokens introduced: 0
* Home modifications: 0

Result: All site H2 compute to the same color as the Home headline.

```

---

## Rollback

Since Home isn’t changed, rollback is limited to the edited non-Home components. Revert the commits that removed color overrides if needed.

---
```
