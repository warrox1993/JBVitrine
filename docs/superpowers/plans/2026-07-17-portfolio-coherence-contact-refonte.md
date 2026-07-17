# Cohérence portfolio & refonte contact — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aligner tout le site smidjan.be sur le pivot portfolio honnête (tagline, donnée structurée, 4 axes de compétence, bande recruteur) et refondre la page contact en version épurée sans doublons ni signaux d'agence.

**Architecture:** Site Next.js (App Router, next-intl v4, FR `/`, NL `/nl`, EN `/en`) au format CSS Modules. Changements = copie i18n, objets JSON-LD, un composant serveur, et réécriture de présentation de la page contact. Aucune modification de logique métier (formulaire, rate-limit, API).

**Tech Stack:** Next.js 15 (App Router, RSC), next-intl v4, TypeScript, CSS Modules, déploiement Vercel CLI.

## Global Constraints

- **Zéro invention** : uniquement les faits vérifiables listés dans la spec. Jamais de pentest/OSCP/CEH, « expert », hotline 24/7, fausse équipe, certification non détenue, ni cadrage « agence qui vend aux PME ».
- **Pas de tiret cadratin** (`—`/`–`) dans toute copie visible ou schema. Utiliser virgule, deux-points, ou point médian `·`.
- **Trilingue, double source** : toute clé i18n existe dans `messages/{fr,nl,en}.json` (compilé) ET `messages/_ns/<ns>.{fr,nl,en}.json` (source). Modifier les deux, garder le JSON valide.
- **Sécurité** : liens externes en `target="_blank" rel="noopener noreferrer"`. Ne pas toucher au rate-limit (3 envois/h) ni à la logique de `ContactForm.tsx`.
- **Ignorer** les 5 erreurs tsc pré-existantes de `tests/wizard-complete.spec.ts`.
- Répertoire de travail (racine git) : `src/UIs/nextjs` sous `/home/dhondt-jean-baptiste/Bureau/CyberProject/JBVitrine-main`.
- Branche : `refonte-home-portfolio`.

## Faits vérifiables (copiables)

- Jean-Baptiste Dhondt · Smidjan (pratique/marque, non enregistrée) · Wallonie · autorisé UE · télétravail.
- Cert obtenue : AZ-900 (Microsoft, 2026). En cours : CCNA. Bachelier Informatique (ISL) **en cours**. Bootcamp **complété** : Java Full Stack, TechnoFutur TIC (2025).
- LinkedIn `https://www.linkedin.com/in/jean-baptistedhondt` · GitHub `https://github.com/warrox1993` · TryHackMe `https://tryhackme.com/p/Warrox1993`.
- Email `jeanbaptiste.dhondt1@gmail.com` · Tel `0475 20 55 62` / `tel:+32475205562`.

## File Structure

- `messages/_ns/common.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` — tagline header.
- `messages/_ns/agence.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` — meta /agence (retrait « GRC »).
- `src/lib/schema.ts` — réécriture des 5 schemas + FAQ (Modify).
- `src/lib/author-schema.ts` — nettoyage mentions résiduelles (Modify).
- `messages/_ns/home.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` — capabilities c1-c4 + title + `recruiter.*` (Modify).
- `src/app/[locale]/(site)/_home/Capabilities.tsx` (+ `.module.css`) — 4e carte + grille (Modify).
- `src/app/[locale]/(site)/_home/Hero.tsx` — role whoami (Modify).
- `src/app/[locale]/(site)/_home/RecruiterBand.tsx` + `.module.css` — nouveau composant (Create).
- `src/app/[locale]/(site)/page.tsx` — insertion RecruiterBand (Modify).
- `src/app/[locale]/(site)/contact/page.tsx` + `page.module.css` — refonte épurée (Modify).
- `src/components/layout/SiteFooter/SiteFooter.tsx` — retrait lien incident (Modify).
- `src/components/layout/EmergencyBar/` — suppression (Delete, code mort).
- `src/components/layout/SiteHeader/SiteHeader.module.css` — retrait `.incident` orphelin (Modify).

---

## Task 1 : Tagline header + meta /agence

**Files:**
- Modify: `messages/_ns/common.fr.json`, `common.nl.json`, `common.en.json` (clé `brand.tagline`)
- Modify: `messages/fr.json`, `nl.json`, `en.json` (clé `common.brand.tagline`, ligne ~240)
- Modify: `messages/_ns/agence.fr.json`, `.nl.json`, `.en.json` + `messages/{fr,nl,en}.json` (clés `agence.meta.title`, `ogTitle`, `ogImageAlt`)

**Interfaces:**
- Produces: nouvelle valeur `brand.tagline` (FR « Sécurité cloud, réseau, infra & web », NL « Cloud-, netwerk-, infra- & websecurity », EN « Cloud, network, infra & web security »).

