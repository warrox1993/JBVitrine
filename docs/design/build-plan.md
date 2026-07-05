# Smidjan — Front-end Rebuild Implementation Plan (`refonte-design`)

Rebuild the Smidjan front-end to the **approved cybersecurity design** (navy + orange, top-nav, light-only)
without touching the secured backend. Mockups: `/tmp/.../scratchpad/corp-home.html` + `page-*.html`.

> **Positioning change (flag for human):** the current live site is positioned as an *agence web / développement web* (SEO copy, keywords, section content all reflect that). The approved mockups reposition Smidjan as a **cybersécurité / NIS2 / CyFun / pentest** agency in Liège. This rebuild therefore also swaps most on-page copy and SEO keywords. The mockups contain the real French copy — use it as the content source. Confirm this pivot is intended (not just a visual refresh).

---

## 0. Golden rule — KEEP INTACT, DO NOT TOUCH

These are secured/backend and must not be modified by the design rebuild:

- **`src/app/api/**`** — every route: `contact`, `contact/direct`, `quote`, `csrf/token`, `auth/[...nextauth]`, `company/verify`, `leadScoring/*`, `admin/*`.
- **`src/lib/**` security & data**: `csrf.ts`, `recaptcha.ts`, `redis.ts`, `rate-limit-redis.ts`, `security/*`, `security-logger.ts`, `auth/*`, `api/middleware.ts`, `validation/*`, `db/*`, `email/*`, `leadScoring/*`, `pricing/*`, `recommendations/*`.
- **`src/hooks/useCsrfToken.ts`**, **`src/config/recaptcha.ts`** — the CSRF/reCAPTCHA client wiring.
- **The `(admin)` route group** (`src/app/(admin)/**`) and its components/layout — out of scope, its own shell.
- **Blog data pipeline**: `src/lib/blogActions.ts` (`getAllArticles`/`getArticleBySlug`), `src/lib/markdown.ts` (`markdownToHtml`), `src/content/blog/*.md`. We restyle blog *presentation* only; the data source stays.
- **The exact request shapes the API expects** (see §6). The new contact form must send the *same* JSON body + tokens.

Everything else (the `(site)` shell, sections, CSS tokens, page bodies) is fair game.

---

## 1. Design tokens migration → `src/app/globals.css` + `src/app/styles/variables.css`

The mockups' `:root` is **byte-identical across all 9 files** — one source of truth. Migrate it once.

### 1a. New token set to define (light-only navy/orange system)

Define these in `variables.css` `:root` (drop the dark-default theming model entirely — see §1c):

```css
:root{
  /* Navy / ink */
  --navy:#0b1f3a; --navy-2:#12294a; --navy-3:#1c3a63; --ink:#152238;
  /* Neutrals */
  --slate:#42536b; --muted:#657189; --line:#e2e7ef; --line-2:#d3dae6;
  --bg:#ffffff; --bg-2:#f5f7fa; --bg-3:#eef2f7; --white:#ffffff;
  /* Brand orange */
  --orange:#ff6a00; --orange-d:#e85f00; --orange-t:#fff3ea;
  --orange-on-dark:#ff9a4d;              /* NEW token — mockups hardcode this on navy */
  /* On-dark neutrals (NEW tokens — mockups hardcode these; tokenize them) */
  --on-dark-text:#dfe7f2; --on-dark-muted:#9fb0c9; --on-dark-line:rgba(255,255,255,.14);
  --success:#7fe6b0;                     /* NEW token — success green on dark */
  /* Focus / shadow / radius / type / layout */
  --focus:#2b6cff;
  --shadow:0 1px 2px rgba(11,31,58,.06),0 8px 24px rgba(11,31,58,.06);
  --shadow-s:0 1px 2px rgba(11,31,58,.05);
  --radius:12px; --radius-s:8px; --radius-l:16px; --radius-pill:100px; /* -l/-pill NEW: mockups use 14/16/18/20/100px */
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --maxw:1180px;
  /* Section rhythm */
  --section-y:88px;                      /* 60px under 720px */
  --header-height:64px;                  /* new top-nav is short; retire the 80–140px clamp */
}
```

