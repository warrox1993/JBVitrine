import {
  Feature,
  ProjectType,
  ProjectTypeConfig,
} from "@/components/contact/QuoteWizard/types";

/**
 * Complete feature definitions for all project types
 */
export const projectTypeConfigs: Record<ProjectType, ProjectTypeConfig> = {
  siteVitrine: {
    id: "siteVitrine",
    name: "Site Vitrine",
    description: "Site web professionnel moderne pour présenter votre activité",
    icon: "🌐",
    basePrice: 2000,
    estimatedTimelineWeeks: { min: 2, max: 10 },
    features: [
      // Périmètre (scope)
      {
        id: "pages-1-5",
        name: "1-5 pages",
        description: "Site compact - Accueil, Services, À propos, Contact",
        explanation: `Site compact de 1 à 5 pages couvrant l'essentiel : Accueil, Services, À propos, Contact. **C'est quoi ?** Le minimum pour avoir une présence web professionnelle. **Pourquoi ?** Coût maîtrisé, rapide à mettre en ligne (2-3 semaines), parfait pour TPE/indépendants qui démarrent. 80% des visiteurs ne consultent que 3-4 pages max.`,

        category: "scope",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "pages-6-10",
        name: "6-10 pages",
        description: "Site complet - Pages essentielles + pages secondaires",
        explanation: `Site complet de 6 à 10 pages incluant les pages essentielles plus des pages secondaires (témoignages, FAQ, services détaillés). **C'est quoi ?** Un site web professionnel avec toutes les informations nécessaires. **Pourquoi ?** Vous donnez confiance (site complet), améliorez votre SEO (plus de contenu indexé), et répondez aux questions avant même qu'on vous contacte. Idéal pour PME établies.`,

        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "pages-11-20",
        name: "11-20 pages",
        description: "Site étendu - Multi-services ou multi-localités",
        explanation: `Site étendu de 11 à 20 pages pour entreprises multi-services ou multi-localités. **C'est quoi ?** Un site structuré avec des pages dédiées par service, localité ou segment client. **Pourquoi ?** Vous ciblez mieux chaque audience, boostez votre SEO local/thématique, et vous positionnez comme acteur sérieux. Nécessaire si vous avez plusieurs activités ou bureaux.`,

        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "pages-20+",
        name: "Plus de 20 pages",
        description: "Site corporate complexe - Grande entreprise",
        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },

      // Types de contenu (content)
      {
        id: "blog",
        name: "Blog / Actualités",
        description: "CMS pour articles, filtres par catégorie, recherche",
        explanation: `Section blog intégrée pour publier des articles régulièrement. Excellent pour le SEO (Google favorise les sites qui publient du contenu frais). Vous apparaissez comme expert dans votre domaine. Augmente le trafic de 55% en moyenne. WordPress, Medium et tous les grands sites ont un blog.`,
        category: "content",
        selected: false,
      },
      {
        id: "portfolio",
        name: "Portfolio / Réalisations",
        description: "Galerie projets avec filtres, lightbox, et détails",
        explanation: `Galerie de vos réalisations/projets avec images, descriptions détaillées, catégories. Indispensable pour photographes, designers, architectes, agences. Permet aux clients de voir votre travail avant de vous contacter. Augmente les demandes de devis qualifiées de 60%.`,
        category: "content",
        selected: false,
      },
      {
        id: "team-members",
        name: "Page Équipe",
        description: "Présentation des membres de l'équipe avec bios",
        category: "content",
        selected: false,
      },
      {
        id: "testimonials",
        name: "Témoignages clients",
        description: "Section avis clients avec carousel et ratings",
        explanation: `Section témoignages clients avec avis, photos, logos d'entreprises. 92% des consommateurs lisent les avis avant d'acheter. Les témoignages authentiques augmentent les conversions de 34%. Plus crédible que votre propre discours commercial.`,
        category: "content",
        selected: false,
      },
      {
        id: "case-studies",
        name: "Études de cas",
        description: "Success stories détaillées avec métriques et résultats",
        explanation: `Études de cas détaillées montrant comment vous avez résolu les problèmes de vos clients (avant/après, résultats chiffrés). Plus convaincant que les témoignages simples. Parfait pour le B2B où les cycles de vente sont longs. Augmente la crédibilité et les conversions qualifiées.`,
        category: "content",
        selected: false,
      },
      {
        id: "faq-section",
        name: "Section FAQ",
        description: "Questions/réponses organisées par catégorie",
        explanation: `Section FAQ avec questions/réponses organisées par catégorie et recherche intégrée. **C'est quoi ?** Une page dédiée aux questions fréquentes de vos clients. **Pourquoi ?** Réduit les appels/emails répétitifs de 30-40%, améliore le SEO (Google affiche les FAQ en résultats enrichis), et facilite la décision d'achat en levant les objections courantes.`,

        category: "content",
        selected: false,
      },
      {
        id: "video-gallery",
        name: "Galerie vidéo",
        description: "Intégration YouTube/Vimeo avec playlists",
        explanation: `Galerie vidéo professionnelle avec intégration YouTube/Vimeo et organisation en playlists. **C'est quoi ?** Une section présentant vos vidéos de manière organisée et élégante. **Pourquoi ?** La vidéo génère 1200% plus de partages que texte+image combinés. Parfait pour tutoriels, témoignages vidéo, visites virtuelles. Les visiteurs restent 88% plus longtemps sur une page avec vidéo.`,

        category: "content",
        selected: false,
      },

      // Fonctionnalités interactives (features)
      {
        id: "contact-form-basic",
        name: "Formulaire de contact simple",
        description: "Formulaire standard avec validation et anti-spam",
        explanation: `Formulaire de contact simple avec validation en temps réel et protection anti-spam reCAPTCHA. **C'est quoi ?** Un formulaire standard (nom, email, message) sécurisé. **Pourquoi ?** Le minimum vital pour être contacté. 44% des visiteurs B2B préfèrent un formulaire au téléphone. Sans formulaire, vous perdez des leads.`,

        category: "features",
        selected: true,
      },
      {
        id: "contact-advanced",
        name: "Formulaire de contact avancé",
        description: "Multi-étapes, upload fichiers, validation RGPD",
        explanation: `Formulaire de contact avancé multi-étapes avec upload de fichiers, champs conditionnels et conformité RGPD complète. **C'est quoi ?** Un formulaire sophistiqué qui s'adapte selon les réponses et permet l'envoi de documents. **Pourquoi ?** Améliore la qualité des leads (+35%), réduit les allers-retours par email, et donne une image professionnelle. Essentiel si vous avez besoin de documents (devis, cahier des charges).`,

        category: "features",
        selected: false,
      },
      {
        id: "quote-wizard",
        name: "Générateur de devis interactif",
        description: "Wizard multi-étapes pour estimation en ligne",
        explanation: `Générateur de devis interactif guidant l'utilisateur étape par étape vers une estimation personnalisée. **C'est quoi ?** Un wizard qui pose des questions et calcule un tarif estimatif en temps réel. **Pourquoi ?** Filtre les prospects non sérieux, éduque sur vos services, et génère des leads plus qualifiés (+60%). Réduit votre temps commercial de 40%. Les visiteurs adorent savoir où ils vont côté budget.`,

        category: "features",
        selected: false,
      },
      {
        id: "booking-calendar",
        name: "Calendrier de réservation",
        description: "Prise de RDV en ligne avec gestion des créneaux",
        explanation: `Calendrier de réservation en ligne synchronisé avec votre agenda (Google Calendar, Outlook). **C'est quoi ?** Système de prise de RDV automatique montrant vos disponibilités réelles. **Pourquoi ?** Élimine les échanges d'emails interminables pour fixer un rendez-vous. Augmente les conversions de 25% (action immédiate vs "je vous rappelle"). Indispensable pour consultants, médecins, coiffeurs, etc.`,

        category: "features",
        selected: false,
      },
      {
        id: "live-chat",
        name: "Chat en direct",
        description: "Widget de chat pour support client instantané",
        explanation: `Chat en direct pour discuter instantanément avec vos visiteurs. Augmente les conversions de 45% car vous répondez aux questions en temps réel. Disponible via Intercom, Crisp, Tidio. 79% des clients préfèrent le chat au téléphone pour les questions rapides.`,
        category: "features",
        selected: false,
      },
      {
        id: "search-engine",
        name: "Moteur de recherche interne",
        description: "Recherche full-text avec résultats pertinents",
        explanation: `Moteur de recherche interne avec indexation full-text et résultats pertinents instantanés. **C'est quoi ?** Une barre de recherche permettant de trouver rapidement du contenu sur votre site. **Pourquoi ?** Sur un site de 15+ pages, 30% des visiteurs utilisent la recherche. Améliore l'UX, réduit le taux de rebond, et vous montre ce que cherchent vos visiteurs (insights précieux).`,

        category: "features",
        selected: false,
      },
      {
        id: "map-locations",
        name: "Carte interactive",
        description: "Google Maps avec markers et directions",
        explanation: `Carte interactive Google Maps avec markers personnalisés, itinéraire et Street View. **C'est quoi ?** Une carte montrant votre/vos localisation(s) avec possibilité d'obtenir un itinéraire. **Pourquoi ?** 86% des visiteurs vérifient la localisation sur une carte avant de venir. Améliore le référencement local Google Maps. Essentiel si vous avez un lieu physique.`,

        category: "features",
        selected: false,
      },
      {
        id: "newsletter-signup",
        name: "Inscription newsletter",
        description: "Formulaire newsletter avec intégration email service",
        explanation: `Formulaire d'inscription newsletter avec double opt-in et intégration automatique à votre outil d'emailing. **C'est quoi ?** Un formulaire pour collecter des emails et constituer une liste de diffusion. **Pourquoi ?** L'email marketing génère 38€ de ROI pour 1€ investi. Vous gardez le contact avec vos prospects, les convertissez à votre rythme, et ne dépendez pas des algorithmes des réseaux sociaux. Votre liste email est un actif qui vous appartient.`,

        category: "features",
        selected: false,
      },

      // Espace utilisateur (user-area)
      {
        id: "login-area",
        name: "Espace client sécurisé",
        description: "Zone privée avec authentification et documents",
        explanation: `Espace client sécurisé avec authentification forte (2FA optionnel) et gestion des sessions. **C'est quoi ?** Une zone privée du site accessible uniquement après connexion. **Pourquoi ?** Permet de partager des documents confidentiels, suivre des projets en cours, ou donner accès à du contenu premium. Améliore la fidélisation et réduit le support (clients autonomes). Indispensable en B2B.`,

        category: "user-area",
        selected: false,
      },
      {
        id: "document-downloads",
        name: "Téléchargements protégés",
        description: "Documents PDF/fichiers accessibles après connexion",
        explanation: `Zone de téléchargement sécurisée pour documents PDF, fichiers et ressources protégées. **C'est quoi ?** Une bibliothèque de documents accessibles uniquement aux clients connectés. **Pourquoi ?** Centralisez factures, contrats, manuels, rapports au lieu d'envoyer par email. Traçabilité complète (qui a téléchargé quoi et quand). Renforce le professionnalisme et facilite la collaboration.`,

        category: "user-area",
        selected: false,
      },
      {
        id: "user-dashboard",
        name: "Tableau de bord client",
        description: "Interface personnalisée avec historique et infos",
        explanation: `Tableau de bord personnalisé pour chaque client montrant son historique, ses documents, ses stats. Interface intuitive avec graphiques. Améliore l'expérience client et réduit le support. Utilisé par toutes les grandes plateformes (Amazon, Netflix, etc).`,
        category: "user-area",
        selected: false,
      },

      // International (international)
      {
        id: "monolingual-fr",
        name: "Site monolingue (français uniquement)",
        description: "Site en français uniquement, pas de traduction",
        explanation: `Site entièrement en français sans traduction. Simple et économique si vous ne ciblez que le marché francophone. Pas besoin de gérer plusieurs langues ni de dupliquer votre contenu.`,
        category: "international",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "multi-language-2",
        name: "Site bilingue (2 langues)",
        description: "FR/NL ou FR/EN avec switch automatique",
        explanation: `Site disponible en 2 langues avec détection automatique selon la localisation du visiteur. Les utilisateurs peuvent basculer entre les langues via un sélecteur. Idéal pour cibler la Belgique (FR/NL) ou l'international (FR/EN). Augmente votre portée de 50% à 100%.`,
        category: "international",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "multi-language-3",
        name: "Site trilingue (3 langues)",
        description: "FR/NL/EN avec détection géolocalisée",
        explanation: `Site en 3 langues (FR/NL/EN) qui détecte automatiquement la langue du visiteur selon sa localisation géographique. Parfait pour cibler la Belgique et l'international. Chaque page existe en 3 versions traduites.`,
        category: "international",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "multi-language-4plus",
        name: "Site multilingue (4+ langues)",
        description: "Support de 4 langues ou plus",
        explanation: `Site multilingue 4+ langues pour rayonnement international maximal. Chaque langue a son propre domaine ou sous-domaine pour le SEO. Détection géolocalisée + sélecteur manuel. Nécessite traduction professionnelle de tout le contenu. Pour entreprises exportatrices ou multinationales.`,
        category: "international",
        selected: false,
        mutuallyExclusive: true,
      },

      // SEO & Référencement (seo)
      {
        id: "seo-basic",
        name: "SEO basique",
        description: "Meta titles, descriptions, URLs optimisées, sitemap XML",
        explanation: `Optimisation de base pour être trouvé sur Google : titres de pages optimisés, descriptions courtes, URLs propres, sitemap XML pour Google. C'est le minimum syndical pour apparaître dans les résultats de recherche. Sans SEO, votre site est invisible sur Google.`,
        category: "seo",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "seo-advanced",
        name: "SEO avancé",
        description:
          "Rich snippets, Schema.org markup, OpenGraph, Twitter Cards",
        explanation: `SEO professionnel avec données structurées (Schema.org) pour apparaître dans les résultats enrichis de Google (étoiles, prix, FAQ). Optimisation OpenGraph pour un bel aperçu sur Facebook/LinkedIn. Twitter Cards pour Twitter. Améliore votre taux de clic de 30%.`,
        category: "seo",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "seo-expert",
        name: "SEO expert",
        description:
          "Audit SEO complet, recherche mots-clés, stratégie de contenu",
        explanation: `Audit SEO complet par expert : analyse concurrence, recherche de 50+ mots-clés pertinents, stratégie de contenu sur mesure, recommandations techniques. Création de contenu optimisé. Pour entreprises visant le top 3 Google sur leurs mots-clés. ROI très élevé sur le long terme.`,
        category: "seo",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "seo-local",
        name: "SEO local",
        description:
          "Google Business Profile, optimisation locale, avis clients",
        explanation: `Optimisation pour les recherches locales type "plombier Bruxelles". Configuration de votre profil Google Business, optimisation pour Google Maps, gestion des avis clients. Essentiel si vous avez une présence physique ou ciblez une zone géographique précise.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-technical",
        name: "SEO technique avancé",
        description:
          "Core Web Vitals, données structurées, robots.txt optimisé",
        explanation: `Optimisation technique poussée : vitesse de chargement maximale, Core Web Vitals (critères Google), fichier robots.txt optimisé. Google favorise les sites rapides dans son classement. Un site lent peut perdre 50% de ses visiteurs.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-content-optimization",
        name: "Optimisation du contenu",
        description: "Réécriture SEO, balises Hn optimisées, maillage interne",
        explanation: `Réécriture professionnelle de vos textes pour le SEO : densité de mots-clés optimale, balises H1/H2/H3 structurées, maillage interne (liens entre vos pages), images optimisées avec alt text. Améliore le positionnement de 50-200 positions selon la concurrence.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-breadcrumbs",
        name: "Fil d'Ariane (Breadcrumbs)",
        description: "Navigation structurée pour meilleur référencement",
        explanation: `Fil d'Ariane (Accueil > Services > Développement Web) afin que les visiteurs sachent où ils sont. Améliore l'UX et le SEO (Google affiche les breadcrumbs dans les résultats). Réduit le taux de rebond de 20%. Obligatoire sur les sites de +10 pages.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-redirections",
        name: "Gestion des redirections",
        description: "Redirections 301 pour éviter contenu dupliqué et 404",
        explanation: `Gestion professionnelle des redirections 301 pour éviter les erreurs 404 et le contenu dupliqué. Important lors d'une refonte ou changement d'URLs. Préserve votre référencement existant. Google pénalise les sites avec beaucoup d'erreurs 404.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-blog-strategy",
        name: "Stratégie de blog SEO",
        description:
          "Calendrier éditorial, recherche keywords, optimisation articles",
        explanation: `Stratégie de blog SEO complète : calendrier éditorial de 12 mois, recherche de mots-clés longue traîne, optimisation de chaque article, internal linking. Objectif: attirer du trafic organique qualifié. Les entreprises qui bloguent obtiennent 67% de leads en plus.`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-competitive-analysis",
        name: "Analyse concurrentielle SEO",
        description: "Étude concurrents, opportunités de mots-clés, backlinks",
        explanation: `Analyse approfondie de vos 5 principaux concurrents : leurs mots-clés, backlinks, stratégie de contenu, points faibles. Identification d'opportunités non exploitées. Permet de savoir exactement quoi faire pour les dépasser. Gain de temps énorme (évite de copier ce qui ne marche pas).`,
        category: "seo",
        selected: false,
      },
      {
        id: "seo-international",
        name: "SEO international (hreflang)",
        description: "Optimisation multi-pays avec balises hreflang",
        explanation: `SEO international avec balises hreflang pour indiquer à Google quelle version linguistique montrer selon le pays. Évite le contenu dupliqué entre les versions linguistiques. Essentiel si vous visez plusieurs pays (FR, BE, CH, CA ont tous du français mais sont des marchés différents).`,
        category: "seo",
        selected: false,
      },

      // Performance & technique (performance)
      {
        id: "pwa-support",
        name: "Progressive Web App (PWA)",
        description: "Site installable, mode offline, notifications push",
        explanation: `Progressive Web App : votre site se comporte comme une application mobile. Les clients peuvent l'installer sur leur téléphone, l'utiliser hors-ligne, recevoir des notifications push. Plus rapide qu'un site normal. Coûte 10x moins cher qu'une vraie app iOS/Android.`,
        category: "performance",
        selected: false,
      },
      {
        id: "performance-optimization",
        name: "Optimisation extrême",
        description: "Score 95+ Lighthouse, lazy loading, CDN",
        explanation: `Optimisation maximale pour un site ultra-rapide : score Lighthouse 95+, images compressées automatiquement, chargement différé, CDN mondial. Un site rapide augmente les conversions de 30%. Amazon perd 1% de revenus par 100ms de latence.`,
        category: "performance",
        selected: false,
      },
      {
        id: "analytics-setup",
        name: "Analytics & tracking",
        description: "Google Analytics 4, Tag Manager, conversion tracking",
        explanation: `Configuration professionnelle de Google Analytics 4 + Tag Manager pour suivre tout : visiteurs, sources de trafic, conversions, parcours client, produits consultés. Tableaux de bord prêts à l'emploi. Sans analytics, vous pilotez à l'aveugle.`,
        category: "performance",
        selected: false,
      },

      // Intégrations (integrations)
      {
        id: "crm-integration",
        name: "Intégration CRM",
        description: "HubSpot, Salesforce, Pipedrive - sync contacts",
        explanation: `Intégration bidirectionnelle avec votre CRM (HubSpot, Salesforce, Pipedrive) pour synchronisation automatique des contacts. **C'est quoi ?** Connexion de votre site à votre outil CRM pour transférer automatiquement les leads. **Pourquoi ?** Zéro saisie manuelle, aucun lead perdu, relance automatique. Vos commerciaux ont instantanément les infos. ROI immédiat : un lead perdu = minimum 500-5000€ selon votre secteur.`,

        category: "integrations",
        selected: false,
      },
      {
        id: "email-marketing-integration",
        name: "Email marketing",
        description: "Mailchimp, Brevo, ActiveCampaign - listes automatiques",
        explanation: `Connexion automatique avec votre plateforme email marketing (Mailchimp, Brevo, ActiveCampaign) pour gestion de listes et campagnes. **C'est quoi ?** Synchronisation entre votre site et votre outil d'emailing. **Pourquoi ?** Automatisez vos campagnes (nouveau client = série de bienvenue automatique), segmentez finement votre audience, mesurez tout. Augmente l'engagement de 50% vs emails manuels.`,

        category: "integrations",
        selected: false,
      },
      {
        id: "social-media-feed",
        name: "Flux réseaux sociaux",
        description: "Intégration Instagram, Facebook, LinkedIn, Twitter",
        explanation: `Flux en temps réel de vos réseaux sociaux (Instagram, Facebook, LinkedIn, Twitter) affiché sur votre site. **C'est quoi ?** Intégration de vos posts réseaux sociaux directement sur votre site web. **Pourquoi ?** Montre que vous êtes actif, incite à vous suivre (+40% d'abonnés), et garde votre site visuellement à jour sans effort. Votre contenu social sert deux fois.`,

        category: "integrations",
        selected: false,
      },

      // Services additionnels (services)
      {
        id: "copywriting",
        name: "Rédaction de contenu SEO",
        description:
          "Rédaction professionnelle de tous les textes (800-1200 mots/page)",
        explanation: `Rédaction professionnelle SEO-optimisée de tous vos contenus web (800-1200 mots par page). **C'est quoi ?** Un rédacteur professionnel écrit tous les textes de votre site. **Pourquoi ?** Vous n'avez pas le temps, l'expertise SEO, ou le recul nécessaire. Un bon copywriting augmente les conversions de 60-200%. Google privilégie les textes bien écrits et structurés. Investissement qui se rentabilise rapidement.`,

        category: "services",
        selected: false,
      },
      {
        id: "professional-photography",
        name: "Photos professionnelles",
        description: "Shooting photo sur site (half-day) + retouches",
        explanation: `Shooting photo professionnel sur site (demi-journée) avec retouches et 30-50 photos HD livrées. **C'est quoi ?** Un photographe professionnel vient chez vous pour shooter vos locaux, équipes, produits. **Pourquoi ?** Les photos stock font amateur et nuisent à la crédibilité. 67% des consommateurs jugent les photos plus importantes que les descriptions. Des vraies photos augmentent la confiance de 75%.`,

        category: "services",
        selected: false,
      },
      {
        id: "video-production",
        name: "Vidéo de présentation",
        description: "Vidéo corporate 1-2 minutes avec montage professionnel",
        explanation: `Production d'une vidéo de présentation corporate 1-2 minutes avec script, tournage, montage et motion design. **C'est quoi ?** Une vidéo professionnelle présentant votre entreprise, équipe et savoir-faire. **Pourquoi ?** 72% des clients préfèrent la vidéo au texte pour découvrir un produit/service. Augmente les conversions de 80%. Réutilisable sur site, réseaux sociaux, salons. ROI énorme si bien faite.`,

        category: "services",
        selected: false,
      },
      {
        id: "logo-design",
        name: "Création de logo",
        description:
          "Design de logo professionnel (3 propositions + révisions)",
        explanation: `Création de logo professionnel avec 3 propositions, révisions illimitées et livraison tous formats (vectoriel, PNG, JPG). **C'est quoi ?** Un designer crée votre identité visuelle unique. **Pourquoi ?** Le logo est la première impression (7 secondes pour marquer). Un logo amateur = image amateur = moins de clients. Un bon logo augmente la mémorisation de 80% et la reconnaissance de marque.`,

        category: "services",
        selected: false,
      },
      {
        id: "brand-identity",
        name: "Charte graphique complète",
        description: "Logo, couleurs, typographies, guidelines (PDF 20+ pages)",
        explanation: `Charte graphique complète avec logo, palette couleurs, typographies et guidelines (PDF 20+ pages). **C'est quoi ?** Un document définissant votre identité visuelle dans les moindres détails. **Pourquoi ?** Cohérence sur tous supports (web, print, réseaux sociaux), professionnalisme, et guide pour vos prestataires futurs. Les grandes marques ont toutes une charte stricte. Investissement unique qui sert 5-10 ans.`,

        category: "services",
        selected: false,
      },

      // Sécurité & Conformité (security-compliance)
      {
        id: "rgpd-compliance",
        name: "Conformité RGPD complète",
        description: "Cookies, mentions légales, politique confidentialité",
        explanation: `Mise en conformité RGPD complète : banner cookies conforme, politique de confidentialité, mentions légales, registre des traitements. **C'est quoi ?** Respect des obligations légales européennes sur la protection des données. **Pourquoi ?** OBLIGATOIRE en UE sous peine d'amendes jusqu'à 20M€ ou 4% du CA. 100% des sites doivent être conformes. Protège votre entreprise et rassure vos visiteurs.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "ssl-certificate",
        name: "Certificat SSL (HTTPS)",
        description: "Chiffrement des données et cadenas vert",
        explanation: `Certificat SSL pour connexion HTTPS sécurisée avec cadenas vert dans le navigateur. **C'est quoi ?** Chiffrement des données entre le visiteur et votre site. **Pourquoi ?** OBLIGATOIRE : Google pénalise les sites HTTP, Chrome affiche "Non sécurisé", et 85% des visiteurs quittent si pas de cadenas. Gratuit mais doit être configuré correctement.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "daily-backups",
        name: "Sauvegardes automatiques quotidiennes",
        description: "Backup complet tous les jours (30 jours de rétention)",
        explanation: `Sauvegardes automatiques quotidiennes complètes (fichiers + base de données) avec 30 jours de rétention. **C'est quoi ?** Une copie de votre site créée chaque jour automatiquement. **Pourquoi ?** Protection contre piratage, erreur humaine, ou panne serveur. Restauration possible en quelques clics. Sans backup, un hack = site perdu définitivement. Tranquillité d'esprit totale.`,
        category: "security-compliance",
        selected: false,
      },
      {
        id: "anti-ddos-protection",
        name: "Protection anti-DDoS basique",
        description: "Cloudflare protection contre attaques volumétriques",
        explanation: `Protection anti-DDoS basique via Cloudflare contre les attaques volumétriques. **C'est quoi ?** Un bouclier qui filtre le trafic malveillant avant qu'il n'atteigne votre site. **Pourquoi ?** Les attaques DDoS rendent votre site inaccessible pendant des heures/jours. Particulièrement important pour e-commerce (perte de CA directe). Cloudflare gratuit bloque 99% des attaques courantes.`,
        category: "security-compliance",
        selected: false,
      },
      {
        id: "2fa-admin",
        name: "Authentification 2FA admin",
        description: "Double authentification pour accès administration",
        explanation: `Authentification à deux facteurs (2FA) pour tous les accès administration du site. **C'est quoi ?** Connexion sécurisée nécessitant mot de passe + code téléphone/app. **Pourquoi ?** Bloque 99,9% des piratages de comptes. Même si votre mot de passe fuite, hackers ne peuvent pas entrer. Google, banques, Amazon l'utilisent. Protection indispensable pour admins.`,
        category: "security-compliance",
        selected: false,
      },

      // Analytics & Suivi (analytics)
      {
        id: "google-analytics-4",
        name: "Google Analytics 4",
        description: "GA4 configuré avec événements et objectifs",
        explanation: `Google Analytics 4 installé et configuré avec événements personnalisés, objectifs de conversion et tableaux de bord. **C'est quoi ?** L'outil gratuit de Google pour analyser votre trafic web. **Pourquoi ?** Savoir d'où viennent vos visiteurs, ce qu'ils font, ce qui convertit. Données essentielles pour optimiser. 87% des sites pro l'utilisent. Sans analytics = vous pilotez à l'aveugle.`,
        category: "analytics",
        selected: true,
      },
      {
        id: "conversion-tracking",
        name: "Tracking des conversions",
        description: "Suivi des événements clés (soumissions, clics, achats)",
        explanation: `Configuration complète du suivi des conversions : formulaires soumis, boutons cliqués, achats effectués, téléchargements. **C'est quoi ?** Enregistrement de toutes les actions importantes des visiteurs. **Pourquoi ?** Mesurer le ROI de vos campagnes marketing, identifier ce qui marche/ne marche pas, optimiser votre tunnel de conversion. Sans tracking = impossible de savoir si vos investissements sont rentables.`,
        category: "analytics",
        selected: false,
      },
      {
        id: "heatmaps-session-recording",
        name: "Heatmaps & Session recording",
        description: "Hotjar pour voir où cliquent vos visiteurs",
        explanation: `Heatmaps (cartes de chaleur) et enregistrements de sessions via Hotjar pour voir exactement comment les visiteurs naviguent. **C'est quoi ?** Des enregistrements vidéo anonymes des sessions + cartes montrant où les gens cliquent. **Pourquoi ?** Identifier les problèmes UX, comprendre pourquoi les visiteurs partent, optimiser la conversion. Vous voyez ce qui bloque au lieu de deviner. Utilisé par Airbnb, Netflix, etc.`,
        category: "analytics",
        selected: false,
      },
      {
        id: "custom-dashboard",
        name: "Tableau de bord statistiques custom",
        description: "Dashboard personnalisé avec KPIs essentiels",
        explanation: `Tableau de bord personnalisé affichant vos KPIs essentiels en un coup d'œil (visiteurs, conversions, sources trafic, revenus). **C'est quoi ?** Une page custom récap de vos métriques clés. **Pourquoi ?** Google Analytics est complexe et intimidant. Un dashboard simplifié vous donne l'essentiel sans vous perdre. Consultable chaque lundi en 2 minutes. Gain de temps énorme.`,
        category: "analytics",
        selected: false,
      },

      // Marketing Digital (digital-marketing)
      {
        id: "schema-markup",
        name: "Schema markup / Rich snippets",
        description: "Balisage structuré pour résultats enrichis Google",
        explanation: `Balisage Schema.org pour afficher des résultats enrichis dans Google (étoiles avis, prix, FAQ, événements). **C'est quoi ?** Du code structuré que Google comprend pour enrichir vos résultats de recherche. **Pourquoi ?** Augmente le taux de clic de 30-40% (résultats plus visibles/attractifs). Google affiche vos avis, prix, disponibilité directement. Avantage compétitif énorme sur concurrents sans markup.`,
        category: "digital-marketing",
        selected: false,
      },
      {
        id: "open-graph-meta",
        name: "Meta Open Graph / Twitter Cards",
        description: "Aperçus optimisés pour réseaux sociaux",
        explanation: `Meta tags Open Graph et Twitter Cards pour des partages optimisés sur réseaux sociaux (image, titre, description parfaits). **C'est quoi ?** Des balises qui contrôlent comment votre site apparaît quand partagé sur Facebook, LinkedIn, Twitter. **Pourquoi ?** Les partages mal formatés (pas d'image, texte coupé) génèrent 50% de clics en moins. L'optimisation coûte 0€ mais multiplie le trafic social par 3.`,
        category: "digital-marketing",
        selected: false,
      },
      {
        id: "google-my-business",
        name: "Intégration Google My Business",
        description: "Connexion avec votre fiche Google locale",
        explanation: `Intégration Google My Business pour afficher avis, horaires et localisation depuis votre fiche Google. **C'est quoi ?** Connexion entre votre site et votre profil Google d'entreprise. **Pourquoi ?** Boost SEO local énorme, affichage des avis Google directement sur site (crédibilité +80%), horaires toujours à jour automatiquement. 46% des recherches Google sont locales.`,
        category: "digital-marketing",
        selected: false,
      },
      {
        id: "exit-intent-popup",
        name: "Popup de sortie / Intent exit",
        description: "Popup quand visiteur va quitter le site",
        explanation: `Popup exit-intent qui détecte quand le visiteur va quitter le site et affiche une offre (promo, ebook, newsletter). **C'est quoi ?** Une popup qui apparaît au moment exact où le visiteur va fermer l'onglet. **Pourquoi ?** Récupère 10-15% des visiteurs qui partaient. Dernière chance de conversion. Taux d'opt-in email 4x supérieur aux popups classiques. Utilisé par 80% des e-commerces performants.`,
        category: "digital-marketing",
        selected: false,
      },
      {
        id: "ai-content-generation",
        name: "Génération de contenu SEO par IA",
        description: "IA pour générer descriptions produits, articles blog",
        explanation: `Génération automatique de contenu SEO par IA (GPT-4) pour descriptions produits, meta-descriptions, articles blog. **C'est quoi ?** Une IA qui écrit du contenu optimisé SEO à votre place. **Pourquoi ?** Gain de temps massif (100 descriptions en 1h vs 2 jours manuels), cohérence du ton, optimisation SEO automatique. Parfait pour e-commerce avec catalogue large. Relecture humaine recommandée.`,
        category: "digital-marketing",
        selected: false,
      },
    ],
  },

  ecommerce: {
    id: "ecommerce",
    name: "E-commerce",
    description: "Boutique en ligne professionnelle avec paiement sécurisé",
    icon: "🛒",
    basePrice: 5000,
    estimatedTimelineWeeks: { min: 6, max: 20 },
    features: [
      // Taille du catalogue (catalog-size)
      {
        id: "products-50",
        name: "Moins de 50 produits",
        description: "Catalogue compact - TPE/boutique spécialisée",
        explanation: `Catalogue jusqu'à 50 produits avec fiches détaillées, photos, prix et gestion de stock. **C'est quoi ?** Boutique en ligne pour petite gamme de produits. **Pourquoi ?** Budget maîtrisé, gestion simple. Parfait pour artisans, créateurs, petits producteurs qui démarrent en ligne. 50 produits bien présentés valent mieux que 500 mal mis en avant.`,

        category: "catalog-size",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "products-50-200",
        name: "50-200 produits",
        description: "Catalogue moyen - PME/multi-catégories",
        explanation: `Catalogue moyen de 50 à 200 produits pour PME avec plusieurs catégories. **C'est quoi ?** E-commerce de taille intermédiaire nécessitant une bonne organisation. **Pourquoi ?** Suffisamment varié pour attirer différents segments, mais gérable sans équipe dédiée. Navigation par catégories et filtres devient indispensable. Volume idéal pour tester le marché avant d'investir massivement.`,

        category: "catalog-size",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "products-200-500",
        name: "200-500 produits",
        description: "Grand catalogue - E-commerce établi",
        explanation: `Grand catalogue de 200 à 500 produits pour e-commerce établi. **C'est quoi ?** E-commerce mature avec gestion de stock complexe. **Pourquoi ?** Vous êtes un acteur sérieux du marché, besoin d'outils pros (ERP, automatisation), et performance critique. Les clients attendent une expérience fluide malgré le volume. Potentiel CA 100k-500k€/an.`,

        category: "catalog-size",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "products-500-2000",
        name: "500-2000 produits",
        description: "Très grand catalogue - Multi-marques",
        explanation: `Très grand catalogue de 500 à 2000 produits pour multi-marques ou distributeurs. **C'est quoi ?** E-commerce professionnel avec infrastructure robuste. **Pourquoi ?** Recherche instantanée obligatoire, filtres multicritères, recommandations IA. Intégration ERP/PIM indispensable. Équipe dédiée nécessaire. Potentiel CA 500k-2M€/an. Concurrence directe avec les marketplaces.`,

        category: "catalog-size",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "products-2000+",
        name: "Plus de 2000 produits",
        description: "Mega catalogue - Marketplace ou distributeur",
        category: "catalog-size",
        selected: false,
        mutuallyExclusive: true,
      },

      // Gestion produits (product-management)
      {
        id: "product-variants",
        name: "Variantes de produits",
        description: "Couleurs, tailles, matériaux - gestion SKU automatique",
        explanation: `Gestion des variantes : même produit en plusieurs couleurs/tailles/matériaux. Ex: T-shirt rouge M, T-shirt bleu L, etc. Chaque variante a son propre stock et référence (SKU). Essentiel pour la mode, chaussures, etc. Sans ça, vous devez créer un produit séparé pour chaque couleur.`,
        category: "product-management",
        selected: true,
      },
      {
        id: "product-bundles",
        name: "Produits groupés / Bundles",
        description: "Vente de lots avec prix dégressif",
        explanation: `Produits groupés permettant la vente de lots avec prix dégressif automatique. **C'est quoi ?** Vendre plusieurs produits ensemble avec réduction (ex: "Pack débutant" avec 3 produits). **Pourquoi ?** Augmente le panier moyen de 20-35% (clients achètent plus pour profiter du bundle), simplifie la décision (package prêt), et déstocker produits lents. McDonald's base son CA sur les menus (bundles).`,

        category: "product-management",
        selected: false,
      },
      {
        id: "product-reviews",
        name: "Avis clients vérifiés",
        description: "Reviews avec photos, votes utiles, modération",
        explanation: `Système d'avis clients vérifiés avec photos, notation par étoiles, votes "utile/pas utile". Les clients peuvent uniquement laisser un avis après achat (avis vérifiés). 95% des acheteurs lisent les avis avant d'acheter. Augmente les ventes de 20%.`,
        category: "product-management",
        selected: false,
      },
      {
        id: "product-questions",
        name: "Questions/Réponses produits",
        description: "Clients posent des questions, vous répondez publiquement",
        explanation: `Section Questions/Réponses où clients posent des questions et vous répondez publiquement. **C'est quoi ?** FAQ collaborative directement sur la fiche produit. **Pourquoi ?** Répond aux objections avant l'achat (+15% conversion), réduit le support (la réponse sert à tous), et améliore le SEO (contenu généré par utilisateurs). Amazon, Zalando, tous les grands ont cette fonction.`,

        category: "product-management",
        selected: false,
      },
      {
        id: "wishlist",
        name: "Liste de souhaits",
        description: "Favoris avec notifications de baisse de prix",
        explanation: `Liste de souhaits où les clients sauvent leurs produits favoris pour plus tard. Email automatique si le prix baisse ou le produit va être en rupture. Fidélise les clients (ils reviennent), permet de voir quels produits intéressent le plus (analytics). Augmente les ventes de 20%.`,
        category: "product-management",
        selected: false,
      },
      {
        id: "compare-products",
        name: "Comparateur de produits",
        description: "Comparer jusqu'à 4 produits côte à côte",
        category: "product-management",
        selected: false,
      },
      {
        id: "product-recommendations",
        name: "Recommandations AI",
        description:
          "Suggestions produits basées sur historique et similitudes",
        explanation: `Recommandations produits intelligentes : "Vous aimerez aussi", "Souvent achetés ensemble", "Vus récemment". **C'est quoi ?** Suggestions de produits personnalisées basées sur le comportement. **Pourquoi ?** Augmente le panier moyen de 10-30% (cross-sell/up-sell), améliore la découverte produits, et imite l'expérience "vendeur conseil". Amazon fait 35% de son CA grâce aux recommandations.`,

        category: "product-management",
        selected: false,
      },
      {
        id: "recently-viewed",
        name: "Produits récemment consultés",
        description: "Historique de navigation client",
        explanation: `Historique des produits récemment consultés par le visiteur. **C'est quoi ?** Widget montrant les 5-10 derniers produits vus. **Pourquoi ?** Facilite le retour à un produit vu plus tôt (sans refaire la recherche), augmente le temps passé sur site (+25%), et améliore UX. Basique mais apprécié : 40% des visiteurs l'utilisent.`,

        category: "product-management",
        selected: false,
      },
      {
        id: "quick-view",
        name: "Aperçu rapide",
        description: "Modal produit sans quitter la page catalogue",
        explanation: `Aperçu rapide produit via modal sans quitter la page catalogue. **C'est quoi ?** Popup montrant l'essentiel du produit (prix, photo, ajout panier) sans changer de page. **Pourquoi ?** Réduit les frictions, accélère l'achat impulsif (+18% conversion), et améliore UX mobile. Le visiteur compare rapidement sans perdre sa place. Standard e-commerce moderne.`,

        category: "product-management",
        selected: false,
      },

      // Paiement (payment)
      {
        id: "payment-stripe",
        name: "Stripe (cartes + wallets)",
        description:
          "CB, Visa, Mastercard, Amex, Apple Pay, Google Pay, SEPA - 3D Secure",
        explanation: `Plateforme de paiement complète acceptant toutes les cartes bancaires (Visa, Mastercard, Amex) + Apple Pay et Google Pay pour paiement en 1 clic sur mobile. Paiement sécurisé 3D Secure obligatoire en Europe. Stripe prend 1.5% de commission + 0.25€ par transaction. C'est la solution la plus populaire et fiable.`,
        category: "payment",
        selected: true,
      },
      {
        id: "payment-mollie",
        name: "Mollie (méthodes locales)",
        description: "Bancontact, iDEAL, Sofort - spécifique Belgique/Pays-Bas",
        explanation: `Spécialiste des méthodes de paiement locales belges et néerlandaises : Bancontact (90% des Belges), iDEAL (Pays-Bas), Sofort. Essentiel si vous vendez en Belgique. Commission similaire à Stripe mais meilleure acceptation locale.`,
        category: "payment",
        selected: false,
      },
      {
        id: "payment-paypal",
        name: "PayPal & PayPal Express",
        description: "Alternative populaire - paiement sans création de compte",
        explanation: `PayPal : portefeuille électronique utilisé par 400M de personnes. Permet de payer sans créer de compte (PayPal Express) ou avec compte PayPal. Rassurant pour beaucoup d'acheteurs (protection acheteur). Augmente les conversions de 15%. Commission ~2.5% (plus cher que Stripe mais certains clients ne jurent que par PayPal).`,
        category: "payment",
        selected: false,
      },
      {
        id: "payment-klarna",
        name: "Klarna / Paiement différé (via Stripe)",
        description: "Paiement en 3x ou 4x sans frais - intégré dans Stripe",
        explanation: `Option "Paiez plus tard" très populaire qui permet au client d'acheter maintenant et de payer en 3x ou 4x sans frais. Intégré dans Stripe. Augmente le panier moyen de 20-40% car les clients achètent plus facilement. Klarna prend le risque de non-paiement.`,
        category: "payment",
        selected: false,
      },
      {
        id: "payment-wire-transfer",
        name: "Virement bancaire manuel",
        description:
          "Virement manuel avec instructions - pour commandes importantes",
        explanation: `Paiement par virement bancaire manuel avec instructions automatiques. **C'est quoi ?** Le client reçoit vos coordonnées bancaires et fait un virement classique. **Pourquoi ?** Zéro frais de transaction (vs 1,5-3% CB), rassurant pour gros montants (+1000€), et préféré par certains clients B2B. Délai de paiement 1-3 jours. Commande validée à réception du virement.`,

        category: "payment",
        selected: false,
      },
      {
        id: "payment-invoice",
        name: "Paiement sur facture (B2B)",
        description:
          "Conditions 30/60 jours pour professionnels - Stripe Invoicing",
        explanation: `Paiement sur facture B2B avec conditions 30/60 jours pour professionnels agréés. **C'est quoi ?** Conditions de paiement différé réservées aux clients professionnels validés. **Pourquoi ?** Standard en B2B (80% des transactions), facilite les gros achats (cash flow), et attire les grands comptes. Risque d'impayés à gérer (assurance crédit recommandée). Via Stripe Invoicing ou module dédié.`,

        category: "payment",
        selected: false,
      },

      // Stock & Logistique (inventory)
      {
        id: "stock-management",
        name: "Gestion de stock en temps réel",
        description: "Suivi multi-entrepôts, alertes rupture, réassort auto",
        explanation: `Suivi du stock en temps réel pour chaque produit et variante. Alertes automatiques quand le stock est bas. Empêche la survente (vendre un produit en rupture). Affiche "Plus que 3 en stock" pour créer l'urgence. Essentiel pour éviter les déceptions clients.`,
        category: "inventory",
        selected: true,
      },
      {
        id: "stock-reservations",
        name: "Réservation de stock",
        description: "Stock temporairement bloqué pendant le checkout",
        explanation: `Réservation temporaire de stock pendant le processus de checkout. **C'est quoi ?** Le produit mis au panier est bloqué 15-30 minutes pour éviter double vente. **Pourquoi ?** Évite la frustration (produit devenu indisponible en plein paiement), réduit les surventes, et améliore UX. Essentiel pour produits à stock limité ou forte demande. Amazon le fait sur tous ses produits.`,

        category: "inventory",
        selected: false,
      },
      {
        id: "backorders",
        name: "Précommandes / Backorders",
        description: "Vente de produits en rupture avec date de disponibilité",
        explanation: `Précommandes permettant la vente de produits en rupture avec date de disponibilité. **C'est quoi ?** Clients commandent des produits indisponibles, livrés plus tard. **Pourquoi ?** Ne perdez aucune vente (CA immédiat malgré rupture), jaugez la demande avant production, et fidélisez (le client attend chez vous vs aller concurrent). Apple maîtrise l'art du backorder.`,

        category: "inventory",
        selected: false,
      },
      {
        id: "product-availability-alerts",
        name: "Alertes de disponibilité",
        description:
          "Email automatique quand produit en rupture revient en stock",
        explanation: `Alertes email automatiques quand un produit en rupture revient en stock. **C'est quoi ?** Bouton "M'alerter" sur produits indispos, email auto envoyé au retour stock. **Pourquoi ?** Récupérez des ventes perdues (+15-25% des alertes convertissent), comprenez la demande (combien d'alertes = indicateur), et fidélisez (vous pensez à eux). Coût quasi nul, ROI énorme.`,

        category: "inventory",
        selected: false,
      },

      // Livraison (shipping)
      {
        id: "shipping-flat-rate",
        name: "Tarif de livraison fixe",
        description: "Prix unique quelle que soit la commande",
        explanation: `Tarif de livraison fixe unique quelle que soit la commande. **C'est quoi ?** Frais de port identiques pour toute commande (ex: 5€ partout). **Pourquoi ?** Ultra-simple pour le client (pas de surprise), facile à gérer pour vous, et peut être absorbé dans vos marges. Fonctionne bien si vos produits ont poids/taille homogènes. Evitez si vous vendez du très lourd ET très léger (vous perdez de l'argent).`,

        category: "shipping",
        selected: true,
      },
      {
        id: "shipping-calculation",
        name: "Calcul de livraison dynamique",
        description: "Frais selon poids, destination, et transporteur",
        explanation: `Calcul automatique des frais de port selon poids/dimension/destination. **C'est quoi ?** Algorithme calculant les frais exacts selon le panier et l'adresse. **Pourquoi ?** Précision (vous ne perdez pas d'argent), transparence client, et gestion de produits variés. Alternative aux transporteurs API si vous gérez vous-même la logistique.`,

        category: "shipping",
        selected: false,
      },
      {
        id: "shipping-zones",
        name: "Zones de livraison multiples",
        description: "Tarifs différents par région/pays",
        explanation: `Zones de livraison personnalisées avec tarifs différenciés (Belgique/Europe/Monde). **C'est quoi ?** Définition de zones géographiques avec prix de port spécifiques. **Pourquoi ?** Flexibilité totale (Belgique 5€, UE 12€, Hors UE 25€), rentabilité préservée, et simplicité pour le client. Standard pour tout e-commerce international.`,

        category: "shipping",
        selected: false,
      },
      {
        id: "shipping-carrier-integration",
        name: "Intégration transporteurs",
        description: "Bpost, DHL, UPS, Colissimo - étiquettes automatiques",
        explanation: `Intégration directe transporteurs : génération étiquettes, suivi automatique, pickup scheduling. **C'est quoi ?** Connexion profonde avec Bpost/DPD/UPS pour tout automatiser. **Pourquoi ?** Gain de temps énorme (étiquettes automatiques), erreurs minimisées, suivi client automatique, et tarifs négociés. Indispensable dès 50 colis/semaine. ROI immédiat.`,

        category: "shipping",
        selected: false,
      },
      {
        id: "order-tracking",
        name: "Suivi de commande en temps réel",
        description: "Tracking avec lien transporteur et notifications",
        explanation: `Tracking de commande en temps réel avec notifications automatiques à chaque étape. **C'est quoi ?** Page de suivi montrant l'état exact de la commande (préparation > expédition > livraison). **Pourquoi ?** Réduit les demandes SAV de 60% ("où est ma commande?"), améliore satisfaction client, et réduit l'anxiété post-achat. Amazon a éduqué les clients à ça.`,

        category: "shipping",
        selected: false,
      },
      {
        id: "click-collect",
        name: "Click & Collect",
        description: "Retrait en magasin avec sélection de point",
        explanation: `Click & Collect : commande en ligne, retrait en magasin gratuit. **C'est quoi ?** Service de retrait en boutique physique. **Pourquoi ?** Économise les frais de port, augmente trafic magasin (+40% achats additionnels), réduit retours, et séduit 45% des acheteurs qui préfèrent récupérer directement.`,

        category: "shipping",
        selected: false,
      },
      {
        id: "shipping-free-threshold",
        name: "Livraison gratuite conditionnelle",
        description: "Gratuit au-dessus d'un montant (ex: 50€)",
        explanation: `Livraison gratuite au-dessus d'un seuil : boost panier moyen de 30%. **C'est quoi ?** Frais de port offerts si commande dépasse un montant (ex: gratuit dès 50€). **Pourquoi ?** Clients ajoutent produits pour atteindre seuil (psychologie), conversion +20%, et compensez via volume. 90% des e-commerces l'utilisent. Amazon Prime a démocratisé le concept.`,
        category: "shipping",
        selected: false,
      },
      {
        id: "delivery-date-picker",
        name: "Choix de date de livraison",
        description: "Client sélectionne créneau de livraison souhaité",
        explanation: `Sélecteur de date de livraison permettant au client de choisir quand recevoir. **C'est quoi ?** Calendrier interactif pour choisir le jour de livraison souhaité. **Pourquoi ?** Améliore UX (+20% satisfaction), réduit livraisons ratées (client est là), et différencie (service premium). Essentiel pour gros achats (meubles, électroménager) ou frais (fleurs, alimentaire).`,

        category: "shipping",
        selected: false,
      },

      // Marketing & Promotions (marketing)
      {
        id: "promo-codes",
        name: "Codes promo & coupons",
        description: "Réductions fixes ou %, usage limité, dates d'expiration",
        explanation: `Codes promotionnels avec règles avancées (montant/pourcentage/catégorie/client). **C'est quoi ?** Système de bons de réduction avec conditions personnalisables. **Pourquoi ?** Acquisition (offrez -10% aux nouveaux), fidélisation (code VIP pour clients fidèles), partenariats (codes influenceurs), et réactivation (win-back). Black Friday impossible sans codes promo. Tracez ROI par code.`,
        category: "marketing",
        selected: false,
      },
      {
        id: "flash-sales",
        name: "Ventes flash / Countdown",
        description: "Promotions limitées dans le temps avec timer",
        explanation: `Ventes flash avec compteur temps réel et stock limité visible. **C'est quoi ?** Promotions courtes (24-72h) avec urgence affichée (timer + stock restant). **Pourquoi ?** FOMO (Fear Of Missing Out) = +200% conversions sur période flash. Déstocker rapidement, créer du buzz, et collecter emails (alertes flash sales). Vinted, Veepee, Zalando en abusent car ça marche.`,

        category: "marketing",
        selected: false,
      },
      {
        id: "bulk-discounts",
        name: "Remises quantitatives",
        description: "Prix dégressif selon quantité achetée",
        explanation: `Remises par quantité automatiques (achetez 3, payez 2 ou -10% dès 5 unités). **C'est quoi ?** Prix dégressifs selon quantité achetée. **Pourquoi ?** Augmente panier moyen de 25-40% (incitation volume), déstockage rapide, et attire B2B (gros volumes). Costco base son modèle sur ça. Configuration simple, impact énorme.`,

        category: "marketing",
        selected: false,
      },
      {
        id: "loyalty-program",
        name: "Programme de fidélité",
        description: "Points cumulés, paliers VIP, récompenses",
        explanation: `Programme de fidélité complet avec points, niveaux et récompenses. **C'est quoi ?** Système de fidélisation multi-facettes (points + avantages exclusifs). **Pourquoi ?** Clients fidèles dépensent 67% de plus, coût acquisition 5x moindre que nouveaux clients, et CLV multipliée par 3-5. Sephora génère 80% de son CA via son programme fidélité. Investissement rentabilisé en 6-12 mois.`,

        category: "marketing",
        selected: false,
      },
      {
        id: "gift-cards",
        name: "Cartes cadeaux digitales",
        description: "Vente et utilisation de e-gift cards",
        explanation: `Cartes cadeaux numériques : achat, personnalisation, envoi automatique et gestion des soldes. **C'est quoi ?** Vente de bons d'achat dématérialisés. **Pourquoi ?** CA immédiat (souvent non dépensé = argent gratuit), acquisition de nouveaux clients (cadeau = découverte), et boost période fêtes (+40% CA décembre). 20% des cartes cadeaux ne sont jamais utilisées (pure marge).`,

        category: "marketing",
        selected: false,
      },
      {
        id: "newsletter",
        name: "Newsletter e-commerce",
        description:
          "Inscription newsletter avec automation (panier abandonné, nouveautés)",
        explanation: `Système d'inscription newsletter avec popup ou formulaire intégré. Intégration Mailchimp/Brevo pour envoyer des emails automatiques. Permet de garder contact avec vos visiteurs et les convertir plus tard. Email marketing a un ROI de 4200% (42€ de retour par 1€ investi).`,
        category: "marketing",
        selected: false,
      },
      {
        id: "abandoned-cart",
        name: "Récupération paniers abandonnés",
        description: "Emails automatiques avec code promo",
        explanation: `Emails automatiques de récupération de paniers abandonnés avec code promo incitatif. **C'est quoi ?** Relances automatiques aux abandons de panier. **Pourquoi ?** 70% de paniers abandonnés. Email bien fait en récupère 10-15% = +7-10% CA immédiat. ROI de 4000%. Sequence type : email 1h après (+5% code), rappel 24h, dernier rappel 72h.`,

        category: "marketing",
        selected: false,
      },
      {
        id: "referral-program",
        name: "Programme de parrainage",
        description: "Parrains/filleuls reçoivent des avantages",
        explanation: `Programme de parrainage avec récompenses pour parrain et filleul. **C'est quoi ?** Client existant parraine un ami, tous deux reçoivent une réduction. **Pourquoi ?** Acquisition client 5x moins chère que la pub, taux de conversion 4x supérieur (recommandation d'ami), et croissance virale. Dropbox a explosé grâce au parrainage (espace gratuit). ROI démentiel.`,

        category: "marketing",
        selected: false,
      },
      {
        id: "cross-sell-upsell",
        name: "Cross-sell & Up-sell",
        description: "Produits complémentaires et upgrades suggérés",
        explanation: `Cross-sell et up-sell intelligents : "Souvent achetés ensemble" + "Upgrade disponible". **C'est quoi ?** Suggestions produits complémentaires et supérieurs durant l'achat. **Pourquoi ?** Cross-sell +15-30% panier (frites avec burger), up-sell +10-20% marge (modèle supérieur pour 20€ de plus). Amazon fait 35% de son CA ainsi. Algorithmes simples = gros gains.`,

        category: "marketing",
        selected: false,
      },

      // Expérience client (customer-experience)
      {
        id: "guest-checkout",
        name: "Achat sans compte",
        description: "Checkout simplifié sans création de compte",
        explanation: `Achat invité : commande possible sans créer de compte (email uniquement). **C'est quoi ?** Option d'acheter sans s'inscrire. **Pourquoi ?** 24% des abandons de panier sont dus à la création de compte obligatoire. Proposer les deux options (compte ou invité) maximise les conversions. L'achat invité rapide = achat impulsif favorisé.`,

        category: "customer-experience",
        selected: true,
      },
      {
        id: "one-page-checkout",
        name: "Checkout sur une page",
        description: "Processus de commande ultra-rapide",
        explanation: `Checkout une page : toutes les étapes visibles sur un seul écran. **C'est quoi ?** Processus d'achat condensé sur une page unique. **Pourquoi ?** Réduit abandons de 20-30% (moins de clics = moins de friction), augmente conversions mobiles, et accélère achat impulsif. Recommandé pour paniers <3 produits. Amazon a popularisé le one-click.`,

        category: "customer-experience",
        selected: false,
      },
      {
        id: "customer-accounts",
        name: "Comptes clients complets",
        description: "Historique, adresses, wishlist, points fidélité",
        explanation: `Comptes clients avec historique commandes, wishlist et informations sauvegardées. **C'est quoi ?** Vos clients créent un compte pour retrouver leurs infos et commandes. **Pourquoi ?** Augmente la fidélisation (+35% de commandes repeat), raccourcit le checkout (infos pré-remplies), et permet des fonctions avancées (wishlist, tracking). 73% des e-shoppers préfèrent créer un compte.`,

        category: "customer-experience",
        selected: false,
      },
      {
        id: "order-returns",
        name: "Gestion des retours",
        description: "Système de demande de retour client avec workflow",
        explanation: `Système de retours en ligne : demande, impression étiquette, suivi, remboursement automatique. **C'est quoi ?** Portail self-service pour gérer les retours clients. **Pourquoi ?** Réduit SAV de 50% (client autonome), améliore satisfaction (processus simple = +30% NPS), et obligatoire légalement (14 jours rétractation UE). Zalando a fait des retours gratuits un avantage concurrentiel.`,

        category: "customer-experience",
        selected: false,
      },
      {
        id: "order-invoices",
        name: "Factures automatiques",
        description: "PDF générés et envoyés par email",
        explanation: `Génération automatique de factures PDF conformes, envoi email, et archivage légal. **C'est quoi ?** Système de facturation automatique à chaque commande. **Pourquoi ?** OBLIGATION LÉGALE, gain de temps énorme (zéro saisie manuelle), conformité comptable, et image pro. B2B impossible sans vraies factures. Archivage 10 ans automatique.`,

        category: "customer-experience",
        selected: false,
      },
      {
        id: "live-chat-ecommerce",
        name: "Chat support en direct",
        description: "Widget de chat pour assistance shopping",
        category: "customer-experience",
        selected: false,
      },

      // B2C - Expérience consommateur (b2c)
      {
        id: "b2c-loyalty-program",
        name: "Programme de fidélité",
        description:
          "Points cumulés, récompenses, paliers VIP, offres exclusives",
        explanation: `Programme de fidélité qui récompense vos clients : 1€ dépensé = X points. Les points donnent des réductions, cadeaux, livraison gratuite. Paliers VIP (Bronze/Argent/Or) avec avantages croissants. Augmente le taux de clients réguliers de 40%. Starbucks et Sephora l'utilisent avec succès.`,
        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-gift-cards",
        name: "Cartes cadeaux digitales",
        description: "Vente et utilisation de e-gift cards, personnalisables",
        explanation: `Cartes cadeaux numériques que vos clients peuvent acheter et offrir. Reçues par email avec code unique. Utilisables comme moyen de paiement sur votre site. 20% ne sont jamais utilisées (argent gratuit pour vous). Parfait pour Noël et anniversaires.`,
        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-product-personalization",
        name: "Personnalisation produits",
        description: "Gravure, broderie, impression - customisation client",
        explanation: `Personnalisation produit : texte gravé, choix de matériaux/couleurs, configurateur 3D. **C'est quoi ?** Clients personnalisent le produit avant achat. **Pourquoi ?** Prix premium +30-50% (personnalisation = valeur perçue élevée), différenciation totale, et zéro retour (produit unique). NIKEiD génère des millions. Parfait pour cadeaux, bijoux, textile.`,

        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-gift-wrapping",
        name: "Emballage cadeau",
        description: "Options d'emballage cadeau avec message personnalisé",
        explanation: `Option emballage cadeau avec carte personnalisée et envoi direct au destinataire. **C'est quoi ?** Service d'emballage cadeau payant (+3-5€). **Pourquoi ?** Marge additionnelle pure (coût emballage 0,50€, vente 3-5€), augmente panier moyen, et boost période fêtes (+60% CA décembre). 40% des achats e-commerce sont des cadeaux.`,
        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-gift-registry",
        name: "Liste de naissance / mariage",
        description: "Création et partage de listes d'envies pour événements",
        explanation: `Liste de naissance/mariage : invités achètent depuis la liste, mariés reçoivent tout. **C'est quoi ?** Registre de cadeaux en ligne façon Amazon Wedding Registry. **Pourquoi ?** Acquisition massive (tous les invités découvrent votre site), panier moyen élevé (cadeaux généreux), et fidélisation (couple revient). Crée buzz social. Parfait pour déco, cuisine, bébé.`,
        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-subscription-box",
        name: "Abonnement / Box mensuelle",
        description: "Produits récurrents avec paiement automatique",
        explanation: `Abonnement mensuel avec paiement automatique. Ex: box beauté mensuelle, café tous les mois, etc. Paiement récurrent automatique, client peut annuler quand il veut. Revenu prévisible et fidélisation maximale. Modèle utilisé par Netflix, Spotify, Dollar Shave Club.`,
        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-virtual-try-on",
        name: "Essayage virtuel (AR)",
        description: "Essai virtuel lunettes, vêtements, maquillage via AR",
        explanation: `Essayage virtuel via réalité augmentée (lunettes, maquillage, vêtements). **C'est quoi ?** IA qui simule le produit sur une photo du client. **Pourquoi ?** Réduit retours de 35% (bon choix dès le départ), effet wow (partages sociaux), et +50% conversion. Warby Parker, Sephora, IKEA l'ont généralisé. Technologies accessibles (Snap AR, Banuba).`,

        category: "b2c",
        selected: false,
      },
      {
        id: "b2c-size-guide",
        name: "Guide des tailles intelligent",
        description: "Recommandations de taille basées sur mesures client",
        explanation: `Guide des tailles interactif avec mesures et recommandations personnalisées. **C'est quoi ?** Outil aidant à choisir la bonne taille via questions/mesures. **Pourquoi ?** Réduit retours de 25% (principale raison = mauvaise taille), améliore satisfaction, et augmente conversion (+15%). Obligatoire en mode/chaussures. Algorithmes prédictifs très efficaces.`,

        category: "b2c",
        selected: false,
      },

      // B2B - Vente professionnelle (b2b)
      {
        id: "b2b-pricing",
        name: "Tarifs B2B personnalisés",
        description: "Prix différents selon type de client (B2C/B2B)",
        explanation: `Tarifs B2B différenciés : grilles de prix par client/segment avec remises progressives. **C'est quoi ?** Chaque client pro a ses propres prix négociés. **Pourquoi ?** Standard B2B (impossible de facturer le même prix à tous), gestion des contrats cadres, et flexibilité commerciale totale. Cachez les prix aux visiteurs non connectés. Intégration ERP recommandée.`,

        category: "b2b",
        selected: false,
      },
      {
        id: "b2b-wholesale",
        name: "Vente en gros / Wholesale",
        description: "Commandes minimales, tarifs dégressifs volume",
        explanation: `Espace B2B/Grossiste : tarifs professionnels, commandes en gros, catalogues privés, paiement à terme. **C'est quoi ?** Section dédiée aux professionnels avec prix de gros et conditions spécifiques. **Pourquoi ?** Doublez votre marché (B2C + B2B), marges supérieures sur volumes, et fidélisation pro (commandes récurrentes). Zéro cannibalisation si les prix pros sont cachés aux particuliers.`,

        category: "b2b",
        selected: false,
      },
      {
        id: "b2b-quotes",
        name: "Demandes de devis B2B",
        description: "System de devis pour commandes personnalisées",
        explanation: `Système de devis B2B : demande, génération PDF, négociation, conversion en commande. **C'est quoi ?** Workflow complet de gestion des devis professionnels. **Pourquoi ?** Process B2B standard (peu d'achat direct, tout passe par devis), suivi commercial, historique, et conversion tracking. Évite emails interminables. CRM intégré = dream.`,

        category: "b2b",
        selected: false,
      },
      {
        id: "b2b-quick-order",
        name: "Commande rapide B2B",
        description: "Upload CSV ou saisie SKU en masse",
        explanation: `Commande rapide B2B : saisie CSV, scan codes-barres, réapprovisionnement auto. **C'est quoi ?** Interface de commande optimisée pour achats récurrents. **Pourquoi ?** Clients B2B commandent souvent les mêmes produits. Quick order réduit friction de 90%, fidélise (trop facile de commander chez vous pour aller ailleurs), et volume +40%. Essayer c'est l'adopter.`,

        category: "b2b",
        selected: false,
      },

      // International (international)
      {
        id: "multi-currency",
        name: "Multi-devises",
        description: "EUR, USD, GBP avec taux de change automatique",
        explanation: `Support multi-devises avec conversion automatique et paiement dans la devise choisie. **C'est quoi ?** Site affiche prix dans plusieurs devises (EUR/USD/GBP). **Pourquoi ?** Vente internationale facilitée (+25% conversions hors zone euro), prix psychologique optimisé (19.99$ vs 18€), et crédibilité pro. Taux de change mis à jour quotidiennement. Stripe gère ça nativement.`,

        category: "international",
        selected: false,
      },
      {
        id: "multi-language-shop",
        name: "Boutique multilingue",
        description: "FR/NL/EN avec traduction produits et checkout",
        explanation: `E-commerce multilingue avec traductions produits, checkout et emails. **C'est quoi ?** Toute la boutique traduite en plusieurs langues. **Pourquoi ?** 75% des clients préfèrent acheter dans leur langue. Traduction = +40% conversion. Si vous vendez en UE, le multilingue est quasi obligatoire. Attention : traduction auto (Google) = amateur. Vraies traductions nécessaires.`,

        category: "international",
        selected: false,
      },
      {
        id: "tax-management",
        name: "Gestion TVA/Taxes",
        description: "Calcul automatique TVA par pays, B2B exempt",
        explanation: `Gestion automatique de la TVA : taux par pays/catégorie, B2B reverse-charge, exonérations. **C'est quoi ?** Système calculant la TVA correcte selon règles complexes UE. **Pourquoi ?** OBLIGATION LÉGALE : TVA 21% BE, 19% DE, 20% FR, etc. B2B intracommunautaire = autoliquidation. Erreur = redressement fiscal. Un module dédié évite cauchemars. Stripe Tax recommandé.`,

        category: "international",
        selected: false,
      },
      {
        id: "gdpr-compliance",
        name: "Conformité RGPD",
        description: "Cookies, consentement, droit à l'oubli, export données",
        category: "international",
        selected: false,
      },

      // Intégrations (integrations)
      {
        id: "crm-integration-ecommerce",
        name: "Intégration CRM",
        description: "HubSpot, Salesforce, Zoho - sync clients automatique",
        category: "integrations",
        selected: false,
      },
      {
        id: "email-marketing-integration-ecommerce",
        name: "Email marketing",
        description: "Mailchimp, Klaviyo, Brevo - segments automatiques",
        category: "integrations",
        selected: false,
      },
      {
        id: "erp-integration",
        name: "Intégration ERP",
        description: "SAP, Odoo, Microsoft Dynamics - sync stock/commandes",
        explanation: `Intégration ERP (SAP, Odoo, Sage) : sync bidirectionnelle produits, stocks, commandes. **C'est quoi ?** Connexion entre e-commerce et votre logiciel de gestion. **Pourquoi ?** UNE source de vérité (stock réel), zéro double saisie, erreurs éliminées, et scalabilité. Indispensable dès 100 commandes/mois. Investissement rentabilisé en 3-6 mois (temps gagné).`,

        category: "integrations",
        selected: false,
      },
      {
        id: "accounting-integration",
        name: "Logiciel de comptabilité",
        description: "Exact Online, Yuki, Sage - export factures auto",
        explanation: `Intégration comptabilité (Yuki, Exact, Pennylane) : factures, paiements, TVA automatiques. **C'est quoi ?** Lien direct avec votre logiciel comptable. **Pourquoi ?** Votre comptable vous aime (+50%), clôtures mensuelles 10x plus rapides, et zéro erreur de saisie. Obligations fiscales respectées automatiquement. Indispensable en B2B.`,

        category: "integrations",
        selected: false,
      },
      {
        id: "google-merchant",
        name: "Google Merchant Center",
        description: "Flux produits automatique pour Google Shopping",
        explanation: `Google Merchant Center : flux produits automatique pour Google Shopping (gratuit). **C'est quoi ?** Export automatique de vos produits vers Google Shopping. **Pourquoi ?** Trafic qualifié GRATUIT (Google Shopping Free Listings depuis 2020). 60% des recherches produits commencent sur Google. ROI infini (gratuit). Seuls 20% des e-commerçants l'ont fait = opportunité.`,

        category: "integrations",
        selected: false,
      },
      {
        id: "facebook-catalog",
        name: "Catalogue Facebook/Instagram",
        description: "Sync produits pour vente sur réseaux sociaux",
        explanation: `Catalogue Facebook/Instagram : vente directe via Facebook Shops et Instagram Shopping. **C'est quoi ?** Vos produits vendables directement sur Facebook/Instagram. **Pourquoi ?** 1,3 milliards d'utilisateurs Instagram Shopping, checkout natif (client n'a plus besoin de quitter l'app), et reach énorme. 44% de découverte produit se fait sur Instagram. Intégration = 30min, ROI = permanent.`,

        category: "integrations",
        selected: false,
      },
      {
        id: "marketplace-sync",
        name: "Sync marketplaces",
        description: "Amazon, eBay, Bol.com - gestion centralisée",
        explanation: `Synchronisation marketplaces : Bol.com, Amazon, eBay (produits, stocks, commandes). **C'est quoi ?** Gestion centralisée de tous vos canaux de vente. **Pourquoi ?** Vendez partout sans gérer 5 interfaces, stock synchronisé en temps réel (pas de survente), et commandes centralisées. Amazon = 50% du e-commerce, Bol.com = leader Benelux. Impossible de les ignorer.`,

        category: "integrations",
        selected: false,
      },

      // Security & Compliance (security-compliance)
      {
        id: "rgpd-ecommerce",
        name: "Conformité RGPD e-commerce",
        description: "Protection données clients, cookies, consentement",
        explanation: `Conformité RGPD spécifique e-commerce : gestion des consentements clients, protection données personnelles et paiement, registre des traitements, politique de confidentialité boutique. **C'est quoi ?** Respect des obligations légales européennes pour les données clients e-commerce. **Pourquoi ?** OBLIGATOIRE sous peine d'amendes jusqu'à 20M€ ou 4% du CA. Rassure vos clients (85% vérifient avant achat), réduit abandon panier, et protège votre réputation. Inclut banner cookies conforme et opt-in marketing.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "ssl-ecommerce",
        name: "Certificat SSL e-commerce",
        description: "Chiffrement renforcé pour transactions sécurisées",
        explanation: `Certificat SSL renforcé (EV SSL ou OV SSL) pour e-commerce avec validation étendue et chiffrement 256-bit. **C'est quoi ?** Certificat SSL premium affichant votre nom d'entreprise dans la barre d'adresse (cadenas vert + nom). **Pourquoi ?** OBLIGATOIRE pour paiements en ligne, inspire confiance maximale (nom visible = légitime), requis par Stripe/PayPal, et élimine l'avertissement "Non sécurisé". 18% des abandons de panier sont dus à des inquiétudes de sécurité.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "pci-dss",
        name: "Conformité PCI-DSS paiements",
        description: "Norme de sécurité pour traitement cartes bancaires",
        explanation: `Conformité PCI-DSS (Payment Card Industry Data Security Standard) pour traitement sécurisé des paiements par carte. **C'est quoi ?** Norme de sécurité internationale obligatoire pour tout site acceptant les cartes bancaires. **Pourquoi ?** OBLIGATOIRE légalement, protège contre les fraudes et vols de données bancaires, évite amendes massives (5k-100k€/mois), et maintient votre agrément avec Visa/Mastercard. Utilisation de Stripe/PayPal facilite la conformité (ils gèrent la partie complexe).`,
        category: "security-compliance",
        selected: false,
      },
      {
        id: "fraud-detection",
        name: "Détection de fraude automatique",
        description:
          "IA anti-fraude, scoring des transactions, blocage automatique",
        explanation: `Système de détection de fraude par IA analysant chaque transaction en temps réel (adresse IP, device fingerprint, comportement, historique). **C'est quoi ?** Protection automatique contre fraudes à la carte bancaire et chargebacks. **Pourquoi ?** La fraude e-commerce coûte 20 milliards€/an. Chargebacks = perte produit + argent + frais (25-100€). Un taux > 1% = compte paiement fermé. L'IA bloque 99% des fraudes tout en validant les vrais clients. Stripe Radar, Signifyd ou équivalent.`,
        category: "security-compliance",
        selected: false,
      },

      // Analytics (analytics)
      {
        id: "google-analytics-ecommerce",
        name: "Google Analytics 4 E-commerce",
        description: "Tracking avancé ventes, produits, revenus, funnel",
        explanation: `Google Analytics 4 configuré spécifiquement pour e-commerce avec Enhanced Ecommerce : tracking complet des ventes, performances produits, revenus, panier moyen, tunnel de conversion. **C'est quoi ?** GA4 optimisé pour analyser votre boutique en ligne avec métriques e-commerce. **Pourquoi ?** Comprenez quels produits se vendent (ou pas), d'où viennent vos acheteurs, quel canal marketing génère le plus de CA, et où les clients abandonnent. Données essentielles pour optimiser rentabilité. 92% des e-commerces performants l'utilisent.`,
        category: "analytics",
        selected: true,
      },
      {
        id: "conversion-funnel",
        name: "Analyse tunnel de conversion",
        description: "Visualisation étapes achat et taux d'abandon",
        explanation: `Analyse détaillée du tunnel de conversion e-commerce : taux de passage entre chaque étape (produit → panier → checkout → paiement → confirmation). **C'est quoi ?** Visualisation précise où les clients abandonnent leur achat. **Pourquoi ?** Identifie les points de friction (ex: 60% abandonnent au paiement = problème formulaire). Chaque 1% d'amélioration = +1% CA. Permet d'optimiser par étape et prioriser les corrections. A/B testing devient rentable et ciblé.`,
        category: "analytics",
        selected: false,
      },
      {
        id: "abandoned-cart-tracking",
        name: "Suivi paniers abandonnés",
        description: "Analytics détaillé des abandons, raisons, valeur perdue",
        explanation: `Tracking détaillé des abandons de panier : quand, pourquoi, quels produits, valeur totale perdue, segmentation clients. **C'est quoi ?** Analytics spécialisé sur les paniers non finalisés. **Pourquoi ?** 70% de paniers sont abandonnés = CA potentiel perdu. Comprendre POURQUOI (prix trop élevé, frais de port, processus trop long) permet d'agir. Moyenne industrie : 10k€ CA perdu/mois récupérable à 15-20% avec bonnes actions. Complète la récupération email.`,
        category: "analytics",
        selected: false,
      },

      // Marketing Features (marketing-advanced)
      {
        id: "subscription-model",
        name: "Abonnements / Modèle récurrent",
        description: "Paiements récurrents, gestion abonnements clients",
        explanation: `Système d'abonnements complet : paiements récurrents automatiques (mensuel/annuel), gestion pauses/résiliations, facturation automatique, renouvellements. **C'est quoi ?** Modèle économique par abonnement (SaaS-like) pour produits physiques. **Pourquoi ?** Revenus prévisibles et récurrents (MRR), valeur client vie multipliée par 5-10x, rétention maximale, et trésorerie stable. Dollar Shave Club vendu 1 milliard$ grâce à ce modèle. Parfait pour consommables (café, beauté, alimentaire).`,
        category: "marketing-advanced",
        selected: false,
      },
      {
        id: "product-recommendations-ai",
        name: "Recommandations produits IA avancées",
        description: "Machine learning pour upsell/cross-sell personnalisés",
        explanation: `Moteur de recommandations par machine learning ultra-personnalisé : historique achats, comportement, similarités produits, tendances. **C'est quoi ?** IA qui suggère les bons produits au bon moment à chaque client. **Pourquoi ?** Augmente panier moyen de 20-40% (vs 10-15% basique), améliore découverte catalogue, et imite vendeur expert. Amazon fait 35% de son CA via recommandations. Algorithmes type collaborative filtering + deep learning.`,
        category: "marketing-advanced",
        selected: false,
      },
      {
        id: "dynamic-pricing",
        name: "Prix dynamiques / Smart pricing",
        description:
          "Ajustement prix automatique selon demande, stock, concurrence",
        explanation: `Pricing dynamique intelligent : prix ajustés automatiquement selon stock restant, demande, saisonnalité, prix concurrence. **C'est quoi ?** Algorithme qui optimise vos prix en temps réel pour maximiser profit. **Pourquoi ?** Augmente marge de 5-25% (prix optimaux vs prix fixes), déstocker automatiquement (baisse prix si stock élevé), et compétitivité maintenue. Amazon change ses prix toutes les 10 minutes. Utilisé par airlines, hôtels, e-commerce leaders.`,
        category: "marketing-advanced",
        selected: false,
      },
      {
        id: "social-proof-widgets",
        name: "Widgets de preuve sociale",
        description:
          "Notifications temps réel achats, stock limité, popularité",
        explanation: `Widgets de preuve sociale en temps réel : "15 personnes regardent ce produit", "Marie de Bruxelles vient d'acheter", "Plus que 3 en stock". **C'est quoi ?** Notifications dynamiques créant urgence et confiance. **Pourquoi ?** Augmente conversion de 15-30% (FOMO + validation sociale), réduit hésitation, et crée dynamique d'achat. 92% des consommateurs font confiance aux actions d'autres acheteurs. Booking.com base sa stratégie dessus.`,
        category: "marketing-advanced",
        selected: false,
      },
      {
        id: "referral-program-ecommerce",
        name: "Programme de parrainage",
        description: "Parrainage clients avec récompenses automatiques",
        explanation: `Programme de parrainage automatisé : clients invitent leurs amis et reçoivent récompenses (réduction, crédit boutique). **C'est quoi ?** Marketing bouche-à-oreille incentivé et trackable. **Pourquoi ?** Acquisition clients 5x moins chère (CAC divisé par 5), taux conversion 4x supérieur (recommandation amis), et viralité naturelle. Dropbox a grandi de 3900% grâce au parrainage. Clients parrainés ont 37% rétention supérieure.`,
        category: "marketing-advanced",
        selected: false,
      },
      {
        id: "post-purchase-upsell",
        name: "Upsell post-achat",
        description: "Offres complémentaires après validation commande",
        explanation: `Offres d'upsell post-achat : après paiement validé, proposer produits complémentaires avec 1-click add (pas de re-saisie). **C'est quoi ?** Vente additionnelle juste après l'achat principal. **Pourquoi ?** Client est en mode achat (conversion 10-20% vs 2-3% normal), friction zéro (déjà payé), et panier moyen +15-25%. Shopify a intégré cette fonction native. Parfait pour accessoires, extensions garantie, produits consommables.`,
        category: "marketing-advanced",
        selected: false,
      },
    ],
  },

  appWeb: {
    id: "appWeb",
    name: "Application Web",
    description:
      "Application métier professionnelle sur mesure (SaaS, CRM, ERP, Intranet)",
    icon: "💻",
    basePrice: 10000,
    estimatedTimelineWeeks: { min: 8, max: 32 },
    features: [
      // Authentification & Sécurité (auth)
      {
        id: "auth-basic",
        name: "Authentification complète",
        description:
          "Inscription, connexion, reset password, email verification",
        explanation: `Authentification basique : email/mot de passe avec validation et récupération. **C'est quoi ?** Système de connexion standard par email/password. **Pourquoi ?** Contrôle d'accès nécessaire (comptes clients, admin), sécurisé si bien fait (bcrypt), et attendu par utilisateurs. Le minimum pour tout site avec comptes.`,

        category: "auth",
        selected: true,
      },
      {
        id: "auth-social",
        name: "Connexion sociale (OAuth)",
        description: "Google, Microsoft, Facebook, LinkedIn, GitHub",
        explanation: `Connexion sociale : "Se connecter avec Google/Facebook/Apple". **C'est quoi ?** Login via comptes sociaux existants. **Pourquoi ?** +20% conversions signup (zéro formulaire à remplir), moins d'abandons, et données enrichies (photo, nom). 77% préfèrent social login vs créer nouveau compte. Google OAuth le plus utilisé.`,

        category: "auth",
        selected: false,
      },
      {
        id: "auth-2fa",
        name: "Double authentification (2FA)",
        description: "TOTP (Google Authenticator, Authy), SMS, Email",
        explanation: `Authentification à deux facteurs via SMS, app (Google Authenticator) ou email. **C'est quoi ?** Double vérification lors de la connexion. **Pourquoi ?** 99,9% des hacks bloqués par 2FA. Protection comptes sensibles (admin, clients VIP). Rassurant pour B2B. Norme de sécurité 2024. Optionnel pour clients, obligatoire pour admins.`,

        category: "auth",
        selected: false,
      },
      {
        id: "auth-sso",
        name: "Single Sign-On (SSO)",
        description: "SAML 2.0, OpenID Connect pour entreprise",
        explanation: `Single Sign-On : connexion unique partagée entre plusieurs applications de votre écosystème. **C'est quoi ?** Un seul login pour accéder à tous vos services. **Pourquoi ?** UX fluide (connexion une fois = accès partout), sécurité centralisée, et gestion simplifiée. Nécessaire si vous avez site + app mobile + backoffice. Google Workspace, Office 365 le font.`,

        category: "auth",
        selected: false,
      },
      {
        id: "auth-ldap",
        name: "Intégration LDAP/Active Directory",
        description: "Authentification avec AD d'entreprise",
        category: "auth",
        selected: false,
      },
      {
        id: "auth-magic-link",
        name: "Magic Links (Passwordless)",
        description: "Connexion sans mot de passe par email",
        explanation: `Magic Link : connexion sans mot de passe via lien email. **C'est quoi ?** Clic sur lien reçu par email = connecté, zéro password. **Pourquoi ?** UX parfaite (pas de password oublié), sécurité élevée (lien unique temporaire), et tendance 2024 (Slack, Medium l'utilisent). Conversion +15% vs password classique.`,

        category: "auth",
        selected: false,
      },

      // Gestion utilisateurs (users)
      {
        id: "user-profiles",
        name: "Profils utilisateurs",
        description: "Gestion complète avec avatar, bio, préférences",
        explanation: `Profils utilisateurs complets : photo, bio, préférences, historique, documents. **C'est quoi ?** Page de profil riche pour chaque utilisateur. **Pourquoi ?** Personnalisation expérience, historique accessible, fidélisation (investissement client dans son profil), et communauté (si aspect social). LinkedIn, GitHub basent tout là-dessus.`,

        category: "users",
        selected: true,
      },
      {
        id: "user-roles",
        name: "Système de rôles (RBAC)",
        description: "Admin, Manager, User, Custom roles",
        explanation: `Système de rôles granulaire : Admin, Manager, Editor, Viewer avec permissions custom. **C'est quoi ?** Gestion fine des droits d'accès selon rôle. **Pourquoi ?** Sécurité (stagiaire ≠ CEO), workflows respectés (validation hiérarchique), et responsabilités claires. Indispensable dès 3+ utilisateurs. RBAC (Role-Based Access Control) standard.`,

        category: "users",
        selected: false,
      },
      {
        id: "user-permissions",
        name: "Permissions granulaires (ACL)",
        description: "Contrôle fin des accès par ressource et action",
        explanation: `Permissions granulaires (ACL) : contrôle fin des droits par action et ressource. **C'est quoi ?** Système de permissions détaillé au niveau action (créer/lire/modifier/supprimer par objet). **Pourquoi ?** Sécurité maximale (principe du moindre privilège), conformité (séparation des rôles), et flexibilité (permissions custom par utilisateur). Enterprise-grade. RBAC + ABAC combinés.`,
        category: "users",
        selected: false,
      },
      {
        id: "user-groups",
        name: "Groupes & équipes",
        description: "Organisation des utilisateurs en groupes/départements",
        explanation: `Groupes et équipes avec permissions héritées et hiérarchie organisationnelle. **C'est quoi ?** Organisation des utilisateurs en groupes avec droits partagés. **Pourquoi ?** Gestion simplifiée (ajoutez au groupe "Marketing" = toutes les permissions marketing), reflète structure entreprise, et scalabilité (1000 users gérables). Slack, Microsoft Teams basent tout là-dessus.`,
        category: "users",
        selected: false,
      },
      {
        id: "user-impersonation",
        name: "Mode impersonnification",
        description:
          "Admins peuvent se connecter comme un utilisateur (support)",
        explanation: `Mode impersonnification : admin se connecte comme un utilisateur pour déboguer. **C'est quoi ?** Admins peuvent "devenir" un utilisateur temporairement. **Pourquoi ?** Support niveau 10x (voir exactement ce que voit le client), debug rapide ("ça marche pas" devient "ah je vois le bug"), et formation facilitée. Audit trail obligatoire pour traçabilité. Shopify, Salesforce l'ont.`,
        category: "users",
        selected: false,
      },
      {
        id: "user-activity-log",
        name: "Journal d'activité utilisateur",
        description: "Audit trail complet des actions utilisateurs",
        explanation: `Journal d'activité complet : qui a fait quoi et quand, avec filtres et export. **C'est quoi ?** Historique détaillé de toutes les actions utilisateurs. **Pourquoi ?** Audit trail (conformité SOC2/ISO27001), investigation incidents, preuve légale, et analytics comportementaux. RGPD compliant. Retention paramétrable. Indispensable secteurs régulés (finance, santé).`,
        category: "users",
        selected: false,
      },

      // Tableau de bord (dashboard)
      {
        id: "dashboard-basic",
        name: "Tableau de bord simple",
        description: "Vue d'ensemble avec widgets statiques (3-5 KPIs)",
        explanation: `Tableau de bord simple avec métriques clés et graphiques essentiels. **C'est quoi ?** Page d'accueil montrant KPIs principaux (CA, commandes, visiteurs). **Pourquoi ?** Vision instantanée de votre activité, prise de décision rapide, et motivation équipe (voir progression). Mieux qu'un Excel. Refresh temps réel possible. Le minimum pour toute app métier.`,
        category: "dashboard",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "dashboard-advanced",
        name: "Tableau de bord avancé",
        description:
          "Dashboards personnalisables, drag & drop, filtres dynamiques",
        explanation: `Tableau de bord avancé : widgets personnalisables, drill-down, période comparée. **C'est quoi ?** Dashboard configurable avec interactions (clic sur graphique = détails). **Pourquoi ?** Chaque manager a son dashboard (ventes vs prod vs finance), comparaisons période (vs mois dernier, vs année passée), et autonomie analytics. Notion de "single pane of glass". ROI mesurable.`,
        category: "dashboard",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "dashboard-analytics",
        name: "Dashboard analytics BI",
        description:
          "Business Intelligence avec graphiques interactifs (Chart.js, D3.js)",
        explanation: `Dashboard analytics BI : rapports sophistiqués, prédictions, insights IA. **C'est quoi ?** Business Intelligence avancée avec machine learning. **Pourquoi ?** Prédictions (CA prévu mois prochain), détection anomalies (alerte si KPI anormal), et insights automatiques ("Top produit = X"). Tableau, Power BI, mais intégré. Pour data-driven orgs.`,
        category: "dashboard",
        selected: false,
        mutuallyExclusive: true,
      },

      // Gestion de données (data)
      {
        id: "crud-simple",
        name: "CRUD simple (1-3 entités)",
        description: "1-3 modèles de données avec opérations basiques",
        explanation: `CRUD simple pour 1-3 entités métier avec formulaires et listes. **C'est quoi ?** Gestion basique de vos données (Create/Read/Update/Delete). **Pourquoi ?** Remplace Excel (limites dépassées), multi-utilisateurs simultanés, validation automatique, et historique. Ex: gestion contacts, produits, commandes. Base de toute app métier.`,
        category: "data",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "crud-medium",
        name: "CRUD moyen (4-8 entités)",
        description: "4-8 modèles avec relations et validations",
        explanation: `CRUD moyen pour 4-8 entités avec relations et validations complexes. **C'est quoi ?** Gestion de données avec liens entre entités (clients ↔ commandes ↔ produits). **Pourquoi ?** Reflète vraiment votre métier (rarement <5 entités), intégrité référentielle garantie, et workflows réalistes. 80% des apps métier sont du CRUD bien fait. Investissement rentabilisé en <6 mois.`,
        category: "data",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "crud-complex",
        name: "CRUD complexe (9-15 entités)",
        description: "9-15 modèles avec relations complexes et logique métier",
        explanation: `CRUD complexe pour 9-15 entités avec architecture modulaire et évolutive. **C'est quoi ?** Système complet gérant tous vos processus métier. **Pourquoi ?** Remplace 3-5 logiciels disparates, données centralisées (une seule vérité), et personnalisé exactement à vos besoins. ERP/CRM sur mesure. Avantage concurrentiel si bien fait.`,
        category: "data",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "data-import-export",
        name: "Import/Export de données",
        description: "CSV, Excel (XLSX), JSON avec mapping configurable",
        explanation: `Import/Export de données : CSV, Excel, JSON avec mapping et validation. **C'est quoi ?** Outils pour importer/exporter vos données en masse. **Pourquoi ?** Migration depuis ancien système, intégration avec partenaires, backup manuel, et conformité (RGPD = droit portabilité). Excel reste roi pour beaucoup. Validation évite imports foireux.`,
        category: "data",
        selected: false,
      },
      {
        id: "data-bulk-operations",
        name: "Opérations en masse",
        description: "Édition, suppression, export groupés",
        explanation: `Opérations en masse : modification/suppression de centaines d'éléments en un clic. **C'est quoi ?** Actions groupées sur sélection multiple. **Pourquoi ?** Gain de temps colossal (modifier 500 prix en 2 min vs 5h), erreurs réduites (une règle appliquée partout), et productivité x10. Excel le fait, votre app aussi doit le faire.`,
        category: "data",
        selected: false,
      },
      {
        id: "data-versioning",
        name: "Versioning de données",
        description: "Historique des modifications avec rollback",
        explanation: `Versioning de données : historique complet, restauration, comparaison versions. **C'est quoi ?** Chaque modification est sauvegardée, retour arrière possible. **Pourquoi ?** Sécurité (erreur = restauration), audit trail (qui a changé quoi), et collaboration sereine (pas peur de casser). Git mais pour vos données métier. Secteurs régulés l'exigent.`,
        category: "data",
        selected: false,
      },
      {
        id: "data-validation",
        name: "Validation avancée",
        description: "Règles métier complexes, validation cross-field",
        explanation: `Validation avancée : règles métier complexes, cross-field, async checks. **C'est quoi ?** Vérifications sophistiquées avant sauvegarder (ex: IBAN valide, email unique, stock suffisant). **Pourquoi ?** Qualité données garantie (garbage in garbage out), erreurs bloquées en amont, et confiance utilisateurs. Les bugs de validation coûtent cher. Investir ici = économies massives.`,
        category: "data",
        selected: false,
      },

      // Workflows & Automatisation (workflow)
      {
        id: "workflow-basic",
        name: "Workflow linéaire simple",
        description: "Processus en 2-3 étapes fixes",
        explanation: `Workflow linéaire simple : étapes séquentielles avec validations. **C'est quoi ?** Processus guidé étape par étape (nouveau → en cours → validé → terminé). **Pourquoi ?** Processus respectés (pas d'oublis), traçabilité (où en est le dossier?), et formation simplifiée (l'app guide). 70% des processus métier sont linéaires. ROI immédiat.`,
        category: "workflow",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "workflow-advanced",
        name: "Workflow configurable",
        description: "États personnalisables, transitions conditionnelles",
        explanation: `Workflow configurable : embranchements, conditions, rôles multiples. **C'est quoi ?** Processus complexes avec chemins conditionnels (si montant >1000€ → validation manager). **Pourquoi ?** Reflète la réalité (rarement linéaire), automatise décisions, et scale (ajoutez étapes sans redev). Workflows = différenciateur concurrentiel. Zapier/n8n mais custom.`,
        category: "workflow",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "workflow-visual-builder",
        name: "Visual Workflow Builder",
        description: "Éditeur graphique drag & drop pour créer workflows",
        explanation: `Visual Workflow Builder : conception workflows en drag & drop sans code. **C'est quoi ?** Interface graphique pour créer/modifier workflows (comme Zapier visuel). **Pourquoi ?** Business users autonomes (pas besoin dev pour changer processus), agilité maximale (adapter en minutes), et documentation visuelle (tout le monde comprend). Salesforce Flow, monday.com le font.`,
        category: "workflow",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "approval-system",
        name: "Système d'approbation",
        description: "Validation multi-niveaux avec délégation",
        explanation: `Système d'approbation : demandes, multi-niveaux, délégation, relances automatiques. **C'est quoi ?** Workflows de validation hiérarchique (employé → manager → directeur). **Pourquoi ?** Conformité (dépenses >X = approbation), traçabilité (qui a validé?), et automatisation relances (manager oublie = rappel J+2). Standard corporate. SAP/Oracle en ont tous.`,
        category: "workflow",
        selected: false,
      },
      {
        id: "task-automation",
        name: "Automatisation de tâches",
        description: "Triggers, scheduled jobs, webhooks",
        explanation: `Automatisation de tâches : triggers, actions programmées, conditions complexes. **C'est quoi ?** Actions automatiques selon événements (nouveau client → email bienvenue + ajout CRM). **Pourquoi ?** Zéro oubli (machine fiable), vitesse (instantané), et scalabilité (gérez 10k clients comme 10). Zapier interne. ROI démentiel : une automation = 2-20h/semaine gagnées.`,
        category: "workflow",
        selected: false,
      },

      // Notifications & Communication (notifications)
      {
        id: "email-notifications",
        name: "Notifications email",
        description: "Emails transactionnels avec templates personnalisables",
        explanation: `Notifications email : templates personnalisables, envoi asynchrone, tracking ouvertures. **C'est quoi ?** Emails automatiques depuis votre app (confirmations, alertes, rappels). **Pourquoi ?** Communication essentielle (80% préfèrent email), preuve écrite (traçabilité), et réengagement. Resend, SendGrid pour l'infra. Templates = cohérence visuelle. Taux ouverture = KPI.`,
        category: "notifications",
        selected: false,
      },
      {
        id: "push-notifications",
        name: "Notifications push (Web)",
        description: "Push notifications navigateur en temps réel",
        explanation: `Notifications push web : alertes navigateur même site fermé (PWA). **C'est quoi ?** Notifications desktop/mobile via navigateur (comme app native). **Pourquoi ?** Réengagement +35% (rappel discret), temps réel (nouvelle commande? ping), et gratuit vs SMS. PWA nécessaire. Permission utilisateur requise. Firebase Cloud Messaging standard.`,
        category: "notifications",
        selected: false,
      },
      {
        id: "sms-notifications",
        name: "Notifications SMS",
        description: "Envoi SMS via Twilio ou similaire",
        explanation: `Notifications SMS : envoi worldwide, templates, tracking livraison. **C'est quoi ?** SMS automatiques pour alertes critiques. **Pourquoi ?** Taux ouverture 98% (vs 20% email), instantané, et universel (tout le monde a SMS). Cher (0,05-0,10€/SMS) donc réservé au critique : 2FA, livraison imminente, urgences. Twilio leader.`,
        category: "notifications",
        selected: false,
      },
      {
        id: "in-app-notifications",
        name: "Notifications in-app",
        description: "Centre de notifications avec marquage lu/non-lu",
        explanation: `Notifications in-app : centre de notifications, badge compteur, marquage lu/non-lu. **C'est quoi ?** Bell icon avec pastille rouge genre Facebook/LinkedIn. **Pourquoi ?** Engagement utilisateur (+60% rétention), découverte features (nudges), et UX moderne attendue. Real-time via WebSocket. Archive automatique après 30j.`,
        category: "notifications",
        selected: false,
      },
      {
        id: "notification-preferences",
        name: "Préférences de notifications",
        description:
          "Utilisateurs contrôlent leurs notifications (email, push, SMS)",
        explanation: `Préférences de notifications : désactivation sélective par canal et type. **C'est quoi ?** Utilisateurs choisissent quelles notifs recevoir et comment. **Pourquoi ?** RGPD compliant (consentement), réduit désabonnements totaux (ils coupent le superflu, gardent l'important), et UX respectueuse. Amazon laisse tout paramétrer. Standard 2024.`,
        category: "notifications",
        selected: false,
      },

      // Fichiers & Documents (files)
      {
        id: "file-upload",
        name: "Upload de fichiers",
        description: "Images, documents, PDFs avec preview et validation",
        explanation: `Upload de fichiers : drag & drop, progress bar, preview, validation. **C'est quoi ?** Interface moderne pour uploader documents/images. **Pourquoi ?** UX attendue (drag & drop = standard), feedback immédiat (barre progression), et validation client-side (évite uploads inutiles). Limite taille configurable. Virus scan recommandé.`,
        category: "files",
        selected: false,
      },
      {
        id: "file-management",
        name: "Gestionnaire de fichiers",
        description: "Organisation en dossiers, tags, recherche",
        explanation: `Gestionnaire de fichiers : dossiers, permissions, versions, métadonnées. **C'est quoi ?** Dropbox-like intégré à votre app. **Pourquoi ?** Centralisation documents (plus de "c'est dans quel email?"), permissions granulaires (dossier compta = compta only), et versioning (retrouvez version d'il y a 3 mois). Google Drive mais vous contrôlez.`,
        category: "files",
        selected: false,
      },
      {
        id: "file-cloud-storage",
        name: "Stockage cloud",
        description: "Amazon S3, Azure Blob, Google Cloud Storage",
        explanation: `Stockage cloud : S3, Cloudinary, Azure Blob avec CDN global. **C'est quoi ?** Fichiers stockés dans le cloud (pas sur votre serveur). **Pourquoi ?** Scalabilité infinie (1 GB ou 1 TB = pareil), coût faible (0,02€/GB/mois), backup automatique, et performance (CDN = rapide partout monde). Standard moderne. Pas de backup = risque énorme.`,
        category: "files",
        selected: false,
      },
      {
        id: "pdf-generation",
        name: "Génération de PDF",
        description: "Factures, rapports, contrats avec templates",
        explanation: `Génération de PDF : factures, rapports, contrats avec templates personnalisables. **C'est quoi ?** Création automatique de PDFs depuis vos données. **Pourquoi ?** Obligation légale (factures PDF), professionnalisme (email avec PDF joint), et archivage (format universel, lisible 2050). Template = cohérence visuelle. Puppeteer, wkhtmltopdf, ou libs dédiées.`,
        category: "files",
        selected: false,
      },
      {
        id: "excel-generation",
        name: "Génération Excel",
        description: "Export Excel avec formules et styling",
        explanation: `Génération Excel : exports sophistiqués avec formules, styles, multi-feuilles. **C'est quoi ?** Création de vrais fichiers Excel (pas CSV). **Pourquoi ?** Excel = lingua franca business (tout le monde l'a), formules préservées (calculs automatiques), et présentation pro (couleurs, logos). Manager adorent. ExcelJS, openpyxl selon stack.`,
        category: "files",
        selected: false,
      },
      {
        id: "document-signing",
        name: "Signature électronique",
        description: "DocuSign, Adobe Sign integration",
        explanation: `Signature électronique : DocuSign-like intégré, légalement valide, audit trail. **C'est quoi ?** Signature de documents en ligne avec valeur légale. **Pourquoi ?** Accélère contrats x10 (plus d'impression/scan/envoi), légalement valide UE (eIDAS), et tracking (qui a signé quand). DocuSign coûte cher, intégration custom rentable si volume. ROI <6 mois.`,
        category: "files",
        selected: false,
      },

      // Recherche & Filtres (search)
      {
        id: "search-basic",
        name: "Recherche basique",
        description: "Recherche simple par mots-clés",
        explanation: `Recherche basique : full-text simple avec résultats pertinents. **C'est quoi ?** Barre de recherche standard. **Pourquoi ?** 30% des utilisateurs utilisent la recherche (surtout desktop), trouvent 2x plus vite, et satisfaits (+25% NPS). Postgres full-text suffit pour démarrer. Highlight résultats = UX++.`,
        category: "search",
        selected: false,
      },
      {
        id: "search-advanced",
        name: "Recherche full-text avancée",
        description: "Elasticsearch ou similaire, autocomplete, typo-tolerance",
        explanation: `Recherche full-text avancée : Elasticsearch, synonymes, typo-tolerance, facets. **C'est quoi ?** Recherche Google-like dans votre app. **Pourquoi ?** Pertinence maximale (ranking intelligent), typo-tolerance (tetes = têtes), synonymes (auto = voiture), et rapidité (millisecondes sur millions docs). Elasticsearch, Algolia, Meilisearch. Différenciateur énorme.`,
        category: "search",
        selected: false,
      },
      {
        id: "filters-advanced",
        name: "Filtres avancés",
        description: "Filtres multi-critères avec facettes",
        explanation: `Filtres avancés : facettes multiples, ranges, autocomplete, sauvegarde. **C'est quoi ?** Filtres sophistiqués comme Amazon (prix, marque, avis, etc.). **Pourquoi ?** Navigation efficace (trouver parmi 1000 produits en 3 clics), analytics (quels filtres utilisés = insights), et conversion (+12%). Facettes auto-générées = maintenance zéro.`,
        category: "search",
        selected: false,
      },
      {
        id: "saved-searches",
        name: "Recherches sauvegardées",
        description: "Utilisateurs peuvent sauvegarder leurs filtres",
        explanation: `Recherches sauvegardées : alertes automatiques sur nouveaux résultats. **C'est quoi ?** Enregistrer une recherche et être notifié des nouvelles correspondances. **Pourquoi ?** Réengagement passif (utilisateur revient sans effort), pertinence (nouveauté = intérêt), et fidélisation. Leboncoin, Indeed basent la rétention là-dessus. Email quotidien/hebdo.`,
        category: "search",
        selected: false,
      },

      // Rapports & Analytics (reporting)
      {
        id: "reporting-basic",
        name: "Rapports pré-définis",
        description: "3-5 rapports standards (PDF/Excel)",
        explanation: `Rapports pré-définis : exports PDF/Excel de vos KPIs essentiels. **C'est quoi ?** Rapports standards clé en main (CA mensuel, top clients, etc.). **Pourquoi ?** Vision métier immédiate, présentation board/banque, et professionnalisme. Excel manuel = erreurs + temps. Automatisé = fiable + 0,5s. 10 rapports couvrent 80% besoins.`,
        category: "reporting",
        selected: false,
      },
      {
        id: "reporting-custom",
        name: "Générateur de rapports",
        description: "Utilisateurs créent leurs propres rapports",
        explanation: `Générateur de rapports : créez vos rapports custom sans dev. **C'est quoi ?** Interface type Power BI pour construire rapports. **Pourquoi ?** Autonomie business (pas besoin dev pour nouveau rapport), agilité (nouveau KPI? nouveau rapport en 10min), et adoption (+50% si self-service). Metabase open-source = bonne base.`,
        category: "reporting",
        selected: false,
      },
      {
        id: "reporting-scheduled",
        name: "Rapports planifiés",
        description: "Envoi automatique quotidien/hebdomadaire/mensuel",
        explanation: `Rapports planifiés : génération et envoi automatiques (quotidien/hebdo/mensuel). **C'est quoi ?** Rapports envoyés par email à heure fixe. **Pourquoi ?** Proactif (pas besoin se connecter), routine (tous les lundis 9h = rapport dans inbox), et diffusion (envoi à toute l'équipe). Manager adorent. Cron + templating = facile.`,
        category: "reporting",
        selected: false,
      },
      {
        id: "analytics-tracking",
        name: "Analytics & métriques",
        description: "Mixpanel, Amplitude, Google Analytics integration",
        explanation: `Analytics et métriques : suivi événements custom, funnels, cohorts. **C'est quoi ?** Google Analytics mais pour votre app métier. **Pourquoi ?** Comprenez vraiment l'usage (feature utilisée? abandons où?), optimisez onboarding (funnel = où perdez-vous users?), et ROI mesurable. Mixpanel, Amplitude pattern. Data = avantage concurrentiel.`,
        category: "reporting",
        selected: false,
      },

      // API & Intégrations (api)
      {
        id: "api-rest",
        name: "API REST complète",
        description: "API RESTful documentée (OpenAPI/Swagger)",
        explanation: `API REST complète : documentation OpenAPI, versioning, pagination. **C'est quoi ?** API professionnelle selon standards REST. **Pourquoi ?** Intégrations tierces possibles, app mobile future (même API), et écosystème ouvert. Shopify doit son succès à son API. Documentation = adoption. Swagger/OpenAPI standard.`,
        category: "api",
        selected: false,
      },
      {
        id: "api-graphql",
        name: "API GraphQL",
        description: "API GraphQL avec playground",
        explanation: `API GraphQL : requêtes flexibles, over-fetching éliminé, subscriptions real-time. **C'est quoi ?** Alternative à REST où client demande exactement ce dont il a besoin. **Pourquoi ?** Performance (1 requête vs 5 REST), flexibilité (frontend autonome), et dev experience++. GitHub, Shopify migrent vers GraphQL. Courbe apprentissage mais ROI énorme.`,
        category: "api",
        selected: false,
      },
      {
        id: "api-webhooks",
        name: "Webhooks sortants",
        description: "Notifications webhook pour événements système",
        explanation: `Webhooks sortants : notifications HTTP vers systèmes externes lors d'événements. **C'est quoi ?** Votre app appelle automatiquement une URL externe quand quelque chose se passe. **Pourquoi ?** Intégrations temps réel (nouvelle commande → webhook → leur système alerté), découplage (pas besoin polling), et standard moderne. Stripe, GitHub, tous les SaaS ont des webhooks.`,
        category: "api",
        selected: false,
      },
      {
        id: "api-rate-limiting",
        name: "Rate limiting & throttling",
        description: "Protection API avec quotas",
        explanation: `Rate limiting et throttling : protection contre abus et surcharge. **C'est quoi ?** Limitation du nombre de requêtes API par utilisateur/IP. **Pourquoi ?** Protection DDoS (même involontaire), équité ressources, et monétisation (tiers gratuit 100 req/h, payant illimité). Redis + algorithme token bucket. Obligatoire pour API publique.`,
        category: "api",
        selected: false,
      },
      {
        id: "api-keys",
        name: "Gestion API keys",
        description: "Génération et gestion de clés d'API",
        explanation: `Gestion API keys : création, révocation, scopes, usage tracking. **C'est quoi ?** Clés d'authentification pour votre API. **Pourquoi ?** Sécurité (qui appelle l'API?), tracking (combien d'appels par client?), et facturation (usage-based pricing). Format UUID v4, stockage hashé (comme passwords). Rotation régulière recommandée.`,
        category: "api",
        selected: false,
      },

      // Intégrations tierces (integrations)
      {
        id: "integration-stripe",
        name: "Intégration Stripe",
        description: "Paiements et abonnements via Stripe",
        explanation: `Intégration Stripe complète : paiements, abonnements, invoicing, webhooks. **C'est quoi ?** Connexion totale avec Stripe pour tous types de paiements. **Pourquoi ?** Leader mondial paiements (confiance), setup 2h, et features infinies (3D Secure, Apple Pay, etc.). Alternative: Mollie (Benelux). Webhook = sync automatique. Dashboard Stripe = analytics.`,
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-crm",
        name: "Intégration CRM",
        description: "Salesforce, HubSpot, Pipedrive sync",
        explanation: `Intégration CRM bidirectionnelle : HubSpot, Salesforce, Pipedrive sync automatique. **C'est quoi ?** Connexion de votre site/app à votre CRM pour transférer leads et données. **Pourquoi ?** Zéro saisie manuelle, aucun lead perdu, relance automatique. Commerciaux ont tout instantanément. ROI immédiat : un lead perdu = 500-5000€ selon secteur.`,
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-email-service",
        name: "Service d'emailing",
        description: "SendGrid, Mailgun, AWS SES",
        explanation: `Service d'envoi email : Resend, SendGrid, AWS SES pour delivrabilité maximale. **C'est quoi ?** Serveur email dédié pour vos notifications transactionnelles. **Pourquoi ?** Delivrabilité 99%+ (vs 60% serveur classique), réputation préservée (IP dédiées), analytics (taux ouverture), et conformité anti-spam. Gmail/Outlook bloquent emails serveur lambda.`,
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-calendar",
        name: "Intégration calendrier",
        description: "Google Calendar, Outlook Calendar sync",
        explanation: `Intégration calendrier : Google Calendar, Outlook, Apple Calendar sync bidirectionnelle. **C'est quoi ?** Vos événements automatiquement dans calendrier utilisateur. **Pourquoi ?** Taux de participation +40% (dans calendrier = pas oublié), confirmations automatiques, et UX moderne. Zoom, Calendly base tout là-dessus. CalDAV standard.`,
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-slack",
        name: "Intégration Slack",
        description: "Notifications et commandes Slack",
        explanation: `Intégration Slack : notifications, commandes, bot interactif. **C'est quoi ?** Votre app envoie messages/alertes dans Slack. **Pourquoi ?** Équipe vit dans Slack (notifications vues immédiatement), contexte riche (boutons interactifs), et adoption forcée (là où ils sont). Nouveau lead? Ping. Bug? Alert. Deal gagné? 🎉.`,
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-zapier",
        name: "Zapier / Make integration",
        description: "Connect avec 5000+ apps via Zapier",
        explanation: `Intégration Zapier : connectez 5000+ apps sans code. **C'est quoi ?** Votre app devient disponible dans Zapier. **Pourquoi ?** Marketplace gratuit (découverte), intégrations infinies (clients connectent ce qu'ils veulent), et zéro dev de votre côté. Référencement Zapier = SEO gratuit. Webhooks suffisent pour démarrer.`,
        category: "integrations",
        selected: false,
      },

      // Temps réel & Collaboration (realtime)
      {
        id: "websockets",
        name: "WebSockets temps réel",
        description: "Mises à jour live via WebSockets",
        explanation: `WebSockets temps réel : communication bidirectionnelle instantanée. **C'est quoi ?** Connexion persistante permettant updates en direct sans refresh. **Pourquoi ?** UX moderne (Google Docs-like), notifications instantanées, collaboration temps réel, et engagement x2. Socket.io standard. Complexe mais différenciateur énorme.`,
        category: "realtime",
        selected: false,
      },
      {
        id: "live-chat-webapp",
        name: "Chat en direct",
        description: "Messagerie interne temps réel",
        category: "realtime",
        selected: false,
      },
      {
        id: "collaborative-editing",
        name: "Édition collaborative",
        description: "Plusieurs utilisateurs éditent simultanément (CRDT)",
        explanation: `Édition collaborative : plusieurs utilisateurs modifient simultanément (CRDTs). **C'est quoi ?** Système permettant édition simultanée sans conflits (comme Google Docs). **Pourquoi ?** Productivité x3 (plus d'allers-retours), travail d'équipe fluide, et feature premium. Complexe techniquement (CRDTs, OT). Yjs, Automerge libs. Différenciateur majeur B2B.`,
        category: "realtime",
        selected: false,
      },
      {
        id: "presence-indicators",
        name: "Indicateurs de présence",
        description: "Voir qui est en ligne, qui édite quoi",
        explanation: `Indicateurs de présence : qui est en ligne, qui édite quoi, curseurs en temps réel. **C'est quoi ?** Affichage utilisateurs actifs et leur activité. **Pourquoi ?** Évite conflits (X édite déjà ce doc), facilite collaboration ("je vois que tu es là"), et UX sociale. Slack, Figma, Notion l'ont tous. Feature attendue si collaboration.`,
        category: "realtime",
        selected: false,
      },

      // Mobile & PWA (mobile)
      {
        id: "responsive-design",
        name: "Design responsive",
        description: "100% responsive mobile/tablet/desktop",
        explanation: `Design responsive : adaptation automatique mobile/tablette/desktop. **C'est quoi ?** Site qui s'adapte à toutes tailles d'écran. **Pourquoi ?** 60% trafic = mobile (Google pénalise sites non-responsive), UX indispensable, et standard 2024. Mobile-first design recommandé. Coût quasi identique, bénéfice énorme.`,
        category: "mobile",
        selected: true,
      },
      {
        id: "pwa",
        name: "Progressive Web App (PWA)",
        description:
          "Application installable, mode offline, push notifications",
        explanation: `Progressive Web App : app installable, offline, notifications push comme app native. **C'est quoi ?** Site web qui se comporte comme une vraie application. **Pourquoi ?** Installation sans store (pas de commission Apple/Google), fonctionne offline, notifications push, et coût 10x moindre qu'app native. Twitter, Pinterest sont PWA. ROI démentiel.`,
        category: "mobile",
        selected: false,
      },
      {
        id: "mobile-app-react-native",
        name: "App mobile React Native",
        description: "Application iOS + Android native (React Native)",
        explanation: `Application mobile native iOS + Android en React Native. **C'est quoi ?** Vraie app mobile multi-plateformes avec code partagé. **Pourquoi ?** Performance native, accès features téléphone (caméra, GPS, etc.), présence stores, et 1 codebase = 2 apps. Instagram, Discord, Shopify utilisent React Native. 40% moins cher que 2 apps natives.`,
        category: "mobile",
        selected: false,
      },

      // Sécurité & Conformité (security)
      {
        id: "security-encryption",
        name: "Chiffrement des données",
        description: "Chiffrement at-rest et in-transit (TLS 1.3)",
        explanation: `Chiffrement des données : at-rest (DB) et in-transit (HTTPS/TLS). **C'est quoi ?** Toutes vos données chiffrées stockage + transfert. **Pourquoi ?** RGPD l'exige pour données sensibles, protection contre hacks DB, conformité (ISO27001, SOC2), et confiance clients B2B. AES-256 stockage, TLS 1.3 transfert. Mandatory 2024.`,
        category: "security",
        selected: true,
      },
      {
        id: "security-gdpr",
        name: "Conformité RGPD",
        description: "Droit à l'oubli, export données, consentement",
        explanation: `Conformité RGPD complète : DPO, registre traitements, PIA, procédures. **C'est quoi ?** Respect total des règles RGPD avec documentation. **Pourquoi ?** OBLIGATION LÉGALE UE (amendes 20M€/4% CA), contrats B2B impossibles sans, et confiance clients. DPO externe OK si <250 employés. Audit annuel recommandé.`,
        category: "security",
        selected: false,
      },
      {
        id: "security-audit-trail",
        name: "Audit trail complet",
        description: "Logs immuables de toutes les actions",
        explanation: `Audit trail complet : logs immuables de toutes actions sensibles. **C'est quoi ?** Journal inaltérable de qui a fait quoi et quand. **Pourquoi ?** Investigation incidents, conformité (SOX, HIPAA), preuve légale, et dissuasion (employés savent que tout est tracé). Retention 7 ans typique. Elasticsearch + alerting.`,
        category: "security",
        selected: false,
      },
      {
        id: "security-ip-whitelist",
        name: "IP Whitelisting",
        description: "Restriction d'accès par IP",
        explanation: `IP Whitelisting : accès restreint aux IPs autorisées. **C'est quoi ?** Seules certaines IPs peuvent accéder (souvent admin/API). **Pourquoi ?** Sécurité administrative (+99% attaques bloquées), conformité IT grands comptes, et VPN-like sans VPN. Liste statique ou dynamique (VPN corporate). Feature B2B enterprise.`,
        category: "security",
        selected: false,
      },
      {
        id: "security-penetration-test",
        name: "Pentest inclus",
        description: "Test de pénétration avant mise en prod",
        explanation: `Pentest de sécurité par experts certifiés (OSCP, CEH). **C'est quoi ?** Hackers éthiques testent votre sécurité. **Pourquoi ?** Trouvez vulns avant les vrais hackers, conformité (ISO27001 exige pentest), assurance cyber moins chère, et confiance clients. 3-5k€ pour PME, 15-50k€ enterprise. ROI énorme vs coût breach.`,
        category: "security",
        selected: false,
      },

      // Sécurité & Conformité (security-compliance)
      {
        id: "rgpd-app",
        name: "Conformité RGPD application",
        description:
          "Gestion consentements, droit à l'oubli, portabilité des données",
        explanation: `Conformité RGPD pour applications métier : registre des traitements, gestion consentements, DPO support. **C'est quoi ?** Mise en conformité totale RGPD de votre application avec procédures et documentation. **Pourquoi ?** OBLIGATION LÉGALE (amendes jusqu'à 20M€ ou 4% CA mondial), prérequis contrats B2B, et confiance utilisateurs. Inclut droit accès, rectification, effacement, portabilité. Audit CNIL-ready.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "ssl-app",
        name: "Certificat SSL",
        description: "HTTPS avec certificat SSL/TLS (Let's Encrypt ou premium)",
        explanation: `Certificat SSL/TLS pour HTTPS obligatoire. **C'est quoi ?** Chiffrement des communications entre navigateur et serveur (cadenas vert). **Pourquoi ?** OBLIGATOIRE en 2024 (Google pénalise HTTP), sécurise données en transit, confiance utilisateurs (warning "non sécurisé" sinon), et RGPD-compliant. Let's Encrypt gratuit, wildcard pour sous-domaines. Renouvellement automatique.`,
        category: "security-compliance",
        selected: true,
      },
      {
        id: "audit-logs",
        name: "Audit logs / Traçabilité actions",
        description:
          "Logs détaillés des actions avec horodatage et utilisateur",
        explanation: `Audit logs complets : traçabilité totale des actions avec qui, quoi, quand, où. **C'est quoi ?** Journal immuable enregistrant toutes les actions sensibles de l'application. **Pourquoi ?** Conformité réglementaire (SOX, HIPAA, ISO27001), investigation incidents (qui a supprimé ce client?), preuve légale, et dissuasion fraude interne. Retention 3-7 ans selon secteur. Elasticsearch recommandé.`,
        category: "security-compliance",
        selected: false,
      },
      {
        id: "data-encryption",
        name: "Chiffrement données sensibles",
        description: "Chiffrement AES-256 des données sensibles en base",
        explanation: `Chiffrement des données sensibles : AES-256 pour données at-rest, champs sensibles chiffrés individuellement. **C'est quoi ?** Protection cryptographique des données stockées (mots de passe, données bancaires, infos santé). **Pourquoi ?** Sécurité maximale (même si DB compromise, données illisibles), conformité RGPD/PCI-DSS, assurance cyber (réduction primes), et confiance clients B2B. Key management via KMS (AWS/Azure). Standard enterprise.`,
        category: "security-compliance",
        selected: false,
      },

      // Analytics (analytics)
      {
        id: "app-analytics",
        name: "Analytics applicatif",
        description: "Suivi d'usage, KPIs métier, tableaux de bord analytiques",
        explanation: `Analytics applicatif : tracking événements custom, métriques métier, dashboards. **C'est quoi ?** Google Analytics mais pour votre application interne avec métriques métier spécifiques. **Pourquoi ?** Comprenez l'usage réel (features utilisées? abandons?), optimisez UX (où bloquent les users?), ROI mesurable (temps gagné, erreurs réduites), et data-driven decisions. Mixpanel/Amplitude pattern. Différenciateur stratégique.`,
        category: "analytics",
        selected: true,
      },
      {
        id: "user-behavior-tracking",
        name: "Suivi comportement utilisateurs",
        description: "Heatmaps, session replay, funnels de conversion",
        explanation: `Suivi comportement utilisateurs : heatmaps, session replay, parcours utilisateur. **C'est quoi ?** Enregistrement des interactions utilisateurs (clics, scrolls, parcours) avec visualisations. **Pourquoi ?** Comprenez VRAIMENT l'usage (heatmap = où cliquent-ils?), détectez frictions UX (replay = pourquoi abandon?), optimisez onboarding (funnel = étape bloquante?). Hotjar, FullStory pattern. UX data-driven. Conversion +15-30%.`,
        category: "analytics",
        selected: false,
      },
      {
        id: "performance-monitoring",
        name: "Monitoring performance",
        description: "Temps de réponse, erreurs, métriques de performance",
        explanation: `Monitoring performance applicatif : temps réponse, taux erreurs, métriques infrastructure. **C'est quoi ?** Surveillance temps réel des performances avec alertes automatiques. **Pourquoi ?** Détection proactive problèmes (alerte si lenteur), SLA respectés (uptime 99,9%), debug rapide (logs centralisés), et satisfaction utilisateurs (app rapide = users contents). Sentry, DataDog, New Relic. Indispensable en prod.`,
        category: "analytics",
        selected: false,
      },

      // Fonctionnalités Avancées (advanced-features)
      {
        id: "onboarding-wizard",
        name: "Onboarding utilisateur guidé",
        description:
          "Parcours d'intégration interactif avec tooltips et tutoriels",
        explanation: `Onboarding guidé interactif : wizard de configuration, tooltips contextuels, tutoriels progressifs. **C'est quoi ?** Parcours étape par étape lors de première utilisation avec guides visuels. **Pourquoi ?** Adoption +80% (users comprennent immédiatement), réduction support (-40% tickets "comment faire?"), time-to-value réduit (productifs en 10min vs 2h), et satisfaction utilisateurs. Notion, Slack ont excellent onboarding. ROI massif.`,
        category: "advanced-features",
        selected: false,
      },
      {
        id: "granular-permissions",
        name: "Permissions granulaires",
        description: "Contrôle fin des permissions par ressource et action",
        explanation: `Permissions granulaires avancées : contrôle au niveau champ, ressource, et action. **C'est quoi ?** Système de droits ultra-fin (User X peut lire document Y mais pas modifier champ Z). **Pourquoi ?** Sécurité maximale (principe moindre privilège), conformité (séparation des pouvoirs), flexibilité totale (adapté à organigramme complexe). Salesforce, SAP niveau. RBAC + ABAC combinés. Enterprise-grade.`,
        category: "advanced-features",
        selected: false,
      },
      {
        id: "demo-mode",
        name: "Mode démo / Sandbox",
        description: "Environnement de test isolé avec données fictives",
        explanation: `Mode démo sandbox : environnement test complet avec données sample et reset automatique. **C'est quoi ?** Version démo isolée où utilisateurs testent sans risque avec fausses données. **Pourquoi ?** Closing ventes (+30% conversion si démo interactive), formation équipes (apprendre sans casser prod), POC clients (ils testent avant acheter). Salesforce, HubSpot ont tous sandbox. Coût faible, ROI sales énorme.`,
        category: "advanced-features",
        selected: false,
      },
      {
        id: "data-export",
        name: "Export données (CSV, Excel, PDF)",
        description: "Export massif de données dans multiples formats",
        explanation: `Export données multi-formats : CSV, Excel, PDF avec personnalisation colonnes. **C'est quoi ?** Extraction complète de vos données dans formats standards. **Pourquoi ?** Portabilité données (RGPD exige export), analyses externes (pivot Excel), archivage, et intégrations manuelles. Users adorent avoir leurs données. Excel = lingua franca business. Backup utilisateur rassurant.`,
        category: "advanced-features",
        selected: false,
      },
      {
        id: "webhooks-outgoing",
        name: "Webhooks sortants",
        description: "Notifications HTTP automatiques vers systèmes externes",
        explanation: `Webhooks sortants : callbacks HTTP automatiques lors d'événements système. **C'est quoi ?** Votre app appelle une URL externe automatiquement quand quelque chose se passe. **Pourquoi ?** Intégrations temps réel (nouveau lead → webhook → CRM notifié), découplage systèmes, standard moderne SaaS. Stripe, GitHub, tous les outils B2B ont webhooks. Signature HMAC pour sécurité.`,
        category: "advanced-features",
        selected: false,
      },
      {
        id: "rate-limiting",
        name: "Rate limiting / Quotas API",
        description:
          "Limitation du nombre de requêtes par utilisateur/endpoint",
        explanation: `Rate limiting et quotas : protection contre abus avec limites configurables. **C'est quoi ?** Restriction nombre de requêtes API par période (ex: 100 req/min par user). **Pourquoi ?** Protection DDoS (même involontaire), stabilité système (pas de surcharge), équité ressources, et monétisation (tier gratuit limité, payant illimité). Redis + token bucket algorithm. Obligatoire pour API publique.`,
        category: "advanced-features",
        selected: false,
      },
    ],
  },

  auditCyber: {
    id: "auditCyber",
    name: "Audit Cybersécurité",
    description:
      "Audit de sécurité complet et tests de pénétration professionnels",
    explanation: `Audit cybersécurité complet : infrastructure, applications, processus. **C'est quoi ?** Évaluation complète de votre posture sécurité par experts. **Pourquoi ?** 60% PME hackées ferment sous 6 mois. Audit identifie failles critiques, priorise corrections, et roadmap sécurité. ANSSI recommande audit annuel. 5-15k€ sauvent souvent l'entreprise.`,
    icon: "🔒",
    basePrice: 2000,
    estimatedTimelineWeeks: { min: 1, max: 8 },
    features: [
      // Périmètre (scope)
      {
        id: "infra-1-5",
        name: "1-5 serveurs/VM",
        description: "Petite infrastructure - TPE/PME",
        explanation: `Audit infrastructure 1-5 serveurs : configuration, hardening, monitoring. **C'est quoi ?** Revue sécurité de votre infra serveurs (physical/VM/cloud). **Pourquoi ?** 90% des serveurs ont misconfigurations (SSH root, ports ouverts, patches manquants). Audit corrige avant exploit. Coût 2-5k€, évite ransom 50k€+. Checklist CIS Benchmarks.`,
        category: "scope",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "infra-5-20",
        name: "5-20 serveurs/VM",
        description: "Infrastructure moyenne - PME/ETI",
        explanation: `Audit infrastructure 5-20 serveurs : complexité moyenne, architecture review. **C'est quoi ?** Audit sécu + architecture pour infra établie. **Pourquoi ?** Infra grandit = dette technique + failles. Audit identifie SPOF (single point of failure), misconfigs, et optimisations. Typical PME. Budget 5-15k€.`,
        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "infra-20-50",
        name: "20-50 serveurs/VM",
        description: "Grande infrastructure - ETI/Grandes entreprises",
        explanation: `Audit infrastructure 20-50 serveurs : analyse approfondie, automatisation review. **C'est quoi ?** Audit complet infra large avec focus automatisation et monitoring. **Pourquoi ?** À cette échelle, impossible de gérer manuellement. Audit vérifie automatisation (Ansible, Terraform), monitoring (Prometheus), et segmentation réseau. Budget 15-30k€. ROI = reliability.`,
        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "infra-50plus",
        name: "50+ serveurs/VM",
        description: "Infrastructure complexe - Grandes entreprises",
        explanation: `Audit infrastructure 50+ serveurs : niveau enterprise, HA, disaster recovery. **C'est quoi ?** Audit enterprise-grade avec résilience et continuité. **Pourquoi ?** Infra critique = audit critique. Review HA (haute dispo), DR (disaster recovery), backup, segmentation micro-services. Budget 30-100k€. Mandatory pour scale-ups/corporates.`,
        category: "scope",
        selected: false,
        mutuallyExclusive: true,
      },

      // Types d'audit (audit)
      {
        id: "pentest-external",
        name: "Pentest externe (Black Box)",
        description:
          "Test d'intrusion depuis internet sans information préalable",
        explanation: `Pentest externe (Black Box) : attaque depuis Internet sans info préalable. **C'est quoi ?** Hackers testent depuis l'extérieur comme un vrai attaquant. **Pourquoi ?** Simule vraie attaque (hackers n'ont aucune info), trouve vulns exposées Internet, et compliance. OWASP Top 10 focus. 3-10k€ selon scope. Annuel recommandé.`,
        category: "audit",
        selected: true,
      },
      {
        id: "pentest-internal",
        name: "Pentest interne (Grey Box)",
        description:
          "Test d'intrusion depuis le réseau interne avec accès limité",
        explanation: `Pentest interne (Grey Box) : test avec accès réseau interne (employé malveillant). **C'est quoi ?** Simulation d'attaque depuis l'intérieur (réseau corporate). **Pourquoi ?** 70% des breaches = insider threat ou phishing (attaquant entre dans réseau). Teste segmentation, escalade privilèges, mouvement latéral. Complémente pentest externe. 5-15k€.`,
        category: "audit",
        selected: false,
      },
      {
        id: "pentest-white-box",
        name: "Pentest White Box",
        description:
          "Audit complet avec accès aux codes sources et architecture",
        explanation: `Pentest White Box : audit avec accès code source et architecture. **C'est quoi ?** Test sécurité avec toutes les informations (code, infra, creds). **Pourquoi ?** Profondeur maximale (auditeurs comprennent vraiment l'app), trouve vulns subtiles (logic bugs), et éducatif (dev apprennent). Plus cher (10-30k€) mais ROI sécurité x3.`,
        category: "audit",
        selected: false,
      },
      {
        id: "code-review-sast",
        name: "Audit de code (SAST)",
        description: "Revue de sécurité statique du code source (OWASP Top 10)",
        explanation: `Audit de code source (SAST) : analyse statique automatisée + manuelle. **C'est quoi ?** Scan du code pour vulnérabilités avant déploiement. **Pourquoi ?** Trouve bugs sécurité early (fix = 10x moins cher), éduque devs (reports expliqués), et CI/CD intégrable. SonarQube, Checkmarx. 70% vulns détectables avant prod. Shift-left security.`,
        category: "audit",
        selected: false,
      },
      {
        id: "infra-audit",
        name: "Audit infrastructure & configuration",
        description: "Serveurs, réseau, firewall, pare-feu, routeurs",
        explanation: `Audit infrastructure et configuration : serveurs, réseau, cloud, durcissement. **C'est quoi ?** Revue complète config serveurs, firewalls, cloud selon best practices. **Pourquoi ?** Misconfigurations = cause #1 breaches (Capital One, Equifax). CIS Benchmarks compliance, hardening guide, et quick wins identifiés. 3-20k€ selon taille. Évite catastrophes.`,
        category: "audit",
        selected: false,
      },
      {
        id: "pentest-mobile",
        name: "Pentest application mobile",
        description: "Test de sécurité iOS/Android (OWASP MASVS)",
        explanation: `Pentest application mobile : iOS + Android, API, stockage local, certificats. **C'est quoi ?** Test sécu complet de votre app mobile. **Pourquoi ?** Apps mobiles stockent données sensibles (tokens, user data), communiquent APIs, et sont facilement décompilables. OWASP Mobile Top 10. Reverse engineering, MitM, injection. 5-15k€ par plateforme.`,
        category: "audit",
        selected: false,
      },
      {
        id: "pentest-api",
        name: "Audit API REST/GraphQL",
        description: "Test de sécurité des API (OWASP API Security Top 10)",
        explanation: `Audit sécurité API REST/GraphQL : auth, injection, rate limiting, IDOR. **C'est quoi ?** Pentest spécialisé API (pas interface web). **Pourquoi ?** APIs = cible privilégiée (automatisable), souvent moins protégées que UI, et exploits = accès data massif. OWASP API Top 10. Broken auth #1. Fuzzing, injection, BOLA/IDOR. 3-10k€.`,
        category: "audit",
        selected: false,
      },
      {
        id: "pentest-wifi",
        name: "Audit Wi-Fi & réseau sans fil",
        description: "Test de sécurité des réseaux Wi-Fi d'entreprise",
        explanation: `Audit WiFi et réseau sans fil : WPA3, rogue AP, evil twin, déauth. **C'est quoi ?** Test sécurité de vos réseaux WiFi corporate. **Pourquoi ?** WiFi faible = porte d'entrée réseau. WPA2 cassable, rogue AP passent inaperçus. Test simule attaque café voisin, employee malveillant. WPA3 obligatoire, segmentation invités. 2-5k€. Souvent négligé.`,
        category: "audit",
        selected: false,
      },
      {
        id: "social-engineering",
        name: "Test d'ingénierie sociale",
        description: "Simulation de phishing, vishing, et attaques humaines",
        explanation: `Test d'ingénierie sociale : phishing, vishing, tailgating physique. **C'est quoi ?** Simulation d'attaques ciblant humains (pas machines). **Pourquoi ?** 85% breaches commencent par phishing. Teste awareness employés, identifie vulns humaines, et sensibilise (employés cliquent = formation). Campagne phishing simulée 1-5k€, physique 5-15k€. Impacts durables.`,
        category: "audit",
        selected: false,
      },
      {
        id: "cloud-security-audit",
        name: "Audit sécurité Cloud",
        description: "AWS, Azure, GCP - configuration, IAM, stockage",
        explanation: `Audit sécurité Cloud : AWS/Azure/GCP config, IAM, encryption, monitoring. **C'est quoi ?** Review sécurité de votre infra cloud. **Pourquoi ?** Cloud mal configuré = buckets S3 publics (massive breaches). Audit vérifie IAM (least privilege), encryption, VPC segmentation, logging CloudTrail. CIS AWS Foundations. 5-20k€. Évite headlines.`,
        category: "audit",
        selected: false,
      },
      {
        id: "container-security",
        name: "Audit conteneurs & Kubernetes",
        description: "Docker, Kubernetes, registry, orchestration",
        explanation: `Audit conteneurs et Kubernetes : images, runtime, secrets, network policies. **C'est quoi ?** Sécurité de votre stack Docker/K8s. **Pourquoi ?** Conteneurs = nouvelle surface attaque. Images vulnérables, secrets exposés (env vars), privilege escalation. Audit scanne images (Trivy), review RBAC K8s, network policies, admission controllers. 5-15k€. DevSecOps critical.`,
        category: "audit",
        selected: false,
      },
      {
        id: "iot-security",
        name: "Audit IoT & objets connectés",
        description: "Sécurité des dispositifs IoT et protocoles (MQTT, CoAP)",
        explanation: `Audit IoT et objets connectés : firmware, protocoles, communication, hardening. **C'est quoi ?** Sécurité de vos devices connectés (capteurs, caméras, etc.). **Pourquoi ?** IoT = maillons faibles (Mirai botnet 2016). Firmware obsolètes, mots de passe par défaut, protocoles non chiffrés. Audit reverse firmware, sniff réseau, hardening. 5-20k€. Secteur industriel critique.`,
        category: "audit",
        selected: false,
      },

      // Applications à auditer (apps)
      {
        id: "webapp-audit-1",
        name: "1 application web",
        description: "Audit OWASP d'une application web complète",
        explanation: `Audit sécurité 1 application web : OWASP Top 10, business logic, auth. **C'est quoi ?** Pentest complet d'une webapp. **Pourquoi ?** 90% apps ont au moins 1 vulnérabilité critique. Injection SQL, XSS, auth broken. Rapport détaillé + recommandations. 3-8k€ selon complexité. Pré-prod idéal. Fix avant hackers.`,
        category: "apps",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "webapp-audit-2-5",
        name: "2-5 applications web",
        description: "Audit de plusieurs applications web (package)",
        explanation: `Audit sécurité 2-5 applications web : testing parallèle, rapport consolidé. **C'est quoi ?** Pentest de plusieurs webapps avec économies d'échelle. **Pourquoi ?** Suite d'apps (backoffice + frontend + API)? Audit groupé 20-30% moins cher. Rapport compare maturité sécu entre apps. 10-30k€. Priorise corrections globales.`,
        category: "apps",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "webapp-audit-6-10",
        name: "6-10 applications web",
        description: "Audit d'un parc applicatif complet",
        explanation: `Audit sécurité 6-10 applications web : programme complet, retests inclus. **C'est quoi ?** Programme d'audit pour portfolio d'apps. **Pourquoi ?** Nombreuses apps = besoin programme annuel. Tests échelonnés, retests post-fix inclus, trending sécurité. 30-80k€. Enterprise scale. Budget sécu planifié.`,
        category: "apps",
        selected: false,
        mutuallyExclusive: true,
      },

      // Conformité & normes (compliance)
      {
        id: "compliance-rgpd",
        name: "Conformité RGPD",
        description:
          "Audit RGPD, analyse des risques, recommandations détaillées",
        explanation: `Conformité RGPD audit et mise en conformité : registre, PIA, procédures. **C'est quoi ?** Accompagnement complet conformité RGPD. **Pourquoi ?** OBLIGATION LÉGALE UE. Registre traitements, analyses d'impact (PIA), procédures, formation équipes. DPO externalisé possible. Audit 3-10k€, mise conformité 5-30k€. Évite amendes 20M€/4% CA.`,
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-iso27001",
        name: "Conformité ISO 27001",
        description:
          "Gap analysis, documentation, roadmap de mise en conformité",
        explanation: `Conformité ISO 27001 : SMSI, analyse risques, certification. **C'est quoi ?** Norme internationale système management sécurité. **Pourquoi ?** Différenciateur B2B (grands comptes exigent ISO27001), framework complet (114 contrôles), certification reconnue mondialement. Gap analysis 5-10k€, mise en œuvre 20-100k€, audit certif 10-30k€. Investissement payant.`,
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-nis2",
        name: "Conformité NIS2",
        description: "Évaluation directive NIS2 pour opérateurs essentiels",
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-pci-dss",
        name: "Conformité PCI-DSS",
        description: "Audit PCI-DSS pour traitement des paiements par carte",
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-soc2",
        name: "Audit SOC 2 Type I/II",
        description: "Contrôles de sécurité pour services Cloud (SaaS)",
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-hipaa",
        name: "Conformité HIPAA",
        description: "Audit pour secteur médical et données de santé",
        category: "compliance",
        selected: false,
      },
      {
        id: "compliance-dora",
        name: "Conformité DORA",
        description: "Résilience opérationnelle numérique (secteur financier)",
        category: "compliance",
        selected: false,
      },

      // Suivi & remédiation (followup)
      {
        id: "remediation-consulting",
        name: "Conseil en remédiation",
        description:
          "Accompagnement pour la correction des vulnérabilités critiques",
        category: "followup",
        selected: false,
      },
      {
        id: "retest",
        name: "Re-test après correction",
        description: "Vérification complète des corrections (validation)",
        category: "followup",
        selected: false,
      },
      {
        id: "continuous-monitoring",
        name: "Surveillance continue (3 mois)",
        description: "Monitoring de sécurité actif avec alertes en temps réel",
        category: "followup",
        selected: false,
      },
      {
        id: "vulnerability-management",
        name: "Gestion des vulnérabilités",
        description:
          "Programme de gestion continue des vulnérabilités (6 mois)",
        category: "followup",
        selected: false,
      },

      // Formation & sensibilisation (training)
      {
        id: "training-awareness",
        name: "Formation sensibilisation (équipes)",
        description:
          "Formation cybersécurité pour tous les collaborateurs (2h)",
        category: "training",
        selected: false,
      },
      {
        id: "training-technical",
        name: "Formation technique (IT/Dev)",
        description:
          "Formation sécurité pour développeurs et équipes IT (1 jour)",
        category: "training",
        selected: false,
      },
      {
        id: "training-devsecops",
        name: "Formation DevSecOps",
        description:
          "Intégration de la sécurité dans le cycle DevOps (2 jours)",
        category: "training",
        selected: false,
      },
      {
        id: "training-incident-response",
        name: "Formation gestion d'incidents",
        description: "Procédures de réponse aux incidents de sécurité (1 jour)",
        category: "training",
        selected: false,
      },

      // Rapports & documentation (reporting)
      {
        id: "report-executive",
        name: "Rapport exécutif",
        description:
          "Synthèse managériale avec risques business et recommandations stratégiques",
        category: "reporting",
        selected: true,
      },
      {
        id: "report-technical",
        name: "Rapport technique détaillé",
        description:
          "Documentation complète avec PoC, captures, et procédures de correction",
        category: "reporting",
        selected: true,
      },
      {
        id: "report-compliance",
        name: "Rapport de conformité",
        description: "Mapping avec référentiels (ISO, RGPD, NIS2, etc.)",
        category: "reporting",
        selected: false,
      },
      {
        id: "report-presentation",
        name: "Présentation des résultats",
        description:
          "Présentation en personne des résultats d'audit (half-day)",
        category: "reporting",
        selected: false,
      },
      {
        id: "attestation-letter",
        name: "Lettre d'attestation",
        description: "Document officiel attestant de la réalisation de l'audit",
        category: "reporting",
        selected: false,
      },

      // Audits avancés (advanced-audits)
      {
        id: "pentest-automated",
        name: "Pentest automatisé (OWASP ZAP)",
        description: "Tests de pénétration automatisés avec OWASP ZAP",
        explanation: `Pentest automatisé OWASP ZAP : scan continu, détection vulnérabilités OWASP Top 10. **C'est quoi ?** Outil open-source automatisant tests sécurité applications web. **Pourquoi ?** Scans réguliers détectent nouvelles vulnérabilités sans coût récurrent audit manuel. Intégrable CI/CD (shift-left security), rapports détaillés, et baseline sécurité. 80% vulns communes détectées automatiquement. Complément pentests manuels. 2-5k€ setup + formation.`,
        category: "advanced-audits",
        selected: false,
      },
      {
        id: "cloud-vulnerability-scan",
        name: "Scan vulnérabilités cloud (AWS, Azure)",
        description: "Analyse continue des configurations cloud AWS et Azure",
        explanation: `Scan vulnérabilités cloud AWS/Azure : monitoring continu misconfigurations, compliance. **C'est quoi ?** Scanning automatisé 24/7 de votre infra cloud (buckets publics, IAM faibles, encryption manquante). **Pourquoi ?** Cloud évolue vite = dérive config fréquente. Scan détecte S3 publics, security groups permissifs, secrets exposés. CIS Benchmarks compliance. Tools : Prowler, ScoutSuite. 3-10k€/an selon taille. Évite breaches massives.`,
        category: "advanced-audits",
        selected: false,
      },
      {
        id: "source-code-analysis",
        name: "Analyse code source (SAST)",
        description: "Analyse statique approfondie du code source applicatif",
        explanation: `Analyse code source SAST approfondie : détection vulnérabilités dans code avant production. **C'est quoi ?** Analyse statique complète codebase (injection, auth bugs, crypto faible, race conditions). **Pourquoi ?** 70% vulns détectables avant déploiement via SAST. Fix early = 10x moins cher que prod. SonarQube, Checkmarx, Fortify. Intégration CI/CD bloque vulns critiques. Dev apprennent via reports. 5-20k€ setup + licences annuelles.`,
        category: "advanced-audits",
        selected: false,
      },
      {
        id: "phishing-training",
        name: "Formation sensibilisation phishing",
        description:
          "Programme complet de sensibilisation aux attaques de phishing",
        explanation: `Formation sensibilisation phishing : simulations + training interactif collaborateurs. **C'est quoi ?** Campagnes phishing simulées + formation ciblée pour employés cliqueurs. **Pourquoi ?** 85% breaches commencent par phishing. Humains = maillon faible. Simulations identifient vulnérables, formations corrigent comportements. KnowBe4, Proofpoint. Taux clic passe 30% → 5% en 6 mois. 2-8k€/an selon taille équipe. ROI sécurité maximal.`,
        category: "advanced-audits",
        selected: false,
      },

      // Réponse & Certification (response-certification)
      {
        id: "incident-response-plan",
        name: "Plan de réponse incident (PRI)",
        description: "Élaboration d'un plan structuré de gestion des incidents",
        explanation: `Plan de réponse incident (PRI) : procédures, équipe CSIRT, communication crise. **C'est quoi ?** Playbook complet pour réagir efficacement aux incidents sécurité. **Pourquoi ?** Temps réaction = facteur #1 coût breach. PRI définit rôles, procédures containment, communication (interne/externe/régulateurs), forensics. ISO 27035. Sans PRI = panique + erreurs coûteuses. RGPD exige notification 72h. 5-15k€ création, exercices tabletop 2-5k€.`,
        category: "response-certification",
        selected: false,
      },
      {
        id: "iso-27001-assistance",
        name: "Assistance certification ISO 27001",
        description: "Accompagnement complet vers la certification ISO 27001",
        explanation: `Assistance certification ISO 27001 : gap analysis, SMSI, audit blanc, certification. **C'est quoi ?** Accompagnement full-service pour obtenir certification ISO 27001. **Pourquoi ?** Grands comptes B2B exigent ISO27001 (clause contractuelle). Certification démontre maturité sécurité, framework structuré (114 contrôles), et différenciateur commercial. Gap analysis 5-10k€, mise en œuvre SMSI 20-100k€, audit certification 10-30k€. Investissement payant (appels d'offres gagnés).`,
        category: "response-certification",
        selected: false,
      },
      {
        id: "cybersecurity-roadmap",
        name: "Roadmap cybersécurité personnalisée",
        description:
          "Plan stratégique pluriannuel de renforcement de la sécurité",
        explanation: `Roadmap cybersécurité personnalisée : stratégie 2-3 ans, budget, priorités, KPIs. **C'est quoi ?** Plan directeur sécurité aligné business (pas juste tech). **Pourquoi ?** Sécurité = investissement continu (pas one-shot). Roadmap priorise selon risques métier, budget, compliance. Quick wins + projets long terme. Board-level communication. Benchmark secteur. Évite achats réactifs coûteux. 8-25k€ selon complexité. CFO/COMEX friendly.`,
        category: "response-certification",
        selected: false,
      },
    ],
  },

  aiAutomation: {
    id: "aiAutomation",
    name: "Automatisation IA",
    description:
      "Solutions d'intelligence artificielle sur mesure (Chatbots, NLP, Vision, Automatisation)",
    icon: "🤖",
    basePrice: 3000,
    estimatedTimelineWeeks: { min: 4, max: 20 },
    features: [
      // Modèles IA (ai-models)
      {
        id: "ai-model-gpt4",
        name: "OpenAI GPT-4 / GPT-4 Turbo",
        description: "Modèle de langage le plus puissant pour tâches complexes",
        category: "ai-models",
        selected: false,
      },
      {
        id: "ai-model-claude",
        name: "Anthropic Claude 3 (Opus/Sonnet)",
        description:
          "Excellent pour analyse de documents longs et raisonnement",
        category: "ai-models",
        selected: false,
      },
      {
        id: "ai-model-mistral",
        name: "Mistral AI (Large/Medium)",
        description: "Modèle français, bon équilibre performance/coût",
        category: "ai-models",
        selected: false,
      },
      {
        id: "ai-model-llama",
        name: "Meta Llama 3 (open-source)",
        description: "Modèle open-source pour hébergement privé",
        category: "ai-models",
        selected: false,
      },
      {
        id: "ai-model-gemini",
        name: "Google Gemini Pro",
        description: "Excellent pour multimodal (texte + images)",
        category: "ai-models",
        selected: false,
      },

      // Cas d'usage principaux (use-cases)
      {
        id: "use-case-chatbot",
        name: "Chatbot intelligent",
        description: "Assistant virtuel pour support client ou ventes",
        category: "use-cases",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "use-case-document-processing",
        name: "Traitement de documents",
        description: "Extraction et analyse de données depuis documents",
        category: "use-cases",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "use-case-content-generation",
        name: "Génération de contenu",
        description:
          "Création automatique de textes marketing, articles, descriptions",
        category: "use-cases",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "use-case-data-analysis",
        name: "Analyse de données",
        description: "Insights, prédictions, détection d'anomalies",
        category: "use-cases",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "use-case-workflow-automation",
        name: "Automatisation de workflows",
        description: "Automatisation de processus métier complexes",
        category: "use-cases",
        selected: false,
        mutuallyExclusive: true,
      },

      // Chatbot avancé (chatbot)
      {
        id: "chatbot-knowledge-base",
        name: "Base de connaissances",
        description: "RAG (Retrieval Augmented Generation) sur vos documents",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-multilingual",
        name: "Chatbot multilingue",
        description: "Support de 2-10+ langues automatique",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-voice",
        name: "Chatbot vocal",
        description: "Support audio (speech-to-text + text-to-speech)",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-omnichannel",
        name: "Omnicanal",
        description: "Web, WhatsApp, Messenger, Telegram, Slack",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-handoff",
        name: "Transfert humain",
        description: "Escalade vers agent humain quand nécessaire",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-sentiment",
        name: "Détection de sentiment",
        description: "Adaptation du ton selon l'émotion client",
        category: "chatbot",
        selected: false,
      },
      {
        id: "chatbot-crm-sync",
        name: "Synchronisation CRM",
        description: "Enregistrement automatique des conversations dans CRM",
        category: "chatbot",
        selected: false,
      },

      // Traitement de langage (nlp)
      {
        id: "nlp-summarization",
        name: "Résumé automatique",
        description: "Résumés de documents, articles, emails longs",
        category: "nlp",
        selected: false,
      },
      {
        id: "nlp-translation",
        name: "Traduction automatique",
        description: "Traduction professionnelle multi-langues",
        category: "nlp",
        selected: false,
      },
      {
        id: "nlp-classification",
        name: "Classification de texte",
        description: "Catégorisation automatique (tickets, emails, documents)",
        category: "nlp",
        selected: false,
      },
      {
        id: "nlp-ner",
        name: "Extraction d'entités (NER)",
        description: "Extraction noms, dates, montants, adresses",
        category: "nlp",
        selected: false,
      },
      {
        id: "nlp-sentiment",
        name: "Analyse de sentiment",
        description:
          "Positif/Négatif/Neutre - avis, commentaires, réseaux sociaux",
        category: "nlp",
        selected: false,
      },
      {
        id: "nlp-intent-detection",
        name: "Détection d'intention",
        description:
          "Comprendre l'intention utilisateur pour routage intelligent",
        category: "nlp",
        selected: false,
      },

      // Vision par ordinateur (vision)
      {
        id: "vision-ocr",
        name: "OCR avancé",
        description: "Reconnaissance de texte dans images/PDFs scannés",
        category: "vision",
        selected: false,
      },
      {
        id: "vision-document-parsing",
        name: "Analyse de documents structurés",
        description: "Factures, contrats, formulaires - extraction automatique",
        category: "vision",
        selected: false,
      },
      {
        id: "vision-object-detection",
        name: "Détection d'objets",
        description: "Identification d'objets dans images/vidéos",
        category: "vision",
        selected: false,
      },
      {
        id: "vision-face-detection",
        name: "Détection de visages",
        description: "Reconnaissance et analyse faciale",
        category: "vision",
        selected: false,
      },
      {
        id: "vision-quality-control",
        name: "Contrôle qualité visuel",
        description: "Détection de défauts en production industrielle",
        category: "vision",
        selected: false,
      },
      {
        id: "vision-image-generation",
        name: "Génération d'images",
        description: "DALL-E, Midjourney, Stable Diffusion - création d'images",
        category: "vision",
        selected: false,
      },

      // Audio & Voix (voice)
      {
        id: "voice-transcription",
        name: "Transcription audio",
        description: "Speech-to-text (Whisper, Google, Azure)",
        category: "voice",
        selected: false,
      },
      {
        id: "voice-synthesis",
        name: "Synthèse vocale",
        description: "Text-to-speech avec voix naturelles",
        category: "voice",
        selected: false,
      },
      {
        id: "voice-cloning",
        name: "Clonage de voix",
        description: "Reproduction de voix spécifique (ElevenLabs)",
        category: "voice",
        selected: false,
      },
      {
        id: "voice-call-analysis",
        name: "Analyse d'appels",
        description: "Transcription + analyse sentiment + insights",
        category: "voice",
        selected: false,
      },

      // Automatisation RPA (automation)
      {
        id: "rpa-web-scraping",
        name: "Web scraping intelligent",
        description: "Extraction de données depuis sites web",
        category: "automation",
        selected: false,
      },
      {
        id: "rpa-form-filling",
        name: "Remplissage de formulaires",
        description: "Automatisation de saisie dans applications web/desktop",
        category: "automation",
        selected: false,
      },
      {
        id: "rpa-email-processing",
        name: "Traitement d'emails",
        description: "Tri, classification, extraction de données depuis emails",
        category: "automation",
        selected: false,
      },
      {
        id: "rpa-invoice-processing",
        name: "Traitement de factures",
        description: "Extraction automatique de données de factures",
        category: "automation",
        selected: false,
      },
      {
        id: "rpa-report-generation",
        name: "Génération de rapports",
        description: "Création automatique de rapports Excel/PDF",
        category: "automation",
        selected: false,
      },
      {
        id: "rpa-data-entry",
        name: "Saisie de données",
        description: "Automatisation de saisie entre systèmes",
        category: "automation",
        selected: false,
      },
      {
        id: "workflow-orchestration",
        name: "Orchestration de workflows",
        description:
          "Coordination de multiples automatisations (n8n, Zapier, Make)",
        category: "automation",
        selected: false,
      },

      // Données & Entraînement (training)
      {
        id: "training-fine-tuning",
        name: "Fine-tuning de modèle",
        description: "Personnalisation d'un modèle sur vos données",
        category: "training",
        selected: false,
      },
      {
        id: "training-data-preparation",
        name: "Préparation de données",
        description: "Nettoyage, labellisation, augmentation de dataset",
        category: "training",
        selected: false,
      },
      {
        id: "training-rag-setup",
        name: "Configuration RAG",
        description: "Indexation de documents pour recherche sémantique",
        category: "training",
        selected: false,
      },
      {
        id: "training-model-evaluation",
        name: "Évaluation de modèle",
        description: "Tests de performance, benchmarks, A/B testing",
        category: "training",
        selected: false,
      },

      // Volume & Échelle (volume)
      {
        id: "volume-1k",
        name: "Jusqu'à 1 000 requêtes/mois",
        description: "Volume basique - tests & POC",
        category: "volume",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "volume-1k-10k",
        name: "1 000 - 10 000 requêtes/mois",
        description: "Volume moyen - TPE/PME",
        category: "volume",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "volume-10k-50k",
        name: "10 000 - 50 000 requêtes/mois",
        description: "Volume élevé - PME/ETI",
        category: "volume",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "volume-50k-250k",
        name: "50 000 - 250 000 requêtes/mois",
        description: "Volume très élevé - ETI/Grandes entreprises",
        category: "volume",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "volume-250k-plus",
        name: "Plus de 250 000 requêtes/mois",
        description: "Volume enterprise - devis personnalisé",
        category: "volume",
        selected: false,
        mutuallyExclusive: true,
      },

      // Déploiement (deployment)
      {
        id: "deployment-cloud",
        name: "Hébergement Cloud",
        description: "AWS, Azure, GCP - infrastructure managée",
        category: "deployment",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "deployment-on-premise",
        name: "On-premise",
        description: "Installation sur vos serveurs",
        category: "deployment",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "deployment-hybrid",
        name: "Hybride",
        description: "Combinaison cloud + on-premise",
        category: "deployment",
        selected: false,
        mutuallyExclusive: true,
      },

      // Intégrations (integrations)
      {
        id: "integration-api-rest",
        name: "API REST",
        description: "API REST complète pour intégration",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-webhooks",
        name: "Webhooks",
        description: "Notifications en temps réel d'événements",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-zapier-ai",
        name: "Zapier / Make / n8n",
        description: "Intégration avec outils no-code automation",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-crm-ai",
        name: "CRM (HubSpot, Salesforce, Pipedrive)",
        description: "Synchronisation bidirectionnelle avec CRM",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-email-service-ai",
        name: "Services email (Gmail, Outlook, SendGrid)",
        description: "Envoi/réception d'emails automatisés",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-slack-teams",
        name: "Slack / Microsoft Teams",
        description: "Bot et notifications dans outils collaboration",
        category: "integrations",
        selected: false,
      },
      {
        id: "integration-whatsapp",
        name: "WhatsApp Business API",
        description: "Chatbot WhatsApp avec API officielle",
        category: "integrations",
        selected: false,
      },

      // Monitoring & Analytics (monitoring)
      {
        id: "monitoring-dashboard",
        name: "Dashboard de monitoring",
        description: "Suivi en temps réel des performances et usage",
        category: "monitoring",
        selected: false,
      },
      {
        id: "monitoring-alerts",
        name: "Alertes & notifications",
        description: "Alertes automatiques en cas d'anomalies",
        category: "monitoring",
        selected: false,
      },
      {
        id: "monitoring-logging",
        name: "Logs détaillés",
        description: "Traçabilité complète des requêtes et réponses",
        category: "monitoring",
        selected: false,
      },
      {
        id: "monitoring-analytics",
        name: "Analytics avancées",
        description: "Rapports détaillés d'usage et ROI",
        category: "monitoring",
        selected: false,
      },
      {
        id: "monitoring-ab-testing",
        name: "A/B Testing",
        description: "Tests comparatifs de prompts et modèles",
        category: "monitoring",
        selected: false,
      },

      // Support & Maintenance (support)
      {
        id: "support-maintenance-1month",
        name: "Maintenance 1 mois",
        description: "Support technique + mises à jour (1 mois inclus)",
        category: "support",
        selected: true,
        mutuallyExclusive: true,
      },
      {
        id: "support-maintenance-3months",
        name: "Maintenance 3 mois",
        description: "Support technique + mises à jour (3 mois inclus)",
        category: "support",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "support-maintenance-12months",
        name: "Maintenance 12 mois",
        description: "Support technique + mises à jour (12 mois inclus)",
        category: "support",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "support-training",
        name: "Formation équipe",
        description: "Formation 1 journée pour votre équipe",
        category: "support",
        selected: false,
      },
      {
        id: "support-documentation",
        name: "Documentation complète",
        description: "Documentation technique et guide utilisateur",
        category: "support",
        selected: false,
      },

      // Advanced AI Features (advanced-ai)
      {
        id: "rag-system",
        name: "RAG (Retrieval Augmented Generation)",
        description: "Système de recherche intelligent dans vos documents",
        explanation: `Système RAG permettant à l'IA de rechercher et utiliser vos documents internes pour répondre avec précision. **C'est quoi ?** Une technologie qui connecte l'IA à votre base documentaire (PDF, docs, wikis) pour des réponses basées sur VOS données. **Pourquoi ?** Élimine les hallucinations de l'IA, garantit des réponses factuelles et à jour, et valorise votre connaissance métier. Réduit de 70% le temps de formation des nouveaux employés et améliore la satisfaction client de 45%.`,
        category: "advanced-ai",
        selected: false,
      },
      {
        id: "fine-tuning-custom",
        name: "Fine-tuning modèles custom",
        description: "Personnalisation du modèle IA sur vos données",
        explanation: `Fine-tuning d'un modèle IA spécifiquement entraîné sur vos données et votre style. **C'est quoi ?** Adaptation d'un modèle existant (GPT, Claude, Mistral) avec vos propres exemples pour qu'il réponde exactement comme VOUS le souhaitez. **Pourquoi ?** Cohérence parfaite avec votre ton de marque, précision technique dans votre domaine métier, et réduction des coûts d'API jusqu'à 50%. ROI mesurable en 3-6 mois pour usages intensifs.`,
        category: "advanced-ai",
        selected: false,
      },
      {
        id: "ocr-document-extraction",
        name: "OCR / Extraction documents",
        description: "Extraction automatique de données depuis documents",
        explanation: `OCR intelligent avec extraction structurée de données depuis factures, contrats, formulaires scannés. **C'est quoi ?** Technologie qui lit et extrait automatiquement les informations importantes de vos documents papier/PDF (montants, dates, noms). **Pourquoi ?** Élimine la saisie manuelle (gain de 95% de temps), réduit les erreurs humaines de 98%, et permet de traiter 10x plus de documents. ROI immédiat : un employé à 30k€/an qui fait de la saisie = économie directe.`,
        category: "advanced-ai",
        selected: false,
      },
      {
        id: "sentiment-analysis",
        name: "Analyse sentiments clients",
        description: "Détection automatique des émotions et satisfaction",
        explanation: `Analyse automatique des sentiments dans les retours clients (emails, avis, tickets support) avec scoring et alertes. **C'est quoi ?** L'IA lit vos interactions clients et détecte automatiquement s'ils sont satisfaits, frustrés ou en colère. **Pourquoi ?** Identifiez les clients à risque AVANT qu'ils partent (+32% de rétention), priorisez les tickets urgents, et mesurez objectivement la satisfaction. Les entreprises qui l'utilisent réduisent le churn de 25%.`,
        category: "advanced-ai",
        selected: false,
      },
      {
        id: "forecasting-predictions",
        name: "Prédictions / Forecasting",
        description: "Prévisions intelligentes basées sur données historiques",
        explanation: `Modèles prédictifs analysant vos données historiques pour anticiper ventes, stocks, churn, maintenance. **C'est quoi ?** L'IA analyse vos patterns passés et prédit l'avenir (demande produits, défaillances machines, résiliations clients). **Pourquoi ?** Optimisez vos stocks (-30% de coûts), anticipez les problèmes avant qu'ils surviennent, et maximisez votre CA en prédisant la demande. ROI moyen : 15-20€ générés pour 1€ investi en forecasting.`,
        category: "advanced-ai",
        selected: false,
      },

      // Multimodal AI (multimodal)
      {
        id: "image-generation",
        name: "Génération images (DALL-E, Midjourney)",
        description: "Création automatique de visuels par IA",
        explanation: `Génération automatique d'images, illustrations et designs via IA (DALL-E, Midjourney, Stable Diffusion). **C'est quoi ?** L'IA crée des visuels uniques à partir de descriptions textuelles (logos, illustrations produits, mockups). **Pourquoi ?** Économisez 80% vs designer graphiste, produisez du contenu visuel à l'infini pour réseaux sociaux, et testez rapidement des concepts créatifs. Une image IA coûte 0,02€ vs 50-500€ par un designer.`,
        category: "multimodal",
        selected: false,
      },
      {
        id: "text-to-speech",
        name: "Text-to-Speech (synthèse vocale)",
        description: "Conversion automatique texte vers audio naturel",
        explanation: `Synthèse vocale ultra-réaliste transformant vos textes en audio professionnel multilingue (11Labs, Google TTS). **C'est quoi ?** L'IA lit vos textes avec une voix humaine indiscernable d'un vrai speaker. **Pourquoi ?** Créez podcasts, audiobooks, annonces téléphoniques et contenus accessibles pour malvoyants sans studio. Coût : 0,30€/1000 caractères vs 100-300€/min pour voice-over humain. ROI massif pour formation, e-learning, marketing audio.`,
        category: "multimodal",
        selected: false,
      },
      {
        id: "speech-to-text",
        name: "Speech-to-Text (transcription)",
        description: "Transcription automatique de l'audio en texte",
        explanation: `Transcription automatique ultra-précise (98%+) de vos réunions, appels clients, vidéos en texte structuré (Whisper OpenAI). **C'est quoi ?** L'IA écoute vos fichiers audio/vidéo et produit une transcription complète avec timestamps. **Pourquoi ?** Documentez automatiquement toutes vos réunions, rendez votre contenu vidéo searchable, et générez des sous-titres multi-langues. Gain de temps : 4h de transcription manuelle = 5 minutes avec l'IA.`,
        category: "multimodal",
        selected: false,
      },
      {
        id: "video-analysis",
        name: "Analyse vidéo automatique",
        description: "Compréhension et indexation intelligente de vidéos",
        explanation: `Analyse automatique de vidéos pour extraction de contenu, détection d'objets, reconnaissance de visages et génération de résumés. **C'est quoi ?** L'IA regarde vos vidéos et comprend ce qui s'y passe (produits montrés, actions effectuées, personnes présentes). **Pourquoi ?** Indexez automatiquement des milliers d'heures de vidéos, créez des résumés intelligents, détectez des incidents en surveillance, et personnalisez le contenu vidéo. Utilisé par Netflix, YouTube pour recommandations.`,
        category: "multimodal",
        selected: false,
      },
    ],
  },

  cmsBlog: {
    id: "cmsBlog",
    name: "CMS / Blog",
    description:
      "Solution CMS complète 100% configurée - Il ne reste qu'à définir votre design",
    icon: "📝",
    basePrice: 2500,
    estimatedTimelineWeeks: { min: 3, max: 12 },
    features: [
      // Préférences de design (design-preferences)
      {
        id: "design-style-modern",
        name: "Design moderne et épuré",
        description:
          "Style minimaliste, espacements généreux, typographie moderne",
        explanation: `Design minimaliste et contemporain avec beaucoup d'espaces blancs, typographie sans-serif moderne (Helvetica, Inter), animations douces. Inspiré des sites tech comme Apple, Stripe, Airbnb. Convient aux startups, tech, services digitaux.`,
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-classic",
        name: "Design classique et professionnel",
        description: "Style traditionnel, structure formelle, police serif",
        explanation: `Design professionnel traditionnel avec structure formelle, polices serif (Times, Georgia), mise en page équilibrée. Inspiré des sites institutionnels, banques, cabinets d'avocats. Convient aux professions libérales, institutions, services B2B traditionnels.`,
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-creative",
        name: "Design créatif et audacieux",
        description: "Couleurs vibrantes, animations, mise en page originale",
        explanation: `Design audacieux et original avec couleurs vibrantes, animations dynamiques, mises en page asymétriques. Inspiré des sites d'agences créatives, artistes, marques lifestyle. Attire l'attention mais peut être moins sobre. Convient aux créatifs, mode, culture.`,
        category: "design-preferences",
        selected: false,
        mutuallyExclusive: true,
      },
      {
        id: "design-style-corporate",
        name: "Design corporate et sobre",
        description:
          "Style entreprise, couleurs neutres, mise en page structurée",
        explanation: `Design entreprise sobre et rassurant avec couleurs neutres (bleu, gris), mise en page structurée et claire. Inspire confiance et professionnalisme. Convient aux PME, services B2B, consultants. C'est le choix le plus sûr et polyvalent.`,
        category: "design-preferences",
        selected: true,
        mutuallyExclusive: true,
      },
    ],
  },
};

