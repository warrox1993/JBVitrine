const fs = require("fs");

// Mapping des explications par feature ID
// Format: "C'est quoi (à quoi ça sert) + Pourquoi devrais-je avoir ça"
const explanations = {
  // Scope
  "pages-1-5": `Site compact de 1 à 5 pages couvrant l'essentiel : Accueil, Services, À propos, Contact. **C'est quoi ?** Le minimum pour avoir une présence web professionnelle. **Pourquoi ?** Coût maîtrisé, rapide à mettre en ligne (2-3 semaines), parfait pour TPE/indépendants qui démarrent. 80% des visiteurs ne consultent que 3-4 pages max.`,

  "pages-6-10": `Site complet de 6 à 10 pages incluant les pages essentielles plus des pages secondaires (témoignages, FAQ, services détaillés). **C'est quoi ?** Un site web professionnel avec toutes les informations nécessaires. **Pourquoi ?** Vous donnez confiance (site complet), améliorez votre SEO (plus de contenu indexé), et répondez aux questions avant même qu'on vous contacte. Idéal pour PME établies.`,

  "pages-11-20": `Site étendu de 11 à 20 pages pour entreprises multi-services ou multi-localités. **C'est quoi ?** Un site structuré avec des pages dédiées par service, localité ou segment client. **Pourquoi ?** Vous ciblez mieux chaque audience, boostez votre SEO local/thématique, et vous positionnez comme acteur sérieux. Nécessaire si vous avez plusieurs activités ou bureaux.`,

  "pages-20+": `Site corporate complexe de 20+ pages pour grandes entreprises. **C'est quoi ?** Un écosystème web complet avec architecture d'information sophistiquée. **Pourquoi ?** Pour les grands comptes qui ont besoin de présenter de nombreux services, équipes, références, actualités. Renforce l'image de marque et la crédibilité institutionnelle.`,

  // Content
  "team-members": `Page Équipe présentant vos collaborateurs avec photos, bios et rôles. **C'est quoi ?** Une page dédiée à votre équipe avec photos pro et descriptions. **Pourquoi ?** Humanise votre entreprise (+45% de confiance), rassure les clients B2B qui veulent savoir à qui ils ont affaire, et améliore votre culture d'entreprise (fierté d'équipe). 71% des visiteurs B2B consultent cette page.`,

  "faq-section": `Section FAQ avec questions/réponses organisées par catégorie et recherche intégrée. **C'est quoi ?** Une page dédiée aux questions fréquentes de vos clients. **Pourquoi ?** Réduit les appels/emails répétitifs de 30-40%, améliore le SEO (Google affiche les FAQ en résultats enrichis), et facilite la décision d'achat en levant les objections courantes.`,

  "video-gallery": `Galerie vidéo professionnelle avec intégration YouTube/Vimeo et organisation en playlists. **C'est quoi ?** Une section présentant vos vidéos de manière organisée et élégante. **Pourquoi ?** La vidéo génère 1200% plus de partages que texte+image combinés. Parfait pour tutoriels, témoignages vidéo, visites virtuelles. Les visiteurs restent 88% plus longtemps sur une page avec vidéo.`,

  // Features
  "contact-form-basic": `Formulaire de contact simple avec validation en temps réel et protection anti-spam reCAPTCHA. **C'est quoi ?** Un formulaire standard (nom, email, message) sécurisé. **Pourquoi ?** Le minimum vital pour être contacté. 44% des visiteurs B2B préfèrent un formulaire au téléphone. Sans formulaire, vous perdez des leads.`,

  "contact-advanced": `Formulaire de contact avancé multi-étapes avec upload de fichiers, champs conditionnels et conformité RGPD complète. **C'est quoi ?** Un formulaire sophistiqué qui s'adapte selon les réponses et permet l'envoi de documents. **Pourquoi ?** Améliore la qualité des leads (+35%), réduit les allers-retours par email, et donne une image professionnelle. Essentiel si vous avez besoin de documents (devis, cahier des charges).`,

  "quote-wizard": `Générateur de devis interactif guidant l'utilisateur étape par étape vers une estimation personnalisée. **C'est quoi ?** Un wizard qui pose des questions et calcule un tarif estimatif en temps réel. **Pourquoi ?** Filtre les prospects non sérieux, éduque sur vos services, et génère des leads plus qualifiés (+60%). Réduit votre temps commercial de 40%. Les visiteurs adorent savoir où ils vont côté budget.`,

  "booking-calendar": `Calendrier de réservation en ligne synchronisé avec votre agenda (Google Calendar, Outlook). **C'est quoi ?** Système de prise de RDV automatique montrant vos disponibilités réelles. **Pourquoi ?** Élimine les échanges d'emails interminables pour fixer un rendez-vous. Augmente les conversions de 25% (action immédiate vs "je vous rappelle"). Indispensable pour consultants, médecins, coiffeurs, etc.`,

  "search-engine": `Moteur de recherche interne avec indexation full-text et résultats pertinents instantanés. **C'est quoi ?** Une barre de recherche permettant de trouver rapidement du contenu sur votre site. **Pourquoi ?** Sur un site de 15+ pages, 30% des visiteurs utilisent la recherche. Améliore l'UX, réduit le taux de rebond, et vous montre ce que cherchent vos visiteurs (insights précieux).`,

  "map-locations": `Carte interactive Google Maps avec markers personnalisés, itinéraire et Street View. **C'est quoi ?** Une carte montrant votre/vos localisation(s) avec possibilité d'obtenir un itinéraire. **Pourquoi ?** 86% des visiteurs vérifient la localisation sur une carte avant de venir. Améliore le référencement local Google Maps. Essentiel si vous avez un lieu physique.`,

  "newsletter-signup": `Formulaire d'inscription newsletter avec double opt-in et intégration automatique à votre outil d'emailing. **C'est quoi ?** Un formulaire pour collecter des emails et constituer une liste de diffusion. **Pourquoi ?** L'email marketing génère 38€ de ROI pour 1€ investi. Vous gardez le contact avec vos prospects, les convertissez à votre rythme, et ne dépendez pas des algorithmes des réseaux sociaux. Votre liste email est un actif qui vous appartient.`,

  // User Area
  "login-area": `Espace client sécurisé avec authentification forte (2FA optionnel) et gestion des sessions. **C'est quoi ?** Une zone privée du site accessible uniquement après connexion. **Pourquoi ?** Permet de partager des documents confidentiels, suivre des projets en cours, ou donner accès à du contenu premium. Améliore la fidélisation et réduit le support (clients autonomes). Indispensable en B2B.`,

  "document-downloads": `Zone de téléchargement sécurisée pour documents PDF, fichiers et ressources protégées. **C'est quoi ?** Une bibliothèque de documents accessibles uniquement aux clients connectés. **Pourquoi ?** Centralisez factures, contrats, manuels, rapports au lieu d'envoyer par email. Traçabilité complète (qui a téléchargé quoi et quand). Renforce le professionnalisme et facilite la collaboration.`,

  // Integrations
  "crm-integration": `Intégration bidirectionnelle avec votre CRM (HubSpot, Salesforce, Pipedrive) pour synchronisation automatique des contacts. **C'est quoi ?** Connexion de votre site à votre outil CRM pour transférer automatiquement les leads. **Pourquoi ?** Zéro saisie manuelle, aucun lead perdu, relance automatique. Vos commerciaux ont instantanément les infos. ROI immédiat : un lead perdu = minimum 500-5000€ selon votre secteur.`,

  "email-marketing-integration": `Connexion automatique avec votre plateforme email marketing (Mailchimp, Brevo, ActiveCampaign) pour gestion de listes et campagnes. **C'est quoi ?** Synchronisation entre votre site et votre outil d'emailing. **Pourquoi ?** Automatisez vos campagnes (nouveau client = série de bienvenue automatique), segmentez finement votre audience, mesurez tout. Augmente l'engagement de 50% vs emails manuels.`,

  "social-media-feed": `Flux en temps réel de vos réseaux sociaux (Instagram, Facebook, LinkedIn, Twitter) affiché sur votre site. **C'est quoi ?** Intégration de vos posts réseaux sociaux directement sur votre site web. **Pourquoi ?** Montre que vous êtes actif, incite à vous suivre (+40% d'abonnés), et garde votre site visuellement à jour sans effort. Votre contenu social sert deux fois.`,

  // Services
  copywriting: `Rédaction professionnelle SEO-optimisée de tous vos contenus web (800-1200 mots par page). **C'est quoi ?** Un rédacteur professionnel écrit tous les textes de votre site. **Pourquoi ?** Vous n'avez pas le temps, l'expertise SEO, ou le recul nécessaire. Un bon copywriting augmente les conversions de 60-200%. Google privilégie les textes bien écrits et structurés. Investissement qui se rentabilise rapidement.`,

  "professional-photography": `Shooting photo professionnel sur site (demi-journée) avec retouches et 30-50 photos HD livrées. **C'est quoi ?** Un photographe professionnel vient chez vous pour shooter vos locaux, équipes, produits. **Pourquoi ?** Les photos stock font amateur et nuisent à la crédibilité. 67% des consommateurs jugent les photos plus importantes que les descriptions. Des vraies photos augmentent la confiance de 75%.`,

  "video-production": `Production d'une vidéo de présentation corporate 1-2 minutes avec script, tournage, montage et motion design. **C'est quoi ?** Une vidéo professionnelle présentant votre entreprise, équipe et savoir-faire. **Pourquoi ?** 72% des clients préfèrent la vidéo au texte pour découvrir un produit/service. Augmente les conversions de 80%. Réutilisable sur site, réseaux sociaux, salons. ROI énorme si bien faite.`,

  "logo-design": `Création de logo professionnel avec 3 propositions, révisions illimitées et livraison tous formats (vectoriel, PNG, JPG). **C'est quoi ?** Un designer crée votre identité visuelle unique. **Pourquoi ?** Le logo est la première impression (7 secondes pour marquer). Un logo amateur = image amateur = moins de clients. Un bon logo augmente la mémorisation de 80% et la reconnaissance de marque.`,

  // Maintenance & Support
  "basic-maintenance": `Maintenance de base : mises à jour de sécurité mensuelles + 1h de modifications mineures par mois. **C'est quoi ?** Un contrat pour garder votre site sécurisé et à jour. **Pourquoi ?** 60% des hacks ciblent des sites non mis à jour. Vous n'avez pas l'expertise technique. 1h/mois permet de corriger bugs, changer textes/images, et éviter que votre site devienne obsolète. Tranquillité d'esprit pour 50-150€/mois.`,

  "standard-maintenance": `Maintenance standard : mises à jour hebdomadaires + monitoring 24/7 + backup quotidien + 3h modifications/mois. **C'est quoi ?** Maintenance proactive avec surveillance constante. **Pourquoi ?** Vous êtes alerté avant qu'un problème devienne critique. Sauvegardes automatiques = zéro risque de perte de données. 3h/mois suffisent pour évoluer progressivement (nouvelles pages, fonctionnalités). Recommandé pour sites e-commerce ou critiques.`,

  "premium-maintenance": `Maintenance premium : surveillance 24/7 + backup temps réel + 8h modifications/mois + hotline prioritaire + SLA 2h. **C'est quoi ?** Maintenance enterprise avec engagement de temps de réponse. **Pourquoi ?** Pour sites critiques où chaque heure d'indisponibilité coûte cher. Support téléphonique immédiat, résolution garantie sous 2h. 8h/mois permettent d'ajouter régulièrement de nouvelles fonctionnalités. Idéal pour e-commerce +50k€/mois ou sites à fort trafic.`,

  // E-commerce Specific
  "products-50": `Catalogue jusqu'à 50 produits avec fiches détaillées, photos, prix et gestion de stock. **C'est quoi ?** Boutique en ligne pour petite gamme de produits. **Pourquoi ?** Budget maîtrisé, gestion simple. Parfait pour artisans, créateurs, petits producteurs qui démarrent en ligne. 50 produits bien présentés valent mieux que 500 mal mis en avant.`,

  "products-51-200": `Catalogue 51-200 produits avec catégories, filtres avancés et système de gestion de stock. **C'est quoi ?** E-commerce pour gamme moyenne avec navigation structurée. **Pourquoi ?** Vous avez besoin de catégorisation fine et filtres pour aider les clients à trouver. Système de stock évite les ventes de produits indisponibles. Niveau PME classique.`,

  "products-201-500": `Catalogue 201-500 produits avec architecture complexe, filtres multicritères et recommandations. **C'est quoi ?** E-commerce avancé pour large catalogue nécessitant une architecture sophistiquée. **Pourquoi ?** Navigation par facettes indispensable (sinon les clients sont perdus). Recommandations personnalisées augmentent le panier moyen de 30%. Backup et performance critiques.`,

  "products-500+": `Catalogue 500+ produits avec architecture évolutive, recherche IA et performance optimisée. **C'est quoi ?** E-commerce enterprise pour très gros catalogues. **Pourquoi ?** Performance critique (recherche instantanée même avec 10k produits). Import/export automatisé avec vos systèmes. Évolutif jusqu'à 100k produits. Nécessite expertise technique pointue.`,

  // Payment
  "payment-offline": `Paiement hors ligne uniquement : virement bancaire ou paiement à la livraison. **C'est quoi ?** Pas de paiement en ligne, vous gérez manuellement. **Pourquoi ?** Économise les frais de transaction (1,5-3%), évite la complexité PCI-DSS. Acceptable si clientèle B2B avec facturation ou si vous démarrez. Par contre, conversion 40% plus faible qu'avec paiement en ligne.`,

  "payment-basic": `Paiement en ligne basique : carte bancaire via Stripe ou Mollie. **C'est quoi ?** Paiement par carte simple et sécurisé. **Pourquoi ?** Augmente les conversions de 40% (achat immédiat), réduit les abandons, et donne confiance (site pro). Stripe/Mollie gèrent la sécurité PCI-DSS. Frais 1,5-2,5% par transaction mais compensés largement par le volume.`,

  "payment-advanced": `Paiement avancé : carte, Bancontact, PayPal, Apple Pay, Google Pay, Klarna. **C'est quoi ?** Multiples moyens de paiement pour s'adapter à chaque client. **Pourquoi ?** Chaque option de paiement supplémentaire = +8% de conversion. Bancontact essentiel en Belgique. Buy-now-pay-later (Klarna) augmente panier moyen de 45%. 68% des abandons de panier sont dus à l'absence du moyen de paiement préféré.`,

  // Inventory
  "inventory-basic": `Gestion de stock basique : quantité, rupture, et réapprovisionnement manuel. **C'est quoi ?** Système simple pour suivre vos stocks. **Pourquoi ?** Évite de vendre ce que vous n'avez pas (mauvaise expérience client), vous alerte en cas de rupture, et montre la disponibilité en temps réel. Indispensable dès 20+ produits.`,

  "inventory-advanced": `Gestion de stock avancée : variants, multi-dépôts, mouvements, et alertes automatiques. **C'est quoi ?** Système professionnel gérant plusieurs entrepôts et les variants produits. **Pourquoi ?** Pour produits avec tailles/couleurs, gestion multi-magasins, ou volumes importants. Traçabilité complète, alertes automatiques de réapprovisionnement, rapports détaillés. Évite les erreurs qui coûtent cher.`,

  "inventory-realtime-sync": `Synchronisation stock temps réel avec votre ERP/système de gestion externe. **C'est quoi ?** Votre site e-commerce et votre système interne partagent le même stock en direct. **Pourquoi ?** Une seule source de vérité, zéro décalage stock physique vs stock web. Indispensable si vous vendez aussi en boutique ou sur marketplaces. Évite les surventes et les clients mécontents.`,

  // Shipping
  "shipping-simple": `Tarifs de livraison simples : 1-3 zones géographiques avec tarif fixe par zone. **C'est quoi ?** Frais de port basiques (ex: 5€ Belgique, 10€ Europe). **Pourquoi ?** Simple à comprendre pour le client et à gérer pour vous. Suffisant si vous avez peu de variations de poids/taille. Transparence totale = moins d'abandons panier.`,

  "shipping-advanced": `Livraison avancée : calcul au poids/dimension + transporteurs multiples + tracking. **C'est quoi ?** Calcul automatique selon le poids et choix du transporteur (Bpost, DPD, UPS, etc.). **Pourquoi ?** Vous ne perdez pas d'argent sur les gros colis, le client voit le suivi en temps réel, et vous proposez plusieurs options (standard/express). Professionnel et rentable.`,

  "shipping-realtime": `Livraison en temps réel : intégration API transporteurs pour tarifs live + points relais. **C'est quoi ?** Tarifs exacts de Bpost/DPD/Mondial Relay en direct + carte des points relais. **Pourquoi ?** Précision maximale, le client choisit son point relais préféré sur une carte. Réduit les abandons de 15% (le client voit que son point relais est à 200m). Nécessaire pour e-commerce sérieux.`,

  // Customer Features
  "customer-accounts": `Comptes clients avec historique commandes, wishlist et informations sauvegardées. **C'est quoi ?** Vos clients créent un compte pour retrouver leurs infos et commandes. **Pourquoi ?** Augmente la fidélisation (+35% de commandes repeat), raccourcit le checkout (infos pré-remplies), et permet des fonctions avancées (wishlist, tracking). 73% des e-shoppers préfèrent créer un compte.`,

  "guest-checkout": `Achat invité : commande possible sans créer de compte (email uniquement). **C'est quoi ?** Option d'acheter sans s'inscrire. **Pourquoi ?** 24% des abandons de panier sont dus à la création de compte obligatoire. Proposer les deux options (compte ou invité) maximise les conversions. L'achat invité rapide = achat impulsif favorisé.`,

  wishlists: `Listes de souhaits personnalisables et partageables avec rappels automatiques. **C'est quoi ?** Clients sauvegardent produits favoris pour plus tard. **Pourquoi ?** Augmente le taux de retour (+45%), permet de rappeler par email "votre wishlist vous attend", et facilite les achats cadeaux (partage wishlist). Classique sur tout e-commerce moderne.`,

  "reviews-ratings": `Système d'avis clients avec notes, commentaires, photos et modération. **C'est quoi ?** Vos clients laissent des avis et notes sur vos produits. **Pourquoi ?** 95% des consommateurs lisent les avis avant d'acheter. Les avis augmentent les conversions de 270% (preuve sociale massive). Google affiche les étoiles dans les résultats. Modération nécessaire pour éviter spam/faux avis.`,

  "product-qna": `Questions/Réponses produits : clients posent des questions, vous répondez publiquement. **C'est quoi ?** Section Q&A sur chaque fiche produit. **Pourquoi ?** Répond aux objections avant l'achat (+15% conversion), réduit le support (la réponse sert à tous), et améliore le SEO (contenu généré par utilisateurs). Amazon, Zalando, tous les grands ont cette fonction.`,

  // Marketing & SEO E-commerce
  "product-recommendations": `Recommandations produits intelligentes : "Vous aimerez aussi", "Souvent achetés ensemble", "Vus récemment". **C'est quoi ?** Suggestions de produits personnalisées basées sur le comportement. **Pourquoi ?** Augmente le panier moyen de 10-30% (cross-sell/up-sell), améliore la découverte produits, et imite l'expérience "vendeur conseil". Amazon fait 35% de son CA grâce aux recommandations.`,

  "abandoned-cart-recovery": `Récupération paniers abandonnés : emails automatiques avec rappel + code promo optionnel. **C'est quoi ?** Emails automatiques aux clients qui ont abandonné leur panier. **Pourquoi ?** 70% de paniers sont abandonnés. Un email de relance bien fait en récupère 10-15% = 7-10% de CA supplémentaire immédiat. ROI de 4000% en moyenne (coût dérisoire, gain énorme).`,

  "email-automation": `Automatisations emails e-commerce : bienvenue, abandon, post-achat, réengagement, anniversaire. **C'est quoi ?** Scénarios d'emails automatiques selon le comportement client. **Pourquoi ?** L'email automation génère 320% plus de revenus que les campagnes classiques. Zéro effort après setup. Exemples : email bienvenue +40% engagement, email post-achat +25% repeat purchase, email win-back +20% réactivation.`,

  "seo-product-optimization": `Optimisation SEO produits : URLs parlantes, rich snippets produits, prix/dispo en résultats Google. **C'est quoi ?** Optimisation technique pour que vos produits ressortent dans Google avec prix et étoiles. **Pourquoi ?** Les rich snippets produits augmentent le CTR de 30% (votre résultat attire l'œil). Google Shopping gratuit nécessite ces données. Vos produits apparaissent mieux que la concurrence.`,

  "dynamic-pricing": `Tarification dynamique : promotions automatiques, prix dégressifs par quantité, happy hours. **C'est quoi ?** Système permettant des prix variables selon règles (quantité, période, client). **Pourquoi ?** Prix dégressif augmente panier moyen de 25% (encouragement à acheter plus), happy hours/flash sales créent urgence, et prix personnalisés selon segment client améliorent marge. Amazon change ses prix toutes les 10 minutes.`,

  // Advanced E-commerce
  "multi-vendor": `Marketplace multi-vendeurs : plusieurs marchands vendent sur votre plateforme avec commission. **C'est quoi ?** Vous créez votre propre marketplace type Amazon/Bol.com. **Pourquoi ?** Modèle scalable (les vendeurs ajoutent le contenu), revenus sur commission sans stock, et croissance exponentielle du catalogue. Complexe mais très rentable si bien exécuté. Etsy, Amazon, Airbnb utilisent ce modèle.`,

  "subscription-products": `Abonnements produits : livraison récurrente avec gestion automatique et paiements mensuels. **C'est quoi ?** Vos clients s'abonnent pour recevoir vos produits régulièrement. **Pourquoi ?** Revenus prévisibles et récurrents (MRR), fidélisation maximale (CLV 5-10x plus élevée), et croissance rapide. Le modèle économique préféré des investisseurs. Dollar Shave Club vendu 1 milliard$ grâce à ce modèle.`,

  "b2b-wholesale": `Espace B2B/Grossiste : tarifs professionnels, commandes en gros, catalogues privés, paiement à terme. **C'est quoi ?** Section dédiée aux professionnels avec prix de gros et conditions spécifiques. **Pourquoi ?** Doublez votre marché (B2C + B2B), marges supérieures sur volumes, et fidélisation pro (commandes récurrentes). Zéro cannibalisation si les prix pros sont cachés aux particuliers.`,

  "gift-cards": `Cartes cadeaux numériques : achat, personnalisation, envoi automatique et gestion des soldes. **C'est quoi ?** Vente de bons d'achat dématérialisés. **Pourquoi ?** CA immédiat (souvent non dépensé = argent gratuit), acquisition de nouveaux clients (cadeau = découverte), et boost période fêtes (+40% CA décembre). 20% des cartes cadeaux ne sont jamais utilisées (pure marge).`,

  // Analytics & Reporting
  "analytics-basic": `Analytics basique : visiteurs, pages vues, sources de trafic, taux de conversion. **C'est quoi ?** Statistiques essentielles de votre site. **Pourquoi ?** Savoir d'où viennent vos visiteurs, quelles pages marchent, et votre taux de conversion. Sans analytics = pilotage à l'aveugle. Google Analytics 4 gratuit suffit pour démarrer.`,

  "analytics-ecommerce": `Analytics e-commerce avancé : funnel achat, valeur panier, produits stars, abandons, cohort analysis. **C'est quoi ?** Analyse poussée du comportement d'achat de vos clients. **Pourquoi ?** Identifiez où vous perdez des clients (funnel), quels produits cartonnent, quels clients reviennent. Optimisez chaque étape = +20-50% de CA sans plus de trafic. Data-driven decisions.`,

  "conversion-tracking": `Tracking conversions avancé : pixels Facebook/Google Ads, attribution multi-touch, ROI par canal. **C'est quoi ?** Suivi précis de chaque conversion et de sa source réelle. **Pourquoi ?** Savoir exactement quel canal marketing rapporte (Facebook Ads ? SEO ? Email ?). Optimisez vos budgets pub en temps réel. Attribution multi-touch montre le vrai parcours client (souvent 5-7 points de contact avant achat).`,

  // Security
  "ssl-certificate": `Certificat SSL/TLS : chiffrement HTTPS pour sécuriser les données. **C'est quoi ?** Le cadenas vert dans le navigateur + HTTPS. **Pourquoi ?** OBLIGATOIRE : sans SSL, Google vous pénalise, les navigateurs affichent "Site non sécurisé" (fuite visiteurs), et vous ne pouvez pas traiter de paiements. Le minimum légal et technique absolu.`,

  "gdpr-compliance": `Conformité RGPD complète : consentement cookies, politique confidentialité, gestion données, droit à l'oubli. **C'est quoi ?** Respect des règles RGPD européennes sur les données personnelles. **Pourquoi ?** OBLIGATION LÉGALE : amendes jusqu'à 20M€ ou 4% CA. Les clients sont sensibles à la vie privée. Banner cookies bien fait, registre des données, procédures d'effacement. Indispensable.`,

  "pci-compliance": `Conformité PCI-DSS : standards de sécurité pour paiement par carte. **C'est quoi ?** Normes de sécurité bancaires pour manipuler des données de cartes. **Pourquoi ?** OBLIGATOIRE si vous acceptez des cartes bancaires. Stripe/Mollie gèrent ça pour vous (recommandé), sinon audit annuel coûteux. Non-conformité = interdiction d'accepter des cartes + risque énorme en cas de hack.`,

  "two-factor-auth": `Authentification à deux facteurs (2FA) pour comptes admins et clients. **C'est quoi ?** Double vérification lors de la connexion (mot de passe + code SMS/app). **Pourquoi ?** 99,9% des hacks automatiques sont bloqués par 2FA. Protège vos données critiques même si un mot de passe fuite. Rassurant pour clients B2B avec données sensibles. Norme de sécurité 2024.`,

  // CMS & Content
  "headless-cms": `CMS headless : gestion contenu découplée du front-end (Strapi, Contentful, Sanity). **C'est quoi ?** Système de gestion de contenu accessible via API, utilisable sur web, mobile, IoT. **Pourquoi ?** Flexibilité maximale (un contenu = tous vos canaux), performance supérieure, évolutivité, et stack technique moderne. Coûte plus cher au départ mais économies long terme. Pour projets ambitieux.`,

  "cms-customization": `Personnalisation CMS avancée : champs sur mesure, workflows validation, rôles personnalisés. **C'est quoi ?** CMS adapté précisément à vos processus métiers. **Pourquoi ?** Votre équipe travaille efficacement (interface intuitive), workflow de validation respecté (pas de publication sauvage), et droits granulaires (stagiaire ≠ CEO). Gain productivité 50%.`,

  "content-versioning": `Versioning de contenu : historique complet, restauration, comparaison versions. **C'est quoi ?** Chaque modification est sauvegardée, vous pouvez revenir en arrière. **Pourquoi ?** Sécurité (quelqu'un casse une page ? Restaurez en 2 clics), audit trail (qui a changé quoi et quand), et travail collaboratif serein. WordPress le fait mal, les CMS pros le font bien.`,

  "content-scheduling": `Publication programmée : planifiez vos contenus à l'avance avec publication automatique. **C'est quoi ?** Vous écrivez à l'avance, le système publie automatiquement à la date/heure choisie. **Pourquoi ?** Gagnez du temps (batch creation), respectez votre calendrier éditorial, et publiez même en vacances. Les gros sites publient à 9h pile chaque jour = besoin de scheduling.`,

  // Advanced Features
  "ai-chatbot": `Chatbot IA conversationnel : réponses automatiques 24/7 avec compréhension naturelle du langage. **C'est quoi ?** Un assistant virtuel qui répond aux questions courantes automatiquement. **Pourquoi ?** Support 24/7 sans coût additionnel, résout 60-80% des questions simples, qualifie les leads, et libère votre équipe pour questions complexes. Les clients adorent les réponses instantanées. Intercom, Drift, ChatGPT API.`,

  "voice-search-optimization": `Optimisation recherche vocale : contenu adapté aux requêtes "Alexa/Siri/Google Assistant". **C'est quoi ?** Optimisation pour les recherches type "OK Google, trouve un plombier à Liège". **Pourquoi ?** 50% des recherches seront vocales en 2024. Les requêtes vocales sont différentes (plus longues, conversationnelles). Position 0 Google (featured snippet) critique car Alexa lit uniquement ce résultat. Early mover advantage.`,

  "ar-product-preview": `Réalité augmentée : visualisation produits en 3D chez le client via caméra smartphone. **C'est quoi ?** Le client voit votre produit chez lui en taille réelle via son téléphone. **Pourquoi ?** Réduit les retours de 25% (le client sait ce qu'il achète), effet "wow" (partages sociaux), et augmente conversion de 40% (confiance). Ikea, Amazon l'ont généralisé. Indispensable pour meubles, déco, mode.`,

  "print-on-demand": `Impression à la demande : produits créés uniquement après commande, zéro stock. **C'est quoi ?** Vous vendez, le fournisseur produit et expédie en votre nom. **Pourquoi ?** Zéro stock = zéro risque financier, catalogues infinis possibles (t-shirts, mugs, posters...), et scalabilité immédiate. Marges plus faibles (30-40%) mais modèle léger. Printful, Printify pour démarrer.`,
};

// Lire le fichier
const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Compter les ajouts
let addedCount = 0;

// Pour chaque feature ID dans notre mapping
Object.entries(explanations).forEach(([featureId, explanation]) => {
  // Regex pour trouver la feature et ajouter l'explanation après description
  // Pattern: id: "feature-id", ... description: "...", category: ...
  // On veut insérer l'explanation entre description et category

  const regex = new RegExp(
    `(\\{[^}]*?id:\\s*["']${featureId}["'][^}]*?description:\\s*["']([^"']*?)["'],)([^}]*?category:)`,
    "s",
  );

  const match = content.match(regex);

  if (match && !match[0].includes("explanation:")) {
    const replacement = `$1\n      explanation: \`${explanation}\`,\n     $3`;
    content = content.replace(regex, replacement);
    addedCount++;
    console.log(`✓ Added explanation for: ${featureId}`);
  }
});

// Écrire le fichier modifié
fs.writeFileSync(filePath, content, "utf-8");

console.log(`\n✅ Done! Added ${addedCount} explanations to features.ts`);
console.log("Please review the file and test your application.");