**Fonts:** the mockups use a **system font stack** (`--sans`), not Inter/Instrument Sans. Decision (flag): either (a) keep the existing `next/font` Inter/Instrument and point `--font-base`/`--font-display` at them (better perf/consistency, tiny visual drift), or **(b, recommended)** set `--sans` to the system stack and drop the Google fonts for a lighter build that matches the mockups exactly. If (b): remove the `next/font` imports from `src/app/layout.tsx` and the `--font-base/--font-display` usages, or alias them to `--sans`.

### 1b. Old tokens to retire / remap

- **Retire the dark "Forge/Flame" palette** in `variables.css`: the semantic tokens `--color-bg/-surface/-text/-primary/...`, the legacy aliases `--color-bg-1/2/3`, `--color-text-1/2/3`, `--color-accent-1/2/3`, the `--color-primary-5..40` opacity ramp, `--shadow-glow-*`, `--color-glow`, and the whole `:root[data-theme="light"]` override block. Either delete or map the handful still referenced onto the new tokens during Phase 2/3 as components are ported.
- **Retire sidebar tokens**: `--sidebar-collapsed/-expanded/-shift/-w/-w-open` (no sidebar in the new design).
- **Fix the breakpoint token collision**: `variables.css` and `styles/breakpoints.css` both define `--bp-sm/-lg/-xl` with *different* px values. Pick one file (recommend `breakpoints.css`) as the single owner and delete the duplicates from `variables.css`.
- **`styles/utilities.css` bugs to fix while here**: `.grid-2/.grid-3` use `@media (max-width: var(--bp-md))` which is invalid CSS (var not allowed in media query) — replace with literal px. Same pattern audit across `utilities.css`.
- Keep `styles/animations.css` keyframes (harmless), but the orange glow keyframe hardcodes old orange — fine visually.

### 1c. Light-only theme — remove dark-mode machinery

The new design is **light with navy section backgrounds** (not a user-toggleable dark theme). So:
- Root `<html>` already hardcodes `data-theme="light"` — keep, or drop the attribute entirely once the dark override block is gone.
- No anti-FOUC concern anymore (the current flash risk from `ThemeToggle` disappears).
- Remove `ThemeToggle` (see §2). Verify nothing else reads `data-theme` (grep `data-theme` under `src/components` and `src/app/styles`) — only `variables.css` and `ThemeToggle` do today.

---

## 2. New shell — replace sidebar layout with top-nav

### Current shell (to dismantle)
`(site)/layout.tsx` renders `SidebarRouterBridge` + `Header` + `MainLayoutBridge`. Sidebar open-state lives in `src/hooks/useSidebarMobile.tsx` (`SidebarMobileProvider` in **root** `layout.tsx`). **Footer is imported per-page**, not in the layout. `Header.tsx` already contains a desktop top-nav *and* a `SidebarToggleButton` + `ThemeToggle` + `MobileMenu`.

### Files to CREATE (new top-nav shell — React + CSS Modules)
| New file | Responsibility |
|---|---|
| `src/components/layout/EmergencyBar/EmergencyBar.tsx` (+ `.module.css`) | Navy-2 top bar: alert-triangle + "Incident de sécurité en cours ?", phone `+32 (0)4 268 00 00` + `soc@smidjan.be` (hidden <720px), pulsing-dot CTA "Victime d'une attaque ?" → `/contact`. Static, server component. |
| `src/components/layout/SiteHeader/SiteHeader.tsx` (+ `.module.css`) | Sticky blurred-white header: shield-logo brand (SVG) + "Smidjan / Cybersécurité · Liège", `nav.main` top-nav (links in §4 route map), `.nav-tel` phone, `.btn-primary` "Diagnostic gratuit" → `/contact`, hamburger. Client component (active-link via `usePathname`, mobile-open `useState`). |
| `src/components/layout/SiteHeader/MobileNav.tsx` (+ `.module.css`) | Slide-in mobile dropdown (`nav.main.open`), body-scroll-lock, close on route change. Replaces old `MobileMenu`. |
| `src/components/layout/SiteFooter/SiteFooter.tsx` (+ `.module.css`) | Navy footer, 3px orange top border, 4 columns (brand+contact / Services / Agence / Cadres & certifs + langue), `.foot-bottom` legal line (see §7 for VAT). Reuse existing `FooterSocial` (restyle). |