- [ ] **Step 1 : Remplacer la tagline dans les 6 fichiers**

Valeurs :
- FR : `"Sécurité cloud, réseau, infra & web"`
- NL : `"Cloud-, netwerk-, infra- & websecurity"`
- EN : `"Cloud, network, infra & web security"`

Dans `messages/_ns/common.{loc}.json` (clé `tagline`) et `messages/{loc}.json` (clé `brand.tagline` sous `common`).

- [ ] **Step 2 : Retirer « Cybersécurité & GRC » des meta /agence**

Dans `agence.meta.title` / `ogTitle` / `ogImageAlt`, remplacer « Cybersécurité & GRC » par « Sécurité cloud & réseau » (FR), « Cloud- & netwerkbeveiliging » (NL), « Cloud & network security » (EN). Fichiers `_ns/agence.{loc}.json` + `messages/{loc}.json`.

- [ ] **Step 3 : Valider les JSON**

Run:
```bash
for f in messages/fr.json messages/nl.json messages/en.json messages/_ns/common.fr.json messages/_ns/common.nl.json messages/_ns/common.en.json messages/_ns/agence.fr.json messages/_ns/agence.nl.json messages/_ns/agence.en.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo "OK $f"; done
```
Expected: `OK` pour chaque fichier.

- [ ] **Step 4 : Vérifier l'absence de « GRC » résiduel**

Run: `grep -rn "GRC" messages/ | grep -v '_ns'` puis `grep -rn "Cybersécurité & GRC" messages/`
Expected: aucune ligne (chaîne éliminée).

- [ ] **Step 5 : Commit**

```bash
git add messages/
git commit -m "feat(positioning): tagline 'Sécurité cloud, réseau, infra & web' + retire 'GRC' des meta /agence"
```

---

## Task 2 : Réécriture honnête de `schema.ts` (+ author-schema.ts)

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `src/lib/author-schema.ts`

**Interfaces:**
- Consumes: rien.
- Produces: exports inchangés en nom (`organizationSchema`, `websiteSchema`, `localBusinessSchema`, `personSchema`, `homeWebPageSchema`, `faqPageSchema`, `CONTENT_LAST_VERIFIED`, `createArticleSchema`) ; seul le contenu change. `page.tsx` (home) les consomme déjà.

- [ ] **Step 1 : Remplacer `organizationSchema.description`**

```ts
  description:
    "Smidjan est la pratique de Jean-Baptiste Dhondt en sécurité cloud, réseau, infrastructure et web, avec un axe conformité NIS2 / CyberFundamentals (CCB). Basé en Wallonie, en Belgique.",
```

- [ ] **Step 2 : Remplacer `websiteSchema.description`**

```ts
  description:
    "Portfolio de Jean-Baptiste Dhondt (Smidjan) : sécurité cloud, réseau, infrastructure et web, et conformité NIS2 / CyberFundamentals, en Wallonie.",
```

- [ ] **Step 3 : Alléger `localBusinessSchema`**

Remplacer `description`, supprimer `priceRange` et `openingHoursSpecification`, et remplacer `hasOfferCatalog.itemListElement` par 4 offres honnêtes (sans pentest) :

```ts
  description:
    "Jean-Baptiste Dhondt (Smidjan), praticien en cybersécurité en Wallonie : sécurité cloud, réseau et infrastructure, sécurité web, et accompagnement à la conformité NIS2 / CyberFundamentals (CCB).",
```
```ts
  // (supprimer priceRange et openingHoursSpecification)
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations de cybersécurité Smidjan",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sécurité cloud", description: "Sécurisation et durcissement d'environnements cloud (Azure), configuration et bonnes pratiques.", serviceType: "Sécurité cloud" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sécurité réseau & infrastructure", description: "Segmentation, durcissement et bonnes pratiques réseau et infrastructure.", serviceType: "Sécurité infrastructure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sécurité web", description: "Applications et sites conçus secure by design, avec une approche inspirée d'OWASP.", serviceType: "Sécurité applicative" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conformité NIS2 & CyberFundamentals (CCB)", description: "Analyse d'écart, remédiation et accompagnement, aux niveaux Basic, Important et Essential.", serviceType: "Conformité & audit" } },
    ],
  },
```

- [ ] **Step 4 : Réécrire `personSchema`**

```ts
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://smidjan.be/#founder",
  name: "Jean-Baptiste Dhondt",
  jobTitle: "Praticien en cybersécurité, cloud, réseau, infra & web",
  worksFor: { "@id": "https://smidjan.be/#organization" },
  url: "https://smidjan.be/agence",
  knowsAbout: [
    "Sécurité cloud",
    "Sécurité réseau",
    "Sécurité de l'infrastructure",
    "Sécurité web",
    "NIS2",
    "CyberFundamentals (CCB)",
    "IA & automatisation",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    recognizedBy: { "@type": "Organization", name: "Microsoft" },
  },
  alumniOf: { "@type": "EducationalOrganization", name: "TechnoFutur TIC" },
  sameAs: [
    "https://www.linkedin.com/in/jean-baptistedhondt",
    "https://github.com/warrox1993",
    "https://tryhackme.com/p/Warrox1993",
  ],
};
```

