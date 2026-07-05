# Smidjan — Shared Component Reference (Phase 2)

Reusable UI/section components for the `refonte-design` rebuild. All use the
navy/orange design tokens (`src/app/globals.css` + `styles/variables.css`) and
scoped **CSS Modules**. Server components by default; only `Button` and
`Breadcrumb` are `"use client"` (interactivity). NO certification claims anywhere.

Global helpers (in `globals.css`): `.wrap` (content wrapper) and `.grid-bg`
(navy grid overlay). The `Faq` accordion needs no JS (native `<details>`).

---

## Primitives — `src/components/ui/*`

### Button — `ui/Button/Button.tsx`
Restyled to navy/orange. Existing API kept; variants extended.
- Props: `variant?: 'primary'|'navy'|'ghost'|'light'|'ghostD'|'solid'|'outline'|'secondary'` (default `solid`→orange), `size?: 'sm'|'md'|'lg'`, `as?: 'button'|'a'`, `href`, `target`, `fullWidth`, `disabled`, `loading`, `leadingIcon`, `trailingIcon`, `onClick`, `type`, `ariaLabel`, `className`, `children`.
- Variant map: `primary/solid`→orange fill · `navy/secondary`→navy fill · `ghost/outline`→light border · `light`→white fill (on navy) · `ghostD`→transparent light border (on navy).
- Usage: `<Button variant="primary" size="lg" as="a" href="/contact">Diagnostic gratuit</Button>`

### Container — `ui/Container.tsx`
- Props: standard `div` attrs (`className`, `children`, …). Renders the global `.container` (`max-width:var(--maxw); padding:0 24px`).
- Usage: `<Container>…</Container>`

### Section — `ui/Section/Section.tsx`
Standard `<section>` with `--section-y` rhythm + background variants.
- Props: `variant?: 'white'|'tint'|'tint3'|'navy'` (default white), `gridBg?: boolean` (navy grid overlay), `contained?: boolean` (wrap in Container, default true), `id`, `className`, `children`.
- Usage: `<Section variant="tint" id="services"><SectionHeading …/>…</Section>`

### Eyebrow — `ui/Eyebrow/Eyebrow.tsx`
Orange uppercase kicker with leading dash.
- Props: `children`, `onDark?: boolean` (navy bg), `as?: 'span'|'div'|'p'`, `className`.
- Usage: `<Eyebrow>Nos services</Eyebrow>`

### SectionHeading — `ui/SectionHeading/SectionHeading.tsx`
Eyebrow + title + optional lead.
- Props: `eyebrow?`, `title` (required), `lead?`, `as?: 'h1'|'h2'|'h3'` (default h2), `center?`, `onDark?`, `id?`, `className?`.
- Usage: `<SectionHeading center eyebrow="Nos services" title="Quatre missions…" lead="…" />`

### LinkMore — `ui/LinkMore/LinkMore.tsx`
Inline "En savoir plus →" link with hover-translate arrow (wraps `next/link`).
- Props: `href` (required), `children?` (default "En savoir plus"), `className?`.
- Usage: `<LinkMore href="/services" />`

### Icon — `ui/Icon/Icon.tsx`
Inline Lucide-style stroke SVG set (24×24, `currentColor`). No icon font.
- Props: `name: IconName` (required), `size?: number` (default 24), `title?`, plus SVG attrs (`strokeWidth`, `className`, …).
- `IconName`: shield · shield-check · check · check-circle · alert-triangle · alert-circle · phone · mail · arrow-right · chevron-down · target · code · file-check · server · users · clock · calendar · quote · sparkles · layers · globe · map-pin · lock · search · book · download.
- Usage: `<Icon name="shield-check" size={20} />`

### Breadcrumb — `components/Breadcrumb/Breadcrumb.tsx`
Restyled (light navy/orange), same schema.org markup + API. Auto-generates from `usePathname()` when no `items` given; hidden on `/`.
- Props: `items?: BreadcrumbItem[]` (`{label, href}`), `className?`.
- Usage: `<Breadcrumb items={[{label:'Conformité NIS2', href:'/conformite-nis2'}]} />`

---

## Shared sections — `src/components/shared/*` (barrel: `shared/index.ts`)

### TrustStrip — `shared/TrustStrip/TrustStrip.tsx`
"Cadres de référence & engagements" row. Honest, NO cert claims.
- Props: `label?`, `items?: TrustItem[]` (`{icon: IconName, label}`), `className?`. Ships `DEFAULT_TRUST_ITEMS` (Aligné ISO 27001, Expertise NIS2 & CyFun, Approche OWASP, CyberFundamentals (CCB), Local Liège, Accès direct expert).
- Usage: `<TrustStrip />`

