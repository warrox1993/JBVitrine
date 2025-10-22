# AGENTS.md – Standards Site Vitrine Pro (Next.js 15+ App Router + React + TypeScript + CSS Modules)

## Objectif
Créer un site vitrine professionnel, responsive, performant, sécurisé et évolutif, valorisant l'expertise en développement web, cybersécurité et IA. Le code reste minimaliste, lisible, factorisé et scalable. Toute nouvelle règle ou composant respecte à 100% ces standards avec zéro erreur, zéro compromis.

---

## Hiérarchie des Priorités (Non-Négociable)

En cas de conflit ou d'arbitrage, respecter cet ordre **STRICT** :

1. **Sécurité** - Aucune fuite, pas d'injection, pas d'exposure de secrets
2. **Accessibilité** - WCAG AA minimum, a11y testée automatiquement
3. **Performance** - Budgets (110 kB JS, 25 kB CSS, 2.0s LCP, 200ms INP, 0.1 CLS)
4. **Maintenabilité** - Lisibilité, DRY, testabilité, documentation

*Règle : jamais sacrifier accessibilité pour un micro-gain perf.*

---

## 1. Architecture Next.js App Router (Obligatoire)

- Utiliser Next.js 15+ avec App Router (`/app/` uniquement).
- Pas de Pages Router (`/pages/` ancien) : déprécié.
- **Server Components par défaut.** Ajouter `"use client"` UNIQUEMENT si nécessaire :
    - État local (useState, useReducer)
    - Hooks (useEffect, useContext, useCallback, etc.)
    - Événements utilisateur (onClick, onChange, etc.)
    - Refs (useRef)
    - APIs navigateur (localStorage, window, etc.)
- Métadonnées générées via `generateMetadata` (SSR, pas rendu client).
- Pages/layout dans `/app`, composants réutilisables dans `/src/components`.
- Pas de logique sensible côté client : API calls, validations, authentification = Server Actions ou API routes.

### Data Fetching & Caching
- Favoriser ISR : `fetch(url, { next: { revalidate: 60 } })` pour données semi-statiques
- Données sensibles/volatiles : `cache: 'no-store'`
- Éviter la dynamique globale si non requise : `export const dynamic = 'error'` (mode SSG par défaut)

### Segments Standards
- Fournir `loading.tsx`, `error.tsx`, `not-found.tsx` à la racine et pour segments critiques
- Utiliser `generateStaticParams` pour SSG quand pertinent

---

## 2. TypeScript Strict Mode (Obligatoire)

- Configuration dans `tsconfig.json` (voir section 26.2)
- `strict: true`, `noImplicitAny: true`, `exactOptionalPropertyTypes: true`
- Aucune variable `any` sans justification commentée et explicite
- Tous les props typés via interfaces ou type unions
- Imports ordonnés :
    1. Node modules
    2. React/Next
    3. Librairies tierces
    4. Chemins relatifs (utiliser baseUrl/paths de tsconfig)
- Pas d'implicit `any` : TypeScript doit déduire tous les types
- Commentaires JSDoc pour fonctions publiques

---

## 3. CSS Modules & Structure Fichiers (Obligatoire)

- **Fichiers `.module.css` UNIQUEMENT** pour le style local des composants
    - Format : `[NomComposant].module.css`
    - Importé EXCLUSIVEMENT par `[NomComposant].tsx`
    - Convention de nommage classes : kebab-case (`.navbar-root`, `.navbar-link`)
