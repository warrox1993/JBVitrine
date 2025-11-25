# 📁 Clean Architecture - Structure de Dossiers

Cette structure suit les principes de Clean Architecture avec une séparation claire des responsabilités en 4 couches principales.

## 🏗️ Vue d'ensemble

```
src/
├── core/                           # Cœur métier (indépendant de frameworks)
│   ├── domain/                    # Couche Domain (Entities, Value Objects, Business Rules)
│   └── application/               # Couche Application (Use Cases, DTOs, Orchestration)
├── infrastructure/                # Couche Infrastructure (Implémentations techniques)
├── presentation/                  # Couche Presentation (UI, Components, Hooks)
├── config/                        # Configuration et Dependency Injection
└── app/                          # Next.js App Router (routing uniquement)
```

---

## 📦 Couche Domain (`core/domain/`)

**Responsabilité** : Contient la logique métier pure, indépendante de toute technologie.

### Contextes (Bounded Contexts)

#### 🔹 Contact (`domain/contact/`)

```
domain/contact/
├── entities/          # Entités métier (Contact, ContactRequest, etc.)
├── value-objects/     # Objects valeur (Email, PhoneNumber, etc.)
├── services/          # Services du domaine (validation métier complexe)
├── repositories/      # Interfaces des repositories (IContactRepository)
└── events/           # Événements du domaine (ContactSubmitted, etc.)
```

#### 🔹 Quote (`domain/quote/`)

```
domain/quote/
├── entities/          # Entités (Quote, QuoteItem, Service)
├── value-objects/     # Objects valeur (Money, ProjectType, Budget)
├── services/          # Services (PricingService, QuoteCalculator)
├── repositories/      # Interfaces (IQuoteRepository)
└── events/           # Événements (QuoteCreated, QuoteApproved)
```

#### 🔹 Lead Scoring (`domain/lead-scoring/`)

```
domain/lead-scoring/
├── entities/          # Entités (Lead, Score, ScoreHistory)
├── value-objects/     # Objects valeur (ScoreValue, Priority, Source)
├── services/          # Services (LeadScoringService, EnrichmentService)
├── repositories/      # Interfaces (ILeadRepository, IScoreRepository)
└── events/           # Événements (LeadScored, LeadEnriched)
```

#### 🔹 Admin (`domain/admin/`)

```
domain/admin/
├── entities/          # Entités (Admin, Permission, Role)
├── value-objects/     # Objects valeur (AdminLevel, AccessRight)
├── services/          # Services (AdminAuthService)
├── repositories/      # Interfaces (IAdminRepository)
└── events/           # Événements (AdminLoggedIn, AdminActionPerformed)
```

#### 🔹 Auth (`domain/auth/`)

```
domain/auth/
├── entities/          # Entités (User, Session, Token)
├── value-objects/     # Objects valeur (Password, SessionId, RefreshToken)
├── services/          # Services (AuthService, TokenService)
├── repositories/      # Interfaces (IUserRepository, ISessionRepository)
└── events/           # Événements (UserAuthenticated, SessionExpired)
```

#### 🔹 Shared (`domain/shared/`)

```
domain/shared/
├── value-objects/     # VO réutilisables (Email, PhoneNumber, Money, Date)
├── errors/           # Erreurs du domaine (DomainError, ValidationError)
├── types/            # Types partagés
└── interfaces/       # Interfaces communes
```

---

## 🎯 Couche Application (`core/application/`)

**Responsabilité** : Orchestration des use cases, coordination entre Domain et Infrastructure.

### Structure par contexte (CQRS Pattern)

#### 🔹 Contact (`application/contact/`)

```
application/contact/
├── commands/          # Commandes (SubmitContactCommand, DeleteContactCommand)
│   ├── submit-contact/
│   │   ├── SubmitContactCommand.ts
│   │   ├── SubmitContactHandler.ts
│   │   └── SubmitContactResult.ts
│   └── index.ts
├── queries/          # Requêtes (GetContactQuery, ListContactsQuery)
│   ├── get-contact/
│   │   ├── GetContactQuery.ts
│   │   ├── GetContactHandler.ts
│   │   └── ContactDto.ts
│   └── index.ts
├── dtos/             # Data Transfer Objects (entrée/sortie)
├── mappers/          # Mappers (Domain <-> DTO)
└── validators/       # Validateurs d'application
```

