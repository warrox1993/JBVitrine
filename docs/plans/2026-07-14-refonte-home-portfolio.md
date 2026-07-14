# Refonte home Smidjan (portfolio cyber/GRC) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer la home de smidjan.be en vitrine pro/portfolio honnête (cyber/GRC first) avec une nouvelle identité visuelle claire (palette Émeraude & Ardoise, typo Space Grotesk + Inter + JetBrains Mono, animation signature « whoami »), structure ramenée de ~11 à 6 blocs.

**Architecture:** Next.js 16 App Router, i18n next-intl (FR à `/`, NL `/nl`, EN `/en`). Design system tokenisé (CSS variables dans `src/app/styles/variables.css`). Composants home dans `src/app/[locale]/(site)/_home/`, composants partagés dans `src/components/shared/`, page assemblée dans `src/app/[locale]/(site)/page.tsx`. On change les tokens globaux une fois (bénéficie à tout le site) mais on ne retravaille visuellement que la home dans ce chantier.

**Tech Stack:** Next.js 16.x, React 19, TypeScript, next-intl v4, CSS Modules + CSS variables, next/font/google.

**Spec source:** `docs/design/2026-07-14-refonte-home-portfolio-design.md`

## Global Constraints

- **Thème clair uniquement.** Ne pas ajouter de nouvelles règles dark ; le bloc `:root[data-theme="dark"]` existant reste tel quel (hors périmètre, non retravaillé).
- **Zéro tiret cadratin `—` (U+2014) ni tiret demi-cadratin `–` (U+2013)** comme séparateur dans toute copie visible (`.tsx`, `messages/**`, contenu). Repunctuer. Traits d'union `-` des mots composés autorisés. Grep de contrôle avant chaque commit : `grep -Rn $'—\|–' messages/ src/app/\[locale\]/\(site\)/_home/`.
- **Honnêteté absolue.** Jamais « certifié / accrédité / Lead Implementer » NIS2/ISO. Jamais de client nommé ni de chiffre de résultat (pas de « 82% », « 12+ clients », faux témoignage). Formuler en « expertise / méthodologie alignée / préparation / assistance ».
- **Confidentialité outil CyFun.** Publier uniquement les bénéfices listés (Task 8). Jamais : stack technique, architecture interne, ratios de couverture, IDs de contrôles, seuils de scoring, mécaniques bootable-USB au-delà de « aucune donnée conservée ».
- **Palette Émeraude & Ardoise** (valeurs exactes) : bg `#F5F8F7`, bg-alt `#EDF3F1`, surface/solid `#FFFFFF`, text `#0C1A16`, text-muted `#4A5C55`, primary `#0B7A5B`, primary-strong `#059669`, glow/halo `#D6F0E5`, border `rgba(12,26,22,0.10)`.
- **Typo** : titres Space Grotesk (`--font-display`), corps Inter (`--font-base`), mono JetBrains Mono (`--font-mono`). Auto-hébergées via `next/font/google`.
- **Coordonnées réelles** : email `jeanbaptiste.dhondt1@gmail.com`, tél `0475 20 55 62` (tel:`+32475205562`), zone Wallonie, langue français, délai « dès que possible ». Pas de TVA/BCE.
- **i18n** : toute chaîne visible passe par `messages/_ns/home.{fr,nl,en}.json` ET son miroir `messages/{fr,nl,en}.json` (namespace `home`). FR est la source ; NL/EN peuvent d'abord recopier le FR (traduction ultérieure) mais les CLÉS doivent exister dans les 3 pour ne pas casser le build.
- **Vérif de build** (env-stripped) : `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`. tsc via build. Ignorer les 5 erreurs pré-existantes de `tests/wizard-complete.spec.ts`.
- **Branche** : `refonte-home-portfolio` (déjà créée, spec commitée). Commits fréquents. Ne PAS déployer en prod sans autorisation explicite.

---

### Task 1: Polices (Space Grotesk + JetBrains Mono)

**Files:**
- Modify: `src/app/layout.tsx:14` (import + config next/font), `:156` (body className)
- Modify: `src/app/styles/variables.css:20-26` (`--font-display`), add `--font-mono`

**Interfaces:**
- Produces: CSS variables `--font-display` (Space Grotesk), `--font-mono` (JetBrains Mono) disponibles globalement. `--font-base` (Inter) inchangé.

- [ ] **Step 1: Remplacer l'import de police dans layout.tsx**

Dans `src/app/layout.tsx`, remplacer la ligne d'import :
```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
```
Remplacer le bloc `instrument` par :
```tsx
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['500','600','700'],
    variable: '--font-display',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'sans-serif'],
    adjustFontFallback: true
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['500','700'],
    variable: '--font-mono',
    display: 'swap',
    preload: false,
    fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    adjustFontFallback: true
});
```

- [ ] **Step 2: Mettre à jour le body className**