### ServiceCard — `shared/ServiceCard/ServiceCard.tsx`
Compact `.svc` grid card (home/services grids).
- Props: `icon: IconName | ReactNode` (navy tile), `kicker?`, `title` (required), `description` (required), `bullets?: string[]`, `href?`, `linkLabel?`, `className?`.
- Usage: `<ServiceCard icon="server" kicker="Sécuriser" title="Réseaux & infrastructure" description="…" bullets={[…]} href="/services#securiser" />`

### ServicePillar — `shared/ServicePillar/ServicePillar.tsx`
Full-width service pillar: icon + title + intro + capabilities grid + audience panel + livrables + CTA.
- Props: `id?`, `index?` ("01"), `icon: IconName|ReactNode`, `kicker`, `title`, `intro`, `capabilities: {title,description}[]`, `audience?: {label,text,icon?}[]`, `deliverables: string[]`, `ctaLabel`, `ctaHref`, `visual?: ReactNode`, `alt?` (zebra bg), `className?`.
- Usage: `<ServicePillar id="securiser" index="01" icon="server" kicker="Sécuriser" title="…" intro="…" capabilities={[…]} deliverables={[…]} ctaLabel="…" ctaHref="/contact" />`

### CyFunTiers — `shared/CyFunTiers/CyFunTiers.tsx`
Basic / **Important (featured)** / Essential cards + comparison table. Used on home, services, cyfun.
- Props: `tiers?: CyFunTier[]`, `showTable?: boolean` (default true), `tableRows?: CyFunTableRow[]`, `tableCaption?`, `note?`, `className?`. Ships `DEFAULT_CYFUN_TIERS` + `DEFAULT_CYFUN_TABLE`.
- `CyFunTier`: `{level:'basic'|'important'|'essential', name, coverage, audience, covered:string[], deliverable, ctaHref, ctaLabel?, featured?, flag?}`.
- Usage: `<CyFunTiers />` (home: `<CyFunTiers showTable={false} />`)

### StatsBand — `shared/StatsBand/StatsBand.tsx`
Dark navy stats strip (its own `<section>`; do not wrap in `Section`).
- Props: `stats: StatItem[]` (`{value, accent?, label}`), `title?`, `lead?`, `className?`. `accent` renders in orange (e.g. `value:"12", accent:"+"`).
- Usage: `<StatsBand title="…" stats={[{value:'12',accent:'+',label:'…'}, …]} />`

### ProcessSteps — `shared/ProcessSteps/ProcessSteps.tsx`
Numbered method steps with connecting line (auto-numbered, last step orange).
- Props: `steps: ProcessStep[]` (`{title, description, label?}`), `kicker?`, `className?`.
- Usage: `<ProcessSteps kicker="Notre méthode" steps={[{title:'Diagnostic', description:'…'}, …]} />`

### Faq — `shared/Faq/Faq.tsx`
Accessible native `<details>` accordion (no JS).
- Props: `items: FaqItem[]` (`{question, answer: ReactNode}`), `defaultOpenFirst?: boolean`, `className?`.
- Usage: `<Faq defaultOpenFirst items={[{question:'…', answer:<><p>…</p></>}]} />`

### ArticleCard — `shared/ArticleCard/ArticleCard.tsx`
Journal / related-articles card.
- Props: `title` (required), `href` (required), `category?`, `excerpt?`, `date?`, `readingTime?`, `cover?: ReactNode` (inline SVG), `linkLabel?` (default "Lire"), `className?`.
- Usage: `<ArticleCard title="…" href="/blog/slug" category="NIS2 & Conformité" excerpt="…" date="20 juin 2026" readingTime="7 min" />`

### CTABox — `shared/CTABox/CTABox.tsx`
Navy final-CTA box (its own `<section>`).
- Props: `title` (required), `text?`, `actions: CTAAction[]` (`{label, href, variant?}` — first defaults primary, rest ghostD), `reassurances?: string[]` (green check), `tint?` (tinted band), `id?`, `className?`.
- Usage: `<CTABox title="…" text="…" actions={[{label:'Diagnostic gratuit', href:'/contact'}]} reassurances={['Sans engagement','Réponse sous 24 h']} />`

### StatHook — `shared/StatHook/StatHook.tsx`
Big-number highlight on an orange tint.
- Props: `value` (e.g. "~82%"), `children` (supporting text), `className?`.
- Usage: `<StatHook value="~82%"><b>82 %</b> des attaques courantes couvertes dès le niveau Basic.</StatHook>`