- [ ] **Step 5 : Aligner `homeWebPageSchema` name/description**

```ts
  name: "Jean-Baptiste Dhondt · Sécurité cloud, réseau, infra & web | Smidjan",
  description:
    "Portfolio de Jean-Baptiste Dhondt : sécurité cloud, réseau, infrastructure et web, et conformité NIS2 / CyberFundamentals, en Wallonie.",
```

- [ ] **Step 6 : Corriger `faqPageSchema`**

Dans la réponse Q1, remplacer « notre diagnostic gratuit clarifie » par « un premier échange gratuit clarifie ».

- [ ] **Step 7 : Nettoyer `author-schema.ts`**

Lire le fichier. Remplacer toute occurrence de « expert », « CEO », « pentest »/« intrusion », ou cadrage « agence web » par la formulation honnête (« praticien en cybersécurité », domaines cloud/réseau/infra/web). Si le fichier ne contient aucune de ces mentions, ne rien changer.

Run: `grep -niE "expert|pentest|intrusion|CEO|agence web" src/lib/author-schema.ts`
Expected après correction: aucune ligne.

- [ ] **Step 8 : Vérifier honnêteté globale du schema**

Run:
```bash
grep -niE "diagnostic gratuit|Tests d'intrusion|priceRange|openingHours|expert en cyber|PME wallonnes" src/lib/schema.ts
```
Expected: aucune ligne.

- [ ] **Step 9 : Commit**

```bash
git add src/lib/schema.ts src/lib/author-schema.ts
git commit -m "feat(schema): JSON-LD honnête portfolio (retire pentest/expert/agence-PME, Person praticien + AZ-900 + TryHackMe)"
```

---

## Task 3 : Capabilities → 4 axes (cloud, réseau/infra, web, IA)

**Files:**
- Modify: `messages/_ns/home.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` (bloc `capabilities`)
- Modify: `src/app/[locale]/(site)/_home/Capabilities.tsx`
- Modify: `src/app/[locale]/(site)/_home/Capabilities.module.css`

**Interfaces:**
- Consumes: clés `home.capabilities.c1..c4.{index,title,line}`, `home.capabilities.title`, `home.capabilities.eyebrow`.
- Produces: `CARDS` à 4 entrées (`c1..c4`), grille 2×2.

- [ ] **Step 1 : Réécrire le bloc `capabilities` (FR)** dans `_ns/home.fr.json` ET `messages/fr.json`

```json
"capabilities": {
  "eyebrow": "Ce que j'apprends",
  "title": "Sécuriser chaque couche",
  "c1": { "index": "01", "title": "Sécurité cloud", "line": "Sécurisation et durcissement d'environnements cloud (Azure), configuration et bonnes pratiques." },
  "c2": { "index": "02", "title": "Sécurité réseau & infra", "line": "Segmentation, durcissement et bonnes pratiques réseau et infrastructure (CCNA en cours)." },
  "c3": { "index": "03", "title": "Sécurité web", "line": "Applications et sites pensés secure by design, avec une approche inspirée d'OWASP." },
  "c4": { "index": "04", "title": "IA & automatisation", "line": "Orchestration d'outils et workflows (n8n, Make), et sécurisation des usages de l'IA." }
}
```

- [ ] **Step 2 : Bloc `capabilities` (NL)** dans `_ns/home.nl.json` ET `messages/nl.json`

```json
"capabilities": {
  "eyebrow": "Wat ik leer",
  "title": "Elke laag beveiligen",
  "c1": { "index": "01", "title": "Cloudbeveiliging", "line": "Beveiliging en verharding van cloudomgevingen (Azure), configuratie en goede praktijken." },
  "c2": { "index": "02", "title": "Netwerk- & infrabeveiliging", "line": "Segmentatie, verharding en goede praktijken voor netwerk en infrastructuur (CCNA lopende)." },
  "c3": { "index": "03", "title": "Webbeveiliging", "line": "Applicaties en sites secure by design, met een aanpak geïnspireerd op OWASP." },
  "c4": { "index": "04", "title": "AI & automatisering", "line": "Orkestratie van tools en workflows (n8n, Make), en beveiliging van AI-gebruik." }
}
```

- [ ] **Step 3 : Bloc `capabilities` (EN)** dans `_ns/home.en.json` ET `messages/en.json`