- **Styles globaux CENTRALISÉS** dans `/src/app/styles/` :
    - Importés **exclusivement dans `app/layout.tsx`** (point d'entrée unique)
    - `globals.css` : reset, normalize, base styles
    - `typography.css` : tous les titres, textes, styles de police
    - `variables.css` : palette de couleurs, espacements, tailles de police, z-index scale, durations, easing curves
    - `utilities.css` : classes réutilisables (helpers)
- Structure physique :
  ```
  /src/
    /app/
      /styles/
        globals.css
        typography.css
        variables.css
        utilities.css
      layout.tsx
      page.tsx
    /components/
      /[NomComposant]/
        [NomComposant].tsx
        [NomComposant].module.css
  ```
- **Aucune fuite de style** : chaque composant = scope CSS unique et isolé
- Noms de classes : `[component]-[element]` + modificateurs `--`
- Pas de CSS dispersé dans `/app` ET `/components` : source unique de vérité

### Design Tokens Exhaustifs (variables.css) – TEMPLATE À ADAPTER

⚠️ **CRITICAL** : Les valeurs ci-dessous sont un **EXEMPLE/TEMPLATE UNIQUEMENT**.  
**TU DOIS les adapter à ta charte graphique réelle** avant utilisation en production.

Créer `/src/app/styles/variables.css` avec tes propres valeurs :

```css
/* 
 * TEMPLATE – ADAPTER TOUTES LES VALEURS À TA CHARTE RÉELLE
 * Cet exemple utilise la palette du site vitrine (brun + orange)
 * Replace les hex colors, spacing, durations selon TA DA
 */

:root {
  /* ====== COULEURS – À ADAPTER À TA PALETTE ====== */
  --color-bg: #26211F;                /* ← À REMPLACER : ta couleur de fond principale */
  --color-text: #ffffff;              /* ← À REMPLACER : ta couleur de texte principal */
  --color-accent-primary: #FFA74A;    /* ← À REMPLACER : ta couleur accent principale */
  --color-accent-secondary: #FF743A;  /* ← À REMPLACER : ta couleur accent secondaire */
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  
  /* ====== ESPACEMENTS – À ADAPTER ====== */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  
  /* ====== Z-INDEX SCALE ====== */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-popover: 1050;
  
  /* ====== TRANSITIONS ====== */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 4. Identité Visuelle & UX

- Palette principale :
    - Background : #26211F (EXEMPLE – adapter)
    - Accent primaire : #FFA74A (EXEMPLE – adapter)
    - Accent secondaire : #FF743A (EXEMPLE – adapter)
    - Texte contrasté (≥ 4.5:1)
- Typographie marquée :
    - Tailles XXL pour h1/h2 (utiliser `clamp(2.5rem, 8vw, 6rem)` pour fluidité)
    - Unités `rem` et `em` UNIQUEMENT (sauf bordures fines en `px`)
    - Mobile-first : 375px base, breakpoints 768px, 1024px, 1440px
- Effet visuel "wow" :
    - Animations CSS only (fade-in, slide, hover)
    - Jamais JS inline pour animations
    - Respecter `@media (prefers-reduced-motion: reduce)` (A11y)
- Design sobre, professionnel, lisible, navigation fluide
- Sidebar icônes minimaliste sur fond sombre (gauche)

---

## 5. Sécurité Générale

- Interdits absolus :
    - `eval()`, `new Function()`, `dangerouslySetInnerHTML`
    - Pas de secrets, clés API, tokens en code
    - Jamais de `javascript:` URLs
- **Images** :
    - Utiliser `next/image` TOUJOURS
    - Whitelist domaines externes dans `next.config.js` (voir section 26.1)
    - `loading="lazy"` par défaut
- **Contenus externes** :
    - Échapper/sanitiser tout contenu HTML injecté (form input, API responses)
    - Valider `href` et `src` avant utilisation
- **Zones Interdites (Ne Jamais Modifier)** :
    - `/.git/`, `/.env*`, `/.ssh/`, `/node_modules/`, `/package-lock.json`
    - Vérifier `.env.local` : zéro donnée sensible avant commit
- **Commandes Shell** : toujours expliquées avant proposition
- **Accès Réseau/Fichiers** : interdits sans demande explicite du développeur
- **Security Headers** (via `next.config.js` — voir section 26.1) :
    - Content-Security-Policy (CSP)
    - X-Frame-Options (deny iframes non autorisées)
    - X-Content-Type-Options (nosniff)
    - Referrer-Policy (strict-origin-when-cross-origin)
    - Permissions-Policy (restrictif : geolocation/microphone/camera = off)
    - HSTS (production HTTPS uniquement)
- **Cookies** : par défaut `Secure`, `SameSite=Lax`, `HttpOnly` si applicable
- **Build** :
    - Supprimer tous `console.log`, `alert`, `debugger` avant prod
    - Minifier CSS et JS automatiquement

---

## 6. Performance & Budgets (Cibles Bloquantes)

- **Budgets de Performance** :
    - First Load JS ≤ **110 kB** compressé
    - CSS total ≤ **25 kB** compressé
    - **Budgets 3rd-party** : aucun script externe non justifié ; total tiers ≤ **50 kB** compressés
- **Core Web Vitals** (Google Ranking Signals) :
    - LCP (Largest Contentful Paint) ≤ **2.0s** (First Contentful Paint ≤ 1.8s)
    - INP (Interaction to Next Paint) ≤ **200ms** (Total Blocking Time ≤ 200ms)
    - CLS (Cumulative Layout Shift) ≤ **0.1** (zéro décalage visuel non prévu)
- **Images** :
    - Optimiser format (WebP/AVIF priorité, fallback JPEG/PNG)
    - Lazy-loading par défaut (`loading="lazy"`)
    - Taille ≤ 100 kB par image
    - Utiliser `sizes` attribute pour responsive
- **Polices** :
    - Chargées via `next/font` (ou précharge optimisée)
    - Max 2 font families
- **Build Analysis** :
    - `npm run analyze` pour audit bundle (voir section 26)
    - Supprimer imports non utilisés automatiquement
    - Factoriser transitions/animations répétées
    - Audit bundle mensuelle

---

## 7. Accessibilité (WCAG AA)

- **Sémantique** :
    - Balises sémantiques : `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
    - Pas de divs pour structure sémantique
- **Textes & couleurs** :
    - Textes décoratifs cachés : `aria-hidden="true"`
    - Contraste texte/fond ≥ 4.5:1 (WCAG AA)
- **Boutons & interactions** :
    - Rôle explicite (button, link, etc.)
    - Focus visible sur tous les éléments interactifs
    - Labels texte descriptif, pas vides
    - Exemple Button accessible (voir section 26.6)
- **Animations** :
    - Respecter `@media (prefers-reduced-motion: reduce)` : supprimer animations si demandé
- **Navigation** :
    - Lien de contournement "skip to content" dès le chargement
    - Ordre logique (tabindex 0 ou naturel, jamais négatif ou >0 sauf cas critical)
    - **Focus management** : déplacer le focus sur le titre principal après changement de route
- **ARIA Labels** :
    - Obligatoires sur composants complexes (modaux, accordéons, carousels)
    - Tests automatisés avec jest-axe

---

## 8. Intégrité du Code & Prévention des Erreurs

- Zéro variable, fonction ou propriété orpheline (inutilisée)
- Zéro import non utilisé
- **TypeScript strict mode activé** + linting ESLint avant chaque build (voir section 26)
- À chaque ajout/correction :
    - Zéro `console.error`, `undefined`, `NaN` en runtime
    - Imports/types manquants corrigés automatiquement
    - Interfaces/PropTypes définis explicitement
    - Pas de `any` implicite
- Jamais de valeurs codées en dur :
    - URLs → env variables
    - Secrets → `.env.local` ou variables d'environnement
    - Tokens → localStorage sécurisé ou httpOnly cookies
- Dépendances obsolètes supprimées après refactor
- Imports absolus configurés (tsconfig.json → baseUrl/paths)

---

## 9. Modes de Travail pour Codex

- Lire ce document AVANT toute génération ou modification
- Respect strict des fichiers existants : mise à jour ciblée, jamais suppression de logique non justifiée
- En cas d'ambiguïté → proposer un plan de correction avant d'écrire
- Mode "clean-refactor-only" : générer le code le plus simple, lisible et robuste possible
- Valider cohérence visuelle avant toute optimisation performance
- Documentation automatique : tout bloc créé = commentaire explicatif (minimum 1 ligne)
- Jamais overwrite massif sans confirmation explicite

---

## 10. Auto-Vérifications Codex Obligatoires

Avant toute sortie de code, exécuter cette checklist :

- ✅ Valider syntaxe : zéro warning TypeScript, ESLint, JSX
- ✅ Cohérence CSS/JSX : chaque classe `.module.css` utilisée est définie et importée
- ✅ Tous les imports existent et sont utilisés (supprimer orphelins)
- ✅ Exécuter lint virtuel : `eslint --fix --quiet` et corriger les erreurs détectables
- ✅ Comparer avant/après :
    - Si suppression → confirmer qu'elle est nécessaire et justifiée
    - Si ajout de dépendance → expliquer clairement la justification
    - Si modification du scope → évaluer l'impact sur les autres fichiers
- ✅ Ajouter bloc "CHANGE LOG" en haut du fichier si refactor > 30% du contenu
- ✅ Vérifier absence de secrets, hardcoded URLs, console.* en code final
- ✅ Tests passent : `npm run test` sans erreurs
- ✅ Lighthouse audit ≥ 90 (Perf, A11y, Best-Practices, SEO)

---

## 11. Validation Cognitive IA

- Conflit règle document vs demande utilisateur → suivre la règle du document, demander confirmation pour déroger
- Action potentiellement destructrice → proposer d'abord un plan commenté avant exécution
- Toujours décrire la logique en ≥ 3 lignes :
    1. Problème identifié
    2. Solution proposée
    3. Justification technique
- Si incertitude > 0 : poser une question explicite avant de générer du code

---

## 12. Résolution d'Ambiguïté Codex

- Incohérences détectées (nommage, CSS/JSX non alignés, classes dupliquées) → créer un plan de correction avant modification
- Comportement non défini clairement → poser une question avant d'écrire du code
- Jamais modifier un fichier sans but explicite confirmé
- Produire des logs commentés pour tout refactor significatif
- Proposer une checklist de correction automatique si anti-pattern repéré

---

## 13. Processus Décision Codex (Toujours Suivi)

Codex doit appliquer ce processus en 5 étapes avant toute génération :

1. **Vérifier existence** : chercher si la classe/utilitaire/fonction existe déjà avant création
2. **Évaluer impact** : modification globale = demande explicite utilisateur (jamais initiative)
3. **Factoriser** : les règles dupliquées doivent être déplacées vers utilitaires/variables
4. **Auditer** : vérifier l'usage de chaque classe/fonction avant suppression/déplacement
5. **Rejeter** : refuser toute génération si anti-patterns détectés (`!important`, inline, IDs, `any`)

---

## 14. Styleguide Commit & PR

- Format message de commit : `[type(scope)]: description`
    - **type** : feat, fix, refactor, style, chore, docs, perf, security
    - **scope** : composant ou section (ex. navbar, hero, footer)
    - **description** : courte, claire, au présent, sans majuscule initiale
    - Exemple : `[refactor(css)]: consolidate heading styles into single class`
- Validation automatique (pré-commit via Husky + lint-staged) :
    - ESLint lint + fix
    - Stylelint lint + fix
    - TypeScript type check (`tsc -p tsconfig.json --noEmit`)
    - Commitlint (format respecté)
    - Tests passant
- PR : inclure captures responsive (375px, 1024px, 1440px) + checklist qualité

---

## 15. Protocol Perfect Clean Code

Priorité absolue : clarté, sécurité, cohérence, maintenabilité

- Toujours valider l'impact du changement sur :
    - Architecture du projet (dépendances, imports, structure)
    - Accessibilité (contraste, semantic, focus, aria)
    - Performance (bundle size, LCP, INP, CLS)
    - Sécurité (secrets, xss, injection, whitelisting)
- Appliquer la règle des "3 R" avant validation :
    - **Résilience** : tolérance à l'erreur (edge cases, null checks, try/catch)
    - **Redondance maîtrisée** : zéro duplication non utile
    - **Reproductibilité** : le code doit fonctionner identiquement dans tout environnement (dev, staging, prod)
- Corriger ou alerter si l'une de ces trois conditions échoue
- Objectif final : code propre, auto-documenté, testable sans erreur à 100%

---

## 16. Outillage & Automatisation (Non-Optionnel)

- **ESLint** : config Next.js strict, ordre imports, absence de console (voir section 26.3)
- **Stylelint** : enforce CSS Modules only, pas de `!important`, pas d'IDs, pas de inline styles
- **TypeScript** : `strict: true`, `noImplicitAny: true` (voir section 26.2)
- **Husky + lint-staged** : exécuter lint/type-check/tests avant commit
- **Commitlint** : enforcer format Conventional Commits
- **Jest** : tests unitaires (80% couverture minimum sur code critique)
- **React Testing Library** : tests composants (interactions, accessibilité, jest-axe)
- **Playwright** : tests E2E (parcours critiques utilisateur)
- **Lighthouse CI** : seuils min en PR (Perf ≥ 90, A11y ≥ 95, Best-Practices ≥ 95, SEO ≥ 95)
- **Scripts `package.json`** (essentiels) :
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "lint": "eslint . --fix && stylelint 'src/**/*.module.css' --fix && tsc -p tsconfig.json --noEmit",
      "lint:check": "eslint . --max-warnings 0 && stylelint 'src/**/*.module.css' --max-warnings 0",
      "typecheck": "tsc -p tsconfig.json --noEmit",
      "test": "vitest run",
      "test:watch": "vitest",
      "test:coverage": "vitest run --coverage",
      "e2e": "playwright test",
      "e2e:ui": "playwright test --ui",
      "analyze": "ANALYZE=true next build",
      "ci:quality": "npm run lint:check && npm run typecheck && npm run test && npm run e2e",
      "pre-push": "npm run lint:check && npm run typecheck && npm run test && npm run build"
    }
  }
  ```

---

## 17. Strict DO & DON'T

### DO (Obligatoire)
- 1 composant = 1 fichier `.module.css` importé uniquement par ce composant
- Nommer classes par bloc fonctionnel, préfixées par composant (`.navbar-root`, `.footer-link`)
- Zéro duplication : factoriser en utilitaires ou variables
- Unités fluides : `rem`, `em`, `clamp()` ; `px` toléré UNIQUEMENT pour bordures fines
- Couleurs, spacing, fonts centralisés dans `:root` ou `variables.css`
- Mobile-first : 375px base, puis breakpoints à 768px, 1024px, 1440px
- Chaque fichier CSS commence par commentaire explicatif du rôle
- Ajouter/éditer un composant : ne modifier QUE ses propres fichiers (.tsx + .module.css)
- Nettoyer fichiers orphelins après refactor
- Server Components par défaut
- Types explicites pour tous les props/variables
- JSDoc pour fonctions publiques
- Tests écrits AVANT refactoring significatif

### DON'T (Interdit)
- Aucune règle avec `!important` (jamais)
- Pas de styles inline (`style=""` dans JSX)
- Pas d'IDs dans CSS (`#xyz` interdit)
- Pas de couleurs hex directement dans JSX (utiliser variables ou utilitaires)
- Ne pas mélanger layout et apparence dans une même classe
- Pas de sélecteurs globaux larges (`*`, `div`, `.container *`)
- Pas de duplication de blocs pour variantes mineures (utiliser modificateurs ou variables)
- Pas d'import CSS global hors `app/layout.tsx`
- Pas d'eval, dangerouslySetInnerHTML, new Function
- Pas de secrets en code
- Pas de `any` implicite en TypeScript
- Pas de `console.log`, `alert`, `debugger` en prod
- Pas de "use client" par défaut (uniquement si nécessaire)

---

## 18. Conventions CSS (États & Modificateurs)

Pour garantir cohérence du nommage CSS, utiliser ces conventions :

- **États actifs** : `.is-active`, `.is-open`, `.is-disabled`, `.is-loading`
- **États erreur/validation** : `.has-error`, `.has-warning`, `.has-success`, `.is-invalid`
- **Modificateurs** : `--large`, `--small`, `--primary`, `--secondary`, `--dark`, `--light`
- **Combinaison** : `.button.button--primary.is-active` (classe parent + modificateur + état)

Exemple :
```css
/* Base */
.button { ... }

/* Modificateur */
.button--primary { background: var(--color-accent-primary); }
.button--large { padding: var(--spacing-6); }

/* État */
.button.is-active { opacity: 0.8; }
.button.is-disabled { cursor: not-allowed; opacity: 0.5; }
```

---

## 19. Syntaxe & Factorisation CSS

Tous les styles principaux :
- `/src/app/styles/typography.css` : tous les h1, h2, h3, p, textes
- `/src/app/styles/variables.css` : palette, spacing, fonts, z-index, durations, easing
- `/src/app/styles/utilities.css` : classes réutilisables

Exemple classe h1 unique :
```css
.heading-primary {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  color: var(--color-accent-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
  animation: fadeInDown 600ms ease;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .heading-primary {
    animation: none;
  }
}
```

Exemple module CSS composant :
```css
/* components/Navbar/Navbar.module.css */
.navbar-root {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background-color: var(--color-bg);
}

.navbar-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--duration-base) var(--easing-ease-out);
}

.navbar-link:hover {
  color: var(--color-accent-primary);
}
```

---

## 20. Guidelines pour Codex

- Respecter absolument cette architecture à chaque création/modification/refactor
- Chercher d'abord une classe existante avant d'en créer une nouvelle
- Jamais de modification globale sans prompt explicite et confirmation
- En factorisation : déplacer règle dupliquée vers `utilities.css` ou `variables.css`
- Vérifier l'usage de chaque classe avant suppression/déplacement
- Refuser la génération si : doublons, `!important`, inline styles, IDs, `.css` non-module dans composants, `any` implicite, secrets en code
- Proposer checklist de refactor automatique si anti-pattern repéré
- Toujours commenter le "POURQUOI" avant le "COMMENT" dans le code complexe

---

## 21. Testing Strategy (Obligatoire)

### Principes
- **Composants** : Tests unitaires avec React Testing Library (interactions, rendu, accessibilité)
- **Utilitaires/Hooks** : Tests unitaires avec Jest/Vitest
- **Parcours critiques** : Tests E2E avec Playwright (authentification, contact, paiement)
- **Accessibilité** : Tests automatisés avec jest-axe
- **Couverture** : 80% minimum sur code critique (composants principaux, utilitaires)

### Structure tests
```
/src/
  /components/
    /Button/
      Button.test.tsx
      Button.module.css
      Button.tsx
  /utils/
    helpers.test.ts
    helpers.ts
  /__tests__/
    e2e/
      contact-form.spec.ts
      navigation.spec.ts
```

### Règles de test
- Tester le rendu, les interactions utilisateur, les états
- Mock des APIs et contextes (pas de vraies requêtes)
- Vérifier l'accessibilité (roles, labels, keyboard navigation)
- Tests isolés (pas de side effects entre tests)
- Noms tests explicites : `should render button with correct label`
- Pas de tests flaky (résultats non-déterministes)

---

## 22. Gestion des Erreurs & Logging

### Principes
- **Error Boundary** : Composants fallback avec UX appropriée
- **Logging production** : Services externes (Sentry, LogRocket, Datadog)
- **Monitoring** : Alertes sur erreurs > 1% de sessions
- **User Experience** : Messages d'erreur clairs et actionnable

### Implementation
```typescript
// Error Boundary obligatoire dans layout racine
'use client'
import { useEffect } from 'react';

export function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Oups ! Une erreur s'est produite</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
```

### Règles
- Jamais exposer d'erreurs techniques à l'utilisateur (seulement logs)
- Messages d'erreur : langage clair, suggestions de solution
- Logging : contexte complet (user ID, page, action, timestamp)
- Rate limiting : alertes si trop d'erreurs (signe de problème)

---

## 23. Migration Future Tailwind CSS (Optionnel)

- Lors de conversion/ajout : proposer équivalent Tailwind en miroir visuel
- Variables CSS globales = source de vérité (préfigurent `tailwind.config.js`)
- Ne jamais supprimer logique CSS avant remplacement vérifié à rendu IDENTIQUE
- Approche progressive : composant par composant, jamais "big bang"

---

## 24. Checklist Avant Push/Merge

### Sécurité & Qualité
- [ ] Aucun secret, token, API key exposé (vérifier .env.local)
- [ ] Contenu dynamique échappé/sanitisé
- [ ] CSP headers configurés et testés
- [ ] `npm run lint:check` passé (zéro warnings)
- [ ] `npm run typecheck` passé (aucune erreur TS)
- [ ] Tests unitaires passent (`npm run test`)
- [ ] Tests E2E passent (`npm run e2e`)

