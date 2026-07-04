# 🏗️ Clean Architecture Next.js - Structure Granulaire Maximale

**Principe:** Subdivision par **Bounded Context** (DDD) + **Responsabilité Unique** (SOLID)

---

## 📁 Structure Complète Ultra-Granulaire

```
src/
│
├── app/                                    # UI Layer - Next.js App Router
│   ├── (public)/                          # Route group: Public pages
│   │   ├── page.tsx                       # Homepage
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── (marketing)/                       # Route group: Marketing pages
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   ├── _components/              # Private components (not routable)
│   │   │   │   ├── TeamSection.tsx
│   │   │   │   └── MissionStatement.tsx
│   │   │   └── metadata.ts
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── [serviceId]/
│   │   │   │   └── page.tsx
│   │   │   └── _components/
│   │   └── contact/
│   │       ├── page.tsx
│   │       └── _components/
│   │
│   ├── (auth)/                            # Route group: Authentication
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── _components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SocialLoginButtons.tsx
│   │   │   └── actions.ts                # Server Actions
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── (dashboard)/                       # Route group: Protected dashboard
│   │   ├── layout.tsx                     # Dashboard layout
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── leads/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [leadId]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/
│   │   │   │   └── _components/
│   │   │   ├── quotes/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── _components/                   # Shared dashboard components
│   │       ├── DashboardNav.tsx
│   │       └── DashboardHeader.tsx
│   │
│   ├── api/                               # API Routes (Controllers)
│   │   ├── contact/
│   │   │   ├── route.ts                  # POST /api/contact
│   │   │   ├── types.ts                  # DTOs specific to this endpoint
│   │   │   ├── validation.ts             # Endpoint-specific validation
│   │   │   ├── direct/
│   │   │   │   └── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts              # GET/PUT/DELETE /api/contact/:id
│   │   │       └── types.ts
│   │   │
│   │   ├── quote/
│   │   │   ├── route.ts
│   │   │   ├── types.ts
│   │   │   ├── validation.ts
│   │   │   ├── calculate/
│   │   │   │   └── route.ts              # POST /api/quote/calculate
│   │   │   └── [quoteId]/
│   │   │       ├── route.ts
│   │   │       ├── approve/
│   │   │       │   └── route.ts
│   │   │       └── reject/
│   │   │           └── route.ts
│   │   │
│   │   ├── lead-scoring/
│   │   │   ├── enrich/
│   │   │   │   └── route.ts
│   │   │   ├── score/
│   │   │   │   └── route.ts
│   │   │   └── bulk/
│   │   │       └── route.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   └── refresh/
│   │   │       └── route.ts
│   │   │
│   │   └── webhooks/
│   │       ├── resend/
│   │       │   └── route.ts
│   │       └── stripe/
│   │           └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx                         # Root layout
│   └── providers.tsx                      # Client providers
│
├── components/                            # Presentation Components
│   │
│   ├── ui/                               # Design System (Atomic)
│   │   ├── primitives/                   # Base primitives
│   │   │   ├── button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── ButtonGroup.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── TextArea.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── select/
│   │   │   ├── checkbox/
│   │   │   ├── radio/
│   │   │   └── switch/
│   │   │
│   │   ├── feedback/                     # Feedback components
│   │   │   ├── alert/
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── AlertTitle.tsx
│   │   │   │   ├── AlertDescription.tsx
│   │   │   │   └── index.ts
│   │   │   ├── toast/
│   │   │   ├── modal/
│   │   │   ├── dialog/
│   │   │   ├── loading/
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── ProgressBar.tsx
│   │   │   └── error/
│   │   │       ├── ErrorMessage.tsx
│   │   │       └── ErrorBoundary.tsx
│   │   │
│   │   ├── layout/                       # Layout components
│   │   │   ├── card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── CardHeader.tsx
│   │   │   │   ├── CardBody.tsx
│   │   │   │   ├── CardFooter.tsx
│   │   │   │   └── index.ts
│   │   │   ├── container/
│   │   │   ├── grid/
│   │   │   ├── stack/
│   │   │   └── divider/
│   │   │
│   │   ├── navigation/                   # Navigation components
│   │   │   ├── nav/
│   │   │   ├── breadcrumb/
│   │   │   ├── tabs/
│   │   │   └── pagination/
│   │   │
│   │   ├── data-display/                 # Data display
│   │   │   ├── table/
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── TableHeader.tsx
│   │   │   │   ├── TableRow.tsx
│   │   │   │   ├── TableCell.tsx
│   │   │   │   └── index.ts
│   │   │   ├── list/
│   │   │   ├── badge/
│   │   │   ├── avatar/
│   │   │   └── tag/
│   │   │
│   │   └── form/                         # Form components
│   │       ├── form-field/
│   │       ├── form-label/
│   │       ├── form-error/
│   │       └── form-helper/
│   │
│   ├── features/                         # Feature-specific Components (by Bounded Context)
│   │   │
│   │   ├── contact/                      # Contact Bounded Context
│   │   │   ├── forms/
│   │   │   │   ├── ContactForm/
│   │   │   │   │   ├── ContactForm.tsx
│   │   │   │   │   ├── ContactForm.test.tsx
│   │   │   │   │   ├── useContactForm.ts        # Local hook
│   │   │   │   │   ├── validation.ts
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SimpleContactForm/
│   │   │   │   └── DirectContactForm/
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   ├── ContactCard/
│   │   │   │   │   ├── ContactCard.tsx
│   │   │   │   │   ├── ContactCardHeader.tsx
│   │   │   │   │   ├── ContactCardBody.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── ContactListItem/
│   │   │   │
│   │   │   ├── modals/
│   │   │   │   ├── ContactDetailsModal/
│   │   │   │   └── ContactEditModal/
│   │   │   │
│   │   │   └── shared/                   # Shared within contact context
│   │   │       ├── ContactTypeSelector.tsx
│   │   │       ├── ContactStatusBadge.tsx
│   │   │       └── types.ts
│   │   │
│   │   ├── quote/                        # Quote Bounded Context
│   │   │   ├── wizard/
│   │   │   │   ├── QuoteWizard/
│   │   │   │   │   ├── QuoteWizard.tsx
│   │   │   │   │   ├── useQuoteWizard.ts
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── steps/
│   │   │   │       ├── ProjectTypeStep.tsx
│   │   │   │       ├── RequirementsStep.tsx
│   │   │   │       ├── ContactInfoStep.tsx
│   │   │   │       └── ReviewStep.tsx
│   │   │   │
│   │   │   ├── summary/
│   │   │   │   ├── QuoteSummary/
│   │   │   │   ├── QuoteEstimate/
│   │   │   │   └── QuoteBreakdown/
│   │   │   │
│   │   │   ├── list/
│   │   │   │   ├── QuoteList/
│   │   │   │   ├── QuoteListItem/
│   │   │   │   └── QuoteFilters/
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── QuoteStatusBadge.tsx
│   │   │       ├── PriceFormatter.tsx
│   │   │       └── types.ts
│   │   │
│   │   ├── lead-scoring/                 # Lead Scoring Bounded Context
│   │   │   ├── dashboard/
│   │   │   │   ├── LeadScoreDashboard/
│   │   │   │   ├── ScoreCard/
│   │   │   │   └── ScoreChart/
│   │   │   │
│   │   │   ├── enrichment/
│   │   │   │   ├── EnrichmentPanel/
│   │   │   │   ├── CompanyDataCard/
│   │   │   │   └── EmailVerificationBadge/
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── ScoreBadge.tsx
│   │   │       ├── PriorityIndicator.tsx
│   │   │       └── types.ts
│   │   │
│   │   ├── auth/                         # Auth Bounded Context
│   │   │   ├── login/
│   │   │   │   ├── LoginForm/
│   │   │   │   └── SocialLogin/
│   │   │   ├── register/
│   │   │   └── shared/
│   │   │       └── AuthGuard.tsx
│   │   │
│   │   └── admin/                        # Admin Bounded Context
│   │       ├── dashboard/
│   │       ├── analytics/
│   │       └── settings/
│   │
│   ├── layouts/                          # Layout Components
│   │   ├── site/
│   │   │   ├── SiteLayout/
│   │   │   ├── SiteHeader/
│   │   │   │   ├── SiteHeader.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   └── UserMenu.tsx
│   │   │   └── SiteFooter/
│   │   │       ├── SiteFooter.tsx
│   │   │       ├── FooterLinks.tsx
│   │   │       └── SocialLinks.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── DashboardLayout/
│   │       ├── DashboardSidebar/
│   │       └── DashboardHeader/
│   │
│   └── shared/                           # Truly Shared Components
│       ├── Logo.tsx
│       ├── ThemeToggle.tsx
│       └── LanguageSwitcher.tsx
│
├── domain/                               # Domain Layer (Pure Business Logic)
│   │
│   ├── contact/                          # Contact Bounded Context
│   │   ├── entities/
│   │   │   ├── Contact.ts
│   │   │   ├── Contact.test.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── value-objects/
│   │   │   ├── ContactId.ts
│   │   │   ├── ContactType.ts
│   │   │   ├── ContactStatus.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── aggregates/                   # DDD Aggregates
│   │   │   ├── ContactWithHistory.ts     # Contact + History entries
│   │   │   └── index.ts
│   │   │
│   │   ├── repositories/                 # Repository Interfaces
│   │   │   ├── IContactRepository.ts
│   │   │   ├── IContactHistoryRepository.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                     # Domain Services
│   │   │   ├── ContactValidationService.ts
│   │   │   ├── ContactDuplicateDetectionService.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── events/                       # Domain Events
│   │   │   ├── ContactCreatedEvent.ts
│   │   │   ├── ContactUpdatedEvent.ts
│   │   │   ├── ContactDeletedEvent.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── specifications/               # Business Rules (Specification Pattern)
│   │   │   ├── IsHighPriorityContactSpec.ts
│   │   │   ├── HasValidEmailSpec.ts
│   │   │   └── index.ts
│   │   │
│   │   └── errors/                       # Domain-specific Errors
│   │       ├── ContactNotFoundError.ts
│   │       ├── InvalidContactDataError.ts
│   │       └── index.ts
│   │
│   ├── quote/                            # Quote Bounded Context
│   │   ├── entities/
│   │   │   ├── Quote.ts
│   │   │   ├── QuoteItem.ts
│   │   │   ├── QuoteLineItem.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── value-objects/
│   │   │   ├── QuoteId.ts
│   │   │   ├── Money.ts
│   │   │   ├── Percentage.ts
│   │   │   ├── QuoteStatus.ts
│   │   │   ├── ProjectType.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── aggregates/
│   │   │   ├── QuoteWithItems.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── repositories/
│   │   │   ├── IQuoteRepository.ts
│   │   │   ├── IQuoteItemRepository.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── QuoteCalculationService.ts
│   │   │   ├── QuotePricingService.ts
│   │   │   ├── QuoteValidationService.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── events/
│   │   │   ├── QuoteCreatedEvent.ts
│   │   │   ├── QuoteApprovedEvent.ts
│   │   │   ├── QuoteRejectedEvent.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── specifications/
│   │   │   ├── IsValidQuoteAmountSpec.ts
│   │   │   ├── RequiresApprovalSpec.ts
│   │   │   └── index.ts
│   │   │
│   │   └── errors/
│   │       ├── QuoteNotFoundError.ts
│   │       ├── InvalidQuoteAmountError.ts
│   │       └── index.ts
│   │
│   ├── lead-scoring/                     # Lead Scoring Bounded Context
│   │   ├── entities/
│   │   │   ├── Lead.ts
│   │   │   ├── LeadScore.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── value-objects/
│   │   │   ├── LeadId.ts
│   │   │   ├── Score.ts
│   │   │   ├── Priority.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── LeadScoringService.ts
│   │   │   ├── LeadEnrichmentService.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── events/
│   │   │   ├── LeadScoredEvent.ts
│   │   │   ├── LeadEnrichedEvent.ts
│   │   │   └── index.ts
│   │   │
│   │   └── errors/
│   │       └── index.ts
│   │
│   └── shared/                           # Shared Domain (Shared Kernel)
│       ├── value-objects/
│       │   ├── Email.ts
│       │   ├── PhoneNumber.ts
│       │   ├── Url.ts
│       │   ├── DateRange.ts
│       │   └── index.ts
│       │
│       ├── interfaces/
│       │   ├── IEntity.ts
│       │   ├── IValueObject.ts
│       │   ├── IAggregate.ts
│       │   └── index.ts
│       │
│       └── errors/
│           ├── DomainError.ts
│           ├── ValidationError.ts
│           └── index.ts
│
├── application/                          # Application Layer (Use Cases)
│   │
│   ├── contact/                          # Contact Use Cases
│   │   ├── commands/                     # Write operations (CQRS)
│   │   │   ├── create-contact/
│   │   │   │   ├── CreateContactCommand.ts
│   │   │   │   ├── CreateContactHandler.ts
│   │   │   │   ├── CreateContactValidator.ts
│   │   │   │   └── index.ts
│   │   │   ├── update-contact/
│   │   │   │   ├── UpdateContactCommand.ts
│   │   │   │   ├── UpdateContactHandler.ts
│   │   │   │   └── index.ts
│   │   │   ├── delete-contact/
│   │   │   └── submit-contact-form/
│   │   │       ├── SubmitContactFormCommand.ts
│   │   │       ├── SubmitContactFormHandler.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── queries/                      # Read operations (CQRS)
│   │   │   ├── get-contact-by-id/
│   │   │   │   ├── GetContactByIdQuery.ts
│   │   │   │   ├── GetContactByIdHandler.ts
│   │   │   │   └── index.ts
│   │   │   ├── list-contacts/
│   │   │   │   ├── ListContactsQuery.ts
│   │   │   │   ├── ListContactsHandler.ts
│   │   │   │   └── index.ts
│   │   │   └── search-contacts/
│   │   │
│   │   ├── dto/                          # Data Transfer Objects
│   │   │   ├── ContactDTO.ts
│   │   │   ├── CreateContactDTO.ts
│   │   │   ├── UpdateContactDTO.ts
│   │   │   ├── ContactListDTO.ts
│   │   │   └── index.ts
│   │   │
│   │   └── mappers/
│   │       ├── ContactMapper.ts          # Entity ↔ DTO
│   │       └── index.ts
│   │
│   ├── quote/                            # Quote Use Cases
│   │   ├── commands/
│   │   │   ├── create-quote/
│   │   │   │   ├── CreateQuoteCommand.ts
│   │   │   │   ├── CreateQuoteHandler.ts
│   │   │   │   └── index.ts
│   │   │   ├── calculate-quote/
│   │   │   │   ├── CalculateQuoteCommand.ts
│   │   │   │   ├── CalculateQuoteHandler.ts
│   │   │   │   └── index.ts
│   │   │   ├── approve-quote/
│   │   │   ├── reject-quote/
│   │   │   └── submit-quote-wizard/
│   │   │
│   │   ├── queries/
│   │   │   ├── get-quote-by-id/
│   │   │   ├── list-quotes/
│   │   │   └── get-quote-statistics/
│   │   │
│   │   ├── dto/
│   │   │   ├── QuoteDTO.ts
│   │   │   ├── CreateQuoteDTO.ts
│   │   │   ├── QuoteEstimateDTO.ts
│   │   │   └── index.ts
│   │   │
│   │   └── mappers/
│   │       ├── QuoteMapper.ts
│   │       └── index.ts
│   │
│   ├── lead-scoring/                     # Lead Scoring Use Cases
│   │   ├── commands/
│   │   │   ├── score-lead/
│   │   │   ├── enrich-lead/
│   │   │   └── bulk-score-leads/
│   │   │
│   │   ├── queries/
│   │   │   ├── get-lead-score/
│   │   │   └── get-lead-statistics/
│   │   │
│   │   ├── dto/
│   │   └── mappers/
│   │
│   ├── shared/                           # Shared Application Layer
│   │   ├── interfaces/
│   │   │   ├── ICommandHandler.ts
│   │   │   ├── IQueryHandler.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── base/
│   │   │   ├── BaseCommand.ts
│   │   │   ├── BaseQuery.ts
│   │   │   └── BaseDTO.ts
│   │   │
│   │   └── errors/
│   │       ├── ApplicationError.ts
│   │       ├── ValidationError.ts
│   │       └── index.ts
│   │
│   └── ports/                            # Dependency Inversion (Interfaces)
│       ├── email/
│       │   ├── IEmailService.ts
│       │   ├── ISendEmailPort.ts
│       │   └── index.ts
│       │
│       ├── storage/
│       │   ├── IStoragePort.ts
│       │   ├── IFileStoragePort.ts
│       │   └── index.ts
│       │
│       ├── cache/
│       │   ├── ICachePort.ts
│       │   └── index.ts
│       │
│       ├── notification/
│       │   ├── INotificationPort.ts
│       │   └── index.ts
│       │
│       └── analytics/
│           ├── IAnalyticsPort.ts
│           └── index.ts
│
├── infrastructure/                       # Infrastructure Layer
│   │
│   ├── database/                         # Database implementations
│   │   ├── postgres/
│   │   │   ├── connection.ts
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_contacts.sql
│   │   │   │   ├── 002_create_quotes.sql
│   │   │   │   └── index.ts
│   │   │   ├── seeds/
│   │   │   │   └── seed.ts
│   │   │   └── repositories/
│   │   │       ├── PostgresContactRepository.ts
│   │   │       ├── PostgresQuoteRepository.ts
│   │   │       └── index.ts
│   │   │
│   │   └── schemas/
│   │       ├── contact.schema.ts
│   │       ├── quote.schema.ts
│   │       └── index.ts
│   │
│   ├── cache/                            # Cache implementations
│   │   ├── redis/
│   │   │   ├── connection.ts
│   │   │   ├── RedisCache.ts
│   │   │   └── index.ts
│   │   │
│   │   └── memory/
│   │       ├── MemoryCache.ts
│   │       └── index.ts
│   │
│   ├── email/                            # Email adapters
│   │   ├── resend/
│   │   │   ├── ResendAdapter.ts
│   │   │   ├── templates/
│   │   │   │   ├── base/
│   │   │   │   │   ├── BaseTemplate.ts
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── components/
│   │   │   │   ├── contact/
│   │   │   │   │   ├── ContactConfirmation.ts
│   │   │   │   │   └── TeamNotification.ts
│   │   │   │   └── quote/
│   │   │   │       ├── QuoteConfirmation.ts
│   │   │   │       └── QuoteApproval.ts
│   │   │   └── index.ts
│   │   │
│   │   └── smtp/
│   │       └── SmtpAdapter.ts
│   │
│   ├── external-apis/                    # External API adapters
│   │   ├── hunter/
│   │   │   ├── HunterApiAdapter.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── brandfetch/
│   │   │   ├── BrandfetchApiAdapter.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── recaptcha/
│   │       ├── RecaptchaAdapter.ts
│   │       └── index.ts
│   │
│   ├── storage/                          # File storage
│   │   ├── s3/
│   │   │   ├── S3StorageAdapter.ts
│   │   │   └── index.ts
│   │   │
│   │   └── local/
│   │       ├── LocalStorageAdapter.ts
│   │       └── index.ts
│   │
│   ├── security/                         # Security implementations
│   │   ├── rate-limiting/
│   │   │   ├── RedisRateLimiter.ts
│   │   │   ├── MemoryRateLimiter.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── csrf/
│   │   │   ├── CsrfTokenManager.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── encryption/
│   │   │   ├── AesEncryption.ts
│   │   │   └── index.ts
│   │   │
│   │   └── auth/
│   │       ├── jwt/
│   │       │   ├── JwtService.ts
│   │       │   └── index.ts
│   │       └── session/
│   │           └── SessionManager.ts
│   │
│   ├── logging/                          # Logging implementations
│   │   ├── winston/
│   │   │   ├── WinstonLogger.ts
│   │   │   ├── transports/
│   │   │   │   ├── console.ts
│   │   │   │   ├── file.ts
│   │   │   │   └── cloudwatch.ts
│   │   │   └── index.ts
│   │   │
│   │   └── pino/
│   │       └── PinoLogger.ts
│   │
│   ├── monitoring/                       # Monitoring & Observability
│   │   ├── sentry/
│   │   │   ├── SentryMonitoring.ts
│   │   │   └── index.ts
│   │   │
│   │   └── datadog/
│   │       └── DatadogMonitoring.ts
│   │
│   └── mappers/                          # Infrastructure mappers
│       ├── contact/
│       │   ├── ContactDatabaseMapper.ts  # Entity ↔ Database
│       │   └── index.ts
│       │
│       └── quote/
│           ├── QuoteDatabaseMapper.ts
│           └── index.ts
│
├── lib/                                  # Shared Technical Utilities
│   ├── api/
│   │   ├── middleware/
│   │   │   ├── cors.ts
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts           # ✅ Déjà créé
│   │   │   ├── error-handler.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── client/
│   │   │   ├── http-client.ts
│   │   │   ├── api-error.ts
│   │   │   └── index.ts
│   │   │
│   │   └── helpers/
│   │       ├── response.ts
│   │       ├── headers.ts
│   │       └── index.ts
│   │
│   ├── validation/
│   │   ├── schemas/                    # Validation schemas
│   │   │   ├── contact.schema.ts
│   │   │   ├── quote.schema.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── rules/                      # Custom validation rules
│   │   │   ├── email-rules.ts
│   │   │   ├── phone-rules.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                    # ✅ Déjà créé
│   │
│   ├── utils/
│   │   ├── string/
│   │   │   ├── sanitize.ts
│   │   │   ├── format.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── date/
│   │   │   ├── formatters.ts
│   │   │   ├── parsers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── number/
│   │   │   ├── formatters.ts
│   │   │   └── index.ts
│   │   │
│   │   └── array/
│   │       ├── chunk.ts
│   │       ├── unique.ts
│   │       └── index.ts
│   │
│   ├── constants/
│   │   ├── api.constants.ts
│   │   ├── app.constants.ts
│   │   ├── validation.constants.ts
│   │   └── index.ts
│   │
│   └── types/
│       ├── common.types.ts
│       ├── api.types.ts
│       └── index.ts
│
├── hooks/                                # React Hooks
│   ├── use-cases/                        # Hooks for use cases
│   │   ├── contact/
│   │   │   ├── useSubmitContact.ts
│   │   │   ├── useGetContact.ts
│   │   │   ├── useListContacts.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── quote/
│   │   │   ├── useCreateQuote.ts
│   │   │   ├── useCalculateQuote.ts
│   │   │   └── index.ts
│   │   │
│   │   └── lead-scoring/
│   │       ├── useScoreLead.ts
│   │       └── index.ts
│   │
│   ├── shared/                           # Shared hooks
│   │   ├── useDebounce.ts
│   │   ├── useThrottle.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   └── forms/                            # Form hooks
│       ├── useForm.ts
│       ├── useFormValidation.ts
│       └── index.ts
│
├── config/                               # Configuration
│   ├── environment/
│   │   ├── env.ts
│   │   ├── env.schema.ts
│   │   └── index.ts
│   │
│   ├── dependencies/                     # DI Container
│   │   ├── contact.dependencies.ts
│   │   ├── quote.dependencies.ts
│   │   ├── shared.dependencies.ts
│   │   └── index.ts
│   │
│   ├── feature-flags/
│   │   ├── flags.ts
│   │   └── index.ts
│   │
│   └── app/
│       ├── seo.config.ts
│       ├── theme.config.ts
│       └── index.ts
│
├── types/                                # Global TypeScript types
│   ├── global.d.ts
│   ├── next-auth.d.ts
│   ├── environment.d.ts
│   └── index.d.ts
│
└── tests/                                # Global test utilities
    ├── setup/
    │   ├── jest.setup.ts
    │   ├── test-utils.tsx
    │   └── index.ts
    │
    ├── fixtures/
    │   ├── contact.fixtures.ts
    │   ├── quote.fixtures.ts
    │   └── index.ts
    │
    ├── mocks/
    │   ├── repositories/
    │   │   ├── MockContactRepository.ts
    │   │   └── index.ts
    │   │
    │   ├── services/
    │   │   ├── MockEmailService.ts
    │   │   └── index.ts
    │   │
    │   └── handlers/
    │       ├── contact.handlers.ts       # MSW handlers
    │       └── index.ts
    │
    └── e2e/
        ├── contact/
        │   └── submit-contact.spec.ts
        └── quote/
            └── create-quote.spec.ts
```

