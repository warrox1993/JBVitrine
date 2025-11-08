const fs = require("fs");

// Batch 4 - Features restantes importantes
const explanations = {
  // Features manquées précédemment (différent pattern dans le fichier)
  "promo-codes": `Codes promotionnels avec règles avancées (montant/pourcentage/catégorie/client). **C'est quoi ?** Système de bons de réduction avec conditions personnalisables. **Pourquoi ?** Acquisition (offrez -10% aux nouveaux), fidélisation (code VIP pour clients fidèles), partenariats (codes influenceurs), et réactivation (win-back). Black Friday impossible sans codes promo. Tracez ROI par code.`,

  "b2c-gift-wrapping": `Option emballage cadeau avec carte personnalisée et envoi direct au destinataire. **C'est quoi ?** Service d'emballage cadeau payant (+3-5€). **Pourquoi ?** Marge additionnelle pure (coût emballage 0,50€, vente 3-5€), augmente panier moyen, et boost période fêtes (+60% CA décembre). 40% des achats e-commerce sont des cadeaux.`,

  "b2c-gift-registry": `Liste de naissance/mariage : invités achètent depuis la liste, mariés reçoivent tout. **C'est quoi ?** Registre de cadeaux en ligne façon Amazon Wedding Registry. **Pourquoi ?** Acquisition massive (tous les invités découvrent votre site), panier moyen élevé (cadeaux généreux), et fidélisation (couple revient). Crée buzz social. Parfait pour déco, cuisine, bébé.`,

  // User Management
  "user-permissions": `Permissions granulaires (ACL) : contrôle fin des droits par action et ressource. **C'est quoi ?** Système de permissions détaillé au niveau action (créer/lire/modifier/supprimer par objet). **Pourquoi ?** Sécurité maximale (principe du moindre privilège), conformité (séparation des rôles), et flexibilité (permissions custom par utilisateur). Enterprise-grade. RBAC + ABAC combinés.`,

  "user-groups": `Groupes et équipes avec permissions héritées et hiérarchie organisationnelle. **C'est quoi ?** Organisation des utilisateurs en groupes avec droits partagés. **Pourquoi ?** Gestion simplifiée (ajoutez au groupe "Marketing" = toutes les permissions marketing), reflète structure entreprise, et scalabilité (1000 users gérables). Slack, Microsoft Teams basent tout là-dessus.`,

  "user-impersonation": `Mode impersonnification : admin se connecte comme un utilisateur pour déboguer. **C'est quoi ?** Admins peuvent "devenir" un utilisateur temporairement. **Pourquoi ?** Support niveau 10x (voir exactement ce que voit le client), debug rapide ("ça marche pas" devient "ah je vois le bug"), et formation facilitée. Audit trail obligatoire pour traçabilité. Shopify, Salesforce l'ont.`,

  "user-activity-log": `Journal d'activité complet : qui a fait quoi et quand, avec filtres et export. **C'est quoi ?** Historique détaillé de toutes les actions utilisateurs. **Pourquoi ?** Audit trail (conformité SOC2/ISO27001), investigation incidents, preuve légale, et analytics comportementaux. RGPD compliant. Retention paramétrable. Indispensable secteurs régulés (finance, santé).`,

  // Dashboards
  "dashboard-basic": `Tableau de bord simple avec métriques clés et graphiques essentiels. **C'est quoi ?** Page d'accueil montrant KPIs principaux (CA, commandes, visiteurs). **Pourquoi ?** Vision instantanée de votre activité, prise de décision rapide, et motivation équipe (voir progression). Mieux qu'un Excel. Refresh temps réel possible. Le minimum pour toute app métier.`,

  "dashboard-advanced": `Tableau de bord avancé : widgets personnalisables, drill-down, période comparée. **C'est quoi ?** Dashboard configurable avec interactions (clic sur graphique = détails). **Pourquoi ?** Chaque manager a son dashboard (ventes vs prod vs finance), comparaisons période (vs mois dernier, vs année passée), et autonomie analytics. Notion de "single pane of glass". ROI mesurable.`,

  "dashboard-analytics": `Dashboard analytics BI : rapports sophistiqués, prédictions, insights IA. **C'est quoi ?** Business Intelligence avancée avec machine learning. **Pourquoi ?** Prédictions (CA prévu mois prochain), détection anomalies (alerte si KPI anormal), et insights automatiques ("Top produit = X"). Tableau, Power BI, mais intégré. Pour data-driven orgs.`,

  // CRUD
  "crud-simple": `CRUD simple pour 1-3 entités métier avec formulaires et listes. **C'est quoi ?** Gestion basique de vos données (Create/Read/Update/Delete). **Pourquoi ?** Remplace Excel (limites dépassées), multi-utilisateurs simultanés, validation automatique, et historique. Ex: gestion contacts, produits, commandes. Base de toute app métier.`,

  "crud-medium": `CRUD moyen pour 4-8 entités avec relations et validations complexes. **C'est quoi ?** Gestion de données avec liens entre entités (clients ↔ commandes ↔ produits). **Pourquoi ?** Reflète vraiment votre métier (rarement <5 entités), intégrité référentielle garantie, et workflows réalistes. 80% des apps métier sont du CRUD bien fait. Investissement rentabilisé en <6 mois.`,

  "crud-complex": `CRUD complexe pour 9-15 entités avec architecture modulaire et évolutive. **C'est quoi ?** Système complet gérant tous vos processus métier. **Pourquoi ?** Remplace 3-5 logiciels disparates, données centralisées (une seule vérité), et personnalisé exactement à vos besoins. ERP/CRM sur mesure. Avantage concurrentiel si bien fait.`,

  // Data Operations
  "data-import-export": `Import/Export de données : CSV, Excel, JSON avec mapping et validation. **C'est quoi ?** Outils pour importer/exporter vos données en masse. **Pourquoi ?** Migration depuis ancien système, intégration avec partenaires, backup manuel, et conformité (RGPD = droit portabilité). Excel reste roi pour beaucoup. Validation évite imports foireux.`,

  "data-bulk-operations": `Opérations en masse : modification/suppression de centaines d'éléments en un clic. **C'est quoi ?** Actions groupées sur sélection multiple. **Pourquoi ?** Gain de temps colossal (modifier 500 prix en 2 min vs 5h), erreurs réduites (une règle appliquée partout), et productivité x10. Excel le fait, votre app aussi doit le faire.`,

  "data-versioning": `Versioning de données : historique complet, restauration, comparaison versions. **C'est quoi ?** Chaque modification est sauvegardée, retour arrière possible. **Pourquoi ?** Sécurité (erreur = restauration), audit trail (qui a changé quoi), et collaboration sereine (pas peur de casser). Git mais pour vos données métier. Secteurs régulés l'exigent.`,

  "data-validation": `Validation avancée : règles métier complexes, cross-field, async checks. **C'est quoi ?** Vérifications sophistiquées avant sauvegarder (ex: IBAN valide, email unique, stock suffisant). **Pourquoi ?** Qualité données garantie (garbage in garbage out), erreurs bloquées en amont, et confiance utilisateurs. Les bugs de validation coûtent cher. Investir ici = économies massives.`,

  // Workflows
  "workflow-basic": `Workflow linéaire simple : étapes séquentielles avec validations. **C'est quoi ?** Processus guidé étape par étape (nouveau → en cours → validé → terminé). **Pourquoi ?** Processus respectés (pas d'oublis), traçabilité (où en est le dossier?), et formation simplifiée (l'app guide). 70% des processus métier sont linéaires. ROI immédiat.`,

  "workflow-advanced": `Workflow configurable : embranchements, conditions, rôles multiples. **C'est quoi ?** Processus complexes avec chemins conditionnels (si montant >1000€ → validation manager). **Pourquoi ?** Reflète la réalité (rarement linéaire), automatise décisions, et scale (ajoutez étapes sans redev). Workflows = différenciateur concurrentiel. Zapier/n8n mais custom.`,

  "workflow-visual-builder": `Visual Workflow Builder : conception workflows en drag & drop sans code. **C'est quoi ?** Interface graphique pour créer/modifier workflows (comme Zapier visuel). **Pourquoi ?** Business users autonomes (pas besoin dev pour changer processus), agilité maximale (adapter en minutes), et documentation visuelle (tout le monde comprend). Salesforce Flow, monday.com le font.`,

  "approval-system": `Système d'approbation : demandes, multi-niveaux, délégation, relances automatiques. **C'est quoi ?** Workflows de validation hiérarchique (employé → manager → directeur). **Pourquoi ?** Conformité (dépenses >X = approbation), traçabilité (qui a validé?), et automatisation relances (manager oublie = rappel J+2). Standard corporate. SAP/Oracle en ont tous.`,

  "task-automation": `Automatisation de tâches : triggers, actions programmées, conditions complexes. **C'est quoi ?** Actions automatiques selon événements (nouveau client → email bienvenue + ajout CRM). **Pourquoi ?** Zéro oubli (machine fiable), vitesse (instantané), et scalabilité (gérez 10k clients comme 10). Zapier interne. ROI démentiel : une automation = 2-20h/semaine gagnées.`,

  // Notifications
  "email-notifications": `Notifications email : templates personnalisables, envoi asynchrone, tracking ouvertures. **C'est quoi ?** Emails automatiques depuis votre app (confirmations, alertes, rappels). **Pourquoi ?** Communication essentielle (80% préfèrent email), preuve écrite (traçabilité), et réengagement. Resend, SendGrid pour l'infra. Templates = cohérence visuelle. Taux ouverture = KPI.`,

  "push-notifications": `Notifications push web : alertes navigateur même site fermé (PWA). **C'est quoi ?** Notifications desktop/mobile via navigateur (comme app native). **Pourquoi ?** Réengagement +35% (rappel discret), temps réel (nouvelle commande? ping), et gratuit vs SMS. PWA nécessaire. Permission utilisateur requise. Firebase Cloud Messaging standard.`,

  "sms-notifications": `Notifications SMS : envoi worldwide, templates, tracking livraison. **C'est quoi ?** SMS automatiques pour alertes critiques. **Pourquoi ?** Taux ouverture 98% (vs 20% email), instantané, et universel (tout le monde a SMS). Cher (0,05-0,10€/SMS) donc réservé au critique : 2FA, livraison imminente, urgences. Twilio leader.`,

  "in-app-notifications": `Notifications in-app : centre de notifications, badge compteur, marquage lu/non-lu. **C'est quoi ?** Bell icon avec pastille rouge genre Facebook/LinkedIn. **Pourquoi ?** Engagement utilisateur (+60% rétention), découverte features (nudges), et UX moderne attendue. Real-time via WebSocket. Archive automatique après 30j.`,

  "notification-preferences": `Préférences de notifications : désactivation sélective par canal et type. **C'est quoi ?** Utilisateurs choisissent quelles notifs recevoir et comment. **Pourquoi ?** RGPD compliant (consentement), réduit désabonnements totaux (ils coupent le superflu, gardent l'important), et UX respectueuse. Amazon laisse tout paramétrer. Standard 2024.`,

  // Files
  "file-upload": `Upload de fichiers : drag & drop, progress bar, preview, validation. **C'est quoi ?** Interface moderne pour uploader documents/images. **Pourquoi ?** UX attendue (drag & drop = standard), feedback immédiat (barre progression), et validation client-side (évite uploads inutiles). Limite taille configurable. Virus scan recommandé.`,

  "file-management": `Gestionnaire de fichiers : dossiers, permissions, versions, métadonnées. **C'est quoi ?** Dropbox-like intégré à votre app. **Pourquoi ?** Centralisation documents (plus de "c'est dans quel email?"), permissions granulaires (dossier compta = compta only), et versioning (retrouvez version d'il y a 3 mois). Google Drive mais vous contrôlez.`,

  "file-cloud-storage": `Stockage cloud : S3, Cloudinary, Azure Blob avec CDN global. **C'est quoi ?** Fichiers stockés dans le cloud (pas sur votre serveur). **Pourquoi ?** Scalabilité infinie (1 GB ou 1 TB = pareil), coût faible (0,02€/GB/mois), backup automatique, et performance (CDN = rapide partout monde). Standard moderne. Pas de backup = risque énorme.`,

  "pdf-generation": `Génération de PDF : factures, rapports, contrats avec templates personnalisables. **C'est quoi ?** Création automatique de PDFs depuis vos données. **Pourquoi ?** Obligation légale (factures PDF), professionnalisme (email avec PDF joint), et archivage (format universel, lisible 2050). Template = cohérence visuelle. Puppeteer, wkhtmltopdf, ou libs dédiées.`,

  "excel-generation": `Génération Excel : exports sophistiqués avec formules, styles, multi-feuilles. **C'est quoi ?** Création de vrais fichiers Excel (pas CSV). **Pourquoi ?** Excel = lingua franca business (tout le monde l'a), formules préservées (calculs automatiques), et présentation pro (couleurs, logos). Manager adorent. ExcelJS, openpyxl selon stack.`,

  "document-signing": `Signature électronique : DocuSign-like intégré, légalement valide, audit trail. **C'est quoi ?** Signature de documents en ligne avec valeur légale. **Pourquoi ?** Accélère contrats x10 (plus d'impression/scan/envoi), légalement valide UE (eIDAS), et tracking (qui a signé quand). DocuSign coûte cher, intégration custom rentable si volume. ROI <6 mois.`,

  // Search & Filters
  "search-basic": `Recherche basique : full-text simple avec résultats pertinents. **C'est quoi ?** Barre de recherche standard. **Pourquoi ?** 30% des utilisateurs utilisent la recherche (surtout desktop), trouvent 2x plus vite, et satisfaits (+25% NPS). Postgres full-text suffit pour démarrer. Highlight résultats = UX++.`,

  "search-advanced": `Recherche full-text avancée : Elasticsearch, synonymes, typo-tolerance, facets. **C'est quoi ?** Recherche Google-like dans votre app. **Pourquoi ?** Pertinence maximale (ranking intelligent), typo-tolerance (tetes = têtes), synonymes (auto = voiture), et rapidité (millisecondes sur millions docs). Elasticsearch, Algolia, Meilisearch. Différenciateur énorme.`,

  "filters-advanced": `Filtres avancés : facettes multiples, ranges, autocomplete, sauvegarde. **C'est quoi ?** Filtres sophistiqués comme Amazon (prix, marque, avis, etc.). **Pourquoi ?** Navigation efficace (trouver parmi 1000 produits en 3 clics), analytics (quels filtres utilisés = insights), et conversion (+12%). Facettes auto-générées = maintenance zéro.`,

  "saved-searches": `Recherches sauvegardées : alertes automatiques sur nouveaux résultats. **C'est quoi ?** Enregistrer une recherche et être notifié des nouvelles correspondances. **Pourquoi ?** Réengagement passif (utilisateur revient sans effort), pertinence (nouveauté = intérêt), et fidélisation. Leboncoin, Indeed basent la rétention là-dessus. Email quotidien/hebdo.`,

  // Reporting
  "reporting-basic": `Rapports pré-définis : exports PDF/Excel de vos KPIs essentiels. **C'est quoi ?** Rapports standards clé en main (CA mensuel, top clients, etc.). **Pourquoi ?** Vision métier immédiate, présentation board/banque, et professionnalisme. Excel manuel = erreurs + temps. Automatisé = fiable + 0,5s. 10 rapports couvrent 80% besoins.`,

  "reporting-custom": `Générateur de rapports : créez vos rapports custom sans dev. **C'est quoi ?** Interface type Power BI pour construire rapports. **Pourquoi ?** Autonomie business (pas besoin dev pour nouveau rapport), agilité (nouveau KPI? nouveau rapport en 10min), et adoption (+50% si self-service). Metabase open-source = bonne base.`,

  "reporting-scheduled": `Rapports planifiés : génération et envoi automatiques (quotidien/hebdo/mensuel). **C'est quoi ?** Rapports envoyés par email à heure fixe. **Pourquoi ?** Proactif (pas besoin se connecter), routine (tous les lundis 9h = rapport dans inbox), et diffusion (envoi à toute l'équipe). Manager adorent. Cron + templating = facile.`,

  "analytics-tracking": `Analytics et métriques : suivi événements custom, funnels, cohorts. **C'est quoi ?** Google Analytics mais pour votre app métier. **Pourquoi ?** Comprenez vraiment l'usage (feature utilisée? abandons où?), optimisez onboarding (funnel = où perdez-vous users?), et ROI mesurable. Mixpanel, Amplitude pattern. Data = avantage concurrentiel.`,

  // API
  "api-rest": `API REST complète : documentation OpenAPI, versioning, pagination. **C'est quoi ?** API professionnelle selon standards REST. **Pourquoi ?** Intégrations tierces possibles, app mobile future (même API), et écosystème ouvert. Shopify doit son succès à son API. Documentation = adoption. Swagger/OpenAPI standard.`,

  "api-graphql": `API GraphQL : requêtes flexibles, over-fetching éliminé, subscriptions real-time. **C'est quoi ?** Alternative à REST où client demande exactement ce dont il a besoin. **Pourquoi ?** Performance (1 requête vs 5 REST), flexibilité (frontend autonome), et dev experience++. GitHub, Shopify migrent vers GraphQL. Courbe apprentissage mais ROI énorme.`,

  "api-webhooks": `Webhooks sortants : notifications HTTP vers systèmes externes lors d'événements. **C'est quoi ?** Votre app appelle automatiquement une URL externe quand quelque chose se passe. **Pourquoi ?** Intégrations temps réel (nouvelle commande → webhook → leur système alerté), découplage (pas besoin polling), et standard moderne. Stripe, GitHub, tous les SaaS ont des webhooks.`,

  "api-rate-limiting": `Rate limiting et throttling : protection contre abus et surcharge. **C'est quoi ?** Limitation du nombre de requêtes API par utilisateur/IP. **Pourquoi ?** Protection DDoS (même involontaire), équité ressources, et monétisation (tiers gratuit 100 req/h, payant illimité). Redis + algorithme token bucket. Obligatoire pour API publique.`,

  "api-keys": `Gestion API keys : création, révocation, scopes, usage tracking. **C'est quoi ?** Clés d'authentification pour votre API. **Pourquoi ?** Sécurité (qui appelle l'API?), tracking (combien d'appels par client?), et facturation (usage-based pricing). Format UUID v4, stockage hashé (comme passwords). Rotation régulière recommandée.`,

  // Integrations
  "integration-stripe": `Intégration Stripe complète : paiements, abonnements, invoicing, webhooks. **C'est quoi ?** Connexion totale avec Stripe pour tous types de paiements. **Pourquoi ?** Leader mondial paiements (confiance), setup 2h, et features infinies (3D Secure, Apple Pay, etc.). Alternative: Mollie (Benelux). Webhook = sync automatique. Dashboard Stripe = analytics.`,

  "integration-mailchimp": `Intégration Mailchimp/Brevo : sync listes, automation campagnes, analytics. **C'est quoi ?** Connexion avec votre outil email marketing. **Pourquoi ?** Listes toujours à jour (nouveau client → Mailchimp auto), campagnes ciblées (segment = précision), et ROI email (38€ retour par 1€). Brevo gratuit jusqu'à 300 emails/jour.`,

  "integration-slack": `Intégration Slack : notifications, commandes, bot interactif. **C'est quoi ?** Votre app envoie messages/alertes dans Slack. **Pourquoi ?** Équipe vit dans Slack (notifications vues immédiatement), contexte riche (boutons interactifs), et adoption forcée (là où ils sont). Nouveau lead? Ping. Bug? Alert. Deal gagné? 🎉.`,

  "integration-zapier": `Intégration Zapier : connectez 5000+ apps sans code. **C'est quoi ?** Votre app devient disponible dans Zapier. **Pourquoi ?** Marketplace gratuit (découverte), intégrations infinies (clients connectent ce qu'ils veulent), et zéro dev de votre côté. Référencement Zapier = SEO gratuit. Webhooks suffisent pour démarrer.`,
};