### Files to REMOVE / RETIRE
- `src/components/layout/Sidebar.tsx` + `.module.css`
- `src/components/layout/SidebarRouterBridge.tsx`
- `src/components/layout/SidebarToggleButton.tsx` + `.module.css`
- `src/components/layout/MainLayoutBridge.tsx` (replace with a plain `<main>` in the layout)
- `src/components/layout/MobileMenu.tsx` + `.module.css` (superseded by `MobileNav`)
- `src/components/layout/ThemeToggle.tsx` + `.module.css` (light-only)
- `src/components/layout/Header.tsx` + `.module.css` (superseded by `SiteHeader`)
- `src/components/layout/Nav/Nav.tsx` — **dead boilerplate** ("ClassifiedAds.NextJs"), unused; delete.
- `src/hooks/useSidebarMobile.tsx` — and remove `SidebarMobileProvider` from root `layout.tsx`.
- The per-page `import { Footer }` blocks (see §5) once the footer is global.
- The `homeSidebar.items.tsx` / `blogSidebar.items.tsx` / `servicesSidebar.items.tsx` / `cmsEcommerceSidebar.items.tsx` / `about/aboutSidebar.items.tsx` item files (only consumed by the retired `SidebarRouterBridge`).

### New `(site)/layout.tsx` composition
```tsx
export default function SiteLayout({ children }) {
  return (
    <>
      <EmergencyBar />
      <SiteHeader />
      <main id="main" className="main-content-site">{children}</main>
      <SiteFooter />   {/* now global — remove per-page Footer imports */}
    </>
  );
}
```
Root `layout.tsx`: drop `SidebarMobileProvider`; keep `FXReady`, `RootEffects`, `RouteProgressProvider`, `ToastContainer`, Vercel Analytics. Update the `viewport.themeColor` from `#000000` to `--navy` (`#0b1f3a`) or white.

---

## 3. Shared UI component inventory (build/restyle — React + CSS Modules)

**Primitives — restyle in place (keep API):**
| Component | Action |
|---|---|
| `ui/Button` | Restyle only. Map/extend `variant` to `primary` (orange), `navy`, `ghost`, `ghost-d` (on-dark), add `size=lg`. Keep the `as/href/leadingIcon/...` API. |
| `ui/Card` | Restyle to `.svc`-style card (white, `--line` border, `--radius`, `--shadow`). |
| `ui/Container` | Keep; ensure global `.container`/`.wrap` = `max-width:var(--maxw);padding:0 24px`. |
| `ui/Heading` | Restyle (700, `letter-spacing:-.015em`, clamp sizes). |
| `ui/Input` / `Select` / `Textarea` / `Label` | Restyle to mockup form controls. (Note: contact forms use raw inputs, not these — see §6.) |
| `ui/Breadcrumbs` (props-driven, schema.org) | Keep, restyle. **Consolidate** the duplicate `components/Breadcrumb/Breadcrumb.tsx` into this one. |

**New shared components to build:**
| Component | Used by | Responsibility |
|---|---|---|
| `ui/Eyebrow` | all pages | Orange-d uppercase kicker with leading dash; `on-dark` variant → `--orange-on-dark`. |
| `ui/LinkMore` | services, journal | "En savoir plus →" inline link w/ hover-translate arrow. |
| `ui/Icon` | everywhere | Wrapper rendering the Lucide-style inline stroke SVGs (24×24). No icon font/library. |
| `ui/Section` | all | Standard `<section>` with `--section-y` rhythm + optional `navy`/`bg-2` background variant + optional `.grid-bg` overlay. |
| `sections/Hero` (rebuild) | home | Badge (NIS2 échéance), H1, lead, dual CTA, 3 assurances, right `ShieldCard` + `FloatChip`. |
| `ServicePillar` / `ServiceCard` (`.svc`) | home, services | Icon + title + copy + `LinkMore`; grid + alternating full-width pillar layout. |
| `IllusPanel` | home, services, approche | 2-col text + inline-SVG figure (network diagram, audit dashboard, Belgium map). Port SVGs as static components. |
| `CyFunTiers` (`.tiers`) | home, cyfun | 3 tiers Basic / **Important (featured)** / Essential — cards/table. |
| `DeadlineCard` / `StatHook` | home, cyfun | "Échéance 18 avril 2026" card; big-number hook (`~82%`). |
| `ProcessSteps` (`.process`) | home, approche, contact | 4-step numbered method. |
| `WhyGrid` / `WhyItem` | home, approche | 4 differentiators. |
| `FounderCard` | home, agence | Jean-Baptiste Dhondt bio card (expanded on agence). |
| `StatsBand` (`.stats`) | home, agence | Navy band, 4 stats (12+ / 50+ / <24h / 100%). |
| `Testimonials` (`.testi`) | home | 3 testimonial cards. |
| `InsightCard` | home, journal | Guide-download teaser. |
| `CTABox` | every page footer-CTA | Navy final-CTA box. |
| `Honesty` | home, cyfun | "On ne se contente pas d'auditer" callout. |
| `FAQ` | cyfun | Native `<details>/<summary>` accordion. |
| `Filters`/`Chip` + `ArticleCard` + `FeaturedArticle` | journal | Category filter chips, article grid, hero article. |
| `Toc` + `.prose` styles + `AuthorBio` + `RelatedArticles` | article | In-article TOC, long-form prose, author bio, related grid. |
| `LegalNav` | legal | Sticky side TOC with active anchors. |
| `ContactForm` (secured — see §6) + `InfoCard` + `MapCard` (inline SVG) + `ProcessCard` | contact | Left form / right coordinates + hand-drawn SVG map. |