#### 🔹 Quote (`application/quote/`)

```
application/quote/
├── commands/          # CreateQuoteCommand, UpdateQuoteCommand
├── queries/          # GetQuoteQuery, ListQuotesQuery
├── dtos/             # QuoteDto, QuoteItemDto
├── mappers/          # QuoteMapper, QuoteItemMapper
└── validators/       # QuoteValidator
```

#### 🔹 Lead Scoring (`application/lead-scoring/`)

```
application/lead-scoring/
├── commands/          # ScoreLeadCommand, EnrichLeadCommand
├── queries/          # GetLeadScoreQuery, GetLeadHistoryQuery
├── dtos/             # LeadScoreDto, EnrichmentDto
├── mappers/          # LeadMapper, ScoreMapper
└── validators/       # LeadValidator
```

#### 🔹 Admin (`application/admin/`)

```
application/admin/
├── commands/          # CreateAdminCommand, UpdatePermissionsCommand
├── queries/          # GetAdminQuery, ListAdminsQuery
├── dtos/             # AdminDto, PermissionDto
├── mappers/          # AdminMapper
└── validators/       # AdminValidator
```

#### 🔹 Auth (`application/auth/`)

```
application/auth/
├── commands/          # LoginCommand, LogoutCommand, RefreshTokenCommand
├── queries/          # GetCurrentUserQuery, ValidateSessionQuery
├── dtos/             # LoginDto, TokenDto, UserDto
├── mappers/          # UserMapper, SessionMapper
└── validators/       # LoginValidator, PasswordValidator
```

#### 🔹 Shared (`application/shared/`)

```
application/shared/
├── pagination/        # Pagination utilities (PageRequest, PageResult)
├── sorting/          # Sorting utilities (SortOrder, SortField)
└── filtering/        # Filtering utilities (FilterCriteria)
```

---

## 🔌 Couche Infrastructure (`infrastructure/`)

**Responsabilité** : Implémentations concrètes des interfaces, intégrations externes.

### Persistence (`infrastructure/persistence/`)

```
infrastructure/persistence/
├── contact/          # ContactRepositoryImpl, ContactMapper
├── quote/           # QuoteRepositoryImpl, QuoteMapper
├── lead-scoring/    # LeadRepositoryImpl, ScoreRepositoryImpl
├── admin/           # AdminRepositoryImpl
└── auth/            # UserRepositoryImpl, SessionRepositoryImpl
```

### Services Externes (`infrastructure/external-services/`)

```
infrastructure/external-services/
├── email/           # ResendEmailService, EmailTemplates
├── sms/             # SmsService (Twilio, etc.)
├── analytics/       # AnalyticsService (GA, Mixpanel)
├── recaptcha/       # RecaptchaEnterpriseService
└── enrichment/      # HunterService, BrandfetchService
```

### Cross-cutting (`infrastructure/`)

```
infrastructure/
├── cache/           # RedisCache, CacheService
├── rate-limiting/   # RateLimitService, RedisRateLimiter
├── logging/         # Logger, SecurityLogger
└── monitoring/      # Monitoring, HealthChecks
```

---

## 🎨 Couche Presentation (`presentation/`)

**Responsabilité** : Interface utilisateur, composants React, hooks, view models.

### Components (`presentation/components/`)

```
presentation/components/
├── contact/         # ContactForm, ContactList, ContactCard
├── quote/          # QuoteForm, QuoteBuilder, QuotePreview
├── admin/          # AdminDashboard, AdminTable, UserManagement
├── auth/           # LoginForm, RegisterForm, PasswordReset
└── shared/         # Button, Input, Modal, Toast (Design System)
```

### Hooks (`presentation/hooks/`)

```
presentation/hooks/
├── contact/         # useSubmitContact, useContactList
├── quote/          # useCreateQuote, useQuoteList
├── admin/          # useAdminDashboard, useUserManagement
├── auth/           # useAuth, useLogin, useSession
└── shared/         # useDebounce, useLocalStorage, useApi
```

