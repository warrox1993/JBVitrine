const fs = require("fs");
const path = require("path");

const featuresPath = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "pricing",
  "features.ts",
);
let content = fs.readFileSync(featuresPath, "utf8");

// Comprehensive explanations for ALL features across all project types
const explanations = {
  // ======================
  // SITE VITRINE
  // ======================

  // Scope
  "pages-5": `Petit site vitrine de 5 pages max (Accueil, À propos, Services, Contact, Mentions légales). Parfait pour les artisans, consultants indépendants ou petites entreprises qui ont besoin d'une présence web simple. Rapide à créer (2-3 semaines) et facile à gérer.`,

  "pages-10": `Site standard de 10 pages max incluant plusieurs pages de services détaillés, une présentation d'équipe, un portfolio. Idéal pour les PME, agences, cabinets professionnels. Permet de bien structurer votre offre sans que le site devienne trop complexe.`,

  "pages-20": `Grand site de 20 pages permettant de détailler chaque service, créer des pages pour chaque membre d'équipe, avoir plusieurs cas clients. Pour entreprises établies avec une offre complète à présenter. Permet un excellent référencement grâce au contenu riche.`,

  "pages-unlimited": `Site avec nombre de pages illimité, parfait pour les grandes entreprises ou organisations avec beaucoup de contenu. Inclut généralement un système de gestion de contenu (CMS) pour que vous puissiez ajouter des pages facilement vous-même.`,

  // Content
  blog: `Section blog intégrée pour publier des articles régulièrement. Excellent pour le SEO (Google favorise les sites qui publient du contenu frais). Vous apparaissez comme expert dans votre domaine. Augmente le trafic de 55% en moyenne. WordPress, Medium et tous les grands sites ont un blog.`,

  portfolio: `Galerie de vos réalisations/projets avec images, descriptions détaillées, catégories. Indispensable pour photographes, designers, architectes, agences. Permet aux clients de voir votre travail avant de vous contacter. Augmente les demandes de devis qualifiées de 60%.`,

  "team-page": `Page dédiée présentant votre équipe avec photos, bio, rôles. Humanise votre entreprise et crée la confiance. Les visiteurs aiment savoir avec qui ils vont travailler. Augmente les conversions de 25% selon les études.`,

  testimonials: `Section témoignages clients avec avis, photos, logos d'entreprises. 92% des consommateurs lisent les avis avant d'acheter. Les témoignages authentiques augmentent les conversions de 34%. Plus crédible que votre propre discours commercial.`,

  faq: `Page FAQ (Foire Aux Questions) répondant aux questions fréquentes. Réduit les appels/emails de 40%, améliore l'expérience utilisateur, excellent pour le SEO (Google met en avant les FAQ dans les résultats). Permet aux visiteurs pressés de trouver rapidement leurs réponses.`,

  "case-studies": `Études de cas détaillées montrant comment vous avez résolu les problèmes de vos clients (avant/après, résultats chiffrés). Plus convaincant que les témoignages simples. Parfait pour le B2B où les cycles de vente sont longs. Augmente la crédibilité et les conversions qualifiées.`,

  // Features
  "contact-form": `Formulaire de contact simple (nom, email, message) avec protection anti-spam. Indispensable sur tout site. Les visiteurs peuvent vous contacter 24/7. Emails automatiques de confirmation. Préféré par 70% des visiteurs vs téléphone. Sans formulaire, vous perdez 50% des demandes potentielles.`,

  "advanced-forms": `Formulaires avancés: multi-étapes, champs conditionnels (questions qui apparaissent selon les réponses), upload de fichiers, signature électronique. Pour demandes de devis complexes, candidatures, inscriptions événements. Meilleure qualification des leads.`,

  newsletter: `Système d'inscription newsletter avec popup ou formulaire intégré. Intégration Mailchimp/Brevo pour envoyer des emails automatiques. Permet de garder contact avec vos visiteurs et les convertir plus tard. Email marketing a un ROI de 4200% (42€ de retour par 1€ investi).`,

  "booking-system": `Système de réservation en ligne avec calendrier, créneaux horaires, paiement optionnel. Pour coiffeurs, médecins, restaurants, salles de réunion. Réduit les no-show de 50%, disponible 24/7, gain de temps énorme. Plus besoin de gérer les appels de réservation.`,

  "live-chat": `Chat en direct pour discuter instantanément avec vos visiteurs. Augmente les conversions de 45% car vous répondez aux questions en temps réel. Disponible via Intercom, Crisp, Tidio. 79% des clients préfèrent le chat au téléphone pour les questions rapides.`,

  "map-integration": `Carte Google Maps interactive montrant votre localisation avec itinéraire. Essentiel si vous avez un lieu physique. 86% des visiteurs vérifient la localisation sur une carte avant de venir. Améliore le référencement local.`,

  "video-integration": `Intégration de vidéos YouTube/Vimeo/auto-hébergées de présentation. La vidéo augmente la compréhension de 74%, le temps passé sur le site de 88%, les conversions de 80%. Les visiteurs retiennent 95% d'un message en vidéo vs 10% en texte.`,

  search: `Moteur de recherche interne pour trouver du contenu rapidement. Indispensable sur les sites de +20 pages. 30% des visiteurs utilisent la recherche, et ils convertissent 4x mieux car ils sont plus engagés. Sans recherche sur un gros site = frustration.`,

  // User Area
  "user-login": `Espace client sécurisé avec login/mot de passe. Les clients peuvent consulter leurs documents, factures, historique. Réduit les demandes d'informations de 60%. Fidélise les clients qui ont "leur espace". Obligatoire pour tout service récurrent.`,

  "user-dashboard": `Tableau de bord personnalisé pour chaque client montrant son historique, ses documents, ses stats. Interface intuitive avec graphiques. Améliore l'expérience client et réduit le support. Utilisé par toutes les grandes plateformes (Amazon, Netflix, etc).`,

  // International
  "monolingual-fr": `Site entièrement en français sans traduction. Simple et économique si vous ne ciblez que le marché francophone (France, Belgique francophone, Suisse romande, Québec). Pas besoin de gérer plusieurs langues ni de dupliquer votre contenu.`,

  "multi-language-2": `Site disponible en 2 langues avec détection automatique selon la localisation du visiteur. Les utilisateurs peuvent basculer entre les langues via un sélecteur. Idéal pour cibler la Belgique (FR/NL) ou l'international (FR/EN). Augmente votre portée de 50% à 100%. Chaque page doit être traduite.`,

  "multi-language-3": `Site en 3 langues (FR/NL/EN) qui détecte automatiquement la langue du visiteur selon sa localisation géographique. Parfait pour cibler la Belgique et l'international. Couvre 90% du marché européen. Chaque page existe en 3 versions traduites.`,

  "multi-language-4plus": `Site multilingue 4+ langues pour rayonnement international maximal. Chaque langue a son propre domaine ou sous-domaine pour le SEO. Détection géolocalisée + sélecteur manuel. Nécessite traduction professionnelle de tout le contenu. Pour entreprises exportatrices ou multinationales.`,

  // SEO
  "seo-basic": `Optimisation de base pour être trouvé sur Google : titres de pages optimisés (meta titles), descriptions courtes (meta descriptions), URLs propres (/services/web au lieu de /page?id=123), sitemap XML pour Google. C'est le minimum pour apparaître dans les résultats de recherche. Sans SEO, votre site est invisible sur Google.`,

  "seo-advanced": `SEO professionnel avec données structurées (Schema.org) pour apparaître dans les résultats enrichis de Google (étoiles, prix, FAQ, breadcrumbs). Optimisation OpenGraph pour un bel aperçu sur Facebook/LinkedIn. Twitter Cards pour Twitter. Améliore votre taux de clic de 30%. Google préfère les sites bien structurés.`,

  "seo-expert": `Audit SEO complet par expert : analyse concurrence, recherche de 50+ mots-clés pertinents, stratégie de contenu sur mesure, recommandations techniques. Création de contenu optimisé. Pour entreprises visant le top 3 Google sur leurs mots-clés. ROI très élevé sur le long terme.`,

  "seo-local": `Optimisation pour les recherches locales type "plombier Bruxelles" "restaurant Liège". Configuration de votre profil Google Business, optimisation pour Google Maps, gestion des avis clients, NAP consistency. Essentiel si vous avez une présence physique ou ciblez une zone géographique précise. 46% des recherches Google sont locales.`,

  "seo-technical": `Optimisation technique poussée : vitesse de chargement maximale, Core Web Vitals (critères Google), fichier robots.txt optimisé, sitemap avancé, gestion erreurs 404, redirections 301, canonical tags. Google favorise les sites rapides dans son classement. Un site lent peut perdre 50% de ses visiteurs (1 seconde de délai = -7% conversions).`,

  "seo-content-optimization": `Réécriture professionnelle de vos textes pour le SEO : densité de mots-clés optimale, balises H1/H2/H3 structurées, maillage interne (liens entre vos pages), images optimisées avec alt text. Améliore le positionnement de 50-200 positions selon la concurrence.`,

  "seo-breadcrumbs": `Fil d'Ariane (Accueil > Services > Développement Web) afin que les visiteurs sachent où ils sont. Améliore l'UX et le SEO (Google affiche les breadcrumbs dans les résultats). Réduit le taux de rebond de 20%. Obligatoire sur les sites de +10 pages.`,

  "seo-redirections": `Gestion professionnelle des redirections 301 pour éviter les erreurs 404 et le contenu dupliqué. Important lors d'une refonte ou changement d'URLs. Préserve votre référencement existant. Google pénalise les sites avec beaucoup d'erreurs 404.`,

  "seo-blog-strategy": `Stratégie de blog SEO complète : calendrier éditorial de 12 mois, recherche de mots-clés longue traîne, optimisation de chaque article, internal linking. Objectif: attirer du trafic organique qualifié. Les entreprises qui bloguent obtiennent 67% de leads en plus.`,

  "seo-competitive-analysis": `Analyse approfondie de vos 5 principaux concurrents : leurs mots-clés, backlinks, stratégie de contenu, points faibles. Identification d'opportunités non exploitées. Permet de savoir exactement quoi faire pour les dépasser. Gain de temps énorme (évite de copier ce qui ne marche pas).`,

  "seo-international": `SEO international avec balises hreflang pour indiquer à Google quelle version linguistique montrer selon le pays. Évite le contenu dupliqué entre les versions linguistiques. Essentiel si vous visez plusieurs pays (FR, BE, CH, CA ont tous du français mais sont des marchés différents).`,

  // Performance
  "pwa-support": `Progressive Web App : votre site se comporte comme une application mobile. Les clients peuvent l'installer sur leur téléphone (icône sur l'écran d'accueil), l'utiliser hors-ligne, recevoir des notifications push. Plus rapide qu'un site normal (70% plus rapide). Coûte 10x moins cher qu'une vraie app iOS/Android et fonctionne partout.`,

  "performance-optimization": `Optimisation maximale pour un site ultra-rapide : score Lighthouse 95+, images compressées automatiquement (WebP), lazy loading (chargement différé), CDN mondial (serveurs partout). Un site rapide augmente les conversions de 30%. Amazon perd 1% de revenus par 100ms de latence. Google favorise les sites rapides.`,

  "analytics-setup": `Configuration professionnelle de Google Analytics 4 + Tag Manager pour suivre TOUT : visiteurs, sources de trafic (Google/Facebook/Direct), conversions, parcours client, pages les plus vues, temps passé, taux de rebond. Tableaux de bord prêts à l'emploi. Sans analytics, vous pilotez à l'aveugle.`,

  // ======================
  // E-COMMERCE
  // ======================

  // Product Management
  "product-variants": `Gestion des variantes : même produit en plusieurs couleurs/tailles/matériaux. Ex: T-shirt rouge M, T-shirt bleu L, etc. Chaque variante a son propre stock et référence (SKU). Essentiel pour la mode, chaussures, meubles. Sans ça, vous devez créer un produit séparé pour chaque couleur/taille (cauchemar à gérer).`,

  "product-reviews": `Système d'avis clients vérifiés avec photos, notation par étoiles, votes "utile/pas utile". Les clients peuvent uniquement laisser un avis après achat (avis vérifiés = crédibles). 95% des acheteurs lisent les avis avant d'acheter. Augmente les ventes de 18-20%. Amazon et tous les grands sites l'utilisent.`,

  wishlist: `Liste de souhaits où les clients sauvent leurs produits favoris pour plus tard. Email automatique si le prix baisse ou le produit va être en rupture. Fidélise les clients (ils reviennent), permet de voir quels produits intéressent le plus (analytics). Augmente les ventes de 20%.`,

  // Payment
  "payment-stripe": `Plateforme de paiement complète acceptant toutes les cartes bancaires (Visa, Mastercard, Amex) + Apple Pay et Google Pay pour paiement en 1 clic sur mobile + SEPA (virement européen). Paiement sécurisé 3D Secure obligatoire en Europe. Stripe prend 1.5% de commission + 0.25€ par transaction. Solution la plus populaire et fiable, utilisée par Amazon, Shopify, etc.`,

  "payment-mollie": `Spécialiste des méthodes de paiement locales belges et néerlandaises : Bancontact (utilisé par 90% des Belges), iDEAL (Pays-Bas), Sofort (Allemagne). Essentiel si vous vendez en Belgique/NL. Commission similaire à Stripe (~1.5%) mais meilleure acceptation locale. 30% des Belges abandonnent si pas de Bancontact.`,

  "payment-paypal": `PayPal : portefeuille électronique utilisé par 400M de personnes. Permet de payer sans créer de compte (PayPal Express) ou avec compte PayPal. Rassurant pour beaucoup d'acheteurs (protection acheteur). Augmente les conversions de 15%. Commission ~2.5% (plus cher que Stripe mais certains clients ne jurent que par PayPal).`,

  "payment-klarna": `Option "Achetez maintenant, payez plus tard" très populaire qui permet au client d'acheter maintenant et de payer en 3x ou 4x sans frais (pour le client). Intégré dans Stripe. Augmente le panier moyen de 20-40% car les clients achètent plus facilement. Klarna prend le risque de non-paiement (vous êtes payé immédiatement).`,

  // Stock
  "stock-management": `Suivi du stock en temps réel pour chaque produit et variante. Alertes automatiques quand le stock est bas. Empêche la survente (vendre un produit en rupture). Affiche "Plus que 3 en stock !" pour créer l'urgence. Synchronisation avec vos entrepôts/fournisseurs. Essentiel pour éviter les déceptions clients et les remboursements.`,

  // B2C
  "b2c-loyalty-program": `Programme de fidélité qui récompense vos clients : 1€ dépensé = X points. Les points donnent des réductions, cadeaux, livraison gratuite. Paliers VIP (Bronze/Argent/Or) avec avantages croissants. Augmente le taux de clients réguliers de 40% et le panier moyen de 15%. Starbucks et Sephora l'utilisent avec énorme succès.`,

  "b2c-gift-cards": `Cartes cadeaux numériques que vos clients peuvent acheter et offrir. Reçues par email avec code unique utilisable sur votre site. 20% ne sont jamais utilisées (argent gratuit pour vous). Augmente les ventes de 50% en décembre. Parfait pour Noël, anniversaires, fêtes des mères. Les bénéficiaires dépensent souvent plus que la valeur de la carte.`,

  "b2c-subscription-box": `Abonnement mensuel avec paiement automatique. Ex: box beauté mensuelle, café tous les mois, snacks healthy. Paiement récurrent automatique, client peut annuler quand il veut. Revenu prévisible et fidélisation maximale. Modèle utilisé par Netflix, Spotify, Dollar Shave Club avec succès fou. LTV (lifetime value) client x10.`,

  // Performance
  "pwa-support": `Progressive Web App : votre site e-commerce se comporte comme une application mobile. Les clients peuvent l'installer sur leur téléphone, l'utiliser hors-ligne (consulter le catalogue dans le métro), recevoir des notifications push pour les promotions. Plus rapide qu'un site normal. Coûte 10x moins cher qu'une app iOS/Android native.`,

  "performance-optimization": `Optimisation maximale pour un site ultra-rapide : score Lighthouse 95+, images compressées automatiquement, chargement différé, CDN mondial. Un site e-commerce rapide augmente les conversions de 30%. Amazon perd 1% de revenus par 100ms de latence. Chaque seconde de délai = -7% de conversions. La vitesse est CRITIQUE en e-commerce.`,

  "analytics-setup": `Configuration professionnelle de Google Analytics 4 + Tag Manager pour suivre tout : visiteurs, sources de trafic, conversions, parcours client, produits consultés, panier abandonné, taux de conversion par source. Tableaux de bord e-commerce prêts à l'emploi. Permet de savoir quels produits/canaux marchent. Sans analytics = pilotage à l'aveugle.`,

  // ======================
  // CMS / BLOG
  // ======================

  "design-style-modern": `Design minimaliste et contemporain avec beaucoup d'espaces blancs, typographie sans-serif moderne (Inter, Roboto, Helvetica), animations douces, interface épurée. Inspiré des sites tech comme Apple, Stripe, Airbnb. Convient parfaitement aux startups, entreprises tech, services digitaux, SaaS. Look professionnel et actuel.`,

  "design-style-classic": `Design professionnel traditionnel avec structure formelle, polices serif élégantes (Georgia, Playfair, Times), mise en page équilibrée et hiérarchisée. Inspiré des sites institutionnels, banques, cabinets d'avocats, notaires. Convient aux professions libérales, institutions, services B2B traditionnels. Inspire confiance et sérieux.`,

  "design-style-creative": `Design audacieux et original avec couleurs vibrantes, animations dynamiques, mises en page asymétriques et surprenantes. Inspiré des sites d'agences créatives, artistes, photographes, marques lifestyle. Attire l'attention et se démarque mais peut être moins sobre. Convient aux créatifs, mode, culture, art, événementiel.`,

  "design-style-corporate": `Design entreprise sobre et rassurant avec couleurs neutres (bleu, gris, blanc), mise en page structurée et claire, hiérarchie visuelle évidente. Inspire confiance et professionnalisme. Convient aux PME, services B2B, consultants, industrie, finance. C'est le choix le plus sûr et polyvalent - fonctionne pour 80% des cas.`,
};

// Function to add explanation to a feature
function addExplanation(featureId, explanation) {
  const regex = new RegExp(
    `(\\{\\s*id:\\s*["']${featureId}["'],\\s*name:[^}]+?description:\\s*["'][^"']*["'])`,
    "s",
  );

  const match = content.match(regex);
  if (!match) {
    return false;
  }

  // Check if explanation already exists
  if (
    content.includes(`id: "${featureId}",`) &&
    content.includes(`explanation:`)
  ) {
    const featureStart = content.indexOf(`id: "${featureId}",`);
    const featureEnd = content.indexOf("},", featureStart);
    const featureBlock = content.substring(featureStart, featureEnd);
    if (featureBlock.includes("explanation:")) {
      return false;
    }
  }

  // Add explanation field after description
  content = content.replace(
    regex,
    `$1,\n      explanation: \`${explanation}\``,
  );

  return true;
}

// Add all explanations
let added = 0;
let skipped = 0;

for (const [featureId, explanation] of Object.entries(explanations)) {
  if (addExplanation(featureId, explanation)) {
    added++;
    console.log(`✓ Added explanation for ${featureId}`);
  } else {
    skipped++;
  }
}

// Write updated content
fs.writeFileSync(featuresPath, content, "utf8");

console.log(`\n✓ Done! Added ${added} explanations, skipped ${skipped}`);
console.log(
  `Total explanations in file: ${content.match(/explanation:/g)?.length || 0}`,
);