**Sections to REMOVE** (old web-agency content, no longer used): `sections/WhySmidjan`, `Showreel`, `Proof`, `Services` (old), `Process` (old), `CTA` (old), `CMSFeatures`, `TechStack`, plus `features/SiteVitrine/AppVitrine.tsx`. `features/about/*` (HeroAbout, Story, Team, Mission, ValuesCards, Differentiators, FAQ, ProcessMini), `(site)/Timeline.tsx`, `(site)/Mission.tsx`, `(site)/Team.tsx` — superseded by the new `agence` page (salvage copy where useful).

**Component count:** ~6 restyled primitives + ~28 new/rebuilt shared components ≈ **34 components** in the inventory.

---

## 4. Route map — old → new (recommend French, SEO-friendly URLs)

| Mockup | New route (recommended) | Old route | Nav label | Migration |
|---|---|---|---|---|
| `corp-home.html` | `/` | `/` | Accueil | Rebuild in place. |
| `page-services.html` | `/services` | `/services` (+ `/services/smidjan-cms`) | Sécurité / Services | Rebuild; **delete** `services/smidjan-cms` → 301 to `/services`. |
| `page-cyfun.html` | `/conformite-nis2` **(NEW)** | — | Conformité NIS2 | New page. (Alt names: `/cyfun`, `/nis2-cyfun` — **decide**.) |
| `page-approche.html` | `/approche` **(NEW)** | — | Approche | New page. |
| `page-agence.html` | `/agence` | `/about` | Agence | Rework; **301 `/about` → `/agence`**. |
| `page-contact.html` | `/contact` | `/contact` | (CTA) Diagnostic gratuit | Rework — MUST reuse secured wiring (§6). |
| `page-journal.html` | `/journal` (or keep `/blog`) | `/blog` | Ressources | **Decide** (see below). |
| `page-article.html` | `/journal/[slug]` (or `/blog/[slug]`) | `/blog/[slug]` | — | Restyle; same data pipeline. |
| `page-legal.html` | `/mentions-legales` (single, 3 anchors) | `/legal-notice` + `/privacy` + `/terms` | Footer | Consolidate; **301 old three → anchors** `#mentions`/`#confidentialite`/`#cgv`. |
| — (removed offering) | — | `/cms-ecommerce` | — | **Remove + 301 → `/services`** (no CMS/ecommerce in new positioning). |

**Redirects** go in `next.config.ts` `redirects()`: `/about→/agence`, `/cms-ecommerce→/services`, `/services/smidjan-cms→/services`, `/legal-notice→/mentions-legales#mentions`, `/privacy→/mentions-legales#confidentialite`, `/terms→/mentions-legales#cgv`, and (if renamed) `/blog→/journal`, `/blog/:slug→/journal/:slug`. All permanent (301).

**Decisions to escalate to the human:**
1. Exact name for the CyFun page (`/conformite-nis2` vs `/cyfun`).
2. Rename `/blog`→`/journal`? Renaming needs 301s and risks losing article backlink/SEO equity. **Recommendation: keep the `/blog` route path, relabel the UI to "Ressources / Journal"** — zero SEO risk. Confirm.
3. Legal consolidation into one page vs keeping 3 separate French routes.
4. Keep the 3 existing blog articles (they're web-dev topics; some off-brand for a cyber positioning)? Recommend keeping + adding cyber articles.

---

## 5. Page-by-page plan

Each page = its route's `page.tsx` under `(site)/`, using shared components from §3. Footer/Header/EmergencyBar now come from the layout — **remove the per-page `<Footer/>` imports** from: `about`, `blog/page`, `blog/[slug]`, `contact/UnifiedContactPage`, `services`, `privacy`, `terms`, `legal-notice`, `cms-ecommerce`, `services/smidjan-cms`.

- **`/` (home)** → `corp-home.html`. Sections in order: Hero → TrustStrip → Services(4 `.svc` + IllusPanel + AI note) → CyFun flagship (intro + DeadlineCard + StatHook + CyFunTiers + IllusPanel + Honesty + ProcessSteps) → WhyGrid + FounderCard + IllusPanel(Belgium) → StatsBand → Testimonials → InsightCard → CTABox. Content: mockup copy. Replace `AppVitrine` with a server component composing these (drop the dynamic-import indirection or keep for below-the-fold).
- **`/services`** → `page-services.html`. Hero → 4 anchored pillars (`#securiser/#tester/#developper/#conformer`) each a full-width `ServicePillar` → one-partner band → CTABox. In-page sub-nav.
- **`/conformite-nis2` (NEW)** → `page-cyfun.html`. Breadcrumb → Hero → "NIS2 en clair" → "CyFun framework" → CyFunTiers (`#niveaux`) → Accompagnement + Honesty (`#accompagnement`) → FAQ (`#faq`, native `<details>`) → CTABox.
- **`/approche` (NEW)** → `page-approche.html`. Header → Philosophy → ProcessSteps(4) → AI companion → WhyGrid → Référentiels/quality → CTABox.
- **`/agence`** → `page-agence.html` (reworks `/about`). Header → Qui sommes-nous → FounderCard(expanded, Jean-Baptiste Dhondt) → Engagements/valeurs → StatsBand → CTABox. Salvage useful copy from old `features/about/*` + `aboutTimelineData.ts`.
- **`/contact`** → `page-contact.html`. Header → contact-grid (`ContactForm` + `InfoCard` + `MapCard` SVG) → "À quoi s'attendre" ProcessCard. **Form must reuse the secured wiring — see §6.**
- **`/blog` (label Journal)** → `page-journal.html`. Header → FeaturedArticle → Filters/Chips + ArticleCard grid (from `getAllArticles()`) → newsletter CTA. Data pipeline unchanged.
- **`/blog/[slug]`** → `page-article.html`. Breadcrumb → article header → cover SVG → `.prose` body + `Toc` → `AuthorBio` → `RelatedArticles`. Keep `getArticleBySlug` + `markdownToHtml` + `jsonLdSafe`.
- **`/mentions-legales`** → `page-legal.html`. Header → sticky `LegalNav` + 3 anchored blocks (`#mentions` / `#confidentialite` / `#cgv`). Content: migrate the real text from existing `legal-notice`/`privacy`/`terms` pages (do not invent legal text).

---

## 6. Contact form — preserve the secured wiring (CRITICAL)

The mockup contact form is a **single direct-contact form** (7 fields + RGPD checkbox). Map it onto the existing **`/api/contact/direct`** flow (the simpler of the two live flows). The QuoteWizard (`/api/quote`) is a separate multi-step tool — **decide** whether to keep it as a secondary "Demander un devis" path or drop it for now (the new design shows only the simple form). Recommendation: keep the wizard route/component intact but unlink from the new contact page for v1; re-add later.

**The new `ContactForm` MUST replicate `SimpleContactForm`'s wiring exactly:**
- Use the **`useCsrfToken()`** hook (`src/hooks/useCsrfToken.ts`); block submit while `!csrfToken`.
- Load **reCAPTCHA Enterprise** on mount from `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}` (`RECAPTCHA_SITE_KEY` from `src/config/recaptcha.ts`); at submit call `grecaptcha.enterprise.ready(...).execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })`.
- POST to **`/api/contact/direct`** with `Content-Type: application/json` and body:
  `{ requestType, email, name, company?, phone?, message, csrfToken, recaptchaToken }`
  where `requestType ∈ {cv|technical|assistance|bug|partnership|other}`.
- **Map mockup fields → API fields**: `select#demande` (diagnostic/cyfun/pentest/dev/autre) → **`requestType`** — the whitelist in `/api/contact/direct/route.ts` currently expects `cv|technical|assistance|bug|partnership|other`. The mockup uses cybersecurity values. **This is the one server-adjacent decision:** either (a) map the new labels onto existing enum values client-side, or (b, cleaner) update the `requestType` whitelist + the email template in `/api/contact/direct/route.ts`. Option (b) touches an API file — **get explicit approval** before editing it; if not approved, use (a).
- `nom`→`name`, `entreprise`→`company`, `email`→`email`, `tel`→`phone`, `message`→`message`. Add the RGPD required checkbox client-side (no server field needed).
- Simplest path: **reuse the existing `SimpleContactForm` component** (already wired + validated) and just restyle its `.module.css` + markup to the mockup, rather than writing a new form from scratch. This is the lowest-risk option and is recommended.

Field limits enforced server-side (keep client in sync): `name ≤100`, `message ≤5000`, `company ≤100`, valid email. reCAPTCHA action string **must be `contact_form`** for this endpoint.

---

## 7. SEO tasks

- **Inject Organization + LocalBusiness + WebSite JSON-LD** (they exist in `src/lib/schema.ts` but are **never imported**). Add `organizationSchema` + `localBusinessSchema` + `websiteSchema` to the **root `layout.tsx`** (or `(site)/layout.tsx`) via a `<script type="application/ld+json">`. Keep `faqPageSchema` on `/`. Use `createArticleSchema()` on `/blog/[slug]` (currently hand-written per page).
- **Fix schema.ts inconsistency**: two different emails — `organizationSchema.email = smidjan.agency@outlook.com` vs `localBusinessSchema.email = contact.smidjan@outlook.com`. Pick the canonical one (mockup footer uses `contact@smidjan.be`). Align email + phone across schema, footer, EmergencyBar.
- **Consolidate hand-written per-page JSON-LD** into `lib/schema.ts` helpers (contact/blog/services/legal each inline their own today).
- **Per-page metadata** for the NEW/renamed routes: add `export const metadata` to `/conformite-nis2`, `/approche`, `/agence`, `/mentions-legales`, and rewrite the home/services metadata for the **cybersecurity** keyword set (NIS2, CyFun, pentest, audit sécurité PME, Liège/Wallonie) replacing the web-agency keywords. Note `cms-ecommerce` has **no metadata** today — moot once removed.
- **Update `src/config/nav.ts`** `sections` to the new top-nav routes/labels (Sécurité `/services`, Conformité NIS2 `/conformite-nis2`, Approche `/approche`, Agence `/agence`, Ressources `/blog`, Contact `/contact`).
- **Update `src/app/(site)/sitemap.ts`**: replace `/about`→`/agence`, add `/conformite-nis2` + `/approche`, `/cms-ecommerce`→removed, legal → `/mentions-legales`. Keep dynamic blog entries. Reconcile priorities with `next-sitemap.config.js` so the two don't drift.
- **Fix the VAT placeholder**: the mockup footer ships `© 2026 Smidjan SRL · TVA BE 0700.000.000`. **`0700.000.000` is a fake placeholder — do NOT ship it.** The current code has *no* VAT text at all, so this is net-new. **Get the real BCE/TVA number from the client** before adding it to `SiteFooter` and `/mentions-legales`. Until provided, omit the VAT line rather than ship the placeholder.

---

## 8. Phased execution order (keep build green, never break API/security)

Run `npm run build` (or `next build`) + `npx tsc --noEmit` at the end of each phase.

- **Phase 1 — Tokens + shell skeleton.**
  Files: `styles/variables.css` (new tokens, retire dark), `globals.css`, `styles/breakpoints.css`/`utilities.css` (fix bugs). Build the 3 shell components (EmergencyBar, SiteHeader+MobileNav, SiteFooter) with real markup but placeholder page bodies still rendering. Rewire `(site)/layout.tsx`; remove `SidebarMobileProvider` from root layout. Delete Sidebar/ThemeToggle/MobileMenu/Nav/bridges + sidebar item files.
  **Verify:** every existing route still renders (old page bodies temporarily unstyled is OK), no missing-import errors, `tsc` clean.
- **Phase 2 — Shared UI components.**
  Restyle primitives (Button/Card/Heading/Container/Breadcrumbs/inputs); build the ~28 new shared components + inline SVG assets. No page wiring yet — mount them in a throwaway sandbox route or Storybook-less manual page to eyeball, then remove.
  **Verify:** components compile & type-check; visual spot-check against mockups.
- **Phase 3 — Pages.**
  Rebuild `/`, `/services`; add `/conformite-nis2`, `/approche`; rework `/agence` (+ `/about` redirect); rebuild `/blog` + `/blog/[slug]`; consolidate `/mentions-legales`. Remove old sections/components (§3) and per-page Footer imports. **Contact page LAST-of-pages, but its form is Phase 4.**
  **Verify:** each route renders with real content; no dead imports; `tsc` clean; `next build` passes.
- **Phase 4 — Contact wiring + SEO + cleanup + redirects.**
  Restyle/rebuild `ContactForm` reusing `useCsrfToken` + reCAPTCHA + `/api/contact/direct` (§6). Add JSON-LD injection, per-page metadata, update `nav.ts` + `sitemap.ts`, add `redirects()` in `next.config.ts`, resolve VAT/email. Delete `cms-ecommerce`, `services/smidjan-cms`, dead `features/about/*`, `AppVitrine`, unused sections.
  **Verify (do not skip):** submit the contact form against a running dev server — confirm a **200** from `/api/contact/direct` (CSRF token fetched, reCAPTCHA `contact_form` token present, correct body shape). Confirm `/api/quote` still reachable if wizard kept. Confirm all redirects resolve.
- **Phase 5 — Build + preview.**
  `next build` + `next start` (or Vercel preview). Lighthouse/visual QA vs mockups; check `/sitemap.xml` + `robots.txt`; verify JSON-LD with a validator; verify `(admin)` untouched and login still works.

---

## 9. Risks & gotchas

- **CSS Modules vs the mockups' global CSS.** Mockups use plain global class names (`.svc`, `.tier`, `.btn-primary`, `.wrap`). Port these to **CSS Modules** (scoped) per component — do **not** paste the mockup `<style>` blocks globally (they'd collide and defeat scoping). Global-only items: token `:root`, base element/typography, `.container`/`.wrap`, `.prose`, `.grid-bg`. Everything else → module.
- **Removing ThemeToggle / dark mode.** Safe — only `variables.css` (`[data-theme="light"]` block) and `ThemeToggle` read `data-theme`. Grep to confirm before deleting. `ToastContainer theme="dark"` in root layout is independent (react-toastify) — change to `"light"`/`"colored"` for visual consistency, but it won't break anything.
- **Keep CSRF/reCAPTCHA intact.** The single biggest risk. Do not rewrite the fetch/token logic — reuse `SimpleContactForm` (restyled) or copy its wiring verbatim. reCAPTCHA action must stay `contact_form` for `/api/contact/direct` (and `quote_submission` for `/api/quote` if wizard kept). CSRF token goes in the **body** for `/direct`; `/quote` validates same-origin headers.
- **Don't touch `(admin)` or `api`.** They have their own shell/metadata; the `(site)` layout changes don't reach them. Verify admin login/dashboard after Phase 1 (shared root-layout changes could ripple — the `SidebarMobileProvider` removal is the only shared touch).
- **`requestType` enum mismatch** (§6) is the one place UI meets the secured API — resolve by client-side mapping unless an API edit is explicitly approved.
- **Blog content is off-brand.** Existing 3 articles are web-dev topics; the new positioning is cyber. Keep pipeline; content decision is the human's.
- **Fonts decision** (§1a) affects the build (Google fonts vs system) — confirm before Phase 1.
- **Two sitemaps can drift** (`sitemap.ts` runtime + `next-sitemap.config.js` build-time) — update both.
- **Legal text is real content** — migrate from existing pages, never fabricate; VAT number must come from the client (never ship `0700.000.000`).