```json
"capabilities": {
  "eyebrow": "What I'm learning",
  "title": "Securing every layer",
  "c1": { "index": "01", "title": "Cloud security", "line": "Securing and hardening cloud environments (Azure), configuration and best practices." },
  "c2": { "index": "02", "title": "Network & infra security", "line": "Segmentation, hardening and best practices for network and infrastructure (CCNA in progress)." },
  "c3": { "index": "03", "title": "Web security", "line": "Applications and sites built secure by design, with an OWASP-inspired approach." },
  "c4": { "index": "04", "title": "AI & automation", "line": "Orchestration of tools and workflows (n8n, Make), and securing AI usage." }
}
```

- [ ] **Step 4 : Ajouter la 4e carte dans `Capabilities.tsx`**

Remplacer le tableau `CARDS` :
```ts
const CARDS = [
  { key: "c1", href: "/services" },
  { key: "c2", href: "/services" },
  { key: "c3", href: "/services" },
  { key: "c4", href: "/services" },
] as const;
```
Mettre à jour le commentaire JSDoc : `/** Home "Capabilities" block: 4 index-mono cards (cloud, réseau/infra, web, IA). */`.

- [ ] **Step 5 : Adapter la grille CSS pour 4 cartes**

Lire `Capabilities.module.css`, repérer la règle `.grid` (probablement `grid-template-columns: repeat(3, 1fr)` ou `auto-fit`). La passer en **2 colonnes** desktop pour un rendu 2×2 :
```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: /* garder la valeur existante */;
}
@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
}
```
Conserver le reste des styles de carte inchangé. Si un breakpoint intermédiaire existe déjà, l'harmoniser pour ne pas casser le mobile.

- [ ] **Step 6 : Valider JSON + build partiel**

Run:
```bash
for f in messages/fr.json messages/nl.json messages/en.json messages/_ns/home.fr.json messages/_ns/home.nl.json messages/_ns/home.en.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo OK $f; done
```
Expected: `OK` partout.

- [ ] **Step 7 : Commit**

```bash
git add messages/ src/app/\[locale\]/\(site\)/_home/Capabilities.tsx src/app/\[locale\]/\(site\)/_home/Capabilities.module.css
git commit -m "feat(home): Capabilities 4 axes (cloud, réseau/infra, web, IA), grille 2x2"
```

---

## Task 4 : Role whoami (Hero)

**Files:**
- Modify: `src/app/[locale]/(site)/_home/Hero.tsx:49`

- [ ] **Step 1 : Mettre à jour la prop `role`**

Remplacer :
```tsx
<WhoamiTerminal name="Jean-Baptiste Dhondt" role="Sécurité cloud · réseaux · IA" />
```
par :
```tsx
<WhoamiTerminal name="Jean-Baptiste Dhondt" role="Sécurité cloud · réseau · infra · web" />
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/\[locale\]/\(site\)/_home/Hero.tsx
git commit -m "feat(home): role whoami sur cloud/réseau/infra/web"
```

---

## Task 5 : Bande recruteur (nouveau composant + wiring)

**Files:**
- Create: `src/app/[locale]/(site)/_home/RecruiterBand.tsx`
- Create: `src/app/[locale]/(site)/_home/RecruiterBand.module.css`
- Modify: `messages/_ns/home.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` (nouveau bloc `recruiter`)
- Modify: `src/app/[locale]/(site)/page.tsx` (insertion entre Hero et Capabilities)

**Interfaces:**
- Consumes: clés `home.recruiter.{eyebrow,availK,availV,locK,locV,focusK,focusV,ctaLinkedin,ctaParcours,ctaGithub}`.
- Produces: `export default RecruiterBand` (composant serveur async, sans props).

- [ ] **Step 1 : Ajouter le bloc `recruiter` (FR)** dans `_ns/home.fr.json` ET `messages/fr.json` (à la racine du namespace home, après `capabilities`)

```json
"recruiter": {
  "eyebrow": "Pour un recruteur",
  "availK": "Disponibilité",
  "availV": "Ouvert aux opportunités",
  "locK": "Localisation",
  "locV": "Wallonie · autorisé à travailler en UE · télétravail",
  "focusK": "Focus",
  "focusV": "Sécurité cloud, réseau, infra & web",
  "ctaLinkedin": "LinkedIn",
  "ctaParcours": "Voir mon parcours",
  "ctaGithub": "GitHub"
}
```

- [ ] **Step 2 : Bloc `recruiter` (NL)**

```json
"recruiter": {
  "eyebrow": "Voor een recruiter",
  "availK": "Beschikbaarheid",
  "availV": "Open voor opportuniteiten",
  "locK": "Locatie",
  "locV": "Wallonië · gemachtigd om in de EU te werken · telewerk",
  "focusK": "Focus",
  "focusV": "Cloud-, netwerk-, infra- & websecurity",
  "ctaLinkedin": "LinkedIn",
  "ctaParcours": "Mijn traject bekijken",
  "ctaGithub": "GitHub"
}
```

