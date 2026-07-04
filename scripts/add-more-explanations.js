const fs = require("fs");

// Deuxième batch d'explications
const explanations = {
  // Missing from first batch
  "pages-20+": `Site corporate complexe de 20+ pages pour grandes entreprises. **C'est quoi ?** Un écosystème web complet avec architecture d'information sophistiquée. **Pourquoi ?** Pour les grands comptes qui ont besoin de présenter de nombreux services, équipes, références, actualités. Renforce l'image de marque et la crédibilité institutionnelle.`,

  "team-members": `Page Équipe présentant vos collaborateurs avec photos, bios et rôles. **C'est quoi ?** Une page dédiée à votre équipe avec photos pro et descriptions. **Pourquoi ?** Humanise votre entreprise (+45% de confiance), rassure les clients B2B qui veulent savoir à qui ils ont affaire, et améliore votre culture d'entreprise (fierté d'équipe). 71% des visiteurs B2B consultent cette page.`,

  "brand-identity": `Charte graphique complète avec logo, palette couleurs, typographies et guidelines (PDF 20+ pages). **C'est quoi ?** Un document définissant votre identité visuelle dans les moindres détails. **Pourquoi ?** Cohérence sur tous supports (web, print, réseaux sociaux), professionnalisme, et guide pour vos prestataires futurs. Les grandes marques ont toutes une charte stricte. Investissement unique qui sert 5-10 ans.`,

  // E-commerce Catalog Sizes
  "products-50-200": `Catalogue moyen de 50 à 200 produits pour PME avec plusieurs catégories. **C'est quoi ?** E-commerce de taille intermédiaire nécessitant une bonne organisation. **Pourquoi ?** Suffisamment varié pour attirer différents segments, mais gérable sans équipe dédiée. Navigation par catégories et filtres devient indispensable. Volume idéal pour tester le marché avant d'investir massivement.`,

  "products-200-500": `Grand catalogue de 200 à 500 produits pour e-commerce établi. **C'est quoi ?** E-commerce mature avec gestion de stock complexe. **Pourquoi ?** Vous êtes un acteur sérieux du marché, besoin d'outils pros (ERP, automatisation), et performance critique. Les clients attendent une expérience fluide malgré le volume. Potentiel CA 100k-500k€/an.`,

  "products-500-2000": `Très grand catalogue de 500 à 2000 produits pour multi-marques ou distributeurs. **C'est quoi ?** E-commerce professionnel avec infrastructure robuste. **Pourquoi ?** Recherche instantanée obligatoire, filtres multicritères, recommandations IA. Intégration ERP/PIM indispensable. Équipe dédiée nécessaire. Potentiel CA 500k-2M€/an. Concurrence directe avec les marketplaces.`,

  "products-2000+": `Mega catalogue de 2000+ produits pour marketplace ou gros distributeur. **C'est quoi ?** E-commerce enterprise avec architecture scalable. **Pourquoi ?** Infrastructure cloud auto-scaling, CDN mondial, recherche IA avancée. Import/export massif automatisé. Équipe tech dédiée (5-10 personnes minimum). Potentiel CA multi-millions. Vous jouez dans la cour des grands.`,

  // Product Management
  "product-bundles": `Produits groupés permettant la vente de lots avec prix dégressif automatique. **C'est quoi ?** Vendre plusieurs produits ensemble avec réduction (ex: "Pack débutant" avec 3 produits). **Pourquoi ?** Augmente le panier moyen de 20-35% (clients achètent plus pour profiter du bundle), simplifie la décision (package prêt), et déstocker produits lents. McDonald's base son CA sur les menus (bundles).`,

  "product-questions": `Section Questions/Réponses où clients posent des questions et vous répondez publiquement. **C'est quoi ?** FAQ collaborative directement sur la fiche produit. **Pourquoi ?** Répond aux objections avant l'achat (+15% conversion), réduit le support (la réponse sert à tous), et améliore le SEO (contenu généré par utilisateurs). Amazon, Zalando, tous les grands ont cette fonction.`,

  "compare-products": `Comparateur de produits permettant la comparaison côte-à-côte de caractéristiques. **C'est quoi ?** Outil pour comparer jusqu'à 3-4 produits en un tableau. **Pourquoi ?** Facilite la décision pour produits techniques (électronique, informatique, électroménager), réduit les retours (bon choix dès le départ), et augmente conversion de 12%. Obligatoire en B2B et hightech.`,

  "recently-viewed": `Historique des produits récemment consultés par le visiteur. **C'est quoi ?** Widget montrant les 5-10 derniers produits vus. **Pourquoi ?** Facilite le retour à un produit vu plus tôt (sans refaire la recherche), augmente le temps passé sur site (+25%), et améliore UX. Basique mais apprécié : 40% des visiteurs l'utilisent.`,

  "quick-view": `Aperçu rapide produit via modal sans quitter la page catalogue. **C'est quoi ?** Popup montrant l'essentiel du produit (prix, photo, ajout panier) sans changer de page. **Pourquoi ?** Réduit les frictions, accélère l'achat impulsif (+18% conversion), et améliore UX mobile. Le visiteur compare rapidement sans perdre sa place. Standard e-commerce moderne.`,

  // Payments
  "payment-wire-transfer": `Paiement par virement bancaire manuel avec instructions automatiques. **C'est quoi ?** Le client reçoit vos coordonnées bancaires et fait un virement classique. **Pourquoi ?** Zéro frais de transaction (vs 1,5-3% CB), rassurant pour gros montants (+1000€), et préféré par certains clients B2B. Délai de paiement 1-3 jours. Commande validée à réception du virement.`,

  "payment-invoice": `Paiement sur facture B2B avec conditions 30/60 jours pour professionnels agréés. **C'est quoi ?** Conditions de paiement différé réservées aux clients professionnels validés. **Pourquoi ?** Standard en B2B (80% des transactions), facilite les gros achats (cash flow), et attire les grands comptes. Risque d'impayés à gérer (assurance crédit recommandée). Via Stripe Invoicing ou module dédié.`,

  // Inventory
  "stock-reservations": `Réservation temporaire de stock pendant le processus de checkout. **C'est quoi ?** Le produit mis au panier est bloqué 15-30 minutes pour éviter double vente. **Pourquoi ?** Évite la frustration (produit devenu indisponible en plein paiement), réduit les surventes, et améliore UX. Essentiel pour produits à stock limité ou forte demande. Amazon le fait sur tous ses produits.`,

  backorders: `Précommandes permettant la vente de produits en rupture avec date de disponibilité. **C'est quoi ?** Clients commandent des produits indisponibles, livrés plus tard. **Pourquoi ?** Ne perdez aucune vente (CA immédiat malgré rupture), jaugez la demande avant production, et fidélisez (le client attend chez vous vs aller concurrent). Apple maîtrise l'art du backorder.`,

  "product-availability-alerts": `Alertes email automatiques quand un produit en rupture revient en stock. **C'est quoi ?** Bouton "M'alerter" sur produits indispos, email auto envoyé au retour stock. **Pourquoi ?** Récupérez des ventes perdues (+15-25% des alertes convertissent), comprenez la demande (combien d'alertes = indicateur), et fidélisez (vous pensez à eux). Coût quasi nul, ROI énorme.`,

  // Shipping
  "shipping-flat-rate": `Tarif de livraison fixe unique quelle que soit la commande. **C'est quoi ?** Frais de port identiques pour toute commande (ex: 5€ partout). **Pourquoi ?** Ultra-simple pour le client (pas de surprise), facile à gérer pour vous, et peut être absorbé dans vos marges. Fonctionne bien si vos produits ont poids/taille homogènes. Evitez si vous vendez du très lourd ET très léger (vous perdez de l'argent).`,

  "shipping-free-threshold": `Livraison gratuite au-dessus d'un montant seuil (ex: gratuit dès 50€). **C'est quoi ?** Frais de port offerts si panier dépasse un montant défini. **Pourquoi ?** Augmente le panier moyen de 30% (clients ajoutent produits pour atteindre le seuil), améliore conversion (+20%), et compensez les frais via le volume. 90% des e-commerces utilisent cette tactique. Amazon Prime a popularisé le concept.`,

  "shipping-table-rate": `Tarifs de livraison par table : selon poids/taille/destination avec grille complexe. **C'est quoi ?** Grille de tarifs détaillée croisant plusieurs critères (poids × destination). **Pourquoi ?** Précision maximale (vous ne payez pas pour le client), gérez des produits très variés (plume vs piano), et restez rentable. Complexe à setup mais indispensable si large gamme de poids/volumes.`,

  "shipping-live-rates": `Tarifs de livraison en temps réel via API transporteurs (Bpost, DPD, UPS). **C'est quoi ?** Le tarif exact du transporteur s'affiche selon l'adresse et le poids réels. **Pourquoi ?** Zéro surprise (prix exact), transparence totale, et vous ne perdez ni ne gagnez sur les frais de port (prix réel répercuté). Standard pour e-commerce pro. Les APIs sont gratuites.`,

  "shipping-in-store-pickup": `Retrait en magasin / Click & Collect gratuit. **C'est quoi ?** Client commande en ligne, récupère en boutique physique. **Pourquoi ?** Économise les frais de port (pour vous et le client), augmente trafic en magasin (+ventes additionnelles), et réduit retours (client voit produit avant de partir). 45% des acheteurs utilisent le C&C quand disponible.`,

  "shipping-local-delivery": `Livraison locale en propre pour zone géographique limitée. **C'est quoi ?** Vous livrez vous-même (ou coursier dédié) dans un rayon de 10-50km. **Pourquoi ?** Économies sur transporteurs, service personnalisé (image premium), délai ultra-rapide (J+0 ou J+1), et contact direct client. Parfait pour frais/fragile (fleurs, pâtisserie, meubles). Gorillas/Getir basent tout sur la livraison locale express.`,

  // Customer
  wishlists: `Listes de souhaits personnalisables et partageables avec rappels automatiques. **C'est quoi ?** Clients sauvegardent produits favoris pour plus tard. **Pourquoi ?** Augmente le taux de retour (+45%), permet de rappeler par email "votre wishlist vous attend", et facilite les achats cadeaux (partage wishlist). Classique sur tout e-commerce moderne.`,

  "reviews-ratings": `Système d'avis clients avec notes, commentaires, photos et modération. **C'est quoi ?** Vos clients laissent des avis et notes sur vos produits. **Pourquoi ?** 95% des consommateurs lisent les avis avant d'acheter. Les avis augmentent les conversions de 270% (preuve sociale massive). Google affiche les étoiles dans les résultats. Modération nécessaire pour éviter spam/faux avis.`,

  "reward-points": `Programme de fidélité avec points cumulables et échangeables. **C'est quoi ?** Système de points gagnés à chaque achat, convertibles en réductions. **Pourquoi ?** Augmente la rétention de 50%, incite aux achats répétés (gamification), et améliore la CLV (Customer Lifetime Value). Sephora, Starbucks ont bâti leur fidélisation sur les points. Coût réel faible (monnaie virtuelle).`,

  "referral-program": `Programme de parrainage avec récompenses pour parrain et filleul. **C'est quoi ?** Client existant parraine un ami, tous deux reçoivent une réduction. **Pourquoi ?** Acquisition client 5x moins chère que la pub, taux de conversion 4x supérieur (recommandation d'ami), et croissance virale. Dropbox a explosé grâce au parrainage (espace gratuit). ROI démentiel.`,

  // Marketing
  "abandoned-cart-recovery": `Récupération paniers abandonnés via emails automatiques avec rappel et code promo. **C'est quoi ?** Emails automatiques aux clients qui ont abandonné leur panier. **Pourquoi ?** 70% de paniers sont abandonnés. Un email de relance bien fait en récupère 10-15% = 7-10% de CA supplémentaire immédiat. ROI de 4000% en moyenne (coût dérisoire, gain énorme).`,

  "email-automation": `Automatisations emails e-commerce : bienvenue, abandon, post-achat, réengagement. **C'est quoi ?** Scénarios d'emails automatiques selon le comportement client. **Pourquoi ?** L'email automation génère 320% plus de revenus que les campagnes classiques. Zéro effort après setup. Exemples : email bienvenue +40% engagement, email post-achat +25% repeat purchase, email win-back +20% réactivation.`,

  "seo-product-optimization": `Optimisation SEO produits : URLs parlantes, rich snippets, prix/dispo en résultats Google. **C'est quoi ?** Optimisation technique pour que vos produits ressortent dans Google avec prix et étoiles. **Pourquoi ?** Les rich snippets produits augmentent le CTR de 30% (votre résultat attire l'œil). Google Shopping gratuit nécessite ces données. Vos produits apparaissent mieux que la concurrence.`,

  "upsell-downsell": `Up-sell et down-sell : suggestions de produits supérieurs ou alternatifs au checkout. **C'est quoi ?** Propositions "Upgrade vers modèle premium?" ou "Alternative moins chère?" durant l'achat. **Pourquoi ?** Up-sell augmente panier de 20-40% (client accepte souvent un petit +€ pour beaucoup mieux), down-sell sauve la vente (client hésite sur prix = alternative moins chère). Amazon maîtrise cet art.`,

  "flash-sales": `Ventes flash avec compteur temps réel et stock limité visible. **C'est quoi ?** Promotions courtes (24-72h) avec urgence affichée (timer + stock restant). **Pourquoi ?** FOMO (Fear Of Missing Out) = +200% conversions sur période flash. Déstocker rapidement, créer du buzz, et collecter emails (alertes flash sales). Vinted, Veepee, Zalando en abusent car ça marche.`,

  "loyalty-tiers": `Niveaux de fidélité progressifs : Bronze/Silver/Gold avec avantages croissants. **C'est quoi ?** Programme de fidélité à paliers (plus tu achètes, plus tu montes de niveau et as d'avantages). **Pourquoi ?** Gamification addictive (envie de passer au niveau sup), augmente CLV de 60%, et crée ambassadeurs (niveau Gold = fierté). Sephora, compagnies aériennes, tous les gros utilisent les tiers.`,

  // Analytics
  "analytics-basic": `Analytics basique : visiteurs, pages vues, sources de trafic, taux de conversion. **C'est quoi ?** Statistiques essentielles de votre site. **Pourquoi ?** Savoir d'où viennent vos visiteurs, quelles pages marchent, et votre taux de conversion. Sans analytics = pilotage à l'aveugle. Google Analytics 4 gratuit suffit pour démarrer.`,

  "analytics-ecommerce": `Analytics e-commerce avancé : funnel achat, valeur panier, produits stars, abandons, cohort analysis. **C'est quoi ?** Analyse poussée du comportement d'achat de vos clients. **Pourquoi ?** Identifiez où vous perdez des clients (funnel), quels produits cartonnent, quels clients reviennent. Optimisez chaque étape = +20-50% de CA sans plus de trafic. Data-driven decisions.`,

  "conversion-tracking": `Tracking conversions avancé : pixels Facebook/Google Ads, attribution multi-touch, ROI par canal. **C'est quoi ?** Suivi précis de chaque conversion et de sa source réelle. **Pourquoi ?** Savoir exactement quel canal marketing rapporte (Facebook Ads ? SEO ? Email ?). Optimisez vos budgets pub en temps réel. Attribution multi-touch montre le vrai parcours client (souvent 5-7 points de contact avant achat).`,

  "heatmaps-session-recording": `Heatmaps et enregistrements de sessions utilisateurs pour analyser comportement. **C'est quoi ?** Cartes de chaleur montrant où cliquent les visiteurs + vidéos de leurs sessions. **Pourquoi ?** Comprenez VRAIMENT comment les gens utilisent votre site (vs ce que vous imaginez). Identifiez bugs UX, boutons invisibles, freins à l'achat. Hotjar/Crazy Egg. Une session de 1h d'analyse peut valoir 10k€ de CA/mois récupérés.`,

  // Security
  "ssl-certificate": `Certificat SSL/TLS : chiffrement HTTPS pour sécuriser les données. **C'est quoi ?** Le cadenas vert dans le navigateur + HTTPS. **Pourquoi ?** OBLIGATOIRE : sans SSL, Google vous pénalise, les navigateurs affichent "Site non sécurisé" (fuite visiteurs), et vous ne pouvez pas traiter de paiements. Le minimum légal et technique absolu.`,

  "gdpr-compliance": `Conformité RGPD complète : consentement cookies, politique confidentialité, gestion données, droit à l'oubli. **C'est quoi ?** Respect des règles RGPD européennes sur les données personnelles. **Pourquoi ?** OBLIGATION LÉGALE : amendes jusqu'à 20M€ ou 4% CA. Les clients sont sensibles à la vie privée. Banner cookies bien fait, registre des données, procédures d'effacement. Indispensable.`,

  "pci-compliance": `Conformité PCI-DSS : standards de sécurité pour paiement par carte. **C'est quoi ?** Normes de sécurité bancaires pour manipuler des données de cartes. **Pourquoi ?** OBLIGATOIRE si vous acceptez des cartes bancaires. Stripe/Mollie gèrent ça pour vous (recommandé), sinon audit annuel coûteux. Non-conformité = interdiction d'accepter des cartes + risque énorme en cas de hack.`,

  "two-factor-auth": `Authentification à deux facteurs (2FA) pour comptes admins et clients. **C'est quoi ?** Double vérification lors de la connexion (mot de passe + code SMS/app). **Pourquoi ?** 99,9% des hacks automatiques sont bloqués par 2FA. Protège vos données critiques même si un mot de passe fuite. Rassurant pour clients B2B avec données sensibles. Norme de sécurité 2024.`,

  "ddos-protection": `Protection anti-DDoS et pare-feu applicatif (WAF). **C'est quoi ?** Bouclier contre les attaques visant à rendre votre site inaccessible. **Pourquoi ?** Une attaque DDoS = site down = perte CA directe. Cloudflare gratuit bloque 99% des attaques. WAF protège contre injections SQL, XSS. Indispensable pour e-commerce (cible privilégiée des attaquants).`,
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
