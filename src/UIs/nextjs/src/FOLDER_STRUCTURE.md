# 📁 Clean Architecture - Structure Project (Pragmatic Next.js)

Cette structure adapte les principes de Clean Architecture aux conventions Next.js pour plus d'efficacité.

## 🏗️ Vue d'ensemble

```
src/
├── app/                  # Next.js App Router (Routes & Controllers)
├── components/           # UI Components (La couche Présentation)
│   ├── ui/               # Composants de base (Atoms: Button, Input...)
│   ├── sections/         # Sections réutilisables (Hero, Features...)
│   ├── admin/            # Composants spécifiques Admin
│   └── ...
├── hooks/                # React Hooks globaux
├── lib/                  # Utilitaires, Helpers, Config (anciennement utils/shared)
├── core/                 # Cœur métier (Indépendant du framework)
│   ├── domain/           # Entités, Value Objects, Logic pur
│   └── application/      # Use Cases, CQRS, DTOs
├── infrastructure/       # Implémentations techniques (BDD, API externes)
└── styles/               # Styles globaux
```

---

## 🚀 Changements & Simplifications (2025)

Pour éviter la "suroptimisation" (Over-engineering), nous avons consolidé les dossiers :

- **❌ `src/presentation`** : Supprimé. Les composants sont désormais directement dans `src/components` (standard Next.js) et les hooks dans `src/hooks`.
- **❌ `src/utils` & `src/shared`** : Fusionnés dans `src/lib`. Tout code utilitaire doit aller dans `src/lib`.

---

## 📦 Organisation Détailée

### 1. UI Layer (`src/components/`)

Contient toute l'interface utilisateur.

- **`ui/`** : Design System (Boutons, Cards, Inputs).
- **`sections/`** : Blocs de page (Hero, FAQ, Footer).
- **`[feature]/`** : Composants liés à une feature (ex: `admin/`, `blog/`).

### 2. Logic Layer (`src/hooks/` & `src/lib/`)

- **`hooks/`** : Logique React réutilisable (`useIntersectionObserver`, `useAuth`).
- **`lib/`** : Fonctions pures, validateurs, formatters (`animations.ts`, `db.ts`).

### 3. Core Layer (`src/core/`)

Le cerveau de l'application, isolé de React.

- **`domain/`** : Règles métier (ex: "Un email doit contenir @").
- **`application/`** : Cas d'usage (ex: "Soumettre le formulaire de contact").

### 4. Infrastructure Layer (`src/infrastructure/`)

Les interactions avec le monde extérieur.

- **`persistence/`** : Base de données (PostgreSQL, Neon).
- **`external-services/`** : Emailing (Resend), APIs tierces.

---

## 🔄 Flux de Dépendances

```
UI (components/app) -> Application use cases -> Domain entities
                                             ^
                        Infrastructure implements Domain interfaces
```

Règles d'or :

1. **Domain** ne dépend de RIEN.
2. **Components** ne doivent pas importer **Infrastructure** directement (passer par Core).
3. **Lib** peut être utilisé partout.

---

**Mise à jour** : 2026-01-07
**Status** : Structure Optimisée & Clean ✅
