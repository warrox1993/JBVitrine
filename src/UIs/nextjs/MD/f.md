---
title: About Page CSS Audit — Verify Reuse of Home Styles (No Duplicates Allowed)
owner: Frontend (Next.js + React + CSS)
scope: About page only — Home CSS is canonical
status: To be executed by Codex
---

## Mission

Perform a **complete CSS audit** of the **About page** to ensure that:
1. Every visual element (titles, paragraphs, buttons, layout, timeline, etc.) uses **the same CSS tokens, classes, and design system** as the Home page.
2. No **duplicate**, **redundant**, or **newly created** CSS rules exist that replicate styles already defined in the Home page stylesheets.
3. The Home page remains the **single source of truth** for the site’s CSS. All shared components should inherit from it.

---

## Hard constraints

- **Do not create or modify any CSS file.**
- **Do not rename or restructure CSS imports.**
- **Home page CSS is the master stylesheet.** The About page must only reuse it.
- If any About-specific `.module.css` or inline style duplicates what already exists in the Home CSS:
    - Mark it as a **violation**.
    - Suggest removal and replacement by the correct shared class or token.
- **No new color variables, typography tokens, or spacing utilities** are allowed.

---

## Audit procedure

1. **Locate the About page files:**
    - `src/UIs/nextjs/src/app/about/page.tsx`
    - `src/UIs/nextjs/src/components/sections/About/*`
    - `src/UIs/nextjs/src/components/sections/About/*.module.css`

2. **Locate the Home page CSS source of truth:**
    - `src/UIs/nextjs/src/app/globals.css`
    - `src/UIs/nextjs/src/components/sections/Home/*`
    - `src/UIs/nextjs/src/styles/tokens.css` or equivalent (if present)

3. **For each About section**, perform the following verifications:

   | Element | Check | Expected Result |
      |----------|-------|----------------|
   | `h1`, `h2`, `h3` | Uses same font-size, font-weight, spacing, and tokens as Home. | No new font definitions or local overrides. |
   | Paragraphs | Inherit `var(--color-text-1)` and same line-height as Home. | No custom text color or font-size. |
   | Buttons | Reuse the global `.btn` or `.button` classes from Home. | No new hover/focus states defined locally. |
   | Links | Same color/transition tokens as Home. | No redefined `a:hover` or new gradient links. |
   | Backgrounds | Use `var(--color-bg-1)` or global section gradient. | No inline colors or hardcoded hex values. |
   | Layout containers | Same spacing utilities (`.px-*`, `.py-*`, `.stack-*`). | No About-only margins/paddings. |
   | Timeline | Reuse existing transitions, easing, and shadow tokens from Home. | No custom cubic-bezier or rgba shadow definitions. |
   | Icons / SVG | Use same filter, size, and color inheritance as on Home. | No redefined fill/stroke colors. |
   | Media queries | Follow existing breakpoints (`768px`, `1024px`). | No new breakpoints introduced. |

4. **Cross-reference imports**
    - Check each About component’s CSS imports.  
      Every import should point to:
        - global Home CSS (`globals.css`, `tokens.css`), or
        - shared utilities.
    - Any `.module.css` file unique to About must be analyzed to ensure:
        - It **only extends** existing classes, never redefines them.
        - It does not introduce duplicate property sets (font-size, weight, margins, colors, etc.) already defined in Home.

5. **Identify and log duplicates**
    - For every detected duplicate or conflicting rule:
        - Record the file path.
        - Copy the redundant CSS snippet.
        - Suggest the exact Home class or token that should replace it.

   Example log format:

