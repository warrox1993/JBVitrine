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

// Explanations dictionary - covering different audiences
const explanations = {
  // Site Vitrine - International
  "monolingual-fr": `Site entièrement en français sans traduction. Simple et économique si vous ne ciblez que le marché francophone. Pas besoin de gérer plusieurs langues ni de dupliquer votre contenu.`,

  "multi-language-2": `Site disponible en 2 langues avec détection automatique selon la localisation du visiteur. Les utilisateurs peuvent basculer entre les langues via un sélecteur. Idéal pour cibler la Belgique (FR/NL) ou l'international (FR/EN). Augmente votre portée de 50% à 100%.`,

  "multi-language-3": `Site en 3 langues (FR/NL/EN) qui détecte automatiquement la langue du visiteur selon sa localisation géographique. Parfait pour cibler la Belgique et l'international. Chaque page existe en 3 versions traduites.`,

  // Site Vitrine - SEO
  "seo-basic": `Optimisation de base pour être trouvé sur Google : titres de pages optimisés, descriptions courtes, URLs propres, sitemap XML pour Google. C'est le minimum syndical pour apparaître dans les résultats de recherche. Sans SEO, votre site est invisible sur Google.`,

  "seo-advanced": `SEO professionnel avec données structurées (Schema.org) pour apparaître dans les résultats enrichis de Google (étoiles, prix, FAQ). Optimisation OpenGraph pour un bel aperçu sur Facebook/LinkedIn. Twitter Cards pour Twitter. Améliore votre taux de clic de 30%.`,

  "seo-local": `Optimisation pour les recherches locales type "plombier Bruxelles". Configuration de votre profil Google Business, optimisation pour Google Maps, gestion des avis clients. Essentiel si vous avez une présence physique ou ciblez une zone géographique précise.`,

  "seo-technical": `Optimisation technique poussée : vitesse de chargement maximale, Core Web Vitals (critères Google), fichier robots.txt optimisé. Google favorise les sites rapides dans son classement. Un site lent peut perdre 50% de ses visiteurs.`,

  // E-commerce - Payment
  "payment-stripe": `Plateforme de paiement complète acceptant toutes les cartes bancaires (Visa, Mastercard, Amex) + Apple Pay et Google Pay pour paiement en 1 clic sur mobile. Paiement sécurisé 3D Secure obligatoire en Europe. Stripe prend 1.5% de commission + 0.25€ par transaction. C'est la solution la plus populaire et fiable.`,

  "payment-mollie": `Spécialiste des méthodes de paiement locales belges et néerlandaises : Bancontact (90% des Belges), iDEAL (Pays-Bas), Sofort. Essentiel si vous vendez en Belgique. Commission similaire à Stripe mais meilleure acceptation locale.`,

  "payment-klarna": `Option "Paiez plus tard" très populaire qui permet au client d'acheter maintenant et de payer en 3x ou 4x sans frais. Intégré dans Stripe. Augmente le panier moyen de 20-40% car les clients achètent plus facilement. Klarna prend le risque de non-paiement.`,

  // E-commerce - Product Management
  "product-variants": `Gestion des variantes : même produit en plusieurs couleurs/tailles/matériaux. Ex: T-shirt rouge M, T-shirt bleu L, etc. Chaque variante a son propre stock et référence (SKU). Essentiel pour la mode, chaussures, etc. Sans ça, vous devez créer un produit séparé pour chaque couleur.`,

  "product-reviews": `Système d'avis clients vérifiés avec photos, notation par étoiles, votes "utile/pas utile". Les clients peuvent uniquement laisser un avis après achat (avis vérifiés). 95% des acheteurs lisent les avis avant d'acheter. Augmente les ventes de 20%.`,

  "advanced-product-filters": `Filtres avancés pour permettre aux clients de trouver facilement ce qu'ils cherchent : filtrer par prix, couleur, taille, marque, note, etc. Résultats instantanés sans recharger la page. Réduit de 50% le temps de recherche et augmente les conversions.`,

  // E-commerce - Stock
  "stock-management": `Suivi du stock en temps réel pour chaque produit et variante. Alertes automatiques quand le stock est bas. Empêche la survente (vendre un produit en rupture). Affiche "Plus que 3 en stock" pour créer l'urgence. Essentiel pour éviter les déceptions clients.`,

  "multi-warehouse": `Gestion de plusieurs entrepôts/magasins avec stocks séparés. Le système attribue automatiquement la commande à l'entrepôt le plus proche du client pour réduire les délais. Parfait si vous avez plusieurs points de stockage.`,

  backorder: `Permet aux clients de commander un produit en rupture et d'être livré automatiquement dès réception du stock. Évite de perdre des ventes pendant les ruptures. Le client paie maintenant, est livré plus tard avec date estimée.`,

  // E-commerce - B2C
  "b2c-loyalty-program": `Programme de fidélité qui récompense vos clients : 1€ dépensé = X points. Les points donnent des réductions, cadeaux, livraison gratuite. Paliers VIP (Bronze/Argent/Or) avec avantages croissants. Augmente le taux de clients réguliers de 40%. Starbucks et Sephora l'utilisent avec succès.`,

  "b2c-gift-cards": `Cartes cadeaux numériques que vos clients peuvent acheter et offrir. Reçues par email avec code unique. Utilisables comme moyen de paiement sur votre site. 20% ne sont jamais utilisées (argent gratuit pour vous). Parfait pour Noël et anniversaires.`,

  "b2c-subscription-box": `Abonnement mensuel avec paiement automatique. Ex: box beauté mensuelle, café tous les mois, etc. Paiement récurrent automatique, client peut annuler quand il veut. Revenu prévisible et fidélisation maximale. Modèle utilisé par Netflix, Spotify, Dollar Shave Club.`,

  // E-commerce - Performance
  "pwa-support": `Progressive Web App : votre site se comporte comme une application mobile. Les clients peuvent l'installer sur leur téléphone, l'utiliser hors-ligne, recevoir des notifications push. Plus rapide qu'un site normal. Coûte 10x moins cher qu'une vraie app iOS/Android.`,

  "performance-optimization": `Optimisation maximale pour un site ultra-rapide : score Lighthouse 95+, images compressées automatiquement, chargement différé, CDN mondial. Un site rapide augmente les conversions de 30%. Amazon perd 1% de revenus par 100ms de latence.`,

  "analytics-setup": `Configuration professionnelle de Google Analytics 4 + Tag Manager pour suivre tout : visiteurs, sources de trafic, conversions, parcours client, produits consultés. Tableaux de bord prêts à l'emploi. Sans analytics, vous pilotez à l'aveugle.`,

  // CMS - Design preferences
  "design-style-modern": `Design minimaliste et contemporain avec beaucoup d'espaces blancs, typographie sans-serif moderne (Helvetica, Inter), animations douces. Inspiré des sites tech comme Apple, Stripe, Airbnb. Convient aux startups, tech, services digitaux.`,

  "design-style-classic": `Design professionnel traditionnel avec structure formelle, polices serif (Times, Georgia), mise en page équilibrée. Inspiré des sites institutionnels, banques, cabinets d'avocats. Convient aux professions libérales, institutions, services B2B traditionnels.`,

  "design-style-creative": `Design audacieux et original avec couleurs vibrantes, animations dynamiques, mises en page asymétriques. Inspiré des sites d'agences créatives, artistes, marques lifestyle. Attire l'attention mais peut être moins sobre. Convient aux créatifs, mode, culture.`,

  "design-style-corporate": `Design entreprise sobre et rassurant avec couleurs neutres (bleu, gris), mise en page structurée et claire. Inspire confiance et professionnalisme. Convient aux PME, services B2B, consultants. C'est le choix le plus sûr et polyvalent.`,
};

// Function to add explanation to a feature
function addExplanation(featureId, explanation) {
  // Match the feature block
  const regex = new RegExp(
    `(\\{\\s*id:\\s*["']${featureId}["'],\\s*name:[^}]+?description:\\s*["'][^"']*["'])`,
    "s",
  );

  const match = content.match(regex);
  if (!match) {
    console.log(`⚠ Feature ${featureId} not found`);
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
      console.log(`ℹ Feature ${featureId} already has explanation`);
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