/**
 * Get all features for a specific project type
 */
export function getFeaturesForProjectType(projectType: ProjectType): Feature[] {
  return projectTypeConfigs[projectType].features;
}

/**
 * Get project type configuration
 */
export function getProjectTypeConfig(
  projectType: ProjectType,
): ProjectTypeConfig {
  return projectTypeConfigs[projectType];
}

/**
 * Get features grouped by category
 */
export function getFeaturesByCategory(
  projectType: ProjectType,
): Record<string, Feature[]> {
  const features = getFeaturesForProjectType(projectType);
  const grouped: Record<string, Feature[]> = {};

  features.forEach((feature) => {
    const category = feature.category || "other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(feature);
  });

  return grouped;
}

/**
 * Get category display names
 */
export function getCategoryName(
  category: string,
  projectType: ProjectType,
): string {
  const categoryNames: Record<ProjectType, Record<string, string>> = {
    siteVitrine: {
      scope: "Périmètre",
      content: "Contenu",
      features: "Fonctionnalités",
      "user-area": "Espace utilisateur",
      international: "International",
      seo: "SEO & Référencement",
      performance: "Performance & Technique",
      integrations: "Intégrations",
      services: "Services additionnels",
      "security-compliance": "Sécurité & Conformité",
      analytics: "Analytics & Suivi",
      "digital-marketing": "Marketing Digital",
    },
    ecommerce: {
      "catalog-size": "Taille du catalogue",
      "product-management": "Gestion produits",
      payment: "Paiement",
      inventory: "Stock & Logistique",
      shipping: "Livraison",
      marketing: "Marketing & Promotions",
      "customer-experience": "Expérience client",
      b2c: "B2C - Grand public",
      b2b: "B2B - Professionnels",
      international: "International",
      integrations: "Intégrations",
      "security-compliance": "Sécurité & Conformité",
      analytics: "Analytics E-commerce",
      "marketing-advanced": "Marketing Avancé",
    },
    appWeb: {
      auth: "Authentification",
      users: "Utilisateurs",
      dashboard: "Tableaux de bord",
      data: "Données",
      workflow: "Workflows",
      notifications: "Notifications",
      files: "Fichiers",
      search: "Recherche",
      api: "API & Intégrations",
      realtime: "Temps réel",
      mobile: "Mobile",
      "security-compliance": "Sécurité & Conformité",
      analytics: "Analytics Applicatif",
      "advanced-features": "Fonctionnalités Avancées",
    },
    auditCyber: {
      scope: "Périmètre",
      audit: "Types d'audit",
      apps: "Applications",
      compliance: "Conformité",
      followup: "Suivi",
      training: "Formation",
      reporting: "Rapports",
      "advanced-audits": "Audits Avancés",
      "response-certification": "Réponse & Certification",
    },
    aiAutomation: {
      "ai-models": "Modèles IA",
      "use-cases": "Cas d'usage",
      chatbot: "Chatbot",
      nlp: "Traitement du langage (NLP)",
      vision: "Vision par ordinateur",
      voice: "Reconnaissance vocale",
      automation: "Automatisation",
      training: "Formation & Apprentissage",
      volume: "Volume",
      deployment: "Déploiement",
      integrations: "Intégrations",
      monitoring: "Monitoring",
      support: "Support & Maintenance",
      "advanced-ai": "IA Avancée",
      multimodal: "IA Multimodale",
    },
    cmsBlog: {
      "design-preferences": "Préférences de design",
    },
  };

  return categoryNames[projectType]?.[category] || category;
}