### Performance
- [ ] Bundle size ≤ budgets (110 kB JS, 25 kB CSS compressé)
- [ ] Images optimisées (WebP/AVIF) + lazy loading
- [ ] Core Web Vitals respectés :
    - LCP ≤ 2.0s
    - INP ≤ 200ms
    - CLS ≤ 0.1
- [ ] Lighthouse audit ≥ 90 (Perf, A11y, Best-Practices, SEO)

### Accessibilité
- [ ] Contraste couleurs ≥ 4.5:1 (vérifier avec axe DevTools)
- [ ] Navigation clavier fonctionnelle (Tab, Shift+Tab, Enter)
- [ ] ARIA labels sur composants complexes (modaux, accordéons)
- [ ] Lien "skip to content" présent et fonctionnel
- [ ] Tests jest-axe passent

### Architecture
- [ ] Styles factorisés, zéro duplication, zéro orphelin
- [ ] Structure dossiers/fichiers respectée à la lettre
- [ ] 1 composant = 1 `.module.css`
- [ ] Variables CSS utilisées (zéro hex brut)
- [ ] Responsive testé (375px, 768px, 1024px, 1440px)
- [ ] Server Components par défaut (pas de `"use client"` inutiles)

### Documentation & Commits
- [ ] Commit message format respecté : `[type(scope)]: description`
- [ ] CHANGE LOG ajouté si refactor significatif
- [ ] Pas de `console.log`, `alert`, `debugger` en code
- [ ] Commentaires JSDoc pour fonctions publiques
- [ ] PR description : changements, tests effectués, captures d'écran

---

## 25. En Résumé – La Vision

Code simple, lisible, neutre (pas d'opacité logique inutile). Zéro duplication, zéro global accidentel. Chaque composant = unité indépendante, testable, documentée. Respect conventions CSS universelles (mobile-first, DRY, variables globales). Sécurité, performance, accessibilité, testabilité = critères de validation égaux à la fonctionnalité. Codex respecte 100% ces standards ou refuse la tâche.

---

## 26. Context 7 — Fichiers de Configuration (Prêts à Copier & Adapter)

### 26.1 — next.config.js (⚠️ À ADAPTER)

⚠️ **CRITICAL** : Les valeurs ci-dessous sont des EXEMPLES.  
**À adapter absolument** : `images.remotePatterns` → TES domaines réels, CSP → tes ressources réelles

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: "geolocation=(), microphone=(), camera=()" },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
  },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : [])
];

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }  /* ← À REMPLACER */
    ]
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  }
});
```

### 26.2 — tsconfig.json (⚠️ À ADAPTER - Paths)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],                       /* ← À adapter */
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/styles/*": ["./src/app/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 26.3 — .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "plugin:@next/next/recommended", "plugin:import/recommended", "plugin:jsx-a11y/recommended"],
  "rules": {
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "alphabetize": { "order": "asc", "caseInsensitive": true }
    }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "warn"
  }
}
```

### 26.4 — .stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-css-modules"],
  "rules": {
    "selector-max-id": 0,
    "declaration-no-important": true,
    "no-invalid-double-slash-comments": true
  }
}
```

### 26.5 — Husky Pre-Commit (.husky/pre-commit)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:check && npm run typecheck && npm run test -- --run
```

### 26.6 — Button Accessible Pattern

```typescript
// components/Button/Button.tsx
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles['button']} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className || ''}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={typeof children === 'string' ? children : undefined}
      {...props}
    >
      {isLoading && <span className={styles['button-spinner']} aria-hidden="true">⏳</span>}
      {children}
    </button>
  );
}
```

```css
/* components/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-6);
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color var(--duration-base) var(--easing-ease-out);
}

.button:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button--primary {
  background-color: var(--color-accent-primary);
  color: var(--color-bg);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-accent-secondary);
}

.button--small {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: 0.875rem;
}

.button--large {
  padding: var(--spacing-6) var(--spacing-8);
  font-size: 1.125rem;
}

.button-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
  .button-spinner { animation: none; }
}
```

### 26.7 — Lighthouse CI (lighthouserc.json)

```json
{
  "ci": {
    "collect": { "numberOfRuns": 3, "staticDistDir": "./.next/out" },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

---

## 27. Onboarding Developer (First 15 Minutes)

### Setup obligatoire
1. Fork/clone repo : `git clone [repo-url]`
2. Installer dépendances : `npm install`
3. Vérifier le setup : `npm run lint:check && npm run typecheck`
4. Créer fichier `.env.local` (voir section 29)
5. Lancer dev server : `npm run dev` → http://localhost:3000

### Lire dans cet ordre (15-20 min)
1. **Ce document** sections 1-10 (architecture + modes de travail) : 10 min
2. **README.md** du projet (setup spécifique) : 3 min
3. **Structure `/src`** (comment c'est organisé) : 2 min
4. **Un composant exemple** (ex. Button) : 2 min

### Premier test (5 min)
1. Créer branche : `git checkout -b feature/onboarding-test`
2. Modifier légèrement Button.tsx (ex. changer couleur)
3. Lancer tests : `npm run test` (doivent passer)
4. Lancer lint : `npm run lint:check` (doivent passer)
5. Voir le résultat en dev : `npm run dev`

### Ne pas faire en premier jour
- Refactoring massif sans mentor
- Créer 50 fichiers d'un coup
- Modifier core (app/layout, variables.css) sans accord
- Push directement sur main

---

## 28. Git Workflow & Branch Strategy

### Noms de branche
- Feature : `feature/nom-descriptif` (ex. `feature/hero-responsive`)
- Bug : `fix/nom-bug` (ex. `fix/navbar-focus-state`)
- Refactor : `refactor/nom-refactor` (ex. `refactor/css-consolidate`)
- Hotfix (urgent) : `hotfix/description` (ex. `hotfix/security-csp`)

### Processus PR strict
1. Créer branche depuis `main` : `git checkout -b feature/...`
2. Faire changements + committer régulièrement (1 commit/thème)
3. Avant push : `npm run pre-push` (tout doit passer)
4. Push et créer PR sur GitHub
5. Ajouter description + checklist (voir section 24)
6. Attendre Lighthouse CI (doit passer avec score ≥ 90)
7. Code review d'un pair
8. Merge squash + delete branche

### Commits respectent format
```bash
[feat(button)]: add loading state animation
[fix(navbar)]: resolve focus management bug
[refactor(css)]: consolidate button styles
[perf(images)]: optimize hero image webp format
[security(headers)]: upgrade CSP policy
[docs(readme)]: add onboarding guide
```

### Commits dans une PR
- Idéalement 1-3 commits thématiques
- Éviter 50 commits de typo (utiliser `--amend`)
- Si trop de commits : squash avant merge

---

## 29. Variables d'Environnement (.env.local)

### Créer `.env.local` depuis ce template

⚠️ **JAMAIS committer .env.local** (dans .gitignore)

```bash
# ====== Obligatoires ======
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ====== Optionnels (dev) ======
NEXT_PUBLIC_CONTACT_EMAIL=dev@example.com
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=

