# Portfolio improvements plan (2026-07-15)

Branch `refonte-home-portfolio`. Honest solo cyber portfolio (cloud/réseaux/IA), recruiter-first. Execute via Superpowers subagents; verify build + honesty + parity each task; screenshot-QA the visual ones. No em dash, no invention, light-theme identity (Émeraude & Ardoise).

## Structural
- [ ] **À propos → "Mon histoire"** (owner chose SLIM): keep only the deep reconversion narrative (military telecom -> EU -> bootcamp -> cyber) + portrait placeholder + LinkedIn/profiles. REMOVE sections that duplicate other pages: value cards (already on /approche), the "mission/service" about block + engagements + map/coverage (already on home/certifications). Result = a distinct, recruiter-valuable story page.

## Security (explicit owner ask)
- [ ] **CSP nonce (M1)**: remove `'unsafe-inline'` for scripts in prod. Generate a per-request nonce in `middleware.ts`, thread it into the CSP header + every inline `<script type="application/ld+json">` (dangerouslySetInnerHTML JSON-LD across pages). Keep dev unaffected. Test that pages/JSON-LD still work.

## 10 existing-site improvements (owner: "enregistre + mets en place")
1. [ ] **Blog "Journal" reorient/prune**: current articles are agency/SEO/web-dev era (AI Search Optimization, boutique Next.js, WordPress migration) - off-brand + re-introduce commercial tone. Prune to cyber-relevant only, or hide the blog until cyber content exists. Owner decides new topics later.
2. [ ] **Dark mode: finish (emerald/ardoise) or remove the toggle**. Dark theme still has orange residue (only light was repaletted). Default: repalette dark to emerald/ardoise properly; if too risky, hide the header ThemeToggle.
3. [ ] **Bespoke visuals vs stock**: circuit/racks/desk stock repeat across pages. Replace with custom SVG/abstract graphics (whoami-terminal spirit) for a distinctive non-stock feel.
4. [ ] **Vertical rhythm + typo consistency**: unify section padding, heading scale, emerald-accent usage across all pages post-rebuild.
5. [ ] **Motion / micro-interactions**: consistent hover lifts, smoother scroll reveals, a tasteful hero load sequence; respect prefers-reduced-motion.
6. [ ] **CTA differentiation**: not every CTA = "Me contacter"; add secondary "Voir mes projets"/"Mon parcours" to guide recruiters through the story.
7. [ ] **Header: phone -> GitHub/LinkedIn icons** (header just resized; profiles > phone in the top bar for recruiters).
8. [ ] **OG images + favicon on-brand**: emerald/pro share preview with name + role, per-page OG image; updated favicon.
9. [ ] **Perf / LCP**: images to AVIF/WebP sized, font-loading, fast LCP (Lighthouse 95+).
10. [ ] **A11y finishing**: skip-to-content link, focus-visible everywhere, fix the 3 pre-existing react-hooks/set-state-in-effect lint errors, localize the Breadcrumbs hardcoded FR aria-label.

## Notes
- Deploy to prod only on explicit go (site is LIVE; `vercel deploy --prod`, rollback `vercel rollback`).
- Owner-provided assets pending (separate 10-list): real founder photo, CV PDF, Credly URL, published GitHub repos, blog topics.