---

## 📐 Règles de Subdivision

### 1. **Par Bounded Context** (DDD)

Chaque domaine métier a sa propre arborescence complète :

```
domain/contact/      ← Bounded Context
├── entities/
├── value-objects/
├── services/
└── repositories/
```

### 2. **Par Responsabilité** (SOLID)

Chaque dossier a UNE responsabilité claire :

```
contact/forms/ContactForm/
├── ContactForm.tsx        ← UI only
├── useContactForm.ts      ← Logic
├── validation.ts          ← Validation
├── types.ts               ← Types
└── index.ts               ← Exports
```

### 3. **Par Pattern** (CQRS, Repository, etc.)

```
application/contact/
├── commands/    ← Write operations
└── queries/     ← Read operations
```

---

## 🎯 Avantages de Cette Structure

✅ **Scalabilité:** Ajout de nouveaux bounded contexts facile  
✅ **Maintenabilité:** Chaque fichier < 200 lignes  
✅ **Testabilité:** Mock facile grâce aux interfaces  
✅ **Collaboration:** Équipes peuvent travailler sur différents contexts  
✅ **Performance:** Tree-shaking optimal avec index.ts

---

**Prochaine étape:** Voulez-vous que je crée un exemple complet d'un bounded context (ex: Contact) avec tous les fichiers ?