# ====== Server-side uniquement (jamais NEXT_PUBLIC_) ======
DATABASE_URL=
API_SECRET_KEY=
```

### Règles strictes
- **NEXT_PUBLIC_*** = visibles au client (ne pas y mettre secrets)
- Autres = server-side uniquement
- Avant commit : `grep NEXT_PUBLIC .env.local` → doit être public
- Avant merge : vérifier aucun token/clé exposé
- En prod : utiliser les vraies valeurs (pas localhost)

### Vérification avant push
```bash
# Ne pas avoir de secrets
grep -i "secret\|token\|key\|api" .env.local

# Si rien → OK
# Si quelque chose → corriger ou éjecter de l'env
```

---

## 30. Conventions de Nommage & Structure

### Fichiers TypeScript/React
- **Composants** : PascalCase (`Button.tsx`, `Navbar.tsx`, `HeroSection.tsx`)
- **Hooks custom** : `use` prefix + camelCase (`useForm.ts`, `useAuth.ts`, `useMediaQuery.ts`)
- **Utilitaires** : camelCase (`helpers.ts`, `formatters.ts`, `validators.ts`)
- **Types/Interfaces** : PascalCase + `Type` suffix (`ButtonType.ts`, `NavbarProps.ts`)
- **Tests** : `[Nom].test.tsx` (collocalisé avec le composant)

### Fichiers CSS
- **CSS Modules** : `[NomComposant].module.css` (exact correspondance TSX)
- **CSS Globaux** : kebab-case (`variables.css`, `typography.css`, `utilities.css`)
- **Classes CSS** : kebab-case (`.navbar-root`, `.button--primary`, `.is-active`)

### Dossiers
- **Segments page** : kebab-case (`/src/app/contact-us/`, `/src/app/blog-posts/`)
- **Composants** : PascalCase (`/src/components/Button/`, `/src/components/Navbar/`)
- **Utilitaires** : kebab-case (`/src/utils/`, `/src/lib/`, `/src/hooks/`)

### Arborescence complète
```
/src/
  /app/
    /contact-us/           ← page (kebab-case)
      page.tsx
      layout.tsx
    /styles/
      globals.css
      typography.css
      variables.css
      utilities.css
    layout.tsx
  /components/
    /Button/               ← composant (PascalCase)
      Button.tsx
      Button.module.css
      Button.test.tsx
      ButtonType.ts        ← si complexe
    /Navbar/
      Navbar.tsx
      Navbar.module.css
  /utils/
    helpers.ts
    validators.ts
  /hooks/
    useForm.ts
    useAuth.ts
```

---

## 31. Pre-Push Validation Script (Automatique)

### Ajouter dans `package.json`
```json
{
  "scripts": {
    "pre-push": "npm run lint:check && npm run typecheck && npm run test && npm run build"
  }
}
```

### Créer hook `.husky/pre-push`
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run pre-push || {
  echo "❌ Pre-push validation failed. Fix errors before pushing."
  exit 1
}
```

### Rendre exécutable
```bash
chmod +x .husky/pre-push
git add .husky/pre-push
git commit -m "[chore]: add pre-push hook validation"
```

### Résultat
- Si lint échoue → BLOQUE le push
- Si types échouent → BLOQUE le push
- Si tests échouent → BLOQUE le push
- Si build échoue → BLOQUE le push
- **Zéro code cassé en main.**

---

## 32. Common Pitfalls & Anti-Patterns

### ❌ Piège 1 : Importer CSS global dans un composant
```typescript
// ❌ MAUVAIS – CSS global importe 2x
import '../styles/globals.css';  // NE PAS FAIRE

// ✅ BON – Seulement dans app/layout.tsx
import './styles/globals.css';  // Une seule fois
```

### ❌ Piège 2 : Utiliser `px` au lieu de `rem`
```css
/* ❌ MAUVAIS – Non-responsive */
.button { padding: 16px 24px; }

/* ✅ BON – Responsive + basé design tokens */
.button { padding: var(--spacing-4) var(--spacing-6); }
```

### ❌ Piège 3 : Bouton icon sans `aria-label`
```tsx
/* ❌ MAUVAIS – Inaccessible */
<button><SearchIcon /></button>

/* ✅ BON – Accessible */
<button aria-label="Rechercher">
  <SearchIcon aria-hidden="true" />
</button>
```

### ❌ Piège 4 : Sélecteur CSS global qui "fuit"
```css
/* ❌ MAUVAIS – Affecte TOUS les h1 du site */
h1 { color: red; }

/* ✅ BON – Seulement si classe */
.heading-primary { color: red; }
```

### ❌ Piège 5 : Hardcoder une couleur au lieu de variable
```tsx
/* ❌ MAUVAIS – Duplication + pas maintenable */
<div style={{ color: '#FFA74A' }}>

/* ✅ BON – Utiliser variable */
<div style={{ color: 'var(--color-accent-primary)' }}>
```

### ❌ Piège 6 : Test qui passe localement mais pas en CI
```typescript
/* ❌ MAUVAIS – API call vraie, pas de timeout */
test('loads data', async () => {
  await fetchData();
  expect(...);
});

/* ✅ BON – Mock + timeout */
test('loads data', async () => {
  vi.mock('fetch', () => ({ ... }));
  await fetchData();
  expect(...);
}, { timeout: 5000 });
```