Ligne ~156, remplacer `${instrument.variable}` :
```tsx
<body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
```

- [ ] **Step 3: Déclarer --font-mono dans variables.css**

Dans `src/app/styles/variables.css`, après le bloc `--font-display` (~ligne 26), ajouter :
```css
  --font-mono:
    "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```
Et mettre à jour la valeur de fallback de `--font-display` :
```css
  --font-display:
    "Space Grotesk", Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

- [ ] **Step 4: Vérifier le build**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: build vert, pas d'erreur « Unknown font ». Grep `grep -n "Instrument_Sans\|instrument" src/app/layout.tsx` doit renvoyer 0 résultat.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/styles/variables.css
git commit -m "feat(type): Space Grotesk (display) + JetBrains Mono (mono), retire Instrument Sans"
```

---

### Task 2: Palette Émeraude & Ardoise (tokens globaux)

**Files:**
- Modify: `src/app/styles/variables.css` (bloc `:root` lignes ~5-53 et `:root[data-theme="light"]` lignes ~180-276)

**Interfaces:**
- Produces: tokens couleur remappés (émeraude/ardoise). Tous les composants qui consomment `--color-primary`, `--color-bg`, etc. héritent automatiquement. Le bloc `[data-theme="dark"]` (lignes ~286-385) reste INCHANGÉ.

- [ ] **Step 1: Remplacer les couleurs de base dans `:root`**

Dans `src/app/styles/variables.css`, bloc `:root` (haut du fichier), remplacer les valeurs :
```css
  --color-bg: #F5F8F7;
  --color-bg-alt: #EDF3F1;
  --color-surface: #FFFFFF;
  --color-surface-glass: rgba(255, 255, 255, 0.82);
  --color-surface-solid: #FFFFFF;
  --color-border: rgba(12, 26, 22, 0.10);
  --color-text: #0C1A16;
  --color-text-muted: #4A5C55;
  --color-primary: #0B7A5B;
  --color-primary-strong: #059669;
  --color-primary-contrast: #FFFFFF;
  --color-secondary: #34D399;
  --color-accent: #0B7A5B;
  --color-danger: #d92d20;
```

- [ ] **Step 2: Remapper glows et opacités primaires dans `:root`**

Remplacer les blocs Glows + « Primary color opacities » :
```css
  --shadow-glow-outer: 0 0 24px rgba(11, 122, 91, 0.18);
  --shadow-glow-inner: 0 0 12px rgba(52, 211, 153, 0.12);
  --color-glow: #D6F0E5;

  --color-primary-5: rgba(11, 122, 91, 0.05);
  --color-primary-8: rgba(11, 122, 91, 0.08);
  --color-primary-12: rgba(11, 122, 91, 0.12);
  --color-primary-15: rgba(11, 122, 91, 0.15);
  --color-primary-20: rgba(11, 122, 91, 0.20);
  --color-primary-24: rgba(11, 122, 91, 0.24);
  --color-primary-30: rgba(11, 122, 91, 0.30);
  --color-primary-40: rgba(11, 122, 91, 0.40);
```

- [ ] **Step 3: Remapper les tokens boutons dans `:root`**

Remplacer les `--btn-*` shadow qui référencent l'orange :
```css
  --btn-shadow: 0 10px 24px rgba(11, 122, 91, 0.22);
```
(les autres `--btn-*` utilisent `--color-primary` / color-mix, donc suivent automatiquement.)

- [ ] **Step 4: Répliquer dans `:root[data-theme="light"]`**

Le bloc `:root[data-theme="light"]` duplique la palette light (back-compat). Y répliquer les MÊMES valeurs qu'aux steps 1-3 (bg, surface, text, primary `#0B7A5B`, primary-strong `#059669`, secondary `#34D399`, accent `#0B7A5B`, glow, opacités primaires, btn-shadow, `--color-border-hover: rgba(12,26,22,0.16)`, `--color-shadow: rgba(12,26,22,0.08)`). Laisser les status colors (success/warning/error/info) telles quelles.

