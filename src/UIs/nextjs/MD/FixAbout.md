Parfait — tu veux que la page **About** atteigne le même niveau de tension visuelle, de rythme typographique et de densité narrative que ta **Home** (celle avec le “Exceptional Design, Flawless Code, Measurable Results”).

Autrement dit, on ne va pas juste “rajouter du texte” : on va **repenser la composition** pour que l’About devienne une page signature — la vitrine du ton SMIDJAN.
Voici le plan complet du `.md` que Codex devra suivre pour la **refonte approfondie**.

---

```markdown
# SMIDJAN — PAGE ABOUT (REFONTE VISUELLE ET NARRATIVE)
**Rôle exigé : web-designer senior / intégrateur Next.js confirmé**  
**Objectif :** réélever la page `/about` pour qu’elle s’aligne sur la tension visuelle, la hiérarchie typographique et la densité narrative de la **Home**.  
**Contrainte :** conserver le design system existant (tokens, couleurs, typographies, animations).  
**Langue :** Français.  
**Ton :** technique, inspirant, mesuré — aligné sur la philosophie “forge artisanale du digital durable”.

---

## 0) Objectifs de la refonte
- Créer une **identité visuelle aussi forte que la Home** (rythme typographique, dégradés, contrastes, espaces).
- Accentuer la **verticalité narrative** : on doit sentir une montée en intensité.  
- Éviter la symétrie fade : chaque section doit respirer, mais pas s’éparpiller.  
- Ajouter **3 nouveaux niveaux visuels** : texture, micro-animation, hiérarchie.  
- Le texte doit devenir **une pièce éditoriale**, pas une fiche de présentation.

---

## 1) Composants à retravailler ou créer
Conserver la structure technique existante mais améliorer :
```

HeroAbout.tsx
Mission.tsx
Story.tsx
Values.tsx
Team.tsx
ProcessMini.tsx
Proof.tsx
CTA.tsx

```

Ajouts recommandés :
```

IntroSignature.tsx        // phrase manifeste courte avant Mission
ParallaxBackground.tsx    // fond subtil basé sur le dégradé de la Home
SplitVisual.tsx           // composition moitié texte, moitié visuel abstrait (forge, feu, métal)

````

---

## 2) Structure visuelle globale

### Palette & contrastes :
- Garder le dégradé brun/orange comme fond principal (`var(--color-bg-hero)`), mais augmenter la profondeur :
  - ajouter un léger **overlay radial** brun chaud (comme sur la Home),
  - insérer un **grain de texture discret** (bruit fin, opacité 4–6 %).  

### Typographie :
- Titre principal (`h1`) : même taille et graisse que “Exceptional Design…” (Home).  
- Sous-titres (`h2`) : graissage identique mais avec espacement vertical plus ample (clamp(1.5rem, 3vw, 3rem)).  
- Texte long (`p`) : largeur max 70ch, interlignage légèrement augmenté (1.6 → 1.7).

### Espacements :
- Sections : `padding-block: clamp(6rem, 10vw, 12rem);`
- Utiliser des **clamp** dynamiques pour garder le rythme fluide sur mobile et desktop.  

---

## 3) Nouveau déroulé narratif (ordre final)

| Ordre | Section | Description |
|:--:|:--|:--|
| 1 | Hero | Nouveau visuel + manifeste visuel fort |
| 2 | IntroSignature | Une phrase manifeste sous le hero |
| 3 | Mission | Texte renforcé, plus immersif |
| 4 | Story | Histoire chronologique plus cinématique |
| 5 | Values | Cartes revisitées, contrastées, effet hover |
| 6 | Team | Portraits stylisés, ton plus humain |
| 7 | ProcessMini | Raccourci animé du process |
| 8 | Proof | Témoignages ou chiffres clés |
| 9 | CTA | Fermeture visuelle et appel à discussion |

---

## 4) Détails de sections refondues

### 4.1 HERO — `#about-hero`
**But :** aligner visuellement avec la Home.

