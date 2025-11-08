const fs = require("fs");

// Batch finale massive d'explications
const explanations = {
  // Project types
  siteVitrine: `Site vitrine professionnel moderne pour présenter votre activité en ligne. **C'est quoi ?** Un site web classique (non e-commerce) pour montrer vos services, réalisations et vous faire connaître. **Pourquoi ?** Crédibilité instantanée (70% des clients vérifient votre site avant contact), disponible 24/7, et coûte 10x moins cher qu'un local commercial tout en touchant bien plus de monde. Indispensable en 2024.`,

  ecommerce: `Boutique en ligne professionnelle avec paiement sécurisé et gestion de stock. **C'est quoi ?** Site e-commerce complet pour vendre vos produits en ligne. **Pourquoi ?** Le e-commerce croît de 15%/an, vos concurrents vendent déjà en ligne, et vous touchez toute la Belgique/Europe sans ouvrir de boutiques physiques. COVID a prouvé qu'il faut vendre en ligne. ROI souvent <12 mois.`,

  appWeb: `Application web sur mesure (SaaS, plateforme, outil métier). **C'est quoi ?** Logiciel web personnalisé pour vos besoins spécifiques (pas un site vitrine ni e-commerce standard). **Pourquoi ?** Aucun logiciel du marché ne fait exactement ce dont vous avez besoin, vous voulez un avantage concurrentiel unique, ou vous lancez votre propre SaaS. Investissement lourd mais potentiel énorme. Uber, Airbnb ont commencé comme ça.`,

  // Missing catalog sizes
  "products-2000+": `Mega catalogue de 2000+ produits pour marketplace ou gros distributeur. **C'est quoi ?** E-commerce enterprise avec architecture scalable. **Pourquoi ?** Infrastructure cloud auto-scaling, CDN mondial, recherche IA avancée. Import/export massif automatisé. Équipe tech dédiée (5-10 personnes minimum). Potentiel CA multi-millions. Vous jouez dans la cour des grands.`,

  "compare-products": `Comparateur de produits permettant la comparaison côte-à-côte de caractéristiques. **C'est quoi ?** Outil pour comparer jusqu'à 3-4 produits en un tableau. **Pourquoi ?** Facilite la décision pour produits techniques (électronique, informatique, électroménager), réduit les retours (bon choix dès le départ), et augmente conversion de 12%. Obligatoire en B2B et hightech.`,

  // Shipping advanced
  "shipping-calculation": `Calcul automatique des frais de port selon poids/dimension/destination. **C'est quoi ?** Algorithme calculant les frais exacts selon le panier et l'adresse. **Pourquoi ?** Précision (vous ne perdez pas d'argent), transparence client, et gestion de produits variés. Alternative aux transporteurs API si vous gérez vous-même la logistique.`,

  "shipping-zones": `Zones de livraison personnalisées avec tarifs différenciés (Belgique/Europe/Monde). **C'est quoi ?** Définition de zones géographiques avec prix de port spécifiques. **Pourquoi ?** Flexibilité totale (Belgique 5€, UE 12€, Hors UE 25€), rentabilité préservée, et simplicité pour le client. Standard pour tout e-commerce international.`,

  "shipping-carrier-integration": `Intégration directe transporteurs : génération étiquettes, suivi automatique, pickup scheduling. **C'est quoi ?** Connexion profonde avec Bpost/DPD/UPS pour tout automatiser. **Pourquoi ?** Gain de temps énorme (étiquettes automatiques), erreurs minimisées, suivi client automatique, et tarifs négociés. Indispensable dès 50 colis/semaine. ROI immédiat.`,

  "order-tracking": `Tracking de commande en temps réel avec notifications automatiques à chaque étape. **C'est quoi ?** Page de suivi montrant l'état exact de la commande (préparation > expédition > livraison). **Pourquoi ?** Réduit les demandes SAV de 60% ("où est ma commande?"), améliore satisfaction client, et réduit l'anxiété post-achat. Amazon a éduqué les clients à ça.`,

  "click-collect": `Click & Collect : commande en ligne, retrait en magasin gratuit. **C'est quoi ?** Service de retrait en boutique physique. **Pourquoi ?** Économise les frais de port, augmente trafic magasin (+40% achats additionnels), réduit retours, et séduit 45% des acheteurs qui préfèrent récupérer directement.`,

  "shipping-free-threshold": `Livraison gratuite au-dessus d'un montant seuil (ex: gratuit dès 50€). **C'est quoi ?** Frais de port offerts si panier dépasse un montant défini. **Pourquoi ?** Augmente le panier moyen de 30% (clients ajoutent produits pour atteindre le seuil), améliore conversion (+20%), et compensez les frais via le volume. 90% des e-commerces utilisent cette tactique.`,

  "delivery-date-picker": `Sélecteur de date de livraison permettant au client de choisir quand recevoir. **C'est quoi ?** Calendrier interactif pour choisir le jour de livraison souhaité. **Pourquoi ?** Améliore UX (+20% satisfaction), réduit livraisons ratées (client est là), et différencie (service premium). Essentiel pour gros achats (meubles, électroménager) ou frais (fleurs, alimentaire).`,

  // Promotions
  "promo-codes": `Codes promotionnels avec règles avancées (montant/pourcentage/catégorie/client). **C'est quoi ?** Système de bons de réduction avec conditions personnalisables. **Pourquoi ?** Acquisition (offrez -10% aux nouveaux), fidélisation (code VIP pour clients fidèles), partenariats (codes influenceurs), et réactivation (win-back). Black Friday impossible sans codes promo. Tracez ROI par code.`,

  "bulk-discounts": `Remises par quantité automatiques (achetez 3, payez 2 ou -10% dès 5 unités). **C'est quoi ?** Prix dégressifs selon quantité achetée. **Pourquoi ?** Augmente panier moyen de 25-40% (incitation volume), déstockage rapide, et attire B2B (gros volumes). Costco base son modèle sur ça. Configuration simple, impact énorme.`,

  "loyalty-program": `Programme de fidélité complet avec points, niveaux et récompenses. **C'est quoi ?** Système de fidélisation multi-facettes (points + avantages exclusifs). **Pourquoi ?** Clients fidèles dépensent 67% de plus, coût acquisition 5x moindre que nouveaux clients, et CLV multipliée par 3-5. Sephora génère 80% de son CA via son programme fidélité. Investissement rentabilisé en 6-12 mois.`,

  "abandoned-cart": `Emails automatiques de récupération de paniers abandonnés avec code promo incitatif. **C'est quoi ?** Relances automatiques aux abandons de panier. **Pourquoi ?** 70% de paniers abandonnés. Email bien fait en récupère 10-15% = +7-10% CA immédiat. ROI de 4000%. Sequence type : email 1h après (+5% code), rappel 24h, dernier rappel 72h.`,

  "cross-sell-upsell": `Cross-sell et up-sell intelligents : "Souvent achetés ensemble" + "Upgrade disponible". **C'est quoi ?** Suggestions produits complémentaires et supérieurs durant l'achat. **Pourquoi ?** Cross-sell +15-30% panier (frites avec burger), up-sell +10-20% marge (modèle supérieur pour 20€ de plus). Amazon fait 35% de son CA ainsi. Algorithmes simples = gros gains.`,

  // Checkout
  "one-page-checkout": `Checkout une page : toutes les étapes visibles sur un seul écran. **C'est quoi ?** Processus d'achat condensé sur une page unique. **Pourquoi ?** Réduit abandons de 20-30% (moins de clics = moins de friction), augmente conversions mobiles, et accélère achat impulsif. Recommandé pour paniers <3 produits. Amazon a popularisé le one-click.`,

  "order-returns": `Système de retours en ligne : demande, impression étiquette, suivi, remboursement automatique. **C'est quoi ?** Portail self-service pour gérer les retours clients. **Pourquoi ?** Réduit SAV de 50% (client autonome), améliore satisfaction (processus simple = +30% NPS), et obligatoire légalement (14 jours rétractation UE). Zalando a fait des retours gratuits un avantage concurrentiel.`,

  "order-invoices": `Génération automatique de factures PDF conformes, envoi email, et archivage légal. **C'est quoi ?** Système de facturation automatique à chaque commande. **Pourquoi ?** OBLIGATION LÉGALE, gain de temps énorme (zéro saisie manuelle), conformité comptable, et image pro. B2B impossible sans vraies factures. Archivage 10 ans automatique.`,

  "live-chat": `Chat en direct pour support client instantané avec agent ou chatbot. **C'est quoi ?** Widget de discussion en temps réel. **Pourquoi ?** +45% conversions (questions résolues immédiatement), +40% satisfaction client, et 79% préfèrent chat vs téléphone. Intercom, Crisp, Tidio. Un agent peut gérer 5 conversations en parallèle vs 1 au téléphone.`,

  // B2C Features
  "b2c-product-personalization": `Personnalisation produit : texte gravé, choix de matériaux/couleurs, configurateur 3D. **C'est quoi ?** Clients personnalisent le produit avant achat. **Pourquoi ?** Prix premium +30-50% (personnalisation = valeur perçue élevée), différenciation totale, et zéro retour (produit unique). NIKEiD génère des millions. Parfait pour cadeaux, bijoux, textile.`,

  "b2c-gift-wrapping": `Option emballage cadeau avec carte personnalisée et envoi direct au destinataire. **C'est quoi ?** Service d'emballage cadeau payant (+3-5€). **Pourquoi ?** Marge additionnelle pure (coût emballage 0,50€, vente 3-5€), augmente panier moyen, et boost période fêtes (+60% CA décembre). 40% des achats e-commerce sont des cadeaux.`,

  "b2c-gift-registry": `Liste de naissance/mariage : invités achètent depuis la liste, mariés reçoivent tout. **C'est quoi ?** Registre de cadeaux en ligne façon Amazon Wedding Registry. **Pourquoi ?** Acquisition massive (tous les invités découvrent votre site), panier moyen élevé (cadeaux généreux), et fidélisation (couple revient). Crée buzz social. Parfait pour déco, cuisine, bébé.`,

  "b2c-virtual-try-on": `Essayage virtuel via réalité augmentée (lunettes, maquillage, vêtements). **C'est quoi ?** IA qui simule le produit sur une photo du client. **Pourquoi ?** Réduit retours de 35% (bon choix dès le départ), effet wow (partages sociaux), et +50% conversion. Warby Parker, Sephora, IKEA l'ont généralisé. Technologies accessibles (Snap AR, Banuba).`,

  "b2c-size-guide": `Guide des tailles interactif avec mesures et recommandations personnalisées. **C'est quoi ?** Outil aidant à choisir la bonne taille via questions/mesures. **Pourquoi ?** Réduit retours de 25% (principale raison = mauvaise taille), améliore satisfaction, et augmente conversion (+15%). Obligatoire en mode/chaussures. Algorithmes prédictifs très efficaces.`,

  // B2B Features
  "b2b-pricing": `Tarifs B2B différenciés : grilles de prix par client/segment avec remises progressives. **C'est quoi ?** Chaque client pro a ses propres prix négociés. **Pourquoi ?** Standard B2B (impossible de facturer le même prix à tous), gestion des contrats cadres, et flexibilité commerciale totale. Cachez les prix aux visiteurs non connectés. Intégration ERP recommandée.`,

  "b2b-quotes": `Système de devis B2B : demande, génération PDF, négociation, conversion en commande. **C'est quoi ?** Workflow complet de gestion des devis professionnels. **Pourquoi ?** Process B2B standard (peu d'achat direct, tout passe par devis), suivi commercial, historique, et conversion tracking. Évite emails interminables. CRM intégré = dream.`,

  "b2b-quick-order": `Commande rapide B2B : saisie CSV, scan codes-barres, réapprovisionnement auto. **C'est quoi ?** Interface de commande optimisée pour achats récurrents. **Pourquoi ?** Clients B2B commandent souvent les mêmes produits. Quick order réduit friction de 90%, fidélise (trop facile de commander chez vous pour aller ailleurs), et volume +40%. Essayer c'est l'adopter.`,

  // Multi-everything
  "multi-currency": `Support multi-devises avec conversion automatique et paiement dans la devise choisie. **C'est quoi ?** Site affiche prix dans plusieurs devises (EUR/USD/GBP). **Pourquoi ?** Vente internationale facilitée (+25% conversions hors zone euro), prix psychologique optimisé (19.99$ vs 18€), et crédibilité pro. Taux de change mis à jour quotidiennement. Stripe gère ça nativement.`,

  "multi-language-shop": `E-commerce multilingue avec traductions produits, checkout et emails. **C'est quoi ?** Toute la boutique traduite en plusieurs langues. **Pourquoi ?** 75% des clients préfèrent acheter dans leur langue. Traduction = +40% conversion. Si vous vendez en UE, le multilingue est quasi obligatoire. Attention : traduction auto (Google) = amateur. Vraies traductions nécessaires.`,

  "tax-management": `Gestion automatique de la TVA : taux par pays/catégorie, B2B reverse-charge, exonérations. **C'est quoi ?** Système calculant la TVA correcte selon règles complexes UE. **Pourquoi ?** OBLIGATION LÉGALE : TVA 21% BE, 19% DE, 20% FR, etc. B2B intracommunautaire = autoliquidation. Erreur = redressement fiscal. Un module dédié évite cauchemars. Stripe Tax recommandé.`,

  "gdpr-compliance": `Conformité RGPD complète : consentement, politique de confidentialité, droit à l'oubli, registre. **C'est quoi ?** Respect des règles RGPD européennes. **Pourquoi ?** OBLIGATION LÉGALE : amendes jusqu'à 20M€ ou 4% CA. Banner cookies, politique claire, export/suppression données. Indispensable. Cookiebot, Axeptio pour la partie cookies.`,

  // Integrations
  "erp-integration": `Intégration ERP (SAP, Odoo, Sage) : sync bidirectionnelle produits, stocks, commandes. **C'est quoi ?** Connexion entre e-commerce et votre logiciel de gestion. **Pourquoi ?** UNE source de vérité (stock réel), zéro double saisie, erreurs éliminées, et scalabilité. Indispensable dès 100 commandes/mois. Investissement rentabilisé en 3-6 mois (temps gagné).`,

  "accounting-integration": `Intégration comptabilité (Yuki, Exact, Pennylane) : factures, paiements, TVA automatiques. **C'est quoi ?** Lien direct avec votre logiciel comptable. **Pourquoi ?** Votre comptable vous aime (+50%), clôtures mensuelles 10x plus rapides, et zéro erreur de saisie. Obligations fiscales respectées automatiquement. Indispensable en B2B.`,

  "google-merchant": `Google Merchant Center : flux produits automatique pour Google Shopping (gratuit). **C'est quoi ?** Export automatique de vos produits vers Google Shopping. **Pourquoi ?** Trafic qualifié GRATUIT (Google Shopping Free Listings depuis 2020). 60% des recherches produits commencent sur Google. ROI infini (gratuit). Seuls 20% des e-commerçants l'ont fait = opportunité.`,

  "facebook-catalog": `Catalogue Facebook/Instagram : vente directe via Facebook Shops et Instagram Shopping. **C'est quoi ?** Vos produits vendables directement sur Facebook/Instagram. **Pourquoi ?** 1,3 milliards d'utilisateurs Instagram Shopping, checkout natif (client n'a plus besoin de quitter l'app), et reach énorme. 44% de découverte produit se fait sur Instagram. Intégration = 30min, ROI = permanent.`,

  "marketplace-sync": `Synchronisation marketplaces : Bol.com, Amazon, eBay (produits, stocks, commandes). **C'est quoi ?** Gestion centralisée de tous vos canaux de vente. **Pourquoi ?** Vendez partout sans gérer 5 interfaces, stock synchronisé en temps réel (pas de survente), et commandes centralisées. Amazon = 50% du e-commerce, Bol.com = leader Benelux. Impossible de les ignorer.`,

  // Auth Features
  "auth-basic": `Authentification basique : email/mot de passe avec validation et récupération. **C'est quoi ?** Système de connexion standard par email/password. **Pourquoi ?** Contrôle d'accès nécessaire (comptes clients, admin), sécurisé si bien fait (bcrypt), et attendu par utilisateurs. Le minimum pour tout site avec comptes.`,

  "auth-social": `Connexion sociale : "Se connecter avec Google/Facebook/Apple". **C'est quoi ?** Login via comptes sociaux existants. **Pourquoi ?** +20% conversions signup (zéro formulaire à remplir), moins d'abandons, et données enrichies (photo, nom). 77% préfèrent social login vs créer nouveau compte. Google OAuth le plus utilisé.`,

  "auth-2fa": `Authentification à deux facteurs via SMS, app (Google Authenticator) ou email. **C'est quoi ?** Double vérification lors de la connexion. **Pourquoi ?** 99,9% des hacks bloqués par 2FA. Protection comptes sensibles (admin, clients VIP). Rassurant pour B2B. Norme de sécurité 2024. Optionnel pour clients, obligatoire pour admins.`,

  "auth-sso": `Single Sign-On : connexion unique partagée entre plusieurs applications de votre écosystème. **C'est quoi ?** Un seul login pour accéder à tous vos services. **Pourquoi ?** UX fluide (connexion une fois = accès partout), sécurité centralisée, et gestion simplifiée. Nécessaire si vous avez site + app mobile + backoffice. Google Workspace, Office 365 le font.`,

  "auth-ldap": `Intégration LDAP/Active Directory : connexion via annuaire d'entreprise. **C'est quoi ?** Authentification via serveur LDAP corporate. **Pourquoi ?** Obligatoire pour vente en B2B aux grands comptes (IT policy stricte). Employés utilisent leurs identifiants habituels. Sécurité IT satisfaite. Deal-breaker pour enterprise sales.`,

  "auth-magic-link": `Magic Link : connexion sans mot de passe via lien email. **C'est quoi ?** Clic sur lien reçu par email = connecté, zéro password. **Pourquoi ?** UX parfaite (pas de password oublié), sécurité élevée (lien unique temporaire), et tendance 2024 (Slack, Medium l'utilisent). Conversion +15% vs password classique.`,

  // User Management
  "user-profiles": `Profils utilisateurs complets : photo, bio, préférences, historique, documents. **C'est quoi ?** Page de profil riche pour chaque utilisateur. **Pourquoi ?** Personnalisation expérience, historique accessible, fidélisation (investissement client dans son profil), et communauté (si aspect social). LinkedIn, GitHub basent tout là-dessus.`,

  "user-roles": `Système de rôles granulaire : Admin, Manager, Editor, Viewer avec permissions custom. **C'est quoi ?** Gestion fine des droits d'accès selon rôle. **Pourquoi ?** Sécurité (stagiaire ≠ CEO), workflows respectés (validation hiérarchique), et responsabilités claires. Indispensable dès 3+ utilisateurs. RBAC (Role-Based Access Control) standard.`,

  // More Web App Features
  "real-time-features": `Fonctionnalités temps réel : chat, notifications, updates live via WebSocket. **C'est quoi ?** Updates instantanées sans refresh (comme Google Docs). **Pourquoi ?** UX moderne attendue, collaboration facilitée (plusieurs utilisateurs simultanés), et engagement +50%. Complexe techniquement mais différenciateur. Slack, Notion, Figma = full real-time.`,

  "file-uploads": `Upload de fichiers avancé : drag & drop, preview, compression, validation, stockage cloud. **C'est quoi ?** Système permettant aux utilisateurs d'uploader documents/images/vidéos. **Pourquoi ?** Nécessaire pour UGC (user-generated content), documents clients, ou contenus riches. Compression auto économise bande passante. S3/Cloudinary pour stockage. Validation = sécurité.`,

  "data-export": `Export de données : CSV, Excel, PDF avec filtres et planification automatique. **C'est quoi ?** Utilisateurs exportent leurs données dans différents formats. **Pourquoi ?** Transparence (RGPD = droit portabilité), intégration avec Excel (tous les managers vivent dans Excel), et reporting. Fonctionnalité attendue en B2B. Exports planifiés = rapports automatiques.`,

  "api-access": `API REST documentée permettant intégrations tierces et développements custom. **C'est quoi ?** Interface programmatique pour accéder à votre plateforme. **Pourquoi ?** Écosystème ouvert (partenaires intègrent), automatisations possibles, et scalabilité. Stripe, Shopify doivent leur succès à leurs APIs excellentes. Documentation = clé adoption.`,
};

// Lire le fichier
const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Compter les ajouts
let addedCount = 0;

// Pour chaque feature ID dans notre mapping
Object.entries(explanations).forEach(([featureId, explanation]) => {
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