- [ ] **Step 3 : Bloc `recruiter` (EN)**

```json
"recruiter": {
  "eyebrow": "For a recruiter",
  "availK": "Availability",
  "availV": "Open to opportunities",
  "locK": "Location",
  "locV": "Wallonia · authorized to work in the EU · remote",
  "focusK": "Focus",
  "focusV": "Cloud, network, infra & web security",
  "ctaLinkedin": "LinkedIn",
  "ctaParcours": "See my journey",
  "ctaGithub": "GitHub"
}
```

- [ ] **Step 4 : Créer `RecruiterBand.tsx`**

```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./RecruiterBand.module.css";

const LINKEDIN = "https://www.linkedin.com/in/jean-baptistedhondt";
const GITHUB = "https://github.com/warrox1993";

/** Home recruiter band: availability/location/focus + direct links. Placed under the hero. */
export async function RecruiterBand() {
  const t = await getTranslations("home");
  const facts = [
    { k: t("recruiter.availK"), v: t("recruiter.availV") },
    { k: t("recruiter.locK"), v: t("recruiter.locV") },
    { k: t("recruiter.focusK"), v: t("recruiter.focusV") },
  ];

  return (
    <section className={styles.band} aria-label={t("recruiter.eyebrow")}>
      <Container>
        <Reveal className={styles.inner}>
          <p className={styles.eyebrow}>{t("recruiter.eyebrow")}</p>
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.k} className={styles.fact}>
                <dt className={styles.k}>{f.k}</dt>
                <dd className={styles.v}>{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.ctas}>
            <a className={styles.ctaPrimary} href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              {t("recruiter.ctaLinkedin")}
            </a>
            <Link className={styles.ctaGhost} href="/agence">
              {t("recruiter.ctaParcours")}
            </Link>
            <a className={styles.ctaGhost} href={GITHUB} target="_blank" rel="noopener noreferrer">
              {t("recruiter.ctaGithub")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default RecruiterBand;
```

Note : vérifier le chemin d'import exact de `Container` (`@/components/ui/Container`) et `Reveal` en s'alignant sur `Capabilities.tsx`/`Hero.tsx` du même dossier.

- [ ] **Step 5 : Créer `RecruiterBand.module.css`**

```css
.band {
  padding: clamp(1.5rem, 4vw, 2.5rem) 0;
  background: var(--mint-glow, #D6F0E5);
  border-top: 1px solid color-mix(in srgb, var(--accent, #0B7A5B) 18%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--accent, #0B7A5B) 18%, transparent);
}
.inner { display: flex; flex-direction: column; gap: 1.25rem; }
.eyebrow {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent-strong, #059669); margin: 0;
}
.facts {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1rem 2rem; margin: 0;
}
.fact { display: flex; flex-direction: column; gap: 0.15rem; }
.k {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-2, #4A5C55);
}
.v { font-weight: 600; color: var(--ink, #0C1A16); }
.ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.ctaPrimary, .ctaGhost {
  display: inline-flex; align-items: center; min-height: 44px;
  padding: 0.55rem 1.1rem; border-radius: 10px; font-weight: 600;
  text-decoration: none; transition: background 0.15s, border-color 0.15s;
}
.ctaPrimary { background: var(--accent, #0B7A5B); color: #fff; }
.ctaPrimary:hover { background: var(--accent-strong, #059669); }
.ctaGhost {
  border: 1px solid color-mix(in srgb, var(--ink, #0C1A16) 22%, transparent);
  color: var(--ink, #0C1A16);
}
.ctaGhost:hover { border-color: var(--accent, #0B7A5B); color: var(--accent-strong, #059669); }
@media (max-width: 640px) {
  .facts { grid-template-columns: 1fr; }
}
:root[data-theme="dark"] .band {
  background: color-mix(in srgb, var(--accent, #0B7A5B) 14%, transparent);
}
:root[data-theme="dark"] .v { color: var(--ink, #eaf3ef); }
```

Note : ajuster les noms de variables CSS aux tokens réels de `variables.css` (émeraude/ardoise). Les `var(--x, fallback)` fournissent un repli si le token diffère ; vérifier et corriger les noms après lecture de `variables.css`.

- [ ] **Step 6 : Insérer `RecruiterBand` dans `page.tsx` (home)**

Ajouter l'import en tête (avec les autres imports `_home`), puis placer `<RecruiterBand />` **entre `<Hero />` et la première `<Section>` contenant `<Capabilities />`**. Ne pas l'envelopper dans une `<Section>` (la bande gère son propre fond pleine largeur).

- [ ] **Step 7 : Valider JSON**

Run:
```bash
for f in messages/fr.json messages/nl.json messages/en.json messages/_ns/home.fr.json messages/_ns/home.nl.json messages/_ns/home.en.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo OK $f; done
```
Expected: `OK` partout.