// Lire le fichier
const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Compter les ajouts
let addedCount = 0;
let skippedCount = 0;

// Pour chaque feature ID dans notre mapping
Object.entries(explanations).forEach(([featureId, explanation]) => {
  // Essayer plusieurs patterns de regex
  const patterns = [
    // Pattern standard
    new RegExp(
      `(\\{[^}]*?id:\\s*["']${featureId}["'][^}]*?description:\\s*["']([^"']*?)["'],)([^}]*?category:)`,
      "s",
    ),
    // Pattern alternatif avec plus de flexibilité
    new RegExp(
      `(id:\\s*["']${featureId}["'][^}]*?description:\\s*["']([^"']*?)["'])([^}]*?)`,
      "s",
    ),
  ];

  let matched = false;
  for (const regex of patterns) {
    const match = content.match(regex);
    if (match && !match[0].includes("explanation:")) {
      const replacement = `$1,\n      explanation: \`${explanation}\`$3`;
      content = content.replace(regex, replacement);
      addedCount++;
      console.log(`✓ Added explanation for: ${featureId}`);
      matched = true;
      break;
    }
  }

  if (!matched) {
    skippedCount++;
    console.log(
      `⚠ Skipped (already has explanation or not found): ${featureId}`,
    );
  }
});

// Écrire le fichier modifié
fs.writeFileSync(filePath, content, "utf-8");

console.log(`\n✅ Done! Added ${addedCount} explanations to features.ts`);
console.log(
  `⚠ Skipped ${skippedCount} features (already explained or not found)`,
);
console.log("Please review the file and test your application.");