- [ ] **Step 5: Vérifier le build + absence d'orange résiduel**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: build vert.
Run: `grep -in "#e86e10\|#ff6a00\|255, 106, 0\|#c25a0d" src/app/styles/variables.css`
Expected: 0 résultat DANS les blocs `:root` et `[data-theme="light"]` (le bloc `[data-theme="dark"]` peut encore contenir de l'orange, hors périmètre).

- [ ] **Step 6: Commit**

```bash
git add src/app/styles/variables.css
git commit -m "feat(design): palette Émeraude & Ardoise (light), remplace orange/navy"
```

---

### Task 3: Repalette du logo + wordmark

**Files:**
- Modify: `src/components/layout/SiteHeader/SiteHeader.tsx:56-69` (couleurs SVG)
- Modify: `src/components/layout/SiteHeader/SiteHeader.module.css` (font-family du wordmark si codée en dur)

**Interfaces:**
- Consumes: tokens Task 2.
- Produces: logo bouclier ardoise + émeraude, wordmark en Space Grotesk.

- [ ] **Step 1: Repalette du SVG**

Dans `SiteHeader.tsx`, dans le `<svg>` du logo :
- `<rect ... fill="#0b1f3a" />` → `fill="#0C1A16"`
- `<path ... stroke="#ff6a00" .../>` → `stroke="#0B7A5B"`
- le check `stroke="#fff"` reste `#fff`.

- [ ] **Step 2: Wordmark en Space Grotesk**

Dans `SiteHeader.module.css`, sur `.brandText` (ou l'équivalent), s'assurer que `font-family: var(--font-display);`. Si absent, l'ajouter.

- [ ] **Step 3: Vérifier build + grep**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert.
Run: `grep -n "0b1f3a\|ff6a00" src/components/layout/SiteHeader/SiteHeader.tsx`
Expected: 0 résultat.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/SiteHeader/SiteHeader.tsx src/components/layout/SiteHeader/SiteHeader.module.css
git commit -m "feat(brand): logo bouclier ardoise + émeraude, wordmark Space Grotesk"
```

---

### Task 4: Contenu i18n home (namespace `home`)

**Files:**
- Rewrite: `messages/_ns/home.fr.json`
- Modify: `messages/_ns/home.nl.json`, `messages/_ns/home.en.json` (mêmes clés, valeurs FR recopiées si pas de traduction)
- Modify miroirs: `messages/fr.json`, `messages/nl.json`, `messages/en.json` (clé `home`)

**Interfaces:**
- Produces: clés i18n consommées par les composants des Tasks 6-11. Structure de clés (namespace `home`) :
  - `hero.eyebrow`, `hero.p1`, `hero.p2`, `hero.ctaPrimary`, `hero.ctaSecondary`, `hero.trust1`, `hero.trust2`, `hero.trust3`
  - `capabilities.eyebrow`, `capabilities.title`, `capabilities.c1.{index,title,line}`, `.c2.*`, `.c3.*`
  - `cyfun.eyebrow`, `cyfun.title`, `cyfun.lead`, `cyfun.b1`..`cyfun.b8`, `cyfun.honesty`, `cyfun.cta`
  - `parcours.eyebrow`, `parcours.title`, `parcours.items[]` (title, period, desc), `parcours.certs`
  - `approche.eyebrow`, `approche.title`, `approche.p1`, `approche.p2`, `approche.cta`
  - `contact.title`, `contact.text`, `contact.ctaPrimary`, `contact.ctaCall`, `contact.reassure1..3`
  - `meta.*` (title/description/og…) conservées/adaptées

- [ ] **Step 1: Réécrire `messages/_ns/home.fr.json`**

Contenu (copy validée, sans tiret cadratin) :
```json
{
  "meta": {
    "title": "Jean-Baptiste Dhondt — Smidjan | Cybersécurité & GRC, Wallonie",
    "description": "Praticien cybersécurité et gouvernance (GRC) en Wallonie. Audits NIS2/CyFun sur référentiels réels, sécurisation réseaux, applications, IA. Transparence totale, zéro chiffre gonflé.",
    "ogTitle": "Smidjan — Cybersécurité & GRC",
    "ogDescription": "La trajectoire d'un praticien cyber rendue visible. Ce que je sais faire, avec des preuves vérifiables.",
    "ogSiteName": "Smidjan",
    "ogImageAlt": "Smidjan, cybersécurité et GRC en Wallonie",
    "twitterTitle": "Smidjan — Cybersécurité & GRC",
    "twitterDescription": "Praticien cyber/GRC en Wallonie. Audits NIS2/CyFun, transparence totale."
  },
  "hero": {
    "eyebrow": "whoami",
    "p1": "Sécuriser, c'est mon obsession depuis l'adolescence. Très tôt, par nécessité, j'ai appris à comprendre les systèmes de l'intérieur plutôt qu'à les subir. Cette logique ne m'a jamais quittée : de la Défense aux certifications, jusqu'à aujourd'hui où je construis les compétences et les outils pour sécuriser des infrastructures entières. Réseaux, applications, IA.",
    "p2": "Smidjan, c'est cette trajectoire rendue visible. Pas une agence qui vend du chiffre gonflé : un praticien qui montre son travail, ce qu'il sait faire et ce qu'il ne sait pas encore.",
    "ctaPrimary": "Me contacter",
    "ctaSecondary": "Mon parcours",
    "trust1": "Défense (télécom)",
    "trust2": "AZ-900",
    "trust3": "Bachelier Informatique en cours"
  },
  "capabilities": {
    "eyebrow": "Ce que je sais faire",
    "title": "Trois compétences au service de la sécurité",
    "c1": { "index": "01", "title": "Cyber / GRC", "line": "Audits NIS2/CyFun construits sur des référentiels réels, gouvernance et méthodologie." },
    "c2": { "index": "02", "title": "Automatisation IA", "line": "Orchestration d'outils et workflows (n8n, Make), prompt engineering appliqué." },
    "c3": { "index": "03", "title": "Dev web sécurisé", "line": "Développement assisté et sécurisation du code, du bootcamp Full Stack aux stages Java/.NET." }
  },
  "cyfun": {
    "eyebrow": "Projet phare",
    "title": "Un outil d'audit CyFun que je construis",
    "lead": "Une méthodologie d'audit alignée sur le référentiel CyFun, pensée pour préparer les PME à NIS2. Voici ce qu'il garantit.",
    "b1": "Aligné sur le référentiel CyFun.",
    "b2": "Lecture seule : ne modifie jamais vos systèmes.",
    "b3": "Périmètre explicite, aucune découverte réseau autonome.",
    "b4": "Identifiants jamais stockés.",
    "b5": "Journal d'audit inviolable.",
    "b6": "Remédiation validée par un humain, jamais auto-exécutée.",
    "b7": "Aucune donnée conservée après l'audit.",
    "b8": "Chaîne claire : rapport, remédiation priorisée, durcissement.",
    "honesty": "Auto-évaluation assistée et préparation. Ce n'est pas une certification officielle, réservée aux organismes accrédités BELAC.",
    "cta": "En savoir plus"
  },
  "parcours": {
    "eyebrow": "Parcours",
    "title": "Une reconversion déterminée vers la cyber",
    "certs": "Certifications : AZ-900 (2026), CCNA en cours, Bac 1 Informatique validé.",
    "items": [
      { "period": "2013-2017", "title": "Technicien télécom", "desc": "Défense belge." },
      { "period": "2022-2023", "title": "Agent de sécurité", "desc": "Commission européenne." },
      { "period": "2025", "title": "Formation développement", "desc": "Bootcamp Java Full Stack (TechnoFutur TIC), stages Java/.NET." },
      { "period": "Aujourd'hui", "title": "Cap GRC / cyber", "desc": "Bachelier Informatique (promotion sociale, ISL) en parallèle d'un emploi." }
    ]
  },
  "approche": {
    "eyebrow": "Approche",
    "title": "D'où ça vient",
    "p1": "Adolescent, dans un environnement contraint, j'ai appris à comprendre comment fonctionnent les systèmes plutôt qu'à les subir. Pas par curiosité abstraite : par nécessité. C'est là que j'ai pris goût à ouvrir le capot, à voir comment les choses tiennent, ou cèdent.",
    "p2": "Ce que je sais faire, je le montre avec des preuves vérifiables. Ce que je ne sais pas encore faire, je ne le prétends pas.",
    "cta": "Mon approche en détail"
  },
  "contact": {
    "title": "Parlons de votre besoin",
    "text": "Une mission, un poste, une collaboration : écrivez-moi, je réponds dès que possible.",
    "ctaPrimary": "Me contacter",
    "ctaCall": "0475 20 55 62",
    "reassure1": "Réponse dès que possible",
    "reassure2": "Transparence totale",
    "reassure3": "Wallonie, en français"
  }
}
```

- [ ] **Step 2: Recopier les clés dans NL et EN**

Copier la structure de clés dans `messages/_ns/home.nl.json` et `home.en.json`. Traduire si possible ; sinon recopier les valeurs FR (les clés DOIVENT exister dans les 3). Ne pas laisser de tiret cadratin.

- [ ] **Step 3: Régénérer les miroirs `messages/{fr,nl,en}.json`**

Remplacer la clé `home` de chaque `messages/{loc}.json` par le contenu de `messages/_ns/home.{loc}.json`. (Vérifier s'il existe un script de merge dans `scripts/` ; sinon, édition manuelle de la clé `home`.)

- [ ] **Step 4: Vérifier parité des clés + absence de tiret cadratin**

Run:
```bash
node -e "const f=require('./messages/_ns/home.fr.json'),n=require('./messages/_ns/home.nl.json'),e=require('./messages/_ns/home.en.json'); const k=o=>JSON.stringify(Object.keys(o).sort()); console.log('parité:', k(f)===k(n)&&k(f)===k(e))"
grep -Rn $'—\|–' messages/_ns/home.*.json messages/fr.json
```
Expected: `parité: true`, et 0 tiret cadratin.

- [ ] **Step 5: Commit**

```bash
git add messages/
git commit -m "feat(i18n): copy home portfolio (hero, capacités, cyfun, parcours, approche, contact)"
```

---

### Task 5: Composant WhoamiTerminal (animation signature)

**Files:**
- Create: `src/app/[locale]/(site)/_home/WhoamiTerminal.tsx`
- Create: `src/app/[locale]/(site)/_home/WhoamiTerminal.module.css`
- Test: `src/app/[locale]/(site)/_home/WhoamiTerminal.test.tsx` (si vitest/jest configuré ; sinon vérif runtime au Step 4)

**Interfaces:**
- Produces: `export function WhoamiTerminal(): JSX.Element`. Client component (`"use client"`). Aucune prop requise (contenu i18n via `useTranslations("home")` ou texte passé en props depuis le Hero serveur). Choix retenu : props `lines` pour rester testable :
  `WhoamiTerminal({ name, role }: { name: string; role: string })`.

- [ ] **Step 1: Écrire le composant**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./WhoamiTerminal.module.css";

type Props = { name: string; role: string };

const SHIELD_PATH = "M20 8l9 3.4v6.9c0 5.6-3.7 10.7-9 12.3-5.3-1.6-9-6.7-9-12.3v-6.9L20 8Z";
const CHECK_PATH = "M15.8 20.2l3 3 5.4-6";

export function WhoamiTerminal({ name, role }: Props) {
  const [phase, setPhase] = useState(0); // 0..4 (lignes révélées), 5 = bouclier
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) { setPhase(5); return; }
    const timers = [420, 900, 1300, 1750, 2200].map((ms, i) =>
      window.setTimeout(() => setPhase(i + 1), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.term} role="img" aria-label={`${name}, ${role}`}>
      <div className={styles.bar}><span/><span/><span/></div>
      <pre className={styles.body}>
        <span className={styles.prompt}>&gt; whoami</span>
        {phase >= 1 && <span className={styles.out}>{name}</span>}
        {phase >= 2 && <span className={styles.prompt}>&gt; role</span>}
        {phase >= 3 && <span className={styles.out}>{role}</span>}
        {phase >= 4 && <span className={styles.prompt}>&gt; smidjan --init</span>}
      </pre>
      {phase >= 5 && (
        <svg className={styles.shield} viewBox="0 0 40 40" aria-hidden="true">
          <path d={SHIELD_PATH} fill="none" stroke="var(--color-primary)" strokeWidth="2" className={styles.draw}/>
          <path d={CHECK_PATH} fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.drawCheck}/>
        </svg>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Écrire le CSS module**

Créer `WhoamiTerminal.module.css` : `.term` carte surface avec bordure `var(--color-border)`, radius `var(--radius-lg)`, ombre `var(--shadow-md)`, fond `var(--color-surface-solid)` ; `.bar` trois pastilles ; `.body` `font-family: var(--font-mono)`, `white-space: pre-wrap`, gap vertical ; `.prompt` couleur `var(--color-text-muted)` ; `.out` couleur `var(--color-primary)` ; curseur clignotant via `::after` sur la dernière ligne (respecter `@media (prefers-reduced-motion: reduce)` : pas d'animation). `.draw` / `.drawCheck` : `stroke-dasharray`/`stroke-dashoffset` animés (path draw ~600ms), désactivés sous reduced-motion (dashoffset 0).

- [ ] **Step 3: Fallback reduced-motion**

Vérifier que sous `prefers-reduced-motion: reduce`, `phase` démarre à 5 (état final complet visible) et aucune animation CSS ne tourne.

- [ ] **Step 4: Vérifier au runtime**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert (pas d'erreur TS). Le composant sera monté par le Hero (Task 6) ; vérif visuelle au Task 12.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/(site)/_home/WhoamiTerminal.tsx" "src/app/[locale]/(site)/_home/WhoamiTerminal.module.css"
git commit -m "feat(home): WhoamiTerminal, animation signature nom -> bouclier"
```

---

### Task 6: Hero split (reconstruit)

**Files:**
- Rewrite: `src/app/[locale]/(site)/_home/Hero.tsx`
- Rewrite: `src/app/[locale]/(site)/_home/Hero.module.css`

**Interfaces:**
- Consumes: clés `home.hero.*` (Task 4), `WhoamiTerminal` (Task 5).
- Produces: `export function Hero(): JSX.Element` (server component qui lit les traductions et passe `name`/`role` au WhoamiTerminal client).

- [ ] **Step 1: Écrire le Hero**

Structure : `<section>` avec grille 2 colonnes (gauche texte, droite `WhoamiTerminal`). Gauche : eyebrow mono (`hero.eyebrow` = « whoami »), `<h1>` construit à partir d'une accroche courte (voir note) + `hero.p1`/`hero.p2` en `<p>`, deux CTA (`Link` de `@/i18n/navigation` : primaire → `/contact`, secondaire → `/approche`), ligne de confiance (trust1/2/3 séparés par des points mono). Passer `name="Jean-Baptiste Dhondt"` et `role="Cyber / GRC · Wallonie"` au terminal.
Note H1 : utiliser une accroche courte dédiée. Ajouter clé `home.hero.h1` = « La sécurité, comprise de l'intérieur. » (à créer dans Task 4 messages si retenue ; sinon utiliser p1 comme lead sous un h1 court). Décision : ajouter `hero.h1` aux 3 locales.

- [ ] **Step 2: Écrire le CSS (split responsive)**

Grille `grid-template-columns: 1.1fr 0.9fr` desktop, 1 colonne < `--bp-md` (terminal sous le texte). Eyebrow `font-family: var(--font-mono)`, couleur `var(--color-primary)`, uppercase letterspacing. Halo émeraude doux en fond (`radial-gradient` avec `--color-glow`). Respecter tokens spacing.

- [ ] **Step 3: Ajouter la clé `hero.h1`**

Ajouter `"h1": "La sécurité, comprise de l'intérieur."` dans `home.hero` des 3 locales + miroirs (retour sur Task 4). Vérifier parité des clés.

- [ ] **Step 4: Vérifier build**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/(site)/_home/Hero.tsx" "src/app/[locale]/(site)/_home/Hero.module.css" messages/
git commit -m "feat(home): hero split éditorial + terminal whoami, copy portfolio"
```

---

### Task 7: Bloc Capacités (cartes index mono)

**Files:**
- Create: `src/app/[locale]/(site)/_home/Capabilities.tsx`
- Create: `src/app/[locale]/(site)/_home/Capabilities.module.css`

**Interfaces:**
- Consumes: clés `home.capabilities.*` (Task 4).
- Produces: `export function Capabilities(): JSX.Element`.

- [ ] **Step 1: Écrire le composant**

3 cartes. Chaque carte : index mono (`c1.index` en `var(--font-mono)`, gros, `var(--color-primary)`), titre `<h3>` (Space Grotesk), une ligne de description, une flèche `→`. Wrap dans `Link` de `@/i18n/navigation` (c1 → `/conformite-nis2`, c2 → `/services`, c3 → `/services`). Utiliser le composant `Reveal` (`@/components/ui/Reveal/Reveal`) avec `stagger` pour l'entrée.

- [ ] **Step 2: Écrire le CSS**

Grille `repeat(3, 1fr)` desktop, 1 col mobile. Carte : bordure fine `var(--color-border)`, radius `var(--radius-lg)`, padding tokens, fond `var(--color-surface-solid)`. Hover : `transform: translateY(-4px)`, `box-shadow: var(--shadow-glow)`, flèche `translateX(4px)`, transition `var(--transition-base)`. Respecter reduced-motion.

- [ ] **Step 3: Vérifier build**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/_home/Capabilities.tsx" "src/app/[locale]/(site)/_home/Capabilities.module.css"
git commit -m "feat(home): bloc Capacités, cartes index mono cyber/IA/dev"
```

---

### Task 8: Bloc CyFun (projet phare)

**Files:**
- Create: `src/app/[locale]/(site)/_home/CyfunTeaser.tsx`
- Create: `src/app/[locale]/(site)/_home/CyfunTeaser.module.css`

**Interfaces:**
- Consumes: clés `home.cyfun.*` (Task 4).
- Produces: `export function CyfunTeaser(): JSX.Element`.

- [ ] **Step 1: Écrire le composant**

Bloc sur fond tint (`var(--color-bg-alt)`). Eyebrow mono `cyfun.eyebrow`, `<h2>` `cyfun.title`, lead `cyfun.lead`. Liste des 8 bénéfices (`b1..b8`) en grille 2 colonnes avec puce check émeraude (réutiliser un petit SVG check inline). Ligne d'honnêteté `cyfun.honesty` en `.muted` encadrée. CTA `Link` → `/conformite-nis2#methode-audit` (`cyfun.cta`). NE PAS afficher de détail technique/confidentiel (voir Global Constraints).

- [ ] **Step 2: Écrire le CSS**

Grille bénéfices 2 col desktop / 1 col mobile, puces alignées. `.honesty` : fond `var(--color-surface)`, bordure gauche `3px solid var(--color-primary)`, texte muted, italique léger.

- [ ] **Step 3: Vérifier build + confidentialité**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Run: `grep -in "golang\|\\bGo\\b\|stack\|architecture\|USB\|ISO\|contrôle 1\|scoring\|seuil" "src/app/[locale]/(site)/_home/CyfunTeaser.tsx" messages/_ns/home.fr.json`
Expected: build vert ; 0 fuite confidentielle.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/_home/CyfunTeaser.tsx" "src/app/[locale]/(site)/_home/CyfunTeaser.module.css"
git commit -m "feat(home): bloc CyFun projet phare (bénéfices publiables uniquement)"
```

---

### Task 9: Bloc Parcours (timeline)

**Files:**
- Create: `src/app/[locale]/(site)/_home/Parcours.tsx`
- Create: `src/app/[locale]/(site)/_home/Parcours.module.css`

**Interfaces:**
- Consumes: clés `home.parcours.*` (Task 4, `items` est un tableau).
- Produces: `export function Parcours(): JSX.Element`.

- [ ] **Step 1: Écrire le composant**

Lire `t.raw("parcours.items")` comme tableau. Timeline verticale : chaque item = période (mono, `var(--color-primary)`), titre `<h3>`, desc. Ligne de certifs `parcours.certs` en bas. Eyebrow mono + `<h2>` `parcours.title`.

- [ ] **Step 2: Écrire le CSS**

Timeline : rail vertical à gauche (`::before`), points émeraude par item, contenu à droite. Responsive : conserver le rail à gauche sur mobile (padding réduit).

- [ ] **Step 3: Vérifier build**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert. Vérifier que `t.raw` renvoie bien le tableau (pas d'erreur de rendu).

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/_home/Parcours.tsx" "src/app/[locale]/(site)/_home/Parcours.module.css"
git commit -m "feat(home): bloc Parcours timeline (faits vérifiables)"
```

---

### Task 10: Bloc Approche (extrait)

**Files:**
- Rewrite: `src/app/[locale]/(site)/_home/WhySmidjan.tsx` → renommer en `ApprocheTeaser.tsx` (ou réécrire le contenu). Décision : créer `ApprocheTeaser.tsx` + `.module.css`, retirer `WhySmidjan`/`Honesty`/`InsightTeaser` de la page (Task 12).

**Interfaces:**
- Consumes: clés `home.approche.*` (Task 4).
- Produces: `export function ApprocheTeaser(): JSX.Element`.

- [ ] **Step 1: Écrire le composant**

Bloc éditorial : eyebrow mono `approche.eyebrow`, `<h2>` `approche.title` (« D'où ça vient »), `approche.p1` + `approche.p2` en `<p>` lead, CTA `Link` → `/approche` (`approche.cta`). Mise en page centrée, largeur de lecture confortable (`max-width` ~65ch).

- [ ] **Step 2: Écrire le CSS**

Fond `var(--color-bg)`, texte lead `var(--text-lg)`, `max-inline-size: 65ch`, centré. Lien CTA avec flèche.

- [ ] **Step 3: Vérifier build**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Expected: vert.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/_home/ApprocheTeaser.tsx" "src/app/[locale]/(site)/_home/ApprocheTeaser.module.css"
git commit -m "feat(home): bloc Approche (extrait D'où ça vient + lien)"
```

---

### Task 11: Coordonnées réelles (schema, footer, métadonnées) + bloc Contact

**Files:**
- Modify: `src/lib/schema.ts` (téléphone, email, adresse/zone), `src/lib/constants.ts` (si présent), footer (`src/components/layout/**Footer**`), `EmergencyBar` si tel codé.
- Reuse: `CTABox` (`@/components/shared`) pour le bloc contact de la home (Task 12).

**Interfaces:**
- Consumes: clés `home.contact.*` (Task 4).
- Produces: coordonnées cohérentes site-wide.

- [ ] **Step 1: Repérer les placeholders**

Run:
```bash
grep -RIn "4 268 00 00\|3242680000\|contact@smidjan.be\|soc@smidjan.be\|0700.000.000\|Liège 4000" src/lib src/components messages
```

- [ ] **Step 2: Remplacer par les vraies valeurs**

Partout : tél → `+32 475 20 55 62` (affichage `0475 20 55 62`, `tel:+32475205562`) ; email → `jeanbaptiste.dhondt1@gmail.com` ; zone → Wallonie ; retirer toute TVA/BCE. Dans `schema.ts`, `telephone`, `email`, `areaServed` = « Wallonie » / « BE ». Ne pas inventer d'adresse postale précise (utiliser région).

- [ ] **Step 3: Vérifier build + grep placeholders**

Run: `SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build`
Run: `grep -RIn "4 268 00 00\|3242680000\|soc@smidjan.be\|0700.000.000" src/`
Expected: build vert ; 0 placeholder restant (hors emails opérationnels d'API si intentionnels — à confirmer, mais l'affichage public utilise l'email réel).

- [ ] **Step 4: Commit**

```bash
git add src/lib src/components messages
git commit -m "feat(contact): coordonnées réelles (email gmail, 0475 20 55 62, Wallonie), retire placeholders"
```

---

### Task 12: Assemblage de la page + retrait des anciens blocs

**Files:**
- Rewrite: `src/app/[locale]/(site)/page.tsx`
- Modify: `src/app/[locale]/(site)/_home/Home.module.css` (grilles si nécessaire)

**Interfaces:**
- Consumes: `Hero`, `Capabilities`, `CyfunTeaser`, `Parcours`, `ApprocheTeaser` (Tasks 6-10), `CTABox`, `Section`, `SectionHeading`, `Reveal`.
- Produces: home 6 blocs.

- [ ] **Step 1: Réécrire page.tsx**

Nouvel ordre :
1. `<Hero />`
2. `<Section variant="white" id="savoir-faire">` → `<Capabilities />`
3. `<Section variant="tint" id="cyfun">` → `<CyfunTeaser />`
4. `<Section variant="white" id="parcours">` → `<Parcours />`
5. `<Section variant="tint" id="approche">` → `<ApprocheTeaser />`
6. `<CTABox id="contact" title=... text=... actions=[{label: contact.ctaPrimary, href:"/contact"},{label: contact.ctaCall, href:"tel:+32475205562", variant:"ghostD"}] reassurances=[reassure1..3] />`

Retirer : `TrustStrip`, `NIS2Checker` + section `#concerne`, `CyfunIntro`/`CyFunTiers`/`IllusPanel`, `ServiceCard`×4, `ProcessSteps`, `WhySmidjan`, `Honesty`, `Faq`, `InsightTeaser`, `BelgiumMapFigure`/`AuditDashboardFigure`. Nettoyer les imports correspondants. Conserver les JSON-LD schemas pertinents (organization, website, localBusiness, person, homeWebPage) ; retirer `faqSchema` (plus de FAQ sur la home).

- [ ] **Step 2: Mettre à jour le schema Person/WebPage si nécessaire**

Vérifier que `personSchema` reflète JB (nom, rôle cyber/GRC) et non une valeur stale. Ajuster dans `src/lib/schema.ts` si besoin.

- [ ] **Step 3: Supprimer les composants _home orphelins**

Après retrait des usages, supprimer les fichiers devenus morts : `CyfunIntro.*`, `Honesty.*`, `IllusPanel.*`, `InsightTeaser.*`, `WhySmidjan.*`, `figures.tsx` (si plus utilisés ailleurs). Vérifier par grep d'import avant suppression :
```bash
for c in CyfunIntro Honesty IllusPanel InsightTeaser WhySmidjan figures; do echo "$c:"; grep -RIl "_home/$c" src/ | grep -v "_home/$c"; done
```
Ne supprimer que ceux à 0 référence hors leur propre dossier.

- [ ] **Step 4: Vérifier build + tsc + lint**

Run:
```bash
SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build
npm run lint
grep -Rn $'—\|–' "src/app/[locale]/(site)/_home/" messages/_ns/home.*.json
```
Expected: build vert (49→~ pages), lint OK, 0 tiret cadratin.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/(site)/page.tsx" "src/app/[locale]/(site)/_home/"
git commit -m "feat(home): assemblage 6 blocs portfolio, retrait des anciennes sections"
```

---

### Task 13: Vérification finale (visuelle, a11y, responsive)

**Files:** aucun (vérification).

- [ ] **Step 1: Lancer le dev server et inspecter**

Run: `npm run dev` (port 3000). Ouvrir `/`, `/nl`, `/en`.
Vérifier visuellement (screenshots via l'outil du harness ou navigateur) :
- Hero split + animation whoami se joue puis bouclier se dessine.
- Palette émeraude cohérente, aucun orange résiduel sur la home.
- Cartes capacités hover (lift + halo).
- Blocs CyFun / Parcours / Approche / Contact rendus, liens fonctionnels.

- [ ] **Step 2: Contrôles d'accessibilité et contraste**

Vérifier : contraste texte `#0C1A16`/`#4A5C55` sur `#F5F8F7` et blanc sur `#0B7A5B` (≥ AA), focus-visible sur CTA et liens cartes, `prefers-reduced-motion` (le terminal affiche l'état final sans animer), hiérarchie h1→h2→h3.

- [ ] **Step 3: Responsive**

Vérifier 360px / 768px / 1440px : hero passe en 1 colonne, cartes en 1 colonne, pas d'overflow horizontal.

- [ ] **Step 4: Grep final anti-régression**

Run:
```bash
grep -RIn $'—\|–' "src/app/[locale]/(site)/" messages/_ns/home.*.json
grep -RIn "certifié\|Lead Implementer\|accrédité" "src/app/[locale]/(site)/_home/" messages/_ns/home.*.json
```
Expected: 0 tiret cadratin ; 0 claim de certification.

- [ ] **Step 5: Commit final (si ajustements)**

```bash
git add -A
git commit -m "fix(home): ajustements finaux vérification visuelle + a11y"
```

---

## Notes d'exécution
- Ne PAS déployer en prod sans autorisation explicite (`vercel deploy --prod` interdit sans go). Voir spec §7.
- Les traductions NL/EN peuvent rester des copies FR au premier passage ; une passe de traduction propre est un suivi séparé.
- Le quiz NIS2 complet (`NIS2Checker`) reste disponible sur `/conformite-nis2` (ne pas le supprimer, juste le retirer de la home).