/**
 * Get ordered list of categories for a project type
 * Each category will become a separate step in the wizard
 */
export function getCategoriesForProjectType(
  projectType: ProjectType,
): string[] {
  const config = getProjectTypeConfig(projectType);
  const categories = new Set<string>();

  config.features.forEach((f) => {
    if (f.category) categories.add(f.category);
  });

  return Array.from(categories);
}

/**
 * Get category description for better UX
 */
export function getCategoryDescription(
  projectType: ProjectType,
  category: string,
): string {
  const descriptions: Record<ProjectType, Record<string, string>> = {
    siteVitrine: {
      scope: "Définissez la taille de votre site web",
      content: "Types de contenu à afficher sur votre site",
      features: "Fonctionnalités interactives pour vos visiteurs",
      "user-area": "Espace client sécurisé et gestion des utilisateurs",
      international: "Support multilingue et gestion des langues",
      seo: "Optimisation pour les moteurs de recherche et visibilité Google",
      performance: "Performance technique et optimisations avancées",
      integrations: "Intégrations avec vos outils existants",
      services: "Services complémentaires (rédaction, photos, design)",
      "security-compliance":
        "Protection des données et conformité légale (RGPD, SSL, sauvegardes)",
      analytics: "Suivi et analyse du trafic pour optimiser vos performances",
      "digital-marketing":
        "Outils marketing avancés pour booster votre visibilité",
    },
    ecommerce: {
      "catalog-size": "Définissez la taille de votre catalogue produits",
      "product-management": "Gestion avancée de vos produits et variantes",
      payment: "Moyens de paiement acceptés par vos clients",
      inventory: "Gestion du stock et de la logistique",
      shipping: "Options et tarifs de livraison",
      marketing: "Outils marketing, promotions et fidélisation",
      "customer-experience": "Améliorez l'expérience d'achat de vos clients",
      b2c: "Fonctionnalités pour vendre aux particuliers",
      b2b: "Fonctionnalités pour vendre aux professionnels",
      international: "Vente internationale et multi-devises",
      integrations: "Intégrations tierces (CRM, ERP, marketplaces)",
      "security-compliance":
        "Sécurité des paiements et conformité e-commerce (RGPD, PCI-DSS)",
      analytics:
        "Analyse des ventes et tracking avancé pour optimiser votre CA",
      "marketing-advanced":
        "Stratégies marketing avancées (abonnements, fidélité, IA)",
    },
    appWeb: {
      features: "Fonctionnalités principales de votre application",
      auth: "Système d'authentification et gestion des utilisateurs",
      data: "Gestion et traitement des données",
      api: "API et intégrations externes",
      realtime: "Fonctionnalités temps réel",
      mobile: "Support mobile",
      "security-compliance": "Sécurité applicative et conformité RGPD",
      analytics: "Analytics et monitoring de votre application",
      "advanced-features":
        "Fonctionnalités avancées (onboarding, permissions, export)",
    },
    auditCyber: {
      scope: "Périmètre de l'audit cybersécurité",
      audit: "Types d'audits souhaités",
      apps: "Applications à auditer",
      compliance: "Conformité et normes",
      followup: "Suivi et remédiation",
      training: "Formation de vos équipes",
      reporting: "Rapports et documentation",
      "advanced-audits": "Audits automatisés avancés (pentest, cloud, SAST)",
      "response-certification":
        "Gestion d'incidents et certifications (ISO 27001)",
    },
    aiAutomation: {
      "ai-models":
        "Choisissez les modèles d'IA à utiliser (GPT-4, Claude, etc.)",
      "use-cases": "Définissez les cas d'usage de l'IA dans votre entreprise",
      chatbot: "Créez des chatbots intelligents pour vos clients ou équipes",
      nlp: "Analysez et comprenez du texte (extraction, classification, résumé)",
      vision: "Analysez des images (OCR, détection objets, classification)",
      voice: "Traitement audio (transcription, synthèse vocale, commandes)",
      automation: "Automatisez vos processus métier avec l'IA",
      training: "Entraînement et fine-tuning de modèles personnalisés",
      volume: "Volume de données à traiter par mois",
      deployment: "Mode de déploiement (cloud, on-premise, hybride)",
      integrations: "Intégrations avec vos outils existants (CRM, email, etc.)",
      monitoring: "Monitoring et analytics de vos modèles IA",
      support: "Support technique et maintenance de vos solutions IA",
      "advanced-ai":
        "Fonctionnalités d'IA avancées (RAG, Fine-tuning, OCR, Prédictions)",
      multimodal:
        "Intelligence artificielle multimodale (Images, Audio, Vidéo)",
    },
    cmsBlog: {
      "design-preferences":
        "Choisissez le style de design qui correspond à votre image de marque. Le CMS est entièrement configuré avec toutes les fonctionnalités - nous personnalisons uniquement le design selon vos préférences.",
    },
  };

  return (
    descriptions[projectType]?.[category] ||
    "Sélectionnez les options qui correspondent à vos besoins"
  );
}

/**
 * Check if a category has mutually exclusive features
 */
export function isCategoryMutuallyExclusive(
  projectType: ProjectType,
  category: string,
): boolean {
  const config = getProjectTypeConfig(projectType);
  const categoryFeatures = config.features.filter(
    (f) => f.category === category,
  );

  // Categories like 'scope', 'catalog', 'volume' are typically mutually exclusive
  const exclusiveCategories = ["scope", "catalog", "volume", "pages"];

  return (
    exclusiveCategories.includes(category) ||
    categoryFeatures.every((f) => f.mutuallyExclusive === true)
  );
}