### ❌ Piège 7 : Client Component inutile
```tsx
/* ❌ MAUVAIS – Rend le composant client pour rien */
'use client'
export function Title() {
  return <h1>Title</h1>;  // Aucun state/effect/event
}

/* ✅ BON – Server Component (par défaut) */
export function Title() {
  return <h1>Title</h1>;
}
```

### ❌ Piège 8 : CSS Modules avec typo = erreur silencieuse
```tsx
/* ❌ MAUVAIS – Classe n'existe pas, pas d'erreur */
import styles from './Button.module.css';
<button className={styles.btn_root}>  // Typo!

/* ✅ BON – TypeScript error si classe n'existe pas */
<button className={styles['button-root']}>
```

---

## 33. Performance Debugging & Optimization

### Bundle trop gros ?
```bash
npm run analyze
# Ouvre rapport visuel
# Cherche dépendances surdimensionnées
# Supprime duplicatas
```

### Core Web Vitals mauvais ?
```bash
npm run build
npm run start
# Puis DevTools > Lighthouse > Measure
# Focus sur LCP (images?), INP (JS?), CLS (layout?)
```

### Composant re-render trop ?
```typescript
// Utiliser React Profiler temporairement
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={(id, phase, duration) => {
  if (duration > 50) console.warn(`${id} render took ${duration}ms`);
}}>
  {/* contenu */}
</Profiler>

// Ou avec React DevTools Profiler tab
```

### CSS trop volumineux ?
```bash
npm run build
# Checker .next/static/css/
# Chercher fichiers > 100kB (anomalie)
# Consolider les doublons de valeurs
```

### Images tuent la perf ?
```bash
npm run build
# Checker .next/static/images/
# Toutes les images <100kB ?
# Format WebP/AVIF utilisé ?
```

### Dépendance externe fuite la perf ?
```bash
npm run analyze
# Chercher script 3rd-party volumineux
# CSP policy bloque? Sentry/Analytics gonfle?
# Évaluer si réellement nécessaire
```

---
# AGENTS.md – Standards Site Vitrine Pro (Next.js 15+ App Router + React + TypeScript + CSS Modules)

[Sections 1-34 identiques à v4.1 – voir fichier précédent]

---

## 35. SEO Essentials & Structured Data

### Métadonnées par page (generateMetadata)

Chaque page doit définir ses métadonnées explicitement :

```typescript
// app/page.tsx ou app/contact/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Titre unique (60 caractères max)
  title: 'Titre SEO Pertinent | Nom Marque',
  
  // Description unique (160 caractères max)
  description: 'Description unique et pertinente qui incite au clic en SERP',
  
  // Keywords (optionnel, mais utile)
  keywords: ['développement web', 'cybersécurité', 'Next.js'],
  
  // Base URL pour URL absolues (metadata racine)
  metadataBase: new URL('https://example.com'),
  
  // Open Graph (Twitter Card + LinkedIn)
  openGraph: {
    title: 'Titre OG (peut différer du titre HTML)',
    description: 'Description OG pour partage réseaux',
    url: 'https://example.com/page-actuelle',
    siteName: 'Nom du site',
    images: [
      {
        url: '/og-image-1200x630.jpg',  // ← Optimiser : 1200x630px, <200kB
        width: 1200,
        height: 630,
        alt: 'Description image OG',
        type: 'image/jpeg',
      }
    ],
    type: 'website',  // ou 'article', 'product', etc.
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Titre Twitter',
    description: 'Description Twitter',
    images: ['/twitter-image.jpg'],
  },
  
  // Canonical + hreflang (i18n)
  alternates: {
    canonical: 'https://example.com/page-actuelle',
    languages: {
      'fr-BE': 'https://example.com/fr/page',
      'en-GB': 'https://example.com/en/page',
      'x-default': 'https://example.com/en/page',
    },
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function Page() {
  return <div>Contenu</div>;
}
```

### JSON-LD Structured Data

Ajouter dans `app/layout.tsx` pour schema global + dans pages spécifiques pour détail :

```typescript
// app/layout.tsx
import { ReactNode } from 'react';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Nom Entreprise',
  'url': 'https://example.com',
  'logo': 'https://example.com/logo.png',
  'description': 'Brève description',
  'sameAs': [
    'https://linkedin.com/company/your-company',
    'https://twitter.com/your-handle',
    'https://github.com/your-github',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'email': 'contact@example.com',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Site Name',
  'url': 'https://example.com',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': 'https://example.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-BE">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Schema.org Specific (Pages critiques)

Pour pages importantes (article, produit, événement) :

```typescript
// app/blog/[slug]/page.tsx
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  'headline': 'Article Title',
  'description': 'Short description',
  'image': '/blog-image.jpg',
  'author': { '@type': 'Person', 'name': 'Author Name' },
  'datePublished': '2025-10-23',
  'dateModified': '2025-10-23',
  'keywords': 'tag1, tag2, tag3',
};

// Ajouter dans <head>
```

### robots.txt (public/robots.txt)

```
# Robots.txt – Directives moteurs de recherche
User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /blog/

# Bloquer sections privées
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /.env*
Disallow: /_next/

# Délai de crawl (secondes)
Crawl-delay: 1

# Sitemap
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/fr/sitemap.xml
Sitemap: https://example.com/en/sitemap.xml