### View Models (`presentation/view-models/`)

```
presentation/view-models/
├── contact/         # ContactViewModel, ContactListViewModel
├── quote/          # QuoteViewModel, QuoteBuilderViewModel
├── admin/          # AdminDashboardViewModel
└── auth/           # LoginViewModel, ProfileViewModel
```

---

## ⚙️ Configuration (`config/`)

**Responsabilité** : Configuration globale, dependency injection.

```
config/
├── dependencies/    # Container DI, ServiceRegistry
│   ├── container.ts
│   ├── contact.dependencies.ts
│   ├── quote.dependencies.ts
│   └── index.ts
└── environment/    # Variables d'environnement, configuration
    ├── env.ts
    ├── config.ts
    └── index.ts
```

---

## 📋 Conventions de Nommage

### Fichiers et Dossiers

- **Dossiers** : `kebab-case` (ex: `lead-scoring`, `value-objects`)
- **Fichiers** : `PascalCase.ts` pour classes/components, `camelCase.ts` pour functions
- **Index** : Toujours un `index.ts` par dossier pour exports

### Code

- **Classes/Interfaces** : `PascalCase` (ex: `Contact`, `IContactRepository`)
- **Functions/Variables** : `camelCase` (ex: `submitContact`, `userData`)
- **Constants** : `SCREAMING_SNAKE_CASE` (ex: `MAX_RETRY_COUNT`)
- **Types** : `PascalCase` avec suffixe (ex: `ContactType`, `ContactDto`)

### Suffixes Spécifiques

- **Entities** : Pas de suffixe (ex: `Contact`, `Quote`)
- **Value Objects** : Pas de suffixe (ex: `Email`, `Money`)
- **DTOs** : Suffixe `Dto` (ex: `ContactDto`, `QuoteDto`)
- **Interfaces Repository** : Préfixe `I` (ex: `IContactRepository`)
- **Implémentations** : Suffixe `Impl` (ex: `ContactRepositoryImpl`)
- **Commands** : Suffixe `Command` (ex: `SubmitContactCommand`)
- **Handlers** : Suffixe `Handler` (ex: `SubmitContactHandler`)
- **Services** : Suffixe `Service` (ex: `LeadScoringService`)

---

## 🔄 Flux de Dépendances

```
UI Layer (presentation/)
    ↓ depends on
Application Layer (core/application/)
    ↓ depends on
Domain Layer (core/domain/)
    ↑ implemented by
Infrastructure Layer (infrastructure/)
```

**Règles strictes** :

- ✅ Domain ne dépend de RIEN
- ✅ Application dépend uniquement de Domain
- ✅ Infrastructure implémente les interfaces de Domain
- ✅ Presentation dépend de Application (use cases) et Domain (types)
- ❌ Domain NE DOIT JAMAIS dépendre de Infrastructure ou Presentation

---

## 📝 Exemple : Flow complet Contact

```
1. User clique "Submit" dans ContactForm
   → presentation/components/contact/ContactForm.tsx

2. Component utilise le hook
   → presentation/hooks/contact/useSubmitContact.ts

3. Hook appelle un use case
   → core/application/contact/commands/submit-contact/SubmitContactHandler.ts

4. Handler crée une entité domain
   → core/domain/contact/entities/Contact.ts

5. Handler utilise le repository (interface)
   → core/domain/contact/repositories/IContactRepository.ts

6. Infrastructure implémente le repository
   → infrastructure/persistence/contact/ContactRepositoryImpl.ts

7. Infrastructure envoie l'email
   → infrastructure/external-services/email/ResendEmailService.ts
```

---

## 🎯 Prochaines Étapes

1. ✅ Créer tous les dossiers
2. ⏳ Créer les fichiers index.ts pour chaque dossier
3. ⏳ Implémenter Contact context (exemple complet)
4. ⏳ Dupliquer le pattern pour Quote, Lead Scoring, etc.
5. ⏳ Configurer le Dependency Injection Container
6. ⏳ Migrer les routes API existantes
7. ⏳ Créer les tests unitaires

---

**Date de création** : 2025-11-21  
**Status** : Structure créée ✅ | Implémentation en cours ⏳