**Structure JSX :**
```tsx
<section id="about-hero" className="section hero dark-gradient">
  <h1>À propos de <span className="accent">SMIDJAN</span></h1>
  <p className="lead">
    Nous forgeons des expériences digitales élégantes, scalables et mesurables.
    Chaque interface, chaque ligne de code, chaque décision de design vise à produire un effet durable.
  </p>
  <div className="cta-group">
    <Link href="/contact" className="btn-primary">Discutons de votre vision</Link>
    <Link href="/projets" className="btn-secondary">Voir nos projets</Link>
  </div>
</section>
````

**Améliorations visuelles :**

* Même dégradé que la Home (`linear-gradient(180deg, #2a1c0d, #20160a)` + grain fin).
* Ajouter une **lumière directionnelle** subtile depuis le coin supérieur gauche.
* Animation douce à l’entrée (fade + slide 40px).
* Boutons : mêmes transitions, même radius, même survol lumineux.

---

### 4.2 INTROSIGNATURE — `#intro-signature`

**But :** donner un souffle éditorial.

> “Nous ne créons pas pour impressionner.
> Nous forgeons pour durer — dans la forme, dans la mesure, dans la mémoire des utilisateurs.”

Style : centrée, italique, opacité légère, police secondaire si disponible.
Composant léger, placé juste sous le Hero.

---

### 4.3 MISSION — `#mission`

**Texte revisité :**

> “SMIDJAN est un atelier numérique.
> Nous croyons qu’un produit digital doit être aussi robuste qu’élégant.
> Nous mêlons rigueur technique, exigence esthétique et obsession de la mesure.
> Chaque projet est une œuvre fonctionnelle : pensée, testée, documentée, et maintenable.”

Structure :

* 3 blocs latéraux (Rigueur / Clarté / Impact)
* Icônes identiques à celles des valeurs de la Home.
* Hover : légère translation + ombre chaude (comme les cartes de la section “Results”).

---

### 4.4 STORY — `#story`

**Refonte :**

* Format **timeline horizontale** sur desktop, verticale sur mobile.
* Ajouter de petites images abstraites (formes forgées, métal, feu).
* Fond alterné clair/sombre (comme les alternances visuelles de la Home).

Texte plus immersif :

> “2021 — Le feu. Une idée simple : réconcilier esthétique et robustesse.
> 2022 — L’atelier. Les premiers projets forgent notre méthode.
> 2023 — La rigueur. Chaque livrable devient mesurable.
> 2024 — L’extension. L’IA s’invite dans nos outils.
> 2025 — L’impact. Nous codons pour durer, pas pour briller.”

---

### 4.5 VALUES — `#values`

* 4 cartes avec titres courts : “Design mesurable”, “Code durable”, “Performance budgétée”, “Transparence totale”.
* Effet hover : gradient chaud, texte blanc, légère translation verticale.
* Uniformiser avec la section “Results” de la Home (même grid et bordure fine).

---

### 4.6 TEAM — `#team`

**But :** donner un visage humain à la marque.

* 3 portraits fictifs (ou placeholders) dans un layout responsive.
* Style : photos en tons chauds désaturés, légères ombres intérieures.
* Texte : 1 paragraphe sur la philosophie de collaboration (pas la biographie).

---

### 4.7 PROCESSMINI — `#process-mini`

Réutiliser le design des “étapes” de la page Services, avec icônes et timeline fluide.

* Titre : “Notre méthode en quatre étapes”.
* Steps : Cadrage → Design System → Développement → Mesure & Itération.
* Animation d’apparition progressive au scroll.

---

### 4.8 PROOF — `#proof`

* Si pas de clients réels, afficher 3 “engagements mesurables” :

    * “> 95 % de performances Core Web Vitals vertes”
    * “100 % de code documenté avant livraison”
    * “0 dette technique non traitée à la fin d’un sprint”
* Style : cartes sombres avec typographie large (comme “Results” sur la Home).

---

### 4.9 CTA FINAL — `#cta`

Texte plus fort :

> “Vous avez une vision, nous avons la forge.
> Ensemble, transformons vos ambitions en architectures digitales durables.”

Boutons :

* CTA primaire → `/contact` (“Discutons de votre projet”)
* CTA secondaire → `/services` (“Découvrir nos services”)

---

## 5) SEO & performance

* Title : “À propos — SMIDJAN”
* Description : “SMIDJAN forge des expériences digitales élégantes, scalables et mesurables.”
* Canonical : `/about`
* OG : même image que la Home (contraste brun/orange).
* 1 seul `<h1>` ; hiérarchie logique.
* Lighthouse SEO ≥ 95 %, LCP < 2,5s, CLS < 0,05.

---

## 6) Tests visuels

* Alignement parfait entre Home et About : mêmes marges, même typographie, mêmes boutons.
* Espacements verticaux homogènes (`clamp(6rem, 8vw, 10rem)`).
* Aucune duplication CSS.
* Animation d’entrée douce sur chaque section.
* Responsive vérifié sur 320px → 1440px.

---

## 7) Commits attendus

1. `refactor(about): rebuild hero to match home visual intensity`
2. `feat(about): add intro-signature and parallax background`
3. `ui(about): rework story, values, and proof with dynamic grid`
4. `perf(about): ensure smooth scroll and consistent LCP`
5. `seo(about): update meta and OG`
6. `test(a11y): validate focus, headings, contrast`

---

## 8) Résultat attendu

* Une page About **aussi charismatique que la Home**, fluide et narrative.
* Même tension typographique, même hiérarchie visuelle.
* Une expérience “storytelling premium” : lisible, immersive et sans surcharge.
* Base stable pour extrapoler ensuite vers Services et Processus.

---

```

---

Avec ce plan détaillé, Codex pourra procéder à une refonte complète de la page About, en respectant les contraintes techniques tout en élevant l’expérience utilisateur et visuelle au niveau de la Home.``



````markdown
# SMIDJAN — ABOUT_SIDEBAR_ICONS.md (ANALYSE & ALIGNEMENT SUR LA HOME)
**Contexte :** La page `/about` est créée et sa sidebar fonctionne.  
**Problème :** la **sidebar About n’utilise pas les icônes** comme celle de la **Home**.  
**Objectif :** analyser la sidebar de la Home et **répliquer le même système d’icônes** sur About, **sans dépendance nouvelle**, en **réutilisant les tokens** et en **adaptant chaque icône au libellé**.

---

## 0) Règles inviolables
- **Aucune nouvelle librairie** d’icônes. On **réutilise** le mécanisme déjà en place sur la Home (composant `Icon` ou SVG inline).
- **Aucune duplication** de styles : mêmes classes, mêmes tokens (`--color-*`, `--space-*`, `--radius-*`, `--transition-*`).
- **Accessibilité** : chaque lien a un libellé textuel lisible. Les icônes sont décoratives (`aria-hidden="true"`) ou ont un `title`/`aria-label` explicite selon la convention Home.
- **Parité visuelle** : mêmes tailles, épaisseurs de trait, couleurs (idle/hover/active) et animations que sur la Home.
- **Responsive & sticky** strictement identiques à la Home. Z-index et offset scroll non modifiés.

---

## 1) Analyse de la sidebar Home (source de vérité)
À faire dans le code :
1. Localiser le composant **Sidebar Home** (exemples probables) :
   - `src/components/layout/Sidebar.tsx`
   - `src/components/layout/sidebar/SidebarItem.tsx`
   - `src/components/icons/*` (si un répertoire d’icônes existe).
2. Relever précisément :
   - **API d’un item** (props actuelles) : `{ href: string; label: string; icon?: ReactNode; active?: boolean }`.
   - **Système d’icônes** : composant `Icon` générique, mapping vers des SVG, ou inline SVG.
   - **Taille & style** : largeur/hauteur (ex. `1.25rem`), `stroke-width`, `fill:none`/`currentColor`, marges (gap).
   - **États** : idle/hover/active/focus (couleurs, opacités, scale, rotation éventuelle).
   - **Logiciel actif** : IntersectionObserver (seuil, rootMargin) qui applique `.is-active`.

> Résultat attendu : une **fiche technique** de 10–15 lignes (commentaire dans le code) décrivant taille, couleurs, classes, et transitions.

---

## 2) Adapter la sidebar About au même système d’icônes
### 2.1. Items About enrichis (icônes)
Créer/modifier la config About pour **injecter une icône par item**, en **réutilisant** l’API Home :

```ts
// src/components/layout/sidebar/aboutSidebar.items.ts
// NOTE: on importe les mêmes icônes que la Home (même composant Icon / mêmes SVG)
import { IconCompass, IconTarget, IconBookOpen, IconSparkles, IconUsers, IconWorkflow, IconShieldCheck, IconHelpCircle, IconMessageSquare } from '@/components/icons'; 
// Les noms d’icônes sont indicatifs : reprendre EXACTEMENT ceux disponibles côté Home.

export const aboutSidebarItems = [
  { href: '#about-hero',   label: 'Introduction',     icon: <IconCompass aria-hidden="true" /> },
  { href: '#mission',      label: 'Mission',          icon: <IconTarget aria-hidden="true" /> },
  { href: '#story',        label: 'Notre histoire',   icon: <IconBookOpen aria-hidden="true" /> },
  { href: '#values',       label: 'Valeurs',          icon: <IconSparkles aria-hidden="true" /> },
  { href: '#team',         label: 'Équipe',           icon: <IconUsers aria-hidden="true" /> },
  { href: '#process-mini', label: 'Notre méthode',    icon: <IconWorkflow aria-hidden="true" /> },
  { href: '#proof',        label: 'Preuves',          icon: <IconShieldCheck aria-hidden="true" /> },
  { href: '#faq',          label: 'FAQ',              icon: <IconHelpCircle aria-hidden="true" /> },
  { href: '#cta',          label: 'Contact',          icon: <IconMessageSquare aria-hidden="true" /> }
];
````

> Important : **n’utiliser que les icônes déjà existantes** côté Home. Si un nom diffère, **mapper vers l’icône équivalente** réellement disponible.

### 2.2. Injection route-aware

S’assurer que le bridge route → items About existe déjà (cf. tâche précédente). Exemple :

```tsx
// SidebarRouterBridge.tsx (existant)
if (pathname?.startsWith('/about')) {
  return <Sidebar items={aboutSidebarItems} />;
}
```

---

## 3) Styles & tokens (parité stricte avec la Home)

Vérifier/aligner les points suivants **dans la feuille existante** (pas de nouveau fichier global) :

* **Dimensions icône** : mêmes valeurs que Home, ex.

  ```css
  .sidebar .item .icon {
    width: var(--icon-size, 1.25rem);
    height: var(--icon-size, 1.25rem);
    stroke-width: var(--icon-stroke, 1.75);
  }
  ```
* **Couleurs** :

    * idle : `var(--color-text-muted)`
    * hover : `var(--color-accent)` (ou équivalent Home)
    * active : `var(--color-accent-strong)` + `font-weight: 600` si déjà en place
* **Espacements** : même `gap` entre icône et label (ex. `gap: var(--space-2)`).
* **Transitions** : même `transition` (ex. `var(--transition-fast)`) sur couleur/opacité/transform.
* **Focus** : même anneau de focus (`outline`/`box-shadow`) que Home.
* **Hover micro-animé** (si présent sur Home) : scale 1.03–1.05 max, jamais exagéré.

> **Aucun style spécifique “about”**. La parité se fait par **réutilisation**.

---

## 4) Adéquation sémantique icône ↔ libellé (règles)

Adapter la **forme**/le **pictogramme** selon le texte, en respectant le vocabulaire visuel Home :

* **Introduction** → Boussole (orientation).
* **Mission** → Cible (intention/objectif).
* **Histoire** → Livre/chapitres (timeline).
* **Valeurs** → Étincelles/étoiles (principes/guides).
* **Équipe** → Groupe (humain/collaboration).
* **Notre méthode** → Workflow/chemins (processus).
* **Preuves** → Bouclier/cocher (fiabilité/validation).
* **FAQ** → Aide/point d’interrogation (questions).
* **Contact** → Bulle/Message (échange).

> Si l’icône exacte n’existe pas dans le set Home, **choisir la plus proche** et **documenter** la substitution en commentaire (pas de nouvelle dépendance).

---

## 5) Accessibilité & sémantique

* Les icônes purement décoratives portent `aria-hidden="true"`.
* Les liens ont un label **textuel** explicite ; **ne pas** masquer le label derrière l’icône.
* Le focus clavier doit être **visible** et **cohérent** (identique Home).
* L’item actif (section visible) a `aria-current="true"` ou une classe `.is-active` déjà gérée par Home.

---

## 6) Tests d’acceptation

* [ ] Les **mêmes icônes** (ou équivalentes) apparaissent en About, **mêmes tailles/traits** qu’en Home.
* [ ] Idle/hover/active **identiques** (couleurs/poids/animation).
* [ ] Aucun **layout shift** à l’apparition/hover.
* [ ] **IntersectionObserver** applique correctement l’état actif (parité avec Home).
* [ ] **Responsive** : comportement identique à Home (masquage/affichage selon breakpoints).
* [ ] **Aucune duplication CSS** ; tous les styles proviennent des mêmes classes/tokens.
* [ ] **Aucune nouvelle dépendance** (icônes réutilisées).

---

## 7) Journal de commits attendu

1. `feat(about-sidebar): add icons to about sidebar items (parity with home)`
2. `refactor(sidebar): reuse home icon system and tokens for about`
3. `a11y(sidebar): ensure aria-hidden/aria-current and focus parity`
4. `test(about-sidebar): verify active highlight and hover transitions`

---

## 8) Notes de maintenance

* En cas d’ajout de nouvelles sections About, **mettre à jour** `aboutSidebar.items.ts` avec une icône **existante**.
* Toute évolution d’icônes doit d’abord être **faite sur Home** (source de vérité), puis répercutée sur About, jamais l’inverse.
* Documenter dans un commentaire **le mapping icône ↔ label**, pour éviter les divergences futures.

```
```
