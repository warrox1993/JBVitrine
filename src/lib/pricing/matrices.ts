import {
  ProjectType,
  PricingMatrix,
} from "@/components/features/contact/QuoteWizard/types";

export const pricingMatrices: Record<ProjectType, PricingMatrix> = {
  siteVitrine: {
    base: 2000,
    features: {
      // Périmètre (scope)
      "pages-1-5": { min: 0, max: 0 }, // Inclus dans base
      "pages-6-10": { min: 500, max: 800 },
      "pages-11-20": { min: 1200, max: 1800 },
      "pages-20+": { min: 2500, max: 4000 },

      // Types de contenu (content)
      blog: { min: 800, max: 1200 },
      portfolio: { min: 600, max: 1000 },
      "team-members": { min: 300, max: 500 },
      testimonials: { min: 400, max: 600 },
      "case-studies": { min: 800, max: 1200 },
      "faq-section": { min: 300, max: 500 },
      "video-gallery": { min: 400, max: 700 },

      // Fonctionnalités interactives (features)
      "contact-form-basic": { min: 0, max: 0 }, // Inclus
      "contact-advanced": { min: 500, max: 800 },
      "quote-wizard": { min: 1200, max: 2000 },
      "booking-calendar": { min: 1500, max: 2500 },
      "live-chat": { min: 400, max: 700 },
      "search-engine": { min: 600, max: 1000 },
      "map-locations": { min: 300, max: 500 },
      "newsletter-signup": { min: 300, max: 500 },

      // Espace utilisateur (user-area)
      "login-area": { min: 1200, max: 2000 },
      "document-downloads": { min: 600, max: 1000 },
      "user-dashboard": { min: 1800, max: 3000 },

      // International (international)
      "multi-language-2": { min: 800, max: 1200 },
      "multi-language-3": { min: 1400, max: 2000 },
      "multi-language-4plus": { min: 2000, max: 3500 },

      // SEO & Référencement (seo)
      "seo-basic": { min: 0, max: 0 }, // Inclus dans base
      "seo-advanced": { min: 600, max: 1000 },
      "seo-expert": { min: 1500, max: 2500 },
      "seo-local": { min: 400, max: 700 },
      "seo-technical": { min: 500, max: 900 },
      "seo-content-optimization": { min: 800, max: 1500 },
      "seo-breadcrumbs": { min: 200, max: 400 },
      "seo-redirections": { min: 300, max: 600 },
      "seo-blog-strategy": { min: 1200, max: 2000 },
      "seo-competitive-analysis": { min: 800, max: 1200 },
      "seo-international": { min: 600, max: 1000 },

      // Performance & technique (performance)
      "pwa-support": { min: 1000, max: 1800 },
      "advanced-seo": { min: 600, max: 1000 },
      "performance-optimization": { min: 800, max: 1400 },
      "analytics-setup": { min: 400, max: 700 },

      // Intégrations (integrations)
      "crm-integration": { min: 800, max: 1500 },
      "email-marketing-integration": { min: 500, max: 900 },
      "social-media-feed": { min: 400, max: 700 },
      "payment-gateway": { min: 800, max: 1200 },

      // Services additionnels (services)
      copywriting: { min: 800, max: 1800 }, // 800-1200 mots/page
      "professional-photography": { min: 600, max: 1200 }, // Half-day
      "video-production": { min: 1500, max: 3000 }, // 1-2 min
      "logo-design": { min: 800, max: 1500 },
      "brand-identity": { min: 2500, max: 5000 }, // Charte complète
    },
    design: {
      template: 0,
      "semi-custom": 1000,
      custom: 3000,
    },
    seo: {
      none: 0,
      basic: 500,
      advanced: 1500,
    },
    services: {
      maintenance: 60, // per month
      training: 400, // 2-3h session
      hosting: 0, // 1 year included
    },
  },

  ecommerce: {
    base: 5000,
    features: {
      // Taille du catalogue (catalog-size)
      "products-50": { min: 0, max: 0 }, // Inclus dans base
      "products-50-200": { min: 1000, max: 1500 },
      "products-200-500": { min: 2500, max: 4000 },
      "products-500-2000": { min: 5000, max: 8000 },
      "products-2000+": { min: 10000, max: 15000 },

      // Gestion produits (product-management)
      "product-variants": { min: 0, max: 0 }, // Inclus
      "product-bundles": { min: 600, max: 1000 },
      "product-reviews": { min: 500, max: 800 },
      "product-questions": { min: 400, max: 700 },
      wishlist: { min: 400, max: 600 },
      "compare-products": { min: 600, max: 1000 },
      "product-recommendations": { min: 1200, max: 2000 }, // AI-based
      "recently-viewed": { min: 300, max: 500 },
      "quick-view": { min: 400, max: 600 },

      // Paiement (payment)
      "payment-stripe": { min: 0, max: 0 }, // Inclus
      "payment-mollie": { min: 800, max: 1200 },
      "payment-paypal": { min: 600, max: 900 },
      "payment-apple-google": { min: 500, max: 800 },
      "payment-klarna": { min: 800, max: 1200 },
      "payment-wire-transfer": { min: 300, max: 500 },
      "payment-invoice": { min: 800, max: 1400 }, // B2B

      // Stock & Logistique (inventory)
      "stock-management": { min: 0, max: 0 }, // Inclus
      "stock-reservations": { min: 600, max: 1000 },
      backorders: { min: 500, max: 800 },
      "product-availability-alerts": { min: 400, max: 700 },

      // Livraison (shipping)
      "shipping-flat-rate": { min: 0, max: 0 }, // Inclus
      "shipping-calculation": { min: 800, max: 1200 },
      "shipping-zones": { min: 600, max: 1000 },
      "shipping-carrier-integration": { min: 1200, max: 2000 },
      "order-tracking": { min: 600, max: 1000 },
      "click-collect": { min: 500, max: 800 },
      "shipping-free-threshold": { min: 300, max: 500 },
      "delivery-date-picker": { min: 800, max: 1200 },

      // Marketing & Promotions (marketing)
      "promo-codes": { min: 400, max: 700 },
      "flash-sales": { min: 600, max: 1000 },
      "bulk-discounts": { min: 500, max: 800 },
      "loyalty-program": { min: 1000, max: 1800 },
      "gift-cards": { min: 800, max: 1400 },
      newsletter: { min: 400, max: 700 },
      "abandoned-cart": { min: 800, max: 1200 },
      "referral-program": { min: 1000, max: 1600 },
      "cross-sell-upsell": { min: 600, max: 1000 },

      // Expérience client (customer-experience)
      "guest-checkout": { min: 0, max: 0 }, // Inclus
      "one-page-checkout": { min: 600, max: 1000 },
      "customer-accounts": { min: 800, max: 1400 },
      "order-returns": { min: 800, max: 1400 },
      "order-invoices": { min: 500, max: 800 },
      "live-chat": { min: 500, max: 900 },

      // B2B (b2b)
      "b2b-pricing": { min: 1200, max: 2000 },
      "b2b-wholesale": { min: 1500, max: 2500 },
      "b2b-quotes": { min: 1000, max: 1800 },
      "b2b-quick-order": { min: 800, max: 1400 },

      // International (international)
      "multi-currency": { min: 500, max: 800 },
      "multi-language-shop": { min: 1500, max: 2500 },
      "tax-management": { min: 800, max: 1400 },
      "gdpr-compliance": { min: 600, max: 1000 },

      // Intégrations (integrations)
      "crm-integration": { min: 1000, max: 1800 },
      "email-marketing-integration": { min: 600, max: 1000 },
      "erp-integration": { min: 2000, max: 4000 },
      "accounting-integration": { min: 1200, max: 2200 },
      "google-merchant": { min: 500, max: 900 },
      "facebook-catalog": { min: 500, max: 900 },
      "marketplace-sync": { min: 1500, max: 3000 },
    },
    design: {
      template: 0,
      "semi-custom": 1200,
      custom: 3500,
    },
    seo: {
      none: 0,
      basic: 600,
      advanced: 1800,
    },
    services: {
      maintenance: 100, // per month
      training: 500, // 4h session
      hosting: 200, // per year
    },
  },

  appWeb: {
    base: 10000,
    features: {
      // Authentification & Sécurité (auth)
      "auth-basic": { min: 0, max: 0 }, // Inclus
      "auth-social": { min: 800, max: 1400 },
      "auth-2fa": { min: 600, max: 1000 },
      "auth-sso": { min: 2000, max: 3500 },
      "auth-ldap": { min: 2500, max: 4000 },
      "auth-magic-link": { min: 600, max: 1000 },

      // Gestion utilisateurs (users)
      "user-profiles": { min: 0, max: 0 }, // Inclus
      "user-roles": { min: 800, max: 1400 },
      "user-permissions": { min: 1200, max: 2000 },
      "user-groups": { min: 800, max: 1400 },
      "user-impersonation": { min: 500, max: 900 },
      "user-activity-log": { min: 1000, max: 1800 },

      // Tableau de bord (dashboard)
      "dashboard-basic": { min: 0, max: 0 }, // Inclus
      "dashboard-advanced": { min: 3500, max: 6000 },
      "dashboard-analytics": { min: 5000, max: 8000 },

      // Gestion de données (data)
      "crud-simple": { min: 0, max: 0 }, // Inclus
      "crud-medium": { min: 3000, max: 5000 },
      "crud-complex": { min: 6000, max: 10000 },
      "data-import-export": { min: 1000, max: 1800 },
      "data-bulk-operations": { min: 800, max: 1400 },
      "data-versioning": { min: 1500, max: 2500 },
      "data-validation": { min: 800, max: 1400 },

      // Workflows & Automatisation (workflow)
      "workflow-basic": { min: 1500, max: 2500 },
      "workflow-advanced": { min: 3500, max: 6000 },
      "workflow-visual-builder": { min: 5000, max: 9000 },
      "approval-system": { min: 1500, max: 2500 },
      "task-automation": { min: 2000, max: 3500 },

      // Notifications & Communication (notifications)
      "email-notifications": { min: 500, max: 900 },
      "push-notifications": { min: 800, max: 1400 },
      "sms-notifications": { min: 600, max: 1000 },
      "in-app-notifications": { min: 800, max: 1400 },
      "notification-preferences": { min: 500, max: 900 },

      // Fichiers & Documents (files)
      "file-upload": { min: 800, max: 1400 },
      "file-management": { min: 1500, max: 2500 },
      "file-cloud-storage": { min: 600, max: 1000 },
      "pdf-generation": { min: 1000, max: 1800 },
      "excel-generation": { min: 600, max: 1000 },
      "document-signing": { min: 1200, max: 2200 },

      // Recherche & Filtres (search)
      "search-basic": { min: 500, max: 900 },
      "search-advanced": { min: 1500, max: 2800 },
      "filters-advanced": { min: 1000, max: 1800 },
      "saved-searches": { min: 600, max: 1000 },

      // Rapports & Analytics (reporting)
      "reporting-basic": { min: 1500, max: 2500 },
      "reporting-custom": { min: 3000, max: 5000 },
      "reporting-scheduled": { min: 1000, max: 1800 },
      "analytics-tracking": { min: 800, max: 1400 },

      // API & Webhooks (api)
      "api-rest": { min: 2000, max: 3500 },
      "api-graphql": { min: 2800, max: 5000 },
      "api-webhooks": { min: 800, max: 1400 },
      "api-rate-limiting": { min: 600, max: 1000 },
      "api-keys": { min: 800, max: 1400 },

      // Intégrations tierces (integrations)
      "integration-stripe": { min: 1200, max: 2000 },
      "integration-crm": { min: 1500, max: 2800 },
      "integration-email-service": { min: 600, max: 1000 },
      "integration-calendar": { min: 1000, max: 1800 },
      "integration-slack": { min: 800, max: 1400 },
      "integration-zapier": { min: 1500, max: 2500 },

      // Temps réel & Collaboration (realtime)
      websockets: { min: 2000, max: 3500 },
      "live-chat": { min: 1800, max: 3000 },
      "collaborative-editing": { min: 3500, max: 6000 },
      "presence-indicators": { min: 800, max: 1400 },

      // Mobile & PWA (mobile)
      "responsive-design": { min: 0, max: 0 }, // Inclus
      pwa: { min: 1500, max: 2500 },
      "mobile-app-react-native": { min: 12000, max: 25000 },

      // Sécurité & Conformité (security)
      "security-encryption": { min: 0, max: 0 }, // Inclus
      "security-gdpr": { min: 1200, max: 2000 },
      "security-audit-trail": { min: 1500, max: 2500 },
      "security-ip-whitelist": { min: 500, max: 900 },
    },
    design: {
      template: 0,
      "semi-custom": 2000,
      custom: 5000,
    },
    seo: {
      none: 0,
      basic: 500,
      advanced: 1500,
    },
    services: {
      maintenance: 300, // per month
      training: 1200, // per day (8h)
      hosting: 800, // per year
    },
  },

  auditCyber: {
    base: 2000,
    features: {
      // Périmètre (scope)
      "infra-1-5": { min: 0, max: 0 }, // Inclus dans base
      "infra-5-20": { min: 2000, max: 3000 },
      "infra-20-50": { min: 5000, max: 7000 },
      "infra-50plus": { min: 10000, max: 18000 },

      // Types d'audit (audit)
      "code-review-sast": { min: 2500, max: 4500 },
      "infra-audit": { min: 2800, max: 4500 },
      "social-engineering": { min: 1800, max: 3000 },
      "cloud-security-audit": { min: 3000, max: 5500 },
      "container-security": { min: 2500, max: 4000 },
      "iot-security": { min: 2800, max: 5000 },

      // Applications (apps)
      "webapp-audit-1": { min: 1800, max: 3000 },
      "webapp-audit-2-5": { min: 3500, max: 6000 },
      "webapp-audit-6-10": { min: 7000, max: 12000 },

      // Conformité (compliance)
      "compliance-rgpd": { min: 1500, max: 2500 },
      "compliance-iso27001": { min: 4000, max: 7000 },
      "compliance-nis2": { min: 3000, max: 5000 },
      "compliance-pci-dss": { min: 4500, max: 8000 },
      "compliance-soc2": { min: 5000, max: 9000 },
      "compliance-hipaa": { min: 4000, max: 7000 },
      "compliance-dora": { min: 3500, max: 6000 },

      // Suivi & remédiation (followup)
      "remediation-consulting": { min: 2000, max: 3500 },
      retest: { min: 1000, max: 1800 },
      "continuous-monitoring": { min: 1500, max: 2500 }, // per month
      "vulnerability-management": { min: 2500, max: 4000 }, // per month

      // Formation (training)
      "training-awareness": { min: 800, max: 1400 }, // 2h
      "training-technical": { min: 1500, max: 2500 }, // 1 jour
      "training-devsecops": { min: 3000, max: 5000 }, // 2 jours
      "training-incident-response": { min: 2000, max: 3500 }, // 1 jour

      // Rapports (reporting)
      "report-executive": { min: 0, max: 0 }, // Inclus
      "report-technical": { min: 0, max: 0 }, // Inclus
      "report-compliance": { min: 800, max: 1400 },
      "report-presentation": { min: 600, max: 1000 }, // Half-day
      "attestation-letter": { min: 300, max: 500 },
    },
    design: {
      template: 0,
      "semi-custom": 0,
      custom: 0,
    },
    seo: {
      none: 0,
      basic: 0,
      advanced: 0,
    },
    services: {
      maintenance: 200, // per month (monitoring)
      training: 800, // per day
      hosting: 0,
    },
  },

  aiAutomation: {
    base: 3000,
    features: {
      // AI Models (ai-models)
      "ai-model-gpt4": { min: 0, max: 0 }, // Model choice included, costs are in volume
      "ai-model-claude": { min: 0, max: 0 },
      "ai-model-mistral": { min: 0, max: 0 },
      "ai-model-llama": { min: 1500, max: 2500 }, // Self-hosting setup
      "ai-model-gemini": { min: 0, max: 0 },

      // Use Cases (use-cases)
      "use-case-chatbot": { min: 0, max: 0 }, // Base use case included
      "use-case-document-processing": { min: 0, max: 0 },
      "use-case-content-generation": { min: 0, max: 0 },
      "use-case-data-analysis": { min: 0, max: 0 },
      "use-case-workflow-automation": { min: 0, max: 0 },

      // Chatbot Features (chatbot)
      "chatbot-knowledge-base": { min: 2000, max: 3500 }, // RAG implementation
      "chatbot-multilingual": { min: 800, max: 1500 },
      "chatbot-voice": { min: 2500, max: 4000 }, // Speech integration
      "chatbot-omnichannel": { min: 1500, max: 2500 }, // Multi-platform
      "chatbot-handoff": { min: 1200, max: 2000 }, // Human escalation
      "chatbot-sentiment": { min: 1000, max: 1800 },
      "chatbot-crm-sync": { min: 1500, max: 2500 },

      // NLP Features (nlp)
      "nlp-summarization": { min: 1200, max: 2000 },
      "nlp-translation": { min: 1500, max: 2500 },
      "nlp-classification": { min: 1500, max: 2500 },
      "nlp-ner": { min: 1800, max: 3000 }, // Named Entity Recognition
      "nlp-sentiment": { min: 1200, max: 2000 },
      "nlp-intent-detection": { min: 1500, max: 2500 },

      // Computer Vision (vision)
      "vision-ocr": { min: 1500, max: 2500 },
      "vision-document-parsing": { min: 2500, max: 4000 }, // Structured docs
      "vision-object-detection": { min: 2500, max: 4500 },
      "vision-face-detection": { min: 2000, max: 3500 },
      "vision-quality-control": { min: 3000, max: 5000 }, // Industrial
      "vision-image-generation": { min: 2000, max: 3500 }, // DALL-E, Stable Diffusion

      // Voice/Audio (voice)
      "voice-transcription": { min: 1500, max: 2500 },
      "voice-synthesis": { min: 1500, max: 2500 },
      "voice-cloning": { min: 2500, max: 4000 },
      "voice-call-analysis": { min: 2500, max: 4000 },

      // RPA & Automation (automation)
      "rpa-web-scraping": { min: 2000, max: 3500 },
      "rpa-form-filling": { min: 1500, max: 2500 },
      "rpa-email-processing": { min: 1800, max: 3000 },
      "rpa-invoice-processing": { min: 2000, max: 3500 },
      "rpa-report-generation": { min: 1500, max: 2500 },
      "rpa-data-entry": { min: 1500, max: 2500 },
      "workflow-orchestration": { min: 2500, max: 4000 },

      // Training & Data (training)
      "training-fine-tuning": { min: 3000, max: 6000 },
      "training-data-preparation": { min: 2000, max: 4000 },
      "training-rag-setup": { min: 2500, max: 4500 }, // Vector DB setup
      "training-model-evaluation": { min: 1500, max: 2500 },

      // Volume & Scale (volume)
      "volume-1k": { min: 0, max: 0 }, // Included in base
      "volume-1k-10k": { min: 500, max: 1000 }, // Monthly API costs
      "volume-10k-50k": { min: 1500, max: 2500 },
      "volume-50k-250k": { min: 3000, max: 5000 },
      "volume-250k-plus": { min: 6000, max: 12000 }, // Enterprise

      // Deployment (deployment)
      "deployment-cloud": { min: 0, max: 0 }, // Default
      "deployment-on-premise": { min: 3000, max: 5000 }, // Self-hosting setup
      "deployment-hybrid": { min: 2000, max: 3500 },

      // Integrations (integrations)
      "integration-api-rest": { min: 1000, max: 1800 },
      "integration-webhooks": { min: 600, max: 1000 },
      "integration-zapier": { min: 800, max: 1500 },
      "integration-crm": { min: 1500, max: 2500 },
      "integration-email-service": { min: 800, max: 1500 },
      "integration-slack-teams": { min: 1000, max: 1800 },
      "integration-whatsapp": { min: 1500, max: 2500 }, // WhatsApp Business API

      // Monitoring & Analytics (monitoring)
      "monitoring-dashboard": { min: 1200, max: 2000 },
      "monitoring-alerts": { min: 600, max: 1000 },
      "monitoring-logging": { min: 800, max: 1500 },
      "monitoring-analytics": { min: 1500, max: 2500 },
      "monitoring-ab-testing": { min: 1200, max: 2000 },

      // Support & Maintenance (support)
      "support-maintenance-1month": { min: 0, max: 0 }, // Included
      "support-maintenance-3months": { min: 600, max: 1200 }, // 200-400/month
      "support-maintenance-12months": { min: 2400, max: 4800 }, // 200-400/month
      "support-training": { min: 800, max: 1500 }, // 1 day training
      "support-documentation": { min: 600, max: 1000 },
    },
    design: {
      template: 0,
      "semi-custom": 800,
      custom: 2000,
    },
    seo: {
      none: 0,
      basic: 400,
      advanced: 1000,
    },
    services: {
      maintenance: 200, // per month (API costs + monitoring)
      training: 600, // per session
      hosting: 300, // per year
    },
  },

  cmsBlog: {
    base: 2500,
    features: {
      // CMS Platform (cms-platform)
      "cms-wordpress": { min: 0, max: 0 }, // Default, included
      "cms-strapi": { min: 2000, max: 3500 }, // Headless setup
      "cms-contentful": { min: 1500, max: 2500 }, // Cloud setup + subscription
      "cms-sanity": { min: 2000, max: 3500 }, // Headless setup
      "cms-custom": { min: 8000, max: 15000 }, // Full custom CMS

      // Content Types (content-types)
      "content-blog-posts": { min: 0, max: 0 }, // Included
      "content-pages": { min: 0, max: 0 }, // Included
      "content-portfolio": { min: 600, max: 1000 },
      "content-events": { min: 800, max: 1400 }, // With calendar
      "content-team": { min: 400, max: 700 },
      "content-testimonials": { min: 400, max: 700 },
      "content-faq": { min: 600, max: 1000 }, // With search
      "content-resources": { min: 800, max: 1400 }, // Download center

      // Editor (editor)
      "editor-wysiwyg": { min: 0, max: 0 }, // Default
      "editor-gutenberg": { min: 0, max: 0 }, // Default for WP
      "editor-markdown": { min: 300, max: 500 },
      "editor-page-builder": { min: 400, max: 800 }, // Elementor setup

      // Media Management (media)
      "media-library-basic": { min: 0, max: 0 }, // Included
      "media-library-advanced": { min: 600, max: 1000 }, // Folders, tags
      "media-image-optimization": { min: 400, max: 700 }, // Auto compression
      "media-cdn": { min: 600, max: 1200 }, // CDN setup
      "media-dam": { min: 2000, max: 3500 }, // Full DAM system

      // Taxonomies (taxonomies)
      "taxonomy-categories": { min: 0, max: 0 }, // Included
      "taxonomy-tags": { min: 0, max: 0 }, // Included
      "taxonomy-custom": { min: 400, max: 700 },

      // Users & Roles (users)
      "users-single-author": { min: 0, max: 0 }, // Included
      "users-multi-authors": { min: 400, max: 700 },
      "users-team-large": { min: 800, max: 1400 }, // Advanced permissions
      "users-roles-permissions": { min: 600, max: 1000 },
      "users-guest-posts": { min: 600, max: 1000 }, // Submission system

      // Workflow & Publishing (workflow)
      "workflow-draft-publish": { min: 0, max: 0 }, // Included
      "workflow-advanced": { min: 800, max: 1400 }, // Multi-step approval
      "workflow-scheduled": { min: 300, max: 500 },
      "workflow-versioning": { min: 600, max: 1000 }, // History + rollback
      "workflow-expiration": { min: 400, max: 700 },

      // Comments & Engagement (comments)
      "comments-native": { min: 400, max: 700 },
      "comments-moderation": { min: 300, max: 500 },
      "comments-disqus": { min: 300, max: 500 },
      "comments-social": { min: 400, max: 700 },

      // SEO & Référencement (seo)
      "seo-basic": { min: 0, max: 0 }, // Included
      "seo-advanced": { min: 600, max: 1000 }, // Yoast/RankMath Pro
      "seo-sitemap": { min: 200, max: 400 },
      "seo-breadcrumbs": { min: 300, max: 500 },
      "seo-redirections": { min: 400, max: 700 },

      // Search & Navigation (search)
      "search-basic": { min: 0, max: 0 }, // Included
      "search-advanced": { min: 600, max: 1000 },
      "search-algolia": { min: 1200, max: 2000 }, // Algolia integration
      "search-related-posts": { min: 300, max: 500 },

      // Multilingual (multilingual)
      "multilingual-none": { min: 0, max: 0 }, // Included
      "multilingual-2-languages": { min: 1000, max: 1800 },
      "multilingual-3-languages": { min: 1800, max: 3000 },
      "multilingual-4plus": { min: 3000, max: 5000 },

      // Marketing & Newsletter (marketing)
      "marketing-newsletter": { min: 600, max: 1000 },
      "marketing-popup": { min: 400, max: 700 },
      "marketing-lead-magnets": { min: 600, max: 1000 },
      "marketing-social-sharing": { min: 200, max: 400 },
      "marketing-social-feed": { min: 400, max: 700 },

      // Analytics & Tracking (analytics)
      "analytics-google": { min: 300, max: 500 }, // GA4 setup
      "analytics-matomo": { min: 600, max: 1000 }, // Self-hosted
      "analytics-heatmaps": { min: 400, max: 700 }, // Hotjar integration

      // Performance (performance)
      "performance-caching": { min: 400, max: 700 },
      "performance-minification": { min: 300, max: 500 },
      "performance-lazy-loading": { min: 300, max: 500 },

      // E-commerce Light (ecommerce-light)
      "ecommerce-donations": { min: 400, max: 700 },
      "ecommerce-digital-products": { min: 1200, max: 2000 }, // WooCommerce Lite
      "ecommerce-memberships": { min: 1500, max: 2500 }, // Subscription system

      // Migration & Import (migration)
      "migration-wordpress": { min: 600, max: 1200 },
      "migration-medium": { min: 400, max: 800 },
      "migration-wix-squarespace": { min: 800, max: 1500 },
      "migration-custom": { min: 1200, max: 2500 },

      // API & Headless (api)
      "api-rest": { min: 800, max: 1500 }, // API setup
      "api-graphql": { min: 1200, max: 2000 }, // GraphQL layer
      "api-webhooks": { min: 600, max: 1000 },
    },
    design: {
      template: 0,
      "semi-custom": 800,
      custom: 2500,
    },
    seo: {
      none: 0,
      basic: 400,
      advanced: 1200,
    },
    services: {
      maintenance: 50, // per month
      training: 300, // 2h session
      hosting: 0, // 1 year included
    },
  },
};

// Helper function to get pricing for a specific project type
export function getPricingMatrix(projectType: ProjectType): PricingMatrix {
  return pricingMatrices[projectType];
}

// Helper function to calculate feature price
export function getFeaturePrice(
  projectType: ProjectType,
  featureId: string,
): { min: number; max: number } | null {
  const matrix = pricingMatrices[projectType];
  return matrix.features[featureId] || null;
}
