Global UI Design System — Tokens, Contracts, Utilities

Overview
- Single source of truth for visual tokens and UI contracts.
- All components consume tokens/utilities; no raw magic values.

Tokens (globals.css:1)
- Colors: role-based variables `--color-*` for bg/surfaces/text/border/accents.
- Spacing: `--space-1..8` scale for padding/margins/gaps.
- Radius: `--radius-sm|md|lg|xl|full`.
- Shadows: `--shadow-sm|md|lg|glow`.
- Typography: `--text-*` responsive scale; display/base font variables.
- Motion: `--dur-*`, `--ease-standard`, `--transition-*`.
- Z-index: `--z-base|header|sidebar|overlay|progress`.
- Breakpoints: `--bp-sm|md|lg|xl`.
- Sidebar: `--sidebar-collapsed|expanded|shift`.

Element Contracts (src/UIs/nextjs/src/app/elements.css)
- Headings h1–h6: margins + size/line-height via tokens.
- Text: p/small/strong/em/blockquote/hr/code/pre.
- Lists: ul/ol/li normalized spacing.
- Links: hover/focus visible states.
- Media: img/video/figure/figcaption.
- Tables: table/thead/tbody/th/td.
- Forms: label/inputs/select/textarea with focus/disabled states.
- Buttons: reset for native buttons.

Utilities (src/UIs/nextjs/src/app/utilities.css)
- Spacing helpers: mt-*, mb-*, pt-*, pb-*, px-*.
- Layout primitives: container, stack/stack-lg, cluster, grid-2/grid-3.
- Typo: lead, muted, uppercase, mono.
- States: is-active, is-disabled, is-loading.

Component Contracts (extracts)
- Sidebar: width tokens + GPU transforms for layout shift-free hover. Body toggles `sidebar-hovered`. Z-index uses `--z-sidebar`.
- Progress: overlay bar uses `--z-progress` with rAF update.
- Buttons: padding/radius now tokenized; transitions respect tokens.
- Accordion: hover/active affordance; respects motion preference.
- Testimonials: 5s autoplay, avatars centered; zero CLS.

Layout & Templates
- Header/Sidebar/Main shell uses tokens for spacing and z-index.
- Sections spacing via section-specific CSS modules built on tokens.

How to Create a New Page (summary)
1) Use `container`, `stack` utilities for layout scaffolding.
2) Use components (Hero, Proof, Process, Services…) which already consume tokens.
3) Add no raw px/hex; prefer tokens and utilities.
4) Respect a11y: focus-visible, color contrast, reduced motion.

Change Log (high-level)
- Added: elements.css, utilities.css; updated globals tokens.
- Tokenized: Sidebar, Progress, Button.
- Docs: This file and README section updated.

