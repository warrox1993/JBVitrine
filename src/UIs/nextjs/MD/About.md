```markdown
# SMIDJAN — INSTRUCTIONS POUR CODEX
**Rôle demandé** : Web designer senior.  
**Objectif** :  
1) Prendre la **Home** comme modèle de design (lecture seul).  
2) Créer une **nouvelle page `/about`** cohérente avec la Home.  
3) **Ajouter “About” au header** (et à la sidebar si elle existe) tout en gardant le même composant Header/Footer.
4) Faire pointer les CTAs “About” de la Home vers `/about`.  

---

## 0) Règles non négociables
- **Ne change pas la palette, les tokens, ni le style global.** Tu réutilises exactement les variables et utilitaires existants.
- **Un seul système de boutons** : mêmes variables, même animation que le bouton “Démarrer un projet” (copier l’animation et les transitions sur tous les boutons secondaires/tertiaires).
- **Header sticky + logo légèrement plus grand** (conforme aux dernières consignes) sans provoquer de layout shift.
- Respect strict des fondations existantes : grille, typographies, rayons, ombres, élévations, z-index de la progress bar inchangé (au-dessus de tout).
- SEO/Accessibilité : un seul `h1` par page, sémantique claire, liens focus visibles, `alt` utiles.

---

## 1) Contexte technique (Next.js – App Router supposé)
- **Ne déplace pas `layout.tsx`**. La page About doit **hériter du même layout** (header/footer globaux).
- **Arborescence cible** :
  - `src/app/about/page.tsx` — nouvelle page
  - `src/app/about/metadata.ts` — métadonnées dédiées (si le projet les sépare)
  - `src/components/about/*` — sous-composants About (découpage indiqué plus bas)
- **Styles** : réutiliser `globals.css` + tokens/utilitaires existants. Pas de nouveaux fichiers CSS globaux.  
  Si nécessaire, créer des **modules CSS locaux** (ou styled JSX) dans chaque composant About, mais uniquement avec des variables/tokens existants.

---

## 2) Navigation — Ajouter “About” proprement
1) **Header (navbar principale)**  
   - Vérifie s’il existe déjà un lien “About/À propos”.  
   - **Sinon, ajoute-le** dans l’ordre suivant : `Projets`, `Processus`, `Services`, `About`, `Contact`.  
   - Assure-toi que l’état “actif”/focus/hover du lien “About” **réutilise exactement** les styles des autres items (pas de style dérivé).
   - Si la **sidebar** existe, **ajoute “About”** à la même position relative et **corrige l’ordre** pour qu’il corresponde au corps de page (Home > Projets > Processus > Services > About > Contact).

2) **CTA Home → About**  
   - Dans la **Home**, ajoute (ou corrige) un **lien secondaire “En savoir plus sur nous”** pointant vers `/about`.  
   - Placement accepté : dans le Hero (bouton secondaire) **ou** juste sous le premier bloc de texte descriptif.  
   - Le style du bouton doit **reprendre l’animation** du bouton “Démarrer un projet”.

---

## 3) Page `/about` — Structure et contenu
La page About doit raconter une histoire cohérente avec l’identité “forge” de SMIDJAN, tout en restant factuelle et professionnelle.  
**Important** : le contenu ci-dessous est un **placeholder rédigé** pour que le client l’édite ensuite.

### 3.1. Sections About (ordre recommandé)
1) **Hero About**  
   - Un `h1` clair : “À propos de SMIDJAN”.  
   - Sous-titre concis (2–3 lignes max) qui cadre notre proposition de valeur.  
   - CTA primaire “Travaillons ensemble” → page Contact. CTA secondaire “Voir nos projets” → `/projets`.  
   - Fond, dégradés, et typographies **identiques à la Home**.

2) **Notre Mission**  
   - Texte court, dense, orienté résultats.  
   - Liste de 3 piliers (par ex. Rigueur, Clarté, Impact) avec de petites icônes si le design système les prévoit.

3) **Histoire (Timeline courte)**  
   - 3 à 5 étapes maximum, chacune avec **titre**, **année**, **2–3 lignes de description**.  
   - Exemple de contenu à modifier par le client :  
     - 2021 — Origines. “Née d’une idée simple : forger des produits digitaux qui allient élégance, robustesse et mesure.”  
     - 2022 — Premiers projets. “Design systems unifiés, code maintenable, premiers résultats mesurables chez des PME locales.”  
     - 2023 — Montée en gamme. “Standardisation des composants, accélération des performances, outillage IA pour l’audit.”  
     - 2024 — Méthode SMIDJAN. “Un process qui relie brand, UX, ingénierie et analytics, sans silos.”  
     - 2025 — Aujourd’hui. “Des livrables nets, traçables, optimisés Core Web Vitals, pensés pour durer.”

4) **Ce qui nous distingue**  
   - 3–4 cartes “différenciants” (ex. Design system real-life, Performance budgétée, Mesure des résultats, Transparence du code).  
   - Chaque carte : 1 titre, 1 phrase d’explication, un lien interne vers la section Processus ou Projets si pertinent.

5) **Méthode de travail (résumé du Processus)**  
   - 4 étapes avec titres courts (Découverte, Design System, Implémentation, Mesure & itérations).  
   - Lien “Lire le Processus complet” → `/processus`.

6) **Preuves (logos/temoignages)**  
   - Si un composant “témoignages” existe déjà, **réutilise-le** (même styles, avatars ronds, cadence animée ramenée à ~5 s entre items si tu animes ici).  
   - Sinon, simples citations courtes (2 lignes) avec nom + rôle.

7) **CTA final**  
   - Bloc clair, centré : “Discutons de votre vision” → `/contact`.  
   - Même composant de bouton qu’en Home (mêmes variables + animation).

### 3.2. Composants About à créer (réutilisables)
Créer les composants suivants, en respectant le style système et en évitant tout style ad hoc :

```

src/components/about/HeroAbout.tsx
src/components/about/Mission.tsx
src/components/about/Timeline.tsx
src/components/about/Differentiators.tsx
src/components/about/ProcessMini.tsx
src/components/about/Proof.tsx       // si réutilisation du composant "testimonial" existant : wrap minimal
src/components/about/CTA.tsx

````

> Tous ces composants doivent **uniquement** consommer les tokens/variables/util classes déjà présents.  
> Pas d’effets spéciaux nouveaux. Pas de `color-mix` non prévu. Pas de nouveaux dégradés. Pas de polices nouvelles.

### 3.3. Page `/about` — squelette recommandé

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next';
import HeroAbout from '@/components/about/HeroAbout';
import Mission from '@/components/about/Mission';
import Timeline from '@/components/about/Timeline';
import Differentiators from '@/components/about/Differentiators';
import ProcessMini from '@/components/about/ProcessMini';
import Proof from '@/components/about/Proof';
import CTA from '@/components/about/CTA';

export const metadata: Metadata = {
  title: 'À propos — SMIDJAN',
  description: 'Notre mission, notre méthode et ce qui nous distingue. Design exigeant, code durable, résultats mesurables.',
};

export default function AboutPage() {
  return (
    <main>
      <HeroAbout />
      <Mission />
      <Timeline />
      <Differentiators />
      <ProcessMini />
      <Proof />
      <CTA />
    </main>
  );
}
````

> `layout.tsx` ne change pas. Le header/footer restent partagés. Un seul `h1` dans `HeroAbout`.

---

## 4) Lien Home → About

* Dans la **Home**, ajouter un **CTA secondaire** (dans le Hero ou sous l’intro) :
  Libellé : “En savoir plus sur nous” → `/about`.
* Vérifier que tous les liens internes pointent bien vers `/about` (sans trailing slash non voulu) et qu’ils héritent de l’animation des boutons de la Home.

---

## 5) Accessibilité, SEO, Perf (checklist)

* `h1` unique par page, `h2` pour sections.
* Liens focus visibles, contraste AA conservé.
* `alt` textuels utiles sur toutes images décoratives/brand (ou `role="presentation"` si purement décoratives).
* `metadata` de la page About remplie (title/description).
* Poids des images About raisonnable, formats modernes si déjà en place (webp/avif).
* Lighthouse/Core Web Vitals : ne pas introduire de régression (LCP/CLS/INP).
* Pas de nouveau JavaScript global pour About. Priorité au SSR/SSG existant.

---

## 6) Tests d’acceptation

* La navigation affiche **About** dans le header (et la sidebar), avec l’état actif correct sur `/about`.
* Le bouton “En savoir plus sur nous” de la Home ouvre bien `/about`.
* Le header est sticky, le logo a la nouvelle taille prévue, **sans** décalage brutal du layout.
* Tous les boutons, y compris sur About, **partagent la même animation** que “Démarrer un projet”.
* Le style visuel de About **reprend exactement** les tokens/rythmes/espacements de la Home.
* Aucune régression de style sur la Home.

---

## 7) Travail à fournir (résumé des commits)

1. `feat(nav): add About link to header (+sidebar) with active state`
2. `feat(about): create /about page with sections and shared layout`
3. `feat(home): add secondary CTA linking to /about`
4. `chore(ui): unify button animation across site (reuse “Démarrer un projet”)`
5. `fix(header): sticky header + adjusted logo size without layout shift`
6. `test(a11y-seo): headings, metadata, alt, focus states verified`

---

## 8) Contenu temporaire (à éditer par le client)

Tu peux injecter ces textes par défaut, modifiables ensuite par le client.

* **Hero About — sous-titre** :
  “Nous forgeons des expériences digitales élégantes, scalables et mesurables. Même exigence, du pixel à la prod.”

* **Mission** :
  “Relier design système, ingénierie et mesure réelle des résultats. Clarifier, simplifier, optimiser.”

* **Timeline (extraits)** :
  “Née d’une exigence d’artisanat digital : faire simple, robuste, vérifiable.”
  “Méthode unifiée : brand, UX, code, analytics, sans silos.”

* **Différenciants** :
  “Design system concret.” “Performance budgétée.” “Résultats mesurables.” “Transparence du code.”

* **CTA final** :
  “Discutons de votre vision.”

---

## 9) Garde-fous

* Ne pas introduire de nouvelles dépendances.
* Ne pas renommer des dossiers racine.
* Ne pas dupliquer de styles. **Toujours factoriser via les tokens existants.**

```
```
```markdown
# SMIDJAN — PAGE ABOUT (.md POUR CODEX)
**Rôle exigé : web-designer senior / intégrateur Next.js confirmé**  
**Objectif :** créer la page `/about` avec un **contenu riche, narratif et verbeux**, tout en conservant la charte visuelle, la structure, la sidebar, et l’écosystème Next.js/CSS existants.  
**Important :** la Home reste inchangée (sauf ajout du lien “About” dans le header).  
**Framework :** Next.js (App Router) + CSS natif (pas de Tailwind).  
**Langue :** Français.  
**But :** raconter une histoire complète, dense et structurée pour le SEO.

---

## 0) Règles générales
- Réutiliser le **header** et le **footer** existants (aucun duplicat).
- La **sidebar** de la page About est propre à cette page : elle liste uniquement les ancres internes de la page.  
- **Aucun ajout dans la sidebar de la Home.**
- Tous les textes descriptifs doivent être **longs, fluides, narratifs et riches** — l’objectif est d’obtenir une page “storytelling premium”, à fort potentiel SEO.  
- Aucun raccourci : les descriptions doivent être **développées, argumentées et cohérentes**, sans phrases creuses.

---

## 1) Structure technique
Créer la page :  
`src/app/about/page.tsx`

Créer les composants suivants (sous le dossier `src/components/about/`) :
```

HeroAbout.tsx
Mission.tsx
Story.tsx
Values.tsx
Team.tsx
ProcessMini.tsx
Proof.tsx
FAQ.tsx
CTA.tsx

```

Chaque composant doit avoir un **contenu textuel riche**, balisé avec des `section`, `h2`, `p`, `ul/li` si pertinent.  
Pas de contenu “sec” : tout texte doit être développé avec un ton humain, professionnel et narratif.

---

## 2) Sidebar (pour About uniquement)
**But :** naviguer dans la page sans recharger.  
**IDs des sections :**
```

#about-hero
#mission
#story
#values
#team
#process-mini
#proof
#faq
#cta

```
Conserver le **design exact** de la sidebar Home (spacing, survol, sticky, z-index, animation).  
Adapter les titres visibles :  
- Hero  
- Mission  
- Histoire  
- Valeurs  
- Équipe  
- Méthode  
- Preuves  
- FAQ  
- Contact

---

## 3) Contenu détaillé par section

### 3.1 HERO — `#about-hero`
**Structure :**
- `<h1>` : “À propos de SMIDJAN”
- Sous-titre (verbeux) :
  > “Nous forgeons des expériences digitales élégantes, scalables et mesurables.  
  > Chaque interface, chaque ligne de code, chaque décision de design vise à produire un effet durable.  
  > Notre approche repose sur la conviction que l’élégance n’a de valeur que lorsqu’elle se traduit par des résultats concrets, mesurables, et humains.”

- Boutons :  
  - CTA primaire → `/contact` (“Discutons de votre vision”)  
  - CTA secondaire → `/projets` (“Voir nos projets”)

**Style :** fond identique à la Home, texte centré, responsive, H1 unique.  
**SEO :** Title “À propos — SMIDJAN”, meta description verbeuse (150–160 caractères minimum).

---

### 3.2 MISSION — `#mission`
**But :** exprimer la raison d’être de SMIDJAN.  
**Texte verbeux :**
> “SMIDJAN est née d’une idée simple : la technologie n’est pas un but, c’est un matériau.  
> Comme une forge, nous transformons ce matériau brut — le code, les données, les interfaces — en expériences utiles, élégantes et durables.  
> Notre mission est de relier la rigueur technique à la sensibilité artistique, pour créer des produits numériques qui inspirent confiance, fluidité et impact.  
> Nous croyons à un numérique qui respire, mesurable et conscient de son empreinte.”

**3 piliers :**
1. **Rigueur** — “Chaque projet est documenté, testé, mesuré. Pas de place pour l’approximation.”  
2. **Clarté** — “Nous concevons des systèmes où chaque décision a une trace. Les utilisateurs ne se perdent jamais, ni dans le code, ni dans l’expérience.”  
3. **Impact** — “Nous mesurons nos succès non en livrables, mais en résultats tangibles : performance, engagement, visibilité, conversion.”

---

### 3.3 HISTOIRE — `#story`
**But :** raconter l’évolution comme une chronologie immersive.  
**Format :** timeline 2021–2025.  
**Texte verbeux :**
- **2021 — Origines.**  
  “Au départ, SMIDJAN était un atelier de passionnés, obsédés par le détail. Nous voulions réconcilier deux mondes : la beauté du design et la rigueur de l’ingénierie. C’est dans une petite pièce, autour d’un café et de beaucoup de post-its, que la première ligne de code a été écrite.”
- **2022 — Premiers projets.**  
  “Les premières collaborations ont posé les fondations de notre méthode : écrire du code clair, documenté, auditable. Chaque pixel devait répondre à une raison, chaque animation à une intention.”
- **2023 — La méthode.**  
  “Nous avons systématisé notre approche : un design system, des tokens, des composants réutilisables. Notre obsession : la cohérence. L’année 2023 fut celle de la formalisation — transformer l’artisanat en méthode.”
- **2024 — L’expansion.**  
  “Nous avons travaillé sur des plateformes plus complexes, intégrant l’intelligence artificielle, les analytics, et l’automatisation des tests. SMIDJAN est devenu un label d’exigence pour ceux qui veulent un web durable.”
- **2025 — Aujourd’hui.**  
  “Nous forgeons des produits qui conjuguent design et vérité. Des expériences honnêtes, rapides, mesurables, pensées pour durer au-delà des modes.”

---

### 3.4 VALEURS — `#values`
**But :** démontrer les principes de travail, avec profondeur et cohérence.
**Texte verbeux :**
> “Nos valeurs ne sont pas décoratives. Elles sont inscrites dans notre code, dans nos outils, dans nos process.  
> Chaque projet est un dialogue entre l’intention du client et notre exigence de clarté. Voici ce qui guide notre forge :”

**4 cartes :**
1. **Design system vécu.**  
   “Chaque projet repose sur des composants unifiés, versionnés, testés. Nous construisons des fondations avant de bâtir des façades.”  
2. **Performance budgétée.**  
   “Avant d’écrire la première ligne, nous définissons un budget de performance : LCP, CLS, INP. Nos choix ne sont jamais arbitraires.”  
3. **Transparence du code.**  
   “Pas de magie noire. Le code est lisible, expliqué, documenté. Le client possède tout, comprend tout.”  
4. **Mesure réelle.**  
   “Chaque produit livré embarque des métriques : comportement utilisateur, engagement, conversion. Pas de storytelling sans données.”

Lien interne : `/processus`

---

### 3.5 ÉQUIPE — `#team`
**But :** humaniser et donner du crédit.
**Texte verbeux :**
> “Derrière SMIDJAN, il n’y a pas une armée anonyme de freelances, mais une équipe resserrée de créateurs, développeurs et designers.  
> Nous travaillons dans un esprit de recherche appliquée : observer, tester, ajuster.  
> Nous aimons les discussions qui creusent, les prototypes qui cassent, et les idées qui tiennent dans le temps.”

Cartes :  
- Nom (placeholder)  
- Rôle (Designer, Ingénieur, Product Builder, etc.)  
- Texte long (2–3 phrases sur sa philosophie de travail).  
Option : “Réseau d’experts associés” (si sous-traitance ou collaboration).

---

### 3.6 MÉTHODE — `#process-mini`
**But :** teaser la page “Processus” en condensé clair.
**Texte verbeux :**
> “Notre méthode n’est pas un secret, c’est une discipline.  
> Nous la partageons avec nos clients parce qu’elle garantit la qualité, la prédictibilité et la performance.”

4 étapes :
1. **Découverte.** “Nous commençons par comprendre le vrai besoin, pas la demande initiale. Audit, interviews, objectifs.”  
2. **Design System.** “Nous définissons les tokens, les couleurs, les typographies, les composants, et leur documentation.”  
3. **Implémentation.** “Chaque ligne de code respecte les standards du projet, du naming convention jusqu’à la CI/CD.”  
4. **Mesure & itération.** “Les produits évoluent. Nous mesurons, analysons, corrigeons, itérons.”

Lien → `/processus`

---

### 3.7 PREUVES — `#proof`
**But :** rassurer, inspirer confiance.
**Contenu verbeux :**
> “Nos clients ne cherchent pas des effets visuels, mais des effets mesurables.  
> Chaque collaboration est une co-construction. Nous avons conçu des plateformes capables de supporter des milliers de visiteurs, des dashboards précis, des interfaces accessibles.  
> Nous mesurons les résultats, nous documentons les processus, nous partageons les leçons.”

Éléments :  
- Témoignages courts (nom + rôle + 2 phrases).  
- Logos clients.  
- Statistiques réalistes : LCP moyen, gains SEO, temps de chargement moyen, taux de conversion.

---

### 3.8 FAQ — `#faq`
**But :** lever les objections.
**Texte verbeux :**
> “Avant de nous contacter, nos clients se posent souvent les mêmes questions. Nous préférons y répondre en toute transparence, dès maintenant.”

Exemples :
- **Comment démarre un projet ?**  
  “Par un atelier de 90 minutes, où l’on cartographie vos objectifs, vos cibles et vos contraintes. De là naît un plan clair et mesurable.”  
- **Quels sont vos délais moyens ?**  
  “Une vitrine premium : 3 à 6 semaines. Un produit sur mesure : sprint de 2 semaines, avec livrables itératifs.”  
- **Qui rédige le contenu ?**  
  “Nous structurons, vous écrivez, ou inversement. L’important, c’est que le message soit vrai et lisible.”  
- **Comment gérez-vous la maintenance ?**  
  “Nos projets incluent un plan d’entretien : mises à jour, audit, monitoring, support prioritaire.”  
- **Qui détient le code ?**  
  “Toujours vous. Tout est documenté, versionné, transféré en fin de mission.”

---

### 3.9 CTA FINAL — `#cta`
**But :** conclure sur une intention d’action.
**Texte verbeux :**
> “Vous avez une vision, un produit, une envie de transformer l’expérience de vos clients ?  
> Nous avons les outils, la méthode et la passion pour en faire une réalité mesurable.  
> Parlons-en, sans engagement, et dessinons ensemble les contours de votre futur digital.”

Boutons :  
- CTA primaire → `/contact` (“Discutons de votre vision”)  
- CTA secondaire → `/projets` (“Voir nos projets”)

---

## 4) SEO et accessibilité
- Title : “À propos — SMIDJAN”  
- Description : 160 caractères minimum, riche en termes “design system”, “expériences digitales”, “performance web”, “Next.js”.  
- Canonical : `/about`  
- JSON-LD Breadcrumb : Home → About  
- H1 unique, hiérarchie H2/H3 propre  
- `next/image` avec tailles précises  
- Texte alternatif descriptif sur les images  
- Aucune régression sur LCP/CLS/INP  
- Liens focus visibles et contrastés  
- Liens internes (About → Processus, Projets, Contact)

---

## 5) Commits attendus
1. `feat(nav): add About link to header`
2. `feat(about): create /about page with verbose sections`
3. `feat(about): add sidebar navigation`
4. `feat(home): add CTA linking to /about`
5. `seo(about): add metadata, canonical, breadcrumb`
6. `content(about): add verbose text placeholders`
7. `perf: ensure CLS/LCP parity with home`

---

## 6) Résultat attendu
- Une page About longue, lisible, immersive, et SEO-friendly.  
- Des textes riches, structurés, argumentés, **jamais simplistes ni courts**.  
- Une expérience homogène avec la Home, mais plus narrative, introspective et explicative.

```

```
```
````markdown
# SMIDJAN — ADAPTATION DE LA SIDEBAR POUR LA PAGE `/about` (POST-CRÉATION)

**Contexte**  
La page `/about` est **déjà créée** et en production interne.  
Objectif de cette tâche : **adapter la sidebar** pour qu’elle reflète **uniquement** le contenu réel de `/about`, **dans le bon ordre**, avec le **même design** et les **mêmes comportements** que la sidebar de la Home (qui, elle, reste strictement intra-page Home).

---

## 1) Portée (scope)
- **À faire** : brancher la sidebar à **l’outline réel** de `/about` (ancres), conserver **design/animations** existants, activer **highlight actif** selon la section visible.
- **À ne pas faire** : ne **rien changer** à la sidebar de la **Home** ; ne pas introduire de nouveaux styles globaux ; ne pas modifier la charte.

---

## 2) Ordre officiel des sections `/about` (source de vérité)
Cet ordre **doit** être répliqué **tel quel** dans la sidebar `/about` :

| Ordre | Section | ID utilisé | Libellé sidebar |
|---:|---|---|---|
| 1 | Hero | `#about-hero` | Introduction |
| 2 | Mission | `#mission` | Mission |
| 3 | Histoire | `#story` | Notre histoire |
| 4 | Valeurs | `#values` | Valeurs |
| 5 | Équipe | `#team` | Équipe |
| 6 | Méthode (résumé) | `#process-mini` | Notre méthode |
| 7 | Preuves / Témoignages | `#proof` | Preuves |
| 8 | FAQ | `#faq` | FAQ |
| 9 | CTA final | `#cta` | Contact |

> Remarque : ces IDs existent déjà dans la page. **Ne pas** les renommer.

---

## 3) Alimentation de la sidebar — route-aware (Next.js App Router)
**But** : réutiliser le composant visuel de sidebar existant, en l’alimentant dynamiquement selon la route.

### 3.1. Source de données (About uniquement)
Créer un petit mapping **local** (pas global) dans la couche UI de la sidebar (ou dans un provider existant) :

```ts
// aboutSidebar.items.ts
export const aboutSidebarItems = [
  { href: '#about-hero',  label: 'Introduction' },
  { href: '#mission',     label: 'Mission' },
  { href: '#story',       label: 'Notre histoire' },
  { href: '#values',      label: 'Valeurs' },
  { href: '#team',        label: 'Équipe' },
  { href: '#process-mini',label: 'Notre méthode' },
  { href: '#proof',       label: 'Preuves' },
  { href: '#faq',         label: 'FAQ' },
  { href: '#cta',         label: 'Contact' }
];
````

### 3.2. Injection conditionnelle par route

Dans le wrapper de la sidebar (ou directement dans la page `/about`), utiliser `usePathname()` pour injecter **uniquement** ces items quand la route commence par `/about` :

```tsx
// SidebarRouterBridge.tsx (existant ou nouveau composant léger)
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar'; // composant visuel existant
import { aboutSidebarItems } from './aboutSidebar.items';

export default function SidebarRouterBridge() {
  const pathname = usePathname();

  // Home conserve sa logique intra-page originelle
  if (pathname === '/' || pathname?.startsWith('/#')) {
    return <Sidebar />; // inchangé
  }

  // About : injecter l'ordre et les labels ci-dessus
  if (pathname?.startsWith('/about')) {
    return <Sidebar items={aboutSidebarItems} />;
  }

  // Autres pages : soit pas de sidebar, soit logique existante
  return null;
}
```

> **Important** : `Sidebar` doit accepter une prop `items?: { href: string; label: string }[]`.
> Si cette prop est absente, la sidebar garde son mode **Home** (intra-page Home).

---

## 4) Comportements à respecter (parité UX avec la Home)

* **Design identique** : spacing, typographie, hover/focus/active, arrondis, ombres, transitions. **Aucun** nouveau style global.
* **Sticky** : même position sticky qu’en Home. Aucun **layout shift** à l’apparition.
* **Smooth scroll** : scroll doux vers l’ancre ; **offset** corrigé pour le header sticky (si déjà géré en Home, réutiliser la même utilité).
* **Highlight actif** : l’item de la section visible passe en “actif” via IntersectionObserver (réutiliser l’implémentation Home si elle existe).
* **Pas de “push” du contenu** : l’ouverture/hover de la sidebar **ne** doit pas déplacer brutalement le main content.
* **Accessibilité** : focus state visible, ordre logique de tabulation, liens descriptifs.

---

## 5) Marqueurs HTML (déjà présents)

Vérifier que les sections `/about` disposent bien des IDs listés. Exemple (existant) :

```tsx
<main id="about-hero">
  <section id="mission">...</section>
  <section id="story">...</section>
  <section id="values">...</section>
  <section id="team">...</section>
  <section id="process-mini">...</section>
  <section id="proof">...</section>
  <section id="faq">...</section>
  <section id="cta">...</section>
</main>
```

> Si un `id` manque, **l’ajouter** sans modifier les styles.

---

## 6) Tests d’acceptation

* La sidebar **n’apparaît** sur `/about` **qu’avec** les éléments et l’ordre définis au §2.
* Le **highlight actif** suit correctement la section visible au scroll (seuil d’intersection identique à la Home).
* Les ancres scrollent **en douceur** avec un offset correct sous le header sticky.
* Aucun **layout shift** à l’ouverture, au hover ou à la mise en sticky.
* **Home** : sidebar strictement **inchangée** (intra-page Home uniquement).
* **Aucune régression visuelle** : tokens, couleurs, animations, z-index conservés.

---

## 7) Journal de commits attendu

1. `feat(about): wire sidebar to about anchors with correct order`
2. `refactor(sidebar): accept items prop for route-driven content`
3. `fix(a11y): ensure focus states & smooth-scroll offset under sticky header`
4. `test(about-sidebar): active highlight via IntersectionObserver parity with home`

---

## 8) Garde-fous

* **Pas** de nouvelles dépendances NPM.
* **Pas** de styles globaux supplémentaires ; factoriser via utilitaires/tokens existants.
* **Pas** de modification du comportement Home.
* **Pas** de duplication de composants : on **réutilise** la sidebar, on **alimente** différemment.

```
```
```markdown
# SMIDJAN — AUDIT DE COHÉRENCE VISUELLE ENTRE HOME ET ABOUT (.md POUR CODEX)

**Contexte**  
La page `/about` est maintenant totalement fonctionnelle et sa sidebar est adaptée à son propre contenu.  
Cette étape vise à **vérifier la cohérence visuelle complète entre la Home et la page About**, en s’assurant qu’il n’y a **aucune duplication de design, de CSS ou de composants**, sauf pour le **contenu textuel et la logique interne de la sidebar**.

---

## 1) Objectif de l’audit

Garantir que :
- Le **design système** (tokens, couleurs, typographie, ombres, rayons, animations, espacements, etc.) est **identique** entre Home et About.  
- Les **composants visuels** (header, footer, boutons, cartes, sections, grid, sidebar) utilisent **les mêmes sources** (mêmes classes, mêmes variables CSS, mêmes composants React).  
- Seules les **données** et les **ancres** changent entre les deux pages.  
- Aucune **duplication de styles ou de fichiers CSS** n’a été introduite pour la page About.

---

## 2) Checklist de vérification — Composants globaux

### 2.1. Header
- [ ] Même composant (`Header.tsx`) partagé entre Home et About.  
- [ ] Les variables CSS globales (espacements, hauteur, sticky behavior, background, z-index) sont identiques.  
- [ ] Aucun style `.header-about` ou `.header-home` spécifique n’existe.  
- [ ] Le logo, la typographie et le comportement sticky ne varient pas.  

### 2.2. Footer
- [ ] Le composant Footer est strictement le même fichier importé.  
- [ ] Les paddings, couleurs, espacements, et alignements sont identiques.  
- [ ] Pas de CSS localisé ou dupliqué pour le footer de la page About.

### 2.3. Boutons
- [ ] Tous les boutons (CTA primaire, secondaire, liens d’action) utilisent **exactement** le même composant de base.  
- [ ] Même animation que “Démarrer un projet”.  
- [ ] Pas de variation locale type `.about-btn` ou `.alt-btn`.  
- [ ] Variables CSS : `--color-accent`, `--transition-fast`, `--radius-md`, etc., sont réutilisées telles quelles.  

---

## 3) Checklist de vérification — Structure CSS et tokens

### 3.1. Fichiers CSS
- [ ] `globals.css` reste la source unique des styles globaux.  
- [ ] Aucun nouveau fichier CSS global ajouté dans `/about`.  
- [ ] Si des modules CSS sont présents, ils n’introduisent que des **layouts internes**, pas des tokens visuels.  
- [ ] Aucun `color-mix()` ni variable redéfinie localement.  

### 3.2. Variables et tokens
- [ ] Tous les `var(--*)` utilisés dans `/about` pointent vers des définitions déjà présentes dans `globals.css`.  
- [ ] Les espacements `clamp()` sont identiques (mêmes ratios min/max).  
- [ ] La typographie est partagée (mêmes variables `--font-body`, `--font-heading`).  
- [ ] Les ombres, rayons et transitions sont identiques aux composants Home.  

### 3.3. Classes réutilisées
- [ ] Les classes utilitaires (`.container`, `.grid`, `.card`, `.text-muted`, etc.) proviennent de la même source.  
- [ ] Pas de doublon CSS sous d’autres noms (`.about-card`, `.about-hero`, etc.) sauf pour des besoins d’ID d’ancrage.  
- [ ] Vérifier qu’aucun style n’est recopié d’un fichier Home dans `/about`.

---

## 4) Checklist de vérification — Sidebar spécifique

### 4.1. Design et comportement
- [ ] Même composant visuel de base (pas de duplicat).  
- [ ] Même transition d’apparition, hover, focus, et comportement sticky.  
- [ ] Les tokens (`--color-bg-2`, `--color-border`, `--transition-fast`, etc.) sont identiques.  
- [ ] Les espacements verticaux entre liens sont les mêmes (mêmes marges/paddings).  
- [ ] Le changement d’état “actif” utilise la même logique que la Home (IntersectionObserver partagé).

### 4.2. Différences autorisées
- [x] Les **libellés et ancres** changent (About a ses propres sections).  
- [x] Le **contenu textuel** est spécifique à About.  
- [x] Le **fichier source de configuration** (`aboutSidebar.items.ts`) est unique à About, mais n’introduit pas de nouveaux styles.

---

## 5) Checklist de vérification — Structure DOM et accessibilité

### 5.1. Structure HTML
- [ ] Les sections (`<section>`) utilisent la même hiérarchie H2/H3 qu’en Home.  
- [ ] Le `<main>` conserve la même structure de conteneur (mêmes classes et layout).  
- [ ] Aucun wrapper additionnel non présent dans la Home.  
- [ ] Les IDs (`#mission`, `#story`, etc.) sont uniques et ne génèrent pas de conflits avec ceux de la Home.

### 5.2. Accessibilité et cohérence UX
- [ ] Focus visible et cohérent sur tous les liens et boutons.  
- [ ] Ordre logique du DOM et de la tabulation conservé.  
- [ ] Même contrastes et états ARIA sur les sections visibles.  

---

## 6) Vérifications visuelles et fonctionnelles automatisables

1. **Diff CSS auditée** :  
   - Comparer les feuilles Home et About (`devtools > coverage > CSS`) → aucune règle nouvelle ne doit apparaître sauf celles liées au contenu narratif (long-text layout).
2. **Test Lighthouse / Core Web Vitals** :  
   - LCP, CLS, INP About ≈ Home ±10 %.  
   - Accessibilité ≥ 95 %.  
   - SEO ≥ 95 %.
3. **Visual regression test (optionnel)** :  
   - Screenshot Home vs About : vérifier alignement, marges, ratios, cohérence typographique.  
   - Aucun désalignement structurel.

---

## 7) Journal de commits attendu
1) `test(audit): verify visual parity between Home and About`
2) `refactor(about): remove any duplicated CSS or layout class`
3) `chore(ui): ensure tokens consistency across pages`
4) `qa(sidebar): confirm identical hover/focus/active behavior`

---

## 8) Résultat attendu
- La page About respecte **pixel par pixel** la cohérence visuelle de la Home.  
- Tous les styles proviennent des mêmes fichiers, sans duplication.  
- Seules les différences textuelles et structurelles internes sont tolérées.  
- La sidebar About s’intègre naturellement dans le design global, sans rupture esthétique ni logique.

```

```
```