# Règles spécifiques bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
```

### sitemap.xml (app/sitemap.ts)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Pages statiques
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://example.com/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    // Pages dynamiques (blog, produits, etc.)
    // {
    //   url: `https://example.com/blog/${slug}`,
    //   lastModified: new Date(post.updatedAt),
    //   priority: 0.6,
    // },
  ];
}
```

### SEO Checklist par page

Avant de publier une page :

- [ ] Title unique (50-60 chars)
- [ ] Meta description unique (150-160 chars)
- [ ] Open Graph image (1200x630px, <200kB)
- [ ] h1 unique et pertinent
- [ ] Liens internes vers pages essentielles
- [ ] Image alt texte (descriptif, pas "image")
- [ ] Contenu > 300 mots (SEO minimum)
- [ ] Mobile responsive testé
- [ ] Core Web Vitals ≥ 90 (Lighthouse)
- [ ] Zéro liens cassés (404)
- [ ] Canonical URL défini
- [ ] hreflang si multilingue

### Core Web Vitals = SEO Ranking Signal

Les budgets de performance (section 6) **influencent directement le ranking Google** :

- **LCP ≤ 2.5s** = positif pour ranking
- **INP ≤ 200ms** = positif pour ranking
- **CLS ≤ 0.1** = positif pour ranking

Objective : Lighthouse Score ≥ 90 (voir section 26.7).

---

## 36. CORS & CSRF Security

### CORS (Cross-Origin Resource Sharing)

Si ton site appelle une API externe (ou est appelé par d'autres domaines) :

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        // Autorise requêtes depuis domaines spécifiques
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.NODE_ENV === 'production'
            ? 'https://trusted-frontend.com'  // ← À adapter
            : '*'  // dev uniquement
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',  // Si cookies/auth
        },
        {
          key: 'Access-Control-Max-Age',
          value: '86400',  // Cache 24h
        },
      ],
    },
  ];
}
```

### CSRF (Cross-Site Request Forgery) Protection

Next.js Server Actions **incluent automatiquement protection CSRF** :

```typescript
// app/contact/actions.ts
'use server'

import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().email('Email invalide'),
  message: z.string()
    .min(10, 'Min 10 caractères')
    .max(500, 'Max 500 caractères'),
  _csrf: z.string().optional(),  // Token auto-généré par Next.js
});

export async function submitContact(formData: FormData) {
  // Next.js vérifie automatiquement token CSRF
  // Pas d'action manuelle requise
  
  try {
    const data = Object.fromEntries(formData);
    const validated = ContactSchema.parse(data);
    
    // Traiter (emails, DB, etc.)
    console.log('Contact reçu:', validated.email);
    
    return { success: true, message: 'Message envoyé' };
  } catch (error) {
    return { success: false, error: 'Validation échouée' };
  }
}
```

### Utilisation en formulaire

```tsx
// components/ContactForm/ContactForm.tsx
'use client'

import { submitContact } from '@/app/contact/actions';

export function ContactForm() {
  return (
    <form action={submitContact}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        required
      />
      {/* CSRF token auto-généré par Next.js – pas besoin d'input manuel */}
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

### Validation côté serveur (Zod)

Toujours valider sur le serveur (ne jamais faire confiance au client) :

```typescript
// app/api/contact/route.ts
import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation stricte
    const validated = ContactSchema.parse(body);
    
    // Traitement sécurisé (DB, email, etc.)
    // ...
    
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### Règles CSRF/CORS obligatoires

- **Jamais `*` en production** (sauf API publique intentionnelle)
- **Toujours valider côté serveur** (inputs, headers, tokens)
- **HTTPS obligatoire** pour cookies SameSite=Lax
- **Tokens CSRF revalidés** pour POST/PUT/DELETE
- **Rate limiting** sur endpoints critiques (login, contact, etc.)
- **Logging accès** pour audit sécurité

### Exemple Rate Limiting (Middleware)

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; reset: number }>();

export function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const key = `${ip}-${request.nextUrl.pathname}`;
  
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (record && now < record.reset) {
    record.count++;
    if (record.count > 10) {  // Max 10 req/minute
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  } else {
    rateLimitMap.set(key, { count: 1, reset: now + 60000 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact', '/api/auth/login'],
};
```

---

## 37. SEO Monitoring & Analytics

### Analytics Étiquetage (optionnel, consent-based)

```typescript
// app/layout.tsx – Charger APRÈS consentement utilisateur
function Analytics() {
  useEffect(() => {
    // Vérifier consentement avant charger
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      const consent = localStorage.getItem('analytics-consent');
      if (consent === 'accepted') {
        // Charger Google Analytics / Sentry / Autre
        console.log('Analytics activated');
      }
    }
  }, []);
  return null;
}
```

### Monitoring SEO mensuel

- Rank tracker : positions clés mots-clés (Google Search Console)
- Core Web Vitals : LCP/INP/CLS (PageSpeed Insights)
- Backlinks : qualité + quantité (Ahrefs/Semrush)
- Crawl errors : 404, redirects, pages bloquées (GSC)
- Indexation : pages indexées vs soumises (GSC)

---

## 38. Global SEO + Security Checklist (Avant Prod)

### SEO Checklist
- [ ] Métadonnées uniques par page (title, desc, OG image)
- [ ] JSON-LD Schema.org (Organization, Website, Article)
- [ ] robots.txt complet + sitemap.xml valide
- [ ] Canonical URLs définies
- [ ] hreflang si multilingue (fr-BE, en-GB, x-default)
- [ ] Mobile responsive + Core Web Vitals ≥ 90
- [ ] Tous les liens internes fonctionnels
- [ ] Image alt text (descriptif, pas "image1", "photo")
- [ ] h1 unique par page
- [ ] Contenu > 300 mots (SEO minimum)

### Security Checklist (Final)
- [ ] Tous les headers sécurité présents (CSP, HSTS, etc.)
- [ ] HTTPS activé (certificat SSL valide)
- [ ] CORS restreint (pas `*` en prod)
- [ ] CSRF tokens sur tous les formulaires
- [ ] Rate limiting sur endpoints critiques
- [ ] .env.local zéro secret exposé
- [ ] Dépendances à jour (npm audit)
- [ ] Tests de pénétration (si critique)

---

## Resources Complémentaires

- **Google Search Console** : https://search.google.com/search-console
- **Schema.org** : https://schema.org
- **Web.dev PageSpeed** : https://pagespeed.web.dev
- **OWASP Top 10** : https://owasp.org/www-project-top-ten/
- **Zod Validation** : https://zod.dev

## 34. Resources Critiques

- **Next.js 15 Docs** : https://nextjs.org/docs
- **WCAG 2.1 Guidelines** : https://www.w3.org/WAI/WCAG21/quickref/
- **Core Web Vitals** : https://web.dev/vitals/
- **Security Headers** : https://securityheaders.com/
- **CSS Modules** : https://nextjs.org/docs/app/building-your-application/styling/css-modules