- [ ] **Step 8 : Commit**

```bash
git add messages/ src/app/\[locale\]/\(site\)/_home/RecruiterBand.tsx src/app/\[locale\]/\(site\)/_home/RecruiterBand.module.css src/app/\[locale\]/\(site\)/page.tsx
git commit -m "feat(home): bande recruteur sous le hero (dispo, localisation, focus + LinkedIn/parcours/GitHub)"
```

---

## Task 6 : Refonte de `contact/page.tsx` (épurée)

**Files:**
- Modify: `src/app/[locale]/(site)/contact/page.tsx` (réécriture du corps rendu)

**Interfaces:**
- Consumes: `<ContactForm/>` (inchangé), clés `contact.hero.*`, nouvelles/conservées `contact.side.*` (coordonnées) et `contact.expect.*`.
- Produces: page à 3 zones (hero sobre, form + coordonnées, « à quoi s'attendre »).

- [ ] **Step 1 : Réécrire le JSON-LD ContactPage**

Conserver les deux `<script type="application/ld+json">` (ContactPage + BreadcrumbList) mais changer `contactType: 'sales'` → `contactType: 'customer support'`. Garder `nonce={nonce}`.

- [ ] **Step 2 : Remplacer le hero par une version sobre**

Retirer la colonne image (`pageHeadMedia` + `OptimizedImage office-team.jpg`), le double CTA (`heroCtas` avec `ctaPhone`), et le bandeau `headAssure` (assure1/2/3). Garder : fil d'Ariane (`crumbs`), `eyebrow`, `h1`, une phrase `lead`, et un seul CTA texte ancré `#form`.

```tsx
      <div className={cls.pageHead}>
        <div className={`wrap ${cls.pageHeadInner}`}>
          <Reveal as="div" className={cls.pageHeadText}>
            <nav className={cls.crumbs} aria-label={t('hero.crumbAria')}>
              <a href="/">{t('hero.crumbHome')}</a>
              <span aria-hidden="true">·</span>
              <span>{t('hero.crumbContact')}</span>
            </nav>
            <span className={cls.eyebrow}>{t('hero.eyebrow')}</span>
            <h1>{t.rich('hero.title', { accent: (c) => <span className={cls.accent}>{c}</span> })}</h1>
            <p className={cls.lead}>{t('hero.lead')}</p>
          </Reveal>
        </div>
      </div>
```

- [ ] **Step 3 : Remplacer la grille contact (form + aside)**

Garder la colonne gauche (`formPrimary` + `ContactForm`). Remplacer toute la colonne `aside` (bloc incident, process-strip, coordonnées actuelles, carte) par **un seul bloc coordonnées épuré** avec email, téléphone (une fois), zone, délai, LinkedIn, GitHub :

```tsx
      <section className={cls.contact} id="form">
        <div className="wrap">
          <div className={cls.contactGrid}>
            <div className={cls.formPrimary}>
              <span className={cls.formBadge}>{t('form.badge')}</span>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className={cls.side} aria-label={t('side.aria')}>
              <Reveal as="div" className={cls.infoCard}>
                <h2 className={cls.coordTitle}>{t('side.coordTitle')}</h2>
                <ul className={cls.coord}>
                  <li>
                    <span className={cls.k}>{t('side.coordEmailK')}</span>
                    <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordPhoneK')}</span>
                    <a href="tel:+32475205562">0475 20 55 62</a>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordZoneK')}</span>
                    <span>{t('side.coordZoneV')}</span>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordHoursK')}</span>
                    <span>{t('side.coordHoursV')}</span>
                  </li>
                </ul>
                <div className={cls.profiles}>
                  <a href="https://www.linkedin.com/in/jean-baptistedhondt" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/warrox1993" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
```

- [ ] **Step 4 : Garder la section « À quoi s'attendre » telle quelle**

Conserver la `<section className={cls.expect}>` existante (steps 1-3 + note). Ne pas la dupliquer.

- [ ] **Step 5 : Retirer les imports devenus inutiles**

Si `OptimizedImage` n'est plus utilisé dans le fichier, retirer son import. Vérifier :
Run: `grep -n "OptimizedImage" src/app/\[locale\]/\(site\)/contact/page.tsx`
Expected: aucune occurrence restante → retirer la ligne d'import.

- [ ] **Step 6 : Commit**

```bash
git add src/app/\[locale\]/\(site\)/contact/page.tsx
git commit -m "refactor(contact): page épurée (retire carte, bloc incident, photos, doublons tél/process)"
```

---

## Task 7 : `contact/page.module.css` (mise en page épurée)

**Files:**
- Modify: `src/app/[locale]/(site)/contact/page.module.css`

- [ ] **Step 1 : Supprimer les blocs CSS devenus morts**

Retirer les règles liées aux éléments supprimés : `.pageHeadMedia`, `.pageHeadImg`, `.heroCtas`, `.ctaPhone`, `.headAssure`, `.emergBlock`, `.gridBg`, `.ebPhoto*`, `.ebTop`, `.ebIc`, `.ebBadge`, `.ebTel`, `.ebNote`, `.processStrip`, `.pStep`, `.pIc`, `.pLbl`, `.pArrow`, `.mapCard`, `.mapCanvas`, `.base`, `.mapCompass`, `.mapPulse`, `.mapPin`, `.mapFoot`, `.addr`, `.linkMore`, `.coordPhoto*`, `.coordPrimary`, `.coordTag`.

- [ ] **Step 2 : Ajouter/adapter les styles du bloc coordonnées épuré**

S'assurer que `.contactGrid` reste en 2 colonnes desktop (form large, aside étroite) et 1 colonne mobile. Ajouter :
```css
.coordTitle { font-size: 1.15rem; margin: 0 0 1rem; }
.coord { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }
.coord li { display: flex; flex-direction: column; gap: 0.15rem; }
.coord .k {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-2, #4A5C55);
}
.coord a { color: var(--accent-strong, #059669); text-decoration: none; }
.coord a:hover { text-decoration: underline; }
.profiles { display: flex; gap: 1rem; margin-top: 1.25rem; }
.profiles a {
  display: inline-flex; align-items: center; min-height: 44px;
  color: var(--ink, #0C1A16); font-weight: 600; text-decoration: none;
}
.profiles a:hover { color: var(--accent-strong, #059669); }
```
Vérifier les noms de tokens réels dans `variables.css` et ajuster.

- [ ] **Step 3 : Vérifier l'absence de classe orpheline référencée**

Run: `grep -oE "cls\.[a-zA-Z]+" src/app/\[locale\]/\(site\)/contact/page.tsx | sort -u`
Puis vérifier que chacune existe dans `page.module.css`. Corriger toute classe manquante.

- [ ] **Step 4 : Commit**

```bash
git add src/app/\[locale\]/\(site\)/contact/page.module.css
git commit -m "refactor(contact): CSS épuré, retire carte/incident/process-strip/photos"
```

---

## Task 8 : Retrait du thème incident/SOC + i18n orphelines

**Files:**
- Modify: `src/components/layout/SiteFooter/SiteFooter.tsx:137`
- Delete: `src/components/layout/EmergencyBar/EmergencyBar.tsx`, `EmergencyBar.module.css`
- Modify: `src/components/layout/SiteHeader/SiteHeader.module.css` (bloc `.incident`)
- Modify: `messages/_ns/*.{fr,nl,en}.json` + `messages/{fr,nl,en}.json` (clés orphelines)

- [ ] **Step 1 : Retirer le lien incident du footer**

Dans `SiteFooter.tsx`, supprimer l'élément `<li>`/`<Link href="/contact#urgence">{t("footer.links.incident")}</Link>` (ligne ~137). Vérifier qu'aucune structure de liste n'est cassée.

- [ ] **Step 2 : Supprimer le composant mort EmergencyBar**

Run:
```bash
grep -rn "EmergencyBar" src/app src/components | grep -v "EmergencyBar/"
```
Expected: aucune référence (hors le dossier lui-même) → sûr à supprimer.
```bash
git rm src/components/layout/EmergencyBar/EmergencyBar.tsx src/components/layout/EmergencyBar/EmergencyBar.module.css
```

- [ ] **Step 3 : Retirer le CSS `.incident` orphelin du header**

Dans `SiteHeader.module.css`, supprimer les règles `.incident`, `.incident::before`, et leurs variantes `:root[data-theme="dark"] .incident*`. Vérifier au préalable que `.incident` n'est plus utilisé :
Run: `grep -rn "incident" src/components/layout/SiteHeader/SiteHeader.tsx`
Expected: aucune occurrence.

- [ ] **Step 4 : Retirer les clés i18n orphelines**

Supprimer, dans `_ns` ET compilé, FR/NL/EN :
- `common.emergency.*` (namespace de l'EmergencyBar mort)
- `common.footer.links.incident`
- `contact.side.incident*`, `contact.side.map*`, `contact.side.process*`, et les sous-clés `contact.side.coord*` qui ne sont plus référencées (garder uniquement `coordTitle`, `coordEmailK`, `coordPhoneK`, `coordZoneK`, `coordZoneV`, `coordHoursK`, `coordHoursV`, `aria`).
- `contact.hero.directPromise`, `contact.hero.ctaPrimary`, `contact.hero.assure1/2/3`, `contact.hero.imageAlt`, `contact.hero.crumbAria` si plus utilisées.

Méthode : pour chaque clé candidate, `grep -rn "cléSansPrefix" src/` ; si 0 référence, supprimer.

- [ ] **Step 5 : Valider JSON**

Run:
```bash
for f in messages/fr.json messages/nl.json messages/en.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo OK $f; done
```
Expected: `OK`.

- [ ] **Step 6 : Vérifier qu'aucune clé i18n supprimée n'est encore appelée**

Run:
```bash
grep -rnE "footer.links.incident|side\.(incident|map|process)|hero\.(directPromise|assure|ctaPrimary|imageAlt)" src/
```
Expected: aucune ligne.

- [ ] **Step 7 : Commit**

```bash
git add -A
git commit -m "chore(cleanup): retire le thème incident/SOC (footer, EmergencyBar mort, CSS + i18n orphelins)"
```

---

## Task 9 : Build, honnêteté, QA visuelle locale

**Files:** aucun (vérification)

- [ ] **Step 1 : Build complet**

Run:
```bash
SITE_URL=https://smidjan.be env -u DATABASE_URL -u POSTGRES_URL npm run build
```
Expected: build vert, toutes les routes générées, pas de nouvelle erreur (hors les 5 tsc pré-existantes du wizard).

- [ ] **Step 2 : Greps honnêteté (source)**

Run:
```bash
grep -rniE "Tests d'intrusion|diagnostic gratuit|Cybersécurité & GRC|PME wallonnes|expert en cyber|hotline|24/7" src/ messages/ | grep -v node_modules
```
Expected: aucune ligne (ou seulement des occurrences légitimes hors périmètre à évaluer une par une).

- [ ] **Step 3 : QA visuelle locale (Chrome headless + puppeteer-core)**

Avant capture, purger le cache image Next : `rm -rf .next/cache/images`. Lancer `npm run start` sur le build, puis capturer la home (bande recruteur + 4 cartes visibles) et `/contact` (épurée, sans carte/incident/photos), en thème clair et sombre. Vérifier visuellement : grille 2×2, bande recruteur lisible, contact sur une seule colonne coordonnées, pas de doublon téléphone.

- [ ] **Step 4 : Commit (si ajustements visuels)**

```bash
git add -A && git commit -m "fix(ui): ajustements visuels post-QA (home 4 cartes + bande recruteur, contact épurée)"
```
(Sauter si aucun ajustement.)

---

## Task 10 : Déploiement prod + smoke-test

**Files:** aucun

- [ ] **Step 1 : Point de contrôle propriétaire**

Présenter le rendu local (captures) au propriétaire et obtenir le feu vert explicite de déploiement.

- [ ] **Step 2 : Push + deploy**

```bash
git push origin refonte-home-portfolio
~/.local/bin/vercel deploy --prod --yes
```

- [ ] **Step 3 : Smoke-test prod (UA navigateur)**

Run:
```bash
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
for p in / /nl /en /contact /agence /services; do echo "$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" https://smidjan.be$p)  $p"; done
```
Expected: `200` partout.

- [ ] **Step 4 : Vérif honnêteté servie**

Run:
```bash
curl -s -A "$UA" https://smidjan.be | grep -oiE "Tests d'intrusion|diagnostic gratuit|Cybersécurité & GRC" | sort | uniq -c
curl -s -A "$UA" https://smidjan.be/contact | grep -oiE "incident en cours|office-team|support-desk" | sort | uniq -c
```
Expected: rien (chaînes éliminées en prod).

- [ ] **Step 5 : Mettre à jour la mémoire**

Mettre à jour `portfolio-pivot-live.md` : donnée structurée réécrite honnête (Person praticien + AZ-900 + TryHackMe), Capabilities 4 axes, bande recruteur, page contact refondue épurée, thème incident/SOC retiré.

---

## Self-Review (fait par l'auteur du plan)

- **Couverture spec** : 1a tagline → T1 ; 1b schema → T2 ; 2a Capabilities → T3 ; 2b whoami → T4 ; 2c bande recruteur → T5 ; 3a contact page → T6 ; 3c CSS contact → T7 ; 3b nettoyage incident/i18n → T8 ; 3d ContactForm intact (non touché, conforme) ; vérif/déploiement → T9/T10. Aucune section orpheline.
- **Placeholders** : aucun « TODO »/« TBD » ; le code des parties à risque (schema, RecruiterBand, i18n, contact JSX) est fourni verbatim. Les ajustements CSS invitent à lire les tokens réels de `variables.css` (repli `var(--x, #hex)` fourni pour ne jamais casser le rendu).
- **Cohérence des types/clés** : `capabilities.c1..c4`, `recruiter.*`, `side.coord*` réduits sont cohérents entre i18n (T3/T5/T8) et consommation JSX (T3/T5/T6). `personSchema`/`localBusinessSchema` gardent leurs noms d'export (consommés par `page.tsx` home, inchangé).
